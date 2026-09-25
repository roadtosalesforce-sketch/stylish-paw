import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {ArrowRight, Check} from "lucide-react";
import {ProductGrid} from "@/components/product-grid";
import {getDictionary} from "@/i18n/dictionaries";
import {getLocale} from "@/i18n/server";
import {getCategoryLanding} from "@/sanity/lib/content";
import {getProducts} from "@/sanity/lib/products";
import type {Category} from "@/types/product";

const categorySlugs: Category[] = ["clothing", "collars-leashes", "essentials"];
type Props = {params: Promise<{slug: string}>};

export function generateStaticParams() {
  return categorySlugs.map((slug) => ({slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const locale = await getLocale();
  const category = await getCategoryLanding(slug, locale);
  return category ? {title: category.seoTitle || category.title, description: category.seoDescription || category.heroText, alternates: {canonical: `/categories/${slug}`}} : {};
}

export default async function CategoryLandingPage({params}: Props) {
  const {slug} = await params;
  if (!categorySlugs.includes(slug as Category)) notFound();
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [category, products] = await Promise.all([getCategoryLanding(slug, locale), getProducts(locale)]);
  if (!category) notFound();
  const categoryProducts = products.filter((product) => product.category === slug);
  const heroImage = category.image || categoryProducts[0]?.image;

  return (
    <>
      <section className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-[#eee9dc] text-charcoal">
        {heroImage && <Image src={heroImage} alt={category.imageAlt || category.title} fill sizes="100vw" className="-z-20 object-cover" priority />}
        <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-12">
          <div className={heroImage ? "max-w-4xl bg-[#f5f1e7]/95 p-7 shadow-sm sm:p-10" : "max-w-4xl"}>
            <nav className="mb-10 text-xs font-medium uppercase tracking-[.12em] text-stone-500"><Link href="/" className="hover:text-charcoal">{dict.common.home}</Link><span className="mx-2">/</span><span>{category.title}</span></nav>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-sage-dark">{category.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-medium uppercase leading-[1.05] tracking-[.04em] sm:text-6xl lg:text-7xl">{category.heroTitle || category.title}</h1>
            {category.heroText && <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-700 sm:text-lg">{category.heroText}</p>}
            <a href="#products" className="mt-8 inline-flex w-fit items-center border border-charcoal bg-charcoal px-7 py-3.5 text-xs font-semibold uppercase tracking-[.14em] text-white transition hover:bg-transparent hover:text-charcoal">{dict.home.browseCollections}<ArrowRight className="ml-2 h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <nav className="border-b border-stone-200 bg-white" aria-label={dict.home.categoryTitle}>
        <div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-5 py-5 sm:px-8 lg:px-12">
          {categorySlugs.map((categorySlug) => <Link key={categorySlug} href={`/categories/${categorySlug}`} aria-current={categorySlug === slug ? "page" : undefined} className={`whitespace-nowrap text-xs font-semibold uppercase tracking-[.12em] ${categorySlug === slug ? "text-charcoal underline decoration-sage underline-offset-8" : "text-stone-400 hover:text-charcoal"}`}>{dict.common.categories[categorySlug]}</Link>)}
        </div>
      </nav>

      <section id="products" className="scroll-mt-28 bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-5"><div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-sage-dark">Furry Fairy Pets</p><h2 className="mt-3 text-3xl font-medium uppercase tracking-[.055em] text-charcoal sm:text-4xl">{category.title}</h2><p className="mt-2 text-sm text-stone-500">{categoryProducts.length} {categoryProducts.length === 1 ? dict.shop.item : dict.shop.items}</p></div><Link href={`/shop?category=${slug}`} className="hidden text-xs font-semibold uppercase tracking-[.12em] text-charcoal hover:text-coral sm:block">{dict.home.viewAll} →</Link></div>
          <ProductGrid products={categoryProducts} locale={locale} dict={dict} />
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#f3f1eb] py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-sage-dark">Furry Fairy Pets</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-medium uppercase tracking-[.04em] text-charcoal sm:text-5xl">{category.storyTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-stone-600">{category.storyText}</p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[.1em] text-stone-600">
            {[locale === "pl" ? "Czytelny wybór" : "Clear choices", locale === "pl" ? "Wygoda przede wszystkim" : "Comfort first", locale === "pl" ? "Do prawdziwego życia" : "Made for real life"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-sage-dark" />{item}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}
