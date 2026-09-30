"use client";

import type { CSSProperties } from "react";
import type { MotionValue } from "motion/react";
import { motion, useReducedMotion, useTransform } from "motion/react";

type Motif =
  | "speed"
  | "vinyl"
  | "sparks"
  | "blueprint"
  | "foil"
  | "emerald"
  | "tandem"
  | "chart"
  | "care"
  | "notes"
  | "constellation"
  | "tower";

type Theme = { accent: string; glow: string; motif: Motif };

const THEMES: Record<string, Theme> = {
  leapmotor: { accent: "#7ee8ff", glow: "rgba(74, 212, 255, 0.5)", motif: "speed" },
  "district-6": { accent: "#ff6b9d", glow: "rgba(255, 92, 138, 0.45)", motif: "vinyl" },
  "little-green-spark": { accent: "#8ee07a", glow: "rgba(125, 206, 106, 0.45)", motif: "sparks" },
  concorde: { accent: "#5ee4e4", glow: "rgba(62, 207, 207, 0.4)", motif: "blueprint" },
  "mandil-avocats": { accent: "#e4c37a", glow: "rgba(212, 179, 106, 0.45)", motif: "foil" },
  exelmans: { accent: "#5ec9a0", glow: "rgba(61, 139, 110, 0.42)", motif: "emerald" },
  "tandem-partners": { accent: "#ff6b6b", glow: "rgba(196, 59, 59, 0.4)", motif: "tandem" },
  "epargne-plurielle": { accent: "#f0d27a", glow: "rgba(232, 197, 107, 0.45)", motif: "chart" },
  "place-des-aines": { accent: "#ffc08a", glow: "rgba(240, 178, 122, 0.45)", motif: "care" },
  "ama-campus": { accent: "#6d8cff", glow: "rgba(59, 108, 255, 0.42)", motif: "notes" },
  "opco-ep": { accent: "#9b8cff", glow: "rgba(109, 94, 252, 0.42)", motif: "constellation" },
  "gato-tower": { accent: "#e4c37a", glow: "rgba(201, 164, 92, 0.5)", motif: "tower" },
};

const FALLBACK: Theme = { accent: "#4791ff", glow: "rgba(71, 102, 255, 0.4)", motif: "foil" };

/** CMS slugs can be longer than the theme keys ("district-6-publishing"), so a prefix matches too. */
export const projectTheme = (slug: string) =>
  THEMES[slug] ?? Object.entries(THEMES).find(([key]) => slug.startsWith(`${key}-`))?.[1] ?? FALLBACK;

export function ProjectHighlight({
  slug,
  mx,
  my,
}: {
  slug: string;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const still = useReducedMotion() ?? false;
  const theme = THEMES[slug] ?? FALLBACK;
  const lx = useTransform(mx, [-0.5, 0.5], ["12%", "88%"]);
  const ly = useTransform(my, [-0.5, 0.5], ["14%", "86%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{ "--hl": theme.accent, "--hl-glow": theme.glow } as CSSProperties}
    >
      <motion.div
        className="absolute size-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          left: lx,
          top: ly,
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 68%)`,
        }}
      />

      <svg className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]" viewBox="0 0 100 125" fill="none">
        <rect
          x="0.6"
          y="0.6"
          width="98.8"
          height="123.8"
          rx="8"
          pathLength={1}
          className="group-hover:animate-hl-draw"
          style={{
            stroke: theme.accent,
            strokeWidth: 0.7,
            strokeDasharray: 1,
            strokeDashoffset: still ? 0 : 1,
            opacity: 0.85,
          }}
        />
      </svg>

      {still ? null : <Motif motif={theme.motif} accent={theme.accent} />}
    </div>
  );
}

function Motif({ motif, accent }: { motif: Motif; accent: string }) {
  switch (motif) {
    case "speed":
      return (
        <>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute top-0 h-full w-16 animate-hl-streak bg-linear-to-r from-transparent via-white to-transparent opacity-70"
              style={{
                left: `${8 + i * 18}%`,
                animationDelay: `${i * 0.28}s`,
                mixBlendMode: "screen",
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
            />
          ))}
          <span className="absolute inset-y-8 right-4 flex flex-col justify-between">
            {Array.from({ length: 9 }, (_, i) => (
              <span
                key={i}
                className="block h-px origin-right animate-hl-draw bg-current"
                style={{
                  width: i % 3 === 0 ? 18 : 10,
                  color: accent,
                  opacity: 0.55,
                  animationDelay: `${0.12 * i}s`,
                }}
              />
            ))}
          </span>
        </>
      );
    case "vinyl":
      return (
        <>
          <span className="absolute left-1/2 top-[42%] size-40 -translate-x-1/2 -translate-y-1/2 animate-hl-spin rounded-full border border-white/10">
            <span className="absolute inset-4 rounded-full border border-current/40" style={{ color: accent }} />
            <span className="absolute inset-10 rounded-full border border-current/30" style={{ color: accent }} />
            <span className="absolute inset-[4.6rem] rounded-full bg-current" style={{ color: accent }} />
          </span>
          <span className="absolute inset-x-5 bottom-5 flex h-12 items-end justify-center gap-1">
            {[0.4, 0.9, 0.55, 1, 0.7, 0.35, 0.85, 0.5, 0.95, 0.6].map((h, i) => (
              <span
                key={i}
                className="w-1 origin-bottom animate-hl-eq rounded-full"
                style={{
                  height: `${h * 100}%`,
                  background: accent,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </span>
        </>
      );
    case "sparks":
      return (
        <>
          {SPARKS.map((s, i) => (
            <span
              key={i}
              className="absolute size-1.5 animate-hl-rise rounded-full"
              style={{
                left: s.x,
                bottom: s.y,
                background: accent,
                boxShadow: `0 0 10px ${accent}`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
              }}
            />
          ))}
          <span className="absolute right-6 top-8 font-serif text-4xl italic leading-none" style={{ color: accent }}>
            ✦
          </span>
        </>
      );
    case "blueprint":
      return (
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 125" fill="none">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`v${i}`} x1={12 + i * 11} y1="8" x2={12 + i * 11} y2="117" stroke={accent} strokeOpacity="0.16" strokeWidth="0.3" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`h${i}`} x1="8" y1={10 + i * 11} x2="92" y2={10 + i * 11} stroke={accent} strokeOpacity="0.16" strokeWidth="0.3" />
          ))}
          <path
            d="M22 98 L22 58 L40 42 L58 58 L58 98 Z"
            pathLength={1}
            className="group-hover:animate-hl-draw"
            stroke={accent}
            strokeWidth="0.7"
            strokeDasharray={1}
            strokeDashoffset={1}
          />
          <path
            d="M34 98 V72 H46 V98"
            pathLength={1}
            className="group-hover:animate-hl-draw"
            stroke={accent}
            strokeWidth="0.55"
            strokeDasharray={1}
            strokeDashoffset={1}
            style={{ animationDelay: "0.25s" }}
          />
        </svg>
      );
    case "foil":
      return (
        <>
          <span
            className="absolute inset-y-0 w-24 animate-hl-foil opacity-70"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              mixBlendMode: "screen",
            }}
          />
          <span className="absolute right-5 top-5 flex size-12 items-center justify-center rounded-full border border-current/70 font-serif text-lg" style={{ color: accent }}>
            §
          </span>
        </>
      );
    case "emerald":
      return (
        <>
          <span
            className="absolute inset-y-0 w-28 animate-hl-foil opacity-55"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              mixBlendMode: "screen",
              animationDuration: "2.4s",
            }}
          />
          <span className="absolute inset-6 grid grid-cols-3 grid-rows-4 gap-1.5 opacity-40">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="rounded-sm border" style={{ borderColor: accent }} />
            ))}
          </span>
        </>
      );
    case "tandem":
      return (
        <span className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 animate-hl-orbit">
          <span className="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 rounded-full" style={{ background: accent, boxShadow: `0 0 16px ${accent}` }} />
          <span className="absolute bottom-0 left-1/2 size-3.5 -translate-x-1/2 rounded-full bg-white/90" />
        </span>
      );
    case "chart":
      return (
        <svg className="absolute inset-x-4 bottom-6 h-28 w-[calc(100%-2rem)]" viewBox="0 0 120 60" fill="none">
          <path
            d="M4 48 C 22 46, 28 38, 40 34 S 58 36, 70 22 96 10, 116 8"
            pathLength={1}
            className="group-hover:animate-hl-draw"
            stroke={accent}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray={1}
            strokeDashoffset={1}
          />
          {[
            [40, 34],
            [70, 22],
            [116, 8],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.2" fill={accent} className="origin-center animate-hl-pulse" style={{ animationDelay: `${0.35 + i * 0.2}s` }} />
          ))}
        </svg>
      );
    case "care":
      return (
        <>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute bottom-[22%] left-1/2 size-24 -translate-x-1/2 animate-hl-pulse rounded-full border"
              style={{ borderColor: accent, animationDelay: `${i * 0.45}s` }}
            />
          ))}
        </>
      );
    case "notes":
      return (
        <>
          <span className="absolute inset-x-6 top-1/3 space-y-3 opacity-50">
            {[72, 88, 64].map((w, i) => (
              <span
                key={i}
                className="block h-1 origin-left scale-x-[0.15] rounded-full transition-transform duration-700 group-hover:scale-x-100"
                style={{
                  width: `${w}%`,
                  background: i === 1 ? accent : "rgba(255,255,255,0.35)",
                  transitionDelay: `${0.1 + i * 0.12}s`,
                }}
              />
            ))}
          </span>
          <span
            className="absolute left-[18%] top-[38%] h-8 w-[54%] -rotate-2 rounded-sm opacity-40"
            style={{ background: accent }}
          />
        </>
      );
    case "constellation":
      return (
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 125">
          <path
            d="M22 38 L48 28 L72 46 L58 72 L30 68 Z"
            pathLength={1}
            className="group-hover:animate-hl-draw"
            fill="none"
            stroke={accent}
            strokeWidth="0.55"
            strokeDasharray={1}
            strokeDashoffset={1}
          />
          {[
            [22, 38],
            [48, 28],
            [72, 46],
            [58, 72],
            [30, 68],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="1.8" fill={accent} className="animate-hl-pulse" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </svg>
      );
    case "tower":
      return (
        <>
          <span
            className="absolute inset-x-[28%] top-0 h-full animate-hl-scan"
            style={{
              background: `linear-gradient(180deg, transparent, ${accent}, transparent)`,
              mixBlendMode: "screen",
            }}
          />
          <span className="absolute inset-x-10 bottom-8 top-16 opacity-50" style={{ background: `linear-gradient(180deg, transparent, ${accent})` }} />
        </>
      );
  }
}

const SPARKS = [
  { x: "18%", y: "22%", delay: 0, dur: 2.1 },
  { x: "32%", y: "10%", delay: 0.35, dur: 2.6 },
  { x: "48%", y: "28%", delay: 0.7, dur: 2.2 },
  { x: "61%", y: "8%", delay: 0.15, dur: 2.8 },
  { x: "74%", y: "24%", delay: 0.9, dur: 2.3 },
  { x: "27%", y: "40%", delay: 1.1, dur: 2.5 },
  { x: "55%", y: "36%", delay: 0.5, dur: 2.4 },
  { x: "80%", y: "42%", delay: 0.25, dur: 2.7 },
];
