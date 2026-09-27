import type { Locale } from "@/i18n/config";

const fr = {
  meta: {
    title: "Nos projets et études de cas | TechFlow Agency",
    description:
      "Sites vitrines, plateformes, e-commerce et campagnes growth : découvrez les projets de design web et de développement livrés par TechFlow.",
  },
  badge: "12+ ans d'expérience · 45+ projets livrés",
  title: "Chaque vision devient un produit *qui performe.*",
  intro:
    "Des produits numériques pensés pour les utilisateurs, dans tous les secteurs : sites, plateformes, SaaS, systèmes d'automatisation et agents IA.",
  stats: [
    { value: "45+", label: "projets livrés" },
    { value: "35+", label: "clients accompagnés" },
    { value: "8", label: "secteurs" },
    { value: "5 sem.", label: "de l'idée au lancement" },
  ],
  grid: {
    eyebrow: "Études de cas",
    heading: "Laissons nos réalisations *parler.*",
    intro: "Chaque projet avait un objectif chiffré. Ouvrez un cas pour voir lequel, et ce qu'il est devenu.",
  },
  archive: {
    eyebrow: "Également livrés",
    heading: "Et beaucoup *d'autres.*",
    intro: "Une partie des marques que nous avons accompagnées, du branding au site en ligne.",
    columns: { client: "Client", sector: "Secteur", scope: "Périmètre" },
  },
  services: {
    eyebrow: "Services",
    heading: "Quel service pouvons-nous *vous apporter ?*",
  },
};

const en: typeof fr = {
  meta: {
    title: "Our Work & Case Studies | TechFlow Agency",
    description:
      "Showcase sites, platforms, e-commerce and growth campaigns: explore the web design and development projects shipped by TechFlow.",
  },
  badge: "12+ years of experience · 45+ projects shipped",
  title: "Every vision becomes a product *that performs.*",
  intro:
    "Digital products designed for real users, across every industry: websites, platforms, SaaS, automation systems and AI agents.",
  stats: [
    { value: "45+", label: "projects shipped" },
    { value: "35+", label: "clients served" },
    { value: "8", label: "industries" },
    { value: "5 wks", label: "from idea to launch" },
  ],
  grid: {
    eyebrow: "Case studies",
    heading: "Let our work *do the talking.*",
    intro: "Every project had a number to hit. Open a case to see which one, and what became of it.",
  },
  archive: {
    eyebrow: "Also shipped",
    heading: "And plenty *more.*",
    intro: "Some of the brands we've worked with, from branding to the live site.",
    columns: { client: "Client", sector: "Industry", scope: "Scope" },
  },
  services: {
    eyebrow: "Services",
    heading: "How can we *help you?*",
  },
};

export const projectsContent: Record<Locale, typeof fr> = { fr, en };

const full = ["Image de marque", "Design UI/UX", "Développement Web"];

export const archive = [
  { name: "Kretz Club", sector: "Finance & Juridique", disciplines: ["Développement Web", "Growth Marketing", "Automatisation"] },
  { name: "Canetta", sector: "eCommerce", disciplines: ["Design UI/UX", "Développement Web"] },
  { name: "Groupe Revive", sector: "Finance & Juridique", disciplines: ["Design UI/UX", "Développement Web"] },
  { name: "Eureka Cambodia", sector: "Education & Formation", disciplines: full },
  { name: "Ma Carrière Immo", sector: "Immobilier & Archi", disciplines: ["Développement Web"] },
  { name: "Koulier", sector: "Service", disciplines: full },
  { name: "Convergences.asia", sector: "Service", disciplines: full },
  { name: "Emme Studio", sector: "Immobilier & Archi", disciplines: full },
  { name: "Ooinvestir", sector: "Finance & Juridique", disciplines: ["Design UI/UX", "Développement Web"] },
  { name: "Je Trouve Mon Avocat", sector: "Finance & Juridique", disciplines: ["Design UI/UX", "Développement Web"] },
  { name: "Je Trouve Mon Déménageur", sector: "Service", disciplines: ["Design UI/UX", "Développement Web"] },
];
