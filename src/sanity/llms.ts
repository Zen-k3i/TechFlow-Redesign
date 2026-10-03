import { defineQuery } from "next-sanity";
import { absoluteUrl, href } from "@/i18n/routes";
import { sanityFetch } from "./client";

/**
 * llms.txt (llmstxt.org): the plain-markdown map of the site for LLM crawlers, built from Sanity on
 * each request (cached like the pages), so new articles and case studies appear without anyone
 * uploading a file. Same layout as the SEO harness's own build (build-llms-txt.py): services, then
 * articles by language, newest first; llms-full.txt adds each article's full text.
 */
export const LLMS_QUERY = defineQuery(`{
  "insights": *[_type == "insight" && defined(slug.current)] | order(publishedAt desc) {
    language, title, "slug": slug.current, excerpt, publishedAt, "text": pt::text(body)
  },
  "projects": *[_type in ["project", "growthCaseStudy"] && defined(slug.current)] | order(coalesce(order, 999) asc) {
    language, title, "slug": slug.current, summary
  }
}`);

const SERVICES: [path: string, text: string, fr?: string][] = [
  ["/", "French homepage, main entry point."],
  ["/en", "English homepage for Cambodian and international clients, same discovery-call CTA."],
  ["/en/design", "Branding, UX/UI and marketing collateral offer.", "/design"],
  ["/en/development", "Web and platform development offer.", "/developpement"],
  ["/en/ai-agents", "AI agents and workflow automation offer.", "/agents-ia"],
  ["/en/sales-funnel", "Integrated growth system offer.", "/tunnel-de-vente"],
  ["/en/projects", "Portfolio, proof of work pushing toward a booked call.", "/projets"],
  ["/en/contact", "Quote request form, secondary conversion.", "/contact"],
  ["/en/tools", "Hub listing the agency's stack, one page per tool.", "/outils"],
];

const line = (s: string | null | undefined) => (s ?? "").replace(/\s+/g, " ").trim();

export async function buildLlmsTxt({ full = false } = {}) {
  const { insights, projects } = await sanityFetch(LLMS_QUERY);
  const out: string[] = [
    "# TechFlow Agency",
    "",
    "> Digital agency in Phnom Penh, Cambodia, with an office in Paris: branding and UX/UI, web development (Webflow, no-code, custom), AI agents and automation, sales funnels. Serves Cambodian and international SMEs, in English and French.",
    "",
    "## Services",
    "",
    ...SERVICES.map(([path, text, fr]) => `- [${path}](${absoluteUrl(path)}): ${text}${fr ? ` French version: ${absoluteUrl(fr)}` : ""}`),
    "",
  ];

  for (const [lang, label] of [["en", "English"], ["fr", "French"]] as const) {
    const list = projects.filter((p) => p.language === lang && p.slug);
    if (!list.length) continue;
    out.push(`## Case studies (${label})`, "");
    for (const p of list) out.push(`- [${line(p.title)}](${absoluteUrl(href(lang, "projects", p.slug!))}): ${line(p.summary)}`);
    out.push("");
  }

  for (const [lang, label] of [["fr", "French"], ["en", "English"]] as const) {
    const list = insights.filter((i) => i.language === lang && i.slug);
    if (!list.length) continue;
    out.push(`## Insights (${label})`, "");
    for (const i of list) out.push(`- [${line(i.title)}](${absoluteUrl(href(lang, "insights", i.slug!))}): ${line(i.excerpt)}`);
    out.push("");
  }

  if (full) {
    out.push("## Articles, full text", "");
    for (const i of insights.filter((x) => x.slug)) {
      const lang = i.language === "en" ? "en" : "fr";
      out.push(`### ${line(i.title)}`, "", `URL: ${absoluteUrl(href(lang, "insights", i.slug!))}`);
      if (i.publishedAt) out.push(`Published: ${i.publishedAt}`);
      out.push("", (i.text ?? "").trim(), "");
    }
  }
  return out.join("\n");
}

export const llmsResponse = (body: string) =>
  new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
