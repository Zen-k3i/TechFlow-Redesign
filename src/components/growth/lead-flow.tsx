"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView } from "motion/react";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { useStill } from "../site/use-still";
import { growthCopy } from "./copy";
import { SECTION_IDS } from "./types";

export type FlowStep = { _key: string; title: string | null; text: string | null };
export type Criterion = { _key: string; label: string | null; points: number | null };
export type SampleLead = { _key: string; name: string | null; source: string | null; interest: string | null; score: number | null };
export type Tiers = { hot?: string | null; warm?: string | null; cold?: string | null } | null;

type Tier = "hot" | "warm" | "cold";
const tierOf = (score: number): Tier => (score >= 70 ? "hot" : score >= 40 ? "warm" : "cold");
const TIER_COLOUR: Record<Tier, string> = { hot: "#34d399", warm: "#fbbf24", cold: "#94a3b8" };
const TIERS: Tier[] = ["hot", "warm", "cold"];

/**
 * How a lead travels: the flow from ad click to the sales team, then example leads being scored
 * one after the other and dropping into hot / warm / cold columns. The hot column is the sales
 * team's queue.
 */
export function LeadFlow({
  heading,
  intro,
  flow,
  criteria,
  leads,
  tiers,
  note,
}: {
  heading: string | null;
  intro: string | null;
  flow: FlowStep[];
  criteria: Criterion[];
  leads: SampleLead[];
  tiers: Tiers;
  note: string | null;
}) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const still = useStill();
  const board = useRef<HTMLDivElement>(null);
  const inView = useInView(board, { margin: "-20% 0px" });
  // Leads already scored, in order; the last one is the card being scored.
  // With reduced motion every lead is already sorted.
  const [step, setStep] = useState(1);
  const scored = still ? leads.length : step;
  const done = scored >= leads.length;

  useEffect(() => {
    if (still || !inView) return;
    const id = setTimeout(() => setStep((n) => (n >= leads.length ? 1 : n + 1)), done ? 5000 : 3200);
    return () => clearTimeout(id);
  }, [step, inView, still, leads.length, done]);

  const current = leads[Math.min(scored, leads.length) - 1];
  const score = current?.score ?? 0;
  const tier = tierOf(score);

  return (
    <section id={SECTION_IDS.leads} className="relative bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        {heading && <RevealHeading text={heading} accentClassName="italic text-(--accent)" className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl" />}
        {intro && (
          <FadeIn>
            <p className="mt-6 max-w-xl text-white/60 md:text-lg">{intro}</p>
          </FadeIn>
        )}

        {flow.length > 0 && <FlowTrack flow={flow} still={still} />}

        {leads.length > 0 && (
          <div ref={board} className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] border border-white/10 bg-night-soft p-6 md:p-8">
              <p className="eyebrow text-white/45">{c.scoring}</p>
              <AnimatePresence mode="wait">
                {current && (
                  <motion.div key={current._key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease }}>
                    <div className="mt-5 flex items-center justify-between gap-6">
                      <div className="min-w-0">
                        <p className="text-xl font-medium">{current.name}</p>
                        {current.source && (
                          <p className="text-sm text-white/45">
                            {c.source} : {current.source}
                          </p>
                        )}
                        {current.interest && (
                          <p className="text-sm text-white/45">
                            {c.interest} : {current.interest}
                          </p>
                        )}
                      </div>
                      <Gauge score={score} colour={TIER_COLOUR[tier]} still={still} />
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl p-4" style={{ background: `color-mix(in oklab, ${TIER_COLOUR[tier]} 14%, transparent)` }}>
                      <span className="flex items-center gap-2 font-medium" style={{ color: TIER_COLOUR[tier] }}>
                        <span className="size-2 rounded-full" style={{ background: TIER_COLOUR[tier] }} /> {c.tiers[tier]}
                      </span>
                      {tiers?.[tier] && <span className="text-right text-sm text-white/80">→ {tiers[tier]}</span>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {criteria.length > 0 && (
                <ul className="mt-6 space-y-1.5 border-t border-white/10 pt-5">
                  {criteria.map((cr) => (
                    <li key={cr._key} className="flex items-center justify-between gap-4 rounded-lg bg-white/[0.04] px-3 py-2 text-sm">
                      <span className="text-white/75">{cr.label}</span>
                      <span className="font-mono text-xs text-(--accent)">+{cr.points ?? 0}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <LayoutGroup>
              <div className="grid gap-3 sm:grid-cols-3">
                {TIERS.map((t) => {
                  const items = leads.slice(0, scored).filter((l) => tierOf(l.score ?? 0) === t);
                  return (
                    <div key={t} className={`flex min-h-56 flex-col rounded-[1.5rem] border p-4 ${t === "hot" ? "border-emerald-400/40 bg-emerald-400/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
                      <p className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 font-medium" style={{ color: TIER_COLOUR[t] }}>
                          <span className="size-2 rounded-full" style={{ background: TIER_COLOUR[t] }} /> {c.tiers[t]}
                        </span>
                        <span className="eyebrow text-white/40">{items.length}</span>
                      </p>
                      {t === "hot" && <p className="eyebrow mt-1 text-emerald-300/80">→ {c.salesTeam}</p>}
                      <ul className="mt-4 space-y-2">
                        <AnimatePresence initial={false}>
                          {items.map((l) => (
                            <motion.li
                              key={l._key}
                              layout
                              initial={{ opacity: 0, y: -12, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.45, ease }}
                              className={`rounded-xl bg-white p-3 text-ink ${l._key === current?._key ? "ring-2 ring-(--accent)" : ""}`}
                            >
                              <span className="flex items-start justify-between gap-2">
                                <span className="text-sm font-medium leading-snug">{l.name}</span>
                                <span className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[11px]" style={{ background: `color-mix(in oklab, ${TIER_COLOUR[t]} 25%, white)` }}>
                                  {l.score}
                                </span>
                              </span>
                              {l.source && <span className="mt-1 block truncate text-xs text-ink/50">{l.source}</span>}
                            </motion.li>
                          ))}
                        </AnimatePresence>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>
        )}
        {note && <p className="mt-5 text-xs text-white/40">{note}</p>}
      </div>
    </section>
  );
}

/** The steps on a line, with a lead travelling along it. */
function FlowTrack({ flow, still }: { flow: FlowStep[]; still: boolean }) {
  return (
    <div className="relative mt-14">
      <div aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-white/15 md:inset-x-0 md:bottom-auto md:left-0 md:top-5 md:h-px md:w-auto" />
      {!still && (
        <motion.span
          aria-hidden
          className="absolute left-5 top-0 hidden size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--accent) shadow-[0_0_14px_4px_color-mix(in_oklab,var(--accent)_60%,transparent)] md:block"
          style={{ top: 20 }}
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
        />
      )}
      <ol className="relative grid gap-6 md:gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 12rem), 1fr))` }}>
        {flow.map((s, i) => (
          <motion.li
            key={s._key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease }}
            className="flex gap-4 md:block"
          >
            <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-night font-mono text-sm text-(--accent)">0{i + 1}</span>
            <span className="md:mt-4 md:block">
              <span className="block font-medium">{s.title}</span>
              {s.text && <span className="mt-1 block text-sm text-white/55">{s.text}</span>}
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function Gauge({ score, colour, still }: { score: number; colour: string; still: boolean }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden>
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={colour}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: still ? circ * (1 - score / 100) : circ }}
          animate={{ strokeDashoffset: circ * (1 - score / 100) }}
          transition={{ duration: still ? 0 : 1, ease }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-3xl leading-none">{score}</span>
        <span className="eyebrow text-white/40">/100</span>
      </span>
    </div>
  );
}
