"use client";

import Image from "next/image";
import Link from "next/link";
import { href } from "@/i18n/routes";
import { useLocale } from "../site/locale";
import { Magnetic } from "../site/magnetic";
import { RevealHeading } from "../site/reveal";

/** `tone` is the background the buttons sit on. `block` makes a button fill its container (stacked layouts). */
type Tone = "dark" | "light";
type ButtonProps = { tone?: Tone; block?: boolean; className?: string };

const base = "flex h-13 items-center gap-3 rounded-full text-[15px]";

/**
 * The hero's primary button: a pill with a turning blue light around its edge, a blue glow and a
 * round arrow. White on dark backgrounds, ink on light ones.
 */
export function GlowButton({
  href: to,
  external = false,
  children,
  tone = "dark",
  block = false,
  className = "",
}: ButtonProps & { href: string; external?: boolean; children: React.ReactNode }) {
  const fill = tone === "dark" ? "bg-white text-night group-hover:bg-[#e6ebff]" : "bg-ink text-paper group-hover:bg-brand-deep";
  const inner = (
    <>
      <span className="absolute inset-[-100%] -z-10 animate-shine bg-[conic-gradient(from_0deg,rgba(71,102,255,0.9)_0deg,transparent_60deg,transparent_300deg,rgba(71,102,255,0.9)_360deg)]" />
      <span className={`${base} pl-6 pr-1.5 font-medium transition-colors duration-300 ${fill} ${block ? "justify-between" : ""}`}>
        {children}
        <span className="flex size-10 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:-rotate-45">
          →
        </span>
      </span>
    </>
  );
  const cls = `group relative isolate block overflow-hidden rounded-full p-px shadow-[0_0_50px_-6px_rgba(71,102,255,0.8)] ${block ? "w-full" : ""} ${className}`;
  return external ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={to} className={cls}>
      {inner}
    </Link>
  );
}

/** The hero's "talk to a human" button: the founder's face with an online dot, opens the booking page. */
export function HumanButton({ tone = "dark", block = false, className = "", children }: ButtonProps & { children?: React.ReactNode }) {
  const { t, links } = useLocale();
  const colors =
    tone === "dark"
      ? "border border-white/15 bg-white/[0.04] text-white backdrop-blur hover:bg-white/10"
      : "border border-ink/15 bg-white text-ink hover:border-ink/40";
  return (
    <a
      href={links.booking}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} pl-1.5 pr-6 transition-colors ${colors} ${block ? "w-full" : ""} ${className}`}
    >
      <span className="relative shrink-0">
        <Image src="/images/avatar.svg" alt="" width={40} height={40} className="size-10 rounded-full" />
        <span className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 bg-emerald-400 ${tone === "dark" ? "border-night" : "border-white"}`} />
      </span>
      {children ?? t.common.human}
    </a>
  );
}

/** "Demander un devis": the glowing primary button, to the contact form. */
export function QuoteButton(props: ButtonProps) {
  const { t, lang } = useLocale();
  return (
    <GlowButton href={href(lang, "contact")} {...props}>
      {t.common.quote}
    </GlowButton>
  );
}

/** "Parler à un humain": the founder's face, to the booking page. */
export const TalkToHumanButton = HumanButton;

/**
 * "Un projet en tête ?" call to action: heading, what the call gives you, the hero's two buttons
 * (same size and style) and the reassurance line, centred. Used at the top of the footer.
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
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Magnetic>
          <QuoteButton />
        </Magnetic>
        <Magnetic>
          <TalkToHumanButton />
        </Magnetic>
      </div>
      <p className="mt-6 text-sm text-white/60">{t.common.reassurance}</p>
    </div>
  );
}
