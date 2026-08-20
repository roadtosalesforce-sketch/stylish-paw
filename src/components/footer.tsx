import Link from "next/link";
import {Camera, Mail, Sparkles} from "lucide-react";
import type {ShopSettings} from "@/sanity/lib/content";
import type {Dictionary} from "@/i18n/dictionaries";

export function Footer({settings, dict}: {settings?: ShopSettings | null; dict: Dictionary}) {
  const shopName = settings?.shopName || "Furry Fairy Pets";
  const defaultColumns = [
    {_key: "shop", title: dict.footer.shop, links: [{_key: "all", label: dict.footer.allProducts, href: "/shop"}, {_key: "new", label: dict.footer.newArrivals, href: "/shop?category=new"}, {_key: "best", label: dict.footer.bestSellers, href: "/shop?category=bestsellers"}]},
    {_key: "help", title: dict.footer.help, links: [{_key: "size", label: dict.footer.sizeGuide, href: "/pages/size-guide"}, {_key: "shipping", label: dict.footer.shippingReturns, href: "/pages/shipping-returns"}, {_key: "faq", label: dict.footer.faq, href: "/pages/faq"}]},
  ];
  const columns = settings?.footerColumns?.length ? settings.footerColumns : defaultColumns;

  return (
    <footer className="mt-auto border-t border-stone-200 bg-charcoal text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-coral" />
            <span className="font-display text-lg font-bold text-white">{shopName}</span>
          </div>
          <p className="text-sm leading-relaxed text-stone-400">
            {dict.footer.description}
          </p>
        </div>

        {columns.map((column) => (
          <div key={column._key}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{column.title}</h3>
            <ul className="space-y-2 text-sm">
              {column.links?.map((link) => link.href && link.label ? (
                <li key={link._key}>
                  <Link href={link.href} className="transition-colors hover:text-coral">{link.label}</Link>
                </li>
              ) : null)}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{dict.footer.about}</h3>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><Link className="hover:text-coral" href="/pages/about-us">{dict.footer.ourStory}</Link></li>
            <li><Link className="hover:text-coral" href="/pages/care-guide">{dict.footer.careGuide}</Link></li>
            <li><Link className="hover:text-coral" href="/pages/contact">{dict.footer.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{dict.footer.stayClose}</h3>
          <p className="text-sm leading-relaxed text-stone-400">{dict.footer.stayText}</p>
          <div className="mt-4 flex gap-3">
            <span className="rounded-full bg-white/10 p-2"><Camera className="h-4 w-4" /></span>
            <span className="rounded-full bg-white/10 p-2"><Mail className="h-4 w-4" /></span>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-700 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {shopName}. {dict.footer.copyright}
      </div>
    </footer>
  );
}
