"use client";

import {useCurrency} from "@/context/currency-context";
import type {Locale} from "@/i18n/dictionaries";
import {convertFromPln} from "@/lib/currency";
import {formatPrice} from "@/lib/format";

export function Price({amount, locale, className}: {amount: number; locale: Locale; className?: string}) {
  const {currency, eurRate} = useCurrency();
  return <span className={className}>{formatPrice(convertFromPln(amount, currency, eurRate), locale, currency)}</span>;
}
