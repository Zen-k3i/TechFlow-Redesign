"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { href } from "@/i18n/routes";
import { SanityImage } from "../cms/sanity-image";
import { CmsProjectCard } from "../projects/cms-project-card";
import { ComparisonTable, HumanActions, SectionHeader } from "../page/ui";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { teamContent } from "../team/data";
import { toolsContent, type ToolDetail } from "./data";
import { ToolLink } from "./tools-page";

export function ToolPage({ tool }: { tool: ToolDetail }) {
  const { lang, t } = useLocale();
  const c = toolsContent[lang];
  const comparison = teamContent[lang].comparison;

  return (
    <>
      <section id="top" className="grain relative overflow-hidden bg-night px-5 pb-24 pt-32 text-white md:px-10 md:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_20%,rgba(71,102,255,0.28),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
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
              <Link href={href(lang, "tools")} className="hover:text-white">
                {c.label}
              </Link>
              <span aria-hidden>/</span>
              <span aria-current="page" className="text-white/70">
                {tool.title}
              </span>
            </motion.nav>
            <RevealHeading as="h1" text={tool.title ?? ""} className="mt-8 font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] tracking-[-0.02em]" />
            {tool.intro && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease }}
                className="mt-6 max-w-2xl text-lg text-white/70 md:text-xl"
              >
                {tool.intro}
              </motion.p>
            )}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }} className="mt-10">
              <HumanActions />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/[0.04]"
          >
            <div aria-hidden className="absolute inset-10 rounded-full bg-brand/25 blur-3xl" />
            <SanityImage image={tool.logo} alt={tool.title ?? ""} width={600} sizes="240px" priority className="relative h-auto max-h-40 w-3/5 object-contain" />
          </motion.div>
        </div>
      </section>

      {tool.benefits && tool.benefits.length > 0 && (
        <section className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
          <div className="mx-auto max-w-7xl">
            <SectionHeader title={tool.benefitsTitle ?? tool.title ?? ""} intro={tool.benefitsIntro ?? undefined} tone="light" />
            <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tool.benefits.map((b, i) => (
                <FadeIn key={b._key} delay={(i % 3) * 0.06}>
                  <li className="h-full rounded-3xl border border-ink/10 bg-white p-7 transition-colors hover:border-brand-deep/40">
                    <span className="eyebrow text-brand-deep">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 font-serif text-2xl leading-tight">{b.title}</h3>
                    {b.text && <p className="mt-3 leading-relaxed text-ink/65">{b.text}</p>}
                  </li>
                </FadeIn>
              ))}
            </ul>

            <div className="mt-28">
              <SectionHeader title={comparison.heading} intro={comparison.intro} tone="light" />
              <FadeIn className="mt-12">
                <ComparisonTable rows={comparison.rows} />
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {tool.projects.length > 0 && (
        <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow={c.projects.eyebrow} title={c.projects.heading.replace("{tool}", tool.title ?? "")} />
            <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {tool.projects.map((p, i) => (
                <FadeIn key={p._id} delay={(i % 3) * 0.06}>
                  <li>
                    <CmsProjectCard project={p} tone="dark" />
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow={c.toolbox.eyebrow} title={c.toolbox.heading} tone="light" />
            <Link href={href(lang, "tools")} className="rounded-full border border-ink/15 px-5 py-2.5 text-sm hover:border-ink">
              {c.all}
            </Link>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tool.others.slice(0, 8).map((other) => (
              <li key={other._id}>
                <ToolLink tool={other} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
