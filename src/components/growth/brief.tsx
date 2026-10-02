"use client";

import Link from "next/link";
import { href } from "@/i18n/routes";
import { SanityImage } from "../cms/sanity-image";
import { useLocale } from "../site/locale";
import { CountUp, FadeIn, RevealHeading } from "../site/reveal";
import { growthCopy } from "./copy";
import type { GrowthStudy } from "./types";

export const BRIEF_ID = "en-bref";

const GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Is there anything for "The campaign in 10 seconds"? */
export const hasBrief = (s: GrowthStudy) =>
  Boolean(s.hero?.stats?.some((m) => m.value) || s.sectors?.length || s.services?.length || s.channels?.length || s.tools?.length || s.team?.length);

/**
 * The project template's "10 seconds" brief, for a campaign: what was delivered as large accent
 * figures, then sector, services, channels, tools and team. Same layout as on website case
 * studies, so both read the same way; the channels row is the growth twist.
 */
export function GrowthBrief({ study }: { study: GrowthStudy }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  if (!hasBrief(study)) return null;
  const stats = study.hero?.stats?.filter((m) => m.value) ?? [];
  const cell = "border-t border-white/15 pt-5";
  const label = "eyebrow text-white/45";

  return (
    <section id={BRIEF_ID} className="scroll-mt-20 bg-night px-5 pb-24 pt-8 text-white md:px-10 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow text-(--accent)">{c.brief}</p>
        <RevealHeading text={c.briefTitle} accentClassName="italic text-(--accent)" className="mt-4 font-serif text-5xl leading-none md:text-6xl" />

        {stats.length > 0 && (
          <dl className={`mt-14 grid gap-4 ${GRID[Math.min(stats.length, 4)]}`}>
            {stats.map((m, i) => (
              <FadeIn
                key={m._key}
                delay={i * 0.1}
                className="flex h-full flex-col-reverse justify-end rounded-3xl bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] p-8 ring-1 ring-[color-mix(in_oklab,var(--accent)_30%,transparent)]"
              >
                <dt className="mt-4 max-w-xs text-lg leading-snug text-white/70">{m.label}</dt>
                <dd className="font-serif text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.85] tracking-[-0.03em] text-(--accent)">
                  <CountUp value={m.value ?? ""} />
                </dd>
              </FadeIn>
            ))}
          </dl>
        )}

        <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {study.sectors && study.sectors.length > 0 && (
            <FadeIn className={cell}>
              <dt className={label}>{c.sector}</dt>
              <dd className="mt-3 font-serif text-3xl">{study.sectors.join(" · ")}</dd>
            </FadeIn>
          )}
          {study.services && study.services.length > 0 && (
            <FadeIn delay={0.05} className={cell}>
              <dt className={label}>{c.services}</dt>
              <dd>
                <ul className="mt-3 space-y-1.5">
                  {study.services.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-lg">
                      <span aria-hidden className="size-1.5 rounded-full bg-(--accent)" />
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </FadeIn>
          )}
          {study.channels && study.channels.length > 0 && (
            <FadeIn delay={0.1} className={cell}>
              <dt className={label}>{c.channels}</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {study.channels.map((ch) => (
                  <span key={ch} className="rounded-full border border-(--accent)/40 bg-(--accent)/10 px-3.5 py-1.5 text-sm text-(--accent)">
                    {ch}
                  </span>
                ))}
              </dd>
            </FadeIn>
          )}
          {study.tools && study.tools.length > 0 && (
            <FadeIn delay={0.15} className={cell}>
              <dt className={label}>{c.tools}</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {study.tools.map((tool) => (
                  <Link
                    key={tool._id}
                    href={href(lang, "tools", tool.slug ?? "")}
                    className="flex items-center gap-2 rounded-full border border-white/15 py-1 pl-1 pr-3.5 text-sm transition-colors hover:border-(--accent) hover:text-(--accent)"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-white">
                      <SanityImage image={tool.logo} alt="" width={80} sizes="16px" className="size-4 object-contain" />
                    </span>
                    {tool.title}
                  </Link>
                ))}
              </dd>
            </FadeIn>
          )}
          {study.team && study.team.length > 0 && (
            <FadeIn delay={0.2} className={`${cell} sm:col-span-2`}>
              <dt className={label}>{c.team}</dt>
              <dd className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                {study.team.map((m) => (
                  <div key={m._id} className="flex items-center gap-3">
                    {m.photo?.asset ? (
                      <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-white/10">
                        <SanityImage image={m.photo} alt="" fill width={144} sizes="36px" className="object-cover object-top" />
                      </span>
                    ) : (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-deep font-serif">{m.name?.[0]}</span>
                    )}
                    <span>
                      <span className="block text-sm font-medium">{m.name}</span>
                      <span className="block text-xs text-white/50">{m.role}</span>
                    </span>
                  </div>
                ))}
              </dd>
            </FadeIn>
          )}
        </dl>
      </div>
    </section>
  );
}
