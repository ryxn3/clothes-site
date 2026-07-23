import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/shop",
    ...PRODUCTS.map((p) => `/products/${p.slug}`),
    "/privacy",
    "/shipping",
    "/returns",
    "/terms",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.5,
  }));
}
