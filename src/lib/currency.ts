export const currencies = ["PLN", "EUR"] as const;

export type Currency = (typeof currencies)[number];

export const DEFAULT_EUR_RATE = 0.23;

export function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && currencies.includes(value as Currency);
}

export function convertFromPln(
  amountPln: number,
  currency: Currency,
  eurRate = DEFAULT_EUR_RATE,
): number {
  if (currency === "PLN") return amountPln;
  return Math.round(amountPln * eurRate * 100) / 100;
}

export function currencyMinorAmount(
  amountPln: number,
  currency: Currency,
  eurRate = DEFAULT_EUR_RATE,
): number {
  return Math.round(convertFromPln(amountPln, currency, eurRate) * 100);
}
