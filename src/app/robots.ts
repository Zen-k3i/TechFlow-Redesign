import type { MetadataRoute } from "next";
import { isProduction } from "@/i18n/env";
import { siteUrl } from "@/i18n/routes";

/** Production is open to crawlers; Vercel previews and local builds are closed (they also send X-Robots-Tag: noindex). */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/studio"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
