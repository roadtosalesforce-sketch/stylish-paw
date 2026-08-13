import Link from "next/link";
import { ArrowRight, Ruler } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stone-200/70 bg-gradient-to-br from-[#fbf8f2] via-white to-[#eef3ec]">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-coral/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-sage/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-[.9fr_1.1fr] md:py-20 lg:px-8">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-1.5 text-sm font-medium text-coral">
            <span>Thoughtful design · Comfortable fit</span>
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            Made to fit.{" "}
            <span className="text-coral">Designed to delight.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-stone-600">
            Comfortable clothing for dogs and cats, designed for everyday
            walks, celebrations and all the moments worth remembering.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-coral px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-dark hover:shadow-lg"
            >
              Shop New Arrivals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/pages/size-guide"
              className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-charcoal ring-1 ring-stone-200 transition-all hover:ring-coral/40"
            >
              <Ruler className="mr-2 h-4 w-4" /> Find Your Pet&apos;s Size
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-stone-200 shadow-2xl ring-1 ring-stone-200/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
              alt="Happy dog wearing a cozy sweater"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-2xl bg-white px-5 py-3 shadow-lg ring-1 ring-stone-100 sm:-left-4">
            <p className="text-xs font-medium text-stone-500">Need help choosing?</p>
            <p className="font-display text-base font-bold text-charcoal">Simple size guidance</p>
          </div>
        </div>
      </div>
    </section>
  );
}
