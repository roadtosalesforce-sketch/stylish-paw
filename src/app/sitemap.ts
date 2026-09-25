import type {MetadataRoute} from "next";
import {getBlogPosts} from "@/sanity/lib/content";
import {getProducts} from "@/sanity/lib/products";

const baseUrl = "https://www.furryfairypets.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([getProducts("en"), getBlogPosts("en")]);
  const staticPages = ["", "/shop", "/categories/clothing", "/categories/collars-leashes", "/categories/essentials", "/blog", "/pages/about-us", "/pages/size-guide", "/pages/shipping-returns", "/pages/faq", "/pages/contact"];
  return [
    ...staticPages.map((path) => ({url: `${baseUrl}${path}`, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7})),
    ...products.map((product) => ({url: `${baseUrl}/shop/${product.slug}`, changeFrequency: "weekly" as const, priority: 0.8})),
    ...posts.map((post) => ({url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: "monthly" as const, priority: 0.6})),
  ];
}
