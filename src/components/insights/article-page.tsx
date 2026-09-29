"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { href } from "@/i18n/routes";
import { sanityLoader, urlFor } from "@/sanity/image";
import { headingsOf, PortableBody } from "../cms/portable-body";
import { BrowserFrame, HumanActions } from "../page/ui";
import { Toc } from "../page/blocks";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { insightsContent, type InsightDetail } from "./data";
import { ArticleCard, formatDate } from "./insights-page";

export function ArticlePage({ article }: { article: InsightDetail }) {
  const { lang, t } = useLocale();
  const c = insightsContent[lang];
  const headings = headingsOf(article.body);
  const category = article.categories?.[0];

  return (
    <>
      <section id="top" className="grain relative overflow-hidden bg-night px-5 pb-16 pt-32 text-white md:px-10 md:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_85%_10%,rgba(71,102,255,0.28),transparent_70%)]" />
        <div className="relative mx-auto max-w-5xl">
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow flex flex-wrap items-center gap-2 text-white/40"
          >
            <Link href={href(lang, "home")} className="hover:text-white">
              {t.common.breadcrumbHome}
            </Link>
            <span aria-hidden>/</span>
            <Link href={href(lang, "insights")} className="hover:text-white">
              {t.nav.pages.insights}
            </Link>
            {category && (
              <>
                <span aria-hidden>/</span>
                <span aria-current="page" className="text-white/70">
                  {category}
                </span>
              </>
            )}
          </motion.nav>
          <RevealHeading as="h1" text={article.title ?? ""} className="mt-8 font-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]" />
          {article.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-6 max-w-3xl text-lg text-white/65 md:text-xl"
            >
              {article.excerpt}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/55"
          >
            {article.categories?.map((cat) => (
              <span key={cat} className="rounded-full bg-brand-sky/15 px-3 py-1 text-brand-sky">
                {cat}
              </span>
            ))}
            {article.publishedAt && <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>}
            <span aria-hidden>·</span>
            <span>
              {Math.max(1, article.minutes)} {c.minutes}
            </span>
            <span aria-hidden>·</span>
            <span>
              {c.by} {article.author ?? "TechFlow Agency"}
            </span>
          </motion.div>
        </div>
        {article.coverImage?.asset && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
            className="relative mx-auto mt-16 max-w-6xl"
          >
            <BrowserFrame
              src={urlFor(article.coverImage).width(2000).url()}
              alt={article.coverImage.alt ?? ""}
              loader={sanityLoader}
              url={`techflow-agency.com${href(lang, "insights", article.slug ?? "")}`}
              preload
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="aspect-[16/8]"
            />
          </motion.div>
        )}
      </section>

      <section className="bg-night px-5 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-paper px-6 py-16 text-ink md:rounded-[3.5rem] md:px-16 md:py-24">
          <div className="grid gap-14 lg:grid-cols-[260px_1fr] xl:gap-24">
            <aside className="hidden lg:block">{headings.length > 0 && <Toc label={c.toc} items={headings} />}</aside>

            <article lang={lang} className="max-w-3xl">
              <PortableBody value={article.body} />

              <FadeIn className="mt-20 overflow-hidden rounded-[2rem] bg-night p-8 text-white md:p-12">
                <RevealHeading text={t.common.cta.heading} accentClassName="italic text-brand-sky" className="font-serif text-4xl leading-[1.02] md:text-5xl" />
                <p className="mt-4 max-w-lg text-white/60">{t.common.cta.text}</p>
                <div className="mt-8">
                  <HumanActions />
                </div>
              </FadeIn>
            </article>
          </div>
        </div>
      </section>

      {article.related.length > 0 && (
        <section className="bg-night px-5 py-28 text-white md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-serif text-5xl md:text-6xl">{c.related}</h2>
              <Link href={href(lang, "insights")} className="text-white/60 underline-offset-4 hover:text-white hover:underline">
                ← {c.back}
              </Link>
            </div>
            <div className={`mt-12 grid gap-16 ${article.related.length > 1 ? "md:grid-cols-2" : ""}`}>
              {article.related.map((a) => (
                <ArticleCard key={a._id} article={a} light={false} wide={article.related.length === 1} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
