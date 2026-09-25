"use client";

import {ChevronDown} from "lucide-react";
import {useCurrency} from "@/context/currency-context";
import type {Currency} from "@/lib/currency";

export function CurrencySwitcher({label}: {label: string}) {
  const {currency, setCurrency} = useCurrency();

  return (
    <label className="relative inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.08em] text-charcoal">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{currency === "PLN" ? "🇵🇱" : "🇪🇺"}</span>
      <select
        value={currency}
        onChange={(event) => setCurrency(event.target.value as Currency)}
        className="appearance-none bg-transparent py-2 pl-0 pr-5 outline-none"
        aria-label={label}
      >
        <option value="PLN">PLN zł</option>
        <option value="EUR">EUR €</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5" />
    </label>
  );
}
