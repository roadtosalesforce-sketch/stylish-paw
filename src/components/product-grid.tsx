import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";
import type {Dictionary, Locale} from "@/i18n/dictionaries";

export function ProductGrid({ products, locale, dict }: { products: Product[]; locale: Locale; dict: Dictionary }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-4xl mb-3">🐕</p>
        <p className="text-lg font-medium text-stone-600">{dict.shop.noProducts}</p>
        <p className="text-sm text-stone-400">{dict.shop.tryFilter}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} dict={dict} />
      ))}
    </div>
  );
}
