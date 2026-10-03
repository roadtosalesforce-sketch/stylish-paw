"use client";

import Link from "next/link";
import {useEffect} from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & {digest?: string};
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Storefront render error", error.digest || "client");
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-sage-dark">Furry Fairy Pets</p>
      <h1 className="mt-4 text-4xl font-medium uppercase tracking-[.04em] text-charcoal sm:text-5xl">Something went wrong</h1>
      <p className="mt-5 max-w-lg leading-relaxed text-stone-600">Coś poszło nie tak. Your cart is still safe in this browser; please try loading the page again.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => unstable_retry()} className="bg-charcoal px-7 py-3 text-xs font-semibold uppercase tracking-[.12em] text-white hover:bg-coral-dark">Try again</button>
        <Link href="/" className="border border-charcoal/25 px-7 py-3 text-xs font-semibold uppercase tracking-[.12em] text-charcoal hover:border-charcoal">Home</Link>
      </div>
    </section>
  );
}
