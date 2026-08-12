import type { MetadataRoute } from "next";

/** M13 — robots.txt (App Router : app/robots.ts). */
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://guy-fleury-irankunda.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}