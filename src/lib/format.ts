import type {Locale} from "@/i18n/dictionaries";

export function formatPrice(amount: number, locale: Locale = "en"): string {
  return new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 2,
  }).format(amount);
}
