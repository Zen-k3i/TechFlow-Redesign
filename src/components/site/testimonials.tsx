// "use client";

// import Image from "next/image";
// import { testimonials, type Testimonial, TestimonialItem } from "./content";
// import { useLocale } from "./locale";
// import { RevealHeading } from "./reveal";
// import { MuxCard } from "../page/ui";

// const compactRows = [
//   testimonials.slice(0, 5),
//   testimonials.slice(5).concat(testimonials.slice(0, 1)),
// ];
// const desktopRows = [
//   testimonials.slice(0, 3),
//   testimonials.slice(3, 6),
//   testimonials.slice(6),
// ];

// export function Testimonials() {
//   const { t } = useLocale();
//   return (
//     <section
//       id="avis"
//       className="relative overflow-hidden bg-night py-28 text-white md:py-36"
//     >
//       <div className="mx-auto max-w-7xl px-5 md:px-10">
//         <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
//           <div>
//             <p className="eyebrow text-brand-sky">{t.testimonials.eyebrow}</p>
//             <RevealHeading
//               text={t.testimonials.heading}
//               className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl"
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-2xl tracking-widest text-brand-sky">
//               ★★★★★
//             </span>
//             <span className="text-sm text-white/55">
//               {testimonials.length} {t.testimonials.verified}
//               <br />
//               {t.testimonials.pause}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="mt-16 space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] lg:hidden">
//         {compactRows.map((row, r) => (
//           <ReviewRow key={r} row={row} reverse={r === 1} />
//         ))}
//       </div>

//       <div className="mt-16 hidden space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] lg:block">
//         {desktopRows.map((row, r) => (
//           <ReviewRow key={r} row={row} reverse={r === 1} />
//         ))}
//       </div>
//     </section>
//   );
// }

// function ReviewRow({
//   row,
//   reverse,
// }: {
//   row: TestimonialItem[];
//   reverse: boolean;
// }) {
//   return (
//     <div className="marquee-row group flex overflow-hidden">
//       <ul
//         className={`flex w-max items-stretch gap-5 pr-5 group-hover:[animation-play-state:paused] ${
//           reverse ? "animate-marquee-reverse" : "animate-marquee"
//         }`}
//       >
//         {[...row, ...row].map((item, i) => (
//           <li
//             key={i}
//             aria-hidden={i >= row.length}
//             className="flex w-[340px] shrink-0 md:w-[420px]"
//           >
//             {"kind" in item && item.kind === "video" ? (
//               <MuxCard item={item} />
//             ) : (
//               <Card testimonial={item as Testimonial} />
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function Card({ testimonial: t }: { testimonial: Testimonial }) {
//   return (
//     <figure className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-night-soft p-7 transition-colors hover:border-brand/50">
//       <blockquote className="text-[15px] leading-relaxed text-white/80">
//         &ldquo;{t.quote}&rdquo;
//       </blockquote>
//       <figcaption className="mt-6 flex items-center gap-3">
//         {t.photo ? (
//           <Image
//             src={t.photo}
//             alt=""
//             width={44}
//             height={44}
//             className="size-11 rounded-full object-cover"
//           />
//         ) : (
//           <span className="flex size-11 items-center justify-center rounded-full bg-brand/20 font-medium text-brand-sky">
//             {t.name
//               .split(" ")
//               .map((n) => n[0])
//               .join("")}
//           </span>
//         )}
//         <span>
//           <span className="block font-medium">{t.name}</span>
//           <span className="block text-sm text-white/50">{t.role}</span>
//         </span>
//       </figcaption>
//     </figure>
//   );
// }
"use client";

import Image from "next/image";
import {
  testimonials,
  video1,
  video2,
  video3,
  type Testimonial,
  type TestimonialItem,
} from "./content";
import { useLocale } from "./locale";
import { RevealHeading } from "./reveal";
import { MuxCard } from "../page/ui";

// Mobile / Tablet: 2 rows -> 1 video in each row
const compactRows: TestimonialItem[][] = [
  [video1, ...testimonials.slice(0, 4)],
  [video2, ...testimonials.slice(4, 9), video3],
];

// Desktop: 3 rows -> exactly 1 video per row
const desktopRows: TestimonialItem[][] = [
  [video1, ...testimonials.slice(0, 3)],
  [...testimonials.slice(3, 6), video2],
  [...testimonials.slice(6), video3],
];

export function Testimonials() {
  const { t } = useLocale();

  return (
    <section
      id="avis"
      className="relative overflow-hidden bg-night py-28 text-white md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-brand-sky">{t.testimonials.eyebrow}</p>
            <RevealHeading
              text={t.testimonials.heading}
              className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl tracking-widest text-brand-sky">
              ★★★★★
            </span>
            <span className="text-sm text-white/55">
              {testimonials.length + 3} {t.testimonials.verified}
              <br />
              {t.testimonials.pause}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet (2 Rows) */}
      <div className="mt-16 space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] lg:hidden">
        {compactRows.map((row, r) => (
          <ReviewRow key={r} row={row} reverse={r === 1} />
        ))}
      </div>

      {/* Desktop (3 Rows) */}
      <div className="mt-16 hidden space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] lg:block">
        {desktopRows.map((row, r) => (
          <ReviewRow key={r} row={row} reverse={r === 1} />
        ))}
      </div>
    </section>
  );
}

function ReviewRow({
  row,
  reverse,
}: {
  row: TestimonialItem[];
  reverse: boolean;
}) {
  return (
    <div className="marquee-row group flex overflow-hidden">
      <ul
        className={`flex w-max items-center gap-5 pr-5 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...row, ...row].map((item, i) => {
          const isVideo = "kind" in item && item.kind === "video";

          return (
            <li
              key={i}
              aria-hidden={i >= row.length}
              className={`flex h-[300px] shrink-0 md:h-[320px] ${
                isVideo ? "w-auto" : "w-[340px] md:w-[420px]"
              }`}
            >
              {isVideo ? (
                <MuxCard item={item} />
              ) : (
                <Card testimonial={item as Testimonial} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Card({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full w-full flex-col justify-between rounded-3xl border border-white/10 bg-night-soft p-7 transition-colors hover:border-brand/50">
      <blockquote className="text-[15px] leading-relaxed text-white/80">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {t.photo ? (
          <Image
            src={t.photo}
            alt={t.name}
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-11 items-center justify-center rounded-full bg-brand/20 font-medium text-brand-sky">
            {t.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        )}
        <span>
          <span className="block font-medium">{t.name}</span>
          <span className="block text-sm text-white/50">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
