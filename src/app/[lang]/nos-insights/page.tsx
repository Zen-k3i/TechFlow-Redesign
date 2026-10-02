import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { insightsContent } from "@/components/insights/data";
import { InsightsPage } from "@/components/insights/insights-page";
import { PageShell } from "@/components/page/shell";
import { hasLocale } from "@/i18n/config";
import { staticPageMetadata } from "@/sanity/seo";
import { sanityFetch } from "@/sanity/client";
import { CATEGORIES_QUERY, INSIGHTS_INDEX_QUERY } from "@/sanity/queries";

export async function generateMetadata({ params }: PageProps<"/[lang]/nos-insights">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return staticPageMetadata(lang, "insights", insightsContent[lang].meta);
}

export default async function Insights({ params }: PageProps<"/[lang]/nos-insights">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [articles, categoryList] = await Promise.all([
    sanityFetch(INSIGHTS_INDEX_QUERY, { lang }),
    sanityFetch(CATEGORIES_QUERY, { lang }),
  ]);

  return (
    <PageShell lang={lang} current="insights">
      <InsightsPage articles={articles} categoryList={categoryList.flatMap((name) => (name ? [name] : []))} />
    </PageShell>
  );
}
