# Hidden Pocket

A premium e-commerce experience built with Next.js (App Router), TypeScript,
Tailwind CSS, React Three Fiber, Framer Motion, and GSAP — showcasing the
**Hidden Pocket** collection: corduroy shorts, sweatpants, a hoodie, a zip
hoodie, and a tee, each with a concealed interior zip pocket. Deployed as a
static export so it can be hosted for free on **GitHub Pages**.

**Live site:** `https://<your-github-username>.github.io/clothes-site/`
(enable Pages in the repo settings — see below)

## Features

- A 5-product catalog (`/shop`) — shorts, sweatpants, hoodie, zip hoodie, tee
  — each with its own product page (`/products/[slug]`), color/size
  selectors, and a shared cart that spans products
- Cinematic hero with animated gradients, floating particles, and staggered
  text reveal (GSAP)
- Interactive 3D product viewer (React Three Fiber + Drei) for the flagship
  shorts: drag to rotate, scroll to zoom, auto-rotate, procedurally
  generated corduroy fabric texture, and clickable hotspots (Hidden Pocket,
  Elastic Waist, Drawstrings, Cotton Fabric)
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
  viewed, quick view modal, and checkout via a Stripe Payment Link
- Confetti + animated success page after checkout
- Dark mode / light mode, custom cursor + magnetic buttons, mobile sticky
  add-to-cart bar, and `prefers-reduced-motion` support throughout
- SEO: metadata, Open Graph/Twitter cards (statically generated), JSON-LD
  Product schema, `robots.txt` and `sitemap.xml`

### About the visuals

The flagship shorts use real product photography (`public/products/*.jpg`)
plus a live, procedurally textured 3D model (the corduroy weave is painted
onto a `<canvas>` and applied as a Three.js texture). The rest of the
collection — sweatpants, hoodie, zip hoodie, tee — doesn't have photography
yet, so those use brand-consistent SVG illustrations
(`components/ui/GarmentIllustration.tsx`). Swap in real photos by adding
them to `public/products/` and updating `ProductThumbnail` once available.

## Why a Payment Link instead of a Checkout API route

GitHub Pages only serves static files — it can't run server code. A real
Stripe Checkout integration needs a server to create a Checkout Session
(so the secret key never reaches the browser), so that isn't possible here.
Instead, the "Checkout Securely" button redirects to a
[Stripe Payment Link](https://dashboard.stripe.com/payment-links): a hosted,
no-code checkout page you create once in the Stripe Dashboard. It's the
right tool for a static single-product store — enable "adjustable quantity"
on the link, and optionally add a custom field asking the buyer to specify
their color/size choice, since the static site can't pass that through
automatically.

If you'd rather have a fully dynamic Checkout Session (carrying color, size,
and quantity per line automatically), deploy this app to a platform that runs
a Node server — Vercel, Netlify, or similar — and reintroduce a
`app/api/checkout/route.ts` Route Handler using the `stripe` npm package.
That requires removing `output: "export"` from `next.config.js` first.

## Getting Started (local dev)

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env`:

```
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/your_payment_link
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create the Payment Link at <https://dashboard.stripe.com/payment-links>.
Until it's set, the checkout button is disabled with an inline notice.

## Deploying to GitHub Pages

This repo includes `.github/workflows/deploy-pages.yml`, which builds and
publishes the site automatically.

1. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. (Optional) Add a repository secret named
   `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` (**Settings → Secrets and variables →
   Actions**) so checkout works on the deployed site.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. The site will publish to
   `https://<your-github-username>.github.io/clothes-site/`.

The workflow sets `GITHUB_PAGES=true` during the build, which tells
`next.config.js` to add the `/clothes-site` `basePath`/`assetPrefix` the
project site needs. If you rename the repository, update the `repoName`
constant in `next.config.js` to match.

### Building the static export manually

```bash
GITHUB_PAGES=true NEXT_PUBLIC_SITE_URL=https://<user>.github.io/clothes-site npm run build
```

The static site is written to `./out`. You can preview it locally with any
static file server, e.g. `npx serve out`.

## Scripts

| Command         | Description              |
| ---------------- | ------------------------ |
| `npm run dev`    | Start the dev server      |
| `npm run build`  | Static export build (writes `./out`) |
| `npm run start`  | Start `next start` (only works without `output: "export"`) |
| `npm run lint`   | Run ESLint                |

## Project Structure

```
app/                  Routes (App Router), layout, metadata
  success/             Post-purchase confirmation + confetti
  privacy|shipping|returns|terms|contact/   Legal/info pages
components/
  three/               R3F scene, shorts geometry, corduroy texture, hotspots
  sections/            Homepage sections (Hero, Features, Lifestyle, etc.)
  providers/           Cart/Wishlist/RecentlyViewed/Theme/Lenis providers
  ui/                  Reveal, TextReveal, MagneticButton, cursor, loading screen
lib/                  Types, product data, utilities
.github/workflows/     GitHub Pages deployment workflow
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
- Checkout uses a Stripe Payment Link (see above) rather than a dynamic
  Checkout Session, since GitHub Pages can't run the server-side API route
  a full Stripe integration needs.
