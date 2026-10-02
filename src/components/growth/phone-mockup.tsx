/**
 * An iPhone-style frame with a fixed 9:19.5 ratio, so nothing inside it shifts the layout while
 * loading. The screen is a size container: children can size text in `cqw` to scale with the phone.
 */
export function PhoneMockup({ children, className = "", tone = "dark" }: { children: React.ReactNode; className?: string; tone?: "dark" | "light" }) {
  const body = tone === "dark" ? "from-[#3a3a3f] to-[#18181b]" : "from-[#e8e6e1] to-[#c9c6bf]";
  const button = tone === "dark" ? "bg-[#2a2a2e]" : "bg-[#bdbab3]";
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.6rem] bg-linear-to-b ${body} p-[7px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.12)] ${className}`}
    >
      <span aria-hidden className={`absolute -left-[3px] top-[22%] h-10 w-[3px] rounded-l ${button}`} />
      <span aria-hidden className={`absolute -left-[3px] top-[30%] h-14 w-[3px] rounded-l ${button}`} />
      <span aria-hidden className={`absolute -right-[3px] top-[26%] h-20 w-[3px] rounded-r ${button}`} />
      <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-black [container-type:inline-size]">
        {children}
        <span aria-hidden className="absolute left-1/2 top-[1.6%] z-30 h-[3.4%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
