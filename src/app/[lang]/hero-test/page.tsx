import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/site/hero";
import { Navbar } from "@/components/site/navbar";
import { Providers } from "@/components/site/providers";
import { Trust } from "@/components/site/trust";
import { hasLocale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Hero test",
  robots: { index: false, follow: false },
};

export default async function HeroTest({ params }: PageProps<"/[lang]/hero-test">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <Providers lang={lang}>
      <Navbar />
      <main>
        <Hero stacked />
        <Trust />
      </main>
    </Providers>
  );
}
