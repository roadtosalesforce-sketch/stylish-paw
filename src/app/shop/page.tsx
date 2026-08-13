import Link from "next/link";
import { Suspense } from "react";
import { CategoryFilter } from "@/components/category-filter";
import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/sanity/lib/products";
import type { Category } from "@/types/product";

interface ShopPageProps {
  searchParams: Promise<{ category?: string; pet?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, pet } = await searchParams;
  const products = await getProducts();
  const filtered = products.filter((p, index) => {
    if (pet && p.petType !== pet && p.petType !== "both") return false;
    if (!category || category === "all") return true;
    if (category === "new") return index < 6;
    if (category === "bestsellers") return p.badge?.toLowerCase() === "bestseller" || p.featured;
    if (category === "essentials") return ["sweaters", "outerwear", "accessories"].includes(p.category);
    if (category === "celebration") return p.category === "costumes";
    return p.category === (category as Category);
  });

  const activeCategory =
    category && category !== "all"
      ? category === "new" ? "New Arrivals" : category === "bestsellers" ? "Best Sellers" : category.charAt(0).toUpperCase() + category.slice(1)
      : pet ? `For ${pet === "dog" ? "Dogs" : "Cats"}` : "All Products";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone-500">
        <Link href="/" className="hover:text-coral transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">Shop</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
          {activeCategory}
        </h1>
        <p className="mt-2 text-stone-500">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="mb-8">
        <Suspense fallback={<div className="h-10" />}>
          <CategoryFilter />
        </Suspense>
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
