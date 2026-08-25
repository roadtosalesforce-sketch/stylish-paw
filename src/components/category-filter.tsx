"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/products";
import type {Dictionary} from "@/i18n/dictionaries";
import {Cat, CloudRain, Dog, PartyPopper, PawPrint, Shirt, Sparkles, Wind} from "lucide-react";

export function CategoryFilter({dict}: {dict: Dictionary}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get("category") ?? "all";
  const activePet = searchParams.get("pet") ?? "all";

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

  function selectPet(pet: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (pet === "all") params.delete("pet");
    else params.set("pet", pet);
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" aria-label={dict.shop.filterByPet}>
        {[
          ["all", dict.shop.allPets, PawPrint],
          ["dog", dict.shop.forDogs, Dog],
          ["cat", dict.shop.forCats, Cat],
        ].map(([value, label, Icon]) => (
          <button
            key={value as string}
            type="button"
            onClick={() => selectPet(value as string)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activePet === value ? "bg-charcoal text-white shadow-sm" : "bg-[#fbf8f2] text-stone-700 ring-1 ring-stone-200 hover:ring-charcoal/30"}`}
          >
            <Icon className="h-4 w-4" /> {label as string}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2" aria-label={dict.shop.filterByCategory}>
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
            {dict.common.categories[cat.id]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CategoryLinks({dict}: {dict: Dictionary}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {categories.slice(1).map((cat) => (
        <Link
          key={cat.id}
          href={`/shop?category=${cat.id}`}
          className="group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-[0_8px_30px_rgba(61,44,44,.06)] ring-1 ring-stone-200/80 transition-all hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(61,44,44,.12)] hover:ring-coral/30"
        >
          <span className="absolute -right-6 -top-7 h-24 w-24 rounded-full bg-coral/8 transition-transform group-hover:scale-125" />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8eee8] text-coral transition-transform group-hover:scale-105">
            {categoryIcon(cat.id)}
          </span>
          <span className="relative flex items-end justify-between gap-2 text-left text-sm font-bold text-charcoal">
            {dict.common.categories[cat.id]}
            <span aria-hidden="true" className="text-coral transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

function categoryIcon(id: string) {
  const map = {
    sweaters: Shirt,
    raincoats: CloudRain,
    costumes: PartyPopper,
    accessories: Sparkles,
    outerwear: Wind,
  };
  const Icon = map[id as keyof typeof map] ?? Shirt;
  return <Icon className="h-5 w-5" strokeWidth={1.8} />;
}
