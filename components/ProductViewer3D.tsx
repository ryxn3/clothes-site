"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiDragMove2Line, RiRefreshLine, RiZoomInLine } from "react-icons/ri";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { COLORS, HOTSPOTS } from "@/lib/products";
import { ColorId, Hotspot } from "@/lib/types";
import { cn } from "@/lib/utils";

const Experience = dynamic(
  () => import("@/components/three/Experience").then((m) => m.Experience),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    ),
  }
);

export function ProductViewer3D({ color }: { color: ColorId }) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot["id"] | null>(null);
  const [pocketOpen, setPocketOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const colorHex = COLORS.find((c) => c.id === color)?.hex ?? "#1a1a1a";
  const activeInfo = HOTSPOTS.find((h) => h.id === activeHotspot);

  function handleSelect(id: Hotspot["id"]) {
    setAutoRotate(false);
    setActiveHotspot((prev) => (prev === id ? null : id));
    if (id === "pocket") {
      setPocketOpen((prev) => !prev);
    }
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-ink-200/60 bg-gradient-to-br from-ink-100 via-ink-50 to-ink-100 shadow-premium dark:border-ink-800 dark:from-ink-900 dark:via-ink-950 dark:to-ink-900 sm:aspect-[4/3] lg:aspect-square">
      <div className="absolute inset-0">
        <Experience
          colorHex={colorHex}
          pocketOpen={pocketOpen}
          autoRotate={autoRotate}
          activeHotspot={activeHotspot}
          onHotspotSelect={handleSelect}
        />
      </div>

      {/* Screen-reader description since canvas content isn't perceivable by AT */}
      <p className="sr-only" role="status">
        Interactive 3D viewer of the {colorHex} Hidden Pocket Corduroy Shorts.
        {pocketOpen
          ? " The hidden interior pocket is currently open, revealing space for a phone, wallet, passport, keys, and earbuds."
          : " Drag to rotate, scroll to zoom, or use the hotspot buttons to explore features."}
      </p>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-6">
        <span className="pointer-events-auto rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest text-ink-700 backdrop-blur-md dark:bg-ink-900/60 dark:text-ink-200">
          360° View
        </span>
        <div className="pointer-events-auto flex gap-2">
          <button
            type="button"
            onClick={() => setAutoRotate((p) => !p)}
            aria-pressed={autoRotate}
            aria-label="Toggle auto rotate"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink-700 backdrop-blur-md transition hover:bg-white dark:bg-ink-900/60 dark:text-ink-200 dark:hover:bg-ink-800"
          >
            <RiRefreshLine className={cn(autoRotate && "animate-spin-slow")} />
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-4 sm:p-6">
        <div className="flex items-center gap-4 rounded-full bg-white/70 px-4 py-2 text-[11px] font-medium text-ink-600 backdrop-blur-md dark:bg-ink-900/60 dark:text-ink-300">
          <span className="flex items-center gap-1">
            <RiDragMove2Line /> Drag to rotate
          </span>
          <span className="flex items-center gap-1">
            <RiZoomInLine /> Scroll to zoom
          </span>
        </div>
      </div>

      <AnimatePresence>
        {activeInfo && (
          <motion.div
            key={activeInfo.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute bottom-20 left-1/2 z-20 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-white/40 bg-white/85 p-5 shadow-glass backdrop-blur-xl dark:border-ink-700/60 dark:bg-ink-900/85 sm:bottom-24"
            role="dialog"
            aria-label={activeInfo.title}
          >
            <div className="mb-1 flex items-center gap-2">
              {activeInfo.id === "pocket" && (
                <HiOutlineLockClosed className="text-accent" />
              )}
              <h3 className="font-display text-lg text-ink-900 dark:text-ink-50">
                {activeInfo.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              {activeInfo.description}
            </p>
            {activeInfo.id === "pocket" && (
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-accent">
                {pocketOpen ? "Tap the hotspot again to close" : "Tap the hotspot to open it"}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
