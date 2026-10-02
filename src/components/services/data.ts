import type { Locale } from "@/i18n/config";
import { routes, serviceKeys, type ServiceKey } from "@/i18n/routes";
import type { Mark } from "../page/ui";

type Stat = { value: string; label: string };
type Item = { title: string; text: string };

export type ServiceContent = {
  meta: { title: string; description: string };
  badge: string;
  title: string;
  intro: string;
  hero: { project: string; url: string; card: { title: string; rows: Stat[] } };
  audience: { eyebrow: string; heading: string; items: Item[]; cta: string };
  stats: Stat[];
  offer: { eyebrow: string; heading: string; intro: string; items: (Item & { tags: string[] })[] };
  quote: { quote: string; name: string; role: string; photo?: string };
  statement?: { eyebrow: string; heading: string; text: string };
  highlight?: { eyebrow: string; heading: string; intro: string; items: Item[] };
  cases?: { eyebrow: string; heading: string; items: { sector: string; title: string; text: string; metrics: Stat[] }[] };
  process: { eyebrow: string; heading: string; intro: string; steps: (Item & { deliverable: string; duration?: string })[] };
  comparison: { intro: string; columns?: [string, string, string]; rows: { label: string; values: [Mark, Mark, Mark] }[] };
  work: { eyebrow: string; heading: string; intro: string; projects: string[] };
  nextStep?: Item;
};

/** Maps the French folder slug (`/developpement`) to its service key. */
export const serviceFromSlug = (slug: string) => serviceKeys.find((key) => routes[key].fr === `/${slug}`);

const fr: Record<ServiceKey, ServiceContent> = {
  design: {
    meta: {
      title: "Design web, UX/UI et identité de marque | TechFlow Agency",
      description:
        "Identité de marque, UX/UI, maquettes Figma et prototypes : un design guidé par la recherche qui rend votre offre évidente dès le premier regard.",
    },
    badge: "Design web & identité de marque",
    title: "Le design qui rend votre offre *évidente.*",
    intro:
      "Votre marque est la première chose que l'on ressent avant même de lire un mot. Nous étudions votre marché, définissons votre positionnement et construisons des systèmes visuels qui vous ressemblent et inspirent confiance dès la première impression.",
    hero: {
      project: "little-green-spark",
      url: "littlegreenspark.org",
      card: {
        title: "Design system",
        rows: [
          { label: "Primaire", value: "#4766FF" },
          { label: "Nuit", value: "#07080D" },
          { label: "Papier", value: "#F4F3EF" },
        ],
      },
    },
    audience: {
      eyebrow: "Pour qui",
      heading: "Les marques à un *tournant.*",
      items: [
        {
          title: "Les entreprises qui lancent quelque chose de nouveau",
          text: "Vous construisez un produit, un service ou une entreprise et vous avez besoin d'une marque qui se démarque dès le premier jour.",
        },
        {
          title: "Les entreprises dont l'identité ne correspond plus",
          text: "Design vieillissant, pages lentes, invisibilité sur Google. Il vous faut une refonte, sans perdre le référencement que vous avez construit.",
        },
        {
          title: "Les entreprises qui passent à l'échelle supérieure",
          text: "Nouvelle offre, nouveaux marchés, nouvelle cible : votre design doit suivre, avec un système cohérent sur tous vos supports.",
        },
      ],
      cta: "Envie de faire évoluer votre site ?",
    },
    stats: [
      { value: "55+", label: "projets livrés" },
      { value: "+31 %", label: "de conversion en moyenne après une refonte TechFlow" },
      { value: "14 j", label: "pour recevoir les premières maquettes UI" },
      { value: "4–8 sem.", label: "pour un projet de design complet" },
    ],
    offer: {
      eyebrow: "Ce que nous concevons",
      heading: "Pourquoi nous confier votre *design ?*",
      intro:
        "Chaque livrable est construit autour de votre marché, de votre audience et de votre vision. Vous repartez avec un système de marque complet, prêt à être déployé sur tous vos points de contact.",
      items: [
        {
          title: "Identité de marque et logo",
          text: "Étude de marché, analyse concurrentielle et positionnement clair. Un système de marque complet (logo, couleurs, typographie, ton de voix) conçu pour durer.",
          tags: ["Logo et identité", "Charte graphique", "Ton de voix"],
        },
        {
          title: "Design UX et wireframes",
          text: "Nous partons de vos utilisateurs, pas de nos préférences, et concevons en mobile-first. Les wireframes figent la structure avant tout travail visuel.",
          tags: ["Design thinking", "Design sprint", "Wireframes"],
        },
        {
          title: "Maquettes UI et style guide",
          text: "Des maquettes haute fidélité de chaque écran, livrées avec un style guide (couleurs, typographies, composants) pour que votre produit reste cohérent après le lancement.",
          tags: ["Maquettes UI", "Design system", "Typographies"],
        },
        {
          title: "Prototype interactif",
          text: "Vous naviguez dans votre futur site comme s'il existait déjà. Nous testons les parcours, éliminons les frictions et validons tout avant la première ligne de code.",
          tags: ["Prototype Figma", "Tests utilisateurs", "Validation avant dev"],
        },
        {
          title: "Social ads et supports marketing",
          text: "Des créations qui arrêtent le scroll, adaptées à chaque plateforme et chaque format, avec des variantes prêtes à être testées.",
          tags: ["Meta", "TikTok", "LinkedIn"],
        },
      ],
    },
    quote: {
      quote:
        "Efficace, professionnel et conforme à nos attentes. Les créations graphiques ont été réalisées avec efficacité et minutie. La communication a été fluide et les délais ont été respectés.",
      name: "Rémi Cabrieres",
      role: "CFO @Sakam Security Aviation Kampuchea",
      photo: "/images/people/remi-cabrieres.webp",
    },
    process: {
      eyebrow: "Méthode",
      heading: "Cinq étapes, avec un *livrable* à chacune.",
      intro: "Rien n'est développé avant d'avoir été validé ici. Vous voyez votre interface gagner en précision, étape après étape.",
      steps: [
        {
          title: "Immersion et audit",
          text: "Nous plongeons dans votre marché, vos utilisateurs et votre marque actuelle. Vous repartez avec un cadre clair : objectifs, périmètre, planning.",
          deliverable: "Brief créatif validé",
        },
        {
          title: "Arborescence et wireframes",
          text: "La structure de chaque écran, les parcours clés et la hiérarchie de l'information, validés ensemble avant tout travail visuel.",
          deliverable: "Wireframes annotés",
        },
        {
          title: "Maquettes UI",
          text: "Votre identité appliquée écran par écran, avec un design system réutilisable pour les pages à venir.",
          deliverable: "Maquettes Figma + style guide",
        },
        {
          title: "Prototype et tests",
          text: "Un prototype cliquable pour tester les parcours en conditions réelles et corriger ce qui crée de la friction.",
          deliverable: "Prototype interactif testé",
        },
        {
          title: "Passation et suivi",
          text: "Des fichiers organisés, des specs claires et une passation fluide aux développeurs, les nôtres ou les vôtres.",
          deliverable: "Kit de passation complet",
        },
      ],
    },
    comparison: {
      intro: "Une seule équipe dédiée couvrant la stratégie, le design et l'ingénierie, responsable de la performance et pas seulement des livrables.",
      rows: [
        { label: "Équipe dédiée", values: ["yes", "partial", "no"] },
        { label: "Accompagnement stratégique", values: ["yes", "yes", "no"] },
        { label: "Design et ingénierie", values: ["yes", "partial", "partial"] },
        { label: "Design system réutilisable", values: ["yes", "partial", "partial"] },
        { label: "Support après lancement", values: ["yes", "partial", "no"] },
        { label: "Engagement sur les résultats", values: ["yes", "no", "no"] },
      ],
    },
    work: {
      eyebrow: "Réalisé par TechFlow",
      heading: "Des marques qui ont *changé de cap.*",
      intro: "Identité, UX/UI et site : trois projets où le design a changé la perception.",
      projects: ["concorde", "little-green-spark", "epargne-plurielle"],
    },
  },

  development: {
    meta: {
      title: "Développement web, Webflow et sur mesure | TechFlow Agency",
      description:
        "Création et refonte de sites, marketplaces, SaaS et ERP sur mesure : une méthode agile, un budget maîtrisé et le SEO & GEO comme priorités non négociables.",
    },
    badge: "Développement web & produits",
    title: "Des sites et des produits conçus pour *performer.*",
    intro:
      "Nouveau site, refonte, marketplace, SaaS ou ERP sur mesure : nous construisons vite et bien, avec une méthode agile, un budget maîtrisé et le SEO & GEO comme priorités non négociables.",
    hero: {
      project: "opco-ep",
      url: "opcoep.fr",
      card: {
        title: "Core Web Vitals visés",
        rows: [
          { label: "LCP", value: "≤ 2,5 s" },
          { label: "INP", value: "≤ 200 ms" },
          { label: "CLS", value: "≤ 0,1" },
        ],
      },
    },
    audience: {
      eyebrow: "Pour qui",
      heading: "Quand votre site doit *enfin suivre.*",
      items: [
        {
          title: "Les entreprises sans réelle présence web",
          text: "Vous lancez un produit ou un service et il vous faut un site qui convertit dès le premier jour, pas dans six mois.",
        },
        {
          title: "Les entreprises dont le site ne performe plus",
          text: "Design dépassé, pages lentes, invisible sur Google. Il vous faut une refonte, sans perdre le SEO déjà construit.",
        },
        {
          title: "Les équipes que leurs outils ne suivent plus",
          text: "Des tableurs et des outils déconnectés partout. Il vous faut une plateforme, un ERP ou un CRM construit autour de vos processus.",
        },
      ],
      cta: "Envie de faire évoluer votre site ?",
    },
    stats: [
      { value: "55+", label: "projets livrés" },
      { value: "0", label: "perte SEO sur nos refontes" },
      { value: "3–6 sem.", label: "pour un site vitrine" },
      { value: "2–4 mois", label: "pour une plateforme ou un SaaS" },
    ],
    offer: {
      eyebrow: "Ce que nous construisons",
      heading: "Pourquoi nous faire *confiance ?*",
      intro:
        "Chaque livrable est construit autour de votre marché, de votre audience et de votre vision, prêt à être déployé et à évoluer avec vous.",
      items: [
        {
          title: "Création de site web",
          text: "Un site rapide et élégant, pensé pour convertir, construit sur Webflow pour rendre vos équipes autonomes, ou sur mesure quand le projet l'exige. SEO et GEO intégrés dès la conception.",
          tags: ["Webflow", "SEO & GEO", "PageSpeed"],
        },
        {
          title: "Refonte de site web",
          text: "Chaque refonte commence par un audit complet : technique, SEO, contenu et parcours. La migration se fait sans compromettre votre référencement.",
          tags: ["Audit pré-refonte", "Migration SEO", "Plan de redirections"],
        },
        {
          title: "Marketplaces et plateformes",
          text: "Mise en relation, paiement en ligne, espaces membres, back-office : des plateformes multi-utilisateurs connectées à vos outils via API.",
          tags: ["Paiement en ligne", "API et intégrations", "Espaces membres"],
        },
        {
          title: "SaaS pour startups",
          text: "Du MVP qui valide votre marché au produit qui passe à l'échelle : vision produit, roadmap priorisée et livraisons rapides.",
          tags: ["MVP", "Vision produit", "Scalabilité"],
        },
        {
          title: "CRM et ERP sur mesure",
          text: "Quand les outils du marché ne collent pas à vos processus, nous construisons l'outil autour de votre métier. Vos équipes gagnent des heures chaque semaine.",
          tags: ["ERP sur mesure", "CRM", "CMS"],
        },
        {
          title: "Création de MVP",
          text: "Un POC fonctionnel en quelques semaines, assez abouti pour convaincre utilisateurs et investisseurs, assez léger pour pivoter sans regret.",
          tags: ["Prototype", "Tests utilisateurs", "Validation marché"],
        },
      ],
    },
    quote: {
      quote:
        "Techflow a livré un projet web exceptionnel. Tout était parfaitement exempt de bugs, bien documenté et au-delà de toutes nos attentes. Leur communication proactive a rendu la collaboration très fluide.",
      name: "Ludovic de Jouvancourt",
      role: "CEO @Prello",
      photo: "/images/people/ludovic-de-jouvancourt.jpg",
    },
    highlight: {
      eyebrow: "Méthode agile",
      heading: "L'agilité, *pour de vrai.*",
      intro:
        "Pas de tunnel de six mois : un backlog priorisé ensemble, des sprints courts, une démo à la fin de chaque sprint et des livrables à chaque étape.",
      items: [
        { title: "Agilité et sprints", text: "Des sprints d'une à deux semaines, avec une démo à la fin de chacun. Vous voyez le produit avancer, pas un diagramme de Gantt." },
        { title: "Roadmap et backlog", text: "Une vision produit claire, une roadmap partagée et un backlog priorisé ensemble. Vous savez toujours ce qui sort ensuite." },
        { title: "Communication directe", text: "Un canal dédié (Slack ou WhatsApp), un point hebdomadaire et un interlocuteur unique." },
        { title: "Budget maîtrisé", text: "Un devis ferme avant engagement, un périmètre suivi sprint après sprint. Aucune surprise après coup." },
        { title: "Supervision et sécurité", text: "Monitoring, sauvegardes, mises à jour et bonnes pratiques de sécurité dès le premier jour." },
        { title: "Recommandations techniques", text: "Webflow quand c'est le bon outil, du code sur mesure quand cela se justifie. Toujours argumenté." },
      ],
    },
    process: {
      eyebrow: "Méthode",
      heading: "Six étapes, avec un *livrable* à chacune.",
      intro: "Du premier audit au suivi après la mise en ligne, vous savez toujours ce que vous obtenez, et quand.",
      steps: [
        { title: "Cadrage et audit", text: "Objectifs, utilisateurs, existant, contraintes. Pour une refonte, l'audit technique et SEO se fait ici.", deliverable: "Document de cadrage" },
        { title: "Recommandations techniques", text: "Stack, architecture, intégrations et découpage en sprints : un plan clair, chiffré et argumenté.", deliverable: "Roadmap + backlog priorisé" },
        { title: "Design et prototype", text: "Wireframes, maquettes et prototype cliquable, validés avec vous avant la première ligne de code.", deliverable: "Prototype validé" },
        { title: "Développement en sprints", text: "Une démo à la fin de chaque sprint. Vous testez pendant la construction, pas à la fin.", deliverable: "Une version testable par sprint" },
        { title: "Tests, SEO et mise en ligne", text: "Tests complets, optimisation PageSpeed, redirections et balisage SEO/GEO, sans interruption de service.", deliverable: "Site en ligne + rapport de performance" },
        { title: "Suivi et évolutions", text: "Nous surveillons, maintenons et continuons d'améliorer au rythme de vos priorités.", deliverable: "Rapport de suivi mensuel" },
      ],
    },
    comparison: {
      intro: "Une seule équipe dédiée qui couvre la stratégie, le design et l'ingénierie, responsable de la performance et pas seulement des livrables.",
      rows: [
        { label: "Équipe dédiée", values: ["yes", "partial", "no"] },
        { label: "Accompagnement stratégique", values: ["yes", "yes", "no"] },
        { label: "Design et ingénierie", values: ["yes", "partial", "partial"] },
        { label: "Migrations sans perte de SEO", values: ["yes", "partial", "no"] },
        { label: "Suivi après le lancement", values: ["yes", "partial", "no"] },
        { label: "Engagement sur les résultats", values: ["yes", "no", "no"] },
      ],
    },
    work: {
      eyebrow: "Réalisé par TechFlow",
      heading: "Livré en sprints, *toujours rapide.*",
      intro: "Des sites et des plateformes qui restent performants des mois après leur mise en ligne.",
      projects: ["opco-ep", "mandil-avocats", "place-des-aines"],
    },
  },

  aiAgents: {
    meta: {
      title: "Agents IA et automatisation sur mesure | TechFlow Agency",
      description:
        "Audit gratuit, plan d'action, déploiement : des agents IA autonomes dans votre cloud ou sur une infrastructure souveraine, agnostiques au modèle et mesurables.",
    },
    badge: "Agents IA & automatisation",
    title: "L'IA branchée sur votre entreprise. *Pas l'inverse.*",
    intro:
      "Audit gratuit, plan d'action, déploiement. Nous installons des agents IA autonomes, dans votre cloud ou sur une infrastructure souveraine qui vous appartient. Agnostiques au modèle, scalables, mesurables.",
    hero: {
      project: "leapmotor",
      url: "leapmotor.com.kh",
      card: {
        title: "Agent · Relances",
        rows: [
          { label: "Déclencheur", value: "Nouvel e-mail reçu" },
          { label: "Agent", value: "Qualifie la demande" },
          { label: "CRM", value: "Fiche mise à jour" },
          { label: "Action", value: "Relance envoyée" },
        ],
      },
    },
    audience: {
      eyebrow: "Pour qui",
      heading: "Quand vos équipes font *le travail d'un robot.*",
      items: [
        {
          title: "Les équipes noyées sous l'administratif",
          text: "Devis, contrats, reporting, relances : des heures perdues chaque semaine sur des tâches qu'un agent IA traite en quelques minutes.",
        },
        {
          title: "Les entreprises aux dix outils cloisonnés",
          text: "CRM, ERP, comptabilité, e-mails, tableurs : des données éparpillées partout, et rien qui communique.",
        },
        {
          title: "Les dirigeants qui pilotent à l'aveugle",
          text: "Aucune visibilité en temps réel sur la trésorerie, les marges ou les projets. Les décisions se prennent au feeling.",
        },
      ],
      cta: "Envie de récupérer 30 heures par semaine ?",
    },
    stats: [
      { value: "−32 h", label: "par semaine, par équipe" },
      { value: "24 h", label: "pour mettre une compétence IA en ligne" },
      { value: "1–4 sem.", label: "pour déployer un agent autonome" },
      { value: "5 j", label: "pour recevoir votre plan d'action chiffré" },
    ],
    offer: {
      eyebrow: "Ce que nous déployons",
      heading: "Pourquoi nous confier votre *IA ?*",
      intro:
        "Les outils du marché vous enferment dans un seul modèle. Nous construisons l'inverse : une stack qui vous appartient.",
      items: [
        { title: "Compétences IA à la demande", text: "Devis, contrats et NDA en quelques secondes, audits et synthèses à la demande. Conçues pour votre vocabulaire, en ligne en 24 heures.", tags: ["En ligne en 24 h", "Par équipe", "Vos modèles"] },
        { title: "Agents autonomes", text: "Des agents qui exécutent seuls des processus complets, hébergés dans votre cloud privé et connectés à vos e-mails, CRM, bases de données et API.", tags: ["Cloud privé", "Connecté à vos API", "24/7"] },
        { title: "Infrastructure souveraine", text: "Votre propre stack d'agents sur votre propre serveur : n8n et OpenRouter branchés sur le meilleur modèle du moment. Vos données ne sortent jamais.", tags: ["Serveur dédié", "n8n + OpenRouter", "Elle vous appartient"] },
        { title: "Architecture agnostique au modèle", text: "L'orchestration est découplée du modèle : passez de Claude à GPT, Mistral ou Llama en un clic, sans toucher à vos workflows.", tags: ["OpenRouter", "Aucune dépendance", "Toujours le meilleur LLM"] },
        { title: "Expertise sectorielle", text: "Immobilier, finance, juridique, conseil, recrutement : vos agents parlent votre langage dès le premier jour.", tags: ["5+ secteurs", "Le métier d'abord", "Méthodes éprouvées"] },
        { title: "Sécurité et souveraineté", text: "Environnements conformes au RGPD, permissions structurées, monitoring et garde-fous. Chaque agent est auditable et versionné.", tags: ["RGPD", "Monitoring", "Garde-fous"] },
      ],
    },
    quote: {
      quote: "J'ai apprécié leur écoute, leur réactivité et les propositions faites pour répondre à mes besoins. Merci encore !",
      name: "Pauline Mandil",
      role: "Partner @Mandil Avocats",
      photo: "/images/people/pauline-mandil.webp",
    },
    statement: {
      eyebrow: "Notre architecture",
      heading: "L'IA est un flux. Vos agents sont *la structure.*",
      text: "La plupart des solutions vous enchaînent à un seul modèle. Nous faisons l'inverse : vos agents sont structurés, durables et évolutifs, les modèles ne sont qu'un flux branché dessus. Un meilleur modèle sort ? Nous redirigeons le flux. Vos agents, eux, ne bougent pas.",
    },
    highlight: {
      eyebrow: "Expertise sectorielle",
      heading: "Des agents qui parlent *votre métier.*",
      intro: "Nous capitalisons un vrai savoir métier, secteur par secteur, et restons ouverts à tous les autres.",
      items: [
        { title: "Immobilier", text: "Baux, états des lieux, annonces, relances locataires, analyse de mandats." },
        { title: "Directions financières", text: "Clôtures comptables, reporting budgétaire, rapprochements bancaires, alertes de trésorerie." },
        { title: "Juridique", text: "Revue de contrats, tri des NDA, mises en demeure, veille réglementaire." },
        { title: "Cabinets de conseil", text: "Benchmarks, production de livrables, recherche documentaire, rédaction de propositions." },
        { title: "Recrutement", text: "Tri de CV, sourcing, préqualification des candidats, planification des entretiens." },
        { title: "Votre secteur ?", text: "L'audit révèle vos cas d'usage. Nous construisons autour de votre métier, quel qu'il soit." },
      ],
    },
    process: {
      eyebrow: "Méthode",
      heading: "Quatre étapes. De l'audit à *l'autonomie.*",
      intro: "Un livrable à chaque étape, et les premiers gains de productivité dès le premier jour.",
      steps: [
        { title: "Audit gratuit", text: "Sur site ou à distance, nous absorbons vos processus, vos outils, votre organisation, et identifions les tâches au plus fort potentiel.", deliverable: "Cartographie de vos processus", duration: "1 à 2 h" },
        { title: "Plan d'action", text: "Quels agents déployer, dans quel ordre, connectés à quoi, pour quel gain attendu. Vous décidez en toute visibilité.", deliverable: "Plan d'action chiffré", duration: "5 jours" },
        { title: "Déploiement", text: "Compétences, agents cloud ou infrastructure souveraine : nous construisons, branchons sur votre écosystème et formons vos équipes.", deliverable: "Premiers agents en ligne", duration: "1 à 4 sem." },
        { title: "Amélioration continue", text: "Un copilotage mensuel : nous mesurons les gains, itérons et déployons de nouveaux agents à mesure que vos ambitions grandissent.", deliverable: "Rapport de performance mensuel", duration: "Chaque mois" },
      ],
    },
    comparison: {
      intro: "Un audit métier approfondi, des agents sur mesure et une infrastructure qui vous appartient, pas un abonnement générique.",
      columns: ["TechFlow", "Outils SaaS génériques", "Freelances"],
      rows: [
        { label: "Audit métier approfondi", values: ["yes", "no", "partial"] },
        { label: "Agents sur mesure", values: ["yes", "no", "yes"] },
        { label: "Infrastructure souveraine", values: ["yes", "no", "partial"] },
        { label: "Indépendance vis-à-vis des LLM", values: ["yes", "no", "partial"] },
        { label: "Amélioration continue", values: ["yes", "partial", "no"] },
        { label: "Expertise sectorielle", values: ["yes", "no", "no"] },
      ],
    },
    work: {
      eyebrow: "Réalisé par TechFlow",
      heading: "Nos dernières *réalisations.*",
      intro: "Sites, plateformes et campagnes : les fondations sur lesquelles vos agents viennent se brancher.",
      projects: ["gato-tower", "leapmotor", "ama-campus"],
    },
    nextStep: {
      title: "Audit des opportunités IA",
      text: "Sur site ou à distance, nous cartographions vos processus et identifions les premiers agents à déployer, avec le gain attendu pour chacun. Plan livré sous 5 jours.",
    },
  },

  salesFunnel: {
    meta: {
      title: "Tunnels de vente et systèmes de croissance | TechFlow Agency",
      description:
        "Landing pages, CRM, qualification par IA et marketing automation : des systèmes d'acquisition connectés, automatisés et mesurés, en 90 jours.",
    },
    badge: "Tunnel de vente & growth",
    title: "Votre machine à croissance. *Pas un outil de plus.*",
    intro:
      "Nous déployons dans votre entreprise des systèmes d'acquisition, de conversion et d'automatisation sur mesure. Tout est connecté, tout est automatisé, tout est mesuré.",
    hero: {
      project: "place-des-aines",
      url: "placedesaines.fr",
      card: {
        title: "Rendez-vous / mois",
        rows: [
          { label: "Publicité", value: "100" },
          { label: "Landing page", value: "72" },
          { label: "Lead qualifié", value: "46" },
          { label: "Rendez-vous", value: "28" },
        ],
      },
    },
    audience: {
      eyebrow: "Pour qui",
      heading: "Quand votre pipeline *fuit.*",
      items: [
        { title: "Les fondateurs qui vendent seuls", text: "Le pipeline est dans votre tête, les relances passent à la trappe et chaque nouveau lead dépend de votre disponibilité." },
        { title: "Les équipes noyées sous les tâches manuelles", text: "Plus de temps passé sur la saisie, les relances et le reporting que sur la vente et la croissance." },
        { title: "Les entreprises dont les leads n'aboutissent jamais", text: "Des prospects entrent mais ne sont jamais relancés correctement, et les décisions se prennent sans KPI fiables." },
      ],
      cta: "Envie de mettre votre croissance en pilote automatique ?",
    },
    stats: [
      { value: "+291 %", label: "de rendez-vous décrochés (agence immobilière)" },
      { value: "×2", label: "taux de conversion en 60 jours" },
      { value: "30 h", label: "économisées chaque semaine" },
      { value: "90 j", label: "pour un système qui tourne" },
    ],
    offer: {
      eyebrow: "Ce que nous construisons",
      heading: "Pourquoi nous confier votre *croissance ?*",
      intro: "Nous ne vendons pas des outils : nous construisons des systèmes de croissance. Chaque brique répond à un objectif business.",
      items: [
        { title: "Génération de leads", text: "Landing pages qui convertissent, VSL et retargeting : chaque asset a une seule mission, remplir votre agenda de prospects qualifiés.", tags: ["Landing pages", "VSL", "Retargeting"] },
        { title: "Pipeline commercial et CRM", text: "Un pipeline structuré où aucun lead n'est oublié : étapes claires, scoring et priorisation automatiques.", tags: ["Mise en place du CRM", "Lead scoring", "Pipeline"] },
        { title: "Qualification et relances par IA", text: "L'IA qualifie chaque lead entrant et prend en charge les relances, avec des séquences qui s'adaptent à chaque prospect.", tags: ["Qualification IA", "Relances intelligentes", "24/7"] },
        { title: "Marketing automation", text: "Séquences e-mail, workflows et intégrations qui relient landing pages, CRM et outils en un seul système.", tags: ["Séquences e-mail", "Workflows", "Intégrations"] },
        { title: "Tableaux de bord et KPI", text: "Des tableaux de bord en temps réel sur les leads, la conversion et le chiffre d'affaires, canal par canal.", tags: ["Dashboard KPI", "Reporting", "Attribution"] },
        { title: "Canaux d'acquisition", text: "LinkedIn, outbound, cold email, retargeting : nous amplifions ce qui marche et coupons le reste.", tags: ["LinkedIn", "Cold email", "Outbound"] },
      ],
    },
    quote: {
      quote: "Techflow a été facile à travailler et a livré exactement ce dont nous avions besoin, dans les délais fixés à l'avance. Je recommande vivement.",
      name: "Matias Andres",
      role: "Rédacteur en chef @Frontkick.Online",
      photo: "/images/people/matias-andres.webp",
    },
    cases: {
      eyebrow: "Résultats",
      heading: "Des systèmes de croissance en *conditions réelles.*",
      items: [
        { sector: "Agence immobilière", title: "De 12 à 47 rendez-vous par mois", text: "Landing page, VSL, CRM automatisé et qualification de chaque prospect par IA.", metrics: [{ value: "+291 %", label: "rendez-vous décrochés" }, { value: "−70 %", label: "temps administratif" }] },
        { sector: "Cabinet de conseil", title: "Taux de conversion doublé en 60 jours", text: "Pipeline structuré, relances par IA et scoring automatique des opportunités.", metrics: [{ value: "×2", label: "taux de conversion" }, { value: "60 j", label: "pour des résultats" }] },
        { sector: "E-commerce B2B", title: "30 h par semaine économisées", text: "Automatisation complète du support, de la facturation et du reporting avec des agents IA dédiés.", metrics: [{ value: "30 h", label: "économisées / semaine" }, { value: "−45 %", label: "coûts opérationnels" }] },
      ],
    },
    process: {
      eyebrow: "Méthode",
      heading: "De zéro à un système qui tourne. *En 90 jours.*",
      intro: "Du premier audit au suivi après le lancement, vous savez toujours ce que vous obtenez, et quand.",
      steps: [
        { title: "Audit stratégique", text: "Acquisition, pipeline et opérations : nous identifions les leviers de croissance à plus fort impact.", deliverable: "Plan d'action chiffré", duration: "Semaine 1" },
        { title: "Construction du système", text: "Landing page, CRM, automatisations, IA : nous construisons les briques et connectons le tout.", deliverable: "Votre stack complète, en ligne", duration: "Semaines 2 à 4" },
        { title: "Lancement et acquisition", text: "Nous activons vos canaux : LinkedIn, outbound, cold email, retargeting. Les premiers leads arrivent.", deliverable: "Canaux actifs + premiers leads", duration: "Mois 2" },
        { title: "Passage à l'échelle", text: "Nous optimisons les conversions, amplifions les canaux qui performent et automatisons le reste.", deliverable: "Rapport de performance mensuel", duration: "Mois 3" },
      ],
    },
    comparison: {
      intro: "Une seule équipe dédiée qui couvre la stratégie, le design et l'ingénierie, responsable de la performance et pas seulement des livrables.",
      rows: [
        { label: "Équipe dédiée", values: ["yes", "partial", "no"] },
        { label: "Accompagnement stratégique", values: ["yes", "yes", "no"] },
        { label: "Marketing et ingénierie", values: ["yes", "partial", "partial"] },
        { label: "Automatisation par IA", values: ["yes", "no", "partial"] },
        { label: "Optimisation après le lancement", values: ["yes", "partial", "no"] },
        { label: "Engagement sur les KPI", values: ["yes", "no", "no"] },
      ],
    },
    work: {
      eyebrow: "Réalisé par TechFlow",
      heading: "Du clic au *rendez-vous.*",
      intro: "Campagnes, landing pages et sites pensés pour convertir, mesurés à chaque étape.",
      projects: ["gato-tower", "place-des-aines", "leapmotor"],
    },
    nextStep: {
      title: "Audit de croissance",
      text: "Nous cartographions votre tunnel de bout en bout : d'où viennent les leads, où ils fuient, ce qui peut être automatisé. Chaque constat est chiffré.",
    },
  },
};

const en: Record<ServiceKey, ServiceContent> = {
  design: {
    meta: {
      title: "Web Design, UX/UI & Brand Identity | TechFlow Agency",
      description:
        "Brand identity, UX/UI, Figma mockups and prototypes: research-led design that makes your offer obvious at first glance.",
    },
    badge: "Web design & brand identity",
    title: "Design that makes your offer *obvious.*",
    intro:
      "Your brand is the first thing people feel, before they read a single word. We study your market, define your positioning and build visual systems that look like you and earn trust from the very first impression.",
    hero: {
      project: "little-green-spark",
      url: "littlegreenspark.org",
      card: {
        title: "Design system",
        rows: [
          { label: "Primary", value: "#4766FF" },
          { label: "Night", value: "#07080D" },
          { label: "Paper", value: "#F4F3EF" },
        ],
      },
    },
    audience: {
      eyebrow: "Who it's for",
      heading: "Brands at a *turning point.*",
      items: [
        { title: "Companies launching something new", text: "You're building a product, a service or a company and need a brand that stands out from day one." },
        { title: "Companies that outgrew their identity", text: "Dated design, slow pages, invisible on Google. You need a redesign without losing the rankings you've built." },
        { title: "Companies scaling up", text: "New offer, new markets, new audience: your design has to keep up, with one consistent system across every touchpoint." },
      ],
      cta: "Ready to level up your website?",
    },
    stats: [
      { value: "55+", label: "projects shipped" },
      { value: "+31%", label: "average conversion lift after a TechFlow redesign" },
      { value: "14 days", label: "to your first UI mockups" },
      { value: "4–8 wks", label: "for a complete design project" },
    ],
    offer: {
      eyebrow: "What we design",
      heading: "Why trust us with your *design?*",
      intro: "Every deliverable is built around your market, your audience and your vision. You leave with a complete brand system, ready to roll out across every touchpoint.",
      items: [
        { title: "Brand identity & logo", text: "Market research, competitor analysis and clear positioning. A complete brand system (logo, colors, typography, tone of voice) built to last.", tags: ["Logo & identity", "Brand guidelines", "Tone of voice"] },
        { title: "UX design & wireframes", text: "We start from your users, not our preferences, and design mobile-first. Wireframes lock the structure before any visual work.", tags: ["Design thinking", "Design sprint", "Wireframes"] },
        { title: "UI mockups & style guide", text: "High-fidelity mockups of every screen, delivered with a style guide (colors, type, components) so your product stays consistent after launch.", tags: ["UI mockups", "Design system", "Typography"] },
        { title: "Interactive prototype", text: "Click through your future site as if it already existed. We test journeys, remove friction and validate everything before a line of code.", tags: ["Figma prototype", "User testing", "Validated before dev"] },
        { title: "Social ads & marketing assets", text: "Scroll-stopping creative adapted to every platform and format, with variants ready to test.", tags: ["Meta", "TikTok", "LinkedIn"] },
      ],
    },
    quote: {
      quote: "Efficient, professional, and in line with our expectations. The graphic designs were executed efficiently and meticulously. Communication was seamless, and deadlines were met.",
      name: "Rémi Cabrieres",
      role: "CFO @Sakam Security Aviation Kampuchea",
      photo: "/images/people/remi-cabrieres.webp",
    },
    process: {
      eyebrow: "Process",
      heading: "Five steps, a *deliverable* at each one.",
      intro: "Nothing gets built before it's validated here. You watch your interface sharpen, step by step.",
      steps: [
        { title: "Immersion & audit", text: "We dive into your market, your users and your current brand. You leave with a clear framework: goals, scope, schedule.", deliverable: "Approved creative brief" },
        { title: "Sitemap & wireframes", text: "The structure of every screen, key journeys and information hierarchy, validated together before any visual work.", deliverable: "Annotated wireframes" },
        { title: "UI mockups", text: "Your identity applied screen by screen, with a reusable design system for future pages.", deliverable: "Figma mockups + style guide" },
        { title: "Prototype & testing", text: "A clickable prototype to test journeys in real conditions and fix friction before development.", deliverable: "Tested interactive prototype" },
        { title: "Handoff & follow-up", text: "Organized files, clear specs and a smooth handoff to developers, ours or yours.", deliverable: "Complete handoff kit" },
      ],
    },
    comparison: {
      intro: "One dedicated team covering strategy, design and engineering, accountable for performance, not just deliverables.",
      rows: [
        { label: "Dedicated team", values: ["yes", "partial", "no"] },
        { label: "Strategic guidance", values: ["yes", "yes", "no"] },
        { label: "Design and engineering", values: ["yes", "partial", "partial"] },
        { label: "Reusable design system", values: ["yes", "partial", "partial"] },
        { label: "Post-launch support", values: ["yes", "partial", "no"] },
        { label: "Commitment to results", values: ["yes", "no", "no"] },
      ],
    },
    work: {
      eyebrow: "Built by TechFlow",
      heading: "Brands that *changed course.*",
      intro: "Identity, UX/UI and website: three projects where design changed how the brand is perceived.",
      projects: ["concorde", "little-green-spark", "epargne-plurielle"],
    },
  },

  development: {
    meta: {
      title: "Web Development, Webflow & Custom Builds | TechFlow Agency",
      description:
        "New sites, redesigns, marketplaces, SaaS and custom ERPs: an agile method, a controlled budget and SEO & GEO as non-negotiable priorities.",
    },
    badge: "Web development & products",
    title: "Websites and products built to *perform.*",
    intro:
      "New site, redesign, marketplace, SaaS or custom ERP: we build fast and right, with an agile method, a controlled budget and SEO & GEO as non-negotiable priorities.",
    hero: {
      project: "opco-ep",
      url: "opcoep.fr",
      card: {
        title: "Target Core Web Vitals",
        rows: [
          { label: "LCP", value: "≤ 2.5 s" },
          { label: "INP", value: "≤ 200 ms" },
          { label: "CLS", value: "≤ 0.1" },
        ],
      },
    },
    audience: {
      eyebrow: "Who it's for",
      heading: "When your site needs to *finally keep up.*",
      items: [
        { title: "Companies with no real web presence", text: "You're launching a product or service and need a site that converts from day one, not in six months." },
        { title: "Companies whose site stopped performing", text: "Outdated design, slow pages, invisible on Google. You need a redesign without losing the SEO you've built." },
        { title: "Teams their tools can't keep up with", text: "Spreadsheets and disconnected tools everywhere. You need a platform, ERP or CRM built around your processes." },
      ],
      cta: "Ready to level up your website?",
    },
    stats: [
      { value: "55+", label: "projects shipped" },
      { value: "0", label: "SEO lost on our redesigns" },
      { value: "3–6 wks", label: "for a showcase website" },
      { value: "2–4 mo", label: "for a platform or SaaS" },
    ],
    offer: {
      eyebrow: "What we build",
      heading: "Why *trust us?*",
      intro: "Every deliverable is built around your market, your audience and your vision, ready to ship and to grow with you.",
      items: [
        { title: "Website creation", text: "A fast, elegant site designed to convert, built on Webflow so your team stays autonomous, or custom-coded when the project calls for it. SEO and GEO built in from day one.", tags: ["Webflow", "SEO & GEO", "PageSpeed"] },
        { title: "Website redesign", text: "Every redesign starts with a full audit: technical, SEO, content and journeys. The migration never puts your rankings at risk.", tags: ["Pre-redesign audit", "SEO migration", "Redirect plan"] },
        { title: "Marketplaces & platforms", text: "Matching, online payments, member areas, back-office: multi-user platforms connected to your tools through APIs.", tags: ["Online payments", "APIs & integrations", "Member areas"] },
        { title: "SaaS for startups", text: "From the MVP that validates your market to the product that scales: product vision, prioritized roadmap and fast releases.", tags: ["MVP", "Product vision", "Scalability"] },
        { title: "Custom CRM & ERP", text: "When off-the-shelf tools don't fit your processes, we build the tool around your business. Your team wins back hours every week.", tags: ["Custom ERP", "CRM", "CMS"] },
        { title: "MVP development", text: "A working POC in a few weeks, polished enough to convince users and investors, light enough to pivot without regret.", tags: ["Prototype", "User testing", "Market validation"] },
      ],
    },
    quote: {
      quote: "Techflow delivered an exceptional web project. Everything was completely bug-free, well-documented, and exceeded all expectations. Their proactive communication made our collaboration a breeze.",
      name: "Ludovic de Jouvancourt",
      role: "CEO @Prello",
      photo: "/images/people/ludovic-de-jouvancourt.jpg",
    },
    highlight: {
      eyebrow: "Agile method",
      heading: "Agile, *for real.*",
      intro: "No six-month black box: a backlog prioritized together, short sprints, a demo at the end of every sprint and deliverables at every step.",
      items: [
        { title: "Agile sprints", text: "One to two-week sprints, each ending with a demo. You see the product move, not a Gantt chart." },
        { title: "Roadmap & backlog", text: "A clear product vision, a shared roadmap and a backlog prioritized together. You always know what ships next." },
        { title: "Direct communication", text: "A dedicated channel (Slack or WhatsApp), a weekly check-in and a single point of contact." },
        { title: "Controlled budget", text: "A firm quote before you commit, scope tracked sprint by sprint. No surprises after the fact." },
        { title: "Monitoring & security", text: "Monitoring, backups, updates and security best practices from day one." },
        { title: "Technical recommendations", text: "Webflow when it's the right tool, custom code when it's justified. Always argued." },
      ],
    },
    process: {
      eyebrow: "Process",
      heading: "Six steps, a *deliverable* at each one.",
      intro: "From the first audit to post-launch follow-up, you always know what you're getting, and when.",
      steps: [
        { title: "Scoping & audit", text: "Goals, users, existing assets, constraints. For a redesign, the technical and SEO audit happens here.", deliverable: "Scoping document" },
        { title: "Technical recommendations", text: "Stack, architecture, integrations and sprint breakdown: a clear, costed, argued plan.", deliverable: "Roadmap + prioritized backlog" },
        { title: "Design & prototype", text: "Wireframes, mockups and a clickable prototype, validated with you before the first line of code.", deliverable: "Approved prototype" },
        { title: "Development in sprints", text: "A demo at the end of every sprint. You test while we build, not at the end.", deliverable: "A testable version every sprint" },
        { title: "QA, SEO & launch", text: "Full testing, PageSpeed optimization, redirects and SEO/GEO markup, with zero downtime.", deliverable: "Live site + performance report" },
        { title: "Follow-up & evolution", text: "We monitor, maintain and keep improving at the pace of your priorities.", deliverable: "Monthly follow-up report" },
      ],
    },
    comparison: {
      intro: "One dedicated team covering strategy, design and engineering, accountable for performance, not just deliverables.",
      rows: [
        { label: "Dedicated team", values: ["yes", "partial", "no"] },
        { label: "Strategic guidance", values: ["yes", "yes", "no"] },
        { label: "Design and engineering", values: ["yes", "partial", "partial"] },
        { label: "Migrations with no SEO loss", values: ["yes", "partial", "no"] },
        { label: "Post-launch follow-up", values: ["yes", "partial", "no"] },
        { label: "Commitment to results", values: ["yes", "no", "no"] },
      ],
    },
    work: {
      eyebrow: "Built by TechFlow",
      heading: "Shipped in sprints, *still fast.*",
      intro: "Websites and platforms that stay fast months after launch.",
      projects: ["opco-ep", "mandil-avocats", "place-des-aines"],
    },
  },

  aiAgents: {
    meta: {
      title: "Custom AI Agents & Automation | TechFlow Agency",
      description:
        "Free audit, action plan, deployment: autonomous AI agents in your cloud or on sovereign infrastructure, model-agnostic and measurable.",
    },
    badge: "AI agents & automation",
    title: "AI plugged into your business. *Not the other way around.*",
    intro:
      "Free audit, action plan, deployment. We install autonomous AI agents in your cloud or on sovereign infrastructure you own. Model-agnostic, scalable, measurable.",
    hero: {
      project: "leapmotor",
      url: "leapmotor.com.kh",
      card: {
        title: "Agent · Follow-ups",
        rows: [
          { label: "Trigger", value: "New email received" },
          { label: "Agent", value: "Qualifies the request" },
          { label: "CRM", value: "Record updated" },
          { label: "Action", value: "Follow-up sent" },
        ],
      },
    },
    audience: {
      eyebrow: "Who it's for",
      heading: "When your team does *a robot's job.*",
      items: [
        { title: "Teams buried in admin", text: "Quotes, contracts, reporting, follow-ups: hours lost every week on tasks an AI agent handles in minutes." },
        { title: "Companies with ten siloed tools", text: "CRM, ERP, accounting, email, spreadsheets: data scattered everywhere, and nothing talks to anything." },
        { title: "Leaders flying blind", text: "No real-time view of cash, margins or projects. Decisions get made on gut feeling." },
      ],
      cta: "Want 30 hours a week back?",
    },
    stats: [
      { value: "−32 h", label: "per week, per team" },
      { value: "24 h", label: "to put an AI skill live" },
      { value: "1–4 wks", label: "to deploy an autonomous agent" },
      { value: "5 days", label: "to receive your costed action plan" },
    ],
    offer: {
      eyebrow: "What we deploy",
      heading: "Why trust us with your *AI?*",
      intro: "Off-the-shelf tools lock you into a single model. We build the opposite: a stack you own.",
      items: [
        { title: "On-demand AI skills", text: "Quotes, contracts and NDAs in seconds, audits and summaries on demand. Built for your vocabulary, live in 24 hours.", tags: ["Live in 24 h", "Per team", "Your templates"] },
        { title: "Autonomous agents", text: "Agents that run complete processes on their own, hosted in your private cloud and connected to your email, CRM, databases and APIs.", tags: ["Private cloud", "Connected to your APIs", "24/7"] },
        { title: "Sovereign infrastructure", text: "Your own agent stack on your own server: n8n and OpenRouter plugged into the best model of the moment. Your data never leaves.", tags: ["Dedicated server", "n8n + OpenRouter", "You own it"] },
        { title: "Model-agnostic architecture", text: "Orchestration is decoupled from the model: switch from Claude to GPT, Mistral or Llama in one click, without touching your workflows.", tags: ["OpenRouter", "No lock-in", "Always the best LLM"] },
        { title: "Industry expertise", text: "Real estate, finance, legal, consulting, recruiting: your agents speak your language from day one.", tags: ["5+ industries", "Business first", "Proven methods"] },
        { title: "Security & sovereignty", text: "GDPR-compliant environments, structured permissions, monitoring and guardrails. Every agent is auditable and versioned.", tags: ["GDPR", "Monitoring", "Guardrails"] },
      ],
    },
    quote: {
      quote: "I appreciated their attentiveness, responsiveness, and the proposals they made to meet my needs! Thanks again!",
      name: "Pauline Mandil",
      role: "Partner @Mandil Avocats",
      photo: "/images/people/pauline-mandil.webp",
    },
    statement: {
      eyebrow: "Our architecture",
      heading: "AI is a stream. Your agents are *the structure.*",
      text: "Most solutions chain you to a single model. We do the opposite: your agents are structured, durable and scalable, and models are just a stream plugged into them. A better model comes out? We reroute the stream. Your agents stay put.",
    },
    highlight: {
      eyebrow: "Industry expertise",
      heading: "Agents that speak *your business.*",
      intro: "We build real domain knowledge, industry by industry, and stay open to every other one.",
      items: [
        { title: "Real estate", text: "Leases, inspections, listings, tenant follow-ups, mandate analysis." },
        { title: "Finance teams", text: "Month-end close, budget reporting, bank reconciliations, cash alerts." },
        { title: "Legal", text: "Contract review, NDA triage, formal notices, regulatory watch." },
        { title: "Consulting firms", text: "Benchmarks, deliverable production, desk research, proposal writing." },
        { title: "Recruiting", text: "CV screening, sourcing, candidate pre-qualification, interview scheduling." },
        { title: "Your industry?", text: "The audit reveals your use cases. We build around your business, whatever it is." },
      ],
    },
    process: {
      eyebrow: "Process",
      heading: "Four steps. From audit to *autonomy.*",
      intro: "A deliverable at every step, and productivity gains from day one.",
      steps: [
        { title: "Free audit", text: "On site or remotely, we absorb your processes, tools and organization, and identify the tasks with the highest potential.", deliverable: "Your process map", duration: "1 to 2 h" },
        { title: "Action plan", text: "Which agents to deploy, in what order, connected to what, for what expected gain. You decide with full visibility.", deliverable: "Costed action plan", duration: "5 days" },
        { title: "Deployment", text: "Skills, cloud agents or sovereign infrastructure: we build, plug into your ecosystem and train your team.", deliverable: "First agents live", duration: "1 to 4 wks" },
        { title: "Continuous improvement", text: "Monthly co-piloting: we measure gains, iterate and deploy new agents as your ambitions grow.", deliverable: "Monthly performance report", duration: "Every month" },
      ],
    },
    comparison: {
      intro: "An in-depth business audit, custom agents and infrastructure you own, not a generic subscription.",
      columns: ["TechFlow", "Generic SaaS tools", "Freelancers"],
      rows: [
        { label: "In-depth business audit", values: ["yes", "no", "partial"] },
        { label: "Custom agents", values: ["yes", "no", "yes"] },
        { label: "Sovereign infrastructure", values: ["yes", "no", "partial"] },
        { label: "Independence from LLMs", values: ["yes", "no", "partial"] },
        { label: "Continuous improvement", values: ["yes", "partial", "no"] },
        { label: "Industry expertise", values: ["yes", "no", "no"] },
      ],
    },
    work: {
      eyebrow: "Built by TechFlow",
      heading: "Our latest *work.*",
      intro: "Websites, platforms and campaigns: the foundations your agents plug into.",
      projects: ["gato-tower", "leapmotor", "ama-campus"],
    },
    nextStep: {
      title: "AI opportunity audit",
      text: "On site or remotely, we map your processes and identify the first agents to deploy, with the expected gain for each. Plan delivered within 5 days.",
    },
  },

  salesFunnel: {
    meta: {
      title: "Sales Funnels & Growth Systems | TechFlow Agency",
      description:
        "Landing pages, CRM, AI qualification and marketing automation: connected, automated and measured acquisition systems, live in 90 days.",
    },
    badge: "Sales funnel & growth",
    title: "Your growth machine. *Not another tool.*",
    intro:
      "We deploy custom acquisition, conversion and automation systems in your business. Everything connected, everything automated, everything measured.",
    hero: {
      project: "place-des-aines",
      url: "placedesaines.fr",
      card: {
        title: "Meetings / month",
        rows: [
          { label: "Ad", value: "100" },
          { label: "Landing page", value: "72" },
          { label: "Qualified lead", value: "46" },
          { label: "Meeting", value: "28" },
        ],
      },
    },
    audience: {
      eyebrow: "Who it's for",
      heading: "When your pipeline *leaks.*",
      items: [
        { title: "Founders selling alone", text: "The pipeline lives in your head, follow-ups slip through the cracks and every new lead depends on your availability." },
        { title: "Teams buried in manual work", text: "More time spent on data entry, follow-ups and reporting than on selling and growing." },
        { title: "Companies whose leads never close", text: "Prospects come in but never get followed up properly, and decisions get made without reliable KPIs." },
      ],
      cta: "Want to put your growth on autopilot?",
    },
    stats: [
      { value: "+291%", label: "meetings booked (real estate agency)" },
      { value: "×2", label: "conversion rate in 60 days" },
      { value: "30 h", label: "saved every week" },
      { value: "90 days", label: "to a system that runs" },
    ],
    offer: {
      eyebrow: "What we build",
      heading: "Why trust us with your *growth?*",
      intro: "We don't sell tools: we build growth systems. Every piece answers a business goal.",
      items: [
        { title: "Lead generation", text: "High-converting landing pages, VSLs and retargeting: every asset has one job, filling your calendar with qualified prospects.", tags: ["Landing pages", "VSL", "Retargeting"] },
        { title: "Sales pipeline & CRM", text: "A structured pipeline where no lead is forgotten: clear stages, automatic scoring and prioritization.", tags: ["CRM setup", "Lead scoring", "Pipeline design"] },
        { title: "AI qualification & follow-ups", text: "AI qualifies every inbound lead and handles the follow-ups, with sequences that adapt to each prospect.", tags: ["AI qualification", "Smart follow-ups", "24/7"] },
        { title: "Marketing automation", text: "Email sequences, workflows and integrations that tie landing pages, CRM and tools into one system.", tags: ["Email sequences", "Workflows", "Integrations"] },
        { title: "Dashboards & KPIs", text: "Real-time dashboards on leads, conversion and revenue, channel by channel.", tags: ["KPI dashboard", "Reporting", "Attribution"] },
        { title: "Acquisition channels", text: "LinkedIn, outbound, cold email, retargeting: we amplify what works and cut the rest.", tags: ["LinkedIn", "Cold email", "Outbound"] },
      ],
    },
    quote: {
      quote: "Techflow was easy to work with and delivered exactly what we needed in the time frame that we had set beforehand. Highly recommended.",
      name: "Matias Andres",
      role: "Chief Editor @Frontkick.Online",
      photo: "/images/people/matias-andres.webp",
    },
    cases: {
      eyebrow: "Results",
      heading: "Growth systems in *the real world.*",
      items: [
        { sector: "Real estate agency", title: "From 12 to 47 meetings a month", text: "Landing page, VSL, automated CRM and AI qualification of every prospect.", metrics: [{ value: "+291%", label: "meetings booked" }, { value: "−70%", label: "admin time" }] },
        { sector: "Consulting firm", title: "Conversion rate doubled in 60 days", text: "Structured pipeline, AI follow-ups and automatic opportunity scoring.", metrics: [{ value: "×2", label: "conversion rate" }, { value: "60 days", label: "to results" }] },
        { sector: "B2B e-commerce", title: "30 hours a week saved", text: "Support, invoicing and reporting fully automated with dedicated AI agents.", metrics: [{ value: "30 h", label: "saved / week" }, { value: "−45%", label: "operating costs" }] },
      ],
    },
    process: {
      eyebrow: "Process",
      heading: "From zero to a running system. *In 90 days.*",
      intro: "From the first audit to post-launch follow-up, you always know what you're getting, and when.",
      steps: [
        { title: "Strategic audit", text: "Acquisition, pipeline and operations: we pinpoint the highest-impact growth levers.", deliverable: "Costed action plan", duration: "Week 1" },
        { title: "System build", text: "Landing page, CRM, automations, AI: we build the pieces and connect everything.", deliverable: "Your full stack, live", duration: "Weeks 2 to 4" },
        { title: "Launch & acquisition", text: "We switch on your channels: LinkedIn, outbound, cold email, retargeting. The first leads come in.", deliverable: "Live channels + first leads", duration: "Month 2" },
        { title: "Scale & optimize", text: "We optimize conversions, amplify the channels that perform and automate the rest.", deliverable: "Monthly performance report", duration: "Month 3" },
      ],
    },
    comparison: {
      intro: "One dedicated team covering strategy, design and engineering, accountable for performance, not just deliverables.",
      rows: [
        { label: "Dedicated team", values: ["yes", "partial", "no"] },
        { label: "Strategic guidance", values: ["yes", "yes", "no"] },
        { label: "Marketing and engineering", values: ["yes", "partial", "partial"] },
        { label: "AI automation", values: ["yes", "no", "partial"] },
        { label: "Post-launch optimization", values: ["yes", "partial", "no"] },
        { label: "Commitment to KPIs", values: ["yes", "no", "no"] },
      ],
    },
    work: {
      eyebrow: "Built by TechFlow",
      heading: "From click to *meeting.*",
      intro: "Campaigns, landing pages and websites built to convert, measured at every step.",
      projects: ["gato-tower", "place-des-aines", "leapmotor"],
    },
    nextStep: {
      title: "Growth audit",
      text: "We map your funnel end to end: where leads come from, where they leak, what can be automated. Every finding is quantified.",
    },
  },
};

export const serviceContent: Record<Locale, Record<ServiceKey, ServiceContent>> = { fr, en };
