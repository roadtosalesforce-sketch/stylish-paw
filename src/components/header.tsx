import Link from "next/link";
import { CartButton } from "./cart-button";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=sweaters", label: "Sweaters" },
  { href: "/shop?category=costumes", label: "Costumes" },
  { href: "/shop?category=accessories", label: "Accessories" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-lg shadow-sm transition-transform group-hover:scale-105">
            🐾
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-charcoal">
            Furry Fairy Pets
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-coral"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartButton />
        </div>
      </div>
    </header>
  );
}
