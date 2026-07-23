"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ColorId } from "@/lib/types";

interface WishlistItem {
  slug: string;
  color: ColorId;
}

interface WishlistContextValue {
  items: WishlistItem[];
  toggle: (slug: string, color: ColorId) => void;
  isSaved: (slug: string, color: ColorId) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "hps-wishlist";

function keyOf(item: WishlistItem) {
  return `${item.slug}-${item.color}`;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const toggle = useCallback((slug: string, color: ColorId) => {
    setItems((prev) => {
      const key = keyOf({ slug, color });
      const exists = prev.some((item) => keyOf(item) === key);
      return exists
        ? prev.filter((item) => keyOf(item) !== key)
        : [...prev, { slug, color }];
    });
  }, []);

  const isSaved = useCallback(
    (slug: string, color: ColorId) =>
      items.some((item) => keyOf(item) === keyOf({ slug, color })),
    [items]
  );

  return (
    <WishlistContext.Provider value={{ items, toggle, isSaved }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
