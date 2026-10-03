"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { SanityImage } from "../cms/sanity-image";
import { useMounted } from "../site/use-mounted";
import { useLocale } from "../site/locale";
import { RevealHeading } from "../site/reveal";
import type { TeamMember } from "./data";

const copy: Record<Locale, { eyebrow: string; heading: string; cta: string }> = {
  fr: {
    eyebrow: "Les visages derrière vos projets",
    heading: "Des humains derrière chaque projet, *entre la France et le Cambodge.*",
    cta: "Découvrir toute l'équipe",
  },
  en: {
    eyebrow: "The faces behind your projects",
    heading: "Real people behind every project, *between France and Cambodia.*",
    cta: "Meet the whole team",
  },
};

/**
 * Scrolling strip of team portraits (team members from Sanity, in their `order`).
 * Used on the team page, right under its hero, and on the home page.
 */
export function PortraitStrip({ members, className = "pt-8", cta = false }: { members: TeamMember[]; className?: string; cta?: boolean }) {
  const { lang, links } = useLocale();
  const c = copy[lang];
  const mounted = useMounted();
  if (members.length === 0) return null;
  // The looping copy is added in the browser only: the server HTML carries each portrait once.
  const list = mounted ? [...members, ...members] : members;

  return (
    <section className={`overflow-hidden bg-night pb-20 text-white md:pb-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="eyebrow text-brand-sky">{c.eyebrow}</p>
        <RevealHeading text={c.heading} accentClassName="italic text-brand-sky" className="mt-4 max-w-4xl font-serif text-[2.75rem] leading-[0.95] md:text-[4.125rem]" />
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
      {/* On the home page: an invitation to the full team page (the team page itself has none). */}
      {cta && (
        <div className="mt-12 flex justify-center px-5">
          <Link
            href={links.team}
            className="group flex h-14 items-center gap-3 rounded-full bg-white pl-7 pr-2 font-medium text-ink transition-colors hover:bg-brand-sky"
          >
            {c.cta}
            <span className="flex size-10 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:-rotate-45">
              →
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
