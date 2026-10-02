"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { href } from "@/i18n/routes";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { RevealHeading } from "../site/reveal";

export const pad = (n: number) => String(n).padStart(2, "0");

export function EditorialHero({
  crumbs,
  kicker,
  counter,
  title,
  intro,
  actions,
}: {
  crumbs: { label: string; href: string }[];
  kicker: string;
  counter?: string;
  title: string;
  intro: string;
  actions?: React.ReactNode;
}) {
  const { t, lang } = useLocale();
  const trail = [{ label: t.common.breadcrumbHome, href: href(lang, "home") }, ...crumbs];

  return (
    <div className="mx-auto max-w-7xl">
      <motion.nav
        aria-label="Breadcrumb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="eyebrow flex flex-wrap items-center gap-2 text-white/60"
      >
        {trail.map((c, i) => (
          <span key={c.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i < trail.length - 1 ? (
              <Link href={c.href} className="hover:text-white">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white/70">
                {c.label}
              </span>
            )}
          </span>
        ))}
      </motion.nav>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease }}
        className="mt-10 flex origin-left items-center justify-between border-b border-white/15 pb-5"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/55">{kicker}</span>
        {counter && <span className="font-mono text-xs tracking-[0.2em] text-white/55">{counter}</span>}
      </motion.div>

      <RevealHeading
        as="h1"
        text={title}
        className="mt-10 font-serif text-[clamp(3.2rem,9vw,9.5rem)] leading-[0.9] tracking-[-0.03em]"
      />

      {/* Visible from the server HTML (only slides): this paragraph is the page's largest content,
          and starting it at opacity 0 delayed LCP until the JavaScript had loaded. */}
      <motion.div
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
      >
        <p className="max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">{intro}</p>
        {actions}
      </motion.div>
    </div>
  );
}

/** Oversized scrolling words, alternating outlined and filled. */
export function WordMarquee({ words, tone = "dark" }: { words: string[]; tone?: "dark" | "light" }) {
  const outline = tone === "dark" ? "[-webkit-text-stroke:1px_rgba(255,255,255,0.45)]" : "[-webkit-text-stroke:1px_rgba(16,18,28,0.45)]";
  const filled = tone === "dark" ? "text-brand-sky" : "text-brand-deep";
  const list = [...words, ...words];
  return (
    <div aria-hidden className="overflow-hidden py-4">
      <div className="flex w-max animate-marquee items-center whitespace-nowrap">
        {list.map((w, i) => (
          <span key={i} className="flex items-center font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[1.1]">
            <span className={i % 2 ? `italic ${filled}` : `${tone === "dark" ? "text-white" : "text-ink"} [-webkit-text-fill-color:transparent] ${outline}`}>{w}</span>
            <span className={`mx-[0.35em] text-[0.35em] ${filled}`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Wraps a list and shows a cursor-following image for the hovered row. */
export function HoverPreview({
  images,
  contain = false,
  className = "",
  children,
}: {
  images: string[];
  /** Show each image whole and unframed (illustrations with their own shape), instead of cropped in a card. */
  contain?: boolean;
  className?: string;
  children: (bind: (i: number) => { onPointerEnter: () => void }) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28 });
  const sy = useSpring(y, { stiffness: 260, damping: 28 });

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      {children((i) => ({ onPointerEnter: () => setActive(i) }))}
      <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block">
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.5 : 1, rotate: active === null ? -8 : active % 2 ? 3 : -3 }}
            transition={{ duration: 0.45, ease }}
            className={`relative aspect-[16/10] w-80 lg:w-[26rem] ${
              contain ? "drop-shadow-[0_40px_50px_rgba(0,0,0,0.6)]" : "overflow-hidden rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
            }`}
          >
            {images.map((src, i) => (
              <Image
                key={`${src}-${i}`}
                src={src}
                alt=""
                fill
                sizes="26rem"
                className={`${contain ? "object-contain" : "object-cover object-top"} transition-[opacity,transform] duration-500 ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/** Cards that pin and stack on top of each other while scrolling. */
export function StackedSteps({
  steps,
  label,
}: {
  steps: { title: string; text: string; deliverable: string; duration?: string }[];
  label: string;
}) {
  const themes = [
    { card: "bg-night-soft text-white ring-1 ring-white/10", num: "text-brand-sky", muted: "text-white/60", pill: "bg-white/10 text-white" },
    { card: "bg-paper text-ink", num: "text-brand-deep", muted: "text-ink/60", pill: "bg-ink text-paper" },
    { card: "bg-brand-deep text-white", num: "text-white", muted: "text-white/90", pill: "bg-white text-brand-deep" },
  ];
  return (
    <ol className="space-y-5">
      {steps.map((s, i) => {
        const th = themes[i % themes.length];
        return (
          <li key={s.title} className="sticky" style={{ top: `calc(6.5rem + ${i * 1.1}rem)` }}>
            <div className={`grid min-h-[22rem] gap-8 rounded-[2rem] p-8 shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.9)] md:grid-cols-[0.9fr_1.1fr] md:rounded-[2.75rem] md:p-12 ${th.card}`}>
              <div className="flex items-start justify-between md:flex-col">
                <span className={`font-serif text-[5.5rem] leading-[0.8] md:text-[9rem] ${th.num}`}>{pad(i + 1)}</span>
                {s.duration && <span className={`eyebrow ${th.muted}`}>{s.duration}</span>}
              </div>
              <div className="flex flex-col justify-end">
                <h3 className="font-serif text-4xl leading-[1] md:text-6xl">{s.title}</h3>
                <p className={`mt-5 max-w-lg text-lg leading-relaxed ${th.muted}`}>{s.text}</p>
                <p className={`mt-8 inline-flex items-center gap-3 self-start rounded-full px-4 py-2 text-sm ${th.pill}`}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{label}</span>
                  {s.deliverable}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Oversized link to the next page, with the title sliding on hover. */
export function NextLink({ label, title, to, image }: { label: string; title: string; to: string; image: string }) {
  return (
    <section className="bg-night px-5 pb-10 text-white md:px-10">
      <Link href={to} className="group relative mx-auto block max-w-7xl overflow-hidden border-y border-white/10 py-16 md:py-24">
        <span className="eyebrow text-white/60">{label}</span>
        <span className="mt-4 flex items-center justify-between gap-6">
          <span className="font-serif text-[clamp(3.5rem,11vw,10rem)] leading-[0.9] tracking-[-0.03em] transition-[transform,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-6 group-hover:italic group-hover:text-brand-sky">
            {title}
          </span>
          <span className="relative hidden aspect-[16/10] w-80 shrink-0 opacity-0 transition-[opacity,transform] duration-700 group-hover:-rotate-3 group-hover:opacity-100 md:block">
            <Image src={image} alt="" fill sizes="20rem" className="object-contain" />
          </span>
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-white/20 text-2xl transition-[transform,background-color,border-color] duration-500 group-hover:-rotate-45 group-hover:border-brand group-hover:bg-brand md:size-24 md:text-3xl">
            →
          </span>
        </span>
      </Link>
    </section>
  );
}
