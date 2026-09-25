"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ease } from "../site/content";
import { RevealHeading } from "../site/reveal";
import type { FunnelVisual, GrowthCaseStudy } from "./data";

const DURATION = 7;
/** Funnel height (SVG units) at each stage boundary, left to right. */
const EDGES = [220, 176, 138, 104, 76, 54];

export function Funnel({ study }: { study: GrowthCaseStudy }) {
  const { stages } = study.funnel;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px" });
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const playing = auto && inView;
  const stage = stages[active];

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % stages.length), DURATION * 1000);
    return () => clearTimeout(id);
  }, [active, playing, stages.length]);

  const select = (i: number) => {
    setActive((i + stages.length) % stages.length);
    setAuto(false);
  };

  return (
    <section id="tunnel" ref={ref} className="relative overflow-hidden bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 h-2/3 bg-[radial-gradient(50%_50%_at_30%_40%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow text-(--accent)">Le tunnel de vente</p>
            <RevealHeading
              text="De la vidéo *à la vente.*"
              accentClassName="italic text-(--accent)"
              className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="mr-4 hidden max-w-xs text-sm text-white/55 lg:block">
              Une seule équipe, {stages.length} étapes, chacune mesurée par un indicateur précis.
            </p>
            <button type="button" onClick={() => select(active - 1)} aria-label="Étape précédente" className="flex size-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
              ←
            </button>
            <button type="button" onClick={() => select(active + 1)} aria-label="Étape suivante" className="flex size-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
              →
            </button>
          </div>
        </div>

        <FunnelChart study={study} active={active} playing={playing} onSelect={select} />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease }}
            className="mt-10 grid gap-10 rounded-[2rem] border border-white/10 bg-night-soft p-6 md:mt-14 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
          >
            <div>
              <p className="eyebrow text-(--accent)">
                Étape 0{active + 1} / 0{stages.length} · {stage.verb}
              </p>
              <h3 className="mt-4 font-serif text-4xl leading-[1] md:text-5xl">{stage.title}</h3>
              <p className="mt-5 text-white/65">{stage.text}</p>
              <ul className="mt-7 space-y-2.5">
                {stage.deliverables.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-(--accent) text-[11px] text-night">✓</span>
                    <span className="text-white/85">{d}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm">
                <span className="eyebrow text-white/45">Indicateur</span> {stage.kpi}
              </p>
            </div>
            <StageVisual type={stage.visual} study={study} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FunnelChart({
  study,
  active,
  playing,
  onSelect,
}: {
  study: GrowthCaseStudy;
  active: number;
  playing: boolean;
  onSelect: (i: number) => void;
}) {
  const { stages } = study.funnel;
  const width = 1000;
  const step = width / stages.length;
  const mid = EDGES[0] / 2;
  const opacity = (i: number) => (i === active ? 1 : i < active ? 0.35 : 0.14);

  return (
    <>
      <div className="mt-14 hidden md:block">
        <div className="relative">
          <svg viewBox={`0 0 ${width} ${EDGES[0]}`} className="block w-full" aria-hidden>
            {stages.map((s, i) => {
              const x0 = i * step + (i ? 3 : 0);
              const x1 = (i + 1) * step - 3;
              const h0 = EDGES[i] / 2;
              const h1 = EDGES[i + 1] / 2;
              return (
                <motion.path
                  key={s.verb}
                  d={`M${x0} ${mid - h0} L${x1} ${mid - h1} L${x1} ${mid + h1} L${x0} ${mid + h0} Z`}
                  fill="var(--accent)"
                  stroke="var(--accent)"
                  strokeOpacity={0.35}
                  strokeWidth={1}
                  initial={{ fillOpacity: 0.14 }}
                  animate={{ fillOpacity: opacity(i) }}
                  transition={{ duration: 0.5, ease }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
            {stages.map((s, i) => (
              <button
                key={s.verb}
                type="button"
                onClick={() => onSelect(i)}
                aria-pressed={i === active}
                className={`flex flex-col items-center justify-center text-center transition-colors ${i === active ? "text-night" : "text-white/75 hover:text-white"}`}
              >
                <span className="eyebrow opacity-70">0{i + 1}</span>
                <span className="mt-1 font-serif text-2xl leading-none lg:text-3xl">{s.verb}</span>
              </button>
            ))}
          </div>
        </div>

        <ol className="mt-6 grid gap-4" style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
          {stages.map((s, i) => (
            <li key={s.verb}>
              <button type="button" onClick={() => onSelect(i)} className="w-full text-left">
                <span className="relative block h-0.5 overflow-hidden rounded-full bg-white/10">
                  {i < active && <span className="absolute inset-0 bg-(--accent)/50" />}
                  {i === active && (
                    <motion.span
                      key={`${active}-${playing}`}
                      initial={{ scaleX: playing ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: playing ? DURATION : 0, ease: "linear" }}
                      className="absolute inset-0 origin-left bg-(--accent)"
                    />
                  )}
                </span>
                <span className={`eyebrow mt-3 block transition-colors ${i === active ? "text-white" : "text-white/40"}`}>{s.level}</span>
                <span className={`mt-1 block text-sm transition-colors ${i === active ? "text-white/70" : "text-white/35"}`}>{s.kpi}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <ol className="mt-12 flex flex-col items-center gap-1.5 md:hidden">
        {stages.map((s, i) => (
          <li key={s.verb} style={{ width: `${100 - i * 11}%` }}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-pressed={i === active}
              className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                i === active ? "bg-(--accent) text-night" : i < active ? "bg-(--accent)/25" : "bg-white/[0.06] text-white/60"
              }`}
            >
              <span className="font-medium">
                0{i + 1} · {s.verb}
              </span>
              <span className="eyebrow truncate opacity-70">{s.level}</span>
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

function StageVisual({ type, study }: { type: FunnelVisual; study: GrowthCaseStudy }) {
  switch (type) {
    case "hook":
      return <HookVisual study={study} />;
    case "reach":
      return <ReachVisual study={study} />;
    case "test":
      return <TestVisual study={study} />;
    case "score":
      return <ScoreVisual study={study} />;
    case "close":
      return <CloseVisual study={study} />;
  }
}

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="self-center rounded-[1.5rem] border border-white/10 bg-night p-6 md:p-8">{children}</div>;
}

function HookVisual({ study }: { study: GrowthCaseStudy }) {
  const ad = study.ads[0];
  return (
    <Panel>
      <p className="eyebrow text-white/45">Vidéo 01 · {ad.angle}</p>
      <p className="mt-3 font-serif text-3xl leading-tight">&ldquo;{ad.hook}&rdquo;</p>
      <div className="mt-7 flex h-2 gap-1">
        {ad.script.map((b, i) => (
          <motion.span
            key={b.beat}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.25, ease }}
            className={`origin-left rounded-full ${i === 0 ? "bg-(--accent)" : "bg-white/20"}`}
            style={{ flexGrow: i === 0 ? 1 : 3 }}
          />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-4 gap-2 text-xs">
        {ad.script.map((b, i) => (
          <li key={b.beat} className={i === 0 ? "text-(--accent)" : "text-white/50"}>
            <span className="block font-medium">{b.beat}</span>
            <span className="eyebrow opacity-70">{b.time}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/55">{ad.script[0].line}</p>
    </Panel>
  );
}

function ReachVisual({ study }: { study: GrowthCaseStudy }) {
  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        {study.funnel.audiences.map((a, ai) => (
          <div key={a.name} className="rounded-2xl border border-white/10 p-5">
            <p className="font-medium">{a.name}</p>
            <ul className="mt-4 space-y-2">
              {a.ads.map((ad, i) => (
                <motion.li
                  key={ad}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + (ai * 3 + i) * 0.08 }}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <span className="eyebrow text-(--accent)">0{ad + 1}</span> {study.ads[ad].angle}
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {["Facebook", "Instagram", "TikTok", "Format 9:16"].map((p) => (
          <span key={p} className="rounded-full bg-white/10 px-3 py-1.5 text-sm">
            {p}
          </span>
        ))}
      </div>
    </Panel>
  );
}

const split = [
  { share: 58, status: "gagnante" },
  { share: 42, status: "en test" },
  { share: 0, status: "coupée" },
];

function TestVisual({ study }: { study: GrowthCaseStudy }) {
  return (
    <Panel>
      <p className="eyebrow text-white/45">Part du budget · semaine 1 → 4</p>
      <ul className="mt-6 space-y-5">
        {split.map((v, i) => (
          <li key={i} className={v.share === 0 ? "opacity-40" : ""}>
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="flex min-w-0 items-center gap-3">
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${i === 0 ? "bg-(--accent) text-night" : "bg-white/10"}`}>
                  {"ABC"[i]}
                </span>
                <span className="truncate text-white/75">{study.ads[i].hook}</span>
              </span>
              <span className="shrink-0 font-serif text-2xl">{v.share}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: "33%" }}
                animate={{ width: `${v.share}%` }}
                transition={{ duration: 1.4, delay: 0.3, ease }}
                className={`h-full rounded-full ${i === 0 ? "bg-(--accent)" : "bg-white/50"}`}
              />
            </div>
            <p className="eyebrow mt-1.5 text-white/40">{v.status}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-white/35">Simulation illustrative.</p>
    </Panel>
  );
}

function ScoreVisual({ study }: { study: GrowthCaseStudy }) {
  const criteria = study.funnel.scoring;
  const score = criteria.filter((c) => c.met).reduce((s, c) => s + c.points, 0);
  const r = 34;
  const c = 2 * Math.PI * r;

  return (
    <Panel>
      <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
        <div className="relative mx-auto size-32">
          <svg viewBox="0 0 80 80" className="size-full -rotate-90">
            <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <motion.circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke="#34d399"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: c * (1 - score / 100) }}
              transition={{ duration: 1.2, delay: 0.2, ease }}
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-4xl leading-none">{score}</span>
            <span className="eyebrow text-emerald-400">{score >= 70 ? "Chaud" : score >= 40 ? "Tiède" : "Froid"}</span>
          </span>
        </div>
        <ul className="space-y-1.5 text-sm">
          {criteria.map((cr, i) => (
            <motion.li
              key={cr.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className={`flex justify-between rounded-lg px-3 py-2 ${cr.met ? "bg-white/[0.07]" : "text-white/35"}`}
            >
              <span>
                {cr.met ? "✓" : "·"} {cr.label}
              </span>
              <span className="font-mono text-xs">+{cr.points}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

function CloseVisual({ study }: { study: GrowthCaseStudy }) {
  const { booking } = study.funnel;
  const score = study.funnel.scoring.filter((c) => c.met).reduce((s, c) => s + c.points, 0);
  return (
    <Panel>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease }}
        className="rounded-2xl bg-white p-5 text-ink"
      >
        <div className="flex items-center justify-between">
          <p className="eyebrow text-ink/45">CRM · Nouveau rendez-vous</p>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">Score {score}</span>
        </div>
        <p className="mt-3 text-lg font-medium">{booking.title}</p>
        <p className="text-sm text-ink/55">{booking.when}</p>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-ink/10 pt-4 text-sm">
          <div>
            <dt className="eyebrow text-ink/40">Source</dt>
            <dd>
              Vidéo 0{booking.sourceAd + 1} · {study.ads[booking.sourceAd].angle}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-ink/40">Intérêt</dt>
            <dd>{booking.interest}</dd>
          </div>
        </dl>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease }}
        className="ml-auto mt-4 max-w-xs rounded-2xl rounded-br-sm bg-[#1f7a52] px-4 py-3 text-sm"
      >
        {study.community.thread[0].reply}
      </motion.p>
    </Panel>
  );
}
