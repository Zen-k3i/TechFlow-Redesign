"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import { ease } from "./content";
import { useLocale } from "./locale";

const paint = {
  on: { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"], transition: { duration: 1, delay: 0.35, ease } },
  off: { clipPath: "inset(0 0% 0 0)" },
};

const handles = ["-left-[5px] -top-[5px]", "-right-[5px] -top-[5px]", "-left-[5px] -bottom-[5px]", "-right-[5px] -bottom-[5px]"];

/** Outlined word that gets painted in, inside a Figma-style selection frame. */
export function DesignWord({ text, on }: { text: string; on: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setSize({ w: el.offsetWidth, h: el.offsetHeight }));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="relative inline-block">
      <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(71,145,255,0.9)]">{text}</span>
      <motion.span
        variants={paint}
        initial={false}
        animate={on ? "on" : "off"}
        className="absolute inset-0 bg-linear-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent"
      >
        {text}
      </motion.span>

      <AnimatePresence>
        {on && (
          <motion.span
            key="frame"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease }}
            className="pointer-events-none absolute -inset-x-[0.08em] -bottom-[0.04em] top-[0.1em] border-[1.5px] border-brand-sky"
          >
            {handles.map((h) => (
              <span key={h} className={`absolute size-2 border-[1.5px] border-brand-sky bg-white ${h}`} />
            ))}
            <span className="absolute bottom-full left-0 mb-2 rounded bg-brand-sky px-1.5 py-1 font-sans text-[11px] font-medium not-italic leading-none tracking-normal text-white">
              {size.w} × {size.h}
            </span>
            <motion.span
              initial={{ x: 70, y: 50, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="absolute left-full top-full z-10 flex items-start font-sans text-xs not-italic leading-none tracking-normal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="-ml-1 -mt-1 drop-shadow-lg">
                <path d="M4 3l15 8.5-6.5 1.8L9.5 20z" fill="#4791ff" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span className="mt-4 rounded-full bg-brand-sky px-2 py-1 font-medium text-white shadow-lg">TechFlow</span>
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

const GLYPHS = "<>/{}[]=+*#$_01";

/** Word that decodes out of code glyphs, then reports a successful build. */
export function BuildWord({ text, on }: { text: string; on: boolean }) {
  const { compiled } = useLocale().t.hero;
  const [glyphs, setGlyphs] = useState<(string | null)[] | null>(null);

  useEffect(() => {
    if (!on) return;
    let raf = 0;
    let frame = 0;
    let step = 0;
    const tick = () => {
      frame++;
      if (frame % 2 === 0) {
        step++;
        const next = [...text].map((_, i) =>
          step > 5 + i * 3 ? null : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        );
        const done = next.every((g) => g === null);
        setGlyphs(done ? null : next);
        if (done) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      setGlyphs(null);
    };
  }, [on, text]);

  return (
    <span className="relative inline-block">
      <span className={`bg-linear-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent ${glyphs ? "invisible" : ""}`}>
        {text}
      </span>
      {glyphs && (
        <span className="absolute inset-0 whitespace-nowrap">
          {[...text].map((char, i) =>
            glyphs[i] === null ? (
              <span key={i}>{char}</span>
            ) : (
              <span key={i} className="font-mono text-[0.78em] text-brand-sky">
                {glyphs[i]}
              </span>
            ),
          )}
        </span>
      )}

      <AnimatePresence>
        {on && (
          <motion.span
            key="build"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="pointer-events-none absolute inset-0"
          >
            <span className="absolute left-full top-[0.2em] ml-[0.08em] block h-[0.72em] w-[0.05em] animate-pulse bg-brand-sky" />
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5, ease }}
              className="absolute bottom-full left-0 mb-1 hidden items-center gap-2 whitespace-nowrap in-data-stacked:bottom-auto in-data-stacked:left-full in-data-stacked:top-1/2 in-data-stacked:mb-0 in-data-stacked:ml-8 in-data-stacked:-translate-y-1/2 rounded-lg border border-white/10 bg-night-soft/90 px-3 py-2 font-mono text-xs leading-none tracking-normal text-white/70 backdrop-blur-md sm:flex"
            >
              <span className="text-emerald-400">✓</span>
              {compiled.label} <span className="text-white">{compiled.value}</span>
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

const wave = {
  on: (i: number) => ({
    y: [0, "-0.16em", 0],
    transition: { duration: 0.7, delay: 0.25 + i * 0.07, ease: "easeInOut" as const },
  }),
  off: { y: 0 },
};

const growth = "M0 96 L53 86 L93 90 L147 70 L187 76 L240 50 L280 56 L333 26 L400 2";

/** Word whose letters bounce up while a growth chart draws behind the line. */
export function GrowWord({ text, on }: { text: string; on: boolean }) {
  const { leads } = useLocale().t.hero;
  return (
    <span className="relative inline-block">
      <AnimatePresence>
        {on && (
          <motion.span
            key="chart"
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="pointer-events-none absolute -left-[1.9em] -right-[0.5em] bottom-[0.05em] top-[-0.25em]"
          >
            <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
              <defs>
                <linearGradient id="grow-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4766ff" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#4766ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d={`${growth} L400 100 L0 100 Z`}
                fill="url(#grow-area)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
              <motion.path
                d={growth}
                fill="none"
                stroke="#4791ff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, ease }}
              />
            </svg>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 400, damping: 18 }}
              className="absolute -right-[5px] -top-[5px] size-2.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(71,145,255,0.35)]"
            />
            <motion.span
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5, ease }}
              className="absolute left-full top-0 ml-4 hidden -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-white py-1.5 pl-2 pr-3 font-sans text-sm font-medium not-italic leading-none tracking-normal text-night shadow-[0_10px_30px_-8px_rgba(71,102,255,0.8)] sm:flex"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[11px] text-white">↗</span>
              <CountUp to={248} delay={1.1} />
              <span className="text-night/50">{leads}</span>
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>

      <span className="relative">
        {[...text].map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wave}
            initial={false}
            animate={on ? "on" : "off"}
            className="inline-block bg-linear-to-b from-[#ecf4ff] via-[#9ec2ff] to-brand bg-clip-text pb-[0.08em] pr-[0.02em] text-transparent"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

function CountUp({ to, delay }: { to: number; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, { duration: 1.2, delay, ease, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [to, delay]);

  return <span className="tabular-nums">+{value}%</span>;
}
