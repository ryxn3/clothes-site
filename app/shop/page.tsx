import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { ALL_PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop the Collection",
  description:
    "Every Hidden Pocket piece — shorts, sweatpants, hoodies, and more — each with a concealed interior pocket built in.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white pb-24 pt-32 dark:bg-ink-950">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
          The Full Collection
        </p>
        <TextReveal
          as="h1"
          text="One hidden pocket. Every wardrobe staple."
          className="mt-3 max-w-2xl font-display text-3xl text-ink-900 dark:text-ink-50 sm:text-5xl"
        />
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Shorts, sweatpants, hoodies, and tees — every piece is built around
          the same concealed interior zip pocket, so your essentials stay
          secure no matter what you&apos;re wearing.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_PRODUCTS.map((product, i) => (
            <ProductCard key={product.slug} product={product} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </main>
  );
}
