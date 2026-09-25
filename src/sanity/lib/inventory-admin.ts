import "server-only";

import {createClient} from "next-sanity";

type PurchasedVariant = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

type InventoryDocument = {
  _id: string;
  _rev: string;
  trackInventory?: boolean;
  inventoryVariants?: Array<{
    _key: string;
    size?: string;
    color?: string;
    sku?: string;
    stock?: number;
  }>;
  processedOrderIds?: string[];
};

export type InventoryUpdateResult = {
  configured: boolean;
  updatedProducts: number;
  skippedProducts: number;
};

/**
 * Decrements Sanity inventory once per paid Stripe session.
 * Revision guards make concurrent purchases fail safely instead of overselling.
 */
export async function decrementInventoryForOrder(
  orderId: string,
  purchasedItems: PurchasedVariant[],
): Promise<InventoryUpdateResult> {
  const token = process.env.SANITY_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0w20qxza";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

  if (!token || purchasedItems.length === 0) {
    return {configured: Boolean(token), updatedProducts: 0, skippedProducts: 0};
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-08-13",
    token,
    useCdn: false,
  });

  const quantities = new Map<string, number>();
  for (const item of purchasedItems) {
    const key = `${item.productId}\u0000${item.size}\u0000${item.color}`;
    quantities.set(key, (quantities.get(key) || 0) + item.quantity);
  }

  const productIds = [...new Set(purchasedItems.map((item) => item.productId))];
  const products = await client.fetch<InventoryDocument[]>(
    `*[_type == "product" && _id in $productIds]{
      _id,
      _rev,
      trackInventory,
      inventoryVariants[]{_key, size, color, sku, stock},
      processedOrderIds
    }`,
    {productIds},
  );

  let transaction = client.transaction();
  let updatedProducts = 0;
  let skippedProducts = 0;

  for (const product of products) {
    if (!product.trackInventory || product.processedOrderIds?.includes(orderId)) {
      skippedProducts += 1;
      continue;
    }

    const inventoryVariants = product.inventoryVariants || [];
    const nextVariants = inventoryVariants.map((variant) => {
      const key = `${product._id}\u0000${variant.size || ""}\u0000${variant.color || ""}`;
      const purchasedQuantity = quantities.get(key) || 0;
      if (purchasedQuantity === 0) return variant;

      const currentStock = Math.max(0, Number(variant.stock) || 0);
      if (currentStock < purchasedQuantity) {
        throw new Error(`INSUFFICIENT_STOCK:${product._id}:${variant._key}`);
      }

      return {...variant, stock: currentStock - purchasedQuantity};
    });

    const requestedForProduct = purchasedItems.filter((item) => item.productId === product._id);
    for (const item of requestedForProduct) {
      const matchingVariant = inventoryVariants.find(
        (variant) => variant.size === item.size && variant.color === item.color,
      );
      if (!matchingVariant) throw new Error(`MISSING_VARIANT:${product._id}`);
    }

    const processedOrderIds = [...(product.processedOrderIds || []).slice(-99), orderId];
    transaction = transaction.patch(product._id, (patch) =>
      patch.ifRevisionId(product._rev).set({inventoryVariants: nextVariants, processedOrderIds}),
    );
    updatedProducts += 1;
  }

  if (updatedProducts > 0) {
    await transaction.commit({visibility: "sync"});
  }

  return {configured: true, updatedProducts, skippedProducts};
}
