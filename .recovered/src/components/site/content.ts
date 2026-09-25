export const rooms = [
  { id: "galerie", numeral: "00", label: "La Galerie" },
  { id: "manifeste", numeral: "I", label: "Note du conservateur" },
  { id: "salles", numeral: "II", label: "Les Salles" },
  { id: "collection", numeral: "III", label: "La Collection" },
  { id: "parcours", numeral: "IV", label: "Le Parcours" },
  { id: "livre-dor", numeral: "V", label: "Livre d'or" },
  { id: "billetterie", numeral: "VI", label: "Billetterie" },
] as const;

export type RoomId = (typeof rooms)[number]["id"];

export type Project = {
  slug: string;
  name: string;
  sector: string;
  disciplines: string[];
};

const full = ["Image de marque", "Design UI/UX", "Développement Web"];

export const projects: Project[] = [
  { slug: "mandil-avocats", name: "Mandil Avocats", sector: "Finance & Juridique", disciplines: full },
  { slug: "place-des-aines", name: "Place des Aînés", sector: "Service", disciplines: full },
  { slug: "opco-ep", name: "OPCO EP", sector: "Education & Formation", disciplines: ["Développement Web"] },
  { slug: "leapmotor", name: "LeapMotor", sector: "Automobile", disciplines: full },
  { slug: "little-green-spark", name: "Little Green Spark", sector: "ONG", disciplines: full },
  { slug: "ama-campus", name: "AMA Campus", sector: "Education & Formation", disciplines: full },
  { slug: "epargne-plurielle", name: "Epargne Plurielle Avenir", sector: "Finance & Juridique", disciplines: full },
  { slug: "concorde", name: "Concorde", sector: "Immobilier & Archi", disciplines: full },
  { slug: "exelmans", name: "Exelmans", sector: "Finance & Juridique", disciplines: full },
  { slug: "district-6", name: "District 6 Publishing", sector: "Musique", disciplines: ["Design UI/UX", "Développement Web"] },
  { slug: "tandem-partners", name: "Tandem Partners", sector: "Finance & Juridique", disciplines: full },
];

export const exhibits = projects.slice(0, 5);

const SITE = "https://www.techflow-agency.com";

export const links = {
  booking: "https://calendly.com/maximilien-grolier-1/30min",
  contact: `${SITE}/contact`,
  projects: `${SITE}/projets`,
  team: `${SITE}/notre-equipe`,
  insights: `${SITE}/nos-insights`,
  legal: `${SITE}/mentions-legales`,
  terms: `${SITE}/conditions-generales`,
  instagram: "https://www.instagram.com/we.are.techflow/",
  linkedin: "https://www.linkedin.com/company/techflow-agence/",
  webflow: "https://webflow.com/@techflow-agencys-workspace",
  services: {
    Design: `${SITE}/design`,
    Développement: `${SITE}/developpement`,
    "Agents IA": `${SITE}/agents-ia`,
    "Tunnel de vente": `${SITE}/tunnel-de-vente`,
  } as Record<string, string>,
};

const caseStudySlugs: Record<string, string> = {
  "epargne-plurielle": "epargne-plurielle-avenir",
  "district-6": "district-6-publishing",
};

export const caseStudyUrl = (slug: string) => `${SITE}/projets/${caseStudySlugs[slug] ?? slug}`;

export const galleryTexture = (slug: string) => `/images/gallery/${slug}.jpg`;
export const projectImage = (slug: string) => `/images/projects/${slug}.webp`;

export const services = [
  {
    numeral: "I",
    title: "Design",
    pitch: "Branding, UX/UI, Social Ads, Motion Design : nous concevons votre marque pour positionner votre expertise.",
    pieces: ["Identité visuelle", "Design system Figma", "UX/UI haute fidélité", "Motion design"],
    image: "little-green-spark",
  },
  {
    numeral: "II",
    title: "Développement",
    pitch: "Des plateformes et des sites web conçus pour être performants et propres même trois ans après la livraison.",
    pieces: ["Webflow", "Shopify & Bubble", "Sur mesure", "SEO & performance"],
    image: "opco-ep",
  },
  {
    numeral: "III",
    title: "Agents IA",
    pitch: "Ce que votre équipe refait quinze fois par semaine, un agent le fait pendant la nuit.",
    pieces: ["Automatisation n8n", "CRM HubSpot & Twenty", "Intégrations API", "IA souveraines"],
    image: "leapmotor",
  },
  {
    numeral: "IV",
    title: "Tunnel de vente",
    pitch: "De la création de la publicité à la prise de rendez-vous : on crée, on mesure, on ajuste pour maximiser les résultats.",
    pieces: ["Publicités sociales", "Landing pages", "Prise de rendez-vous", "Mesure & optimisation"],
    image: "place-des-aines",
  },
];

export const steps = [
  {
    week: "Semaine 1",
    title: "Cadrage du projet",
    text: "Votre marché, vos utilisateurs, vos objectifs, votre stack. Avant toute conception, nous alignons le périmètre, le calendrier et les indicateurs de réussite.",
  },
  {
    week: "Semaine 2",
    title: "Recherche et stratégie",
    text: "Analyse concurrentielle, recherche utilisateur, positionnement, architecture SEO et visibilité dans les IA : quoi construire, et pourquoi cela fonctionnera.",
  },
  {
    week: "Semaine 3",
    title: "Image de marque",
    text: "Logo, système visuel, langage de design, voix de marque. Une identité qui inspire confiance avant même qu'un mot ne soit lu.",
  },
  {
    week: "Semaine 4",
    title: "Design UX/UI",
    text: "Chaque écran est conçu dans Figma avant la première ligne de code : parcours, design system, interactions et cas limites.",
  },
  {
    week: "Semaine 5",
    title: "Développement et recette",
    text: "Navigateurs, appareils, vitesse, formulaires, CMS : rien ne quitte nos mains sans une recette complète.",
  },
];

export type Testimonial = { quote: string; name: string; role: string; photo?: string };

export const testimonials: Testimonial[] = [
  {
    quote: "The professionalism of the Techflow team, from the initial brief to the final deliverable, was particularly appreciated. Their proactive approach and close collaboration with our teams enabled us to provide the highest quality of service to our clients.",
    name: "Sarah Louzioui",
    role: "CEO @Havas Cambodia",
    photo: "/images/people/sarah-louzioui.avif",
  },
  {
    quote: "I appreciated their attentiveness, responsiveness, and the proposals they made to meet my needs! Thanks again!",
    name: "Pauline Mandil",
    role: "Partner @Mandil Avocats",
    photo: "/images/people/pauline-mandil.webp",
  },
  {
    quote: "Great work, creative, fast, efficient... perfect collaboration. Communication was fluid and deadlines met.",
    name: "David Bossan",
    role: "General Manager @District 6 Publishing",
    photo: "/images/people/david-bossan.webp",
  },
  {
    quote: "So far, the return on investment has been excellent. Campaign settings are continuously optimized based on our feedback. Our conversion rate keeps rising.",
    name: "Guillaume Venturini",
    role: "Co-Founder @Catch'N'Grill",
  },
  {
    quote: "It was a great experience with Techflow. The work was quick, reactive, efficient. Great recommendation on the project and good follow up so far.",
    name: "Sorya Pum",
    role: "MD @TF Motors Cambodia",
    photo: "/images/people/sorya-pum.webp",
  },
  {
    quote: "Efficient, professional, and in line with our expectations. Communication was seamless, and deadlines were met.",
    name: "Rémi Cabrieres",
    role: "CFO @Sakam Security Aviation Kampuchea",
    photo: "/images/people/remi-cabrieres.webp",
  },
  {
    quote: "Their technical expertise combined with their ability to listen made it possible to perfectly meet our needs while respecting a very efficient budget.",
    name: "Barthélémy Fendt",
    role: "Podcaster @Extraterrien",
    photo: "/images/people/barthelemy-fendt.webp",
  },
  {
    quote: "Techflow was easy to work with and delivered exactly what we needed in the time frame that we had set beforehand. Highly recommended.",
    name: "Matias Andres",
    role: "Chief Editor @Frontkick.Online",
    photo: "/images/people/matias-andres.webp",
  },
  {
    quote: "The new website is visually appealing, user-friendly, and has significantly improved my online presence. They delivered a website that exceeded my expectations.",
    name: "Sarah Kolbenstetter",
    role: "Founder @Little Green Spark",
  },
];

export const faq = [
  {
    q: "Que se passe-t-il après la mise en ligne ?",
    a: "On ne disparaît pas : maintenance, amélioration continue et suivi des métriques font partie de nos abonnements d'accompagnement.",
  },
  {
    q: "Combien coûte un projet ?",
    a: "Chaque système est dimensionné sur mesure. L'audit gratuit nous permet de chiffrer précisément vos besoins, et vous obtenez un budget ferme avant tout engagement.",
  },
  {
    q: "Peut-on commencer petit ?",
    a: "Oui. Nos offres sont modulaires : on commence là où l'impact est le plus rapide, et on étend le périmètre au rythme de vos résultats.",
  },
  {
    q: "Comment démarrer ?",
    a: "Par un appel de 30 minutes, gratuit et sans engagement. On analyse votre besoin et vous repartez avec un plan d'action concret, que l'on travaille ensemble ou non.",
  },
  {
    q: "Quels sont les délais ?",
    a: "La plupart de nos projets démarrent sous deux semaines. Un site vitrine se livre en 3 à 6 semaines, un système complet (site + funnel + agents IA) en 60 à 90 jours.",
  },
];

export const clients = [
  { name: "Koulier", src: "/images/clients/koulier.svg", width: 173, height: 22 },
  { name: "Royal Enfield", src: "/images/clients/royal-enfield.webp", width: 406, height: 254 },
  { name: "Groupe Revive", src: "/images/clients/groupe-revive.webp", width: 1022, height: 562 },
  { name: "Convergences", src: "/images/clients/convergences.webp", width: 858, height: 174 },
  { name: "Exelmans", src: "/images/clients/exelmans.webp", width: 1298, height: 227 },
  { name: "Tandem Partners", src: "/images/clients/tandem-partners.webp", width: 362, height: 141 },
  { name: "Eureka", src: "/images/clients/eureka.svg", width: 243, height: 33 },
  { name: "Ma Carrière Immo", src: "/images/clients/ma-carriere-immo.webp", width: 328, height: 42 },
  { name: "Concorde", src: "/images/clients/concorde.svg", width: 644, height: 98 },
  { name: "Canetta", src: "/images/clients/canetta.svg", width: 657, height: 156 },
];
