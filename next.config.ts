import type { NextConfig } from "next";
import { createClient } from "@sanity/client";

const isProduction = process.env.VERCEL_ENV === "production" || process.env.SITE_ENV === "production";

/**
 * Redirects edited in the Studio ("Redirects"), read once per build: a Sanity webhook on
 * redirect publish triggers a Vercel deploy hook. A failed fetch fails the build rather than
 * shipping without the redirects.
 */
async function sanityRedirects() {
  const client = createClient({ projectId: "ce31dig5", dataset: "production", apiVersion: "2026-09-29", useCdn: false });
  const rows = await client.fetch<{ source: string; destination: string; permanent: boolean | null }[]>(
    `*[_type == "redirect" && defined(source) && defined(destination)]{ source, destination, permanent }`,
  );
  return rows.map(({ source, destination, permanent }) => ({ source, destination, permanent: permanent !== false }));
}

const nextConfig: NextConfig = {
  images: {
    // Images uploaded to the TechFlow CMS Sanity project. `search` is left out so the
    // image-url builder's query string (?w=…&auto=format) is allowed.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/ce31dig5/**" }],
    // Next's defaults plus 192: small mockups (e.g. the /design hero phone, ~85 px wide on phones) got 256 px files.
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384],
  },
  experimental: {
    // Tailwind CSS is small: inlined in the HTML, it no longer blocks the first paint on slow phones.
    inlineCss: true,
  },
  redirects: sanityRedirects,
  async headers() {
    // Previews and branch deployments must never be indexed (robots.txt disallows them too).
    return isProduction ? [] : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
