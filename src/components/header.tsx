"use client";

import Link from "next/link";
import {ChevronDown, Menu, UserRound, X} from "lucide-react";
import {useState} from "react";
import {BrandLogo} from "./brand-logo";
import {CartButton} from "./cart-button";
import {CurrencySwitcher} from "./currency-switcher";
import {LanguageSwitcher} from "./language-switcher";
import type {Dictionary, Locale} from "@/i18n/dictionaries";

export function Header({announcement, shopName, locale, dict, signedIn = false}: {announcement?: string; shopName?: string; locale: Locale; dict: Dictionary; signedIn?: boolean}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const categoryLinks = [
    [dict.common.categories.clothing, "/categories/clothing"],
    [dict.common.categories["collars-leashes"], "/categories/collars-leashes"],
    [dict.common.categories.essentials, "/categories/essentials"],
  ] as const;
  const mainLinks = [
    [dict.header.bestSellers, "/shop?category=bestsellers"],
    [dict.header.sizeFit, "/pages/size-guide"],
    [dict.header.blog, "/blog"],
    [dict.header.aboutUs, "/pages/about-us"],
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="bg-[#ebe8df] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[.18em] text-charcoal sm:text-[11px]">{announcement || dict.header.announcement}</div>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${shopName || "Furry Fairy Pets"} — ${dict.common.home}`}><BrandLogo shopName={shopName} /></Link>

        <nav className="hidden h-full items-center gap-6 lg:flex" aria-label="Primary">
          <details className="group relative flex h-full items-center">
            <summary className="flex cursor-pointer list-none items-center gap-1 py-6 text-xs font-semibold uppercase tracking-[.12em] text-stone-700 transition hover:text-coral">
              {dict.common.shop} <ChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" />
            </summary>
            <div className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 border border-stone-200 bg-white p-7 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-stone-400">{dict.common.shop}</p>
              <div className="mt-4 grid gap-2">
                {categoryLinks.map(([label, href]) => <Link key={href} href={href} className="border-b border-stone-100 px-1 py-3 text-sm font-semibold uppercase tracking-[.08em] text-charcoal transition last:border-0 hover:text-coral">{label}<span className="float-right" aria-hidden="true">→</span></Link>)}
              </div>
              <Link href="/categories/essentials" className="mt-5 block bg-[#f1efe9] p-5">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-coral">{dict.header.seasonalEdit}</p>
                <p className="mt-2 font-display text-xl font-bold text-charcoal">{dict.header.rainyTitle}</p>
                <span className="mt-3 inline-block text-sm font-bold text-charcoal">{dict.header.exploreRainwear} →</span>
              </Link>
            </div>
          </details>
          {mainLinks.map(([label, href]) => <Link key={href} href={href} className="text-xs font-semibold uppercase tracking-[.12em] text-stone-700 transition hover:text-coral">{label}</Link>)}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden xl:block"><CurrencySwitcher label={dict.header.currency} /></div>
          <LanguageSwitcher locale={locale} label={dict.header.language} />
          <Link href={signedIn ? "/account" : "/account/login"} aria-label={signedIn ? dict.header.myAccount : dict.header.signIn} className="hidden items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-sm font-bold text-charcoal transition hover:border-coral hover:text-coral sm:flex">
            <UserRound className="h-4 w-4" /><span>{signedIn ? dict.header.myAccount : dict.header.signIn}</span>
          </Link>
          <div className="hidden sm:block"><CartButton label={dict.cart.cartLabel} /></div>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} className="rounded-full p-2 text-charcoal lg:hidden" aria-expanded={mobileOpen} aria-label={dict.header.openMenu}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-stone-200 bg-white px-5 py-6 lg:hidden" aria-label="Mobile">
          <div className="grid gap-1">
            <p className="px-3 pb-2 text-xs font-bold uppercase tracking-[.16em] text-stone-400">{dict.common.shop}</p>
            {categoryLinks.map(([label, href]) => <Link onClick={() => setMobileOpen(false)} key={href} href={href} className="rounded-xl px-3 py-2.5 font-semibold text-charcoal hover:bg-stone-50">{label}</Link>)}
            <div className="my-3 border-t border-stone-200" />
            {mainLinks.map(([label, href]) => <Link onClick={() => setMobileOpen(false)} key={href} href={href} className="rounded-xl px-3 py-2.5 font-semibold text-charcoal hover:bg-stone-50">{label}</Link>)}
            <Link onClick={() => setMobileOpen(false)} href={signedIn ? "/account" : "/account/login"} className="mt-3 flex items-center gap-2 rounded-xl bg-stone-100 px-4 py-3 font-bold text-charcoal"><UserRound className="h-5 w-5" />{signedIn ? dict.header.myAccount : dict.header.signInRegister}</Link>
            <div className="mt-3"><CurrencySwitcher label={dict.header.currency} /></div>
          </div>
        </nav>
      )}
    </header>
  );
}
