import {
  ColorId,
  FaqItem,
  Hotspot,
  Product,
  ProductColor,
  Review,
  SizeGuideRow,
  SizeId,
  StatItem,
} from "./types";
import { withBasePath } from "./utils";

export const FLAGSHIP_SLUG = "hidden-pocket-corduroy-shorts";

export const PRODUCT = {
  slug: FLAGSHIP_SLUG,
  name: "Hidden Pocket Corduroy Shorts",
  price: 45.0,
  currency: "usd",
  garment: "shorts" as const,
  tagline: "The shorts that keep your essentials hidden.",
  rating: 4.9,
  reviewCount: 1284,
  material: "100% Premium Cotton Corduroy",
  fit: "Relaxed Fit",
  waist: "Elastic Waistband with Drawstrings",
  feature: "Hidden Interior Zip Pocket",
  description:
    "Premium 100% Cotton Corduroy Shorts featuring a concealed zip pocket for ultimate security and comfort.",
};

/** The rest of the Hidden Pocket collection — same concealed-pocket concept, different garments. */
export const PRODUCTS: Product[] = [
  {
    slug: "hidden-pocket-sweatpants",
    name: "Hidden Pocket Sweatpants",
    price: 58,
    garment: "sweatpants",
    tagline: "Everyday comfort, quietly secured.",
    description:
      "Relaxed-fit sweatpants in soft brushed fleece, with the same concealed interior zip pocket that keeps your essentials hidden and secure.",
    material: "80% Cotton / 20% Polyester Brushed Fleece",
    feature: "Hidden Interior Zip Pocket",
    rating: 4.8,
    reviewCount: 642,
  },
  {
    slug: "hidden-pocket-hoodie",
    name: "Hidden Pocket Hoodie",
    price: 68,
    garment: "hoodie",
    tagline: "Cozy on the outside, covert on the inside.",
    description:
      "A heavyweight pullover hoodie with a discreet zippered pocket built into the kangaroo pocket, so your phone and cards stay put through every wear.",
    material: "100% Heavyweight Cotton Fleece",
    feature: "Hidden Interior Zip Pocket",
    rating: 4.9,
    reviewCount: 891,
  },
  {
    slug: "hidden-pocket-zip-hoodie",
    name: "Hidden Pocket Zip Hoodie",
    price: 72,
    garment: "zip-hoodie",
    tagline: "Zip up. Lock it in.",
    description:
      "A full-zip hoodie layered with a hidden interior security pocket — ideal for travel days when you need your hands free and your valuables closer.",
    material: "100% Heavyweight Cotton Fleece",
    feature: "Hidden Interior Zip Pocket",
    rating: 4.8,
    reviewCount: 503,
  },
  {
    slug: "hidden-pocket-tee",
    name: "Hidden Pocket Tee",
    price: 38,
    garment: "tee",
    tagline: "Simple on top. Secure underneath.",
    description:
      "A soft, everyday tee with a slim concealed pocket sewn into the interior hem — barely-there storage for a card or key when you're keeping it light.",
    material: "100% Combed Cotton Jersey",
    feature: "Hidden Interior Zip Pocket",
    rating: 4.7,
    reviewCount: 312,
  },
];

export const ALL_PRODUCTS: Product[] = [PRODUCT, ...PRODUCTS];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export const COLORS: ProductColor[] = [
  { id: "black", name: "Black", hex: "#1a1a1a", shadeHex: "#000000" },
  { id: "white", name: "White", hex: "#f5f3ee", shadeHex: "#d8d4c8" },
  { id: "beige", name: "Beige", hex: "#d8c3a0", shadeHex: "#b39c76" },
  { id: "pink", name: "Pink", hex: "#e3aeb5", shadeHex: "#c47f8a" },
  { id: "orange", name: "Orange", hex: "#d97a3f", shadeHex: "#a85623" },
  { id: "navy", name: "Navy Blue", hex: "#1f2a44", shadeHex: "#0f1526" },
  { id: "royal", name: "Royal Blue", hex: "#2b4fa3", shadeHex: "#1a3070" },
];

export const PRODUCT_IMAGES: Record<ColorId, string> = {
  black: withBasePath("/products/black.jpg"),
  white: withBasePath("/products/white.jpg"),
  beige: withBasePath("/products/beige.jpg"),
  pink: withBasePath("/products/pink.jpg"),
  orange: withBasePath("/products/orange.jpg"),
  navy: withBasePath("/products/navy.jpg"),
  royal: withBasePath("/products/royal.jpg"),
};

export const HERO_DETAIL_IMAGE = withBasePath("/products/hero-detail.jpg");

export const SIZES: SizeId[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const SIZE_GUIDE: SizeGuideRow[] = [
  { size: "XS", waist: '26"-28"', hip: '34"-36"', inseam: '5"' },
  { size: "S", waist: '28"-30"', hip: '36"-38"', inseam: '5"' },
  { size: "M", waist: '30"-32"', hip: '38"-40"', inseam: '5.5"' },
  { size: "L", waist: '32"-34"', hip: '40"-42"', inseam: '5.5"' },
  { size: "XL", waist: '34"-36"', hip: '42"-44"', inseam: '6"' },
  { size: "XXL", waist: '36"-39"', hip: '44"-47"', inseam: '6"' },
];

export const HOTSPOTS: Hotspot[] = [
  {
    id: "pocket",
    label: "Hidden Pocket",
    position: [0.55, 0.35, 0.9],
    title: "Hidden Interior Zip Pocket",
    description:
      "A concealed zippered pocket sits behind the waistband — invisible from the outside, big enough for your phone, wallet, passport, cash, keys, cards, and earbuds.",
  },
  {
    id: "waist",
    label: "Elastic Waist",
    position: [-1.05, 0.95, 0.4],
    title: "Elastic Waistband",
    description:
      "A soft, flexible waistband moves with you and holds its shape wash after wash.",
  },
  {
    id: "drawstrings",
    label: "Drawstrings",
    position: [0, 1.05, 0.95],
    title: "Adjustable Drawstrings",
    description:
      "Fine-tune your fit in seconds with premium flat-woven drawstrings.",
  },
  {
    id: "fabric",
    label: "Cotton Fabric",
    position: [-0.9, -0.4, 0.85],
    title: "100% Premium Cotton Corduroy",
    description:
      "Soft, breathable, durable corduroy woven for all-day comfort and a refined, textured finish.",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Daniel R.",
    location: "Austin, TX",
    rating: 5,
    quote: "Best shorts I've ever owned.",
    verified: true,
  },
  {
    id: "r2",
    name: "Mia K.",
    location: "London, UK",
    rating: 5,
    quote: "The hidden pocket is incredibly useful.",
    verified: true,
  },
  {
    id: "r3",
    name: "Julian P.",
    location: "Lisbon, PT",
    rating: 5,
    quote: "Perfect for traveling.",
    verified: true,
  },
  {
    id: "r4",
    name: "Sofia A.",
    location: "Milan, IT",
    rating: 5,
    quote: "Luxury quality.",
    verified: true,
  },
  {
    id: "r5",
    name: "Marcus T.",
    location: "Sydney, AU",
    rating: 5,
    quote: "Buying another pair.",
    verified: true,
  },
];

export const FAQS: FaqItem[] = [
  {
    question: "Where is the hidden pocket?",
    answer:
      "It's concealed on the interior of the waistband, secured with a durable zipper. It's completely invisible from the outside.",
  },
  {
    question: "How much fits inside?",
    answer:
      "Comfortably fits a phone, wallet, passport, cash, keys, cards, or earbuds — everything you need to leave your bag at home.",
  },
  {
    question: "Are they machine washable?",
    answer:
      "Yes. Machine wash cold with like colors and tumble dry low to preserve the corduroy texture.",
  },
  {
    question: "Do they fit true to size?",
    answer:
      "Yes, they fit true to size with a relaxed cut. Check our size guide if you're between sizes — we recommend sizing up for a roomier fit.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days domestically and 7-14 business days internationally.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer free returns within 30 days of delivery for unworn items with tags attached.",
  },
];

export const STATS: StatItem[] = [
  { value: 98, suffix: "%", label: "Customer Satisfaction" },
  { value: 95, suffix: "%", label: "Repeat Customers" },
  { value: 100, suffix: "%", label: "Premium Cotton" },
  { value: 50000, suffix: "+", label: "Happy Customers" },
];

export const FEATURES = [
  {
    title: "Hidden Interior Zip Pocket",
    description:
      "Keep your valuables protected with a discreet interior zipper pocket designed for everyday security.",
  },
  {
    title: "100% Premium Cotton Corduroy",
    description: "Soft, breathable, durable, and crafted for all-day comfort.",
  },
  {
    title: "Relaxed Comfort Fit",
    description:
      "Designed with an elastic waistband and adjustable drawstrings for the perfect fit.",
  },
  {
    title: "Premium Craftsmanship",
    description:
      "Built with reinforced stitching and quality materials made to last.",
  },
];
