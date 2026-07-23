"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ColorId } from "@/lib/types";

interface WishlistContextValue {
  colors: ColorId[];
  toggle: (color: ColorId) => void;
  isSaved: (color: ColorId) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "hps-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColors] = useState<ColorId[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setColors(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  }, [colors, hydrated]);

  const toggle = useCallback((color: ColorId) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  }, []);

  const isSaved = useCallback((color: ColorId) => colors.includes(color), [colors]);

  return (
    <WishlistContext.Provider value={{ colors, toggle, isSaved }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
