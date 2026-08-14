import Link from "next/link";
import {CheckCircle2} from "lucide-react";
import {CheckoutSuccess} from "@/components/checkout-success";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <CheckoutSuccess />
      <span className="grid h-20 w-20 place-items-center rounded-full bg-sage/15 text-sage">
        <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
      </span>
      <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-coral">
        Payment received
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-charcoal sm:text-5xl">
        Thank you for your order
      </h1>
      <p className="mt-5 max-w-xl text-stone-600">
        Stripe will email your payment confirmation. We&apos;ll prepare your pet&apos;s new look and contact you with shipping updates.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="rounded-full bg-coral px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-coral-dark"
        >
          Continue shopping
        </Link>
        <Link
          href="/"
          className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-charcoal ring-1 ring-stone-200 transition hover:ring-coral"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
