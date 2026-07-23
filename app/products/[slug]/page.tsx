import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { GarmentProductSection } from "@/components/sections/GarmentProductSection";
import { PRODUCTS, getProductBySlug } from "@/lib/products";

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Hidden Pocket`,
      description: product.description,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <main className="pt-20">
      <div className="mx-auto max-w-7xl px-6 pt-8 sm:px-10 lg:px-16">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-50"
        >
          <HiOutlineArrowLeft /> Back to Shop
        </Link>
      </div>
      <GarmentProductSection product={product} />
    </main>
  );
}
