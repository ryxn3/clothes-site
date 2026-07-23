"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PRODUCT } from "@/lib/products";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-ink-950"
    >
      {/* Animated gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 animate-gradient-move bg-[length:200%_200%] bg-gradient-to-br from-ink-950 via-[#2a2117] to-ink-950 opacity-90"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-grain-gradient"
      />

      {/* Floating soft particles */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-accent/30 blur-sm"
            style={{
              width: 4 + ((i * 7) % 10),
              height: 4 + ((i * 7) % 10),
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{
              duration: 6 + (i % 5),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-6 sm:px-10 lg:px-16">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ink-200 backdrop-blur-md"
        >
          Introducing the Hidden Pocket Collection
        </motion.span>

        <TextReveal
          as="h1"
          text="The Shorts That Keep Your Essentials Hidden."
          className="max-w-4xl font-display text-4xl leading-[1.05] text-ink-50 sm:text-6xl lg:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-ink-300 sm:text-lg"
        >
          {PRODUCT.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            onClick={() =>
              document
                .getElementById("product")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Shop Now
          </MagneticButton>
          <MagneticButton
            variant="secondary"
            className="border-white/25 text-ink-50 hover:border-white"
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn More
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-10 w-6 rounded-full border border-white/30 p-1">
          <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
        </div>
      </motion.div>
    </section>
  );
}
