"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/products";

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get("category") ?? "all";

  function selectCategory(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("category");
    } else {
      params.set("category", id);
    }
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => selectCategory(cat.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            active === cat.id
              ? "bg-coral text-white shadow-sm"
              : "bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-coral/40"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export function CategoryLinks() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {categories.slice(1).map((cat) => (
        <Link
          key={cat.id}
          href={`/shop?category=${cat.id}`}
          className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/80 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-coral/30"
        >
          <span className="mb-2 text-3xl transition-transform group-hover:scale-110">
            {categoryEmoji(cat.id)}
          </span>
          <span className="text-sm font-semibold text-charcoal">{cat.label}</span>
        </Link>
      ))}
    </div>
  );
}

function categoryEmoji(id: string) {
  const map: Record<string, string> = {
    sweaters: "🧶",
    raincoats: "🌧️",
    costumes: "🎭",
    accessories: "🎀",
    outerwear: "🧥",
  };
  return map[id] ?? "🐾";
}
