export type ColorId =
  | "black"
  | "white"
  | "beige"
  | "pink"
  | "orange"
  | "navy"
  | "royal";

export interface ProductColor {
  id: ColorId;
  name: string;
  hex: string;
  /** Secondary tone used for shading/gradients in illustrations */
  shadeHex: string;
}

export type SizeId = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface SizeGuideRow {
  size: SizeId;
  waist: string;
  hip: string;
  inseam: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Hotspot {
  id: "pocket" | "waist" | "drawstrings" | "fabric";
  label: string;
  position: [number, number, number];
  title: string;
  description: string;
}

export interface CartLine {
  id: string;
  color: ColorId;
  size: SizeId;
  quantity: number;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}
