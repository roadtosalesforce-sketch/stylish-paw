"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {X} from "lucide-react";
import type {Product} from "@/types/product";
import type {Dictionary, Locale} from "@/i18n/dictionaries";
import {formatPrice} from "@/lib/format";
import {AddToCartForm} from "./add-to-cart-form";

export function QuickAddDialog({product, locale, dict}: {product: Product; locale: Locale; dict: Dictionary}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-full bg-charcoal px-4 py-3 text-sm font-bold text-white transition hover:bg-coral"
      >
        {dict.shop.quickAdd}
      </button>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center bg-charcoal/45 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={dict.shop.quickViewTitle} onClick={() => setOpen(false)}>
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] bg-white p-5 shadow-2xl sm:rounded-[2rem] sm:p-7" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-coral">{dict.shop.quickViewTitle}</p>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-stone-100 p-2 text-charcoal" aria-label={dict.shop.closeQuickView}><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4 grid gap-6 sm:grid-cols-[.72fr_1fr]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" />
              </div>
              <div>
                <Link href={`/shop/${product.slug}`} className="font-display text-2xl font-bold text-charcoal hover:text-coral">{product.name}</Link>
                <p className="mt-2 font-bold text-coral">{formatPrice(product.price, locale)}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-600">{product.description}</p>
                <div className="mt-5 border-t border-stone-100 pt-5">
                  <AddToCartForm product={product} locale={locale} dict={dict} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
