"use client";

import { CartProvider } from "@/context/cart-context";
import {CurrencyProvider} from "@/context/currency-context";

export function Providers({ children, eurRate }: { children: React.ReactNode; eurRate?: number }) {
  return <CurrencyProvider eurRate={eurRate}><CartProvider>{children}</CartProvider></CurrencyProvider>;
}
