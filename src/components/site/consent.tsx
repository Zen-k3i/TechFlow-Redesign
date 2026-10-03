"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useLocale } from "./locale";
import { useMounted } from "./use-mounted";

/**
 * Cookie consent and Google Analytics. GA only loads after "Accept"; nothing is stored before an answer.
 * The choice lives in localStorage for 6 months (a consent record, not a tracker). The footer's
 * "Cookie settings" link reopens the banner with `openConsent()`. GA runs on production only.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-D60Y7LH1L8";
const KEY = "techflow-consent";
const MAX_AGE = 1000 * 60 * 60 * 24 * 182;
const OPEN_EVENT = "techflow:consent-open";
const production = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

type Choice = "granted" | "denied";

export const openConsent = () => window.dispatchEvent(new Event(OPEN_EVENT));

function readChoice(): Choice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as { choice: Choice; at: number } | null;
    return saved && Date.now() - saved.at < MAX_AGE ? saved.choice : null;
  } catch {
    return null;
  }
}

const copy = {
  fr: {
    text: "Nous utilisons Google Analytics pour mesurer l'audience du site, seulement si vous l'acceptez.",
    more: "En savoir plus",
    accept: "Accepter",
    refuse: "Refuser",
  },
  en: {
    text: "We use Google Analytics to measure traffic on this website, only if you accept it.",
    more: "Learn more",
    accept: "Accept",
    refuse: "Refuse",
  },
};

export function Consent() {
  const { lang, links } = useLocale();
  const c = copy[lang];
  const mounted = useMounted();
  const [decided, setDecided] = useState<Choice | null>(null);
  const [reopened, setReopened] = useState(false);
  // Read in the browser only: the server HTML never shows the banner.
  const choice = decided ?? (mounted ? readChoice() : null);
  const open = mounted && (reopened || choice === null);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (next: Choice) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ choice: next, at: Date.now() }));
    } catch {}
    // Withdrawing consent: drop the GA cookies already set and stop measuring.
    if (choice === "granted" && next === "denied") {
      for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim()))
        if (name.startsWith("_ga")) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
      window.location.reload();
    }
    setDecided(next);
    setReopened(false);
  };

  return (
    <>
      {production && choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={lang === "fr" ? "Cookies" : "Cookies"}
          className="fixed inset-x-3 bottom-3 z-[60] max-w-sm rounded-2xl border border-white/10 bg-night/95 p-5 text-sm text-white shadow-2xl backdrop-blur md:inset-x-auto md:bottom-6 md:left-6"
        >
          <p className="text-white/80">
            {c.text}{" "}
            <Link href={links.privacy} className="underline underline-offset-2 hover:text-white">
              {c.more}
            </Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => decide("denied")} className="h-10 flex-1 rounded-full border border-white/25 font-medium transition-colors hover:bg-white/10">
              {c.refuse}
            </button>
            <button type="button" onClick={() => decide("granted")} className="h-10 flex-1 rounded-full bg-white font-medium text-night transition-colors hover:bg-brand-sky">
              {c.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
