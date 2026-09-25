import type {Locale} from "@/i18n/dictionaries";
import type {Currency} from "@/lib/currency";

export function formatPrice(amount: number, locale: Locale = "en", currency: Currency = "PLN"): string {
  return new Intl.NumberFormat(locale === "pl" ? "pl-PL" : "en-PL", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}
