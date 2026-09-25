import {createClient} from "next-sanity";
import {getFallbackProducts} from "@/data/products";
import type {Product} from "@/types/product";
import type {Locale} from "@/i18n/dictionaries";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0w20qxza";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = projectId
  ? createClient({projectId, dataset, apiVersion: "2026-08-13", useCdn: true})
  : null;

// Publishing a document in Sanity is not the same as making it ready for sale.
// This shared filter keeps unfinished products out of every storefront route.
const sellableProductFilter = `
  _type == "product" &&
  status == "active" &&
  defined(slug.current) &&
  defined(name) &&
  defined(price) && price > 0 &&
  defined(image.asset) &&
  defined(category) &&
  count(sizes) > 0 &&
  count(colors) > 0 &&
  length(pt::text(description)) > 0
`;

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
  "sizeOptions": sizes[]{name, namePl, stock},
  "colors": colors[].name,
  "colorOptions": colors[]{name, namePl},
  "image": image.asset->url,
  "gallery": gallery[]{"url": asset->url, alt},
  fitProfiles,
  "material": select($locale == "pl" => coalesce(materialPl, material), material),
  "careInstructions": select($locale == "pl" => coalesce(careInstructionsPl, careInstructions), careInstructions),
  "fitNotes": select($locale == "pl" => coalesce(fitNotesPl, fitNotes), fitNotes),
  "relatedProductIds": relatedProducts[]._ref,
  trackInventory,
  "variants": inventoryVariants[]{"key": _key, size, color, sku, stock},
  "sizeGuide": sizeGuide->{
    "title": select($locale == "pl" => coalesce(titlePl, title), title),
    "instructions": select($locale == "pl" => coalesce(instructionsPl, instructions), instructions),
    rows[]{size, neck, chest, back, weight}
  },
  "reviews": reviews[approved == true]{
    customerName,
    petName,
    rating,
    "quote": select($locale == "pl" => coalesce(quotePl, quote), quote),
    "photo": photo.asset->url
  },
  featured,
  badge,
  "seoTitle": select($locale == "pl" => coalesce(seoTitlePl, seoTitle), seoTitle),
  "seoDescription": select($locale == "pl" => coalesce(seoDescriptionPl, seoDescription), seoDescription)
`;

type SanityProduct = Omit<Product, "category"> & {
  category: string;
  namePl?: string;
  descriptionPl?: string;
  sizeOptions?: Array<{name?: string; namePl?: string}>;
  colorOptions?: Array<{name?: string; namePl?: string}>;
};

const categoryAliases: Record<string, Product["category"]> = {
  clothing: "clothing",
  sweaters: "clothing",
  raincoats: "clothing",
  costumes: "clothing",
  outerwear: "clothing",
  wear: "clothing",
  "collars-leashes": "collars-leashes",
  collars: "collars-leashes",
  leashes: "collars-leashes",
  walk: "collars-leashes",
  accessories: "collars-leashes",
  essentials: "essentials",
  play: "essentials",
  eat: "essentials",
  care: "essentials",
  rest: "essentials",
};

export function normalizeCategory(value: string): Product["category"] {
  return categoryAliases[value] || "essentials";
}

function localizeProduct(product: SanityProduct, locale: Locale): Product {
  const sizeLabelsPl = Object.fromEntries((product.sizeOptions || []).filter((item) => item.name && item.namePl).map((item) => [item.name as string, item.namePl as string]));
  const colorLabelsPl = Object.fromEntries((product.colorOptions || []).filter((item) => item.name && item.namePl).map((item) => [item.name as string, item.namePl as string]));
  return {
    ...product,
    category: normalizeCategory(product.category),
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
    const items = await client.fetch<SanityProduct[]>(
      `*[${sellableProductFilter}] | order(sortOrder asc, name asc) {${productFields}}`,
      {locale},
    );
    return items.map((item) => localizeProduct(item, locale));
  } catch {
    return [];
  }
}

export async function getFeaturedProducts(locale: Locale = "en"): Promise<Product[]> {
  const items = await getProducts(locale);
  const featured = items.filter((item) => item.featured);
  return (featured.length ? featured : items).slice(0, 4);
}

export async function getProductBySlug(slug: string, locale: Locale = "en"): Promise<Product | undefined> {
  const fallbackProducts = getFallbackProducts(locale);
  if (!client) return fallbackProducts.find((item) => item.slug === slug);
  try {
    const product = await client.fetch<SanityProduct | null>(
      `*[${sellableProductFilter} && slug.current == $slug][0] {${productFields}}`,
      {slug, locale},
    );
    return product ? localizeProduct(product, locale) : undefined;
  } catch {
    return undefined;
  }
}
