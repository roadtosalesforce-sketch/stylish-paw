"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import { useCart } from "@/context/cart-context";
import {InPostLockerSelector} from "@/components/inpost-locker-selector";
import type {Dictionary, Locale} from "@/i18n/dictionaries";
import {optionLabel, productName} from "@/i18n/product-labels";
import { formatPrice } from "@/lib/format";
import {LockKeyhole, PackageCheck, UserRoundCheck} from "lucide-react";
import {
  FREE_SHIPPING_THRESHOLD_PLN,
  INPOST_LOCKER_CODE_PATTERN,
  INPOST_LOCKER_PRICE_PLN,
} from "@/lib/shipping";

export function CartContent({locale, dict, inPostToken}: {locale: Locale; dict: Dictionary; inPostToken?: string}) {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [parcelLocker, setParcelLocker] = useState("");
  const [parcelLockerAddress, setParcelLockerAddress] = useState("");

  async function startCheckout() {
    const normalizedLocker = parcelLocker.trim().toUpperCase();
    if (!INPOST_LOCKER_CODE_PATTERN.test(normalizedLocker)) {
      setCheckoutError(dict.cart.lockerRequired);
      document.getElementById("inpost-locker-code")?.focus();
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          locale,
          shipping: {
            method: "inpost_locker",
            pointName: normalizedLocker,
            pointAddress: parcelLockerAddress,
          },
          items: items.map((item) => ({
            productId: item.product.id,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
          })),
        }),
      });
      const result = (await response.json()) as {url?: string; error?: string};

      if (!response.ok || !result.url) {
        throw new Error(result.error || dict.cart.error);
      }

      window.location.assign(result.url);
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : dict.cart.error,
      );
      setIsCheckingOut(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="mb-3 text-5xl">🛒</p>
        <h2 className="font-display text-2xl font-bold text-charcoal">
          {dict.cart.emptyTitle}
        </h2>
        <p className="mt-2 text-stone-500">
          {dict.cart.emptyText}
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-coral px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-dark"
        >
          {dict.cart.startShopping}
        </Link>
      </div>
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD_PLN ? 0 : INPOST_LOCKER_PRICE_PLN;
  const total = subtotal + shipping;
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD_PLN) * 100);

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
                  alt={productName(item.product, locale)}
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
                      {productName(item.product, locale)}
                    </Link>
                    <p className="mt-1 text-sm text-stone-500">
                      {optionLabel(item.product, "size", item.size, locale)} · {optionLabel(item.product, "color", item.color, locale)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      removeItem(item.product.id, item.size, item.color)
                    }
                    className="text-sm text-stone-400 hover:text-coral transition-colors"
                  >
                    {dict.cart.remove}
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
                    {formatPrice(item.product.price * item.quantity, locale)}
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
          {dict.cart.clear}
        </button>
      </div>

      <div className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80">
        <h2 className="font-display text-lg font-bold text-charcoal">{dict.cart.summary}</h2>

        <InPostLockerSelector
          locale={locale}
          dict={dict}
          token={inPostToken}
          value={parcelLocker}
          address={parcelLockerAddress}
          shippingLabel={shipping === 0 ? dict.cart.free : formatPrice(shipping, locale)}
          onChange={(point) => {
            setParcelLocker(point.name);
            setParcelLockerAddress(point.address);
            setCheckoutError("");
          }}
        />

        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-stone-500">{dict.cart.subtotal}</dt>
            <dd className="font-medium text-charcoal">{formatPrice(subtotal, locale)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-stone-500">{dict.cart.shipping}</dt>
            <dd className="font-medium text-charcoal">
              {shipping === 0 ? dict.cart.free : formatPrice(shipping, locale)}
            </dd>
          </div>
          {subtotal < FREE_SHIPPING_THRESHOLD_PLN && (
            <div className="rounded-xl bg-[#eef3ec] p-3">
              <p className="text-xs font-semibold text-sage-dark">
                {dict.cart.freeShipping.replace("{amount}", formatPrice(FREE_SHIPPING_THRESHOLD_PLN - subtotal, locale))}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-sage transition-all" style={{width: `${freeShippingProgress}%`}} />
              </div>
            </div>
          )}
          <div className="border-t border-stone-100 pt-3 flex justify-between">
            <dt className="font-semibold text-charcoal">{dict.cart.total}</dt>
            <dd className="font-display text-xl font-bold text-charcoal">
              {formatPrice(total, locale)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={startCheckout}
          disabled={isCheckingOut}
          className="mt-6 w-full rounded-full bg-coral py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-dark disabled:cursor-wait disabled:opacity-70"
        >
          {isCheckingOut ? dict.cart.opening : dict.cart.checkout}
        </button>
        {checkoutError ? (
          <p className="mt-3 text-center text-xs font-medium text-red-600" role="alert">
            {checkoutError}
          </p>
        ) : (
          <p className="mt-3 text-center text-xs text-stone-400">
            {dict.cart.powered}
          </p>
        )}
        <div className="mt-5 grid gap-2 border-t border-stone-100 pt-4 text-xs text-stone-500">
          <span className="flex items-center gap-2"><UserRoundCheck className="h-4 w-4 text-sage" />{dict.cart.guestCheckout}</span>
          <span className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-sage" />{dict.cart.stripeProtection}</span>
          <Link href="/pages/shipping-returns" className="flex items-center gap-2 transition-colors hover:text-coral"><PackageCheck className="h-4 w-4 text-sage" />{dict.cart.deliveryReturns} →</Link>
        </div>
      </div>
    </div>
  );
}
