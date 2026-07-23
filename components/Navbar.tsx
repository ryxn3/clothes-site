"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useCart } from "@/components/providers/CartContext";
import { useWishlist } from "@/components/providers/WishlistContext";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#product", label: "Shop" },
  { href: "#features", label: "Features" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { colors } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 shadow-sm backdrop-blur-xl dark:bg-ink-950/80"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link
          href="/"
          className={cn(
            "font-display text-lg tracking-wide transition-colors",
            scrolled ? "text-ink-900 dark:text-ink-50" : "text-ink-50"
          )}
        >
          HIDDEN POCKET
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  scrolled ? "text-ink-700 dark:text-ink-300" : "text-ink-200"
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors",
              scrolled
                ? "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
                : "text-ink-100 hover:bg-white/10"
            )}
          >
            {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>

          <button
            type="button"
            aria-label={`Wishlist (${colors.length} items)`}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors",
              scrolled
                ? "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
                : "text-ink-100 hover:bg-white/10"
            )}
          >
            <HiOutlineHeart />
            {colors.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
                {colors.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Cart (${itemCount} items)`}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors",
              scrolled
                ? "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
                : "text-ink-100 hover:bg-white/10"
            )}
          >
            <HiOutlineShoppingBag />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors md:hidden",
              scrolled
                ? "text-ink-700 dark:text-ink-200"
                : "text-ink-100"
            )}
          >
            <HiOutlineBars3 />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex justify-end px-6 py-4">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-ink-50"
              >
                <HiOutlineXMark className="text-2xl" />
              </button>
            </div>
            <ul className="flex flex-col items-center gap-8 pt-10">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="font-display text-2xl text-ink-50"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
