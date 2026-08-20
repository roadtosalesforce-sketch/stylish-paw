import {createClient} from "next-sanity";
import {getFallbackProducts} from "@/data/products";
import type {Product} from "@/types/product";
import type {Locale} from "@/i18n/dictionaries";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0w20qxza";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = projectId
  ? createClient({projectId, dataset, apiVersion: "2026-08-13", useCdn: true})
  : null;

const productFields = `
  "id": _id,
  "slug": slug.current,
  name,
  namePl,
  "description": pt::text(description),
  "descriptionPl": pt::text(descriptionPl),
  price,
  "category": category->slug.current,
  petType,
  "sizes": sizes[].name,
  "sizeOptions": sizes[]{name, namePl},
  "colors": colors[].name,
  "colorOptions": colors[]{name, namePl},
  "image": image.asset->url,
  featured,
  badge
`;

type SanityProduct = Product & {
  namePl?: string;
  descriptionPl?: string;
  sizeOptions?: Array<{name?: string; namePl?: string}>;
  colorOptions?: Array<{name?: string; namePl?: string}>;
};

function localizeProduct(product: SanityProduct, locale: Locale): Product {
  const sizeLabelsPl = Object.fromEntries((product.sizeOptions || []).filter((item) => item.name && item.namePl).map((item) => [item.name as string, item.namePl as string]));
  const colorLabelsPl = Object.fromEntries((product.colorOptions || []).filter((item) => item.name && item.namePl).map((item) => [item.name as string, item.namePl as string]));
  return {
    ...product,
    nameEn: product.name,
    descriptionEn: product.description,
    sizeLabelsPl,
    colorLabelsPl,
    name: locale === "pl" ? product.namePl || product.name : product.name,
    description: locale === "pl" ? product.descriptionPl || product.description : product.description,
  };
}

export async function getProducts(locale: Locale = "en"): Promise<Product[]> {
  const fallbackProducts = getFallbackProducts(locale);
  if (!client) return fallbackProducts;
  try {
    const items = await client.fetch<SanityProduct[]>(`*[_type == "product"] | order(sortOrder asc, name asc) {${productFields}}`);
    return items.length ? items.map((item) => localizeProduct(item, locale)) : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getFeaturedProducts(locale: Locale = "en"): Promise<Product[]> {
  const items = await getProducts(locale);
  return items.filter((item) => item.featured);
}

export async function getProductBySlug(slug: string, locale: Locale = "en"): Promise<Product | undefined> {
  const fallbackProducts = getFallbackProducts(locale);
  if (!client) return fallbackProducts.find((item) => item.slug === slug);
  try {
    const product = await client.fetch<SanityProduct | null>(
      `*[_type == "product" && slug.current == $slug][0] {${productFields}}`,
      {slug},
    );
    return product ? localizeProduct(product, locale) : fallbackProducts.find((item) => item.slug === slug);
  } catch {
    return fallbackProducts.find((item) => item.slug === slug);
  }
}
