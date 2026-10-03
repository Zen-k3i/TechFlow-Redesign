"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { m as motion } from "motion/react";
import { href } from "@/i18n/routes";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { SanityImage } from "../cms/sanity-image";
import { OfficeMap } from "../page/office-map";
import { Chip, ComparisonTable, HumanActions, PageHero, SectionHeader } from "../page/ui";
import { offices, teamContent, type TeamMember } from "./data";
import { PortraitStrip } from "./portrait-strip";

/** Intrinsic sizes of the "how we work" visuals (public/images/studio). */
const VISUAL_SIZE: Record<string, [number, number]> = {
  "/images/studio/frame.jpg": [690, 652],
  "/images/studio/team.webp": [896, 1011],
  "/images/studio/office.webp": [1200, 1200],
};

export function TeamPage({ members, testimonials }: { members: TeamMember[]; testimonials: React.ReactNode }) {
  const { lang, t } = useLocale();
  const c = teamContent[lang];

  return (
    <>
      <PageHero
        crumbs={[{ label: t.nav.pages.team, href: href(lang, "team") }]}
        badge={c.badge}
        title={c.title}
        intro={c.intro}
        actions={<HumanActions />}
        aside={<VisioCall members={members} />}
      />

      <section className="bg-night px-5 pb-20 text-white md:px-10">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
          {c.stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.06} className="bg-night p-6 md:p-8">
              <dd className="font-serif text-5xl leading-none md:text-6xl">
                {s.value.replace("+", "")}
                {s.value.includes("+") && <span className="text-brand-sky">+</span>}
              </dd>
              <dt className="mt-3 text-sm text-white/55">{s.label}</dt>
            </FadeIn>
          ))}
        </dl>
      </section>

      <PortraitStrip members={members} />

      <section className="rounded-[2.5rem] bg-paper px-5 py-20 text-ink md:rounded-[4rem] md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={c.pillars.eyebrow} title={c.pillars.heading} intro={c.pillars.intro} tone="light" />
          <ul className="mt-16 grid gap-4 md:grid-cols-3">
            {c.pillars.items.map((p, i) => (
              <FadeIn as="li" key={p.title} delay={i * 0.08} className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-8">
                <span className="font-serif text-6xl leading-none text-brand-deep/20">0{i + 1}</span>
                <h3 className="mt-8 font-serif text-3xl leading-tight">{p.title}</h3>
                <p className="mt-4 text-ink/60">{p.text}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-night px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={c.howWeWork.eyebrow} title={c.howWeWork.heading} />
          <ol className="mt-20 space-y-24 md:space-y-32">
            {c.howWeWork.items.map((item, i) => (
              <li key={item.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <FadeIn className={i % 2 ? "lg:order-2" : ""}>
                  <div className="relative">
                    <div aria-hidden className="absolute -inset-4 rounded-[3rem] bg-brand/15 blur-3xl md:-inset-6" />
                    {/* Each visual at its own ratio with rounded corners: they are mockups (a call, a board) that must not be cropped or padded. */}
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={VISUAL_SIZE[item.image]?.[0] ?? 1200}
                      height={VISUAL_SIZE[item.image]?.[1] ?? 1200}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="relative h-auto w-full rounded-[2.5rem]"
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <span className="eyebrow text-brand-sky">0{i + 1}</span>
                  <h3 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{item.title}</h3>
                  <p className="mt-6 max-w-md text-lg text-white/60">{item.text}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <Chip>{tag}</Chip>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-paper px-5 py-20 text-ink md:rounded-[4rem] md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={c.team.eyebrow} title={c.team.heading} intro={c.team.intro} tone="light" />
          <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {members.map((m, i) => (
              <motion.li
                key={m._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.7, delay: (i % 5) * 0.06, ease }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-ink/5">
                  <SanityImage
                    image={m.photo}
                    alt={m.name ?? ""}
                    fill
                    width={800}
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-sm text-ink/60">{m.role}</p>
                  </div>
                  {m.linkedin && <LinkedInLink href={m.linkedin} name={m.name ?? ""} />}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-night px-5 py-20 text-white md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={t.common.comparison.eyebrow} title={c.comparison.heading} intro={c.comparison.intro} />
          <FadeIn className="mt-14">
            <ComparisonTable rows={c.comparison.rows} tone="dark" />
          </FadeIn>

          <div className="mt-32 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-brand-sky">{c.cambodia.eyebrow}</p>
              <RevealHeading text={c.cambodia.heading} className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl" />
              <ul className="mt-10 space-y-6">
                {c.cambodia.points.map((p, i) => (
                  <FadeIn as="li" key={p.title} delay={i * 0.08} className="flex gap-5 border-t border-white/10 pt-6">
                    <span className="eyebrow pt-1.5 text-brand-sky">0{i + 1}</span>
                    <span>
                      <span className="block font-serif text-2xl">{p.title}</span>
                      <span className="mt-2 block text-white/55">{p.text}</span>
                    </span>
                  </FadeIn>
                ))}
              </ul>
            </div>
            <FadeIn>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-night-soft p-6 md:p-10">
                <OfficeMap />
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {offices.map((o) => (
                    <div key={o.city} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <p className="whitespace-nowrap font-serif text-2xl">{o.city}</p>
                      <p className="eyebrow mt-3 text-white/55">{c.cambodia.localTime}</p>
                      <LocalTime timeZone={o.timeZone} lang={lang} />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {testimonials}
    </>
  );
}

const humanCopy = {
  fr: {
    call: "Point hebdo · Paris ⇄ Phnom Penh",
    live: "En direct",
    chat: "La V2 est en ligne, on cale une démo demain ?",
  },
  en: {
    call: "Weekly sync · Paris ⇄ Phnom Penh",
    live: "Live",
    chat: "V2 is live, shall we book a demo tomorrow?",
  },
};

const subscribeSecond = (onChange: () => void) => {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
};

function LinkedInLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} · LinkedIn`}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    </a>
  );
}

function VisioCall({ members }: { members: TeamMember[] }) {
  const { lang } = useLocale();
  const h = humanCopy[lang];
  const picks = [0, 1, 3, 4, 2, 5].map((i) => members[i]).filter(Boolean);
  const chatter = members[2] ?? members[0];
  const seconds = useSyncExternalStore(
    subscribeSecond,
    () => Math.floor(Date.now() / 1000),
    () => 0,
  );
  const speaking = Math.floor(seconds / 3) % Math.max(1, picks.length);
  const elapsed = 14 * 60 + (seconds % 2700);
  const clock = seconds ? `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}` : "--:--";

  return (
    <div className="relative mx-auto mb-14 max-w-xl md:mb-0">
      <div aria-hidden className="absolute -inset-10 rounded-full bg-brand/25 blur-[90px]" />
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 1, delay: 0.2, ease }}
        className="relative rounded-[1.75rem] border border-white/10 bg-[#101219] p-3 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center justify-between px-2 pb-3 pt-1 text-xs">
          <span className="flex items-center gap-2 text-white/70">
            <span className="size-2 animate-pulse rounded-full bg-red-500" />
            {h.call}
          </span>
          <span className="font-mono tabular-nums text-white/55">{clock}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {picks.map((m, i) => (
            <figure
              key={m._id}
              className={`relative aspect-[4/5] overflow-hidden rounded-xl bg-night-soft ring-2 transition-shadow duration-500 ${i === speaking ? "ring-brand-sky shadow-[0_0_24px_rgba(71,145,255,0.55)]" : "ring-transparent"}`}
            >
              <SanityImage image={m.photo} alt={m.name ?? ""} fill width={400} priority={i < 3} sizes="(min-width: 1024px) 12vw, 30vw" className="object-cover object-top" />
              <figcaption className="absolute inset-x-1.5 bottom-1.5 flex items-center gap-1.5 rounded-lg bg-black/55 px-2 py-1 backdrop-blur">
                <span className="truncate text-[10px] font-medium">{m.name?.split(" ")[0]}</span>
                {i === speaking ? (
                  <span aria-hidden className="ml-auto flex h-2.5 items-end gap-px">
                    {[0, 1, 2].map((b) => (
                      <span key={b} className="w-0.5 origin-bottom animate-hl-eq rounded-full bg-brand-sky" style={{ height: "100%", animationDelay: `${b * 0.15}s` }} />
                    ))}
                  </span>
                ) : (
                  <span aria-hidden className="ml-auto size-1.5 rounded-full bg-white/30" />
                )}
              </figcaption>
            </figure>
          ))}
        </div>
        <div aria-hidden className="mt-3 flex items-center justify-center gap-2">
          {["M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3", "M3 7h12v10H3zM15 10l6-3v10l-6-3", "M4 5h16v11H4zM9 20h6M12 16v4"].map((d) => (
            <span key={d} className="grid size-9 place-items-center rounded-full bg-white/10">
              <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-white stroke-2">
                <path d={d} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ))}
          <span className="grid h-9 w-14 place-items-center rounded-full bg-red-500">
            <svg viewBox="0 0 24 24" className="size-4 rotate-[135deg] fill-white">
              <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.6 3.6a1 1 0 0 1-.25 1z" />
            </svg>
          </span>
        </div>
      </motion.div>

      {chatter && (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1, ease }}
        className="absolute -bottom-16 left-2 flex max-w-[16rem] gap-2.5 rounded-2xl rounded-bl-sm bg-white p-3 text-ink shadow-2xl md:-bottom-8 md:-left-10"
      >
        <span className="relative size-8 shrink-0 overflow-hidden rounded-full">
          <SanityImage image={chatter.photo} alt={chatter.name ?? ""} fill width={96} sizes="32px" className="object-cover object-top" />
        </span>
        <span>
          <span className="block text-[11px] font-medium">{chatter.name}</span>
          <span className="mt-0.5 block text-xs leading-snug text-ink/70">{h.chat}</span>
        </span>
      </motion.div>
      )}
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 -top-4 flex items-center gap-2 rounded-full border border-white/15 bg-night/80 px-3 py-1.5 text-xs backdrop-blur"
      >
        <span className="size-1.5 rounded-full bg-emerald-400" /> {h.live} · 🇫🇷 🇰🇭
      </motion.span>
    </div>
  );
}

const subscribeMinute = (onChange: () => void) => {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
};

export function LocalTime({ timeZone, lang }: { timeZone: string; lang: string }) {
  const time = useSyncExternalStore(
    subscribeMinute,
    () => new Date().toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit", timeZone }),
    () => "--:--",
  );
  return <p className="mt-1 font-mono text-2xl tabular-nums">{time}</p>;
}
