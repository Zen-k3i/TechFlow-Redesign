"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { href } from "@/i18n/routes";
import { headingsOf, PortableBody } from "../cms/portable-body";
import { SanityImage } from "../cms/sanity-image";
import { useActiveHeading } from "../page/blocks";
import { QuoteButton, TalkToHumanButton } from "../page/project-cta";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { insightsContent, type InsightDetail } from "./data";
import { ArticleCard, formatDate } from "./insights-page";

type Heading = { id: string; title: string };
type Copy = (typeof insightsContent)["fr"];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

/**
 * Insight article, laid out for long reads: a short dark header (what it is, who wrote it, how long
 * it takes), the cover straddling header and page, then the text on a full-width paper background in
 * a ~70-character column, with a numbered contents list that follows the reader (a collapsible one
 * on small screens) and a "book a call" card beside it (after the text on small screens).
 */
export function ArticlePage({ article }: { article: InsightDetail }) {
  const { lang } = useLocale();
  const c = insightsContent[lang];
  const headings = headingsOf(article.body);
  const articleRef = useRef<HTMLElement>(null);
  const hasCover = Boolean(article.coverImage?.asset);

  return (
    <>
      <section id="top" className="grain relative overflow-hidden bg-night px-5 pt-32 text-white md:px-10 md:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_80%_0%,rgba(71,102,255,0.3),transparent_70%)]" />
        <div className={`relative mx-auto max-w-4xl ${hasCover ? "pb-14 md:pb-20" : "pb-20 md:pb-28"}`}>
          <motion.div {...rise(0)}>
            <Link
              href={href(lang, "insights")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 py-2 pl-3 pr-4 text-sm text-white/75 transition-colors hover:border-white/40 hover:text-white"
            >
              <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
                ←
              </span>
              {c.backToList}
            </Link>
          </motion.div>

          {article.categories && article.categories.length > 0 && (
            <motion.ul {...rise(0.05)} className="mt-8 flex flex-wrap gap-2 text-sm">
              {article.categories.map((cat) => (
                <li key={cat} className="rounded-full bg-brand-sky/15 px-3 py-1 text-brand-sky">
                  {cat}
                </li>
              ))}
            </motion.ul>
          )}

          <RevealHeading
            as="h1"
            text={article.title ?? ""}
            className="mt-6 font-serif text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          />
          {article.excerpt && (
            <motion.p {...rise(0.2)} className="mt-6 max-w-3xl text-lg leading-relaxed text-white/65 md:text-xl">
              {article.excerpt}
            </motion.p>
          )}

          <motion.div {...rise(0.3)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/10 pt-6 text-sm">
            <Author author={article.author} label={c.by} />
            <dl className="flex gap-8">
              {article.publishedAt && (
                <div>
                  <dt className="text-white/40">{c.published}</dt>
                  <dd className="mt-0.5 text-white/85">
                    <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-white/40">{c.reading}</dt>
                <dd className="mt-0.5 text-white/85">
                  {Math.max(1, article.minutes)} min
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* The cover runs edge to edge between the dark header and the page. */}
      {hasCover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="relative h-[56vw] max-h-[85vh] min-h-[16rem] w-full bg-night-soft"
        >
          <SanityImage
            image={article.coverImage}
            alt={article.coverImage?.alt ?? ""}
            fill
            priority
            width={2400}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      )}

      <section className="bg-paper px-5 pb-24 pt-14 text-ink md:px-10 md:pb-32 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <aside className="max-lg:hidden">
            <div className="sticky top-28 space-y-10">
              {headings.length > 0 && <Contents label={c.toc} items={headings} target={articleRef} />}
              <BookCall />
              <Share copy={c} title={article.title ?? ""} />
            </div>
          </aside>

          <div className="min-w-0 max-w-[44rem]">
            {headings.length > 0 && <MobileContents label={c.toc} items={headings} />}

            {/* The opening paragraph reads as a lead. */}
            <article
              ref={articleRef}
              lang={lang}
              className="[&>p:first-child]:mt-0 [&>p:first-child]:text-[1.3rem] [&>p:first-child]:leading-[1.6] [&>p:first-child]:text-ink md:[&>p:first-child]:text-[1.45rem]"
            >
              <PortableBody value={article.body} scale="article" />
            </article>

            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-ink/10 pt-8 lg:hidden">
              <Share copy={c} title={article.title ?? ""} />
            </div>

            <AuthorCard author={article.author} label={c.by} />

            {/* On large screens the same card sits in the sidebar, under the contents. */}
            <FadeIn className="mt-12 lg:hidden">
              <BookCall />
            </FadeIn>
          </div>
        </div>
      </section>

      {article.related.length > 0 && (
        <section className="bg-night px-5 py-24 text-white md:px-10 md:py-28">
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

function Avatar({ author, size }: { author: InsightDetail["author"]; size: string }) {
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-brand-deep font-semibold text-white ${size}`}>
      {author?.photo?.asset ? (
        <SanityImage image={author.photo} alt="" fill width={160} sizes="64px" className="object-cover object-top" />
      ) : (
        <span aria-hidden>TF</span>
      )}
    </span>
  );
}

/** Byline in the header; without a named author the agency signs. */
function Author({ author, label }: { author: InsightDetail["author"]; label: string }) {
  return (
    <span className="flex items-center gap-3">
      <Avatar author={author} size="size-10 text-xs" />
      <span>
        <span className="block text-white/40">{label}</span>
        <span className="mt-0.5 block text-white/85">
          {author?.name ?? "TechFlow Agency"}
          {author?.role && <span className="text-white/45"> · {author.role}</span>}
        </span>
      </span>
    </span>
  );
}

/** Who wrote it, after the text: a face and a way to follow up. */
function AuthorCard({ author, label }: { author: InsightDetail["author"]; label: string }) {
  if (!author?.name) return null;
  return (
    <FadeIn className="mt-16 flex items-center gap-5 rounded-[1.5rem] border border-ink/10 bg-white p-6 md:p-7">
      <Avatar author={author} size="size-16 text-base" />
      <div className="min-w-0">
        <p className="text-sm text-ink/45">{label}</p>
        <p className="mt-0.5 text-lg font-semibold">{author.name}</p>
        {author.role && <p className="text-ink/60">{author.role}</p>}
      </div>
      {author.linkedin && (
        <a
          href={author.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition-colors hover:border-brand-deep hover:text-brand-deep"
        >
          LinkedIn ↗
        </a>
      )}
    </FadeIn>
  );
}

/** Numbered contents that follow the reader, with a progress rail. */
function Contents({ label, items, target }: { label: string; items: Heading[]; target: React.RefObject<HTMLElement | null> }) {
  const [ids] = useState(() => items.map((i) => i.id));
  const active = useActiveHeading(ids);
  const { scrollYProgress } = useScroll({ target, offset: ["start 30%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <nav aria-label={label} className="max-h-[calc(100vh-14rem)] overflow-y-auto">
      <p className="eyebrow text-ink/40">{label}</p>
      <div className="relative mt-5">
        <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-ink/10" />
        <motion.span aria-hidden style={{ scaleY: progress }} className="absolute inset-y-0 left-0 w-px origin-top bg-brand-deep" />
        <ol className="space-y-0.5">
          {items.map((item, i) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`flex gap-3 py-1.5 pl-4 text-sm leading-snug transition-colors ${on ? "text-ink" : "text-ink/45 hover:text-ink"}`}
                >
                  <span className={`font-mono text-xs leading-5 ${on ? "text-brand-deep" : "text-ink/30"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={on ? "font-medium" : ""}>{item.title}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

/** Contents on small screens: closed by default so the text comes first. */
function MobileContents({ label, items }: { label: string; items: Heading[] }) {
  return (
    <details className="group mb-12 rounded-2xl border border-ink/10 bg-white lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-medium [&::-webkit-details-marker]:hidden">
        <span>
          {label} <span className="text-ink/40">· {items.length}</span>
        </span>
        <span aria-hidden className="text-xl leading-none text-ink/40 transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <ol className="space-y-1 border-t border-ink/10 px-5 py-4">
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="flex gap-3 py-1.5 text-sm text-ink/70 hover:text-ink">
              <span className="font-mono text-xs leading-5 text-ink/30">{String(i + 1).padStart(2, "0")}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}

function Share({ copy, title }: { copy: Copy; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => window.location.href.split("#")[0];
  const button = "rounded-full border border-ink/15 px-3.5 py-1.5 text-sm transition-colors hover:border-brand-deep hover:text-brand-deep";

  return (
    <div>
      <p className="eyebrow text-ink/40">{copy.share}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={button}
          onClick={() => {
            navigator.clipboard?.writeText(url()).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
        >
          <span aria-live="polite">{copied ? copy.copied : copy.copy}</span>
        </button>
        <button
          type="button"
          className={button}
          onClick={() =>
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`, "_blank", "noopener,noreferrer")
          }
          aria-label={`LinkedIn: ${title}`}
        >
          LinkedIn
        </button>
      </div>
    </div>
  );
}

/** "Un projet en tête ?" card with the same buttons as the footer's call to action, stacked to fit the sidebar. */
function BookCall() {
  const { t } = useLocale();
  return (
    <div className="rounded-[1.25rem] border border-ink/15 bg-white px-4 py-7 text-center">
      <p className="font-serif text-[1.9rem] leading-tight">{t.common.cta.heading.replace(/\*/g, "")}</p>
      <div className="mt-5 flex flex-col gap-2.5">
        <TalkToHumanButton className="w-full" />
        <QuoteButton tone="light" className="w-full" />
      </div>
      <p className="mt-4 text-xs text-ink/50">{t.common.reassurance}</p>
    </div>
  );
}
