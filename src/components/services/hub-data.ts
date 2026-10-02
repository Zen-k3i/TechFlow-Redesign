import type { Locale } from "@/i18n/config";

const fr = {
  meta: {
    title: "Services : design web, développement, IA et growth | TechFlow Agency",
    description:
      "Studio de design web et de développement : identité de marque, UX/UI, Webflow et sur mesure, agents IA et tunnels de vente, tenus par une seule équipe.",
  },
  badge: "Nos services",
  title: "Un studio de design web et de *développement.*",
  intro:
    "Du premier wireframe au site en ligne, puis au système qui le fait vivre : quatre expertises tenues par une seule équipe, sans rien perdre entre deux prestataires.",
  core: "Cœur de métier",
  extend: "Pour aller plus loin",
  discover: "Découvrir",
  urls: ["littlegreenspark.org", "opcoep.fr", "leapmotor.com.kh", "placedesaines.fr"],
  pipeline: {
    eyebrow: "Design + développement",
    heading: "Du Figma au site en ligne, *sous le même toit.*",
    intro:
      "Les maquettes validées sont intégrées par l'équipe qui les a dessinées. Rien ne se perd entre l'intention de départ et le résultat final.",
    steps: [
      { tool: "figma", title: "Maquettes Figma", text: "Chaque écran, desktop et mobile, validé avant la première ligne de code." },
      { tool: "notion", title: "Design system", text: "Couleurs, typographies, composants : une base réutilisable pour chaque page à venir." },
      { tool: "webflow", title: "Intégration", text: "Webflow au pixel près, ou développement sur mesure quand le projet l'exige." },
      { tool: "seo", title: "Recette & SEO", text: "Navigateurs, vitesse, formulaires, redirections et balisage SEO/GEO vérifiés." },
      { tool: "hubspot", title: "CMS & croissance", text: "Vos équipes publient en autonomie, et le site se branche à votre CRM." },
    ],
  },
  stack: {
    eyebrow: "La boîte à outils",
    heading: "L'outil suit le besoin, *jamais l'inverse.*",
    intro:
      "L'outil ne fait pas le résultat, mais le mauvais outil le plombe. Dites-nous où vous voulez aller, nous sortirons les bons outils de la boîte.",
    more: ["Bubble", "Shopify", "Zapier", "Claude", "Brevo", "Odoo", "Loom", "Fillout", "OpenRouter", "Drupal"],
  },
};

const en: typeof fr = {
  meta: {
    title: "Services: Web Design, Development, AI & Growth | TechFlow Agency",
    description:
      "A web design and development studio: brand identity, UX/UI, Webflow and custom builds, AI agents and sales funnels, all run by one team.",
  },
  badge: "Our services",
  title: "A web design and *development* studio.",
  intro:
    "From the first wireframe to the live site, then to the system that keeps it growing: four disciplines run by one team, with nothing lost between two vendors.",
  core: "Core expertise",
  extend: "Go further",
  discover: "Explore",
  urls: ["littlegreenspark.org", "opcoep.fr", "leapmotor.com.kh", "placedesaines.fr"],
  pipeline: {
    eyebrow: "Design + development",
    heading: "From Figma to live site, *under one roof.*",
    intro: "Approved mockups are built by the team that designed them. Nothing gets lost between the original intent and the final result.",
    steps: [
      { tool: "figma", title: "Figma mockups", text: "Every screen, desktop and mobile, approved before the first line of code." },
      { tool: "notion", title: "Design system", text: "Colors, type, components: a reusable foundation for every future page." },
      { tool: "webflow", title: "Build", text: "Pixel-perfect Webflow, or custom development when the project calls for it." },
      { tool: "seo", title: "QA & SEO", text: "Browsers, speed, forms, redirects and SEO/GEO markup all checked." },
      { tool: "hubspot", title: "CMS & growth", text: "Your team publishes on its own, and the site plugs into your CRM." },
    ],
  },
  stack: {
    eyebrow: "The toolbox",
    heading: "The tool follows the need, *never the reverse.*",
    intro: "Tools don't make the result, but the wrong one sinks it. Tell us where you want to go, and we'll pull the right tools out of the box.",
    more: ["Bubble", "Shopify", "Zapier", "Claude", "Brevo", "Odoo", "Loom", "Fillout", "OpenRouter", "Drupal"],
  },
};

export const servicesHub: Record<Locale, typeof fr> = { fr, en };

export type Tool = { id: string; name: string; src: string; bg: string; fullBleed?: boolean; wide?: boolean };

/** Logos sit on their brand colour: several are white and would vanish on a white tile. `fullBleed` logos are already a full tile. */
export const tools: Tool[] = [
  { id: "figma", name: "Figma", src: "/images/tools/figma.svg", bg: "#1E1E1E" },
  { id: "webflow", name: "Webflow", src: "/images/tools/webflow.svg", bg: "#146EF5" },
  { id: "n8n", name: "n8n", src: "/images/tools/n8n.svg", bg: "#EA4B71" },
  { id: "hubspot", name: "HubSpot", src: "/images/tools/hubspot.svg", bg: "#FF7A59" },
  { id: "notion", name: "Notion", src: "/images/tools/notion.svg", bg: "#FFFFFF" },
  { id: "twenty", name: "Twenty", src: "/images/tools/twenty.svg", bg: "#141414" },
  { id: "finsweet", name: "Finsweet", src: "/images/tools/finsweet.png", bg: "#141414", fullBleed: true },
  { id: "granola", name: "Granola", src: "/images/tools/granola.png", bg: "#A8C43A", fullBleed: true },
];

/** Pipeline-only badges, not tools, so they stay out of the toolbox grid. `wide` logos use most of the tile width. */
const badges: Tool[] = [{ id: "seo", name: "SEO", src: "/images/tools/seo.png", bg: "#FFFFFF", wide: true }];

export const toolById = (id: string) => [...tools, ...badges].find((tool) => tool.id === id);
