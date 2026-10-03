"use client";

import Link from "next/link";
import { href } from "@/i18n/routes";
import { useLocale } from "../site/locale";
import { ButtonLink } from "./ui";

const copy = {
  fr: {
    title: "Cette page s'est perdue en chemin.",
    text: "Le lien est peut-être ancien ou la page a été déplacée. Voici où reprendre la visite.",
    home: "Retour à l'accueil",
  },
  en: {
    title: "This page got lost along the way.",
    text: "The link may be outdated or the page has moved. Here's where to pick things up.",
    home: "Back to home",
  },
};

export function NotFoundContent() {
  const { lang, t } = useLocale();
  const c = copy[lang];
  const pages = ["services", "projects", "team", "insights", "contact"] as const;

  return (
    <section className="grain relative flex min-h-svh items-center overflow-hidden bg-night px-5 py-24 text-white md:px-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_40%,rgba(71,102,255,0.25),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-serif text-[clamp(8rem,28vw,18rem)] italic leading-none text-brand-sky">404</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{c.title}</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/60">{c.text}</p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href={href(lang, "home")}>{c.home}</ButtonLink>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-2">
          {pages.map((key) => (
            <li key={key}>
              <Link href={href(lang, key)} className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white hover:text-white">
                {t.nav.pages[key]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
