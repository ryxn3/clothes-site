"use client";

import { motion } from "framer-motion";
import {
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { FEATURES } from "@/lib/products";

const ICONS = [
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineShieldCheck,
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative bg-ink-50 py-24 dark:bg-ink-950 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <TextReveal
          as="h2"
          text="Engineered for effortless, secure living."
          className="max-w-2xl font-display text-3xl text-ink-900 dark:text-ink-50 sm:text-5xl"
        />
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={feature.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-ink-200/70 bg-white/70 p-8 shadow-premium backdrop-blur-sm dark:border-ink-800 dark:bg-ink-900/60"
                >
                  <div
                    aria-hidden
                    className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition-transform duration-500 group-hover:scale-150"
                  />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-2xl text-accent">
                    <Icon />
                  </div>
                  <h3 className="relative mt-6 font-display text-xl text-ink-900 dark:text-ink-50">
                    {feature.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {feature.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
