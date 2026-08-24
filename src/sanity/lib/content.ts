import {cache} from "react";
import {createClient} from "next-sanity";
import type {Locale} from "@/i18n/dictionaries";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0w20qxza";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-08-13",
  useCdn: true,
});

export type HomepageContent = {
  hero?: {
    eyebrow?: string;
    title?: string;
    text?: string;
    image?: string;
    primaryLabel?: string;
    primaryLink?: string;
    secondaryLabel?: string;
    secondaryLink?: string;
  };
  sections?: Array<{
    _key: string;
    _type: "storyBlock" | "newsletterBlock" | string;
    title?: string;
    text?: string;
    offer?: string;
  }>;
};

export type ShopSettings = {
  shopName?: string;
  announcement?: string;
  contactEmail?: string;
  supportEmail?: string;
  instagram?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  footerColumns?: Array<{
    _key: string;
    title?: string;
    links?: Array<{_key: string; label?: string; href?: string}>;
  }>;
};

export type ContentPage = {
  title: string;
  slug: string;
  eyebrow?: string;
  intro?: string;
  heroImage?: string;
  body?: Array<{_key?: string; _type: string; [key: string]: unknown}>;
  seoTitle?: string;
  seoDescription?: string;
};

export const getHomepageContent = cache(async (locale: Locale = "en"): Promise<HomepageContent | null> => {
  try {
    const localizedHero = locale === "pl" ? "heroPl" : "hero";
    const localizedSections = locale === "pl" ? "sectionsPl" : "sections";
    return await client.fetch<HomepageContent | null>(`*[_type == "homepage"][0]{
      "hero": ${localizedHero}{
        eyebrow,
        title,
        text,
        "image": image.asset->url,
        primaryLabel,
        primaryLink,
        secondaryLabel,
        secondaryLink
      },
      "sections": ${localizedSections}[]{_key, _type, title, text, offer}
    }`);
  } catch {
    return null;
  }
});

export const getShopSettings = cache(async (locale: Locale = "en"): Promise<ShopSettings | null> => {
  try {
    const announcement = locale === "pl" ? "announcementPl" : "announcement";
    const seoTitle = locale === "pl" ? "defaultSeoTitlePl" : "defaultSeoTitle";
    const seoDescription = locale === "pl" ? "defaultSeoDescriptionPl" : "defaultSeoDescription";
    const footerColumns = locale === "pl" ? "footerColumnsPl" : "footerColumns";
    return await client.fetch<ShopSettings | null>(`*[_type == "siteSettings"][0]{
      shopName,
      "announcement": ${announcement},
      contactEmail,
      supportEmail,
      instagram,
      "defaultSeoTitle": ${seoTitle},
      "defaultSeoDescription": ${seoDescription},
      "footerColumns": ${footerColumns}[]{_key, title, links[]{_key, label, href}}
    }`);
  } catch {
    return null;
  }
});

type PortableBlock = {_key: string; _type: "block"; style: "normal" | "h2"; markDefs: never[]; children: Array<{_key: string; _type: "span"; marks: never[]; text: string}>};

function blocks(items: Array<["h2" | "normal", string]>): PortableBlock[] {
  return items.map(([style, text], index) => ({
    _key: `fallback-${index}`,
    _type: "block",
    style,
    markDefs: [],
    children: [{_key: `span-${index}`, _type: "span", marks: [], text}],
  }));
}

const polishPages: Record<string, ContentPage> = {
  "size-guide": {slug: "size-guide", title: "Tabela rozmiarów", eyebrow: "Wygoda zaczyna się od pomiaru", intro: "Zmierz pupila przed zamówieniem, aby wybrać wygodny i bezpieczny rozmiar.", body: blocks([["h2", "Jak mierzyć"], ["normal", "Zmierz szyję w miejscu obroży, najszerszy obwód klatki piersiowej za przednimi łapami oraz długość grzbietu od linii obroży do nasady ogona."], ["h2", "Pomiędzy rozmiarami"], ["normal", "Jeśli wynik wypada pomiędzy dwoma rozmiarami, wybierz większy. Na stronie każdego produktu znajdziesz jego dostępne rozmiary."]])},
  "shipping-returns": {slug: "shipping-returns", title: "Dostawa i zwroty", eyebrow: "Jasne zasady zakupów", intro: "Najważniejsze informacje o realizacji zamówienia, dostawie i zwrotach.", body: blocks([["h2", "Dostawa InPost Paczkomat® 24/7"], ["normal", "Dostawa na terenie Polski kosztuje 17,99 zł i jest bezpłatna dla zamówień od 149 zł. Paczkomat wybierzesz w koszyku. Po nadaniu przesyłki dostawa zwykle trwa 1–3 dni robocze."], ["h2", "Zwroty"], ["normal", "Przed zakupem sprawdź rozmiar i opis produktu. Szczegółowe warunki zwrotu otrzymasz wraz z potwierdzeniem zamówienia."]])},
  faq: {slug: "faq", title: "Najczęstsze pytania", eyebrow: "Chętnie pomożemy", intro: "Odpowiedzi na pytania dotyczące rozmiarów, zamówień i pielęgnacji.", body: blocks([["h2", "Jak wybrać rozmiar?"], ["normal", "Skorzystaj z tabeli rozmiarów i zawsze zmierz pupila przed zakupem."], ["h2", "Czy płatność jest bezpieczna?"], ["normal", "Tak. Płatność odbywa się w bezpiecznym formularzu Stripe."], ["h2", "Jak dbać o ubranko?"], ["normal", "Postępuj zgodnie z instrukcją pielęgnacji podaną przy produkcie i na jego metce."]])},
  "about-us": {slug: "about-us", title: "Nasza historia", eyebrow: "Furry Fairy Pets", intro: "Tworzymy pełne charakteru ubrania dla pupili, w których wygoda jest równie ważna jak styl.", body: blocks([["h2", "Styl dla prawdziwego życia"], ["normal", "Projektujemy sklep wokół codziennych spacerów, rodzinnych chwil i wyjątkowych okazji — zawsze z myślą o komforcie psa lub kota."], ["h2", "Nasza obietnica"], ["normal", "Czytelne rozmiary, pomocne opisy i bezpieczne zakupy mają ułatwić wybór właściwego produktu."]])},
  "care-guide": {slug: "care-guide", title: "Pielęgnacja", eyebrow: "Na dłużej", intro: "Proste wskazówki, dzięki którym ubrania pupila zachowają kształt, kolor i wygodę.", body: blocks([["h2", "Przed praniem"], ["normal", "Zapnij wszystkie zapięcia, usuń sierść i sprawdź instrukcję na metce produktu."], ["h2", "Pranie i suszenie"], ["normal", "Używaj delikatnego programu i łagodnego detergentu. Jeśli metka nie mówi inaczej, susz na płasko z dala od bezpośredniego źródła ciepła."]])},
  contact: {slug: "contact", title: "Kontakt", eyebrow: "Jesteśmy tutaj", intro: "Masz pytanie o rozmiar, produkt lub zamówienie? Napisz do nas — chętnie pomożemy.", body: blocks([["h2", "Obsługa klienta"], ["normal", "Dane kontaktowe znajdziesz w potwierdzeniu zamówienia oraz w ustawieniach sklepu. W wiadomości podaj numer zamówienia, jeśli już go posiadasz."]])},
};

export const getContentPage = cache(async (slug: string, locale: Locale = "en"): Promise<ContentPage | null> => {
  try {
    const suffix = locale === "pl" ? "Pl" : "";
    const page = await client.fetch<ContentPage | null>(`*[_type == "page" && slug.current == $slug][0]{
      "title": title${suffix},
      "slug": slug.current,
      "eyebrow": eyebrow${suffix},
      "intro": intro${suffix},
      "heroImage": heroImage.asset->url,
      "body": body${suffix}[]{
        ...,
        _type == "image" => {"url": asset->url, alt}
      },
      "seoTitle": seoTitle${suffix},
      "seoDescription": seoDescription${suffix}
    }`, {slug});
    return page?.title ? page : locale === "pl" ? polishPages[slug] || null : page;
  } catch {
    return locale === "pl" ? polishPages[slug] || null : null;
  }
});
