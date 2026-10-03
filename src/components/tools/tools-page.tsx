"use client";

import Link from "next/link";
import { href } from "@/i18n/routes";
import { SanityImage } from "../cms/sanity-image";
import { ServiceCards } from "../page/service-cards";
import { HumanActions, PageHero } from "../page/ui";
import { useLocale } from "../site/locale";
import { FadeIn } from "../site/reveal";
import { toolsContent, type ToolCard } from "./data";

export function ToolLink({ tool, tone = "light" }: { tool: ToolCard; tone?: "light" | "dark" }) {
  const { lang } = useLocale();
  const c = toolsContent[lang];
  const light = tone === "light";
  return (
    <Link
      href={href(lang, "tools", tool.slug ?? "")}
      className={`group flex h-full flex-col rounded-3xl border p-6 transition-colors md:p-7 ${
        light ? "border-ink/10 bg-white hover:border-brand/40" : "border-white/10 bg-white/[0.03] hover:border-white/30"
      }`}
    >
      <span className={`flex size-14 items-center justify-center rounded-2xl ${light ? "bg-paper" : "bg-white"}`}>
        <SanityImage image={tool.logo} alt="" width={160} sizes="56px" className="h-8 w-8 object-contain" />
      </span>
      <h2 className="mt-6 font-serif text-3xl leading-none">{tool.title}</h2>
      {tool.intro && <p className={`mt-3 line-clamp-3 text-sm leading-relaxed ${light ? "text-ink/60" : "text-white/55"}`}>{tool.intro}</p>}
      <span className={`mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium ${light ? "text-brand-deep" : "text-brand-sky"}`}>
        {c.discover}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

export function ToolsPage({ tools }: { tools: ToolCard[] }) {
  const { lang } = useLocale();
  const c = toolsContent[lang];

  return (
    <>
      <PageHero
        crumbs={[{ label: c.label, href: href(lang, "tools") }]}
        badge={c.badge}
        title={c.title}
        intro={c.intro}
        actions={<HumanActions />}
      />

      <section className="rounded-[2.5rem] bg-paper px-5 py-20 text-ink md:rounded-[4rem] md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-brand-deep">{c.all}</p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool, i) => (
              <FadeIn as="li" key={tool._id} delay={(i % 4) * 0.05} className="h-full">
                <ToolLink tool={tool} />
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <ServiceCards eyebrow={c.services.eyebrow} heading={c.services.heading} />
    </>
  );
}
