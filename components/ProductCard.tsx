"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import { ProductThumbnail } from "@/components/ProductThumbnail";
import { Reveal } from "@/components/ui/Reveal";
import { FLAGSHIP_SLUG } from "@/lib/products";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  delay?: number;
}

export function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const href = product.slug === FLAGSHIP_SLUG ? "/#product" : `/products/${product.slug}`;

  return (
    <Reveal delay={delay}>
      <Link href={href} data-cursor-hover className="group block">
        <motion.div
          whileHover={{ y: -6 }}
          className="overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-sm transition-shadow duration-300 hover:shadow-premium dark:border-ink-800 dark:bg-ink-900"
        >
          <ProductThumbnail
            slug={product.slug}
            color="black"
            alt={product.name}
            className="aspect-square w-full bg-ink-100 dark:bg-ink-800"
            imageClassName="p-6 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-accent">
              {product.tagline}
            </p>
            <h3 className="mt-1 font-display text-lg text-ink-900 dark:text-ink-50">
              {product.name}
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-display text-base text-ink-900 dark:text-ink-50">
                {formatPrice(product.price)}
              </span>
              <span className="flex items-center gap-1 text-xs text-ink-500 dark:text-ink-400">
                <HiStar className="text-accent" />
                {product.rating}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </Reveal>
  );
}
