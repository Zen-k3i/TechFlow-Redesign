"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { growthCopy } from "./copy";
import { SECTION_IDS, type Ad } from "./types";

/**
 * The thinking behind the ads, on paper: every hook set large with its buying angle, then the
 * storyboard of one ad at a time as a timeline of beats (hook → desire → proof → action).
 */
export function Creative({ ads, heading, intro }: { ads: Ad[]; heading: string | null; intro: string | null }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const scripted = ads.filter((a) => a.script && a.script.length > 0);
  const [active, setActive] = useState(0);
  const ad = scripted[active];

  return (
    <section id={SECTION_IDS.creative} className="relative rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        {heading && <RevealHeading text={heading} accentClassName="italic text-brand-deep" className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl" />}
        {intro && (
          <FadeIn>
            <p className="mt-6 max-w-xl text-ink/60 md:text-lg">{intro}</p>
          </FadeIn>
        )}

        <p className="eyebrow mt-16 text-ink/45">{c.hooks}</p>
        <ol className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
          {ads.map((a, i) => (
            <motion.li
              key={a._key}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease }}
              className="grid gap-2 py-6 md:grid-cols-[5rem_12rem_1fr] md:items-baseline md:gap-8"
            >
              <span className="eyebrow text-ink/35">0{i + 1}</span>
              <span className="eyebrow text-brand-deep">{a.angle}</span>
              <span className="font-serif text-3xl leading-[1.05] md:text-5xl">&ldquo;{a.hook}&rdquo;</span>
            </motion.li>
          ))}
        </ol>

        {ad && (
          <div className="mt-20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="eyebrow text-ink/45">{c.storyboard}</p>
              <div role="tablist" aria-label={c.storyboard} className="flex flex-wrap gap-1.5">
                {scripted.map((a, i) => (
                  <button
                    key={a._key}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${i === active ? "bg-ink text-paper" : "border border-ink/15 text-ink/60 hover:border-ink/40"}`}
                  >
                    0{ads.indexOf(a) + 1} · {a.angle}
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.ol
                key={ad._key}
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
                className="mt-6 grid gap-3 md:grid-flow-col md:auto-cols-fr"
              >
                {ad.script?.map((s, i) => (
                  <li key={s._key} className={`relative flex flex-col rounded-3xl p-6 ${i === 0 ? "bg-night text-white" : "bg-white"}`}>
                    <span className="flex items-center justify-between">
                      <span className={`font-medium ${i === 0 ? "text-(--accent)" : "text-brand-deep"}`}>{s.beat}</span>
                      <span className={`eyebrow ${i === 0 ? "text-white/45" : "text-ink/40"}`}>{s.time}</span>
                    </span>
                    <span className={`mt-4 text-sm leading-relaxed ${i === 0 ? "text-white/80" : "text-ink/70"}`}>{s.line}</span>
                    {i < (ad.script?.length ?? 0) - 1 && (
                      <span aria-hidden className="absolute -right-2.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-xs text-ink/50 md:flex">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
