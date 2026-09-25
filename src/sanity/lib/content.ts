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

export type HeroSlide = {
  _key: string;
  active?: boolean;
  eyebrow?: string;
  title?: string;
  text?: string;
  image: string;
  mobileImage?: string;
  imageAlt?: string;
  primaryLabel?: string;
  primaryLink?: string;
  secondaryLabel?: string;
  secondaryLink?: string;
  showText?: boolean;
  textPosition?: "left" | "right";
};

export type HomepageContent = {
  heroSlides?: HeroSlide[];
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
  philosophy?: {eyebrow?: string; title?: string; text?: string};
  promise?: {eyebrow?: string; title?: string; text?: string};
  instagram?: {
    eyebrow?: string;
    title?: string;
    text?: string;
    profileUrl?: string;
    profileLabel?: string;
    posts?: Array<{_key: string; image?: string; alt?: string; url?: string}>;
  };
  rewards?: {eyebrow?: string; title?: string; text?: string; buttonLabel?: string};
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
  eurRate?: number;
  contactEmail?: string;
  supportEmail?: string;
  instagram?: string;
  loyaltyEnabled?: boolean;
  pointsPerPln?: number;
  welcomePoints?: number;
  rewardThreshold?: number;
  rewardLabel?: string;
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

export type CategoryLanding = {
  title: string;
  slug: string;
  eyebrow?: string;
  heroTitle?: string;
  heroText?: string;
  image?: string;
  imageAlt?: string;
  storyTitle?: string;
  storyText?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImage?: string;
  coverImageAlt?: string;
  body?: Array<{_key?: string; _type: string; [key: string]: unknown}>;
  seoTitle?: string;
  seoDescription?: string;
};

export const getHomepageContent = cache(async (locale: Locale = "en"): Promise<HomepageContent | null> => {
  try {
    const localizedHero = locale === "pl" ? "heroPl" : "hero";
    const localizedHeroSlides = locale === "pl" ? "heroSlidesPl" : "heroSlides";
    const localizedSections = locale === "pl" ? "sectionsPl" : "sections";
    const localizedPhilosophy = locale === "pl" ? "philosophyPl" : "philosophy";
    const localizedInstagram = locale === "pl" ? "instagramPl" : "instagram";
    const localizedRewards = locale === "pl" ? "rewardsPl" : "rewards";
    const localizedPromise = locale === "pl" ? "promisePl" : "promise";
    return await client.fetch<HomepageContent | null>(`*[_type == "homepage"][0]{
      "heroSlides": ${localizedHeroSlides}[active != false]{
        _key,
        active,
        eyebrow,
        title,
        text,
        "image": image.asset->url,
        "mobileImage": mobileImage.asset->url,
        imageAlt,
        primaryLabel,
        primaryLink,
        secondaryLabel,
        secondaryLink,
        showText,
        textPosition
      },
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
      "philosophy": ${localizedPhilosophy}{eyebrow, title, text},
      "promise": ${localizedPromise}{eyebrow, title, text},
      "instagram": ${localizedInstagram}{
        eyebrow,
        title,
        text,
        profileUrl,
        profileLabel,
        posts[]{_key, "image": image.asset->url, alt, url}
      },
      "rewards": ${localizedRewards}{eyebrow, title, text, buttonLabel},
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
    const rewardLabel = locale === "pl" ? "rewardLabelPl" : "rewardLabel";
    return await client.fetch<ShopSettings | null>(`*[_type == "siteSettings"][0]{
      shopName,
      "announcement": ${announcement},
      eurRate,
      contactEmail,
      supportEmail,
      instagram,
      loyaltyEnabled,
      pointsPerPln,
      welcomePoints,
      rewardThreshold,
      "rewardLabel": ${rewardLabel},
      "defaultSeoTitle": ${seoTitle},
      "defaultSeoDescription": ${seoDescription},
      "footerColumns": ${footerColumns}[]{_key, title, links[]{_key, label, href}}
    }`);
  } catch {
    return null;
  }
});

const categoryFallbacks: Record<Locale, Record<string, CategoryLanding>> = {
  en: {
    clothing: {title: "Clothing", slug: "clothing", eyebrow: "Comfort in every season", heroTitle: "Clothing made for real life with pets", heroText: "Thoughtful layers and playful pieces selected for comfort, movement and everyday adventures.", storyTitle: "Comfort comes first", storyText: "Clear sizing and practical details help every piece feel as good as it looks.", seoTitle: "Pet Clothing", seoDescription: "Comfort-led clothing for dogs and cats from Furry Fairy Pets."},
    "collars-leashes": {title: "Collars & Leashes", slug: "collars-leashes", eyebrow: "Walk beautifully", heroTitle: "Everyday walk essentials with personality", heroText: "Decorative collars, reliable leashes and coordinated details for safer, happier walks.", storyTitle: "Designed for the daily walk", storyText: "Useful hardware, comfortable materials and expressive design belong together.", seoTitle: "Pet Collars & Leashes", seoDescription: "Shop collars and leashes selected for comfort, function and style."},
    essentials: {title: "Essentials", slug: "essentials", eyebrow: "Less, but better", heroTitle: "Useful essentials for calmer daily routines", heroText: "Toys, feeding accessories and carefully chosen products that make life with pets easier, cleaner and more enjoyable.", storyTitle: "Only what earns its place", storyText: "Every essential should solve a real problem without adding unnecessary clutter.", seoTitle: "Pet Essentials", seoDescription: "Useful toys, feeding accessories and everyday pet essentials."},
  },
  pl: {
    clothing: {title: "Ubrania", slug: "clothing", eyebrow: "Wygoda na każdą porę", heroTitle: "Ubrania stworzone do prawdziwego życia z pupilem", heroText: "Przemyślane warstwy i pełne charakteru modele wybrane z myślą o wygodzie, ruchu i codziennych przygodach.", storyTitle: "Komfort jest najważniejszy", storyText: "Czytelne rozmiary i praktyczne detale sprawiają, że każdy model wygląda dobrze i pozostaje wygodny.", seoTitle: "Ubrania dla zwierząt", seoDescription: "Wygodne ubrania dla psów i kotów od Furry Fairy Pets."},
    "collars-leashes": {title: "Obroże i smycze", slug: "collars-leashes", eyebrow: "Piękne spacery", heroTitle: "Codzienne akcesoria spacerowe z charakterem", heroText: "Dekoracyjne obroże, solidne smycze i dopasowane dodatki na bezpieczniejsze, przyjemniejsze spacery.", storyTitle: "Na każdy spacer", storyText: "Praktyczne zapięcia, wygodne materiały i wyrazisty design mogą iść w parze.", seoTitle: "Obroże i smycze", seoDescription: "Obroże i smycze wybrane z myślą o wygodzie, funkcji i stylu."},
    essentials: {title: "Essentials", slug: "essentials", eyebrow: "Mniej, ale lepiej", heroTitle: "Przydatne essentials dla spokojniejszej codzienności", heroText: "Zabawki, akcesoria do karmienia i starannie wybrane produkty, które ułatwiają i porządkują życie z pupilem.", storyTitle: "Tylko to, co naprawdę potrzebne", storyText: "Każdy produkt powinien rozwiązywać realny problem, nie tworząc zbędnego bałaganu.", seoTitle: "Essentials dla zwierząt", seoDescription: "Przydatne zabawki, akcesoria do karmienia i produkty codziennego użytku."},
  },
};

export const getCategoryLanding = cache(async (slug: string, locale: Locale = "en"): Promise<CategoryLanding | null> => {
  const fallback = categoryFallbacks[locale][slug] || null;
  try {
    const suffix = locale === "pl" ? "Pl" : "";
    const category = await client.fetch<CategoryLanding | null>(`*[_type == "category" && slug.current == $slug][0]{
      "title": coalesce(title${suffix}, title),
      "slug": slug.current,
      "eyebrow": coalesce(eyebrow${suffix}, eyebrow),
      "heroTitle": coalesce(heroTitle${suffix}, heroTitle),
      "heroText": coalesce(heroText${suffix}, heroText),
      "image": image.asset->url,
      "imageAlt": image.alt,
      "storyTitle": coalesce(storyTitle${suffix}, storyTitle),
      "storyText": coalesce(storyText${suffix}, storyText),
      "seoTitle": coalesce(seoTitle${suffix}, seoTitle),
      "seoDescription": coalesce(seoDescription${suffix}, seoDescription)
    }`, {slug});
    return category?.title ? {...fallback, ...category} : fallback;
  } catch {
    return fallback;
  }
});

export const getBlogPosts = cache(async (locale: Locale = "en"): Promise<BlogPost[]> => {
  try {
    const suffix = locale === "pl" ? "Pl" : "";
    return await client.fetch<BlogPost[]>(`*[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc){
      "title": coalesce(title${suffix}, title),
      "slug": slug.current,
      "excerpt": coalesce(excerpt${suffix}, excerpt),
      publishedAt,
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt,
      "seoTitle": coalesce(seoTitle${suffix}, seoTitle),
      "seoDescription": coalesce(seoDescription${suffix}, seoDescription)
    }`);
  } catch {
    return [];
  }
});

export const getBlogPost = cache(async (slug: string, locale: Locale = "en"): Promise<BlogPost | null> => {
  try {
    const suffix = locale === "pl" ? "Pl" : "";
    return await client.fetch<BlogPost | null>(`*[_type == "post" && slug.current == $slug && publishedAt <= now()][0]{
      "title": coalesce(title${suffix}, title),
      "slug": slug.current,
      "excerpt": coalesce(excerpt${suffix}, excerpt),
      publishedAt,
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt,
      "body": coalesce(body${suffix}, body)[]{..., _type == "image" => {"url": asset->url, alt}},
      "seoTitle": coalesce(seoTitle${suffix}, seoTitle),
      "seoDescription": coalesce(seoDescription${suffix}, seoDescription)
    }`, {slug});
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
