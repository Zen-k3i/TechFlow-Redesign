"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { growthCopy } from "./copy";
import { SECTION_IDS } from "./types";

export type AbVariant = { _key: string; label: string | null; hook: string | null; angle: string | null };
export type AbWeek = { _key: string; label: string | null; budget: number[] | null; cpl: number[] | null; note: string | null };

/** Variant colours: the winner is always the accent; the others step down in white. */
const SHADES = ["rgba(255,255,255,0.55)", "rgba(255,255,255,0.32)", "rgba(255,255,255,0.18)"];

/**
 * A/B test in two reads: the variants side by side with their final share of the budget and cost
 * per lead (who won), then one stacked column per week showing the budget moving to the winner.
 * Clicking a week shows its split and what was decided.
 */
export function ABTestComparison({
  heading,
  intro,
  illustrative,
  variants,
  weeks,
}: {
  heading: string | null;
  intro: string | null;
  illustrative: boolean;
  variants: AbVariant[];
  weeks: AbWeek[];
}) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const [selected, setSelected] = useState(weeks.length - 1);
  const last = weeks[weeks.length - 1];
  const share = (w: AbWeek | undefined, i: number) => w?.budget?.[i] ?? 0;
  const winner = variants.reduce((best, _, i) => (share(last, i) > share(last, best) ? i : best), 0);
  const colour = (i: number) => (i === winner ? "var(--accent)" : SHADES[(i > winner ? i - 1 : i) % SHADES.length]);
  const week = weeks[selected];
  const maxCpl = Math.max(1, ...weeks.flatMap((w) => w.cpl ?? []));

  return (
    <section id={SECTION_IDS.abTest} className="relative bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            {heading && <RevealHeading text={heading} accentClassName="italic text-(--accent)" className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl" />}
            {intro && (
              <FadeIn>
                <p className="mt-6 max-w-xl text-white/60 md:text-lg">{intro}</p>
              </FadeIn>
            )}
          </div>
          {illustrative && <span className="eyebrow self-start rounded-full border border-white/20 px-3 py-1.5 text-white/60 lg:self-end">{c.illustrative}</span>}
        </div>

        {/* 1. Who won */}
        <ul className="mt-14 grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` }}>
          {variants.map((v, i) => {
            const final = share(last, i);
            const cpl = last?.cpl?.[i] ?? 0;
            const status = final === 0 ? c.paused : i === winner ? c.winner : c.testing;
            return (
              <motion.li
                key={v._key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
                className={`h-full rounded-[1.75rem] border p-6 ${i === winner ? "border-(--accent)/60 bg-(--accent)/10" : "border-white/10 bg-night-soft"} ${final === 0 ? "opacity-50" : ""}`}>
                  <div className="flex items-center justify-between">
                    <span className={`flex size-10 items-center justify-center rounded-full font-medium ${i === winner ? "bg-(--accent) text-night" : "bg-white/10"}`}>{v.label}</span>
                    <span className={`eyebrow ${i === winner ? "text-(--accent)" : "text-white/45"}`}>{status}</span>
                  </div>
                  {v.hook && <p className="mt-5 font-serif text-2xl leading-tight">&ldquo;{v.hook}&rdquo;</p>}
                  {v.angle && <p className="eyebrow mt-2 text-white/40">{v.angle}</p>}
                  <div className="mt-6">
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-white/55">{c.budgetShare}</span>
                      <span className="font-serif text-3xl">{final}%</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${final}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease }}
                        className="h-full rounded-full"
                        style={{ background: colour(i) }}
                      />
                    </div>
                    {cpl > 0 && (
                      <>
                        <div className="mt-4 flex items-baseline justify-between text-sm">
                          <span className="text-white/55">{c.costPerLead}</span>
                          <span className="font-mono text-sm">×{cpl.toFixed(2)}</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(cpl / maxCpl) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease }}
                            className="h-full rounded-full bg-brand-sky/70"
                          />
                        </div>
                      </>
                    )}
                  </div>
              </motion.li>
            );
          })}
        </ul>

        {/* 2. Budget moving over time */}
        {weeks.length > 1 && (
          <div className="mt-6 grid gap-8 rounded-[2rem] border border-white/10 bg-night-soft p-6 md:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <figure>
              <figcaption className="eyebrow text-white/45">{c.budgetOverTime}</figcaption>
              <div className="mt-6 flex h-56 items-end gap-3 md:gap-5" role="group" aria-label={c.budgetOverTime}>
                {weeks.map((w, wi) => (
                  <button
                    key={w._key}
                    type="button"
                    onClick={() => setSelected(wi)}
                    aria-pressed={wi === selected}
                    aria-label={`${w.label ?? `${c.week} ${wi + 1}`}: ${variants.map((v, i) => `${v.label} ${share(w, i)}%`).join(", ")}`}
                    className="group flex h-full flex-1 flex-col"
                  >
                    <span className={`flex w-full flex-1 flex-col-reverse overflow-hidden rounded-xl ring-offset-4 ring-offset-night-soft transition ${wi === selected ? "ring-2 ring-white/60" : "opacity-70 group-hover:opacity-100"}`}>
                      {variants.map((v, i) => (
                        <motion.span
                          key={v._key}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${share(w, i)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: wi * 0.12 + i * 0.05, ease }}
                          className="block w-full border-t border-night-soft"
                          style={{ background: colour(i) }}
                        />
                      ))}
                    </span>
                    <span className={`eyebrow mt-3 ${wi === selected ? "text-white" : "text-white/40"}`}>{w.label ?? `${c.week} ${wi + 1}`}</span>
                  </button>
                ))}
              </div>
              <ul className="mt-5 flex flex-wrap gap-4 text-xs text-white/55">
                {variants.map((v, i) => (
                  <li key={v._key} className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm" style={{ background: colour(i) }} /> {v.label}
                    {v.angle ? ` · ${v.angle}` : ""}
                  </li>
                ))}
              </ul>
            </figure>
            <div aria-live="polite">
              <p className="eyebrow text-(--accent)">{week?.label ?? `${c.week} ${selected + 1}`}</p>
              <ul className="mt-4 space-y-2">
                {variants.map((v, i) => (
                  <li key={v._key} className="flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-2.5 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 rounded-sm" style={{ background: colour(i) }} /> {v.label}
                    </span>
                    <span className="font-serif text-xl">{share(week, i)}%</span>
                  </li>
                ))}
              </ul>
              {week?.note && <p className="mt-4 text-sm leading-relaxed text-white/70">{week.note}</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
