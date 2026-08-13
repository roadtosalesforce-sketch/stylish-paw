"use client";

import Link from "next/link";
import { ChevronDown, Menu, Ruler, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { CartButton } from "./cart-button";

const shopGroups = [
  {title: "Clothing", links: [["Sweaters", "sweaters"], ["Raincoats", "raincoats"], ["Outerwear", "outerwear"], ["Costumes", "costumes"]]},
  {title: "Discover", links: [["New Arrivals", "new"], ["Best Sellers", "bestsellers"], ["Accessories", "accessories"], ["Shop All", "all"]]},
  {title: "By Pet", links: [["Gifts for Dogs", "dogs"], ["Gifts for Cats", "cats"], ["Everyday Essentials", "essentials"], ["Celebration Looks", "celebration"]]},
];

export function Header({announcement, shopName}: {announcement?: string; shopName?: string}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fffdf9]/95 backdrop-blur-md">
      <div className="bg-charcoal px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[.14em] text-white sm:text-xs">{announcement || "Designed for comfort, made for memorable moments"}</div>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-white shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-charcoal">
            {shopName || "Furry Fairy Pets"}
          </span>
        </Link>

        <nav className="hidden h-full items-center gap-7 md:flex">
          <div className="group flex h-full items-center">
            <button className="flex items-center gap-1 text-sm font-semibold text-stone-700 transition hover:text-coral">Shop <ChevronDown className="h-3.5 w-3.5" /></button>
            <div className="invisible absolute left-0 right-0 top-[106px] translate-y-2 border-y border-stone-200 bg-white opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="mx-auto grid max-w-7xl grid-cols-4 gap-10 px-8 py-9">
                {shopGroups.map((group) => <div key={group.title}><p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-stone-400">{group.title}</p><ul className="space-y-3">{group.links.map(([label, value]) => <li key={value}><Link className="font-medium text-charcoal hover:text-coral" href={value === "all" ? "/shop" : value === "dogs" || value === "cats" ? `/shop?pet=${value.slice(0,-1)}` : `/shop?category=${value}`}>{label}</Link></li>)}</ul></div>)}
                <Link href="/shop?category=raincoats" className="rounded-2xl bg-[#eef3ec] p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-sage">Seasonal edit</p><p className="mt-2 font-display text-2xl font-bold">Ready for rainy walks</p><span className="mt-5 inline-block text-sm font-bold text-coral">Explore rainwear →</span></Link>
              </div>
            </div>
          </div>
          <Link href="/shop?category=new" className="text-sm font-semibold text-stone-700 hover:text-coral">New Arrivals</Link>
          <Link href="/shop?category=bestsellers" className="text-sm font-semibold text-stone-700 hover:text-coral">Best Sellers</Link>
          <Link href="/pages/size-guide" className="flex items-center gap-1.5 text-sm font-semibold text-stone-700 hover:text-coral"><Ruler className="h-4 w-4" /> Size & Fit</Link>
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full p-2 text-charcoal md:hidden" aria-label="Open menu">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {mobileOpen && <div className="border-t border-stone-200 bg-white px-5 py-6 md:hidden"><div className="grid gap-4">{[["New Arrivals","new"],["Best Sellers","bestsellers"],["Sweaters","sweaters"],["Raincoats","raincoats"],["Costumes","costumes"],["Accessories","accessories"],["Outerwear","outerwear"]].map(([label,value]) => <Link onClick={() => setMobileOpen(false)} key={value} href={`/shop?category=${value}`} className="font-semibold text-charcoal">{label}</Link>)}<Link onClick={() => setMobileOpen(false)} href="/pages/size-guide" className="border-t border-stone-200 pt-4 font-semibold text-coral">Size & Fit</Link></div></div>}
    </header>
  );
}
