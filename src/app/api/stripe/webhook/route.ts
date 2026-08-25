import Stripe from "stripe";
import {createAdminClient} from "@/lib/supabase/admin";

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

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {limit: 100});
  const userId = session.metadata?.user_id || null;
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
      items: lineItems.data.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        amount_total: item.amount_total,
        currency: item.currency,
      })),
    },
    {onConflict: "stripe_session_id"},
  );

  if (error) {
    console.error("Unable to store Stripe order", error);
    return Response.json({error: "Unable to store order"}, {status: 500});
  }
  return Response.json({received: true});
}
