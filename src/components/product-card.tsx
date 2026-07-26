import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-coral/30"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-sage">
          {product.category}
        </p>
        <h3 className="mb-1 font-display text-base font-semibold text-charcoal group-hover:text-coral transition-colors">
          {product.name}
        </h3>
        <p className="mt-auto pt-2 font-semibold text-charcoal">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
