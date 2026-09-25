import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import type {Dictionary, Locale} from "@/i18n/dictionaries";
import {Price} from "./price";

export function ProductCard({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const colourLabel = locale === "pl" && product.colors.length === 1 ? "kolor" : dict.shop.colours;
  const sizeLabel = locale === "pl" && product.sizes.length === 1 ? "rozmiar" : dict.shop.sizes;

  return (
    <article className="group flex flex-col bg-white">
      <Link href={`/shop/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-0 top-0 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-charcoal">
            {dict.common.badges[product.badge as keyof typeof dict.common.badges] || product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col border-b border-stone-200 py-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-sage-dark">{dict.common.categories[product.category]}</p>
        <Link href={`/shop/${product.slug}`} className="text-sm font-medium uppercase leading-snug tracking-[.06em] text-charcoal transition-colors group-hover:text-coral">{product.name}</Link>
        <Price amount={product.price} locale={locale} className="mt-2 block text-sm text-charcoal" />
        <p className="mt-2 text-[11px] text-stone-500">{product.colors.length} {colourLabel} · {product.sizes.length} {sizeLabel}</p>
      </div>
    </article>
  );
}
