"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineXMark, HiOutlineMinus, HiOutlinePlus, HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "@/components/providers/CartContext";
import { COLORS, PRODUCT } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ShortsIllustration } from "@/components/ui/ShortsIllustration";

const PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

export function CartDrawer() {
  const { lines, isOpen, closeCart, removeLine, updateQuantity, subtotal, itemCount } =
    useCart();

  function handleCheckout() {
    if (PAYMENT_LINK) {
      window.location.href = PAYMENT_LINK;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[95] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-[96] flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-ink-900"
          >
            <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5 dark:border-ink-800">
              <h2 className="font-display text-xl text-ink-900 dark:text-ink-50">
                Your Bag ({itemCount})
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-2 text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-50"
              >
                <HiOutlineXMark className="text-xl" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-ink-500 dark:text-ink-400">
                  <HiOutlineShoppingBag className="mb-3 text-4xl" />
                  <p>Your bag is empty.</p>
                </div>
              ) : (
                <ul className="space-y-5">
                  {lines.map((line) => {
                    const color = COLORS.find((c) => c.id === line.color)!;
                    return (
                      <li key={line.id} className="flex gap-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-ink-50 dark:bg-ink-800">
                          <ShortsIllustration
                            hex={color.hex}
                            shadeHex={color.shadeHex}
                            className="h-full w-full p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-medium text-ink-900 dark:text-ink-50">
                                {PRODUCT.name}
                              </p>
                              <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">
                                {color.name} &middot; {line.size}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeLine(line.id)}
                              aria-label="Remove item"
                              className="text-xs font-medium text-ink-400 hover:text-ink-700 dark:hover:text-ink-200"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-ink-200 dark:border-ink-700">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() =>
                                  updateQuantity(line.id, line.quantity - 1)
                                }
                                className="flex h-8 w-8 items-center justify-center text-ink-600 dark:text-ink-300"
                              >
                                <HiOutlineMinus className="text-xs" />
                              </button>
                              <span className="w-6 text-center text-xs font-medium text-ink-900 dark:text-ink-50">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() =>
                                  updateQuantity(line.id, line.quantity + 1)
                                }
                                className="flex h-8 w-8 items-center justify-center text-ink-600 dark:text-ink-300"
                              >
                                <HiOutlinePlus className="text-xs" />
                              </button>
                            </div>
                            <span className="text-sm font-medium text-ink-900 dark:text-ink-50">
                              {formatPrice(PRODUCT.price * line.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-ink-100 px-6 py-6 dark:border-ink-800">
                <div className="mb-4 flex items-center justify-between text-sm font-medium text-ink-900 dark:text-ink-50">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {!PAYMENT_LINK && (
                  <p role="alert" className="mb-3 text-xs text-red-500">
                    Checkout isn&apos;t configured yet — set
                    NEXT_PUBLIC_STRIPE_PAYMENT_LINK to enable it.
                  </p>
                )}
                <MagneticButton
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={!PAYMENT_LINK}
                >
                  Checkout Securely
                </MagneticButton>
                <p className="mt-3 text-center text-xs text-ink-400">
                  Apple Pay, Google Pay, PayPal, Visa &amp; Mastercard accepted
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
