/** Stand-in artwork for growth campaigns, which have no website screenshot. */
export function GrowthCover({
  videos = "5 vidéos",
  title = ["De la publicité", "au rendez-vous."],
  labels = true,
}: {
  videos?: string;
  title?: string[];
  /** The "Growth marketing · 5 videos" row; off when the card shows its own tags there. */
  labels?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b0a08] text-white transition-transform duration-700 group-hover:scale-105">
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_30%_0%,#c9a45caa,transparent_65%),radial-gradient(80%_50%_at_90%_100%,#2a3a9b,transparent_70%)]" />
      <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-[80%] w-full">
        <path d="M40 125 L42 22 L50 4 L58 22 L60 125 Z" fill="#c9a45c" opacity="0.25" />
        <path d="M42 22 L50 4 L58 22" fill="none" stroke="#c9a45c" strokeWidth="0.4" />
        {Array.from({ length: 20 }, (_, i) => (
          <line key={i} x1="42.5" x2="59.5" y1={28 + i * 5} y2={28 + i * 5} stroke="#c9a45c" strokeOpacity={i % 5 === 0 ? 0.45 : 0.15} strokeWidth="0.3" />
        ))}
      </svg>
      {labels && (
      <div className="absolute inset-x-6 top-6 flex items-center justify-between">
        <span className="eyebrow rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">Growth marketing</span>
        <span className="eyebrow text-white/60">{videos}</span>
      </div>
      )}
      <p className="absolute inset-x-6 bottom-6 font-serif text-3xl leading-tight">
        {title[0]} <span className="italic text-[#c9a45c]">{title[1]}</span>
      </p>
    </div>
  );
}
