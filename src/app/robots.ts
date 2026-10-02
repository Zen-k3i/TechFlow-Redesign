import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/routes";

export default function robots(): MetadataRoute.Robots {
  // Staging and preview deployments (staging.techflow-agency.com, *.vercel.app) must never be indexed.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/hero-test" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
