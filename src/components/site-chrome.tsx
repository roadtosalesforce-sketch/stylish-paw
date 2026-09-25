"use client";

import {usePathname} from "next/navigation";
import type {Dictionary, Locale} from "@/i18n/dictionaries";
import type {ShopSettings} from "@/sanity/lib/content";
import {Footer} from "./footer";
import {Header} from "./header";
import {MobileBottomNav} from "./mobile-bottom-nav";

export function SiteChrome({
  children,
  settings,
  locale,
  dict,
  signedIn,
}: {
  children: React.ReactNode;
  settings?: ShopSettings | null;
  locale: Locale;
  dict: Dictionary;
  signedIn: boolean;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return <main className="min-h-screen bg-white">{children}</main>;
  }

  return (
    <div className="flex min-h-screen flex-col pb-22 md:pb-0">
      <Header announcement={settings?.announcement} shopName={settings?.shopName} locale={locale} dict={dict} signedIn={signedIn} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} dict={dict} />
      <MobileBottomNav dict={dict} signedIn={signedIn} />
    </div>
  );
}
