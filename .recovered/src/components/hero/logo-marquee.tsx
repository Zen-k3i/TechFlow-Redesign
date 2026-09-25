import Image from "next/image";
import { clients } from "./content";

export function LogoMarquee() {
  return (
    <div className="relative z-10 border-t border-white/10 bg-linear-to-b from-[#0b0b0d] to-[#1f1f22] pb-20 pt-8">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-white/40">
        Ils nous ont confié leur croissance
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-16 hover:[animation-play-state:paused]">
          {[...clients, ...clients].map((client, i) => (
            <li key={i} aria-hidden={i >= clients.length} className="shrink-0">
              <Image
                src={client.src}
                alt={i < clients.length ? client.name : ""}
                width={client.width}
                height={client.height}
                className="h-7 w-auto max-w-[140px] object-contain opacity-50 brightness-0 invert transition-opacity hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
