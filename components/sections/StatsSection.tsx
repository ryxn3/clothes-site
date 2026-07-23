"use client";

import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/products";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 dark:bg-ink-950 sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(176,141,87,0.18),transparent_45%)]"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 sm:px-10 lg:grid-cols-4 lg:px-16">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} y={20}>
            <div className="text-center lg:text-left">
              <p className="font-display text-4xl text-ink-50 sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-ink-400">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
