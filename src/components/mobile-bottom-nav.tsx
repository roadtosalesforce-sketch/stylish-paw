"use client";

import Link from "next/link";
import {House, ShoppingBag, Store, UserRound} from "lucide-react";
import {usePathname} from "next/navigation";
import {useCart} from "@/context/cart-context";
import type {Dictionary} from "@/i18n/dictionaries";

export function MobileBottomNav({dict, signedIn}: {dict: Dictionary; signedIn: boolean}) {
  const pathname = usePathname();
  const {itemCount} = useCart();
  const links = [
    {href: "/", label: dict.common.home, icon: House, active: pathname === "/"},
    {href: "/shop", label: dict.common.shop, icon: Store, active: pathname.startsWith("/shop")},
    {href: signedIn ? "/account" : "/account/login", label: signedIn ? dict.header.myAccount : dict.header.signIn, icon: UserRound, active: pathname.startsWith("/account")},
    {href: "/cart", label: dict.cart.title, icon: ShoppingBag, active: pathname === "/cart"},
  ];

  return (
    <nav className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-stone-200/80 bg-[#fffdf9]/95 px-2 pb-[max(.45rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_14px_45px_rgba(61,44,44,.2)] backdrop-blur-xl md:hidden" aria-label="Mobile">
      <ul className="grid grid-cols-4">
        {links.map(({href, label, icon: Icon, active}) => (
          <li key={href}>
            <Link href={href} aria-current={active ? "page" : undefined} className={`relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold transition ${active ? "bg-coral/10 text-coral" : "text-stone-500 hover:bg-stone-100 hover:text-charcoal"}`}>
              <span className="relative">
                <Icon className="h-5 w-5" strokeWidth={active ? 2.3 : 1.8} />
                {href === "/cart" && itemCount > 0 && (
                  <span className="absolute -right-3 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-coral px-1 text-[9px] text-white">{itemCount > 99 ? "99+" : itemCount}</span>
                )}
              </span>
              <span className="max-w-full truncate">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
