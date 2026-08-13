import {cache} from "react";
import {createClient} from "next-sanity";

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

export const getHomepageContent = cache(async (): Promise<HomepageContent | null> => {
  try {
    return await client.fetch<HomepageContent | null>(`*[_type == "homepage"][0]{
      hero{
        eyebrow,
        title,
        text,
        "image": image.asset->url,
        primaryLabel,
        primaryLink,
        secondaryLabel,
        secondaryLink
      },
      sections[]{_key, _type, title, text, offer}
    }`);
  } catch {
    return null;
  }
});

export const getShopSettings = cache(async (): Promise<ShopSettings | null> => {
  try {
    return await client.fetch<ShopSettings | null>(`*[_type == "siteSettings"][0]{
      shopName,
      announcement,
      contactEmail,
      supportEmail,
      instagram,
      defaultSeoTitle,
      defaultSeoDescription,
      footerColumns[]{_key, title, links[]{_key, label, href}}
    }`);
  } catch {
    return null;
  }
});

export const getContentPage = cache(async (slug: string): Promise<ContentPage | null> => {
  try {
    return await client.fetch<ContentPage | null>(`*[_type == "page" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      eyebrow,
      intro,
      "heroImage": heroImage.asset->url,
      body[]{
        ...,
        _type == "image" => {"url": asset->url, alt}
      },
      seoTitle,
      seoDescription
    }`, {slug});
  } catch {
    return null;
  }
});
