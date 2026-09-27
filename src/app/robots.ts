import type { MetadataRoute } from "next";
import { siteUrl } from "@/i18n/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/hero-test" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
