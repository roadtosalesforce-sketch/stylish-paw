import type { Metadata } from "next";
import {Inter} from "next/font/google";
import { Providers } from "@/components/providers";
import {SiteChrome} from "@/components/site-chrome";
import {getShopSettings} from "@/sanity/lib/content";
import {getDictionary} from "@/i18n/dictionaries";
import {getLocale} from "@/i18n/server";
import {getCurrentUser} from "@/lib/supabase/server";
import {DEFAULT_EUR_RATE} from "@/lib/currency";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const settings = await getShopSettings(locale);
  const title = settings?.defaultSeoTitle || dict.meta.title;
  const description = settings?.defaultSeoDescription || dict.meta.description;
  return {
    metadataBase: new URL("https://www.furryfairypets.com"),
    title: {default: title, template: "%s | Furry Fairy Pets"},
    description,
    openGraph: {title: "Furry Fairy Pets", description, type: "website", url: "https://www.furryfairypets.com", locale: locale === "pl" ? "pl_PL" : "en_US"},
  };
}

// Published Sanity changes appear on the storefront within about a minute.
export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [settings, user] = await Promise.all([getShopSettings(locale), getCurrentUser()]);

  return (
    <html lang={locale} className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-cream font-sans text-charcoal antialiased">
        <Providers eurRate={settings?.eurRate || DEFAULT_EUR_RATE}>
          <SiteChrome settings={settings} locale={locale} dict={dict} signedIn={Boolean(user)}>
            {children}
          </SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
