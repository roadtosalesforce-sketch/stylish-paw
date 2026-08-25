"use client";

import Link from "next/link";
import { ChevronDown, Menu, Ruler, Sparkles, UserRound, X } from "lucide-react";
import { useState } from "react";
import { CartButton } from "./cart-button";
import {LanguageSwitcher} from "./language-switcher";
import type {Dictionary, Locale} from "@/i18n/dictionaries";

export function Header({announcement, shopName, locale, dict, signedIn = false}: {announcement?: string; shopName?: string; locale: Locale; dict: Dictionary; signedIn?: boolean}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const shopGroups = [
    {title: dict.header.clothing, links: [[dict.common.categories.sweaters, "sweaters"], [dict.common.categories.raincoats, "raincoats"], [dict.common.categories.outerwear, "outerwear"], [dict.common.categories.costumes, "costumes"]]},
    {title: dict.header.discover, links: [[dict.header.newArrivals, "new"], [dict.header.bestSellers, "bestsellers"], [dict.common.categories.accessories, "accessories"], [dict.header.shopAll, "all"]]},
    {title: dict.header.byPet, links: [[dict.header.giftsDogs, "dogs"], [dict.header.giftsCats, "cats"], [dict.header.essentials, "essentials"], [dict.header.celebration, "celebration"]]},
  ];
  const mobileLinks = [[dict.header.newArrivals,"new"], [dict.header.bestSellers,"bestsellers"], [dict.common.categories.sweaters,"sweaters"], [dict.common.categories.raincoats,"raincoats"], [dict.common.categories.costumes,"costumes"], [dict.common.categories.accessories,"accessories"], [dict.common.categories.outerwear,"outerwear"]];
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#fffdf9]/95 backdrop-blur-md">
      <div className="bg-charcoal px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[.14em] text-white sm:text-xs">{announcement || dict.header.announcement}</div>
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
            <button className="flex items-center gap-1 text-sm font-semibold text-stone-700 transition hover:text-coral">{dict.common.shop} <ChevronDown className="h-3.5 w-3.5" /></button>
            <div className="invisible absolute left-0 right-0 top-[106px] translate-y-2 border-y border-stone-200 bg-white opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="mx-auto grid max-w-7xl grid-cols-4 gap-10 px-8 py-9">
                {shopGroups.map((group) => <div key={group.title}><p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-stone-400">{group.title}</p><ul className="space-y-3">{group.links.map(([label, value]) => <li key={value}><Link className="font-medium text-charcoal hover:text-coral" href={value === "all" ? "/shop" : value === "dogs" || value === "cats" ? `/shop?pet=${value.slice(0,-1)}` : `/shop?category=${value}`}>{label}</Link></li>)}</ul></div>)}
                <Link href="/shop?category=raincoats" className="rounded-2xl bg-[#eef3ec] p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-sage">{dict.header.seasonalEdit}</p><p className="mt-2 font-display text-2xl font-bold">{dict.header.rainyTitle}</p><span className="mt-5 inline-block text-sm font-bold text-coral">{dict.header.exploreRainwear} →</span></Link>
              </div>
            </div>
          </div>
          <Link href="/shop?category=new" className="text-sm font-semibold text-stone-700 hover:text-coral">{dict.header.newArrivals}</Link>
          <Link href="/shop?category=bestsellers" className="text-sm font-semibold text-stone-700 hover:text-coral">{dict.header.bestSellers}</Link>
          <Link href="/pages/size-guide" className="flex items-center gap-1.5 text-sm font-semibold text-stone-700 hover:text-coral"><Ruler className="h-4 w-4" /> {dict.header.sizeFit}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} label={dict.header.language} />
          <Link
            href={signedIn ? "/account" : "/account/login"}
            aria-label={signedIn ? dict.header.myAccount : dict.header.signIn}
            className="hidden items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-sm font-bold text-charcoal shadow-sm transition hover:border-coral hover:text-coral sm:flex"
          >
            <UserRound className="h-4 w-4" />
            <span>{signedIn ? dict.header.myAccount : dict.header.signIn}</span>
          </Link>
          <Link
            href={signedIn ? "/account" : "/account/login"}
            aria-label={signedIn ? dict.header.myAccount : dict.header.signIn}
            className="rounded-full border border-stone-200 bg-white p-2 text-charcoal shadow-sm sm:hidden"
          >
            <UserRound className="h-5 w-5" />
          </Link>
          <CartButton label={dict.cart.cartLabel} />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full p-2 text-charcoal md:hidden" aria-label={dict.header.openMenu}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {mobileOpen && <div className="border-t border-stone-200 bg-white px-5 py-6 md:hidden"><div className="grid gap-4"><Link onClick={() => setMobileOpen(false)} href={signedIn ? "/account" : "/account/login"} className="flex items-center gap-2 rounded-xl bg-[#eef3ec] px-4 py-3 font-bold text-sage-dark"><UserRound className="h-5 w-5" />{signedIn ? dict.header.myAccount : dict.header.signInRegister}</Link>{mobileLinks.map(([label,value]) => <Link onClick={() => setMobileOpen(false)} key={value} href={`/shop?category=${value}`} className="font-semibold text-charcoal">{label}</Link>)}<Link onClick={() => setMobileOpen(false)} href="/pages/size-guide" className="border-t border-stone-200 pt-4 font-semibold text-coral">{dict.header.sizeFit}</Link></div></div>}
    </header>
  );
}
