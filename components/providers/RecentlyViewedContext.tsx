"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ColorId } from "@/lib/types";

interface RecentlyViewedContextValue {
  colors: ColorId[];
  record: (color: ColorId) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(
  null
);
const STORAGE_KEY = "hps-recently-viewed";
const MAX_ITEMS = 4;

export function RecentlyViewedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const record = useCallback((color: ColorId) => {
    setColors((prev) => {
      const next = [color, ...prev.filter((c) => c !== color)];
      return next.slice(0, MAX_ITEMS);
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ colors, record }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx)
    throw new Error(
      "useRecentlyViewed must be used within RecentlyViewedProvider"
    );
  return ctx;
}
