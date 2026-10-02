import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page/shell";
import { ToolPage } from "@/components/tools/tool-page";
import { hasLocale } from "@/i18n/config";
import { client } from "@/sanity/client";
import { getTool, isSlug, redirectToTranslation } from "@/sanity/fetch";
import { href } from "@/i18n/routes";
import { translationLinks } from "@/sanity/metadata";
import { buildMetadata } from "@/sanity/seo";
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
  return buildMetadata({
    lang,
    path: href(lang, "tools", slug),
    languages: translationLinks("tools", lang, slug, tool.translations),
    seo: tool.seo,
    title: lang === "fr" ? `Pourquoi nous utilisons ${tool.title}` : `Why we use ${tool.title}`,
    description: tool.intro,
  });
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
    <PageShell lang={lang} current="tools" alternates={translationLinks("tools", lang, slug, tool.translations)} breadcrumb={{ name: tool.title ?? slug, slug }}>
      <ToolPage tool={tool} />
    </PageShell>
  );
}
