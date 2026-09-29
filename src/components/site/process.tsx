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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_0%_50%,rgba(54,71,245,0.18),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow text-brand-sky">{t.process.eyebrow}</p>
          <RevealHeading
            text={t.process.heading}
            className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl"
          />
          <p className="mt-6 max-w-md text-white/55">
            {t.process.intro}
          </p>
          <StepScreen steps={steps} current={current} />
        </div>

        <ol ref={listRef} className="relative space-y-4 pl-8 md:pl-12">
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
        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-night-soft lg:hidden">
          <Image src={stepImage(index)} alt={step.alt} fill sizes="(min-width: 768px) 80vw, 100vw" className="object-cover object-top" />
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
    <div className="relative mt-10 hidden lg:block">
      <div aria-hidden className="absolute -inset-6 rounded-[3rem] bg-brand/20 blur-3xl" />
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

        <div className="relative aspect-[16/9]">
          {steps.map((step, i) => (
            <Image
              key={step.week}
              src={stepImage(i)}
              alt={i === current ? step.alt : ""}
              aria-hidden={i !== current}
              fill
              sizes="(min-width: 1280px) 560px, 45vw"
              className={`object-cover object-top transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === current ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-night/70 to-transparent" />
          <div aria-hidden className="absolute inset-x-5 bottom-4 flex gap-1.5">
            {steps.map((step, i) => (
              <span key={step.week} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                <span
                  className="block h-full origin-left rounded-full bg-brand-sky transition-transform duration-700"
                  style={{ transform: `scaleX(${i <= current ? 1 : 0})` }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
