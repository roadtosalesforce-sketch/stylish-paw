import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-charcoal text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-display text-lg font-bold text-white">Furry Fairy Pets</span>
          </div>
          <p className="text-sm leading-relaxed text-stone-400">
            Premium pet apparel designed for comfort, style, and every adventure
            with your furry best friend.
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

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
            Help
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="text-stone-400">Size Guide</span>
            </li>
            <li>
              <span className="text-stone-400">Shipping & Returns</span>
            </li>
            <li>
              <span className="text-stone-400">Contact Us</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-700 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Furry Fairy Pets. Made with a little magic for pets everywhere.
      </div>
    </footer>
  );
}
