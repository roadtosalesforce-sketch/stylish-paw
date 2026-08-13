export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 2,
  }).format(amount);
}
