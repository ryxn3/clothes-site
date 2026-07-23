# Hidden Pocket Corduroy Shorts

A premium, single-product e-commerce experience built with Next.js (App Router),
TypeScript, Tailwind CSS, React Three Fiber, Framer Motion, GSAP, and Stripe
Checkout — showcasing the **Hidden Pocket Corduroy Shorts** ($45).

## Features

- Cinematic hero with animated gradients, floating particles, and staggered
  text reveal (GSAP)
- Interactive 3D product viewer (React Three Fiber + Drei): drag to rotate,
  scroll to zoom, auto-rotate, procedurally generated corduroy fabric texture,
  and clickable hotspots (Hidden Pocket, Elastic Waist, Drawstrings, Cotton
  Fabric)
- Hidden pocket reveal animation — clicking the "Hidden Pocket" hotspot opens
  an interior flap and sequences a phone, wallet, passport, keys, and earbuds
  sliding into the concealed pocket cavity
- 7-color interactive color selector that instantly updates the 3D model and
  the color gallery
- Size selector with a premium size guide modal
- Scroll-driven storytelling: pinned horizontal lifestyle showcase (Airport,
  Beach, Gym, Coffee Shop, City) built with GSAP ScrollTrigger
- Feature cards, animated stat counters, testimonials, and an animated FAQ
  accordion
- Full shopping flow: cart drawer, quantity controls, wishlist, recently
  viewed, quick view modal, and Stripe Checkout (Apple Pay / Google Pay /
  PayPal / card, enabled automatically based on your Stripe Dashboard
  settings)
- Confetti + animated success page after checkout
- Dark mode / light mode, custom cursor + magnetic buttons, mobile sticky
  add-to-cart bar, and `prefers-reduced-motion` support throughout
- SEO: metadata, Open Graph/Twitter cards (dynamically generated), JSON-LD
  Product schema, `robots.txt` and `sitemap.xml`

### About the visuals

There is no stock photography in this project — every product image is a
lightweight, brand-consistent SVG illustration or a live, procedurally
textured 3D model generated at runtime (the corduroy weave is painted onto a
`<canvas>` and applied as a Three.js texture). This keeps the project fully
self-contained with zero external image dependencies.

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env` and fill in your [Stripe](https://dashboard.stripe.com/apikeys)
test keys to enable checkout:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Apple Pay, Google Pay, and PayPal are enabled automatically by Stripe
Checkout based on which payment methods are activated in your Stripe
Dashboard — no extra code is required.

## Scripts

| Command         | Description              |
| ---------------- | ------------------------ |
| `npm run dev`    | Start the dev server      |
| `npm run build`  | Production build          |
| `npm run start`  | Start the production server |
| `npm run lint`   | Run ESLint                |

## Project Structure

```
app/                  Routes (App Router), layout, metadata, API routes
  api/checkout/        Stripe Checkout Session creation
  success/             Post-purchase confirmation + confetti
  privacy|shipping|returns|terms|contact/   Legal/info pages
components/
  three/               R3F scene, shorts geometry, corduroy texture, hotspots
  sections/            Homepage sections (Hero, Features, Lifestyle, etc.)
  providers/           Cart/Wishlist/RecentlyViewed/Theme/Lenis providers
  ui/                  Reveal, TextReveal, MagneticButton, cursor, loading screen
lib/                  Types, product data, Stripe client, utilities
```

## Known limitations / follow-ups

- `npm audit` reports a handful of high-severity advisories against Next.js
  14.x that are only patched in the Next.js 16 major line. Upgrading to
  Next 16 requires React 19 and newer major versions of the Three.js/R3F
  stack used here; that migration was intentionally left out of scope for
  this build to avoid destabilizing the 3D viewer. Run `npm audit` to review
  current advisories before deploying to production.
- The 3D shorts model is a stylized, procedurally built geometry (not a
  scanned/sculpted asset) — it's designed to be recognizable and fully
  interactive rather than photorealistic.
