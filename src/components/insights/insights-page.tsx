"use client";

import Link from "next/link";
import { href } from "@/i18n/routes";
import { sanityLoader, urlFor } from "@/sanity/image";
import { SanityImage } from "../cms/sanity-image";
import { ServiceCards } from "../page/service-cards";
import { BrowserFrame, PageHero } from "../page/ui";
import { useLocale } from "../site/locale";
import { FadeIn } from "../site/reveal";
import { insightsContent, type InsightCard } from "./data";

export const formatDate = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    // Fixed zone so the server render and the browser agree on the day.
    timeZone: "Europe/Paris",
  });

function Meta({ article, light = false }: { article: InsightCard; light?: boolean }) {
  const { lang } = useLocale();
  const c = insightsContent[lang];
  const category = article.categories?.[0];
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-sm ${light ? "text-ink/50" : "text-white/50"}`}>
      {category && (
        <span className={`rounded-full px-3 py-1 ${light ? "bg-brand-deep/10 text-brand-deep" : "bg-brand-sky/15 text-brand-sky"}`}>{category}</span>
      )}
      {article.publishedAt && <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>}
      <span aria-hidden>·</span>
      <span>
        {Math.max(1, article.minutes)} {c.minutes}
      </span>
    </p>
  );
}

export function ArticleCard({ article, light = true, wide = false }: { article: InsightCard; light?: boolean; wide?: boolean }) {
  const { lang, t } = useLocale();
  return (
    <Link href={href(lang, "insights", article.slug ?? "")} data-cursor={t.common.readMore} className={`group block ${wide ? "md:grid md:grid-cols-2 md:items-center md:gap-12" : ""}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-night-soft">
        <SanityImage
          image={article.coverImage}
          alt=""
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className={wide ? "mt-6 md:mt-0" : "mt-6"}>
        <Meta article={article} light={light} />
        <h3 className={`mt-4 font-serif text-3xl leading-[1.05] transition-colors md:text-4xl ${light ? "group-hover:text-brand-deep" : "group-hover:text-brand-sky"}`}>
          {article.title}
        </h3>
        <p className={`mt-3 max-w-xl ${light ? "text-ink/60" : "text-white/55"}`}>{article.excerpt}</p>
      </div>
    </Link>
  );
}

export function InsightsPage({ articles }: { articles: InsightCard[] }) {
  const { lang, t } = useLocale();
  const c = insightsContent[lang];
  const [latest, ...rest] = articles;

  return (
    <>
      <PageHero badge={c.badge} title={c.title} intro={c.intro} crumbs={[{ label: t.nav.pages.insights, href: href(lang, "insights") }]} />

      {latest && (
        <section className="bg-night px-5 pb-28 text-white md:px-10">
          <FadeIn className="mx-auto max-w-7xl">
            <p className="eyebrow text-white/40">{c.latest}</p>
            <Link
              href={href(lang, "insights", latest.slug ?? "")}
              data-cursor={t.common.readMore}
              className="group mt-6 grid gap-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
            >
              {latest.coverImage?.asset && (
                <BrowserFrame
                  src={urlFor(latest.coverImage).width(1600).url()}
                  alt={latest.coverImage.alt ?? ""}
                  loader={sanityLoader}
                  url={`techflow-agency.com${href(lang, "insights", latest.slug ?? "")}`}
                  preload
                  className="aspect-[16/10]"
                />
              )}
              <div className="lg:pr-6">
                <Meta article={latest} />
                <h2 className="mt-5 font-serif text-4xl leading-[1.02] md:text-6xl">{latest.title}</h2>
                <p className="mt-5 text-lg text-white/60">{latest.excerpt}</p>
                <span className="mt-8 inline-flex items-center gap-3 font-medium">
                  {t.common.readMore}
                  <span className="flex size-10 items-center justify-center rounded-full bg-white text-night transition-transform duration-300 group-hover:-rotate-45">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </FadeIn>
        </section>
      )}

      {rest.length > 0 && (
        <section className="bg-night px-5 md:px-10">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-paper px-6 py-20 text-ink md:rounded-[3.5rem] md:px-16 md:py-24">
            <p className="eyebrow text-brand-deep">{c.all}</p>
            <div className={`mt-12 grid gap-16 ${rest.length > 1 ? "md:grid-cols-2" : ""}`}>
              {rest.map((a, i) => (
                <FadeIn key={a._id} delay={(i % 2) * 0.08}>
                  <ArticleCard article={a} wide={rest.length === 1} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <ServiceCards eyebrow={c.services.eyebrow} heading={c.services.heading} />
    </>
  );
}
