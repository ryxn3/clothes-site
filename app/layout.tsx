import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { CursorEffects } from "@/components/ui/CursorEffects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { PRODUCT } from "@/lib/products";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${PRODUCT.name} | Premium Corduroy Shorts with Hidden Pocket`,
    template: "%s | Hidden Pocket",
  },
  description: PRODUCT.description,
  keywords: [
    "corduroy shorts",
    "hidden pocket shorts",
    "travel shorts",
    "premium mens shorts",
    "secure pocket shorts",
  ],
  openGraph: {
    type: "website",
    title: `${PRODUCT.name} | Hidden Pocket`,
    description: PRODUCT.description,
    url: siteUrl,
    siteName: "Hidden Pocket",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRODUCT.name} | Hidden Pocket`,
    description: PRODUCT.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
  width: "device-width",
  initialScale: 1,
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: PRODUCT.name,
  description: PRODUCT.description,
  brand: { "@type": "Brand", name: "Hidden Pocket" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: PRODUCT.price.toFixed(2),
    availability: "https://schema.org/InStock",
    url: siteUrl,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: PRODUCT.rating,
    reviewCount: PRODUCT.reviewCount,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <LoadingScreen />
          <CursorEffects />
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
          <MobileStickyCTA />
        </Providers>
      </body>
    </html>
  );
}
