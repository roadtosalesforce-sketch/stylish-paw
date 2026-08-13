import {createClient} from "next-sanity";
import {products as fallbackProducts} from "@/data/products";
import type {Product} from "@/types/product";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0w20qxza";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = projectId
  ? createClient({projectId, dataset, apiVersion: "2026-08-13", useCdn: true})
  : null;

const productFields = `
  "id": _id,
  "slug": slug.current,
  name,
  "description": coalesce(pt::text(description), description),
  price,
  "category": category->slug.current,
  petType,
  "sizes": sizes[].name,
  "colors": colors[].name,
  "image": image.asset->url,
  featured,
  badge
`;

export async function getProducts(): Promise<Product[]> {
  if (!client) return fallbackProducts;
  try {
    const items = await client.fetch<Product[]>(`*[_type == "product"] | order(sortOrder asc, name asc) {${productFields}}`);
    return items.length ? items : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const items = await getProducts();
  return items.filter((item) => item.featured);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!client) return fallbackProducts.find((item) => item.slug === slug);
  try {
    return (await client.fetch<Product | null>(`*[_type == "product" && slug.current == $slug][0] {${productFields}}`, {slug})) || undefined;
  } catch {
    return fallbackProducts.find((item) => item.slug === slug);
  }
}
