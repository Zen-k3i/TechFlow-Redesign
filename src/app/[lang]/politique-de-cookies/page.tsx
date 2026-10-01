import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalDocs } from "@/components/legal/data";
import { LegalPage } from "@/components/legal/legal-page";
import { PageShell } from "@/components/page/shell";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/politique-de-cookies">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "cookies", legalDocs.cookies[lang].meta);
}

export default async function Cookies({ params }: PageProps<"/[lang]/politique-de-cookies">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <PageShell lang={lang} current="cookies">
      <LegalPage doc="cookies" />
    </PageShell>
  );
}
