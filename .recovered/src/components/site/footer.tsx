import { links, services } from "./content";

const columns = [
  {
    title: "Les Salles",
    items: services.map((s) => ({ label: s.title, href: links.services[s.title] })),
  },
  {
    title: "La Galerie",
    items: [
      { label: "Projets", href: links.projects },
      { label: "Notre équipe", href: links.team },
      { label: "Ressources", href: links.insights },
      { label: "Contact", href: links.contact },
    ],
  },
  {
    title: "Suivez-nous",
    items: [
      { label: "Instagram", href: links.instagram },
      { label: "LinkedIn", href: links.linkedin },
      { label: "Webflow Certified Partner", href: links.webflow },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0d0d0d] px-6 pb-8 pt-20 text-ivory md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            <p className="label text-brass">Horaires</p>
            <p className="mt-3 font-serif text-3xl leading-tight">
              Ouvert 24/7,
              <br />
              <em className="text-ivory/60">dans votre navigateur.</em>
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="label text-ivory/40">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-ivory/75 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          aria-hidden
          className="mt-20 select-none text-center font-serif text-[22vw] leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(239,233,221,0.25)]"
        >
          TechFlow
        </p>

        <div className="label mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-ivory/40 md:flex-row">
          <span>© {new Date().getFullYear()} TechFlow Agency — Galerie numérique</span>
          <span className="flex gap-6">
            <a href={links.legal} target="_blank" rel="noreferrer" className="hover:text-ivory">
              Mentions légales
            </a>
            <a href={links.terms} target="_blank" rel="noreferrer" className="hover:text-ivory">
              Conditions générales
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
