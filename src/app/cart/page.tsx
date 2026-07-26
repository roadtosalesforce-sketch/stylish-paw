import { CartContent } from "@/components/cart-content";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
        Shopping Cart
      </h1>
      <div className="mt-8">
        <CartContent />
      </div>
    </div>
  );
}
