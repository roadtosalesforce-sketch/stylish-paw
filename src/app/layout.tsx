import type { Metadata } from "next";
import { Nunito, Fraunces } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import {getShopSettings} from "@/sanity/lib/content";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.furryfairypets.com"),
  title: {default:"Furry Fairy Pets — Comfortable Style for Dogs & Cats",template:"%s | Furry Fairy Pets"},
  description:
    "Comfortable, expressive clothing and accessories for dogs and cats, with helpful sizing and a playful touch.",
  icons: {
    icon: {
      url: "/furry-fairy-tab-icon-v3.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
    shortcut: "/furry-fairy-tab-icon-v3.svg",
    apple: {
      url: "/furry-fairy-apple-icon.png?v=3",
      sizes: "180x180",
      type: "image/png",
    },
  },
  openGraph:{title:"Furry Fairy Pets",description:"Comfortable style for dogs and cats.",type:"website",url:"https://www.furryfairypets.com"},
};

// Published Sanity changes appear on the storefront within about a minute.
export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getShopSettings();

  return (
    <html lang="en" className={`${nunito.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream font-sans text-charcoal antialiased">
        <Providers>
          <Header announcement={settings?.announcement} shopName={settings?.shopName} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </Providers>
      </body>
    </html>
  );
}
