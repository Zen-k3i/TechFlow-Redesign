import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalDocs } from "@/components/legal/data";
import { LegalPage } from "@/components/legal/legal-page";
import { PageShell } from "@/components/page/shell";
import { hasLocale } from "@/i18n/config";
import { staticPageMetadata } from "@/sanity/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/mentions-legales">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return staticPageMetadata(lang, "legal", legalDocs.legal[lang].meta);
}

export default async function Legal({ params }: PageProps<"/[lang]/mentions-legales">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <PageShell lang={lang} current="legal">
      <LegalPage doc="legal" />
    </PageShell>
  );
}
