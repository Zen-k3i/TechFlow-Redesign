import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalDocs } from "@/components/legal/data";
import { LegalPage } from "@/components/legal/legal-page";
import { PageShell } from "@/components/page/shell";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/conditions-generales">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "terms", legalDocs.terms[lang].meta);
}

export default async function Terms({ params }: PageProps<"/[lang]/conditions-generales">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <PageShell lang={lang} current="terms">
      <LegalPage doc="terms" />
    </PageShell>
  );
}
