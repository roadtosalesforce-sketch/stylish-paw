import { CartContent } from "@/components/cart-content";
import {getDictionary} from "@/i18n/dictionaries";
import {getLocale} from "@/i18n/server";

export default async function CartPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
        {dict.cart.title}
      </h1>
      <div className="mt-8">
        <CartContent
          locale={locale}
          dict={dict}
          inPostToken={process.env.NEXT_PUBLIC_INPOST_GEOWIDGET_TOKEN}
        />
      </div>
    </div>
  );
}
