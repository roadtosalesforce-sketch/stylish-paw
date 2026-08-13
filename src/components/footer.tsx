import Link from "next/link";
import { Camera, Mail, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-charcoal text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-coral" />
            <span className="font-display text-lg font-bold text-white">Furry Fairy Pets</span>
          </div>
          <p className="text-sm leading-relaxed text-stone-400">
            Comfortable pet clothing with a playful point of view, created for everyday adventures and special moments.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            Shop
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-coral transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=sweaters"
                className="hover:text-coral transition-colors"
              >
                Sweaters
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=raincoats"
                className="hover:text-coral transition-colors"
              >
                Raincoats
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=costumes"
                className="hover:text-coral transition-colors"
              >
                Costumes
              </Link>
            </li>
          </ul>
        </div>

        <div><h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">About</h3><ul className="space-y-2 text-sm text-stone-400"><li><Link className="hover:text-coral" href="/pages/about-us">Our Story</Link></li><li><Link className="hover:text-coral" href="/pages/care-guide">Care Guide</Link></li><li><Link className="hover:text-coral" href="/pages/contact">Contact</Link></li></ul></div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            Help
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/pages/size-guide" className="hover:text-coral">Size Guide</Link>
            </li>
            <li>
              <Link href="/pages/shipping-returns" className="hover:text-coral">Shipping & Returns</Link>
            </li>
            <li>
              <Link href="/pages/faq" className="hover:text-coral">FAQ</Link>
            </li>
          </ul>
        </div>
        <div><h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Stay close</h3><p className="text-sm leading-relaxed text-stone-400">New collections, fit tips and a little everyday magic.</p><div className="mt-4 flex gap-3"><span className="rounded-full bg-white/10 p-2"><Camera className="h-4 w-4"/></span><span className="rounded-full bg-white/10 p-2"><Mail className="h-4 w-4"/></span></div></div>
      </div>

      <div className="border-t border-stone-700 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Furry Fairy Pets. Made with a little magic for pets everywhere.
      </div>
    </footer>
  );
}
