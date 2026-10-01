"use client";

import type { Locale } from "@/i18n/config";
import { SanityImage } from "../cms/sanity-image";
import { useLocale } from "../site/locale";
import { RevealHeading } from "../site/reveal";
import type { TeamMember } from "./data";

const copy: Record<Locale, { eyebrow: string; heading: string }> = {
  fr: {
    eyebrow: "Les visages derrière vos projets",
    heading: "Des humains derrière chaque projet, *entre la France et le Cambodge.*",
  },
  en: {
    eyebrow: "The faces behind your projects",
    heading: "Real people behind every project, *between France and Cambodia.*",
  },
};

/**
 * Scrolling strip of team portraits (team members from Sanity, in their `order`).
 * Used on the team page, right under its hero, and on the home page.
 */
export function PortraitStrip({ members, className = "pt-8" }: { members: TeamMember[]; className?: string }) {
  const { lang } = useLocale();
  const c = copy[lang];
  if (members.length === 0) return null;
  const list = [...members, ...members];

  return (
    <section className={`overflow-hidden bg-night pb-28 text-white md:pb-36 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="eyebrow text-brand-sky">{c.eyebrow}</p>
        <RevealHeading text={c.heading} accentClassName="italic text-brand-sky" className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] md:text-7xl" />
      </div>
      <div className="mt-16 flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {list.map((m, i) => (
          <figure
            key={`${m._id}-${i}`}
            aria-hidden={i >= members.length}
            className={`relative mr-5 w-56 shrink-0 overflow-hidden rounded-[1.75rem] bg-night-soft transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] md:w-64 ${i % 2 ? "rotate-2" : "-rotate-2"}`}
          >
            <div className="relative aspect-[3/4]">
              <SanityImage image={m.photo} alt={m.name ?? ""} fill width={600} sizes="16rem" className="object-cover object-top" />
              <div className="absolute inset-0 bg-linear-to-t from-night/85 via-transparent to-transparent" />
            </div>
            <figcaption className="absolute inset-x-4 bottom-4">
              <span className="block font-serif text-2xl leading-tight">{m.name}</span>
              <span className="mt-1 block text-xs text-white/60">{m.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
