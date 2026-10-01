"use client";

import Image from "next/image";
import Link from "next/link";
import { href } from "@/i18n/routes";
import { useLocale } from "../site/locale";
import { Magnetic } from "../site/magnetic";
import { RevealHeading } from "../site/reveal";

const button = "group inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full text-[15px] font-medium transition-[background-color,border-color,box-shadow] duration-300";

/** Primary booking button: blue pill with the founder's face, opens the booking page. */
export function TalkToHumanButton({ className = "" }: { className?: string }) {
  const { t, links } = useLocale();
  return (
    <a
      href={links.booking}
      target="_blank"
      rel="noopener noreferrer"
      className={`${button} gap-3 bg-linear-to-r from-brand-deep to-brand pl-1.5 pr-5 text-white shadow-[0_10px_30px_-10px_rgba(71,102,255,0.8)] ring-1 ring-white/25 hover:shadow-[0_14px_36px_-10px_rgba(71,102,255,1)] ${className}`}
    >
      <Image
        src="/images/team/maximilien-grolier.webp"
        alt=""
        width={36}
        height={36}
        className="size-9 rounded-full object-cover ring-2 ring-white/70"
      />
      {t.common.human}
      <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        ↗
      </span>
    </a>
  );
}

/** Secondary button to the contact form. `tone` is the background it sits on. */
export function QuoteButton({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const { t, lang } = useLocale();
  const colors =
    tone === "dark"
      ? "border border-white/20 bg-night text-white hover:border-white/50"
      : "border border-ink/15 bg-ink text-paper hover:bg-brand-deep";
  return (
    <Link href={href(lang, "contact")} className={`${button} px-7 ${colors} ${className}`}>
      {t.common.quote}
    </Link>
  );
}

/**
 * "Un projet en tête ?" call to action: heading, what the call gives you, the two buttons and the
 * reassurance line, centred. Used at the top of the footer.
 */
export function ProjectCta() {
  const { t } = useLocale();
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <RevealHeading
        text={t.common.cta.heading}
        accentClassName="italic text-brand-sky"
        className="font-serif text-[clamp(2.75rem,6vw,5rem)] leading-[1]"
      />
      <p className="mt-6 max-w-2xl text-lg text-white/65">{t.common.cta.scope}</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Magnetic strength={0.25}>
          <TalkToHumanButton />
        </Magnetic>
        <QuoteButton />
      </div>
      <p className="mt-8 text-sm text-white/60">{t.common.reassurance}</p>
    </div>
  );
}
