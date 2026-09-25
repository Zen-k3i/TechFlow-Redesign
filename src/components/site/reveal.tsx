"use client";

import { motion } from "motion/react";
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
