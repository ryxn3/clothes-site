"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShortsIllustration } from "@/components/ui/ShortsIllustration";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { QuickViewModal } from "@/components/QuickViewModal";
import { COLORS } from "@/lib/products";
import { ColorId } from "@/lib/types";

export function ColorGallery() {
  const [quickViewColor, setQuickViewColor] = useState<ColorId | null>(null);

  return (
    <section className="bg-ink-50 py-24 dark:bg-ink-950 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <TextReveal
          as="h2"
          text="Seven colors. One secret pocket."
          className="max-w-2xl font-display text-3xl text-ink-900 dark:text-ink-50 sm:text-5xl"
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map((color, i) => (
            <Reveal key={color.id} delay={i * 0.05}>
              <motion.button
                type="button"
                data-cursor-hover
                onClick={() => setQuickViewColor(color.id)}
                whileHover={{ y: -6 }}
                className="group flex w-full flex-col items-center rounded-3xl border border-ink-200/70 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-premium dark:border-ink-800 dark:bg-ink-900"
              >
                <div className="relative w-full overflow-hidden rounded-2xl bg-ink-100 dark:bg-ink-800">
                  <ShortsIllustration
                    hex={color.hex}
                    shadeHex={color.shadeHex}
                    className="h-40 w-full scale-100 p-4 transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink-900/80 py-2 text-center text-xs font-medium uppercase tracking-wide text-ink-50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Quick View
                  </span>
                </div>
                <span className="mt-4 text-sm font-medium text-ink-800 dark:text-ink-200">
                  {color.name}
                </span>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
      <QuickViewModal color={quickViewColor} onClose={() => setQuickViewColor(null)} />
    </section>
  );
}
