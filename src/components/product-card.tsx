import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { ArrowUpRight } from "lucide-react";
import type {Dictionary, Locale} from "@/i18n/dictionaries";

export function ProductCard({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const colourLabel = locale === "pl" && product.colors.length === 1 ? "kolor" : dict.shop.colours;
  const sizeLabel = locale === "pl" && product.sizes.length === 1 ? "rozmiar" : dict.shop.sizes;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.35rem] bg-white shadow-[0_8px_30px_rgba(61,44,44,.06)] ring-1 ring-stone-200/80 transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(61,44,44,.12)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {dict.common.badges[product.badge as keyof typeof dict.common.badges] || product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-[11px] font-bold uppercase tracking-[.16em] text-sage">{dict.common.categories[product.category]}</p>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-charcoal transition-colors group-hover:text-coral">{product.name}</h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-stone-400 transition group-hover:text-coral" />
        </div>
        <p className="mt-3 font-bold text-charcoal">{formatPrice(product.price, locale)}</p>
        <p className="mt-2 text-xs text-stone-500">{product.colors.length} {colourLabel} · {product.sizes.length} {sizeLabel}</p>
      </div>
    </Link>
  );
}
