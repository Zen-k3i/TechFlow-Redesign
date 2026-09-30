"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ease } from "./content";

export function parseAccents(text: string) {
  const words: { word: string; accent: boolean }[] = [];
  let inAccent = false;
  for (const raw of text.split(" ")) {
    const opens = raw.startsWith("*");
    const closes = raw.endsWith("*") && (raw.length > 1 || !opens);
    const accent: boolean = inAccent || opens;
    inAccent = accent && !closes;
    words.push({ word: raw.replaceAll("*", ""), accent });
  }
  return words;
}

/** Heading whose words rise out of a mask when scrolled into view. Wrap words in `*` to accent them. */
export function RevealHeading({
  text,
  className = "",
  accentClassName = "italic text-brand-sky",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  accentClassName?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const words = parseAccents(text);
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.05 }}
      className={className}
    >
      {words.map(({ word, accent }, i) => {
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
              transition={{ duration: 0.8, ease }}
              className={`inline-block ${accent ? accentClassName : ""}`}
            >
              {word}
              {i < words.length - 1 ? "\u00a0" : ""}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counts a figure like "45+", "+120%", "x3" or "2,5 s" up from zero the first time it is seen.
 * Screen readers and crawlers get the final value; anything that isn't a plain number is shown as is.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*?)(\d+(?:[.,]\d+)?)([^]*)$/);
  // "80 000" style thousands would count oddly, so leave them static.
  const countable = match !== null && !/^[\s\u00a0\u202f]?\d/.test(match[3]);
  const [, prefix = "", num = "0", suffix = ""] = match ?? [];
  const decimals = num.split(/[.,]/)[1]?.length ?? 0;
  const separator = num.includes(",") ? "," : ".";
  const target = Number(num.replace(",", "."));
  const count = useMotionValue(reduce ? target : 0);
  const text = useTransform(count, (v) => `${prefix}${v.toFixed(decimals).replace(".", separator)}${suffix}`);

  useEffect(() => {
    if (!countable || !inView || reduce) return;
    const controls = animate(count, target, { duration: 1.8, ease });
    return () => controls.stop();
  }, [countable, inView, reduce, count, target]);

  if (!countable) return <>{value}</>;
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
}
