import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page/shell";
import { servicesHub } from "@/components/services/hub-data";
import { ServicesHub } from "@/components/services/services-hub";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "services", servicesHub[lang].meta);
}

export default async function Services({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <PageShell lang={lang} current="services">
      <ServicesHub />
    </PageShell>
  );
}
