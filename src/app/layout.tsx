import type { Metadata } from "next";
import { Nunito, Fraunces } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import {getShopSettings} from "@/sanity/lib/content";
import {getDictionary} from "@/i18n/dictionaries";
import {getLocale} from "@/i18n/server";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
  const settings = await getShopSettings(locale);

  return (
    <html lang={locale} className={`${nunito.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream font-sans text-charcoal antialiased">
        <Providers>
          <Header announcement={settings?.announcement} shopName={settings?.shopName} locale={locale} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} dict={dict} />
        </Providers>
      </body>
    </html>
  );
}
