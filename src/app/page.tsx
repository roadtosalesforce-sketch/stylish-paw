import Link from "next/link";
import { Hero } from "@/components/hero";
import { CategoryLinks } from "@/components/category-filter";
import { ProductGrid } from "@/components/product-grid";
import { getFeaturedProducts } from "@/data/products";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
          Shop by Category
        </h2>
        <p className="mt-2 text-stone-500">Find the perfect outfit for every occasion</p>
        <div className="mt-8">
          <CategoryLinks />
        </div>
      </section>

      <section className="bg-white/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
                Featured Picks
              </h2>
              <p className="mt-2 text-stone-500">Our most-loved styles this season</p>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-semibold text-coral hover:text-coral-dark sm:block"
            >
              View all →
            </Link>
          </div>
          <ProductGrid products={featured} />
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop"
              className="text-sm font-semibold text-coral hover:text-coral-dark"
            >
              View all products →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-sage to-sage-dark px-8 py-12 text-center text-white sm:px-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Join the PawStyle Pack
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            Get 10% off your first order and early access to new collections.
          </p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-full px-5 py-3 text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="button"
              className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-dark"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
