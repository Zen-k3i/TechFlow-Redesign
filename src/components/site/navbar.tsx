"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { locales, type Locale } from "@/i18n/config";
import { href, isServiceKey, serviceKeys, type RouteKey } from "@/i18n/routes";
import { ease, serviceIllustration } from "./content";
import { useLocale } from "./locale";

const pageKeys = ["projects", "team", "insights", "contact"] as const;

/** Per-locale URLs of the current page, when they differ from the section index (e.g. a translated slug). */
export type Alternates = Partial<Record<Locale, string>>;

export function Navbar({ current, alternates }: { current?: RouteKey; alternates?: Alternates }) {
  const { t, lang, links } = useLocale();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesActive = current === "services" || isServiceKey(current);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 400 && !open && !servicesOpen);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  const services = serviceKeys.map((key, i) => ({ key, illustration: serviceIllustration(i), ...t.services.items[i] }));

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-brand-deep to-brand-sky"
      />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        onPointerLeave={(e) => e.pointerType === "mouse" && setServicesOpen(false)}
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-4"
      >
        <nav
          className={`relative mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,backdrop-filter] duration-500 md:pl-6 ${
            solid || open || servicesOpen ? "border-white/10 bg-night/80 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <Link href={href(lang, "home")} aria-label={t.nav.home} className="relative z-10">
            <Image src="/images/techflow-logo.svg" alt="TechFlow" width={179} height={36} preload className="h-7 w-auto" />
          </Link>

          <ul className="hidden items-center gap-1 text-base lg:flex">
            <li>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setServicesOpen(true)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 transition-colors xl:px-4 ${
                  servicesActive || servicesOpen ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {t.nav.pages.services}
                <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} className="text-[10px]">
                  ▾
                </motion.span>
              </button>
            </li>
            {pageKeys.map((key) => (
              <li key={key} onPointerEnter={() => setServicesOpen(false)}>
                <Link
                  href={href(lang, key)}
                  aria-current={current === key ? "page" : undefined}
                  className={`block rounded-full px-3 py-2 transition-colors xl:px-4 ${
                    current === key ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {t.nav.pages[key]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitch current={current} alternates={alternates} className="hidden sm:flex" />
            <a
              href={links.booking}
              target="_blank"
              rel="noreferrer"
              className="group hidden h-12 items-center gap-2.5 rounded-full bg-white pl-5 pr-1.5 text-[15px] font-medium text-night transition-colors hover:bg-brand hover:text-white sm:flex"
            >
              {t.nav.book}
              <span className="flex size-9 items-center justify-center rounded-full bg-night text-white transition-transform duration-300 group-hover:-rotate-45">
                →
              </span>
            </a>
            <button
              type="button"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex size-12 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 lg:hidden"
            >
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-px w-5 bg-white" />
              <motion.span animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="h-px w-5 bg-white" />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              id="services-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease }}
              className="absolute inset-x-3 top-full mx-auto hidden max-w-6xl pt-2 lg:block"
            >
              <div className="grid grid-cols-[0.8fr_2fr] gap-3 rounded-[2rem] border border-white/10 bg-night/95 p-3 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <div className="flex flex-col justify-between rounded-3xl bg-linear-to-br from-navy-deep to-brand-deep p-6">
                  <div>
                    <p className="eyebrow text-white/60">{t.nav.pages.services}</p>
                    <p className="mt-3 font-serif text-3xl leading-tight">{t.nav.servicesIntro}</p>
                  </div>
                  <Link
                    href={href(lang, "services")}
                    onClick={() => setServicesOpen(false)}
                    className="group mt-8 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                  >
                    {t.nav.allServices}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-3">
                  {services.map((s) => (
                    <li key={s.key}>
                      <Link
                        href={href(lang, s.key)}
                        onClick={() => setServicesOpen(false)}
                        aria-current={current === s.key ? "page" : undefined}
                        className={`group flex h-full gap-4 rounded-3xl border p-3 transition-colors ${
                          current === s.key ? "border-brand/60 bg-white/[0.06]" : "border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="relative h-24 w-36 shrink-0 overflow-hidden rounded-2xl bg-[radial-gradient(80%_80%_at_50%_100%,rgba(71,102,255,0.35),transparent_70%)] bg-white/[0.04]">
                          <Image
                            src={s.illustration}
                            alt=""
                            fill
                            sizes="144px"
                            className="object-contain p-2.5 transition-transform duration-700 group-hover:scale-110"
                          />
                        </span>
                        <span className="py-1">
                          <span className="flex items-center gap-2 font-medium">
                            {s.title}
                            <span className="text-brand-sky opacity-0 transition-opacity group-hover:opacity-100">→</span>
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-white/55">{s.tagline}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 40px)" }}
            animate={{ clipPath: "circle(150% at 92% 40px)" }}
            exit={{ clipPath: "circle(0% at 92% 40px)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-brand-deep px-6 pb-10 pt-28 lg:hidden"
          >
            <ul className="space-y-1">
              <motion.li
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease }}
              >
                <Link
                  href={href(lang, "services")}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 font-serif text-5xl leading-tight text-white"
                >
                  <span className="eyebrow text-white/50">01</span>
                  {t.nav.pages.services}
                </Link>
                <ul className="mb-3 ml-10 mt-1 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li key={s.key}>
                      <Link
                        href={href(lang, s.key)}
                        onClick={() => setOpen(false)}
                        className="block rounded-full border border-white/25 px-3 py-1.5 text-sm text-white/85"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.li>
              {pageKeys.map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease }}
                >
                  <Link
                    href={href(lang, key)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-serif text-5xl leading-tight text-white"
                  >
                    <span className="eyebrow text-white/50">0{i + 2}</span>
                    {t.nav.pages[key]}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 space-y-4">
              <LanguageSwitch current={current} alternates={alternates} className="flex w-fit border-white/30" />
              <a
                href={links.booking}
                target="_blank"
                rel="noreferrer"
                className="flex h-14 items-center justify-center rounded-full bg-white text-lg font-medium text-night"
              >
                {t.nav.bookMobile}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LanguageSwitch({
  current = "home",
  alternates,
  className = "",
}: {
  current?: RouteKey;
  alternates?: Alternates;
  className?: string;
}) {
  const { lang, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`h-12 items-center rounded-full border border-white/15 bg-white/5 p-1 ${className}`}
    >
      {locales.map((l) => (
        <a
          key={l}
          href={alternates?.[l] ?? href(l, current)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className={`eyebrow flex h-full items-center rounded-full px-3 transition-colors ${
            l === lang ? "bg-white text-night" : "text-white/60 hover:text-white"
          }`}
        >
          {l}
        </a>
      ))}
    </div>
  );
}
