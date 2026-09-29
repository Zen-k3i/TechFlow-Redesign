import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page/shell";
import { ToolPage } from "@/components/tools/tool-page";
import { hasLocale } from "@/i18n/config";
import { client } from "@/sanity/client";
import { getTool, isSlug, redirectToTranslation } from "@/sanity/fetch";
import { cmsAlternates } from "@/sanity/metadata";
import { TOOL_SLUGS_QUERY } from "@/sanity/queries";

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const slugs = await client.withConfig({ useCdn: false }).fetch(TOOL_SLUGS_QUERY, { lang: params.lang });
  return slugs.flatMap((slug) => (slug ? [{ slug }] : []));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/outils/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) return {};
  const tool = await getTool(lang, slug);
  if (!tool) return {};
  return {
    title: tool.seo?.title ?? `${tool.title} | TechFlow Agency`,
    description: tool.seo?.description ?? tool.intro ?? undefined,
    alternates: cmsAlternates("tools", lang, slug, tool.translations),
  };
}

export default async function Tool({ params }: PageProps<"/[lang]/outils/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) notFound();
  const tool = await getTool(lang, slug);
  if (!tool) {
    await redirectToTranslation("tool", lang, slug);
    notFound();
  }

  return (
    <PageShell lang={lang} current="tools">
      <ToolPage tool={tool} />
    </PageShell>
  );
}
