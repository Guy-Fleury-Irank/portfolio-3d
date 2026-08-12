import type { MetadataRoute } from "next";

/** M13 — sitemap statique des 4 routes (App Router : app/sitemap.ts). */
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  "https://guy-fleury-irankunda.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/travail", "/art", "/argent"];
  return routes.map((r) => ({
    url: `${BASE_URL}${r}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}