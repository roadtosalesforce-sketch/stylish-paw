import type {Product} from "@/types/product";

export function variantStock(product: Product, size: string, color: string): number | null {
  if (!product.trackInventory) return null;
  return product.variants?.find((variant) => variant.size === size && variant.color === color)?.stock ?? 0;
}

export function isVariantAvailable(product: Product, size: string, color: string, quantity = 1) {
  const stock = variantStock(product, size, color);
  return stock === null || stock >= quantity;
}

export function availableColors(product: Product, size: string) {
  if (!product.trackInventory) return product.colors;
  return product.colors.filter((color) => isVariantAvailable(product, size, color));
}

export function availableSizes(product: Product) {
  if (!product.trackInventory) return product.sizes;
  return product.sizes.filter((size) => product.colors.some((color) => isVariantAvailable(product, size, color)));
}
