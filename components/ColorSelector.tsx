"use client";

import { motion } from "framer-motion";
import { COLORS } from "@/lib/products";
import { ColorId } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  value: ColorId;
  onChange: (color: ColorId) => void;
}

export function ColorSelector({ value, onChange }: ColorSelectorProps) {
  const selected = COLORS.find((c) => c.id === value);

  return (
    <fieldset>
      <legend className="mb-3 flex items-baseline gap-2 text-sm font-medium text-ink-700 dark:text-ink-300">
        Color
        <span className="text-ink-400">— {selected?.name}</span>
      </legend>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Select color">
        {COLORS.map((color) => {
          const active = color.id === value;
          return (
            <button
              key={color.id}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={color.name}
              data-cursor-hover
              onClick={() => onChange(color.id)}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <motion.span
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: active ? "#b08d57" : "transparent" }}
                layout
              />
              <span
                className="h-8 w-8 rounded-full border border-black/10 shadow-sm transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
