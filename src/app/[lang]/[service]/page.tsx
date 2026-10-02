import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page/shell";
import { serviceContent, serviceFromSlug } from "@/components/services/data";
import { ServicePage } from "@/components/services/service-page";
import { hasLocale } from "@/i18n/config";
import { routes, serviceKeys } from "@/i18n/routes";
import { staticPageMetadata } from "@/sanity/seo";
import { sanityFetch } from "@/sanity/client";
import { FAQ_QUERY, PROJECTS_INDEX_QUERY } from "@/sanity/queries";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceKeys.map((key) => ({ service: routes[key].fr.slice(1) }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[service]">): Promise<Metadata> {
  const { lang, service } = await params;
  const key = serviceFromSlug(service);
  if (!hasLocale(lang) || !key) return {};
  return staticPageMetadata(lang, key, serviceContent[lang][key].meta);
}

export default async function Service({ params }: PageProps<"/[lang]/[service]">) {
  const { lang, service } = await params;
  const key = serviceFromSlug(service);
  if (!hasLocale(lang) || !key) notFound();
  const [faq, cmsProjects] = await Promise.all([
    sanityFetch(FAQ_QUERY, { page: key, lang }),
    sanityFetch(PROJECTS_INDEX_QUERY, { lang }),
  ]);

  return (
    <PageShell lang={lang} current={key}>
      <ServicePage service={key} faq={faq} cmsProjects={cmsProjects} />
    </PageShell>
  );
}
