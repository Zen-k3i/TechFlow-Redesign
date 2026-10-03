"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/i18n/fr";
import { caseStudyUrl, projectImage } from "./content";
import { useLocale } from "./locale";
import { FadeIn, RevealHeading } from "./reveal";

type Industry = Dictionary["industries"]["items"][number];

const grow = "transition-[flex-grow,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:basis-0";

export function Industries() {
  const { t } = useLocale();
  const s = t.industries;
  const [active, setActive] = useState(0);

  return (
    <section id="secteurs" className="relative bg-night px-5 pb-20 pt-12 text-white md:px-10 md:pb-28 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow text-brand-sky">{s.eyebrow}</p>
            <RevealHeading text={s.heading} className="mt-4 max-w-4xl font-serif text-[2.75rem] leading-[0.95] md:text-[4.125rem]" />
          </div>
          <FadeIn>
            <p className="max-w-sm text-white/55">{s.intro}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <ul className="mt-14 flex flex-col gap-3 lg:h-[600px] lg:flex-row">
            {s.items.map((item, i) => (
              <Panel key={item.id} item={item} index={i} active={active === i} onActivate={() => setActive(i)} />
            ))}
            <CtaPanel index={s.items.length} active={active === s.items.length} onActivate={() => setActive(s.items.length)} />
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

function Panel({
  item,
  index,
  active,
  onActivate,
}: {
  item: Industry;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const { t } = useLocale();
  const s = t.industries;

  return (
    <li
      onPointerEnter={(e) => e.pointerType === "mouse" && onActivate()}
      className={`relative overflow-hidden rounded-[2rem] border bg-night-soft ${grow} ${
        active ? "border-white/20 lg:grow-[3.2]" : "border-white/10 lg:grow"
      }`}
    >
      <Link
        href={caseStudyUrl(item.project)}
        onFocus={onActivate}
        className="flex h-full flex-col"
      >
        <div className="relative aspect-[16/11] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
          <Image
            src={projectImage(item.project)}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover object-top transition-[transform,filter] duration-[1.2s] ease-out ${
              active ? "scale-100" : "lg:scale-110 lg:grayscale"
            }`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-night-soft via-night/30 to-transparent lg:from-night lg:via-night/60" />
          <div
            className={`absolute inset-0 hidden bg-night/70 transition-opacity duration-700 lg:block ${
              active ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        <div className="relative flex flex-1 flex-col p-6 md:p-8 lg:justify-between">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-brand-sky">0{index + 1}</span>
            <span
              className={`flex size-11 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-500 ${
                active ? "-rotate-45 border-brand bg-brand" : "border-white/25"
              }`}
            >
              →
            </span>
          </div>

          <p
            aria-hidden
            className={`absolute bottom-8 left-8 hidden rotate-180 whitespace-nowrap font-serif text-3xl text-white/80 transition-opacity duration-300 [writing-mode:vertical-rl] lg:block ${
              active ? "opacity-0" : "opacity-100 delay-300"
            }`}
          >
            {item.short}
          </p>

          <div
            className={`mt-6 transition-[opacity,translate] duration-500 lg:mt-0 lg:w-[30rem] ${
              active ? "delay-300" : "lg:pointer-events-none lg:translate-y-6 lg:opacity-0"
            }`}
          >
            <h3 className="font-serif text-4xl leading-[0.95] md:text-5xl">{item.title}</h3>
            <p className="mt-4 max-w-md text-white/65">{item.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/15 bg-night/40 px-3 py-1 text-sm text-white/80 backdrop-blur">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-5">
              <div>
                <p className="eyebrow text-white/55">{s.references}</p>
                <p className="mt-1.5 text-sm text-white/80">{item.clients.join(" · ")}</p>
              </div>
              <span className="text-sm text-brand-sky">{s.seeCase} →</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

function CtaPanel({ index, active, onActivate }: { index: number; active: boolean; onActivate: () => void }) {
  const { cta } = useLocale().t.industries;

  return (
    <li
      onPointerEnter={(e) => e.pointerType === "mouse" && onActivate()}
      className={`relative overflow-hidden rounded-[2rem] border border-brand/40 bg-brand-deep ${grow} ${
        active ? "lg:grow-[3.2]" : "lg:grow"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_100%_0%,rgba(71,145,255,0.7),transparent_60%),radial-gradient(70%_60%_at_0%_100%,rgba(9,20,71,0.9),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[48px_48px] [mask-image:radial-gradient(70%_70%_at_70%_30%,black,transparent)]"
      />
      <a href="#brief" onFocus={onActivate} className="relative flex h-full min-h-[320px] flex-col justify-between p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-white/70">0{index + 1}</span>
          <span
            className={`flex size-11 items-center justify-center rounded-full bg-white text-xl text-brand-deep transition-transform duration-500 ${
              active ? "rotate-90" : ""
            }`}
          >
            +
          </span>
        </div>

        <p
          aria-hidden
          className={`absolute bottom-8 left-8 hidden rotate-180 whitespace-nowrap font-serif text-3xl italic transition-opacity duration-300 [writing-mode:vertical-rl] lg:block ${
            active ? "opacity-0" : "opacity-100 delay-300"
          }`}
        >
          {cta.short}
        </p>

        <div
          className={`mt-10 transition-[opacity,translate] duration-500 lg:mt-0 lg:w-[28rem] ${
            active ? "delay-300" : "lg:pointer-events-none lg:translate-y-6 lg:opacity-0"
          }`}
        >
          <h3 className="font-serif text-4xl leading-[0.95] md:text-6xl">{cta.title}</h3>
          <p className="mt-4 max-w-sm text-white/75">{cta.text}</p>
          <span className="group mt-7 inline-flex h-13 items-center gap-3 rounded-full bg-white pl-6 pr-1.5 font-medium text-night">
            {cta.button}
            <span className="flex size-10 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:-rotate-45">
              →
            </span>
          </span>
        </div>
      </a>
    </li>
  );
}
