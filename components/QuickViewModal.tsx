"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineXMark, HiStar } from "react-icons/hi2";
import { ColorSelector } from "@/components/ColorSelector";
import { SizeSelector } from "@/components/SizeSelector";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { COLORS, PRODUCT, PRODUCT_IMAGES } from "@/lib/products";
import { ColorId, SizeId } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/providers/CartContext";

interface QuickViewModalProps {
  color: ColorId | null;
  onClose: () => void;
}

export function QuickViewModal({ color, onClose }: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState<ColorId>(color ?? "black");
  const [size, setSize] = useState<SizeId>("M");
  const { addToCart } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (color) setSelectedColor(color);
  }, [color]);

  useEffect(() => {
    if (!color) return;
    closeRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [color, onClose]);

  const swatch = COLORS.find((c) => c.id === selectedColor)!;

  return (
    <AnimatePresence>
      {color && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view - ${PRODUCT.name}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid w-full max-w-3xl grid-cols-1 gap-8 overflow-y-auto rounded-3xl border border-ink-200 bg-white p-6 shadow-premium dark:border-ink-800 dark:bg-ink-900 sm:grid-cols-2 sm:p-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-5 top-5 rounded-full p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-50"
            >
              <HiOutlineXMark className="text-xl" />
            </button>

            <div className="relative h-64 overflow-hidden rounded-2xl bg-ink-50 dark:bg-ink-800 sm:h-full">
              <Image
                src={PRODUCT_IMAGES[selectedColor]}
                alt={`${swatch.name} Hidden Pocket Corduroy Shorts`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink-900 dark:text-ink-50">
                {PRODUCT.name}
              </h2>
              <div className="mt-2 flex items-center gap-2 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar key={i} />
                ))}
                <span className="text-sm text-ink-500 dark:text-ink-400">
                  {PRODUCT.rating}
                </span>
              </div>
              <p className="mt-4 font-display text-2xl text-ink-900 dark:text-ink-50">
                {formatPrice(PRODUCT.price)}
              </p>
              <div className="mt-6 space-y-6">
                <ColorSelector value={selectedColor} onChange={setSelectedColor} />
                <SizeSelector value={size} onChange={setSize} />
              </div>
              <MagneticButton
                className="mt-8 w-full"
                onClick={() => {
                  addToCart(selectedColor, size, 1);
                  onClose();
                }}
              >
                Add to Cart
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
