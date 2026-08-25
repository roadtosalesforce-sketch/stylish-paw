import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { getProductBySlug } from "@/sanity/lib/products";
import { formatPrice } from "@/lib/format";
import { Check, LockKeyhole, PackageCheck, ShieldCheck, Star, Truck } from "lucide-react";
import {getLocale} from "@/i18n/server";
import {getDictionary} from "@/i18n/dictionaries";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const product = await getProductBySlug(slug, locale);

  if (!product) notFound();
  const petLabel = product.petType === "both"
    ? dict.product.bothPets
    : locale === "pl"
      ? product.petType === "dog" ? "psów" : "kotów"
      : product.petType === "dog" ? "dogs" : "cats";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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

      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100 shadow-lg ring-1 ring-stone-200/50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-coral px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
              {dict.common.badges[product.badge as keyof typeof dict.common.badges] || product.badge}
            </span>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-sage">
            {dict.common.categories[product.category]} · {dict.product.for} {petLabel}
          </p>
          <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-2xl font-bold text-coral">
            {formatPrice(product.price, locale)}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-stone-600">{product.description}</p>
          <div className="mt-6 grid gap-3 text-sm text-stone-700 sm:grid-cols-3"><span className="flex items-center gap-2"><Check className="h-4 w-4 text-sage"/>{dict.product.comfortFit}</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sage"/>{dict.product.secureCheckout}</span><span className="flex items-center gap-2"><PackageCheck className="h-4 w-4 text-sage"/>{dict.product.clearSupport}</span></div>

          <div className="mt-8 border-t border-stone-100 pt-8">
            <AddToCartForm product={product} locale={locale} dict={dict} />
          </div>
          <div className="mt-6 grid gap-3 rounded-2xl bg-[#fbf8f2] p-4 text-sm sm:grid-cols-3">
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
          <div className="mt-7 divide-y divide-stone-200 border-y border-stone-200 text-sm"><details className="group py-4"><summary className="cursor-pointer list-none font-bold">{dict.product.fitCare} <span className="float-right">+</span></summary><p className="pt-3 leading-relaxed text-stone-600">{dict.product.fitCareText}</p></details><details className="group py-4"><summary className="cursor-pointer list-none font-bold">{dict.product.shippingReturns} <span className="float-right">+</span></summary><p className="pt-3 leading-relaxed text-stone-600">{dict.product.shippingText}</p></details></div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-20 border-t border-stone-200 pt-16">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">{dict.product.reviewEyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal">{dict.product.reviewTitle}</h2>
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
    </div>
  );
}
