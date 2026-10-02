"use client";

import Link from "next/link";
import { href } from "@/i18n/routes";
import { useLocale } from "../site/locale";
import { CountUp, FadeIn, RevealHeading } from "../site/reveal";
import { growthCopy } from "./copy";
import { isReal, type GrowthStudy } from "./types";

export const BRIEF_ID = "en-bref";

/** Real results first (placeholders are skipped); until there are some, what was delivered. */
const figuresOf = (s: GrowthStudy) => {
  const results = s.results?.metrics?.filter((m) => isReal(m.value) && isReal(m.label)) ?? [];
  return results.length > 0 ? results : (s.hero?.stats?.filter((m) => m.value) ?? []);
};

/**
 * The campaign at a glance, under the same heading as a website case study's brief, kept minimal:
 * one row of large figures between hairlines, then a single line of facts (sector, channels,
 * reading time, tools, team). The website case study uses accent cards here; this is the growth
 * template's lighter take on the same block.
 */
export function GrowthBrief({ study }: { study: GrowthStudy }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const figures = figuresOf(study);
  const facts = [
    study.sectors?.length ? { label: c.sector, value: study.sectors.join(" · ") } : null,
    study.channels?.length ? { label: c.channels, value: study.channels.join(", ") } : null,
    study.minutes > 0 ? { label: c.reading, value: `${study.minutes} ${c.minutes}` } : null,
    study.team?.length ? { label: c.team, value: study.team.map((m) => m.name).join(", ") } : null,
  ].filter((f) => f !== null);
  const tools = study.tools ?? [];
  if (figures.length === 0 && facts.length === 0) return null;

  return (
    <section id={BRIEF_ID} className="scroll-mt-20 bg-night px-5 pb-20 pt-8 text-white md:px-10 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-(--accent)">{c.brief}</p>
        <RevealHeading text={c.briefTitle} accentClassName="italic text-(--accent)" className="mt-4 font-serif text-5xl leading-none md:text-6xl" />
        {figures.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 border-y border-white/10 md:flex">
            {figures.map((m, i) => (
              <FadeIn
                key={m._key}
                delay={i * 0.08}
                className={`flex flex-1 flex-col-reverse gap-2 px-1 py-8 md:px-8 md:first:pl-0 ${i > 0 ? "md:border-l md:border-white/10" : ""} ${i % 2 === 1 ? "border-l border-white/10 pl-5 md:pl-8" : ""} ${i > 1 ? "border-t border-white/10 md:border-t-0" : ""}`}
              >
                <dt className="text-sm text-white/55">{m.label}</dt>
                <dd className="font-serif text-5xl leading-none tracking-[-0.02em] text-(--accent) md:text-6xl">
                  <CountUp value={m.value ?? ""} />
                </dd>
              </FadeIn>
            ))}
          </dl>
        )}

        {(facts.length > 0 || tools.length > 0) && (
          <FadeIn className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
            {facts.map((f) => (
              <p key={f.label}>
                <span className="eyebrow mr-2 text-white/40">{f.label}</span>
                <span className="text-white/80">{f.value}</span>
              </p>
            ))}
            {tools.length > 0 && (
              <p>
                <span className="eyebrow mr-2 text-white/40">{c.tools}</span>
                {tools.map((tool, i) => (
                  <span key={tool._id}>
                    {i > 0 && <span className="text-white/30">, </span>}
                    <Link href={href(lang, "tools", tool.slug ?? "")} className="text-white/80 underline-offset-4 hover:text-(--accent) hover:underline">
                      {tool.title}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </FadeIn>
        )}
      </div>
    </section>
  );
}
