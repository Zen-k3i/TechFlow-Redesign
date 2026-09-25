"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { localePath, locales } from "@/i18n/config";
import { ease } from "./content";
import { useLocale } from "./locale";

export function Navbar({ base = "" }: { base?: string }) {
  const { t, links } = useLocale();
  const navLinks = t.nav.links;
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const detected = useActiveSection(navLinks);
  const active = base ? null : detected;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

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
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-4"
      >
        <nav
          className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border pl-5 pr-2 transition-[background-color,border-color,backdrop-filter] duration-500 md:pl-6 ${
            solid || open ? "border-white/10 bg-night/75 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <a href={base || "#top"} aria-label={t.nav.home} className="relative z-10">
            <Image src="/images/techflow-logo.svg" alt="TechFlow" width={179} height={36} preload className="h-7 w-auto" />
          </a>

          <ul className="hidden items-center gap-1 text-[15px] md:flex">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={`${base}#${link.id}`}
                  className={`relative z-10 block rounded-full px-4 py-2 transition-colors ${
                    active === link.id ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitch className="hidden sm:flex" />
            <a
              href={links.booking}
              target="_blank"
              rel="noreferrer"
              className="group hidden h-12 items-center gap-2.5 rounded-full bg-white pl-5 pr-1.5 text-[15px] font-medium text-night transition-colors hover:bg-brand-sky hover:text-white sm:flex"
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
              className="relative z-10 flex size-12 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 md:hidden"
            >
              <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-px w-5 bg-white" />
              <motion.span animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }} className="h-px w-5 bg-white" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 40px)" }}
            animate={{ clipPath: "circle(150% at 92% 40px)" }}
            exit={{ clipPath: "circle(0% at 92% 40px)" }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-brand-deep px-6 pb-10 pt-28 md:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease }}
                >
                  <a
                    href={`${base}#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-serif text-6xl leading-tight text-white"
                  >
                    <span className="eyebrow text-white/50">0{i + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-4">
              <LanguageSwitch className="flex w-fit border-white/30" />
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

function LanguageSwitch({ className = "" }: { className?: string }) {
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
          href={localePath(l)}
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

function useActiveSection(navLinks: readonly { id: string }[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((current) => (current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [navLinks]);

  return active;
}
