"use client";

import Image from "next/image";
import Link from "next/link";
import { href } from "@/i18n/routes";
import { ServiceCards } from "../page/service-cards";
import { BrowserFrame, PageHero } from "../page/ui";
import { projectImage } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn } from "../site/reveal";
import { articles, insightsContent, readingMinutes, type Article } from "./data";

export const formatDate = (iso: string, lang: string) =>
  new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", { day: "2-digit", month: "long", year: "numeric" });

function Meta({ article, light = false }: { article: Article; light?: boolean }) {
  const { lang } = useLocale();
  const c = insightsContent[lang];
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-sm ${light ? "text-ink/50" : "text-white/50"}`}>
      <span className={`rounded-full px-3 py-1 ${light ? "bg-brand-deep/10 text-brand-deep" : "bg-brand-sky/15 text-brand-sky"}`}>
        {article.category[lang]}
      </span>
      <time dateTime={article.date}>{formatDate(article.date, lang)}</time>
      <span aria-hidden>·</span>
      <span>
        {readingMinutes(article)} {c.minutes}
      </span>
      {c.frenchOnly && (
        <span className={`rounded-full border px-3 py-1 ${light ? "border-ink/15" : "border-white/15"}`}>🇫🇷 {c.frenchOnly}</span>
      )}
    </p>
  );
}

export function ArticleCard({ article, light = true, wide = false }: { article: Article; light?: boolean; wide?: boolean }) {
  const { lang, t } = useLocale();
  return (
    <Link href={href(lang, "insights", article.slug)} data-cursor={t.common.readMore} className={`group block ${wide ? "md:grid md:grid-cols-2 md:items-center md:gap-12" : ""}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-night-soft">
        <Image
          src={projectImage(article.cover)}
          alt=""
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className={wide ? "mt-6 md:mt-0" : "mt-6"}>
        <Meta article={article} light={light} />
        <h3 className={`mt-4 font-serif text-3xl leading-[1.05] transition-colors md:text-4xl ${light ? "group-hover:text-brand-deep" : "group-hover:text-brand-sky"}`}>
          {article.title[lang]}
        </h3>
        <p className={`mt-3 max-w-xl ${light ? "text-ink/60" : "text-white/55"}`}>{article.excerpt[lang]}</p>
      </div>
    </Link>
  );
}

export function InsightsPage() {
  const { lang, t } = useLocale();
  const c = insightsContent[lang];
  const [latest, ...rest] = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero badge={c.badge} title={c.title} intro={c.intro} crumbs={[{ label: t.nav.pages.insights, href: href(lang, "insights") }]} />

      <section className="bg-night px-5 pb-28 text-white md:px-10">
        <FadeIn className="mx-auto max-w-7xl">
          <p className="eyebrow text-white/40">{c.latest}</p>
          <Link
            href={href(lang, "insights", latest.slug)}
            data-cursor={t.common.readMore}
            className="group mt-6 grid gap-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          >
            <BrowserFrame src={projectImage(latest.cover)} alt="" url={latest.coverUrl} preload className="aspect-[16/10]" />
            <div className="lg:pr-6">
              <Meta article={latest} />
              <h2 className="mt-5 font-serif text-4xl leading-[1.02] md:text-6xl">{latest.title[lang]}</h2>
              <p className="mt-5 text-lg text-white/60">{latest.excerpt[lang]}</p>
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

      {rest.length > 0 && (
        <section className="bg-night px-5 md:px-10">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-paper px-6 py-20 text-ink md:rounded-[3.5rem] md:px-16 md:py-24">
            <p className="eyebrow text-brand-deep">{c.all}</p>
            <div className={`mt-12 grid gap-16 ${rest.length > 1 ? "md:grid-cols-2" : ""}`}>
              {rest.map((a, i) => (
                <FadeIn key={a.slug} delay={i * 0.08}>
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
