"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineMinus,
  HiOutlinePlus,
  HiStar,
} from "react-icons/hi2";
import {
  GiZipper,
  GiClothes,
} from "react-icons/gi";
import {
  MdOutlineLocalLaundryService,
  MdOutlineFlight,
  MdOutlineWbSunny,
} from "react-icons/md";
import { TbShirt } from "react-icons/tb";
import { ProductViewer3D } from "@/components/ProductViewer3D";
import { ColorSelector } from "@/components/ColorSelector";
import { SizeSelector } from "@/components/SizeSelector";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { PRODUCT } from "@/lib/products";
import { ColorId, SizeId } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/providers/CartContext";
import { useWishlist } from "@/components/providers/WishlistContext";
import { useRecentlyViewed } from "@/components/providers/RecentlyViewedContext";

const DETAIL_ICONS = [
  { icon: TbShirt, label: "100% Cotton" },
  { icon: GiClothes, label: "Premium Corduroy" },
  { icon: GiZipper, label: "Hidden Zip Pocket" },
  { icon: MdOutlineLocalLaundryService, label: "Machine Washable" },
  { icon: HiOutlineHeart, label: "Soft Fabric" },
  { icon: MdOutlineFlight, label: "Travel Friendly" },
  { icon: MdOutlineWbSunny, label: "Everyday Wear" },
];

export function ProductSection() {
  const [color, setColor] = useState<ColorId>("black");
  const [size, setSize] = useState<SizeId>("M");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggle, isSaved } = useWishlist();
  const { record } = useRecentlyViewed();

  useEffect(() => {
    record(color);
  }, [color, record]);

  const saved = isSaved(color);

  return (
    <section
      id="product"
      className="relative bg-white py-24 dark:bg-ink-950 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <Reveal blur={false} y={0} scale={0.96} className="lg:sticky lg:top-24 lg:self-start">
          <ProductViewer3D color={color} />
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
              {PRODUCT.material}
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink-900 dark:text-ink-50 sm:text-4xl">
              {PRODUCT.name}
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex text-accent" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar key={i} />
                ))}
              </div>
              <span className="text-sm text-ink-600 dark:text-ink-300">
                {PRODUCT.rating} Rating &middot; {PRODUCT.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            <p className="mt-6 font-display text-3xl text-ink-900 dark:text-ink-50">
              {formatPrice(PRODUCT.price)}
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              {PRODUCT.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {DETAIL_ICONS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-ink-100 bg-ink-50/60 px-3 py-2 text-xs font-medium text-ink-600 dark:border-ink-800 dark:bg-ink-900/60 dark:text-ink-300"
                >
                  <Icon className="text-base text-accent" />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              <ColorSelector value={color} onChange={setColor} />
              <SizeSelector value={size} onChange={setSize} />

              <div>
                <span className="mb-3 block text-sm font-medium text-ink-700 dark:text-ink-300">
                  Quantity
                </span>
                <div className="inline-flex items-center rounded-full border border-ink-200 dark:border-ink-700">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
                  >
                    <HiOutlineMinus />
                  </button>
                  <span
                    className="w-8 text-center text-sm font-medium text-ink-900 dark:text-ink-50"
                    aria-live="polite"
                  >
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="flex h-11 w-11 items-center justify-center text-ink-600 hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
                  >
                    <HiOutlinePlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <MagneticButton
                className="flex-1 sm:flex-none sm:px-12"
                onClick={() => addToCart(color, size, quantity)}
              >
                Add to Cart &mdash; {formatPrice(PRODUCT.price * quantity)}
              </MagneticButton>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => toggle(color)}
                aria-pressed={saved}
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                data-cursor-hover
                className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-200 text-xl text-ink-700 transition hover:border-accent hover:text-accent dark:border-ink-700 dark:text-ink-300"
              >
                {saved ? <HiHeart className="text-accent" /> : <HiOutlineHeart />}
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
