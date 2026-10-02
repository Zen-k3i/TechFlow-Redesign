/**
 * True only on the production deployment (Vercel sets VERCEL_ENV), or when SITE_ENV=production
 * is set for hosting outside Vercel. Previews, branches and local builds stay out of search engines.
 */
export const isProduction = process.env.VERCEL_ENV === "production" || process.env.SITE_ENV === "production";
