"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../site/locale";
import { growthCopy } from "./copy";
import { posterUrl } from "./media";
import type { Ad, Brand, Platform } from "./types";

/** Seconds into the video for the still shown before it plays, past the black opening frames. */
const STILL_AT = 1.5;

type SocialAdProps = {
  ad: Ad;
  brand: Brand;
  platform: Platform;
  /** Play (muted unless `muted` is false). Playback also stops while the ad is off screen. */
  playing: boolean;
  muted?: boolean;
  /** Hide the caption, for small phones. */
  compact?: boolean;
  mediaRef?: (video: HTMLVideoElement | null) => void;
};

/**
 * A video ad as it appears in a social feed: the video (or its poster) under the platform's own
 * interface. Sizes use container query units, so it scales with whatever phone it sits in.
 */
export function SocialAd({ ad, brand, platform, playing, muted = true, compact, mediaRef }: SocialAdProps) {
  return (
    <div className="absolute inset-0 text-white [font-size:3.6cqw]">
      <AdMedia ad={ad} brand={brand} playing={playing} muted={muted} mediaRef={mediaRef} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/45 via-transparent to-black/75" />
      <SocialAdOverlay ad={ad} brand={brand} platform={platform} compact={compact} />
    </div>
  );
}

/**
 * The video loads nothing until it comes near the viewport (`preload="none"`, no source); then it
 * fetches its start (`preload="metadata"`) and shows the frame at `STILL_AT` seconds, so the phone
 * shows the ad even without a poster (several ads open on black frames). It plays from 0 only while
 * `playing` and visible. Without a file it shows the poster, or a designed poster with the hook.
 */
function AdMedia({ ad, brand, playing, muted, mediaRef }: { ad: Ad; brand: Brand; playing: boolean; muted: boolean; mediaRef?: SocialAdProps["mediaRef"] }) {
  const { lang } = useLocale();
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [progress, setProgress] = useState(0);
  const poster = posterUrl(ad);
  // Stable, so the parent's `mediaRef` runs once per video element rather than on every render.
  const setVideo = useCallback(
    (el: HTMLVideoElement | null) => {
      video.current = el;
      mediaRef?.(el);
    },
    [mediaRef],
  );
  const src = ad.video && !failed ? ad.video : null;
  // Until the first play, the video rests on its still frame; playback then starts from the top.
  const started = useRef(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "300px" });
    const seen = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  const shouldPlay = playing && (visible || !muted);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (shouldPlay) {
      if (!started.current) {
        started.current = true;
        v.currentTime = 0;
      }
      v.play().catch(() => {});
    } else v.pause();
  }, [shouldPlay, near, src]);

  useEffect(() => {
    if (video.current) video.current.muted = muted;
  }, [muted]);

  return (
    <div ref={box} className="absolute inset-0 bg-[#0b0a08]">
      {src ? (
        <video
          ref={setVideo}
          src={near || playing ? src : undefined}
          poster={poster ?? undefined}
          muted={muted}
          loop={muted}
          playsInline
          preload={near ? "metadata" : "none"}
          crossOrigin={ad.captions ? "anonymous" : undefined}
          aria-label={ad.angle ?? undefined}
          onError={() => setFailed(true)}
          onLoadedMetadata={(e) => {
            if (!started.current && !poster) e.currentTarget.currentTime = Math.min(STILL_AT, e.currentTarget.duration / 2);
          }}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
          className="absolute inset-0 h-full w-full object-cover"
        >
          {ad.captions && <track kind="captions" src={ad.captions} srcLang={lang} label={lang === "fr" ? "Sous-titres" : "Subtitles"} default />}
        </video>
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element -- fixed-size Sanity crop, already resized by the CDN
        <img src={poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <DesignedPoster ad={ad} accent={brand.accent} />
      )}
      {src && (
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-[0.5cqw] min-h-[2px] bg-white/20">
          <div className="h-full origin-left bg-white" style={{ transform: `scaleX(${progress})` }} />
        </div>
      )}
    </div>
  );
}

/** Stand-in until the video and poster are uploaded: the angle and hook over an accent gradient. */
function DesignedPoster({ ad, accent }: { ad: Ad; accent: string }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(120% 60% at 30% 0%, ${accent}aa, transparent 65%), radial-gradient(90% 50% at 80% 100%, #2a3a9b, transparent 70%), linear-gradient(180deg, #2a2112, #07080d)`,
      }}
    >
      <div className="absolute inset-x-[7%] top-[22%]">
        <p className="font-mono text-[0.75em] uppercase tracking-[0.2em]" style={{ color: accent }}>
          {ad.angle}
        </p>
        <p className="mt-[0.5em] font-serif text-[2.1em] leading-[1.02]">{ad.hook}</p>
      </div>
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

export function BrandAvatar({ brand, className = "" }: { brand: Brand; className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/70 font-serif text-[0.9em] ${className}`}
      style={{ background: `linear-gradient(135deg, ${brand.accent}, #1b1b1b)` }}
    >
      {brand.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- tiny avatar, resized by the CDN
        <img src={brand.logo} alt="" className="size-full object-cover" />
      ) : (
        brand.name.replace(/[^A-Za-z0-9]/g, "").charAt(0)
      )}
    </span>
  );
}

/**
 * The platform's interface over a video ad: account, "Sponsored", caption, call-to-action button
 * and the like/comment/share column, for Instagram Reels, Facebook Reels or TikTok. Decorative:
 * hidden from screen readers, which get the ad's label from the button around it.
 */
export function SocialAdOverlay({ ad, brand, platform, compact }: { ad: Ad; brand: Brand; platform: Platform; compact?: boolean }) {
  const { lang } = useLocale();
  const c = growthCopy[lang];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
      <StatusBar />
      {platform === "tiktok" ? (
        <>
          <div className="absolute inset-x-0 top-[7%] flex justify-center gap-[1.2em] text-[1.1em] font-semibold">
            <span className="text-white/60">{c.following}</span>
            <span className="border-b-2 border-white pb-[0.2em]">{c.forYou}</span>
          </div>
          <div className="absolute bottom-[15%] right-[3.5%] flex flex-col items-center gap-[1.2em]">
            <span className="relative">
              <BrandAvatar brand={brand} className="size-[2.6em] border-2 border-white" />
              <span className="absolute -bottom-[0.5em] left-1/2 flex size-[1.2em] -translate-x-1/2 items-center justify-center rounded-full bg-[#fe2c55] text-[0.8em]">
                +
              </span>
            </span>
            <Icon d={icons.heart} filled />
            <Icon d={icons.comment} filled />
            <Icon d={icons.bookmark} filled />
            <Icon d={icons.share} filled />
          </div>
          <div className="absolute inset-x-[5%] bottom-[4%] pr-[18%]">
            <p className="font-semibold">@{brand.handle}</p>
            {!compact && ad.caption && <p className="mt-[0.3em] line-clamp-2 text-[0.95em] leading-snug text-white/90">{ad.caption}</p>}
            <span className="mt-[0.4em] inline-block rounded-[0.3em] bg-white/20 px-[0.5em] py-[0.1em] text-[0.8em]">{c.sponsored}</span>
            {ad.cta && (
              <div className="mt-[0.7em] flex items-center justify-between rounded-[0.4em] bg-[#fe2c55] px-[0.9em] py-[0.6em] text-[0.95em] font-semibold">
                {ad.cta}
                <span>›</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-x-0 top-[7%] flex items-center justify-between px-[6%] text-[1.35em] font-semibold">
            <span>{c.reels}</span>
            <span className="text-[0.7em] font-normal text-white/70">{c.platforms[platform]}</span>
          </div>
          <div className="absolute bottom-[17%] right-[4%] flex flex-col items-center gap-[1.3em]">
            <Icon d={icons.heart} />
            <Icon d={icons.comment} />
            <Icon d={icons.send} />
            <span className="text-[1.4em] leading-none">···</span>
          </div>
          <div className="absolute inset-x-[5%] bottom-[4%] pr-[14%]">
            <div className="flex items-center gap-[0.6em]">
              <BrandAvatar brand={brand} className="size-[2.3em]" />
              <span className="min-w-0">
                <span className="block truncate font-semibold">{platform === "facebook" ? brand.name : brand.handle}</span>
                <span className="block text-[0.85em] text-white/75">
                  {c.sponsored}
                  {platform === "facebook" ? " · 🌐" : ""}
                </span>
              </span>
              {platform === "instagram" && (
                <span className="ml-auto rounded-[0.5em] border border-white/60 px-[0.7em] py-[0.2em] text-[0.85em] font-semibold">{c.follow}</span>
              )}
            </div>
            {!compact && ad.caption && <p className="mt-[0.6em] line-clamp-2 text-[0.95em] leading-snug text-white/90">{ad.caption}</p>}
            {ad.cta && (
              <div
                className="mt-[0.8em] flex items-center justify-between rounded-[0.6em] px-[0.9em] py-[0.6em] text-[0.95em] font-semibold"
                style={{ background: platform === "facebook" ? "rgba(255,255,255,0.18)" : brand.accent, color: platform === "facebook" ? "white" : "#111" }}
              >
                {ad.cta}
                <span>›</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[8%] pt-[3.2%] text-[0.95em] font-medium">
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
