import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page/shell";
import { teamContent } from "@/components/team/data";
import { TeamPage } from "@/components/team/team-page";
import { Testimonials } from "@/components/site/testimonials";
import { hasLocale } from "@/i18n/config";
import { staticPageMetadata } from "@/sanity/seo";
import { sanityFetch } from "@/sanity/client";
import { TEAM_QUERY } from "@/sanity/queries";

export async function generateMetadata({ params }: PageProps<"/[lang]/notre-equipe">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return staticPageMetadata(lang, "team", teamContent[lang].meta);
}

export default async function Team({ params }: PageProps<"/[lang]/notre-equipe">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const members = await sanityFetch(TEAM_QUERY);

  return (
    <PageShell lang={lang} current="team">
      <TeamPage members={members} testimonials={<Testimonials />} />
    </PageShell>
  );
}
