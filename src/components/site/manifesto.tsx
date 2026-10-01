"use client";

import { useRef } from "react";
import { useStill } from "./use-still";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ease } from "./content";
import { useLocale } from "./locale";
import { FadeIn, RevealHeading, parseAccents } from "./reveal";

export function Manifesto() {
  const { t } = useLocale();
  const m = t.manifesto;

  return (
    <section className="relative rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <p className="eyebrow text-brand-deep">{m.eyebrow}</p>
          <span className="h-px flex-1 bg-ink/10" />
          <span className="eyebrow text-ink/40">TechFlow</span>
        </div>

        <Statement
          text={m.statement}
          className="mt-10 max-w-6xl font-serif text-[clamp(2.4rem,5.6vw,5.5rem)] leading-[1.02] tracking-[-0.01em]"
        />

        <div className="mt-20 grid gap-16 md:mt-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <FadeIn>
              <p className="text-lg text-ink/60 md:text-xl">{m.bridge}</p>
            </FadeIn>
            <ul className="mt-6 border-t border-ink/10">
              {m.removed.map((item, i) => (
                <Removed key={item} text={item} tag={m.removedTag} index={i} />
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            <RevealHeading
              as="h3"
              text={m.closing}
              accentClassName="italic text-brand-deep"
              className="font-serif text-5xl leading-[0.95] md:text-7xl"
            />
            <FadeIn>
              <p className="max-w-lg text-ink/65 md:text-lg">{m.body}</p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Heading whose words light up one by one as it scrolls through the viewport. */
function Statement({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = parseAccents(text);

  return (
    <h2 ref={ref} className={className}>
      {words.map(({ word, accent }, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent}>
          {word}
        </Word>
      ))}
    </h2>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const still = useStill();
  const opacity = useTransform(progress, range, [0.14, 1]);

  return (
    <>
      <motion.span style={{ opacity: still ? 1 : opacity }} className={accent ? "italic text-brand-deep" : ""}>
        {children}
      </motion.span>{" "}
    </>
  );
}

function Removed({ text, tag, index }: { text: string; tag: string; index: number }) {
  const delay = 0.25 + index * 0.22;

  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="flex items-center justify-between gap-6 border-b border-ink/10 py-5 md:py-7"
    >
      <span className="relative font-serif text-3xl leading-tight md:text-5xl">
        <motion.span
          variants={{ hidden: { opacity: 0.85 }, visible: { opacity: 0.35 } }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        >
          {text}
        </motion.span>
        <motion.span
          aria-hidden
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 0.7, delay, ease }}
          className="absolute -inset-x-[0.05em] top-[55%] h-[0.07em] origin-left rounded-full bg-brand-deep"
        />
      </span>
      <motion.span
        variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.5, delay: delay + 0.5, ease }}
        className="eyebrow shrink-0 rounded-full border border-brand-deep/30 px-2.5 py-1 text-brand-deep"
      >
        ✕ {tag}
      </motion.span>
    </motion.li>
  );
}
