import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-sage/10">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-coral/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-sage/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-coral/10 px-4 py-1.5 text-sm font-medium text-coral">
            <span>New arrivals every week</span>
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            A little magic for{" "}
            <span className="text-coral">every furry friend</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-stone-600">
            Playful clothing and accessories designed to keep dogs and cats
            comfortable, expressive, and camera-ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-coral px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-dark hover:shadow-lg"
            >
              Shop Collection
            </Link>
            <Link
              href="/shop?category=sweaters"
              className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-charcoal ring-1 ring-stone-200 transition-all hover:ring-coral/40"
            >
              Browse Sweaters
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-200 shadow-2xl ring-1 ring-stone-200/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
              alt="Happy dog wearing a cozy sweater"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white px-5 py-3 shadow-lg ring-1 ring-stone-100">
            <p className="text-xs font-medium text-stone-500">Free shipping</p>
            <p className="font-display text-lg font-bold text-charcoal">Orders $50+</p>
          </div>
          <div className="absolute -right-4 -top-4 rounded-2xl bg-sage px-5 py-3 text-white shadow-lg">
            <p className="text-xs font-medium opacity-90">Happy pets</p>
            <p className="font-display text-lg font-bold">10,000+</p>
          </div>
        </div>
      </div>
    </section>
  );
}
