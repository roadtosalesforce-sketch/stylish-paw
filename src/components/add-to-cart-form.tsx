"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { SizeGuideDialog } from "./size-guide-dialog";
import type {Dictionary, Locale} from "@/i18n/dictionaries";
import {optionLabel} from "@/i18n/product-labels";
import {availableColors, availableSizes, isVariantAvailable, variantStock} from "@/lib/inventory";

export function AddToCartForm({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const { addItem } = useCart();
  const router = useRouter();
  const initialSize = availableSizes(product)[0] || product.sizes[0];
  const initialColor = availableColors(product, initialSize)[0] || product.colors[0];
  const [size, setSize] = useState(initialSize);
  const [color, setColor] = useState(initialColor);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const stock = variantStock(product, size, color);
  const available = isVariantAvailable(product, size, color);
  const maxQuantity = stock === null ? 10 : Math.max(1, stock);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!available) return;
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
              onClick={() => {
                setSize(s);
                const nextColors = availableColors(product, s);
                if (!nextColors.includes(color)) setColor(nextColors[0] || product.colors[0]);
                setQuantity(1);
              }}
              disabled={!product.colors.some((candidate) => isVariantAvailable(product, s, candidate))}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                size === s
                  ? "bg-charcoal text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-charcoal/30 disabled:cursor-not-allowed disabled:opacity-35"
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
              onClick={() => { setColor(c); setQuantity(1); }}
              disabled={!isVariantAvailable(product, size, c)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                color === c
                  ? "bg-charcoal text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-charcoal/30 disabled:cursor-not-allowed disabled:opacity-35"
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
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            disabled={!available || quantity >= maxQuantity}
            className="px-4 py-2 text-lg text-stone-500 hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-35"
          >
            +
          </button>
        </div>
      </div>

      {stock !== null && <p className={`text-sm font-semibold ${available ? "text-sage-dark" : "text-red-600"}`}>{available ? dict.product.onlyLeft.replace("{count}", String(stock)) : dict.product.outOfStock}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={!available}
          className={`flex-1 rounded-full py-4 text-sm font-bold text-white shadow-md transition-all ${
            added
              ? "bg-sage"
              : "bg-coral hover:bg-coral-dark hover:shadow-lg disabled:cursor-not-allowed disabled:bg-stone-300"
          }`}
        >
          {available ? (added ? dict.product.added : dict.product.add) : dict.product.outOfStock}
        </button>
        <button
          type="button"
          disabled={!available}
          onClick={() => {
            addItem(product, size, color, quantity);
            router.push("/cart");
          }}
          className="rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-charcoal ring-1 ring-stone-200 transition-all hover:ring-coral/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {dict.product.buy}
        </button>
      </div>
    </form>
  );
}
