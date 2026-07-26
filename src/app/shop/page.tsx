import Link from "next/link";
import { Suspense } from "react";
import { CategoryFilter } from "@/components/category-filter";
import { ProductGrid } from "@/components/product-grid";
import { products } from "@/data/products";
import type { Category } from "@/types/product";

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  const filtered =
    category && category !== "all"
      ? products.filter((p) => p.category === (category as Category))
      : products;

  const activeCategory =
    category && category !== "all"
      ? category.charAt(0).toUpperCase() + category.slice(1)
      : "All Products";

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
