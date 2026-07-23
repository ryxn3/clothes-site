"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { HERO_DETAIL_IMAGE } from "@/lib/products";

export function ProductPhotoShowcase() {
  return (
    <section className="bg-white py-24 dark:bg-ink-950 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:px-16">
        <Reveal scale={0.96} blur={false}>
          <div className="relative overflow-hidden rounded-[2rem] shadow-premium">
            <Image
              src={HERO_DETAIL_IMAGE}
              alt="Close-up of the Hidden Pocket Corduroy Shorts showing the concealed interior zip pocket"
              width={900}
              height={900}
              className="w-full"
              priority
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
            The Detail That Matters
          </p>
          <TextReveal
            as="h2"
            text="A pocket you can't see, and can always trust."
            className="mt-3 font-display text-3xl text-ink-900 dark:text-ink-50 sm:text-4xl"
          />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            Tucked inside the waistband and sealed with a durable zipper, the
            hidden pocket carries your phone, wallet, cash, or passport
            without ever showing on the outside — so you move through
            airports, beaches, and city streets with nothing to watch and
            nothing to lose.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
