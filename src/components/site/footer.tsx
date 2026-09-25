"use client";

import Image from "next/image";
import { useLocale } from "./locale";
import { Magnetic } from "./magnetic";
import { RevealHeading } from "./reveal";

export function Footer() {
  const { t, links } = useLocale();
  const f = t.footer;
  const columns = [
    {
      title: f.columns.services,
      items: t.services.items.map((s) => ({ label: s.title, href: s.href })),
    },
    {
      title: f.columns.agency,
      items: [
        { label: f.agency.projects, href: links.projects },
        { label: f.agency.team, href: links.team },
        { label: f.agency.insights, href: links.insights },
        { label: f.agency.contact, href: links.contact },
      ],
    },
    {
      title: f.columns.follow,
      items: [
        { label: "Instagram", href: links.instagram },
        { label: "LinkedIn", href: links.linkedin },
        { label: "Webflow Certified Partner", href: links.webflow },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-night via-navy-deep to-brand-deep px-5 pt-28 text-white md:px-10 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div>
            <p className="eyebrow flex items-center gap-2 text-white/60">
              <span className="size-2 rounded-full bg-emerald-400" /> {f.status}
            </p>
            <RevealHeading
              text={f.heading}
              accentClassName="italic text-brand-sky"
              className="mt-5 font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.9]"
            />
            <p className="mt-6 max-w-md text-white/60">
              {f.text}
            </p>
          </div>
          <Magnetic strength={0.4}>
            <a
              href={links.booking}
              target="_blank"
              rel="noreferrer"
              data-cursor={f.cursor}
              className="group relative flex size-44 items-center justify-center rounded-full bg-white text-center text-lg font-medium leading-tight text-night md:size-52"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-brand-sky transition-transform duration-500 ease-out group-hover:scale-100" />
              <span className="relative transition-colors group-hover:text-white">
                {f.book[0]}
                <br />
                {f.book[1]}
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="mt-28 grid gap-12 border-t border-white/15 pt-14 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <Image src="/images/techflow-logo.svg" alt="TechFlow" width={179} height={36} className="h-8 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-white/55">
              {f.tagline}
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-white/40">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/75 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          aria-hidden
          className="mt-20 select-none text-center font-serif text-[22vw] leading-[0.78] tracking-[-0.04em] text-transparent transition-colors duration-700 [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] hover:text-white/10"
        >
          TechFlow
        </p>

        <div className="eyebrow flex flex-col justify-between gap-4 border-t border-white/15 py-6 text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} TechFlow Agency</span>
          <span className="flex gap-6">
            <a href={links.legal} target="_blank" rel="noreferrer" className="hover:text-white">
              {f.legal}
            </a>
            <a href={links.terms} target="_blank" rel="noreferrer" className="hover:text-white">
              {f.terms}
            </a>
            <a href="#top" className="hover:text-white">
              {f.top}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
