"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { AdVideo, Platform } from "./data";

export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.6rem] bg-linear-to-b from-[#3a3a3f] to-[#18181b] p-[7px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.12)] ${className}`}
    >
      <span aria-hidden className="absolute -left-[3px] top-[22%] h-10 w-[3px] rounded-l bg-[#2a2a2e]" />
      <span aria-hidden className="absolute -left-[3px] top-[30%] h-14 w-[3px] rounded-l bg-[#2a2a2e]" />
      <span aria-hidden className="absolute -right-[3px] top-[26%] h-20 w-[3px] rounded-r bg-[#2a2a2e]" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-black [container-type:inline-size]">
        {children}
        <span aria-hidden className="absolute left-1/2 top-[1.6%] z-30 h-[3.4%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

type AdScreenProps = {
  ad: AdVideo;
  index: number;
  platform: Platform;
  handle: string;
  accent: string;
  playing: boolean;
  muted?: boolean;
  compact?: boolean;
};

/** Sizes use container query units so the UI scales with whatever width the phone is rendered at. */
export function AdScreen({ ad, index, platform, handle, accent, playing, muted = true, compact }: AdScreenProps) {
  return (
    <div className="absolute inset-0 text-white [font-size:3.6cqw]">
      <AdMedia ad={ad} index={index} playing={playing} muted={muted} accent={accent} />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/45 via-transparent to-black/75" />
      <StatusBar />
      {platform === "tiktok" ? (
        <TikTokChrome ad={ad} handle={handle} accent={accent} compact={compact} />
      ) : (
        <ReelsChrome ad={ad} handle={handle} platform={platform} accent={accent} compact={compact} />
      )}
    </div>
  );
}

function AdMedia({
  ad,
  index,
  playing,
  muted,
  accent,
}: {
  ad: AdVideo;
  index: number;
  playing: boolean;
  muted: boolean;
  accent: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(!ad.src);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (v && (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE)) setFailed(true);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing, failed]);

  return (
    <>
      {failed ? (
        <AdPoster ad={ad} index={index} accent={accent} playing={playing} />
      ) : (
        <video
          ref={ref}
          src={ad.src}
          poster={ad.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[0.5cqw] min-h-[2px] bg-white/20">
        {failed ? (
          playing && (
            <motion.div
              key={ad.id}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
              className="h-full origin-left bg-white"
            />
          )
        ) : (
          <div className="h-full origin-left bg-white" style={{ transform: `scaleX(${progress})` }} />
        )}
      </div>
    </>
  );
}

function AdPoster({ ad, index, accent, playing }: { ad: AdVideo; index: number; accent: string; playing: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b0a08]">
      <motion.div
        animate={playing ? { scale: [1, 1.12], y: ["0%", "-4%"] } : { scale: 1, y: "0%" }}
        transition={{ duration: 12, ease: "linear", repeat: playing ? Infinity : 0, repeatType: "reverse" }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 60% at ${20 + index * 15}% 0%, ${accent}aa, transparent 65%), radial-gradient(90% 50% at 80% 100%, #2a3a9b, transparent 70%), linear-gradient(180deg, #2a2112, #07080d)`,
        }}
      >
        <svg viewBox="0 0 100 200" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-[78%] w-full opacity-90">
          <defs>
            <linearGradient id={`tower-${ad.id}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={accent} stopOpacity="0.9" />
              <stop offset="1" stopColor={accent} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path d="M38 200 L40 30 L50 6 L60 30 L62 200 Z" fill={`url(#tower-${ad.id})`} opacity="0.35" />
          <path d="M40 30 L50 6 L60 30" fill="none" stroke={accent} strokeWidth="0.4" />
          {Array.from({ length: 34 }, (_, i) => (
            <line key={i} x1="40.5" x2="61.5" y1={36 + i * 5} y2={36 + i * 5} stroke={accent} strokeOpacity={0.12 + (i % 5 === 0 ? 0.25 : 0)} strokeWidth="0.3" />
          ))}
          <path d="M0 200 L0 150 L12 150 L12 132 L22 132 L22 160 L30 160 L30 140 L36 140 L36 200 Z M64 200 L64 146 L72 146 L72 128 L82 128 L82 156 L90 156 L90 138 L100 138 L100 200 Z" fill="#000" opacity="0.7" />
        </svg>
      </motion.div>
      <div className="absolute inset-x-[7%] top-[20%]">
        <p className="font-mono text-[0.75em] uppercase tracking-[0.2em]" style={{ color: accent }}>
          {ad.angle}
        </p>
        <p className="mt-[0.5em] font-serif text-[2.1em] leading-[1.02]">{ad.hook}</p>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[8%] pt-[3.2%] text-[0.95em] font-medium">
      <span>9:41</span>
      <span className="flex items-center gap-[0.35em]">
        <svg viewBox="0 0 18 12" className="h-[0.8em]" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.6" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.6" />
          <rect x="10" y="3" width="3" height="9" rx="0.6" />
          <rect x="15" y="0" width="3" height="12" rx="0.6" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-[0.8em]" fill="none" stroke="currentColor">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" strokeOpacity="0.5" />
          <rect x="2.5" y="2.5" width="16" height="7" rx="1.5" fill="currentColor" stroke="none" />
          <path d="M24.5 4v4" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

const icons = {
  heart: "M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.2 5.2 3 1.6-1.8 3.1-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z",
  comment: "M4 5h16v11H9l-5 4V5z",
  send: "M3 11l18-8-8 18-2-8-8-2z",
  bookmark: "M6 3h12v18l-6-4-6 4V3z",
  share: "M14 4l7 7-7 7v-4c-6 0-9 2-11 6 1-7 4-11 11-12V4z",
};

function Icon({ d, filled }: { d: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.9em] drop-shadow" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function Avatar({ accent, className = "" }: { accent: string; className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-white/70 font-serif text-[0.9em] ${className}`}
      style={{ background: `linear-gradient(135deg, ${accent}, #1b1b1b)` }}
    >
      G
    </span>
  );
}

function ReelsChrome({
  ad,
  handle,
  platform,
  accent,
  compact,
}: {
  ad: AdVideo;
  handle: string;
  platform: Platform;
  accent: string;
  compact?: boolean;
}) {
  const isFb = platform === "facebook";
  return (
    <>
      <div className="absolute inset-x-0 top-[7%] z-10 flex items-center justify-between px-[6%] text-[1.35em] font-semibold">
        <span>Reels</span>
        <span className="text-[0.7em] font-normal text-white/70">{isFb ? "Facebook" : "Instagram"}</span>
      </div>

      <div className="absolute bottom-[17%] right-[4%] z-10 flex flex-col items-center gap-[1.3em]">
        <Icon d={icons.heart} />
        <Icon d={icons.comment} />
        <Icon d={icons.send} />
        <span className="text-[1.4em] leading-none">···</span>
      </div>

      <div className="absolute inset-x-[5%] bottom-[4%] z-10 pr-[14%]">
        <div className="flex items-center gap-[0.6em]">
          <Avatar accent={accent} className="size-[2.3em]" />
          <span className="min-w-0">
            <span className="block truncate font-semibold">{isFb ? "G.A.T.O Tower" : handle}</span>
            <span className="block text-[0.85em] text-white/75">Sponsored{isFb ? " · 🌐" : ""}</span>
          </span>
          {!isFb && <span className="ml-auto rounded-[0.5em] border border-white/60 px-[0.7em] py-[0.2em] text-[0.85em] font-semibold">Follow</span>}
        </div>
        {!compact && <p className="mt-[0.6em] line-clamp-2 text-[0.95em] leading-snug text-white/90">{ad.caption}</p>}
        <div
          className="mt-[0.8em] flex items-center justify-between rounded-[0.6em] px-[0.9em] py-[0.6em] text-[0.95em] font-semibold"
          style={{ background: isFb ? "rgba(255,255,255,0.18)" : accent, color: isFb ? "white" : "#111" }}
        >
          {ad.cta}
          <span>›</span>
        </div>
      </div>
    </>
  );
}

function TikTokChrome({ ad, handle, accent, compact }: { ad: AdVideo; handle: string; accent: string; compact?: boolean }) {
  return (
    <>
      <div className="absolute inset-x-0 top-[7%] z-10 flex justify-center gap-[1.2em] text-[1.1em] font-semibold">
        <span className="text-white/60">Following</span>
        <span className="border-b-2 border-white pb-[0.2em]">For You</span>
      </div>

      <div className="absolute bottom-[15%] right-[3.5%] z-10 flex flex-col items-center gap-[1.2em]">
        <span className="relative">
          <Avatar accent={accent} className="size-[2.6em] border-2 border-white" />
          <span className="absolute -bottom-[0.5em] left-1/2 flex size-[1.2em] -translate-x-1/2 items-center justify-center rounded-full bg-[#fe2c55] text-[0.8em]">
            +
          </span>
        </span>
        <Icon d={icons.heart} filled />
        <Icon d={icons.comment} filled />
        <Icon d={icons.bookmark} filled />
        <Icon d={icons.share} filled />
      </div>

      <div className="absolute inset-x-[5%] bottom-[4%] z-10 pr-[18%]">
        <p className="font-semibold">@{handle}</p>
        {!compact && <p className="mt-[0.3em] line-clamp-2 text-[0.95em] leading-snug text-white/90">{ad.caption}</p>}
        <span className="mt-[0.4em] inline-block rounded-[0.3em] bg-white/20 px-[0.5em] py-[0.1em] text-[0.8em]">Sponsored</span>
        <div className="mt-[0.7em] flex items-center justify-between rounded-[0.4em] bg-[#fe2c55] px-[0.9em] py-[0.6em] text-[0.95em] font-semibold">
          {ad.cta}
          <span>›</span>
        </div>
      </div>
    </>
  );
}
