"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useStill } from "./use-still";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ease } from "./content";
import { useLocale } from "./locale";
import { RevealHeading } from "./reveal";

type Tool = { name: string; logo: string; bg: string; fullBleed?: boolean };

const TOOLS: Tool[] = [
  { name: "Webflow", logo: "/images/tools/webflow.svg", bg: "#146EF5" },
  { name: "Figma", logo: "/images/tools/figma.svg", bg: "#1E1E1E" },
  { name: "n8n", logo: "/images/tools/n8n.svg", bg: "#EA4B71" },
  { name: "Notion", logo: "/images/tools/notion.svg", bg: "#FFFFFF" },
  { name: "HubSpot", logo: "/images/tools/hubspot.svg", bg: "#FF7A59" },
  { name: "Twenty", logo: "/images/tools/twenty.svg", bg: "#141414" },
  { name: "Granola", logo: "/images/tools/granola.png", bg: "#A8C43A", fullBleed: true },
  { name: "Finsweet", logo: "/images/tools/finsweet.png", bg: "#141414", fullBleed: true },
];

function ToolLogo({ tool, size }: { tool: Tool; size: number }) {
  const glyph = tool.fullBleed ? size : Math.round(size * 0.5);
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden ring-1 ring-white/10"
      style={{ width: size, height: size, borderRadius: size * 0.28, background: tool.bg }}
    >
      <Image src={tool.logo} alt="" width={glyph} height={glyph} className="object-contain" />
    </span>
  );
}

export function Convictions() {
  const { t } = useLocale();
  const c = t.convictions;
  const still = useStill();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const Visual = [BuildVisual, ToolsVisual, UnderstandVisual][active];

  return (
    <section className="relative overflow-hidden bg-night pt-28 text-white md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_100%_30%,rgba(54,71,245,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <p className="eyebrow text-brand-sky">{c.eyebrow}</p>
        <RevealHeading
          text={c.heading}
          className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl"
        />

        <div
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          className="mt-16 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
        >
          <ol className="border-t border-white/10">
            {c.items.map((item, i) => {
              const on = i === active;
              return (
                <li
                  key={item.title}
                  className="relative border-b border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={on}
                    className="group flex w-full items-start gap-5 py-7 text-left"
                  >
                    <span
                      className={`eyebrow pt-2 transition-colors ${on ? "text-brand-sky" : "text-white/35"}`}
                    >
                      0{i + 1}.
                    </span>
                    <span
                      className={`font-serif text-3xl leading-[1.05] transition-colors duration-500 md:text-4xl ${
                        on
                          ? "text-white"
                          : "text-white/40 group-hover:text-white/75"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-lg pb-8 pl-10 text-white/60 md:pl-11">
                          {item.text}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {on && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-px h-px overflow-hidden"
                    >
                      <span
                        key={active}
                        onAnimationEnd={() =>
                          setActive((active + 1) % c.items.length)
                        }
                        style={{
                          animationPlayState: paused ? "paused" : "running",
                        }}
                        className={`block h-full origin-left bg-linear-to-r from-brand-deep to-brand-sky ${
                          still ? "" : "animate-progress"
                        }`}
                      />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-night-soft md:min-h-[520px] lg:sticky lg:top-28 lg:self-start lg:min-h-[540px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_60%_40%,rgba(54,71,245,0.22),transparent_70%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px] [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]"
            />
            <div className="absolute left-7 top-7 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </div>
            <span className="eyebrow absolute right-7 top-7 text-white/35">
              0{active + 1} / 03
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease }}
                className="absolute inset-0 flex flex-col justify-center p-5 pt-16 md:p-10 md:pt-20"
              >
                <Visual still={still} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <DisciplineMarquee words={c.disciplines} />
    </section>
  );
}

const STAGE_W = 520;
const STAGE_H = 420;

function useTimeline(durations: number[], still: boolean, restStep: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setTimeout(() => setTick((t) => t + 1), durations[tick % durations.length]);
    return () => clearTimeout(id);
  }, [tick, still, durations]);
  return still
    ? { step: restStep, cycle: 0 }
    : { step: tick % durations.length, cycle: Math.floor(tick / durations.length) };
}

function useLoopCount(delay: number, still: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setCount((c) => c + 1), delay);
    return () => clearInterval(id);
  }, [delay, still]);
  return count;
}

function Stage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setScale(Math.min(1.1, entry.contentRect.width / STAGE_W)),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="w-full">
      <div className="mx-auto" style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
        <div
          className="relative origin-top-left"
          style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const ICONS = {
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </>
  ),
  code: (
    <>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </>
  ),
};

function Icon({ children, className = "size-4" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

function Hand() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-12 drop-shadow-[0_10px_22px_rgba(71,102,255,0.55)]"
      fill="none"
      stroke="#091447"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g fill="#fff" stroke="none">
        <circle cx="8" cy="9" r="2" />
        <circle cx="12" cy="8" r="2" />
        <circle cx="16" cy="9" r="2" />
        <circle cx="20" cy="11" r="2" />
        <circle cx="4" cy="14" r="2" />
        <rect x="6" y="9" width="12" height="6" />
        <rect x="18" y="11" width="4" height="4" />
        <path d="M2 14h20a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8z" />
      </g>
      <path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />
      <path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" />
      <path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0" />
    </svg>
  );
}

function Cursor({
  x,
  y,
  grab,
  hidden,
  duration,
}: {
  x: number;
  y: number;
  grab: boolean;
  hidden?: boolean;
  duration: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-30"
      initial={false}
      animate={{ x, y, scale: grab ? 0.86 : 1, rotate: grab ? -10 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration, ease }}
    >
      <Hand />
    </motion.div>
  );
}

function cardShadow(lifted: boolean) {
  return lifted
    ? "0 34px 60px -20px rgba(0,0,0,0.75), 0 0 0 1px rgba(71,102,255,0.6), 0 0 50px -12px rgba(71,102,255,0.7)"
    : "0 18px 40px -22px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)";
}

function Glow({ className }: { className: string }) {
  return <div className={`pointer-events-none absolute rounded-full bg-brand/40 blur-3xl ${className}`} />;
}

const BUILD_MS = [1500, 500, 300, 800, 450, 400, 400, 400, 400, 2000, 500];
const FRAME = { x: 206, y: 14, w: 314, h: 392 };
const NOTE = { w: 224, h: 124 };
const BUILD_PROJECTS = [
  { name: "Exelmans", image: "/images/gallery/exelmans.jpg" },
  { name: "OPCO EP", image: "/images/gallery/opco-ep.jpg" },
  { name: "AMA Campus", image: "/images/gallery/ama-campus.jpg" },
];

function BuildVisual({ still }: { still: boolean }) {
  const b = useLocale().t.convictions.build;
  const { step, cycle } = useTimeline(BUILD_MS, still, 9);
  const idea = b.ideas[cycle % b.ideas.length];
  const project = BUILD_PROJECTS[cycle % BUILD_PROJECTS.length];
  const grab = step === 2 || step === 3;
  const dropped = step >= 4;
  const revealed = step >= 5 && step < 10;
  const done = step >= 9 && step < 10;

  const note = step === 3
    ? { x: 236, y: 150, rotate: -10, scale: 1.04, opacity: 1 }
    : dropped
      ? { x: 250, y: 190, rotate: -4, scale: 0.3, opacity: 0 }
      : { x: -4, y: 36, rotate: -6, scale: grab ? 1.04 : 1, opacity: 1 };

  const hand = step === 0
    ? { x: 236, y: 120 }
    : step <= 2
      ? { x: 162, y: 96 }
      : step === 3
        ? { x: 400, y: 210 }
        : { x: 150, y: 150 };

  return (
    <Stage>
      <Glow className="left-[240px] top-[120px] h-56 w-64" />

      <div
        className="absolute overflow-hidden rounded-[24px] border border-white/15 bg-night-soft"
        style={{ left: FRAME.x, top: FRAME.y, width: FRAME.w, height: FRAME.h }}
      >
        <motion.div
          className="absolute inset-3 flex items-center justify-center rounded-[18px] border border-dashed"
          animate={{
            opacity: revealed ? 0 : 1,
            borderColor: step === 3 ? "rgba(71,145,255,0.8)" : "rgba(255,255,255,0.15)",
            backgroundColor: step === 3 ? "rgba(71,102,255,0.1)" : "rgba(71,102,255,0)",
          }}
          transition={{ duration: 0.35, ease }}
        >
          <span className="flex size-12 items-center justify-center rounded-full border border-white/15 text-2xl text-white/50">
            +
          </span>
        </motion.div>

        <motion.div
          key={cycle}
          className="absolute inset-0"
          initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
          animate={
            revealed
              ? { clipPath: "inset(0% 0 0 0)", scale: 1, opacity: 1 }
              : { clipPath: "inset(100% 0 0 0)", scale: 1.15, opacity: step === 10 ? 0 : 1 }
          }
          transition={{ duration: 1.1, ease }}
        >
          <Image src={project.image} alt="" fill sizes="340px" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-night via-night/20 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute inset-x-5 bottom-5"
          initial={false}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 12 }}
          transition={{ duration: 0.45, ease }}
        >
          <p className="eyebrow text-[9px] text-brand-sky">{b.prompt} → Live</p>
          <p className="mt-1.5 font-serif text-[30px] leading-none">{project.name}</p>
          <span className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/75 backdrop-blur">
            <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
            <span className="truncate">{idea}</span>
          </span>
        </motion.div>
      </div>

      <motion.span
        className="absolute z-20 flex items-center gap-1.5 rounded-full bg-emerald-400 px-3 py-1.5 text-xs font-medium text-night shadow-[0_0_30px_-4px_rgba(52,211,153,0.8)]"
        style={{ left: FRAME.x + FRAME.w - 116, top: FRAME.y + 16 }}
        initial={false}
        animate={{ opacity: done ? 1 : 0, scale: done ? 1 : 0.6 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
      >
        <span className="size-1.5 rounded-full bg-night" /> {b.status}
      </motion.span>

      <ul className="absolute left-0 w-[180px] space-y-2.5" style={{ top: 214 }}>
        {b.stack.map((layer, i) => {
          const ticked = step >= 5 + i && step < 10;
          return (
            <li
              key={layer}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-[12px] transition-all duration-500 ${
                ticked ? "border-brand/50 bg-brand/15 text-white" : "border-white/10 text-white/35"
              }`}
            >
              <span
                className={`flex size-4 shrink-0 items-center justify-center rounded-full text-[9px] transition-colors duration-500 ${
                  ticked ? "bg-brand-sky text-night" : "border border-white/20"
                }`}
              >
                {ticked ? "✓" : ""}
              </span>
              {layer}
            </li>
          );
        })}
      </ul>

      <motion.div
        key={`note-${cycle}`}
        className="absolute left-0 top-0 z-10 rounded-[18px] bg-paper p-4 text-ink"
        style={{ width: NOTE.w, height: NOTE.h }}
        initial={{ x: -4, y: 56, rotate: -6, opacity: 0, boxShadow: cardShadow(false) }}
        animate={{ ...note, boxShadow: cardShadow(grab) }}
        transition={{ duration: step === 3 ? 0.8 : 0.4, ease }}
      >
        <p className="eyebrow flex items-center gap-2 text-[9px] text-ink/60">
          <span className="size-1.5 animate-pulse rounded-full bg-brand" />
          {b.prompt}
        </p>
        <motion.p
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 0.2, duration: 1, ease }}
          className="mt-2 font-serif text-[23px] leading-[1.02]"
        >
          {idea}
        </motion.p>
      </motion.div>

      <Cursor x={hand.x} y={hand.y} grab={grab} hidden={step === 10} duration={step === 3 ? 0.8 : 0.5} />
    </Stage>
  );
}

const TOOL_MS = [700, ...[0, 1, 2].flatMap(() => [550, 300, 800]), 1900, 500];
const ORBIT = { cx: 260, cy: 212, rx: 232, ry: 176 };
const TOKEN = 52;
const NEED_CARD = { x: 126, y: 140, w: 268, h: 144 };
const PILL = { w: 74, h: 30 };

function tokenAt(i: number) {
  const angle = ((-67.5 + i * 45) * Math.PI) / 180;
  return {
    x: ORBIT.cx + ORBIT.rx * Math.cos(angle) - TOKEN / 2,
    y: ORBIT.cy + ORBIT.ry * Math.sin(angle) - TOKEN / 2,
  };
}

const slotAt = (k: number) => ({
  x: NEED_CARD.x + 14 + k * (PILL.w + 6),
  y: NEED_CARD.y + NEED_CARD.h - 14 - PILL.h,
});

function ToolsVisual({ still }: { still: boolean }) {
  const tools = useLocale().t.convictions.tools;
  const { step, cycle } = useTimeline(TOOL_MS, still, 10);
  const need = tools.needs[cycle % tools.needs.length];
  const picked = need.tools.map((name) => TOOLS.findIndex((tool) => tool.name === name));
  const placed = picked.filter((_, k) => step >= 4 + 3 * k).length;
  const done = step >= 10;
  const fading = step === 11;

  const moving = step >= 1 && step <= 9;
  const k = Math.floor((step - 1) / 3);
  const sub = (step - 1) % 3;
  const target = moving ? picked[k] : -1;
  const hand = !moving
    ? { x: 372, y: 296 }
    : sub < 2
      ? { x: tokenAt(target).x + 14, y: tokenAt(target).y + 12 }
      : { x: slotAt(k).x + PILL.w - 26, y: slotAt(k).y - 4 };
  const beam = moving && sub < 2 ? tokenAt(target) : null;

  return (
    <Stage>
      <Glow className="left-[150px] top-[130px] h-40 w-56" />

      <svg className="absolute inset-0" width={STAGE_W} height={STAGE_H} fill="none">
        <motion.ellipse
          cx={ORBIT.cx}
          cy={ORBIT.cy}
          rx={ORBIT.rx}
          ry={ORBIT.ry}
          stroke="rgba(255,255,255,0.12)"
          strokeDasharray="3 7"
          animate={still ? undefined : { strokeDashoffset: [0, -100] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />
        <ellipse
          cx={ORBIT.cx}
          cy={ORBIT.cy}
          rx={ORBIT.rx * 0.72}
          ry={ORBIT.ry * 0.72}
          stroke="rgba(71,145,255,0.12)"
        />
        {beam && (
          <motion.line
            key={`${cycle}-${k}`}
            x1={beam.x + TOKEN / 2}
            y1={beam.y + TOKEN / 2}
            x2={ORBIT.cx}
            y2={ORBIT.cy}
            stroke="url(#beam)"
            strokeWidth={1.5}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease }}
          />
        )}
        <defs>
          <linearGradient id="beam" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={STAGE_W} y2={STAGE_H}>
            <stop stopColor="#4791ff" />
            <stop offset="1" stopColor="#3647f5" />
          </linearGradient>
        </defs>
      </svg>

      {TOOLS.map((tool, i) => {
        const slot = picked.indexOf(i);
        const taken = slot >= 0 && step >= 2 + 3 * slot && !fading;
        const p = tokenAt(i);
        return (
          <div
            key={tool.name}
            className="absolute flex flex-col items-center gap-1.5"
            style={{ left: p.x - 14, top: p.y, width: TOKEN + 28 }}
          >
            <span
              className={`rounded-[16px] transition-all duration-500 ${
                taken
                  ? "opacity-25 outline outline-1 outline-dashed outline-offset-4 outline-brand-sky/60"
                  : target === i
                    ? "scale-110 shadow-[0_0_34px_-2px_rgba(71,102,255,0.95)]"
                    : "opacity-85"
              }`}
            >
              <ToolLogo tool={tool} size={TOKEN} />
            </span>
            <span className={`text-[11px] transition-colors duration-500 ${taken ? "text-brand-sky" : "text-white/55"}`}>
              {tool.name}
            </span>
          </div>
        );
      })}

      <div
        className="absolute rounded-[20px] bg-paper p-4 text-ink"
        style={{
          left: NEED_CARD.x,
          top: NEED_CARD.y,
          width: NEED_CARD.w,
          height: NEED_CARD.h,
          boxShadow: cardShadow(false),
        }}
      >
        <div className="flex items-center justify-between">
          <p className="eyebrow text-[9px] text-ink/60">{tools.label}</p>
          <span
            className={`rounded-full px-2 py-0.5 font-mono text-[10px] transition-colors duration-500 ${
              done ? "bg-emerald-500/15 text-emerald-700" : "bg-brand/15 text-brand-deep"
            }`}
          >
            {done ? "✓ " : ""}
            {placed}/3
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={need.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="mt-2 font-serif text-[30px] leading-none"
          >
            {need.label}
          </motion.p>
        </AnimatePresence>
        <div className="absolute bottom-3.5 left-3.5 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="rounded-full border border-dashed border-ink/20"
              style={{ width: PILL.w, height: PILL.h }}
            />
          ))}
        </div>
      </div>

      {picked.map((toolIndex, slot) => {
        const base = 1 + 3 * slot;
        const visible = step >= base + 1 && !fading;
        const flying = step === base + 2;
        const landed = step >= base + 2;
        const from = tokenAt(toolIndex);
        const to = slotAt(slot);
        const tool = TOOLS[toolIndex];
        return (
          <motion.div
            key={`${cycle}-${tool.name}`}
            className={`absolute left-0 top-0 z-20 flex items-center overflow-hidden ${
              landed ? "justify-start gap-1.5 bg-white pl-1 pr-2 text-ink ring-1 ring-ink/10" : "justify-center"
            }`}
            initial={{ x: from.x, y: from.y, width: TOKEN, height: TOKEN, borderRadius: 15, opacity: 0 }}
            animate={{
              x: landed ? to.x : from.x,
              y: landed ? to.y : from.y,
              width: landed ? PILL.w : TOKEN,
              height: landed ? PILL.h : TOKEN,
              opacity: visible ? 1 : 0,
              scale: flying || step === base + 1 ? 1.1 : 1,
              rotate: flying ? -8 : 0,
              boxShadow: cardShadow(flying || step === base + 1),
            }}
            transition={{ duration: flying ? 0.75 : 0.35, ease }}
          >
            {landed ? (
              <>
                <ToolLogo tool={tool} size={22} />
                <span className="truncate text-[11px] font-medium">{tool.name}</span>
              </>
            ) : (
              <ToolLogo tool={tool} size={TOKEN} />
            )}
          </motion.div>
        );
      })}

      <motion.p
        className="absolute inset-x-0 text-center text-[13px] text-white/60"
        style={{ top: NEED_CARD.y + NEED_CARD.h + 14 }}
        initial={false}
        animate={{ opacity: done && !fading ? 1 : 0, y: done ? 0 : 6 }}
        transition={{ duration: 0.4, ease }}
      >
        {tools.note}
      </motion.p>

      <Cursor x={hand.x} y={hand.y} grab={moving && sub >= 1} hidden={fading} duration={moving && sub === 2 ? 0.75 : 0.5} />
    </Stage>
  );
}

const UNDERSTAND_MS = [600, ...[0, 1, 2, 3].flatMap(() => [500, 800, 350]), 1900, 500];
const LAYER = { x: 200, w: 300, h: 56 };
const HELD = { x: 200, y: 16 };
const layerY = (i: number) => 354 - i * 64;

function UnderstandVisual({ still }: { still: boolean }) {
  const u = useLocale().t.convictions.understand;
  const { step, cycle } = useTimeline(UNDERSTAND_MS, still, 13);
  const loops = useLoopCount(1100, still);
  const icons = [ICONS.search, ICONS.compass, ICONS.grid, ICONS.code];
  const layers = u.good.steps;
  const placed = layers.filter((_, i) => step >= 3 + 3 * i).length;
  const done = step >= 13;
  const fading = step === 14;

  const active = step >= 1 && step <= 12 ? Math.floor((step - 1) / 3) : -1;
  const sub = (step - 1) % 3;
  const grab = active >= 0 && sub < 2;
  const hand =
    active < 0
      ? done
        ? { x: 466, y: 390 }
        : { x: 446, y: 60 }
      : sub === 0
        ? { x: HELD.x + 248, y: HELD.y + 18 }
        : sub === 1
          ? { x: LAYER.x + 248, y: layerY(active) + 18 }
          : { x: 446, y: 80 };

  return (
    <Stage>
      <p className="eyebrow absolute left-0 top-2 w-44 text-[10px] leading-relaxed text-brand-sky">{u.good.label}</p>
      <p className="absolute left-0 top-12 font-serif text-[72px] leading-none">
        0{placed}
        <span className="text-white/30">/04</span>
      </p>

      <motion.div
        className="absolute rounded-full bg-brand/50 blur-3xl"
        style={{ left: LAYER.x + 20, top: 250, width: LAYER.w - 40, height: 140 }}
        initial={false}
        animate={{ opacity: done && !fading ? 1 : 0.25 }}
        transition={{ duration: 0.6, ease }}
      />

      {layers.map((label, i) => (
        <div
          key={`slot-${label}`}
          className="absolute rounded-2xl border border-dashed border-white/10"
          style={{ left: LAYER.x, top: layerY(i), width: LAYER.w, height: LAYER.h }}
        />
      ))}

      {layers.map((label, i) => {
        const base = 1 + 3 * i;
        const visible = step >= base && !fading;
        const inPlace = step >= base + 1;
        const dragging = step === base + 1;
        const lifted = step === base || dragging;
        return (
          <motion.div
            key={`${cycle}-${label}`}
            className="absolute left-0 top-0 z-10 flex items-center gap-3 rounded-2xl bg-paper px-4 text-ink"
            style={{ width: LAYER.w, height: LAYER.h }}
            initial={{ x: HELD.x, y: HELD.y - 16, rotate: 6, opacity: 0, boxShadow: cardShadow(true) }}
            animate={{
              x: inPlace ? LAYER.x : HELD.x,
              y: inPlace ? layerY(i) : HELD.y,
              rotate: inPlace && !dragging ? 0 : dragging ? -4 : 6,
              scale: lifted ? 1.03 : 1,
              opacity: visible ? 1 : 0,
              boxShadow: cardShadow(lifted),
            }}
            transition={{ duration: dragging ? 0.8 : 0.4, ease }}
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand/12 text-brand-deep">
              <Icon>{icons[i]}</Icon>
            </span>
            <span className="font-serif text-[21px] leading-none">{label}</span>
            <span className="ml-auto font-mono text-[10px] text-ink/35">0{i + 1}</span>
          </motion.div>
        );
      })}

      <motion.span
        className="absolute z-20 flex items-center gap-1.5 rounded-full bg-emerald-400 px-3.5 py-1.5 text-sm font-medium text-night shadow-[0_0_36px_-4px_rgba(52,211,153,0.85)]"
        style={{ left: LAYER.x + LAYER.w / 2 - 56, top: layerY(3) - 52 }}
        initial={false}
        animate={{ opacity: done && !fading ? 1 : 0, y: done && !fading ? 0 : 14, scale: done && !fading ? 1 : 0.7 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        ✓ {u.good.end}
      </motion.span>

      <div className="absolute bottom-0 left-0 w-[176px] rounded-[18px] border border-rose-400/25 bg-rose-400/[0.06] p-4">
        <p className="eyebrow text-[9px] leading-relaxed text-rose-300/80">{u.bad.label}</p>
        <div className="mt-3 h-8 overflow-hidden">
          <motion.p
            key={loops}
            initial={{ y: 24, opacity: 0, rotate: -3 }}
            animate={{ y: 0, opacity: 1, rotate: loops % 2 ? 2 : -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="font-serif text-[26px] leading-8 text-white/80"
          >
            {u.bad.steps[loops % u.bad.steps.length]}
          </motion.p>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-rose-300">
          ↺ {u.bad.end}
          <span className="font-mono text-[10px] text-rose-300/60">×{loops}</span>
        </p>
      </div>

      <Cursor x={hand.x} y={hand.y} grab={grab} hidden={fading} duration={sub === 1 ? 0.8 : 0.5} />
    </Stage>
  );
}

function DisciplineMarquee({ words }: { words: string[] }) {
  const row = [...words, ...words];

  return (
    <div
      aria-hidden
      className="mt-28 space-y-2 border-y border-white/10 py-8 md:mt-36 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
    >
      {[0, 1].map((r) => (
        <div key={r} className="marquee-row flex overflow-hidden">
          <ul
            className={`flex w-max shrink-0 items-center ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"}`}
          >
            {[...row, ...row].map((word, i) => (
              <li
                key={i}
                className={`flex items-center gap-8 pr-8 font-serif text-5xl leading-none md:text-7xl ${
                  (i + r) % 2
                    ? "italic text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]"
                    : "text-white/85"
                }`}
              >
                {word}
                <span className="text-2xl text-brand-sky not-italic">✦</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
