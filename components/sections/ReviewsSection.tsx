"use client";

import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { REVIEWS } from "@/lib/products";

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-white py-24 dark:bg-ink-950 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <TextReveal
          as="h2"
          text="Loved by thousands, worldwide."
          className="max-w-2xl font-display text-3xl text-ink-900 dark:text-ink-50 sm:text-5xl"
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="flex h-full flex-col rounded-3xl border border-ink-200/70 bg-ink-50/60 p-6 shadow-sm dark:border-ink-800 dark:bg-ink-900/60"
              >
                <div className="flex text-accent" aria-hidden>
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <HiStar key={idx} />
                  ))}
                </div>
                <p className="mt-4 flex-1 font-display text-lg leading-snug text-ink-900 dark:text-ink-50">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink-800 dark:text-ink-200">
                    {review.name}
                  </span>
                  <span className="text-ink-500 dark:text-ink-400">
                    {review.location}
                  </span>
                </div>
                {review.verified && (
                  <span className="mt-2 text-xs font-medium uppercase tracking-wide text-accent">
                    Verified Buyer
                  </span>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
