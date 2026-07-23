import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { TextReveal } from "@/components/ui/TextReveal";
import { PRODUCTS } from "@/lib/products";

export function CollectionTeaser() {
  return (
    <section className="bg-ink-50 py-24 dark:bg-ink-950 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <TextReveal
            as="h2"
            text="The rest of the collection."
            className="max-w-xl font-display text-3xl text-ink-900 dark:text-ink-50 sm:text-5xl"
          />
          <Link
            href="/shop"
            className="whitespace-nowrap text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Shop All &rarr;
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.slug} product={product} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
