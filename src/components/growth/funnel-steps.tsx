"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { useStill } from "../site/use-still";
import { growthCopy } from "./copy";
import { SECTION_IDS, type SectionKey } from "./types";

export type FunnelStage = {
  _key: string;
  name: string | null;
  icon: string | null;
  title: string | null;
  text: string | null;
  tasks: string[] | null;
  kpi: string | null;
  section: string | null;
};

const ICONS: Record<string, string> = {
  strategy: "M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 11a1 1 0 1 0 1 1M14 10l7-7M17 3h4v4",
  production: "M3 7h12v10H3zM15 10l6-3v10l-6-3",
  launch: "M6 4v16M18 4v16M6 8h12M6 16h12",
  optimize: "M3 20h18M6 16v-4M11 16V8M16 16v-6M20 4l-5 4-4-2-5 4",
  score: "M4 15a8 8 0 1 1 16 0M12 15l4-5M12 15h.01",
  sales: "M3 12l4-4 4 3 3-3 7 6M7 8v8l4 3 4-3",
  community: "M4 5h16v10H9l-5 4V5zM8 9h8M8 12h5",
};

function StageIcon({ name, className = "" }: { name: string | null; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={ICONS[name ?? ""] ?? ICONS.strategy} />
    </svg>
  );
}

const isSection = (s: string | null): s is SectionKey => Boolean(s && s in SECTION_IDS);

/**
 * The template's signature: a funnel that narrows from left to right, one segment per stage. On
 * large screens the section is pinned and scrolling walks through the stages, filling the funnel
 * as it goes; each stage links down to the section that shows it in detail. Phones get the
 * stages as a narrowing stack.
 */
export function FunnelSteps({ heading, intro, stages }: { heading: string | null; intro: string | null; stages: FunnelStage[] }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const n = stages.length;

  // Progress through the pinned section, measured from its position (0 when it pins, 1 when it unpins).
  useMotionValueEvent(scrollY, "change", () => {
    const el = ref.current;
    if (!el || el.offsetParent === null) return;
    const r = el.getBoundingClientRect();
    const p = -r.top / Math.max(1, r.height - window.innerHeight);
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n))));
  });

  /** Scroll to the point of the pinned section where stage `i` is shown. */
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const y = top + travel * ((Math.max(0, Math.min(n - 1, i)) + 0.5) / n);
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id={SECTION_IDS.funnel} className="relative bg-night text-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(50%_50%_at_30%_30%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 pt-28 md:px-10 md:pt-36">
        {heading && <RevealHeading text={heading} accentClassName="italic text-(--accent)" className="max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl" />}
        {intro && (
          <FadeIn>
            <p className="mt-6 max-w-xl text-white/60 md:text-lg">{intro}</p>
          </FadeIn>
        )}
      </div>

      {/* Phones and tablets: a narrowing stack, every stage readable without interaction. */}
      <ol className="relative mx-auto mt-14 flex max-w-7xl flex-col items-center gap-3 px-5 pb-28 lg:hidden">
        {stages.map((s, i) => (
          <motion.li
            key={s._key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.04, ease }}
            className="w-full rounded-3xl border border-white/10 bg-night-soft p-5"
            style={{ maxWidth: `${100 - i * (36 / Math.max(1, n - 1))}%` }}
          >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-(--accent) text-night">
                  <StageIcon name={s.icon} className="size-5" />
                </span>
                <span>
                  <span className="eyebrow text-white/40">0{i + 1}</span>
                  <span className="block font-serif text-2xl leading-none">{s.name}</span>
                </span>
              </div>
              {s.title && <p className="mt-4 font-medium">{s.title}</p>}
              {s.text && <p className="mt-1 text-sm text-white/60">{s.text}</p>}
              {isSection(s.section) && (
                <a href={`#${SECTION_IDS[s.section]}`} className="mt-3 inline-block text-sm text-(--accent) underline-offset-4 hover:underline">
                  {c.seeHow} ↓
                </a>
              )}
          </motion.li>
        ))}
      </ol>

      {/* Desktop: pinned, scroll-driven. */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${60 + n * 55}vh` }}>
        <div className="sticky top-0 flex h-svh flex-col justify-center px-10">
          <div className="mx-auto w-full max-w-7xl">
            <FunnelChart stages={stages} active={active} onSelect={goTo} />
            <StageDetail stage={stages[active]} index={active} count={n} onPrev={() => goTo(active - 1)} onNext={() => goTo(active + 1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Funnel height (SVG units) at stage boundary `i`: 220 at the mouth, narrowing to 70. */
const edge = (i: number, n: number) => 220 - (150 * i) / n;

function FunnelChart({ stages, active, onSelect }: { stages: FunnelStage[]; active: number; onSelect: (i: number) => void }) {
  const still = useStill();
  const n = stages.length;
  const width = 1000;
  const step = width / n;
  const mid = 110;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} 220`} className="block w-full" aria-hidden>
        {stages.map((s, i) => {
          const x0 = i * step + (i ? 3 : 0);
          const x1 = (i + 1) * step - 3;
          const h0 = edge(i, n) / 2;
          const h1 = edge(i + 1, n) / 2;
          return (
            <motion.path
              key={s._key}
              d={`M${x0} ${mid - h0} L${x1} ${mid - h1} L${x1} ${mid + h1} L${x0} ${mid + h0} Z`}
              fill="var(--accent)"
              stroke="var(--accent)"
              strokeOpacity={0.35}
              initial={false}
              animate={{ fillOpacity: i === active ? 1 : i < active ? 0.4 : 0.1 }}
              transition={{ duration: 0.5, ease }}
            />
          );
        })}
        {!still && (
          <motion.circle
            r="4"
            cx={0}
            cy={mid}
            fill="white"
            animate={{ x: [0, width] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 6px white)" }}
          />
        )}
      </svg>
      <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {stages.map((s, i) => (
          <button
            key={s._key}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={i === active ? "step" : undefined}
            className={`flex flex-col items-center justify-center gap-1.5 text-center transition-colors ${i === active ? "text-night" : "text-white/75 hover:text-white"}`}
          >
            <StageIcon name={s.icon} className="size-6" />
            <span className="font-serif text-xl leading-none xl:text-2xl">{s.name}</span>
            <span className="eyebrow opacity-60">0{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StageDetail({ stage, index, count, onPrev, onNext }: { stage: FunnelStage; index: number; count: number; onPrev: () => void; onNext: () => void }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  return (
    <div className="mt-8 rounded-[2rem] border border-white/10 bg-night-soft p-8 xl:p-10">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stage._key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease }}
          className="grid gap-10 lg:grid-cols-[auto_1fr_1fr]"
          aria-live="polite"
        >
          <span className="font-serif text-8xl leading-none text-(--accent)">0{index + 1}</span>
          <div>
            <p className="eyebrow text-white/45">
              {c.stage} {index + 1} / {count} · {stage.name}
            </p>
            {stage.title && <h3 className="mt-3 font-serif text-4xl leading-[1]">{stage.title}</h3>}
            {stage.text && <p className="mt-4 text-white/65">{stage.text}</p>}
          </div>
          <div>
            {stage.tasks && stage.tasks.length > 0 && (
              <ul className="space-y-2.5">
                {stage.tasks.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-(--accent) text-[11px] text-night">✓</span>
                    <span className="text-white/85">{t}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {stage.kpi && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm">
                  <span className="eyebrow text-white/45">{c.measuredBy}</span> {stage.kpi}
                </span>
              )}
              {isSection(stage.section) && (
                <a href={`#${SECTION_IDS[stage.section]}`} className="text-sm text-(--accent) underline-offset-4 hover:underline">
                  {c.seeHow} ↓
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: count }, (_, i) => (
            <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-(--accent)" : i < index ? "w-3 bg-(--accent)/50" : "w-3 bg-white/15"}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onPrev} disabled={index === 0} aria-label={c.stagePrev} className="flex size-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 disabled:opacity-30">
            ←
          </button>
          <button type="button" onClick={onNext} disabled={index === count - 1} aria-label={c.stageNext} className="flex size-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 disabled:opacity-30">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
