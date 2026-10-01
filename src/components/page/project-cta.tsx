"use client";

import { href } from "@/i18n/routes";
import { useLocale } from "../site/locale";
import { Magnetic } from "../site/magnetic";
import { RevealHeading } from "../site/reveal";
import { ButtonLink } from "./ui";

/** `tone` is the background the buttons sit on: white primary + outline on dark, ink + outline on light. */
type Tone = "dark" | "light";

/** Primary booking button, the site's standard ButtonLink. */
export function TalkToHumanButton({ tone = "dark", className = "" }: { tone?: Tone; className?: string }) {
  const { t, links } = useLocale();
  return (
    <ButtonLink href={links.booking} external variant={tone === "dark" ? "light" : "dark"} className={className}>
      {t.common.human}
    </ButtonLink>
  );
}

/** Secondary button to the contact form. */
export function QuoteButton({ tone = "dark", className = "" }: { tone?: Tone; className?: string }) {
  const { t, lang } = useLocale();
  return (
    <ButtonLink href={href(lang, "contact")} variant={tone === "dark" ? "outline" : "outline-dark"} className={className}>
      {t.common.quote}
    </ButtonLink>
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
