"use client";

import type { REVIEWS_QUERY_RESULT } from "@/sanity.types";
import { SanityImage } from "../cms/sanity-image";
import { MuxCard, type MuxVideoItem } from "../page/ui";
import { video1, video2, video3 } from "./content";
import { useLocale } from "./locale";
import { RevealHeading } from "./reveal";
import { useMounted } from "./use-mounted";

export type Review = REVIEWS_QUERY_RESULT[number];
type Item = { review: Review } | { video: MuxVideoItem };

const videos = [video1, video2, video3];
/** Seconds per item for one full loop, so every row scrolls at the same speed whatever its length. */
const SECONDS_PER_ITEM = 7;

/** Type metrics per breakpoint, used to size each row to the longest quote it holds. */
const LAYOUTS = {
  // Phones: 15px quotes and a 52px avatar (desktop: 15px from lg, 44px avatar).
  compact: { width: 340, narrowWidth: 300, lineHeight: 24.4, charWidth: 7.9, byline: 52 },
  desktop: { width: 420, narrowWidth: 330, lineHeight: 24.4, charWidth: 7.4, byline: 44 },
};
type Layout = (typeof LAYOUTS)[keyof typeof LAYOUTS];
type Size = { height: number; cardWidth: number };
type Row = { items: Item[]; compact: Size; desktop: Size };
const ROWS = 3;

// Card padding (2 × 28px) and the gap above the byline; the byline height is per layout.
const CARD_CHROME = 56 + 24;

/** Height and card width of a row on one breakpoint, from its longest quote. */
function size(chunk: Review[], layout: Layout, narrow: boolean): Size {
  const cardWidth = narrow ? layout.narrowWidth : layout.width;
  const charsPerLine = Math.floor((cardWidth - 56) / layout.charWidth);
  const longest = Math.max(0, ...chunk.map((review) => review.quote?.length ?? 0));
  const lines = Math.ceil((longest + 2) / charsPerLine);
  return { height: Math.max(200, Math.ceil(CARD_CHROME + layout.byline + lines * layout.lineHeight + 8)), cardWidth };
}

/**
 * Sorts reviews by length and cuts them into rows, so each row holds quotes of similar
 * size and can be only as tall as its longest one. The shortest row also gets narrower
 * cards. Each row gets one video. One set of rows for every screen (sized per breakpoint
 * with CSS variables), so the reviews are in the HTML once.
 */
function rows(reviews: Review[]): Row[] {
  const sorted = [...reviews].sort((a, b) => (a.quote?.length ?? 0) - (b.quote?.length ?? 0));
  const perRow = Math.ceil(sorted.length / ROWS);
  return Array.from({ length: ROWS }, (_, r) => {
    const chunk = sorted.slice(r * perRow, (r + 1) * perRow);
    const items: Item[] = chunk.map((review) => ({ review }));
    items.splice(r % 2 ? items.length : 0, 0, { video: videos[r % videos.length] });
    return { items, compact: size(chunk, LAYOUTS.compact, r === 0), desktop: size(chunk, LAYOUTS.desktop, r === 0) };
  });
}

export function TestimonialsMarquee({ reviews }: { reviews: Review[] }) {
  const { t } = useLocale();
  const mounted = useMounted();

  return (
    <section id="avis" className="relative overflow-hidden bg-night py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-brand-sky">{t.testimonials.eyebrow}</p>
            <RevealHeading text={t.testimonials.heading} className="mt-4 max-w-3xl font-serif text-[2.75rem] leading-[0.95] md:text-[4.125rem]" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl tracking-widest text-brand-sky">★★★★★</span>
            <span className="text-sm text-white/55">
              {reviews.length + videos.length} {t.testimonials.verified}
              <br />
              {t.testimonials.pause}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        {rows(reviews).map((row, r) => (
          <ReviewRow key={r} row={row} reverse={r === 1} loop={mounted} />
        ))}
      </div>
    </section>
  );
}

/**
 * One scrolling row. In the browser the list is rendered twice and shifted by exactly one copy
 * (-50%), so the loop is seamless; the second copy is hidden from assistive tech, and left out of
 * the server HTML (it only doubled the page weight).
 */
function ReviewRow({ row, reverse, loop }: { row: Row; reverse: boolean; loop: boolean }) {
  return (
    <div className="marquee-row group flex overflow-hidden">
      <ul
        className={`flex w-max items-center gap-5 pr-5 group-hover:[animation-play-state:paused] has-[[data-playing]]:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${row.items.length * SECONDS_PER_ITEM}s` }}
      >
        {(loop ? [0, 1] : [0]).flatMap((copy) =>
          row.items.map((item, i) => (
            <li
              key={`${copy}-${i}`}
              aria-hidden={copy === 1 || undefined}
              className={`flex h-(--h-sm) shrink-0 lg:h-(--h-lg) ${"video" in item ? "" : "w-(--w-sm) lg:w-(--w-lg)"}`}
              style={
                {
                  "--h-sm": `${row.compact.height}px`,
                  "--h-lg": `${row.desktop.height}px`,
                  "--w-sm": `${row.compact.cardWidth}px`,
                  "--w-lg": `${row.desktop.cardWidth}px`,
                } as React.CSSProperties
              }
            >
              {"video" in item ? <MuxCard item={item.video} decorative={copy === 1} /> : <Card review={item.review} />}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

function Card({ review }: { review: Review }) {
  const initials = (review.name ?? "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <figure className="flex h-full w-full flex-col justify-between rounded-3xl border border-white/10 bg-night-soft p-7 transition-colors hover:border-brand/50">
      <blockquote className="line-clamp-8 text-[15px] leading-relaxed text-white/80">&ldquo;{review.quote}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {review.photo?.asset ? (
          <span className="relative size-13 shrink-0 overflow-hidden rounded-full lg:size-11">
            <SanityImage image={review.photo} alt={review.name ?? ""} fill width={156} sizes="52px" className="object-cover" />
          </span>
        ) : (
          <span className="flex size-13 items-center justify-center rounded-full bg-brand/20 font-medium text-brand-sky lg:size-11">{initials}</span>
        )}
        <span>
          <span className="block text-[17px] font-medium lg:text-base">{review.name}</span>
          <span className="block text-sm text-white/55">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
