"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { SizeGuideDialog } from "./size-guide-dialog";
import type {Dictionary, Locale} from "@/i18n/dictionaries";
import {optionLabel} from "@/i18n/product-labels";

export function AddToCartForm({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addItem(product, size, color, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between gap-4"><label className="block text-sm font-semibold text-charcoal">{dict.product.chooseSize}</label><SizeGuideDialog dict={dict} product={product} /></div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                size === s
                  ? "bg-charcoal text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-charcoal/30"
              }`}
            >
              {optionLabel(product, "size", s, locale)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-charcoal">{dict.product.chooseColour}</label>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                color === c
                  ? "bg-charcoal text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-charcoal/30"
              }`}
            >
              {optionLabel(product, "color", c, locale)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-charcoal">{dict.product.quantity}</label>
        <div className="inline-flex items-center rounded-lg ring-1 ring-stone-200">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-lg text-stone-500 hover:text-charcoal"
          >
            −
          </button>
          <span className="min-w-[3rem] text-center font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-2 text-lg text-stone-500 hover:text-charcoal"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className={`flex-1 rounded-full py-4 text-sm font-bold text-white shadow-md transition-all ${
            added
              ? "bg-sage"
              : "bg-coral hover:bg-coral-dark hover:shadow-lg"
          }`}
        >
          {added ? dict.product.added : dict.product.add}
        </button>
        <button
          type="button"
          onClick={() => {
            addItem(product, size, color, quantity);
            router.push("/cart");
          }}
          className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-charcoal ring-1 ring-stone-200 transition-all hover:ring-coral/40"
        >
          {dict.product.buy}
        </button>
      </div>
    </form>
  );
}
