"use client";

import type { REVIEWS_QUERY_RESULT } from "@/sanity.types";
import { SanityImage } from "../cms/sanity-image";
import { MuxCard, type MuxVideoItem } from "../page/ui";
import { video1, video2, video3 } from "./content";
import { useLocale } from "./locale";
import { RevealHeading } from "./reveal";

export type Review = REVIEWS_QUERY_RESULT[number];
type Item = { review: Review } | { video: MuxVideoItem };

const videos = [video1, video2, video3];
/** Seconds per item for one full loop, so every row scrolls at the same speed whatever its length. */
const SECONDS_PER_ITEM = 7;

/** Type metrics per breakpoint, used to size each row to the longest quote it holds. */
const LAYOUTS = {
  compact: { rows: 2, width: 340, narrowWidth: 300, text: "text-sm", lineHeight: 22.75, charWidth: 7.4 },
  desktop: { rows: 3, width: 420, narrowWidth: 330, text: "text-[15px]", lineHeight: 24.4, charWidth: 7.4 },
};
type Layout = (typeof LAYOUTS)[keyof typeof LAYOUTS];
type Row = { items: Item[]; height: number; cardWidth: number };

// Card padding (2 × 28px), the gap above the byline and the byline itself.
const CARD_CHROME = 56 + 24 + 44;

/**
 * Sorts reviews by length and cuts them into rows, so each row holds quotes of similar
 * size and can be only as tall as its longest one. The shortest row also gets narrower
 * cards. Each row gets one video.
 */
function rows(reviews: Review[], layout: Layout): Row[] {
  const sorted = [...reviews].sort((a, b) => (a.quote?.length ?? 0) - (b.quote?.length ?? 0));
  const perRow = Math.ceil(sorted.length / layout.rows);
  return Array.from({ length: layout.rows }, (_, r) => {
    const chunk = sorted.slice(r * perRow, (r + 1) * perRow);
    const cardWidth = r === 0 ? layout.narrowWidth : layout.width;
    const charsPerLine = Math.floor((cardWidth - 56) / layout.charWidth);
    const longest = Math.max(0, ...chunk.map((review) => review.quote?.length ?? 0));
    const lines = Math.ceil((longest + 2) / charsPerLine);
    const height = Math.max(200, Math.ceil(CARD_CHROME + lines * layout.lineHeight + 8));
    const items: Item[] = chunk.map((review) => ({ review }));
    items.splice(r % 2 ? items.length : 0, 0, { video: videos[r % videos.length] });
    return { items, height, cardWidth };
  });
}

export function TestimonialsMarquee({ reviews }: { reviews: Review[] }) {
  const { t } = useLocale();

  return (
    <section id="avis" className="relative overflow-hidden bg-night py-28 text-white md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-brand-sky">{t.testimonials.eyebrow}</p>
            <RevealHeading text={t.testimonials.heading} className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl" />
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

      {/* Mobile / tablet: 2 rows */}
      <div className="mt-16 space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] lg:hidden">
        {rows(reviews, LAYOUTS.compact).map((row, r) => (
          <ReviewRow key={r} row={row} reverse={r === 1} textClass={LAYOUTS.compact.text} />
        ))}
      </div>

      {/* Desktop: 3 rows */}
      <div className="mt-16 hidden space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] lg:block">
        {rows(reviews, LAYOUTS.desktop).map((row, r) => (
          <ReviewRow key={r} row={row} reverse={r === 1} textClass={LAYOUTS.desktop.text} />
        ))}
      </div>
    </section>
  );
}

/**
 * One scrolling row. The list is rendered twice and shifted by exactly one copy (-50%),
 * so the loop is seamless; the second copy is hidden from assistive tech.
 */
function ReviewRow({ row, reverse, textClass }: { row: Row; reverse: boolean; textClass: string }) {
  return (
    <div className="marquee-row group flex overflow-hidden">
      <ul
        className={`flex w-max items-center gap-5 pr-5 group-hover:[animation-play-state:paused] has-[[data-playing]]:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${row.items.length * SECONDS_PER_ITEM}s` }}
      >
        {[0, 1].flatMap((copy) =>
          row.items.map((item, i) => (
            <li
              key={`${copy}-${i}`}
              aria-hidden={copy === 1 || undefined}
              className="flex shrink-0"
              style={{ height: row.height, width: "video" in item ? "auto" : row.cardWidth }}
            >
              {"video" in item ? <MuxCard item={item.video} decorative={copy === 1} /> : <Card review={item.review} textClass={textClass} />}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

function Card({ review, textClass }: { review: Review; textClass: string }) {
  const initials = (review.name ?? "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <figure className="flex h-full w-full flex-col justify-between rounded-3xl border border-white/10 bg-night-soft p-7 transition-colors hover:border-brand/50">
      <blockquote className={`line-clamp-8 leading-relaxed text-white/80 ${textClass}`}>&ldquo;{review.quote}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {review.photo?.asset ? (
          <span className="relative size-11 shrink-0 overflow-hidden rounded-full">
            <SanityImage image={review.photo} alt={review.name ?? ""} fill width={132} sizes="44px" className="object-cover" />
          </span>
        ) : (
          <span className="flex size-11 items-center justify-center rounded-full bg-brand/20 font-medium text-brand-sky">{initials}</span>
        )}
        <span>
          <span className="block font-medium">{review.name}</span>
          <span className="block text-sm text-white/50">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
