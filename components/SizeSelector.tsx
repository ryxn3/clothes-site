"use client";

import { useState } from "react";
import { SIZES } from "@/lib/products";
import { SizeId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SizeGuideModal } from "@/components/SizeGuideModal";

interface SizeSelectorProps {
  value: SizeId;
  onChange: (size: SizeId) => void;
}

export function SizeSelector({ value, onChange }: SizeSelectorProps) {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <fieldset>
      <legend className="mb-3 flex w-full items-center justify-between text-sm font-medium text-ink-700 dark:text-ink-300">
        <span>Size</span>
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="text-xs font-medium text-accent underline-offset-4 hover:underline"
        >
          Size Guide
        </button>
      </legend>
      <div
        className="grid grid-cols-6 gap-2"
        role="radiogroup"
        aria-label="Select size"
      >
        {SIZES.map((size) => {
          const active = size === value;
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={active}
              data-cursor-hover
              onClick={() => onChange(size)}
              className={cn(
                "rounded-xl border py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "border-ink-900 bg-ink-900 text-ink-50 dark:border-ink-50 dark:bg-ink-50 dark:text-ink-950"
                  : "border-ink-200 text-ink-700 hover:border-ink-400 dark:border-ink-700 dark:text-ink-300 dark:hover:border-ink-500"
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
      <SizeGuideModal open={guideOpen} onClose={() => setGuideOpen(false)} />
    </fieldset>
  );
}
