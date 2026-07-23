"use client";

import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { prefersReducedMotion } from "@/lib/utils";

export function SuccessContent() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const duration = 2200;
    const end = Date.now() + duration;
    const colors = ["#b08d57", "#d4b483", "#1a1a1a", "#f5f3ee"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-ink-50 px-6 text-center dark:bg-ink-950">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <HiOutlineCheckCircle className="mx-auto mb-6 text-6xl text-accent" />
        <h1 className="font-display text-3xl text-ink-900 dark:text-ink-50 sm:text-4xl">
          Order Confirmed
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Thank you for choosing Hidden Pocket. A confirmation email is on its
          way. Your shorts &mdash; and your secrets &mdash; are on the move.
        </p>
        <Link href="/" className="mt-10 inline-block">
          <MagneticButton>Back to Home</MagneticButton>
        </Link>
      </motion.div>
    </main>
  );
}
