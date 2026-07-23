"use client";

import { ThemeProvider } from "./ThemeProvider";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { RecentlyViewedProvider } from "./RecentlyViewedContext";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </RecentlyViewedProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
