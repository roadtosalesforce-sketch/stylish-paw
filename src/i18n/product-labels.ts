import type {Locale} from "./dictionaries";
import type {Product} from "@/types/product";

export function productName(product: Product, locale: Locale) {
  return locale === "pl" ? product.namePl || product.name : product.nameEn || product.name;
}

export function optionLabel(product: Product, kind: "size" | "color", value: string, locale: Locale) {
  if (locale !== "pl") return value;
  return kind === "size" ? product.sizeLabelsPl?.[value] || value : product.colorLabelsPl?.[value] || value;
}
