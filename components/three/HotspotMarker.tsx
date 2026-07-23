"use client";

import { Html } from "@react-three/drei";
import { Hotspot } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HotspotMarkerProps {
  hotspot: Hotspot;
  active: boolean;
  onSelect: (id: Hotspot["id"]) => void;
}

export function HotspotMarker({ hotspot, active, onSelect }: HotspotMarkerProps) {
  return (
    <Html position={hotspot.position} center distanceFactor={4.2} zIndexRange={[10, 0]}>
      <button
        type="button"
        aria-label={`Show info about ${hotspot.label}`}
        aria-pressed={active}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hotspot.id);
        }}
        className={cn(
          "group relative flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300",
          active
            ? "scale-125 border-accent bg-accent/90"
            : "border-white/70 bg-black/40 hover:scale-110 hover:bg-accent/70"
        )}
      >
        <span className="h-2 w-2 rounded-full bg-white" />
        <span className="absolute h-6 w-6 animate-ping rounded-full bg-accent/40" />
        <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink-950/90 px-3 py-1 text-[11px] font-medium text-ink-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {hotspot.label}
        </span>
      </button>
    </Html>
  );
}
