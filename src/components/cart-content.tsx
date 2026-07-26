"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

export function CartContent() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="mb-3 text-5xl">🛒</p>
        <h2 className="font-display text-2xl font-bold text-charcoal">
          Your cart is empty
        </h2>
        <p className="mt-2 text-stone-500">
          Looks like your pet&apos;s wardrobe needs some love!
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-coral px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-dark"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => {
          const key = `${item.product.id}-${item.size}-${item.color}`;
          return (
            <div
              key={key}
              className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200/80 sm:gap-6 sm:p-5"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:h-28 sm:w-28">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="font-display font-semibold text-charcoal hover:text-coral transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-stone-500">
                      {item.size} · {item.color}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      removeItem(item.product.id, item.size, item.color)
                    }
                    className="text-sm text-stone-400 hover:text-coral transition-colors"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-lg ring-1 ring-stone-200">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.size,
                          item.color,
                          item.quantity - 1,
                        )
                      }
                      className="px-3 py-1 text-stone-500 hover:text-charcoal"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.size,
                          item.color,
                          item.quantity + 1,
                        )
                      }
                      className="px-3 py-1 text-stone-500 hover:text-charcoal"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-charcoal">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={clearCart}
          className="text-sm text-stone-400 hover:text-coral transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80">
        <h2 className="font-display text-lg font-bold text-charcoal">Order Summary</h2>

        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone-500">Subtotal</dt>
            <dd className="font-medium text-charcoal">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-500">Shipping</dt>
            <dd className="font-medium text-charcoal">
              {shipping === 0 ? "Free" : formatPrice(shipping)}
            </dd>
          </div>
          {subtotal < 50 && (
            <p className="text-xs text-sage">
              Add {formatPrice(50 - subtotal)} more for free shipping!
            </p>
          )}
          <div className="border-t border-stone-100 pt-3 flex justify-between">
            <dt className="font-semibold text-charcoal">Total</dt>
            <dd className="font-display text-xl font-bold text-charcoal">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          className="mt-6 w-full rounded-full bg-coral py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-dark"
        >
          Checkout
        </button>
        <p className="mt-3 text-center text-xs text-stone-400">
          Demo store — checkout is not connected to payments
        </p>
      </div>
    </div>
  );
}
