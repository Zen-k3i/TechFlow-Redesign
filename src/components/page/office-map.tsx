"use client";

import { motion, useReducedMotion } from "motion/react";

/** Coordinate space of `/images/world-dots.svg`, a dotted version of the studio's world map. */
const W = 1545;
const H = 768;

/** `labelAt` places each label beside its marker; the two close Asian cities split above/below. */
const CITIES = [
  { id: "paris", label: "Paris", x: 751, y: 270, labelAt: "left" },
  { id: "phnom-penh", label: "Phnom Penh", x: 1192, y: 447, labelAt: "above-right" },
  { id: "singapore", label: "Singapore", x: 1188, y: 492, labelAt: "below-right" },
] as const;

const LABEL_POSITION = {
  left: "-translate-x-[calc(100%+14px)] -translate-y-1/2",
  "above-right": "translate-x-[14px] -translate-y-[calc(100%+14px)]",
  "below-right": "translate-x-[14px] translate-y-[14px]",
} as const;

type City = (typeof CITIES)[number];
const city = (id: City["id"]) => CITIES.find((c) => c.id === id)!;

/** Quadratic arc between two cities, bowed upward in proportion to their distance. */
function arc(from: City, to: City, lift = 0.32) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  return `M${from.x} ${from.y}Q${mx} ${my - dist * lift} ${to.x} ${to.y}`;
}

const ROUTES = [
  { id: "paris-phnom-penh", d: arc(city("paris"), city("phnom-penh"), 0.24) },
  { id: "paris-singapore", d: arc(city("paris"), city("singapore"), 0.5) },
  // Short hop: bow it sideways so it doesn't sit on top of the markers.
  { id: "phnom-penh-singapore", d: `M1192 447Q1240 470 1188 492` },
];

/**
 * Dotted world map with glowing routes between the Paris, Phnom Penh and Singapore offices.
 * The routes draw in when the map scrolls into view and a light pulse travels along each one.
 */
export function OfficeMap({ className = "" }: { className?: string }) {
  const still = useReducedMotion() ?? false;

  return (
    <div className={`relative aspect-[1545/768] w-full ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing for next/image to optimize */}
      <img src="/images/world-dots.svg" alt="" aria-hidden className="absolute inset-0 size-full opacity-30" />

      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="route" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#4791ff" />
            <stop offset="1" stopColor="#4766ff" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {ROUTES.map((route, i) => (
          <g key={route.id}>
            {/* Soft halo under the line */}
            <motion.path
              d={route.d}
              fill="none"
              stroke="#4766ff"
              strokeOpacity={0.35}
              strokeWidth={8}
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: still ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.6, delay: 0.3 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              id={route.id}
              d={route.d}
              fill="none"
              stroke="url(#route)"
              strokeWidth={2.2}
              strokeLinecap="round"
              initial={{ pathLength: still ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.6, delay: 0.3 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            {!still && (
              <circle r={4} fill="#fff" filter="url(#glow)">
                <animateMotion dur={`${3.2 + i * 0.6}s`} begin={`${2 + i * 0.4}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#${route.id}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${3.2 + i * 0.6}s`} begin={`${2 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}

        {CITIES.map((c) => (
          <g key={c.id} filter="url(#glow)">
            {!still && (
              <circle cx={c.x} cy={c.y} r={7} fill="none" stroke="#4791ff" strokeWidth={2}>
                <animate attributeName="r" values="7;22" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={c.x} cy={c.y} r={7} fill="#4791ff" />
            <circle cx={c.x} cy={c.y} r={3} fill="#fff" />
          </g>
        ))}
      </svg>

      {/* Labels are HTML so the text stays crisp at every map size. */}
      {CITIES.map((c) => (
        <span
          key={c.id}
          className={`absolute whitespace-nowrap rounded-md border border-white/10 bg-night/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur md:text-[11px] ${LABEL_POSITION[c.labelAt]}`}
          style={{ left: `${(c.x / W) * 100}%`, top: `${(c.y / H) * 100}%` }}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}
