import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images uploaded to the TechFlow CMS Sanity project. `search` is left out so the
    // image-url builder's query string (?w=…&auto=format) is allowed.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/ce31dig5/**" }],
  },
  async headers() {
    // Staging and preview deployments are never indexed, whatever the page says.
    if (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production") return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  async redirects() {
    // Case study slugs that changed when the projects moved to the CMS.
    const renamed = { "epargne-plurielle": "epargne-plurielle-avenir", "district-6": "district-6-publishing" };
    return Object.entries(renamed).flatMap(([from, to]) => [
      { source: `/projets/${from}`, destination: `/projets/${to}`, permanent: true },
      { source: `/en/projects/${from}`, destination: `/en/projects/${to}`, permanent: true },
    ]);
  },
};

export default nextConfig;
