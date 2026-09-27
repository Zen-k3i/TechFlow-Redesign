import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page/shell";
import { teamContent } from "@/components/team/data";
import { TeamPage } from "@/components/team/team-page";
import { hasLocale } from "@/i18n/config";
import { pageMetadata } from "@/i18n/routes";

export async function generateMetadata({ params }: PageProps<"/[lang]/notre-equipe">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "team", teamContent[lang].meta);
}

export default async function Team({ params }: PageProps<"/[lang]/notre-equipe">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <PageShell lang={lang} current="team">
      <TeamPage />
    </PageShell>
  );
}
