"use client";

import { useEffect, useState } from "react";
import { useLocale } from "../site/locale";
import { slugify } from "./slugify";

export type Block =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export { slugify };

/** Bolds a short "Label : text" prefix in list items. */
function Item({ text }: { text: string }) {
  const { lang } = useLocale();
  const match = text.match(/^([^:,]{2,60}?)\s?:\s(.+)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <strong className="font-semibold text-ink">{match[1]}</strong>
      {lang === "fr" ? " : " : ": "}
      {match[2]}
    </>
  );
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={slugify(block.text)} className="mt-16 scroll-mt-28 font-serif text-4xl leading-[1.05] first:mt-0 md:text-5xl">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-10 text-xl font-semibold">{block.text}</h3>;
    case "p":
      return <p className="mt-5 text-lg leading-relaxed text-ink/75">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4 text-lg leading-relaxed text-ink/75">
              <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-brand-deep" />
              <span>
                <Item text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5 text-lg leading-relaxed text-ink/75">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-deep font-serif text-white">{i + 1}</span>
              <span>
                <Item text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-ink/10 bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="bg-ink text-paper">
                {block.head.map((h) => (
                  <th key={h} scope="col" className="p-4 text-sm font-medium md:p-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-ink/10">
                  {row.map((cell, i) => (
                    <td key={i} className={`p-4 md:p-5 ${i === 0 ? "font-medium" : "text-ink/65"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/**
 * The last heading scrolled past the top 30% of the viewport. Reading positions rather than
 * intersection events keeps it right after fast scrolls and jumps that skip over a heading.
 */
export function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);
  return active;
}

/** Sticky table of contents that highlights the section in view. */
export function Toc({ label, items }: { label: string; items: { id: string; title: string }[] }) {
  const [ids] = useState(() => items.map((i) => i.id));
  const active = useActiveHeading(ids);
  return (
    <nav aria-label={label} className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6">
      <p className="eyebrow text-ink/60">{label}</p>
      <ol className="mt-5 space-y-1 border-l border-ink/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors ${
                active === item.id ? "border-brand-deep text-ink" : "border-transparent text-ink/45 hover:text-ink"
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
