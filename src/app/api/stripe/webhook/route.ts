import Stripe from "stripe";
import {createAdminClient} from "@/lib/supabase/admin";
import {getShopSettings} from "@/sanity/lib/content";
import {decrementInventoryForOrder} from "@/sanity/lib/inventory-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecret || !webhookSecret) {
    return Response.json({error: "Webhook is not configured"}, {status: 503});
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json({error: "Missing signature"}, {status: 400});

  const stripe = new Stripe(stripeSecret);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    return Response.json({error: "Invalid signature"}, {status: 400});
  }

  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  ) {
    return Response.json({received: true});
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const admin = createAdminClient();
  if (!admin) return Response.json({error: "Order database is not configured"}, {status: 503});

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ["data.price.product"],
  });
  const userId = session.metadata?.user_id || null;
  const lineItemDetails = lineItems.data.map((item) => {
    const stripeProduct = item.price?.product;
    const metadata =
      stripeProduct && typeof stripeProduct === "object" && "metadata" in stripeProduct
        ? stripeProduct.metadata
        : null;
    const quantity = item.quantity || 0;

    return metadata?.productId && metadata.size && metadata.color && quantity > 0
      ? {
          productId: metadata.productId,
          size: metadata.size,
          color: metadata.color,
          quantity,
        }
      : null;
  });
  const purchasedItems = lineItemDetails.filter((item): item is NonNullable<typeof item> => item !== null);
  const {error} = await admin.from("orders").upsert(
    {
      user_id: userId || null,
      stripe_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      customer_email: session.customer_details?.email || session.customer_email || null,
      status: session.payment_status,
      currency: session.currency || "pln",
      amount_total: session.amount_total || 0,
      shipping_method: session.metadata?.shipping_method || null,
      inpost_point: session.metadata?.inpost_point || null,
      inpost_point_address: session.metadata?.inpost_point_address || null,
      items: lineItems.data.map((item, index) => ({
        description: item.description,
        quantity: item.quantity,
        amount_total: item.amount_total,
        currency: item.currency,
        ...(lineItemDetails[index] || {}),
      })),
    },
    {onConflict: "stripe_session_id"},
  );

  if (error) {
    console.error("Unable to store Stripe order", error);
    return Response.json({error: "Unable to store order"}, {status: 500});
  }

  try {
    const inventory = await decrementInventoryForOrder(session.id, purchasedItems);
    if (!inventory.configured && purchasedItems.length > 0) {
      console.error("SANITY_WRITE_TOKEN is required for automatic inventory updates");
      return Response.json({error: "Inventory automation is not configured"}, {status: 503});
    }
  } catch (inventoryError) {
    console.error("Unable to update Sanity inventory", inventoryError);
    return Response.json({error: "Unable to update inventory"}, {status: 500});
  }

  if (userId) {
    const settings = await getShopSettings("pl");
    if (settings?.loyaltyEnabled !== false) {
      const pointsPerPln = Math.max(0, Number(settings?.pointsPerPln) || 1);
      const amountInStoreCurrency = (session.amount_subtotal || session.amount_total || 0) / 100;
      const eurRate = Math.max(0.0001, Number(settings?.eurRate) || 0.23);
      const amountInPln = session.currency === "eur" ? amountInStoreCurrency / eurRate : amountInStoreCurrency;
      const points = Math.floor(amountInPln * pointsPerPln);

      if (points > 0) {
        const {error: pointsError} = await admin.rpc("award_order_points", {
          p_user_id: userId,
          p_source_id: session.id,
          p_points: points,
        });
        if (pointsError) {
          console.error("Unable to award loyalty points", pointsError);
          return Response.json({error: "Unable to award loyalty points"}, {status: 500});
        }
      }
    }
  }

  return Response.json({received: true});
}
