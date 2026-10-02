import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page/shell";
import { toolsContent } from "@/components/tools/data";
import { ToolsPage } from "@/components/tools/tools-page";
import { hasLocale } from "@/i18n/config";
import { staticPageMetadata } from "@/sanity/seo";
import { sanityFetch } from "@/sanity/client";
import { TOOLS_INDEX_QUERY } from "@/sanity/queries";

export async function generateMetadata({ params }: PageProps<"/[lang]/outils">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return staticPageMetadata(lang, "tools", toolsContent[lang].meta);
}

export default async function Tools({ params }: PageProps<"/[lang]/outils">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const tools = await sanityFetch(TOOLS_INDEX_QUERY, { lang });

  return (
    <PageShell lang={lang} current="tools">
      <ToolsPage tools={tools} />
    </PageShell>
  );
}
