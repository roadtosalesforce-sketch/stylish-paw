"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product } from "@/types/product";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "pawstyle-cart";

function itemKey(productId: string, size: string, color: string) {
  return `${productId}:${size}:${color}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setItems(JSON.parse(stored));
      } catch {
        /* ignore corrupt storage */
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, size: string, color: string, quantity = 1) => {
      setItems((prev) => {
        const key = itemKey(product.id, size, color);
        const existing = prev.find(
          (i) => itemKey(i.product.id, i.size, i.color) === key,
        );
        if (existing) {
          return prev.map((i) =>
            itemKey(i.product.id, i.size, i.color) === key
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { product, size, color, quantity }];
      });
    },
    [],
  );

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      const key = itemKey(productId, size, color);
      setItems((prev) =>
        prev.filter((i) => itemKey(i.product.id, i.size, i.color) !== key),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }
      const key = itemKey(productId, size, color);
      setItems((prev) =>
        prev.map((i) =>
          itemKey(i.product.id, i.size, i.color) === key
            ? { ...i, quantity }
            : i,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
