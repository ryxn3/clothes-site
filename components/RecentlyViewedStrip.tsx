"use client";

import { ShortsIllustration } from "@/components/ui/ShortsIllustration";
import { useRecentlyViewed } from "@/components/providers/RecentlyViewedContext";
import { COLORS, PRODUCT } from "@/lib/products";

export function RecentlyViewedStrip() {
  const { colors } = useRecentlyViewed();

  if (colors.length < 2) return null;

  return (
    <section className="border-t border-ink-100 bg-white py-16 dark:border-ink-800 dark:bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-xl text-ink-900 dark:text-ink-50">
          Recently Viewed
        </h2>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {colors.map((colorId) => {
            const color = COLORS.find((c) => c.id === colorId)!;
            return (
              <div
                key={colorId}
                className="flex w-32 flex-shrink-0 flex-col items-center rounded-2xl border border-ink-100 bg-ink-50/60 p-3 dark:border-ink-800 dark:bg-ink-900/60"
              >
                <ShortsIllustration
                  hex={color.hex}
                  shadeHex={color.shadeHex}
                  className="h-20 w-full"
                />
                <span className="mt-2 text-center text-xs font-medium text-ink-700 dark:text-ink-300">
                  {PRODUCT.name} &mdash; {color.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
