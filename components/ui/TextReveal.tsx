"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { prefersReducedMotion } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  as = "h2",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  const Tag = as;

  useEffect(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll("span.word-inner");

    if (prefersReducedMotion()) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(targets, { yPercent: 110, opacity: 0 });
    const ctx = gsap.context(() => {
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        delay,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [delay, text]);

  return (
    <Tag className={className} ref={containerRef as any}>
      {words.map((word, i) => (
        <span
          key={i}
          className="mr-[0.28em] inline-block overflow-hidden align-top last:mr-0"
        >
          <span className="word-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
