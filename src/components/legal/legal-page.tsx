"use client";

import Link from "next/link";
import { href } from "@/i18n/routes";
import { BlockView, Toc } from "../page/blocks";
import { PageHero } from "../page/ui";
import { useLocale } from "../site/locale";
import { legalDocs } from "./data";

export function LegalPage({ doc: key }: { doc: "legal" | "terms" | "cookies" }) {
  const { lang, t, links } = useLocale();
  const doc = legalDocs[key][lang];
  const other = key === "legal" ? "terms" : "legal";
  const label = (i: number) => (key === "terms" ? `Article ${i + 1}` : `${i + 1}.`);
  const id = (i: number) => `${key === "terms" ? "article" : "section"}-${i + 1}`;

  return (
    <>
      <PageHero badge={doc.badge} title={doc.title} intro={doc.intro} crumbs={[{ label: t.footer[key], href: href(lang, key) }]} />

      {/* Full-width paper page under the dark hero, like the articles. */}
      <section className="bg-paper px-5 py-16 text-ink md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[280px_1fr] xl:gap-24">
            <aside className="hidden lg:block">
              <Toc label={doc.toc} items={doc.sections.map((s, i) => ({ id: id(i), title: `${label(i)} ${s.title}` }))} />
            </aside>

            <div className="max-w-3xl">
              <div className="divide-y divide-ink/10">
                {doc.sections.map((s, i) => (
                  <section key={s.title} id={id(i)} aria-labelledby={`${id(i)}-title`} className="scroll-mt-28 py-12 first:pt-0">
                    <p className="eyebrow text-brand-deep">{label(i)}</p>
                    <h2 id={`${id(i)}-title`} className="mt-3 font-serif text-4xl leading-[1.05] md:text-5xl">
                      {s.title}
                    </h2>
                    {s.blocks.map((b, j) => (
                      <BlockView key={j} block={b} />
                    ))}
                  </section>
                ))}
              </div>

              <div className="mt-8 grid gap-4 border-t border-ink/10 pt-12 sm:grid-cols-2">
                <a href={`mailto:${links.email}`} className="group rounded-3xl border border-ink/10 bg-white p-6 transition-colors hover:border-ink/30">
                  <span className="eyebrow text-ink/60">{t.footer.agency.contact}</span>
                  <span className="mt-3 block break-all font-medium group-hover:text-brand-deep">{links.email}</span>
                </a>
                <Link href={href(lang, other)} className="group rounded-3xl border border-ink/10 bg-white p-6 transition-colors hover:border-ink/30">
                  <span className="eyebrow text-ink/60">{legalDocs[other][lang].badge}</span>
                  <span className="mt-3 flex items-center justify-between font-medium group-hover:text-brand-deep">
                    {t.footer[other]}
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
