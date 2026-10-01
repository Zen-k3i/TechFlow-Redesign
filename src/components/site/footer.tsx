"use client";

import Image from "next/image";
import Link from "next/link";
import { href } from "@/i18n/routes";
import { ProjectCta } from "../page/project-cta";
import { useLocale } from "./locale";

/** `cta` is the "Open for new projects" block; pages that end on their own call to action leave it out. */
export function Footer({ cta = true }: { cta?: boolean }) {
  const { t, lang, links } = useLocale();
  const f = t.footer;
  const columns = [
    {
      title: f.columns.services,
      items: [
        ...t.services.items.map((s) => ({ label: s.title, href: s.href })),
        { label: t.nav.allServices, href: href(lang, "services") },
      ],
    },
    {
      title: f.columns.agency,
      items: [
        { label: f.agency.projects, href: links.projects },
        { label: f.agency.tools, href: href(lang, "tools") },
        { label: f.agency.team, href: links.team },
        { label: f.agency.insights, href: links.insights },
        { label: f.agency.contact, href: links.contact },
      ],
    },
    {
      title: f.columns.follow,
      external: true,
      items: [
        { label: "Instagram", href: links.instagram },
        { label: "LinkedIn", href: links.linkedin },
        { label: "Webflow Certified Partner", href: links.webflow },
      ],
    },
  ];

  const social = [
    { label: "Instagram", href: links.instagram, icon: <InstagramIcon /> },
    { label: "LinkedIn", href: links.linkedin, icon: <LinkedInIcon /> },
  ];

  return (
    <footer
      className={`relative overflow-hidden bg-linear-to-b from-night via-navy-deep to-brand-deep px-5 text-white md:px-10 ${cta ? "pt-28 md:pt-36" : "pt-16 md:pt-20"}`}
    >
      <div className="mx-auto max-w-7xl">
        {cta && (
          <div className="relative py-8 md:py-12">
            {/* Blue glow behind the call to action, fading into the footer's own gradient. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-28 bottom-0 -z-0 bg-[radial-gradient(60%_70%_at_50%_30%,rgba(54,71,245,0.45),transparent_70%)] md:-top-36"
            />
            <div className="relative">
              <ProjectCta />
            </div>
          </div>
        )}

        <div className={`grid gap-12 md:grid-cols-[1.2fr_repeat(3,1fr)] ${cta ? "mt-28 border-t border-white/15 pt-14" : ""}`}>
          <div>
            <Image
              src="/images/techflow-logo.svg"
              alt="TechFlow"
              width={179}
              height={36}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-white/55">{f.tagline}</p>
            <ul className="mt-6 flex flex-wrap items-center gap-3">
              {social.map(({ label, href: url, icon }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (${f.newTab})`}
                    className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white hover:text-night focus-visible:bg-white focus-visible:text-night"
                  >
                    {icon}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={links.webflow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg transition-opacity hover:opacity-85"
                >
                  <Image src="/images/social/webflow-premium-partner.svg" alt={`Webflow Premium Partner (${f.newTab})`} width={176} height={36} className="h-10 w-auto" />
                </a>
              </li>
            </ul>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-white/40">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {col.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/75 transition-colors hover:text-white"
                      >
                        {item.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-white/75 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          aria-hidden
          className="mt-20 select-none text-center font-serif text-[22vw] leading-[0.78] tracking-[-0.04em] text-transparent transition-colors duration-700 [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] hover:text-white/10"
        >
          TechFlow
        </p>

        <div className="eyebrow flex flex-col justify-between gap-4 border-t border-white/15 py-6 text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} TechFlow Agency</span>
          <span className="flex gap-6">
            <Link href={links.legal} className="hover:text-white">
              {f.legal}
            </Link>
            <Link href={links.terms} className="hover:text-white">
              {f.terms}
            </Link>
            <Link href={links.cookies} className="hover:text-white">
              {f.cookies}
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden width="20" height="20" viewBox="10 9.78 20.04 20.04" fill="currentColor">
      <path d="M20.0186 11.5905C22.6939 11.5905 23.0107 11.6006 24.0672 11.6488C25.0439 11.6934 25.5745 11.8567 25.9276 11.9939C26.3953 12.1757 26.7291 12.3926 27.0796 12.7433C27.4302 13.0939 27.6474 13.4276 27.829 13.8952C27.9662 14.2484 28.1293 14.7788 28.1741 15.7557C28.2222 16.8122 28.2326 17.129 28.2326 19.8043C28.2326 22.4795 28.2222 22.7964 28.1741 23.8527C28.1293 24.8297 27.9662 25.36 27.829 25.7129C27.6472 26.1808 27.4302 26.5145 27.0796 26.8651C26.7291 27.2156 26.3953 27.4327 25.9276 27.6145C25.5745 27.7517 25.0439 27.915 24.0672 27.9595C23.0107 28.0075 22.6942 28.0177 20.0186 28.0177C17.343 28.0177 17.0265 28.0075 15.9701 27.9595C14.9933 27.915 14.4628 27.7517 14.1098 27.6145C13.6419 27.4327 13.3084 27.2156 12.9576 26.8651C12.6072 26.5145 12.3899 26.1808 12.2083 25.7129C12.0712 25.36 11.9079 24.8296 11.8632 23.8527C11.8151 22.7964 11.805 22.4795 11.805 19.8043C11.805 17.129 11.8151 16.8122 11.8632 15.7557C11.9079 14.7788 12.0712 14.2484 12.2083 13.8952C12.3901 13.4277 12.6072 13.0941 12.9576 12.7433C13.3083 12.3926 13.6419 12.1757 14.1098 11.9939C14.4628 11.8565 14.9933 11.6932 15.9701 11.6488C17.0265 11.6006 17.3435 11.5905 20.0186 11.5905ZM20.0186 9.78516C17.2976 9.78516 16.9566 9.79693 15.8878 9.84553C14.8215 9.8943 14.0931 10.0638 13.4559 10.3112C12.797 10.5673 12.2384 10.9097 11.6814 11.4669C11.1244 12.0238 10.7818 12.5827 10.5259 13.2416C10.2782 13.8789 10.1086 14.6071 10.0602 15.6735C10.0114 16.7422 10 17.0833 10 19.8043C10 22.5253 10.0114 22.8665 10.0602 23.9352C10.1088 25.0016 10.2782 25.7298 10.5259 26.3671C10.7818 27.0259 11.1242 27.5847 11.6814 28.1417C12.2384 28.6987 12.797 29.0414 13.4559 29.2974C14.0933 29.5447 14.8215 29.7144 15.8878 29.763C16.9566 29.8118 17.2976 29.8232 20.0186 29.8232C22.7396 29.8232 23.0808 29.8118 24.1494 29.763C25.2158 29.7144 25.944 29.5447 26.5813 29.2974C27.2402 29.0412 27.7989 28.6987 28.356 28.1417C28.9132 27.5847 29.2556 27.0259 29.5117 26.3671C29.7592 25.7298 29.9288 25.0016 29.9774 23.9352C30.026 22.8665 30.0374 22.5255 30.0374 19.8043C30.0374 17.0831 30.026 16.742 29.9774 15.6735C29.9286 14.6071 29.7592 13.8789 29.5117 13.2416C29.2556 12.5828 28.913 12.0238 28.356 11.4669C27.799 10.9097 27.2404 10.5671 26.5813 10.3112C25.9441 10.0636 25.2158 9.89413 24.1494 9.84553C23.0807 9.79693 22.7396 9.78516 20.0186 9.78516Z" />
      <path d="M20.0179 14.6602C17.1767 14.6602 14.873 16.9636 14.873 19.805C14.873 22.6464 17.1767 24.9498 20.0179 24.9498C22.8591 24.9498 25.1628 22.6464 25.1628 19.805C25.1628 16.9636 22.8593 14.6602 20.0179 14.6602ZM20.0179 23.1447C18.1734 23.1447 16.6784 21.6493 16.6784 19.805C16.6784 17.9607 18.1734 16.4653 20.0179 16.4653C21.8624 16.4653 23.3576 17.9603 23.3576 19.805C23.3576 21.6497 21.8624 23.1447 20.0179 23.1447Z" />
      <path d="M26.5766 14.4561C26.5766 15.1201 26.0382 15.6586 25.3743 15.6586C24.7104 15.6586 24.1719 15.1201 24.1719 14.4561C24.1719 13.7922 24.71 13.2539 25.3743 13.2539C26.0386 13.2539 26.5766 13.7922 26.5766 14.4561Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.5 0C0.67157 0 0 0.67157 0 1.5V16.5C0 17.3284 0.67157 18 1.5 18H16.5C17.3284 18 18 17.3284 18 16.5V1.5C18 0.67157 17.3284 0 16.5 0H1.5ZM5.52076 4.00272C5.52639 4.95897 4.81061 5.54819 3.96123 5.54397C3.16107 5.53975 2.46357 4.90272 2.46779 4.00413C2.47201 3.15897 3.13998 2.47975 4.00764 2.49944C4.88795 2.51913 5.52639 3.1646 5.52076 4.00272ZM9.2797 6.76176H6.75971H6.7583V15.3216H9.4217V15.1219C9.4217 14.742 9.4214 14.362 9.4211 13.9819C9.4203 12.9681 9.4194 11.9532 9.4246 10.9397C9.426 10.6936 9.4372 10.4377 9.5005 10.2028C9.7381 9.3253 10.5271 8.7586 11.4074 8.8979C11.9727 8.9864 12.3467 9.3141 12.5042 9.8471C12.6013 10.1803 12.6449 10.5389 12.6491 10.8863C12.6605 11.9339 12.6589 12.9815 12.6573 14.0292C12.6567 14.399 12.6561 14.769 12.6561 15.1388V15.3202H15.328V15.1149C15.328 14.6629 15.3278 14.211 15.3275 13.7591C15.327 12.6296 15.3264 11.5001 15.3294 10.3702C15.3308 9.8597 15.276 9.3563 15.1508 8.8627C14.9638 8.1286 14.5771 7.5211 13.9485 7.0824C13.5027 6.77019 13.0133 6.5691 12.4663 6.5466C12.404 6.54401 12.3412 6.54062 12.2781 6.53721C11.9984 6.52209 11.7141 6.50673 11.4467 6.56066C10.6817 6.71394 10.0096 7.0641 9.5019 7.6814C9.4429 7.7522 9.3852 7.8241 9.2991 7.9314L9.2797 7.9557V6.76176ZM2.68164 15.3244H5.33242V6.76733H2.68164V15.3244Z" />
    </svg>
  );
}
