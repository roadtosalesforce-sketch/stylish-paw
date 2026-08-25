import Link from "next/link";
import { Hero } from "@/components/hero";
import { CategoryLinks } from "@/components/category-filter";
import { ProductGrid } from "@/components/product-grid";
import { getFeaturedProducts } from "@/sanity/lib/products";
import { TrustBar } from "@/components/trust-bar";
import { ArrowRight, Heart, Ruler, Sparkles } from "lucide-react";
import {getHomepageContent} from "@/sanity/lib/content";
import {getLocale} from "@/i18n/server";
import {getDictionary} from "@/i18n/dictionaries";

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [featured, homepage] = await Promise.all([
    getFeaturedProducts(locale),
    getHomepageContent(locale),
  ]);
  const story = homepage?.sections?.find((section) => section._type === "storyBlock");
  const newsletter = homepage?.sections?.find((section) => section._type === "newsletterBlock");

  return (
    <>
      <Hero content={homepage?.hero} dict={dict} />
      <TrustBar dict={dict} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
          {dict.home.categoryTitle}
        </h2>
        <p className="mt-2 text-stone-500">{dict.home.categoryText}</p>
        <div className="mt-8">
          <CategoryLinks dict={dict} />
        </div>
      </section>

      {featured.length > 0 && <section className="bg-white/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
                {dict.home.featuredTitle}
              </h2>
              <p className="mt-2 text-stone-500">{dict.home.featuredText}</p>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-semibold text-coral hover:text-coral-dark sm:block"
            >
              {dict.home.viewAll} →
            </Link>
          </div>
          <ProductGrid products={featured} locale={locale} dict={dict} />
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop"
              className="text-sm font-semibold text-coral hover:text-coral-dark"
            >
              {dict.home.viewAllProducts} →
            </Link>
          </div>
        </div>
      </section>}

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8"><div className="flex min-h-80 flex-col justify-end overflow-hidden rounded-[2rem] bg-charcoal p-8 text-white sm:p-10"><Sparkles className="h-6 w-6 text-coral"/><p className="mt-auto text-xs font-bold uppercase tracking-[.18em] text-stone-300">{dict.home.seasonal}</p><h2 className="mt-3 max-w-md font-display text-4xl font-bold">{dict.home.rainTitle}</h2><Link className="mt-6 inline-flex items-center gap-2 font-bold text-coral" href="/shop?category=raincoats">{dict.home.exploreRainwear} <ArrowRight className="h-4 w-4"/></Link></div><div className="flex min-h-80 flex-col justify-end rounded-[2rem] bg-[#e5eee3] p-8 sm:p-10"><Ruler className="h-7 w-7 text-sage-dark"/><p className="mt-auto text-xs font-bold uppercase tracking-[.18em] text-sage-dark">{dict.home.fitEyebrow}</p><h2 className="mt-3 max-w-md font-display text-4xl font-bold">{dict.home.fitTitle}</h2><Link className="mt-6 inline-flex items-center gap-2 font-bold text-charcoal" href="/pages/size-guide">{dict.home.viewSizeGuide} <ArrowRight className="h-4 w-4"/></Link></div></section>

      <section className="border-y border-stone-200 bg-[#fbf8f2] py-20"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><Heart className="mx-auto h-7 w-7 text-coral"/><p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-coral">{dict.home.promise}</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{story?.title || dict.home.storyTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">{story?.text || dict.home.storyText}</p></div></section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-sage to-sage-dark px-8 py-12 text-center text-white sm:px-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {newsletter?.title || dict.home.newsletterTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            {newsletter?.text || dict.home.newsletterText}
          </p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={dict.home.emailPlaceholder}
              className="flex-1 rounded-full px-5 py-3 text-sm text-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="button"
              className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-coral-dark"
            >
              {dict.home.subscribe}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
