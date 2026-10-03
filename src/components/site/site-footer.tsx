import type { Locale } from "@/i18n/config";
import { sanityFetch } from "@/sanity/client";
import { FOOTER_TOOLS_QUERY } from "@/sanity/queries";
import { Footer } from "./footer";

/** The footer with its list of tool pages, read from Sanity on the server. */
export async function SiteFooter({ lang, cta = true }: { lang: Locale; cta?: boolean }) {
  const tools = await sanityFetch(FOOTER_TOOLS_QUERY, { lang });
  return <Footer cta={cta} tools={tools.flatMap((t) => (t.title && t.slug ? [{ title: t.title, slug: t.slug }] : []))} />;
}
