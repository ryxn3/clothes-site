"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/providers/CartContext";
import { PRODUCT } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const { openCart, itemCount } = useCart();

  useEffect(() => {
    const productSection = document.getElementById("product");
    if (!productSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && window.scrollY > 400),
      { threshold: 0 }
    );
    observer.observe(productSection);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-ink-200 bg-white/95 px-5 py-3 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-950/95 md:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <div>
            <p className="text-xs text-ink-500 dark:text-ink-400">
              {PRODUCT.name}
            </p>
            <p className="font-display text-lg text-ink-900 dark:text-ink-50">
              {formatPrice(PRODUCT.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("product")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative flex-1 max-w-[220px] rounded-full bg-ink-900 py-3 text-sm font-medium text-ink-50 dark:bg-ink-50 dark:text-ink-950"
          >
            Add to Cart
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
