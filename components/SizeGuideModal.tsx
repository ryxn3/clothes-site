"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineXMark } from "react-icons/hi2";
import { SIZE_GUIDE } from "@/lib/products";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
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
            aria-labelledby="size-guide-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg rounded-3xl border border-ink-200 bg-white p-6 shadow-premium dark:border-ink-800 dark:bg-ink-900 sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between">
              <h2
                id="size-guide-title"
                className="font-display text-2xl text-ink-900 dark:text-ink-50"
              >
                Size Guide
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close size guide"
                className="rounded-full p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-50"
              >
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[360px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-ink-200 text-ink-500 dark:border-ink-700 dark:text-ink-400">
                    <th className="py-2 pr-4 font-medium">Size</th>
                    <th className="py-2 pr-4 font-medium">Waist</th>
                    <th className="py-2 pr-4 font-medium">Hip</th>
                    <th className="py-2 font-medium">Inseam</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((row) => (
                    <tr
                      key={row.size}
                      className="border-b border-ink-100 text-ink-700 last:border-0 dark:border-ink-800 dark:text-ink-300"
                    >
                      <td className="py-3 pr-4 font-semibold text-ink-900 dark:text-ink-50">
                        {row.size}
                      </td>
                      <td className="py-3 pr-4">{row.waist}</td>
                      <td className="py-3 pr-4">{row.hip}</td>
                      <td className="py-3">{row.inseam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
              Measurements are in inches. If you&apos;re between sizes, we
              recommend sizing up for a roomier, relaxed fit.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
