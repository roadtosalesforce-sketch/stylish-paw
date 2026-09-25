"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/products";
import type {Dictionary} from "@/i18n/dictionaries";
import {Cat, Dog, PawPrint} from "lucide-react";

export function CategoryFilter({dict}: {dict: Dictionary}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get("category") ?? "all";
  const activePet = searchParams.get("pet") ?? "all";
  const activeFit = searchParams.get("fit") ?? "all";

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

  function selectFit(fit: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (fit === "all") params.delete("fit");
    else params.set("fit", fit);
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
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activePet === value ? "bg-sage-dark text-white shadow-sm" : "bg-[#faf8f2] text-[#5f5b52] ring-1 ring-[#ded9cc] hover:bg-[#f1eee4] hover:ring-sage-dark/40"}`}
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
                : "bg-[#faf8f2] text-[#5f5b52] ring-1 ring-[#ded9cc] hover:bg-[#f1eee4] hover:ring-coral/50"
            }`}
          >
            {dict.common.categories[cat.id]}
          </button>
        ))}
      </div>
      <div className="border-t border-[#ded9cc] pt-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-sage-dark">{dict.shop.specialFits}</p>
        <div className="flex flex-wrap gap-2" aria-label={dict.shop.filterByFit}>
          {[
            ["all", dict.shop.allFits],
            ["dachshund", dict.shop.fitDachshund],
            ["sighthound", dict.shop.fitSighthound],
            ["bulldog", dict.shop.fitBulldog],
            ["small-dog", dict.shop.fitSmallDog],
            ["large-dog", dict.shop.fitLargeDog],
            ["puppy", dict.shop.fitPuppy],
          ].map(([value, label]) => (
            <button key={value} type="button" onClick={() => selectFit(value)} className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[.08em] transition ${activeFit === value ? "border-sage-dark bg-sage-dark text-white" : "border-[#d7d1c3] bg-[#faf8f2] text-[#5f5b52] hover:border-sage-dark hover:bg-[#f1eee4]"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CategoryLinks({dict}: {dict: Dictionary}) {
  return (
    <div className="grid border-y border-stone-300 md:grid-cols-3">
      {categories.slice(1).map((cat, index) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.id}`}
          className="group flex min-h-44 flex-col justify-between border-b border-stone-300 bg-white px-5 py-7 transition-colors last:border-b-0 hover:bg-[#f3f1eb] md:border-b-0 md:border-r md:last:border-r-0 lg:min-h-52 lg:px-8 lg:py-9"
        >
          <span className="text-[10px] font-semibold tracking-[.18em] text-stone-400">0{index + 1}</span>
          <span className="flex items-end justify-between gap-2 text-left text-lg font-semibold uppercase tracking-[.08em] text-charcoal lg:text-xl">
            {dict.common.categories[cat.id]}
            <span aria-hidden="true" className="text-stone-500 transition-transform group-hover:translate-x-1">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
