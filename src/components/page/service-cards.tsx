"use client";

import Image from "next/image";
import Link from "next/link";
import { serviceIllustration } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn } from "../site/reveal";
import { SectionHeader } from "./ui";

export function ServiceCards({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  const { t } = useLocale();
  return (
    <section className="bg-night px-5 py-28 text-white md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={eyebrow} title={heading} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.06}>
              <li className="h-full">
                <Link
                  href={s.href}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-night-soft transition-colors hover:border-brand/50"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-[radial-gradient(70%_70%_at_50%_100%,rgba(71,102,255,0.3),transparent_70%)]">
                    <Image
                      src={serviceIllustration(i)}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="flex items-center justify-between">
                      <span className="font-serif text-3xl">{s.title}</span>
                      <span className="flex size-9 items-center justify-center rounded-full border border-white/15 transition-[transform,background-color] group-hover:-rotate-45 group-hover:bg-brand">
                        →
                      </span>
                    </span>
                    <span className="mt-3 text-sm text-white/55">{s.tagline}</span>
                  </span>
                </Link>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
