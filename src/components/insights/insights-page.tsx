"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { LayoutGroup } from "motion/react";
import { href } from "@/i18n/routes";
import { SanityImage } from "../cms/sanity-image";
import { ServiceCards } from "../page/service-cards";
import { PageHero } from "../page/ui";
import { useLocale } from "../site/locale";
import { FadeIn } from "../site/reveal";
import { FilterChip } from "../page/filter-chip";
import { filterOptions } from "../page/filters";
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
  const { lang } = useLocale();
  return (
    <Link href={href(lang, "insights", article.slug ?? "")} className={`group block ${wide ? "md:grid md:grid-cols-2 md:items-center md:gap-12" : ""}`}>
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
        <h3 className={`mt-4 font-serif text-3xl leading-[1.05] transition-colors ${wide ? "md:text-4xl" : ""} ${light ? "group-hover:text-brand" : "group-hover:text-brand-sky"}`}>
          {article.title}
        </h3>
        <p className={`mt-3 max-w-xl ${light ? "text-ink/60" : "text-white/55"}`}>{article.excerpt}</p>
      </div>
    </Link>
  );
}

/** The newest article, opening the articles section in the same visual language as the grid. */
function FeaturedArticle({ article }: { article: InsightCard }) {
  const { lang, t } = useLocale();
  const c = insightsContent[lang];
  const author = article.author;

  return (
    <FadeIn>
      <p className="eyebrow text-brand-deep">{c.latest}</p>
      <Link
        href={href(lang, "insights", article.slug ?? "")}
        className="group mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-ink/5">
          <SanityImage
            image={article.coverImage}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
        <div>
          <Meta article={article} light />
          <h2 className="mt-5 font-serif text-4xl leading-[1.02] transition-colors group-hover:text-brand md:text-5xl xl:text-6xl">
            {article.title}
          </h2>
          <p className="mt-5 text-lg text-ink/60">{article.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <span className="flex items-center gap-3 text-sm text-ink/60">
              {author?.photo?.asset && (
                <span className="relative size-9 overflow-hidden rounded-full bg-ink/5">
                  <SanityImage image={author.photo} alt="" fill width={96} sizes="36px" className="object-cover object-top" />
                </span>
              )}
              <span>
                {c.by} <span className="font-medium text-ink">{author?.name ?? "TechFlow Agency"}</span>
              </span>
            </span>
            <span className="inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-7 pr-2 font-medium text-paper transition-colors group-hover:bg-brand">
              {t.common.readMore}
              <span className="flex size-10 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:-rotate-45">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
}

export function InsightsPage({ articles, categoryList }: { articles: InsightCard[]; categoryList: string[] }) {
  const { lang, t } = useLocale();
  const c = insightsContent[lang];
  const [latest, ...rest] = articles;


  return (
    <>
      <PageHero badge={c.badge} title={c.title} intro={c.intro} crumbs={[{ label: t.nav.pages.insights, href: href(lang, "insights") }]} />

      {latest && <ArticleIndex articles={articles} categoryList={categoryList} latest={latest} showGrid={rest.length > 0} />}

      <ServiceCards eyebrow={c.services.eyebrow} heading={c.services.heading} />
    </>
  );
}

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/** Every article in a 3-column grid, filterable by category and searchable by text. */
function ArticleIndex({
  articles,
  categoryList,
  latest,
  showGrid,
}: {
  articles: InsightCard[];
  categoryList: string[];
  latest: InsightCard;
  showGrid: boolean;
}) {
  const { lang } = useLocale();
  const f = insightsContent[lang].filters;
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const search = normalize(useDeferredValue(query).trim());

  // Filter buttons: the Article categories list from Sanity, as used by these articles, most-used first.
  const categories = useMemo(() => filterOptions(categoryList, articles.map((a) => a.categories ?? [])), [categoryList, articles]);

  const filtering = category !== null || search !== "";
  const shown = articles.filter((a) => {
    // The featured article sits above; it only joins the grid as a search or filter result.
    if (!filtering) return a._id !== latest._id;
    if (category && !a.categories?.includes(category)) return false;
    return !search || normalize([a.title, a.excerpt, ...(a.categories ?? [])].join(" ")).includes(search);
  });

  return (
    <section className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <FeaturedArticle article={latest} />

        {showGrid && (
          <>
            <div className="mt-20 flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-16 md:mt-28 md:pt-20">
              <div>
                <p className="eyebrow text-brand-deep">{insightsContent[lang].all}</p>
                <p aria-live="polite" className="mt-2 text-sm text-ink/50">
                  {/* All articles on the page (the featured one included), like the "All" chip; the matches while filtering. */}
                  {f.count(filtering ? shown.length : articles.length)}
                </p>
              </div>
              <label className="relative w-full md:w-[28rem] lg:w-[36rem]">
                <span className="sr-only">{f.search}</span>
                <svg viewBox="0 0 24 24" aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 fill-none stroke-brand stroke-2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={f.search}
                  className="w-full rounded-full border border-brand/40 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-ink/60 hover:border-brand/70 focus:border-brand focus:shadow-[0_0_0_3px_rgba(71,102,255,0.15)]"
                />
              </label>
            </div>

            {categories.length > 1 && (
              <LayoutGroup>
                <div role="group" aria-label={f.label} className="mt-12 flex flex-wrap gap-2">
                  <FilterChip active={category === null} onClick={() => setCategory(null)} label={f.all} count={articles.length} />
                  {categories.map(([cat, count]) => (
                    <FilterChip key={cat} active={category === cat} onClick={() => setCategory(category === cat ? null : cat)} label={cat} count={count} />
                  ))}
                </div>
              </LayoutGroup>
            )}

            {shown.length > 0 ? (
              <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((a, i) => (
                  <FadeIn key={a._id} delay={(i % 3) * 0.06}>
                    <ArticleCard article={a} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-3xl border border-dashed border-ink/15 px-6 py-16 text-center">
                <p className="text-ink/60">{f.empty}</p>
                <button
                  type="button"
                  onClick={() => {
                    setCategory(null);
                    setQuery("");
                  }}
                  className="group mt-6 inline-flex h-14 items-center gap-3 rounded-full bg-ink pl-7 pr-2 font-medium text-paper transition-colors hover:bg-brand"
                >
                  {f.reset}
                  <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:-rotate-45">
                    ↺
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
