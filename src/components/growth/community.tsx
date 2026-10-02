"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/image";
import type { CmsImage } from "../cms/sanity-image";
import { ease } from "../site/content";
import { useLocale } from "../site/locale";
import { FadeIn, RevealHeading } from "../site/reveal";
import { useStill } from "../site/use-still";
import { growthCopy, type DayKey } from "./copy";
import { PhoneMockup } from "./phone-mockup";
import { BrandAvatar } from "./social-ad";
import { SECTION_IDS, type Brand } from "./types";

export type CalendarPost = { _key: string; day: string | null; format: string | null; title: string | null };
export type Comment = { _key: string; author: string | null; text: string | null; reply: string | null };

const DAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

/**
 * Community management: the weekly commitment and a typical week on the left; on the right the
 * brand's profile grid, and a comment thread where every comment gets a reply.
 */
export function Community({
  heading,
  intro,
  perWeek,
  calendar,
  posts,
  thread,
  brand,
}: {
  heading: string | null;
  intro: string | null;
  perWeek: number | null;
  calendar: CalendarPost[];
  /** Post visuals for the profile grid (falls back to accent tiles). */
  posts: (CmsImage | string)[];
  thread: Comment[];
  brand: Brand;
}) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const scheduled = new Set(calendar.map((p) => p.day));

  return (
    <section id={SECTION_IDS.community} className="relative overflow-hidden rounded-[2.5rem] bg-paper px-5 py-28 text-ink md:rounded-[4rem] md:px-10 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          {heading && <RevealHeading text={heading} accentClassName="italic text-brand-deep" className="font-serif text-5xl leading-[0.95] md:text-7xl" />}
          {intro && (
            <FadeIn>
              <p className="mt-6 max-w-lg text-ink/60 md:text-lg">{intro}</p>
            </FadeIn>
          )}

          <FadeIn className="mt-10 flex flex-wrap gap-3">
            {perWeek ? <span className="rounded-full bg-ink px-5 py-3 font-serif text-2xl text-paper">{c.postsPerWeek(perWeek)}</span> : null}
            <span className="rounded-full border border-ink/20 px-5 py-3 font-serif text-2xl">{c.everyComment}</span>
          </FadeIn>

          {calendar.length > 0 && (
            <FadeIn className="mt-10 rounded-[1.75rem] border border-ink/10 bg-white p-5 md:p-7">
              <p className="eyebrow text-ink/45">{c.typicalWeek}</p>
              <div className="mt-4 grid grid-cols-7 gap-1.5" aria-hidden>
                {DAYS.map((d) => (
                  <span key={d} className={`rounded-xl py-3 text-center text-sm ${scheduled.has(d) ? "bg-brand-deep text-white" : "bg-ink/[0.04] text-ink/40"}`}>
                    {c.days[d]}
                  </span>
                ))}
              </div>
              <ul className="mt-4 space-y-2">
                {calendar.map((p) => (
                  <li key={p._key} className="flex items-center justify-between gap-4 rounded-xl bg-ink/[0.03] px-4 py-3">
                    <span className="flex items-center gap-3">
                      <span className="w-10 text-sm font-medium">{p.day && p.day in c.days ? c.days[p.day as DayKey] : p.day}</span>
                      <span className="text-sm text-ink/70">{p.title}</span>
                    </span>
                    {p.format && <span className="eyebrow shrink-0 rounded-full border border-ink/15 px-2.5 py-1 text-ink/55">{p.format}</span>}
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}
        </div>

        <div className="relative mx-auto flex w-full max-w-[34rem] justify-center pb-8 pt-4">
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: -5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="w-[58%] max-w-[270px] -mr-[10%] mt-10"
          >
            <ProfileGrid posts={posts} brand={brand} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="relative z-10 w-[58%] max-w-[270px]"
          >
            <Thread thread={thread} brand={brand} />
          </motion.div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-ink/40">{c.exampleThread}</p>
    </section>
  );
}

function tileSrc(post: CmsImage | string) {
  if (typeof post === "string") return post;
  return post?.asset?.url ? urlFor(post as SanityImageSource).width(300).height(300).fit("crop").url() : null;
}

function ProfileGrid({ posts, brand }: { posts: (CmsImage | string)[]; brand: Brand }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const tiles = Array.from({ length: 9 }, (_, i) => (posts.length ? tileSrc(posts[i % posts.length]) : null));
  return (
    <PhoneMockup tone="light">
      <div className="absolute inset-0 bg-white pt-[14%] text-ink [font-size:3.6cqw]">
        <div className="flex items-center gap-[4%] px-[6%]">
          <BrandAvatar brand={brand} className="size-[5em] border-2 text-[1.4em] text-white" />
          <span className="min-w-0">
            <span className="block truncate font-semibold">{brand.handle}</span>
            <span className="block truncate text-[0.9em] text-ink/55">{brand.name}</span>
          </span>
        </div>
        <div className="mx-[6%] mt-[5%] rounded-[0.6em] bg-ink/[0.06] py-[0.5em] text-center text-[0.9em] font-semibold">{c.follow}</div>
        <div className="mt-[6%] grid grid-cols-3 gap-[2px]">
          {tiles.map((src, i) =>
            src ? (
              // eslint-disable-next-line @next/next/no-img-element -- small CDN-resized tiles inside a mockup
              <img key={i} src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
            ) : (
              <span
                key={i}
                className="block aspect-square"
                style={{ background: `linear-gradient(${135 + i * 25}deg, ${brand.accent}, #1b1b1b ${60 + (i % 3) * 12}%)`, opacity: 0.55 + (i % 4) * 0.12 }}
              />
            ),
          )}
        </div>
      </div>
    </PhoneMockup>
  );
}

/** Comments arrive one by one, each answered by the brand after a "typing…" beat. */
function Thread({ thread, brand }: { thread: Comment[]; brand: Brand }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];
  const still = useStill();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const total = thread.length * 2;
  const [tick, setTick] = useState(0);
  const step = still ? total + 1 : tick;

  useEffect(() => {
    if (still || !inView) return;
    const id = setTimeout(() => setTick((s) => (s + 1) % (total + 3)), tick >= total ? 3000 : 1500);
    return () => clearTimeout(id);
  }, [tick, inView, still, total]);

  return (
    <div ref={ref}>
      <PhoneMockup>
        <div className="absolute inset-0 flex flex-col bg-white pt-[12%] text-ink [font-size:3.6cqw]">
          <div className="border-b border-ink/10 pb-[3%] text-center font-semibold">{c.comments}</div>
          <ul className="flex-1 space-y-[1em] overflow-hidden px-[5%] py-[5%]" aria-label={c.comments}>
            {thread.map((m, i) => {
              const showComment = step > i * 2;
              const typing = step === i * 2 + 1;
              const showReply = step > i * 2 + 1;
              return (
                <li key={m._key}>
                  <AnimatePresence>
                    {showComment && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-[0.6em]">
                        <span className="flex size-[2.2em] shrink-0 items-center justify-center rounded-full bg-ink/10 text-[0.85em] font-semibold uppercase">{m.author?.[0]}</span>
                        <span>
                          <span className="font-semibold">{m.author}</span> <span>{m.text}</span>
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    {typing && (
                      <motion.p key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-[2.8em] mt-[0.5em] text-[0.85em] text-ink/45">
                        {c.typing(brand.handle)}
                      </motion.p>
                    )}
                    {showReply && (
                      <motion.div key="reply" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="ml-[2.8em] mt-[0.5em] flex gap-[0.6em]">
                        <BrandAvatar brand={brand} className="size-[1.9em] text-[0.85em] text-white" />
                        <span>
                          <span className="font-semibold">{brand.handle}</span> <span className="rounded bg-ink/5 px-[0.3em] text-[0.75em] text-ink/50">{c.author}</span>{" "}
                          <span>{m.reply}</span>
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-[0.6em] border-t border-ink/10 px-[5%] py-[4%] text-ink/40">
            <span className="size-[2em] rounded-full bg-ink/10" />
            {c.addComment}
          </div>
        </div>
      </PhoneMockup>
    </div>
  );
}
