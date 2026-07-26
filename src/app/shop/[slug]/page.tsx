import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { getProductBySlug, products } from "@/data/products";
import { formatPrice } from "@/lib/format";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="mb-8 text-sm text-stone-500">
        <Link href="/" className="hover:text-coral transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-coral transition-colors">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
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
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-sage">
            {product.category} · For {product.petType === "both" ? "dogs & cats" : `${product.petType}s`}
          </p>
          <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-2xl font-bold text-coral">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 leading-relaxed text-stone-600">{product.description}</p>

          <div className="mt-8 border-t border-stone-100 pt-8">
            <AddToCartForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
