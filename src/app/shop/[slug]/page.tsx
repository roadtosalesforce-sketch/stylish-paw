import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { ProductGrid } from "@/components/product-grid";
import { getProductBySlug, getProducts } from "@/sanity/lib/products";
import { Check, LockKeyhole, PackageCheck, ShieldCheck, Star, Truck } from "lucide-react";
import {getLocale} from "@/i18n/server";
import {getDictionary} from "@/i18n/dictionaries";
import {Price} from "@/components/price";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
  const {slug} = await params;
  const locale = await getLocale();
  const product = await getProductBySlug(slug, locale);
  if (!product) return {};

  const description = product.seoDescription || product.description.slice(0, 160);
  return {
    title: product.seoTitle || product.name,
    description,
    alternates: {canonical: `/shop/${slug}`},
    openGraph: {title: product.name, description, images: [product.image], type: "website"},
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug, locale),
    getProducts(locale),
  ]);

  if (!product) notFound();
  const images = [
    {url: product.image, alt: product.name},
    ...(product.gallery || []).filter((image) => image.url && image.url !== product.image),
  ];
  const explicitRelated = (product.relatedProductIds || [])
    .map((id) => allProducts.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const categoryRelated = allProducts.filter((item) => item.id !== product.id && item.category === product.category);
  const otherRelated = allProducts.filter((item) => item.id !== product.id && item.category !== product.category);
  const relatedProducts = [...explicitRelated, ...categoryRelated, ...otherRelated]
    .filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index)
    .slice(0, 4);
  const fitLabels = {
    regular: locale === "pl" ? "Krój regularny" : "Regular fit",
    dachshund: dict.shop.fitDachshund,
    sighthound: dict.shop.fitSighthound,
    bulldog: dict.shop.fitBulldog,
    "small-dog": dict.shop.fitSmallDog,
    "large-dog": dict.shop.fitLargeDog,
    puppy: dict.shop.fitPuppy,
  } as const;
  const petLabel = product.petType === "both"
    ? dict.product.bothPets
    : locale === "pl"
      ? product.petType === "dog" ? "psów" : "kotów"
      : product.petType === "dog" ? "dogs" : "cats";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images.map((image) => image.url),
    description: product.description,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `https://www.furryfairypets.com/shop/${product.slug}`,
      priceCurrency: "PLN",
      price: product.price,
      availability: product.trackInventory && !product.variants?.some((variant) => variant.stock > 0)
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c")}} />
      <nav className="mb-8 text-sm text-stone-500">
        <Link href="/" className="hover:text-coral transition-colors">
          {dict.common.home}
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-coral transition-colors">
          {dict.common.shop}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-20">
        <div className="grid gap-4 sm:grid-cols-2">
          {images.map((image, index) => (
            <div key={`${image.url}-${index}`} className={`relative overflow-hidden bg-[#f3f1eb] ${index === 0 ? "aspect-[4/5] sm:col-span-2" : "aspect-square"}`}>
              <Image
                src={image.url}
                alt={image.alt || product.name}
                fill
                sizes={index === 0 ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 640px) 100vw, 28vw"}
                className="object-cover"
                priority={index === 0}
              />
              {index === 0 && product.badge && (
                <span className="absolute left-4 top-4 bg-charcoal px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-white">
                  {dict.common.badges[product.badge as keyof typeof dict.common.badges] || product.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-stone-500">
            {dict.common.categories[product.category]} · {dict.product.for} {petLabel}
          </p>
          <h1 className="font-display text-3xl font-medium leading-tight text-charcoal sm:text-5xl">
            {product.name}
          </h1>
          <Price amount={product.price} locale={locale} className="mt-5 block text-xl font-medium text-charcoal" />
          <p className="mt-7 text-base leading-7 text-stone-600">{product.description}</p>
          <div className="mt-7 grid gap-3 text-xs uppercase tracking-[.08em] text-stone-600 sm:grid-cols-3"><span className="flex items-center gap-2"><Check className="h-4 w-4 text-sage-dark"/>{dict.product.comfortFit}</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sage-dark"/>{dict.product.secureCheckout}</span><span className="flex items-center gap-2"><PackageCheck className="h-4 w-4 text-sage-dark"/>{dict.product.clearSupport}</span></div>

          <div className="mt-8 border-t border-stone-100 pt-8">
            <AddToCartForm product={product} locale={locale} dict={dict} />
          </div>
          <div className="mt-7 grid gap-4 border-y border-stone-200 py-5 text-sm sm:grid-cols-3">
            <div className="flex gap-2.5">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
              <div><p className="font-bold text-charcoal">{dict.product.inpostTitle}</p><p className="mt-0.5 text-xs leading-relaxed text-stone-500">{dict.product.inpostText}</p></div>
            </div>
            <div className="flex gap-2.5">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
              <div><p className="font-bold text-charcoal">{dict.product.guestTitle}</p><p className="mt-0.5 text-xs leading-relaxed text-stone-500">{dict.product.guestText}</p></div>
            </div>
            <div className="flex gap-2.5">
              <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
              <div><p className="font-bold text-charcoal">{dict.product.returnsTitle}</p><Link href="/pages/shipping-returns" className="mt-0.5 inline-block text-xs font-semibold text-coral hover:text-coral-dark">{dict.product.returnsLink} →</Link></div>
            </div>
          </div>
          <div className="mt-1 divide-y divide-stone-200 border-b border-stone-200 text-sm">
            {(product.material || product.careInstructions || product.fitNotes || product.fitProfiles?.length) && (
              <details className="group py-5" open>
                <summary className="cursor-pointer list-none font-semibold uppercase tracking-[.08em]">{dict.product.fitCare} <span className="float-right font-normal">+</span></summary>
                <div className="space-y-4 pt-4 leading-relaxed text-stone-600">
                  {product.material && <p><strong className="font-semibold text-charcoal">{dict.product.material}:</strong> {product.material}</p>}
                  {product.fitNotes && <p><strong className="font-semibold text-charcoal">{dict.product.fitNotes}:</strong> {product.fitNotes}</p>}
                  {product.careInstructions && <p><strong className="font-semibold text-charcoal">{dict.product.care}:</strong> {product.careInstructions}</p>}
                  {product.fitProfiles?.length ? <p><strong className="font-semibold text-charcoal">{dict.product.specialFit}:</strong> {product.fitProfiles.map((fit) => fitLabels[fit]).join(" · ")}</p> : null}
                </div>
              </details>
            )}
            {!product.material && !product.careInstructions && !product.fitNotes && !product.fitProfiles?.length && <details className="group py-5"><summary className="cursor-pointer list-none font-semibold uppercase tracking-[.08em]">{dict.product.fitCare} <span className="float-right font-normal">+</span></summary><p className="pt-4 leading-relaxed text-stone-600">{dict.product.fitCareText}</p></details>}
            <details className="group py-5"><summary className="cursor-pointer list-none font-semibold uppercase tracking-[.08em]">{dict.product.shippingReturns} <span className="float-right font-normal">+</span></summary><p className="pt-4 leading-relaxed text-stone-600">{dict.product.shippingText}</p></details>
          </div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-20 border-t border-stone-200 pt-16">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-coral">{dict.product.reviewEyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-charcoal">{dict.product.reviewTitle}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review, index) => (
              <article key={`${review.customerName}-${index}`} className="overflow-hidden rounded-3xl bg-white shadow-[0_10px_35px_rgba(61,44,44,.08)] ring-1 ring-stone-200/80">
                {review.photo && <div className="relative aspect-[4/3] bg-stone-100"><Image src={review.photo} alt={review.petName || review.customerName} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div>}
                <div className="p-6">
                  <div className="flex gap-0.5 text-coral" aria-label={`${review.rating}/5`}>
                    {Array.from({length: review.rating}, (_, star) => <Star key={star} className="h-4 w-4 fill-current" />)}
                  </div>
                  <blockquote className="mt-4 leading-relaxed text-stone-700">“{review.quote}”</blockquote>
                  <p className="mt-5 font-bold text-charcoal">{review.petName || review.customerName}</p>
                  {review.petName && <p className="text-xs text-stone-500">{review.customerName} · {dict.product.verifiedReview}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-24 border-t border-stone-200 pt-16">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-stone-500">{dict.product.relatedEyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-charcoal sm:text-4xl">{dict.product.relatedTitle}</h2>
          <div className="mt-10">
            <ProductGrid products={relatedProducts} locale={locale} dict={dict} />
          </div>
        </section>
      )}
    </div>
  );
}
