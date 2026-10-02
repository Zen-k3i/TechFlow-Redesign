import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Brief } from "@/components/site/brief";
import { Convictions } from "@/components/site/convictions";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Industries } from "@/components/site/industries";
import { Manifesto } from "@/components/site/manifesto";
import { Navbar } from "@/components/site/navbar";
import { Process } from "@/components/site/process";
import { Providers } from "@/components/site/providers";
import { Services } from "@/components/site/services";
import { Testimonials } from "@/components/site/testimonials";
import { Trust } from "@/components/site/trust";
import { Work } from "@/components/site/work";
import { PortraitStrip } from "@/components/team/portrait-strip";
import { hasLocale } from "@/i18n/config";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { sanityFetch } from "@/sanity/client";
import { FAQ_QUERY, PROJECTS_INDEX_QUERY, SECTORS_QUERY, TEAM_QUERY } from "@/sanity/queries";
import { getSiteSettings, staticPageMetadata } from "@/sanity/seo";
import { JsonLd, organizationJsonLd } from "@/components/seo/json-ld";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return staticPageMetadata(lang, "home", (lang === "en" ? en : fr).meta);
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [members, faq, sectorList, cmsProjects, settings] = await Promise.all([
    sanityFetch(TEAM_QUERY),
    sanityFetch(FAQ_QUERY, { page: "home", lang }),
    sanityFetch(SECTORS_QUERY, { lang }),
    sanityFetch(PROJECTS_INDEX_QUERY, { lang }),
    getSiteSettings(),
  ]);

  return (
    <Providers lang={lang}>
      <JsonLd data={organizationJsonLd(settings, lang)} />
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Industries />
        <Manifesto />
        {/* Why we work this way (Manifesto), who does the work, then what we do (Services). */}
        <PortraitStrip members={members} className="pt-28 md:pt-36" />
        <Services />
        <Work sectorList={sectorList.flatMap((name) => (name ? [name] : []))} cmsProjects={cmsProjects} />
        <Convictions />
        <Process />
        <Testimonials />
        <Brief />
        <Faq faq={faq} />
      </main>
      <Footer />
    </Providers>
  );
}
