import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";
import type {Dictionary, Locale} from "@/i18n/dictionaries";
import Link from "next/link";
import { PawPrint } from "lucide-react";

export function ProductGrid({ products, locale, dict }: { products: Product[]; locale: Locale; dict: Dictionary }) {
  if (products.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white/70 px-6 py-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee8] text-coral" aria-hidden="true">
          <PawPrint className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <p className="mt-5 text-lg font-bold text-charcoal">{dict.shop.noProducts}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">{dict.shop.tryFilter}</p>
        <Link href="/shop" className="mt-6 inline-flex rounded-full bg-coral px-6 py-3 text-sm font-bold text-white transition hover:bg-coral-dark">
          {dict.shop.clearFilters}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} dict={dict} />
      ))}
    </div>
  );
}
