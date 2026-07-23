"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartLine, ColorId, SizeId } from "@/lib/types";
import { getProductBySlug } from "@/lib/products";

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (slug: string, color: ColorId, size: SizeId, quantity?: number) => void;
  removeLine: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  itemCount: number;
  lastAdded: CartLine | null;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hps-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartLine | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addToCart = useCallback(
    (slug: string, color: ColorId, size: SizeId, quantity = 1) => {
      setLines((prev) => {
        const id = `${slug}-${color}-${size}`;
        const existing = prev.find((l) => l.id === id);
        let next: CartLine[];
        if (existing) {
          next = prev.map((l) =>
            l.id === id ? { ...l, quantity: l.quantity + quantity } : l
          );
        } else {
          next = [...prev, { id, slug, color, size, quantity }];
        }
        setLastAdded({ id, slug, color, size, quantity });
        return next;
      });
      setIsOpen(true);
    },
    []
  );

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, quantity } : l))
    );
  }, []);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const price = getProductBySlug(l.slug)?.price ?? 0;
        return sum + l.quantity * price;
      }, 0),
    [lines]
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addToCart,
    removeLine,
    updateQuantity,
    subtotal,
    itemCount,
    lastAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
