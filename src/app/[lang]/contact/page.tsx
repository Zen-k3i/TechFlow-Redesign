import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactPage } from "@/components/contact/contact-page";
import { contactContent } from "@/components/contact/data";
import { PageShell } from "@/components/page/shell";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "contact", contactContent[lang].meta);
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <PageShell lang={lang} current="contact">
      <ContactPage />
    </PageShell>
  );
}
