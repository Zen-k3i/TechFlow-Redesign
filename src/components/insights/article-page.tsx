"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { href } from "@/i18n/routes";
import { BrowserFrame, HumanActions } from "../page/ui";
import { ease, projectImage } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { BlockView, slugify, Toc } from "../page/blocks";
import { articles, insightsContent, readingMinutes, type Article } from "./data";
import { ArticleCard, formatDate } from "./insights-page";

export function ArticlePage({ article }: { article: Article }) {
  const { lang, t } = useLocale();
  const c = insightsContent[lang];
  const [intro, ...body] = article.body;
  const headings = article.body.flatMap((b) => (b.type === "h2" ? [b.text] : []));
  const related = articles.filter((a) => a.slug !== article.slug);

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
            <span aria-hidden>/</span>
            <span aria-current="page" className="text-white/70">
              {article.category[lang]}
            </span>
          </motion.nav>
          <RevealHeading as="h1" text={article.title.fr} className="mt-8 font-serif text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.02em]" />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/55"
          >
            <span className="rounded-full bg-brand-sky/15 px-3 py-1 text-brand-sky">{article.category[lang]}</span>
            <time dateTime={article.date}>{formatDate(article.date, "fr")}</time>
            <span aria-hidden>·</span>
            <span>
              {readingMinutes(article)} {c.minutes}
            </span>
            <span aria-hidden>·</span>
            <span>{c.by}</span>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <BrowserFrame src={projectImage(article.cover)} alt="" url={article.coverUrl} preload sizes="(min-width: 1152px) 1152px, 100vw" className="aspect-[16/8]" />
        </motion.div>
      </section>

      <section className="bg-night px-5 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-paper px-6 py-16 text-ink md:rounded-[3.5rem] md:px-16 md:py-24">
          <div className="grid gap-14 lg:grid-cols-[260px_1fr] xl:gap-24">
            <aside className="hidden lg:block">
              <Toc label={c.toc} items={headings.map((title) => ({ id: slugify(title), title }))} />
            </aside>

            <article lang="fr" className="max-w-3xl">
              {intro.type === "p" && <p className="font-serif text-2xl leading-snug md:text-3xl">{intro.text}</p>}
              <div className="mt-16">
                {body.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </div>

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

      <section className="bg-night px-5 py-28 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-5xl md:text-6xl">{c.related}</h2>
            <Link href={href(lang, "insights")} className="text-white/60 underline-offset-4 hover:text-white hover:underline">
              ← {c.back}
            </Link>
          </div>
          <div className={`mt-12 grid gap-16 ${related.length > 1 ? "md:grid-cols-2" : ""}`}>
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} light={false} wide={related.length === 1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
