import Link from "next/link";
import {Camera, Mail, Sparkles} from "lucide-react";
import type {ShopSettings} from "@/sanity/lib/content";

const defaultColumns = [
  {
    _key: "shop",
    title: "Shop",
    links: [
      {_key: "all", label: "All Products", href: "/shop"},
      {_key: "new", label: "New Arrivals", href: "/shop?category=new"},
      {_key: "best", label: "Best Sellers", href: "/shop?category=bestsellers"},
    ],
  },
  {
    _key: "help",
    title: "Help",
    links: [
      {_key: "size", label: "Size Guide", href: "/pages/size-guide"},
      {_key: "shipping", label: "Shipping & Returns", href: "/pages/shipping-returns"},
      {_key: "faq", label: "FAQ", href: "/pages/faq"},
    ],
  },
];

export function Footer({settings}: {settings?: ShopSettings | null}) {
  const shopName = settings?.shopName || "Furry Fairy Pets";
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
            Comfortable pet clothing with a playful point of view, created for everyday adventures and special moments.
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
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">About</h3>
          <ul className="space-y-2 text-sm text-stone-400">
            <li><Link className="hover:text-coral" href="/pages/about-us">Our Story</Link></li>
            <li><Link className="hover:text-coral" href="/pages/care-guide">Care Guide</Link></li>
            <li><Link className="hover:text-coral" href="/pages/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Stay close</h3>
          <p className="text-sm leading-relaxed text-stone-400">New collections, fit tips and a little everyday magic.</p>
          <div className="mt-4 flex gap-3">
            <span className="rounded-full bg-white/10 p-2"><Camera className="h-4 w-4" /></span>
            <span className="rounded-full bg-white/10 p-2"><Mail className="h-4 w-4" /></span>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-700 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {shopName}. Made with a little magic for pets everywhere.
      </div>
    </footer>
  );
}
