"use client";

import { useEffect, useRef } from "react";
import {
  HiOutlinePaperAirplane,
  HiOutlineSun,
  HiOutlineBolt,
  HiOutlineCake,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { prefersReducedMotion } from "@/lib/utils";

const SCENES = [
  {
    icon: HiOutlinePaperAirplane,
    title: "Airport",
    tag: "Scene 01",
    copy: "A traveler slips their passport into the hidden pocket before boarding — no bag, no patting pockets, no worry.",
    from: "from-[#1a2940]",
    to: "to-[#0b111c]",
  },
  {
    icon: HiOutlineSun,
    title: "Beach",
    tag: "Scene 02",
    copy: "Feet in the sand, phone safely zipped away. Nothing to watch, nothing to lose.",
    from: "from-[#2a4b52]",
    to: "to-[#0f2025]",
  },
  {
    icon: HiOutlineBolt,
    title: "Gym",
    tag: "Scene 03",
    copy: "Keys secured through every set — the hidden pocket stays put, even when you don't.",
    from: "from-[#3a2a1a]",
    to: "to-[#1a120b]",
  },
  {
    icon: HiOutlineCake,
    title: "Coffee Shop",
    tag: "Scene 04",
    copy: "Wallet protected while you catch up with a friend, hands free, mind at ease.",
    from: "from-[#402032]",
    to: "to-[#1c0f17]",
  },
  {
    icon: HiOutlineBuildingOffice2,
    title: "Walking Through the City",
    tag: "Scene 05",
    copy: "Nothing visible in the pockets. Nothing for anyone to see — everything exactly where you left it.",
    from: "from-[#26324a]",
    to: "to-[#0e1320]",
  },
];

export function LifestyleShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>(".lifestyle-scene").forEach((scene) => {
        gsap.fromTo(
          scene.querySelector(".scene-copy"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scene,
              containerAnimation: scrollTween,
              start: "left 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-950"
      aria-label="Lifestyle showcase"
    >
      <div ref={trackRef} className="flex h-[100svh] w-max">
        {SCENES.map((scene) => {
          const Icon = scene.icon;
          return (
            <div
              key={scene.title}
              className={`lifestyle-scene relative flex h-[100svh] w-[100vw] flex-shrink-0 items-end bg-gradient-to-br ${scene.from} ${scene.to} px-6 pb-20 sm:px-16`}
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_55%)]"
              />
              <div className="scene-copy relative z-10 max-w-lg">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-light">
                  {scene.tag}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl text-white backdrop-blur-md">
                    <Icon />
                  </span>
                  <h3 className="font-display text-3xl text-ink-50 sm:text-4xl">
                    {scene.title}
                  </h3>
                </div>
                <p className="mt-4 text-base leading-relaxed text-ink-300">
                  {scene.copy}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
