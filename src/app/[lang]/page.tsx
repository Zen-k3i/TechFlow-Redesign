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
import { hasLocale, localePath } from "@/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    alternates: {
      canonical: localePath(lang),
      languages: { fr: localePath("fr"), en: localePath("en"), "x-default": localePath("fr") },
    },
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <Providers lang={lang}>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Industries />
        <Manifesto />
        <Services />
        <Work />
        <Convictions />
        <Process />
        <Testimonials />
        <Brief />
        <Faq />
      </main>
      <Footer />
    </Providers>
  );
}
