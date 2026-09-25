"use client";

import { createContext, useContext } from "react";
import { defaultLocale, localePath, type Locale } from "@/i18n/config";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { getLinks } from "./content";

const dictionaries = { fr, en };

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={lang}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const lang = useContext(LocaleContext);
  return {
    lang,
    t: dictionaries[lang],
    links: getLinks(lang),
    path: (to: string) => localePath(lang, to),
  };
}

/** Renders `*wrapped*` segments of a sentence with the accent class. */
export function Accented({ text, className }: { text: string; className: string }) {
  return text.split("*").map((part, i) =>
    i % 2 ? (
      <span key={i} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
