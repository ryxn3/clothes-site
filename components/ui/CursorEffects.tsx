"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersReducedMotion } from "@/lib/utils";

/** Custom cursor with a magnetic ring that grows over interactive elements. Hidden on touch devices. */
export function CursorEffects() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 30, stiffness: 400 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 400 });
  const initialized = useRef(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || prefersReducedMotion()) return;
    setEnabled(true);

    function handleMove(e: MouseEvent) {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!initialized.current) initialized.current = true;
    }

    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border border-accent/70 mix-blend-difference md:block"
      style={{
        x: springX,
        y: springY,
        width: 32,
        height: 32,
      }}
      animate={{
        scale: hovering ? 1.8 : 1,
        backgroundColor: hovering ? "rgba(176,141,87,0.3)" : "rgba(176,141,87,0)",
      }}
      transition={{ duration: 0.25 }}
    />
  );
}
