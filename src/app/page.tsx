import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Hero} from "@/components/hero";
import {CategoryLinks} from "@/components/category-filter";
import {ProductGrid} from "@/components/product-grid";
import {getFeaturedProducts} from "@/sanity/lib/products";
import {getHomepageContent, getShopSettings} from "@/sanity/lib/content";
import {getLocale} from "@/i18n/server";
import {getDictionary} from "@/i18n/dictionaries";
import {InstagramIcon} from "@/components/instagram-icon";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {canonical: "/"},
  };
}

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [featured, homepage, settings] = await Promise.all([
    getFeaturedProducts(locale),
    getHomepageContent(locale),
    getShopSettings(locale),
  ]);
  const story = homepage?.sections?.find((section) => section._type === "storyBlock");
  const promise = homepage?.promise;
  const legacyRewards = homepage?.sections?.find((section) => section._type === "newsletterBlock");
  const instagram = homepage?.instagram;
  const instagramUrl = instagram?.profileUrl || settings?.instagram;
  const instagramPosts = instagram?.posts?.filter((post) => post.image) || [];
  const philosophy = homepage?.philosophy;
  const rewards = homepage?.rewards;

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Furry Fairy Pets",
    url: "https://www.furryfairypets.com/",
    description: dict.meta.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c")}} />
      <Hero content={homepage?.hero} slides={homepage?.heroSlides} dict={dict} />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-sage-dark">Furry Fairy Pets</p>
          <h2 className="mt-3 text-3xl font-medium uppercase tracking-[.055em] text-charcoal sm:text-4xl">{dict.home.categoryTitle}</h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600">{dict.home.categoryText}</p>
        </div>
        <div className="mt-9"><CategoryLinks dict={dict} /></div>
      </section>

      <section className="border-y border-stone-200 bg-[#f3f1eb] py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-coral">{philosophy?.eyebrow || dict.home.philosophyEyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-medium uppercase leading-tight tracking-[.04em] text-charcoal sm:text-5xl">{philosophy?.title || dict.home.philosophyTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">{philosophy?.text || dict.home.philosophyText}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-sage-dark">{promise?.eyebrow || dict.home.promise}</p>
          <h2 className="mt-4 text-3xl font-medium uppercase tracking-[.04em] text-charcoal sm:text-4xl">{promise?.title || story?.title || dict.home.storyTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">{promise?.text || story?.text || dict.home.storyText}</p>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex items-end justify-between gap-6">
            <div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-sage-dark">Furry Fairy Pets</p><h2 className="mt-3 text-3xl font-medium uppercase tracking-[.055em] text-charcoal sm:text-4xl">{dict.home.featuredTitle}</h2><p className="mt-2 text-stone-600">{dict.home.featuredText}</p></div>
            <Link href="/shop?category=bestsellers" className="hidden items-center gap-2 text-sm font-bold text-charcoal transition hover:text-coral sm:inline-flex">{dict.home.viewAll} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <ProductGrid products={featured} locale={locale} dict={dict} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-coral">{instagram?.eyebrow || dict.home.instagramEyebrow}</p>
            <h2 className="mt-3 text-3xl font-medium uppercase tracking-[.055em] text-charcoal sm:text-4xl">{instagram?.title || dict.home.instagramTitle}</h2>
            <p className="mt-3 text-stone-600">{instagram?.text || dict.home.instagramText}</p>
          </div>
          {instagramUrl && <a href={instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-charcoal transition hover:text-coral"><InstagramIcon className="h-5 w-5" />{instagram?.profileLabel || dict.home.visitInstagram}</a>}
        </div>
        {instagramPosts.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {instagramPosts.map((post) => {
              const media = <Image src={post.image as string} alt={post.alt || "Furry Fairy Pets Instagram"} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />;
              return post.url ? <a key={post._key} href={post.url} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden bg-stone-100">{media}</a> : <div key={post._key} className="group relative aspect-square overflow-hidden bg-stone-100">{media}</div>;
            })}
          </div>
        ) : null}
      </section>

      <section className="border-t border-stone-200 bg-[#ebe8df] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-sage-dark">{rewards?.eyebrow || dict.home.rewardsEyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-medium uppercase tracking-[.04em] text-charcoal sm:text-5xl">{rewards?.title || legacyRewards?.title || dict.home.rewardsTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">{rewards?.text || legacyRewards?.text || dict.home.rewardsText}</p>
          <Link href="/account/register" className="mt-8 inline-flex items-center bg-charcoal px-8 py-4 text-xs font-semibold uppercase tracking-[.14em] text-white transition hover:bg-coral-dark">{rewards?.buttonLabel || dict.home.createAccount}<ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
