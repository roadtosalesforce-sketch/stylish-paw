import Stripe from "stripe";
import {getDictionary, isLocale, type Locale} from "@/i18n/dictionaries";
import {optionLabel} from "@/i18n/product-labels";
import {getProducts} from "@/sanity/lib/products";

export const runtime = "nodejs";

type CheckoutItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

function isCheckoutItem(value: unknown): value is CheckoutItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === "string" &&
    typeof item.size === "string" &&
    typeof item.color === "string" &&
    Number.isInteger(item.quantity) &&
    Number(item.quantity) >= 1 &&
    Number(item.quantity) <= 10
  );
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({error: getDictionary("en").checkout.invalidRequest}, {status: 400});
  }

  const requestedLocale =
    payload && typeof payload === "object" && "locale" in payload
      ? (payload as {locale?: unknown}).locale
      : undefined;
  const locale: Locale = typeof requestedLocale === "string" && isLocale(requestedLocale) ? requestedLocale : "en";
  const dict = getDictionary(locale);

  if (!secretKey) {
    return Response.json({error: dict.checkout.activating}, {status: 503});
  }

  const requestedItems =
    payload && typeof payload === "object" && "items" in payload
      ? (payload as {items?: unknown}).items
      : undefined;

  if (
    !Array.isArray(requestedItems) ||
    requestedItems.length === 0 ||
    requestedItems.length > 50 ||
    !requestedItems.every(isCheckoutItem)
  ) {
    return Response.json({error: dict.checkout.invalidCart}, {status: 400});
  }

  const products = await getProducts(locale);
  const productsById = new Map(products.map((product) => [product.id, product]));

  try {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      requestedItems.map((item) => {
        const product = productsById.get(item.productId);
        if (!product) throw new Error("PRODUCT_NOT_FOUND");
        if (!product.sizes.includes(item.size) || !product.colors.includes(item.color)) {
          throw new Error("INVALID_VARIANT");
        }

        const unitAmount = Math.round(product.price * 100);
        if (!Number.isSafeInteger(unitAmount) || unitAmount <= 0) {
          throw new Error("INVALID_PRICE");
        }

        return {
          quantity: item.quantity,
          price_data: {
            currency: "pln",
            unit_amount: unitAmount,
            product_data: {
              name: product.name,
              description: `${optionLabel(product, "size", item.size, locale)} · ${optionLabel(product, "color", item.color, locale)}`,
              images: product.image.startsWith("https://") ? [product.image] : undefined,
              metadata: {
                productId: product.id,
                size: item.size,
                color: item.color,
              },
            },
          },
        };
      });

    const subtotal = lineItems.reduce(
      (sum, item) =>
        sum + Number(item.price_data?.unit_amount || 0) * Number(item.quantity || 0),
      0,
    );

    const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const siteUrl = configuredSiteUrl
      ? configuredSiteUrl.replace(/\/$/, "")
      : new URL(request.url).origin;

    const stripe = new Stripe(secretKey, {maxNetworkRetries: 2});
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart?checkout=cancelled`,
      customer_creation: "always",
      billing_address_collection: "auto",
      shipping_address_collection: {allowed_countries: ["PL"]},
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: subtotal >= 5000 ? dict.checkout.freeShipping : dict.checkout.standardShipping,
            fixed_amount: {
              amount: subtotal >= 5000 ? 0 : 599,
              currency: "pln",
            },
            delivery_estimate: {
              minimum: {unit: "business_day", value: 2},
              maximum: {unit: "business_day", value: 5},
            },
          },
        },
      ],
      phone_number_collection: {enabled: true},
      allow_promotion_codes: true,
      locale,
      metadata: {store: "Furry Fairy Pets"},
    });

    if (!session.url) {
      throw new Error("CHECKOUT_URL_MISSING");
    }

    return Response.json({url: session.url});
  } catch (error) {
    if (
      error instanceof Error &&
      ["PRODUCT_NOT_FOUND", "INVALID_VARIANT", "INVALID_PRICE"].includes(error.message)
    ) {
      return Response.json(
        {error: dict.checkout.changed},
        {status: 409},
      );
    }

    console.error("Unable to create Stripe Checkout session", error);
    return Response.json(
      {error: dict.checkout.failed},
      {status: 500},
    );
  }
}
