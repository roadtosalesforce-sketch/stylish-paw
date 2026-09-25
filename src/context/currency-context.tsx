"use client";

import {createContext, useContext, useMemo, useSyncExternalStore} from "react";
import {DEFAULT_EUR_RATE, isCurrency, type Currency} from "@/lib/currency";

type CurrencyContextValue = {
  currency: Currency;
  eurRate: number;
  setCurrency: (currency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);
const STORAGE_KEY = "ffp-currency";
const CHANGE_EVENT = "ffp-currency-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function getSnapshot(): Currency {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isCurrency(stored) ? stored : "PLN";
}

function getServerSnapshot(): Currency {
  return "PLN";
}

export function CurrencyProvider({children, eurRate = DEFAULT_EUR_RATE}: {children: React.ReactNode; eurRate?: number}) {
  const currency = useSyncExternalStore<Currency>(subscribe, getSnapshot, getServerSnapshot);

  function setCurrency(nextCurrency: Currency) {
    window.localStorage.setItem(STORAGE_KEY, nextCurrency);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  const value = useMemo(
    () => ({currency, eurRate: Number.isFinite(eurRate) && eurRate > 0 ? eurRate : DEFAULT_EUR_RATE, setCurrency}),
    [currency, eurRate],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
