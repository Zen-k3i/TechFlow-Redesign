import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { insightsContent } from "@/components/insights/data";
import { InsightsPage } from "@/components/insights/insights-page";
import { PageShell } from "@/components/page/shell";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/routes";
import { sanityFetch } from "@/sanity/client";
import { INSIGHTS_INDEX_QUERY } from "@/sanity/queries";

export async function generateMetadata({ params }: PageProps<"/[lang]/nos-insights">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "insights", insightsContent[lang].meta);
}

export default async function Insights({ params }: PageProps<"/[lang]/nos-insights">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const articles = await sanityFetch(INSIGHTS_INDEX_QUERY, { lang });

  return (
    <PageShell lang={lang} current="insights">
      <InsightsPage articles={articles} />
    </PageShell>
  );
}
