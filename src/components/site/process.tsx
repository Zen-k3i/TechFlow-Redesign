"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import type { Dictionary } from "@/i18n/fr";
import { ease } from "./content";
import { useLocale } from "./locale";
import { RevealHeading } from "./reveal";

/** Real screens from each phase of a project, in step order. */
const stepImage = (index: number) => `/images/process/step-${index + 1}.webp`;

export function Process() {
  const { t } = useLocale();
  const steps = t.process.steps;
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const fill = useTransform(scrollYProgress, (p) => Math.min(1, Math.max(0, p)));
  const [current, setCurrent] = useState(0);

  return (
    <section id="methode" className="relative overflow-clip bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_100%_40%,rgba(54,71,245,0.18),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow text-brand-sky">{t.process.eyebrow}</p>
            <RevealHeading text={t.process.heading} className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl" />
          </div>
          <p className="max-w-md text-white/55 md:text-lg lg:justify-self-end">{t.process.intro}</p>
        </div>

        {/* Only the app window is sticky, so it always fits the viewport whatever its height. */}
        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <ol ref={listRef} className="relative space-y-4 pl-8 md:pl-12 lg:py-[12vh]">
            <span aria-hidden className="absolute bottom-0 left-2 top-0 w-px bg-white/10 md:left-4" />
            <motion.span
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute bottom-0 left-2 top-0 w-px origin-top bg-linear-to-b from-brand-sky to-brand-deep md:left-4"
            />
            {steps.map((step, i) => (
              <Step key={step.week} step={step} index={i} onEnter={setCurrent} active={current === i} />
            ))}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-[max(7rem,calc(50svh-15rem))]">
              <StepScreen steps={steps} current={current} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
  active,
  onEnter,
}: {
  step: Dictionary["process"]["steps"][number];
  index: number;
  active: boolean;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li ref={ref} className="relative">
      <span
        aria-hidden
        className={`absolute -left-[1.85rem] top-9 size-3 rounded-full border-2 transition-colors duration-500 md:-left-[2.35rem] ${
          active ? "border-brand-sky bg-brand-sky shadow-[0_0_20px_rgba(71,145,255,0.8)]" : "border-white/25 bg-night"
        }`}
      />
      <div
        className={`rounded-3xl border p-7 transition-[background-color,border-color,opacity] duration-500 md:p-9 ${
          active ? "border-white/15 bg-white/[0.05] opacity-100" : "border-transparent opacity-45"
        }`}
      >
        <p className="eyebrow text-brand-sky">{step.week}</p>
        <h3 className="mt-3 font-serif text-3xl md:text-4xl">{step.title}</h3>
        <p className="mt-3 max-w-lg text-white/60">{step.text}</p>
        {/* Below lg the sticky screen is hidden, so each step carries its own image. */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-night-soft lg:hidden">
          <Image src={stepImage(index)} alt={step.alt} width={1600} height={930} sizes="(min-width: 768px) 80vw, 100vw" className="h-auto w-full" />
        </div>
      </div>
    </li>
  );
}

/**
 * Sticky app window that shows the screen of the step being read. All five images stay
 * mounted and crossfade, so switching steps never waits on a download.
 */
function StepScreen({ steps, current }: { steps: Dictionary["process"]["steps"]; current: number }) {
  const { t } = useLocale();

  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-brand/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-night-soft shadow-[0_40px_100px_-30px_rgba(7,8,13,0.85)]">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="relative mx-auto h-6 w-40 overflow-hidden rounded-full bg-white/5 font-mono text-[11px] text-white/55">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={current}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {steps[current].app}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="eyebrow flex items-center gap-1 text-white/40">
            {t.process.week}
            <span className="relative inline-block h-[1.2em] w-[1ch] overflow-hidden text-brand-sky">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.5, ease }}
                  className="absolute inset-0"
                >
                  {current + 1}
                </motion.span>
              </AnimatePresence>
            </span>
            /{steps.length}
          </span>
        </div>

        {/* Screens have different ratios: each is shown whole over a blurred copy of itself. */}
        <div className="relative aspect-[16/10] overflow-hidden bg-night">
          {steps.map((step, i) => (
            <div
              key={step.week}
              aria-hidden={i !== current}
              className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === current ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            >
              <Image src={stepImage(i)} alt="" fill sizes="40vw" className="scale-110 object-cover opacity-50 blur-2xl" />
              <Image
                src={stepImage(i)}
                alt={i === current ? step.alt : ""}
                fill
                sizes="(min-width: 1280px) 720px, 55vw"
                className="object-contain p-3 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5 border-t border-white/10 px-5 py-4">
          <span className="relative h-[1.1em] w-[2ch] shrink-0 overflow-hidden font-serif text-4xl leading-none text-brand-sky">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={current}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0"
              >
                {String(current + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="relative h-6 min-w-0 flex-1 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={current}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 truncate text-lg font-medium"
              >
                {steps[current].title}
              </motion.span>
            </AnimatePresence>
          </span>
          <span aria-hidden className="flex w-32 shrink-0 gap-1.5">
            {steps.map((step, i) => (
              <span key={step.week} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                <span
                  className="block h-full origin-left rounded-full bg-brand-sky transition-transform duration-700"
                  style={{ transform: `scaleX(${i <= current ? 1 : 0})` }}
                />
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
