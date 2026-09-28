import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { MuxVideoItem } from "../page/ui";

const siteLink = (lang: Locale) => ({
  booking: "https://calendly.com/maximilien-grolier-1/30min",
  email: "maximilien@techflow-agency.com",
  contact: href(lang, "contact"),
  projects: href(lang, "projects"),
  team: href(lang, "team"),
  insights: href(lang, "insights"),
  legal: href(lang, "legal"),
  terms: href(lang, "terms"),
  instagram: "https://www.instagram.com/we.are.techflow/",
  linkedin: "https://www.linkedin.com/company/techflow-agence/",
  webflow: "https://webflow.com/@techflow-agencys-workspace",
});

const siteLinks = { fr: siteLink("fr"), en: siteLink("en") } satisfies Record<
  Locale,
  Record<string, string>
>;

export const getLinks = (lang: Locale) => siteLinks[lang];
export const links = siteLinks.fr;

export type Project = {
  slug: string;
  name: string;
  sector: string;
  disciplines: string[];
  kind?: "growth";
};

const full = ["Image de marque", "Design UI/UX", "Développement Web"];

export const projects: Project[] = [
  {
    slug: "gato-tower",
    name: "G.A.T.O Tower",
    sector: "Growth marketing",
    disciplines: ["Publicités vidéo", "A/B testing", "Lead scoring"],
    kind: "growth",
  },
  {
    slug: "mandil-avocats",
    name: "Mandil Avocats",
    sector: "Finance & Juridique",
    disciplines: full,
  },
  {
    slug: "place-des-aines",
    name: "Place des Aînés",
    sector: "Service",
    disciplines: full,
  },
  {
    slug: "leapmotor",
    name: "LeapMotor",
    sector: "Automobile",
    disciplines: full,
  },
  {
    slug: "little-green-spark",
    name: "Little Green Spark",
    sector: "ONG",
    disciplines: full,
  },
  {
    slug: "ama-campus",
    name: "AMA Campus",
    sector: "Education & Formation",
    disciplines: full,
  },
  {
    slug: "opco-ep",
    name: "OPCO EP",
    sector: "Education & Formation",
    disciplines: ["Développement Web"],
  },
  {
    slug: "epargne-plurielle",
    name: "Epargne Plurielle Avenir",
    sector: "Finance & Juridique",
    disciplines: full,
  },
  {
    slug: "concorde",
    name: "Concorde",
    sector: "Immobilier & Archi",
    disciplines: full,
  },
  {
    slug: "exelmans",
    name: "Exelmans",
    sector: "Finance & Juridique",
    disciplines: full,
  },
  {
    slug: "district-6",
    name: "District 6 Publishing",
    sector: "Musique",
    disciplines: ["Design UI/UX", "Développement Web"],
  },
  {
    slug: "tandem-partners",
    name: "Tandem Partners",
    sector: "Finance & Juridique",
    disciplines: full,
  },
];

export const webProjects = projects.filter((p) => !p.kind);

export const featured = [
  "opco-ep",
  "mandil-avocats",
  "leapmotor",
  "place-des-aines",
  "little-green-spark",
].map((slug) => projects.find((p) => p.slug === slug)!);

export const caseStudyUrl = (slug: string) => `/projets/${slug}`;
export const projectImage = (slug: string) => `/images/projects/${slug}.webp`;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The professionalism of the Techflow team, from the initial brief to the final deliverable, was particularly appreciated. Their proactive approach and close collaboration with our teams enabled us to provide the highest quality of service to our clients.",
    name: "Sarah Louzioui",
    role: "CEO @Havas Cambodia",
    photo: "/images/people/sarah-louzioui.avif",
  },
  {
    quote:
      "I appreciated their attentiveness, responsiveness, and the proposals they made to meet my needs! Thanks again!",
    name: "Pauline Mandil",
    role: "Partner @Mandil Avocats",
    photo: "/images/people/pauline-mandil.webp",
  },
  {
    quote:
      "Great work, creative, fast, efficient... perfect collaboration. Communication was fluid and deadlines met.",
    name: "David Bossan",
    role: "General Manager @District 6 Publishing",
    photo: "/images/people/david-bossan.webp",
  },
  {
    quote:
      "It was a great experience with Techflow. The work was quick, reactive, efficient. Great recommendation on the project and good follow up so far.",
    name: "Sorya Pum",
    role: "MD @TF Motors Cambodia",
    photo: "/images/people/sorya-pum.webp",
  },
  {
    quote:
      "Efficient, professional, and in line with our expectations. Communication was seamless, and deadlines were met.",
    name: "Rémi Cabrieres",
    role: "CFO @Sakam Security Aviation Kampuchea",
    photo: "/images/people/remi-cabrieres.webp",
  },
  {
    quote:
      "Their technical expertise combined with their ability to listen made it possible to perfectly meet our needs while respecting a very efficient budget.",
    name: "Barthélémy Fendt",
    role: "Podcaster @Extraterrien",
    photo: "/images/people/barthelemy-fendt.webp",
  },
  {
    quote:
      "Techflow was easy to work with and delivered exactly what we needed in the time frame that we had set beforehand. Highly recommended.",
    name: "Matias Andres",
    role: "Chief Editor @Frontkick.Online",
    photo: "/images/people/matias-andres.webp",
  },
  {
    quote:
      "The new website is visually appealing, user-friendly, and has significantly improved my online presence. They delivered a website that exceeded my expectations.",
    name: "Sarah Kolbenstetter",
    role: "Founder @Little Green Spark",
  },
];
export type TestimonialItem = Testimonial | MuxVideoItem;

export const video1: MuxVideoItem = {
  kind: "video",
  playbackId: "EnaeBc01go7l4cDKZgvBb02NOiBC8pYTElMQgIXWeKsxY",
  aspectRatio: "42 / 53",
  name: "Sebastien Pointel",
  role: "Founder @Elevat'up",
};

export const video2: MuxVideoItem = {
  kind: "video",
  playbackId: "JHyglAa02I8rjDBy1mB01Y6Lwrg02EQ4IJa2klHUI00pgSQ",
  name: "Guillaume Reislin",
  role: "Director @AMA-Campus",
  aspectRatio: "135 / 169",
};

export const video3: MuxVideoItem = {
  kind: "video",
  playbackId: "pxHRX5JBT701PYGLG6upuB6ybS1oh44dan5ywg00K1Z00U",
  name: "Maxime Parra",
  role: "Founder @Agence 48h",
  aspectRatio: "540 / 767",
};

export const clients = [
  {
    name: "Koulier",
    src: "/images/clients/koulier.svg",
    width: 173,
    height: 22,
  },
  {
    name: "Royal Enfield",
    src: "/images/clients/royal-enfield.webp",
    width: 406,
    height: 254,
  },
  {
    name: "Groupe Revive",
    src: "/images/clients/groupe-revive.webp",
    width: 1022,
    height: 562,
  },
  {
    name: "Convergences",
    src: "/images/clients/convergences.webp",
    width: 858,
    height: 174,
  },
  {
    name: "Exelmans",
    src: "/images/clients/exelmans.webp",
    width: 1298,
    height: 227,
  },
  {
    name: "Tandem Partners",
    src: "/images/clients/tandem-partners.webp",
    width: 362,
    height: 141,
  },
  { name: "Eureka", src: "/images/clients/eureka.svg", width: 243, height: 33 },
  {
    name: "Ma Carrière Immo",
    src: "/images/clients/ma-carriere-immo.webp",
    width: 328,
    height: 42,
  },
  {
    name: "Concorde",
    src: "/images/clients/concorde.svg",
    width: 644,
    height: 98,
  },
  {
    name: "Canetta",
    src: "/images/clients/canetta.svg",
    width: 657,
    height: 156,
  },
];

export const ease = [0.22, 1, 0.36, 1] as const;
