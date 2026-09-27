import type { Locale } from "@/i18n/config";
import type { Block } from "../page/blocks";

export type Article = {
  slug: string;
  date: string;
  category: Record<Locale, string>;
  cover: string;
  coverUrl: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  /** Articles are only published in French. */
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "creation-site-internet-design-agence",
    date: "2026-08-12",
    category: { fr: "Design & UX", en: "Design & UX" },
    cover: "place-des-aines",
    coverUrl: "placedesaines.fr",
    title: {
      fr: "Création site internet design : ce que change un vrai travail de design",
      en: "Designing a website: what real design work actually changes",
    },
    excerpt: {
      fr: "Ce que produit vraiment une phase de design : arborescence validée, planches Figma annotées, intégration Webflow, livrables et délais réels.",
      en: "What a design phase really produces: an approved sitemap, annotated Figma boards, a Webflow build, real deliverables and timelines.",
    },
    body: [
      { type: "p", text: "Une recherche sur la création d'un site internet design renvoie aujourd'hui deux familles de réponses : des plateformes qui proposent de choisir un modèle en quelques clics, et des articles d'inspiration qui alignent de beaux exemples sans expliquer comment on y arrive. Entre les deux, la question que posent réellement les dirigeants qui nous contactent reste sans réponse : qu'est-ce qui est produit, par qui, dans quel ordre, et à quel moment une maquette cesse d'être une image pour devenir un site en ligne. Cet article décrit la chaîne de production que nous appliquons chez TechFlow Agency, du cadrage à la mise en ligne, avec les livrables, les outils et les délais réels." },
      { type: "h2", text: "Un site internet design, est-ce seulement une question d'esthétique ?" },
      { type: "p", text: "Un site internet design n'est pas seulement un site agréable à regarder : c'est un site dont l'architecture, la hiérarchie de l'information et l'identité visuelle servent un objectif commercial précis. L'esthétique en est la partie visible, pas le point de départ." },
      { type: "p", text: "Deux travaux de recherche souvent cités donnent la mesure de l'enjeu. L'étude sur la crédibilité web menée à Stanford en 2002, sur 2 684 participants, montre que l'apparence du design est le critère mentionné le plus fréquemment dans les commentaires d'évaluation, présent dans 46,1 % d'entre eux. Les travaux de Gitte Lindgaard publiés en 2006, relayés depuis par le Nielsen Norman Group, montrent pour leur part qu'un jugement esthétique se forme dès 50 millisecondes d'exposition à une page, et qu'il évolue peu ensuite." },
      { type: "p", text: "Concrètement, le design d'un site décide de quatre choses avant même la première ligne de contenu :" },
      { type: "ul", items: [
        "L'arborescence : quelles pages existent, comment elles se répondent, et ce qu'un visiteur trouve en trois clics.",
        "La hiérarchie : ce qu'on lit en premier sur chaque écran, et ce qu'on relègue plus bas.",
        "Le positionnement visuel : ce que l'identité raconte du sérieux, du secteur et de la taille de l'entreprise.",
        "Le parcours de conversion : où se trouvent les points de contact, et vers quelle action ils mènent.",
      ] },
      { type: "h2", text: "Que comprend la création d'un site internet design ?" },
      { type: "p", text: "La création d'un site internet design couvre quatre blocs de travail distincts, qui se vendent parfois séparément et se confondent souvent dans les devis. Savoir lequel vous achetez évite la mauvaise surprise classique : recevoir des fichiers de maquettes et découvrir qu'il reste un site à construire." },
      { type: "ul", items: [
        "Stratégie : analyse du marché et des concurrents, positionnement, axes de communication que le site va porter.",
        "Branding : identité visuelle, palette, typographies, système graphique cohérent d'une page à l'autre.",
        "UX/UI : architecture de l'information puis maquettes haute fidélité, desktop et mobile.",
        "Développement : intégration au pixel près, mise en place du CMS, tests, mise en ligne.",
      ] },
      { type: "p", text: "Nous vendons ces quatre blocs comme un projet unique, au devis et non à l'abonnement, parce que les séparer produit presque toujours le même symptôme : une identité qui ne survit pas à l'intégration, ou des maquettes techniquement infaisables dans le budget prévu." },
      { type: "h2", text: "Ce que les outils en ligne ne font pas à votre place" },
      { type: "p", text: "Les résultats de recherche sur ce sujet se répartissent en deux camps : des créateurs de sites en ligne qui promettent un site à partir d'un modèle, et des guides d'inspiration. Aucun ne décrit l'enchaînement réel des livrables d'un projet, ni le passage de la maquette au site en ligne. Voici ce que produit une phase de design menée sérieusement, sur nos propres projets :" },
      { type: "ul", items: [
        "Une arborescence validée page par page avant qu'un seul visuel soit produit. Sur le projet Place des Aînés, ce document a fixé la structure complète du site en amont.",
        "Des planches Figma annotées section par section, où chaque bloc est expliqué et discuté, plutôt qu'un rendu unique à approuver ou refuser en bloc.",
        "Une revue client formalisée : les retours sont consolidés, puis les écrans sont repris. Un aller-retour, pas une négociation continue.",
        "Une intégration dans Webflow menée par l'équipe qui a dessiné les écrans, avec un CMS configuré pour que vos équipes publient ensuite sans nous.",
      ] },
      { type: "p", text: "Un modèle en ligne vous donne une mise en forme. Il ne prend aucune de ces décisions à votre place, et surtout pas en fonction de votre marché." },
      { type: "h2", text: "Comment créer un site internet design, étape par étape" },
      { type: "p", text: "Notre méthode tient en cinq étapes, et chacune se ferme avant que la suivante s'ouvre. C'est cette séquence qui tient les délais, plus que la vitesse d'exécution." },
      { type: "ol", items: [
        "Atelier de cadrage : définir les objectifs (visibilité, génération de contacts, expérience utilisateur) et identifier les obstacles existants.",
        "Recherche et stratégie : analyse du marché et des concurrents, puis positionnement distinct et axes de communication.",
        "Branding et identité visuelle : personnalité de marque, proposition de valeur et messages clés, traduits en système visuel documenté.",
        "Maquettes UX/UI : architecture de l'information, puis maquettes haute fidélité dans Figma, desktop et mobile.",
        "Développement et tests : intégration précise dans Webflow, puis tests de navigation, de compatibilité et de responsive.",
      ] },
      { type: "p", text: "Sur une refonte, deux tâches s'ajoutent à l'étape 5 et ne sont pas optionnelles. Pour Mandil Avocats, nous avons mené un audit technique complet via Screaming Frog puis mis en place les redirections 301 depuis les anciennes URL. Sans elles, un site refondu perd le référencement que l'ancien avait accumulé." },
      { type: "h2", text: "Quels livrables attendre de la phase de design ?" },
      { type: "table", head: ["Étape", "Livrable", "Format"], rows: [
        ["Cadrage", "Objectifs, contraintes, périmètre", "Document de synthèse"],
        ["Stratégie", "Positionnement et axes de communication", "Document de synthèse"],
        ["Branding", "Logo, palette, typographies", "Fichiers sources et guide de style"],
        ["Architecture", "Arborescence complète, page par page", "Schéma"],
        ["UX/UI", "Maquettes desktop et mobile", "Planches Figma annotées"],
        ["Développement", "Site intégré, CMS configuré, tests passés", "Site en ligne"],
      ] },
      { type: "p", text: "Un point de vigilance sur la propriété : exigez les fichiers sources, pas seulement des exports en image. Sans eux, toute évolution du design dépend du prestataire qui les détient." },
      { type: "h2", text: "Combien de temps prend la création d'un site internet design ?" },
      { type: "p", text: "De 4 à 12 semaines selon la complexité, du premier atelier à la mise en ligne. Deux facteurs allongent ce calendrier dans les faits : les retours sur maquettes qui arrivent au compte-gouttes, et les contenus livrés après le début de l'intégration. Après la mise en ligne, chaque projet inclut trois mois de support gratuit." },
      { type: "h2", text: "Comment mesurer si le design fonctionne ?" },
      { type: "p", text: "Le design se mesure sur des indicateurs publics et vérifiables. Trois d'entre eux sont définis par Google sous le nom de Core Web Vitals, évalués au 75e centile des chargements, mobile et desktop séparés :" },
      { type: "ul", items: [
        "LCP (affichage du plus grand élément) : 2,5 secondes ou moins.",
        "INP (réactivité aux interactions) : 200 millisecondes ou moins.",
        "CLS (stabilité visuelle) : 0,1 ou moins.",
      ] },
      { type: "p", text: "S'y ajoutent des vérifications simples : le visiteur comprend-il en un écran ce que vous vendez, trouve-t-il le moyen de vous contacter sans chercher, et vos équipes peuvent-elles publier une page sans rouvrir un ticket ?" },
      { type: "h2", text: "Faut-il un designer, une plateforme ou une agence ?" },
      { type: "ul", items: [
        "Une plateforme en ligne : quand le besoin est un site de présence simple et que personne n'a besoin d'un positionnement différenciant.",
        "Un designer indépendant : quand vous savez précisément ce que vous voulez et pouvez piloter la production.",
        "Une agence : quand positionnement, identité et construction doivent être traités comme un seul projet.",
      ] },
      { type: "h2", text: "Passer de la maquette au site en ligne" },
      { type: "p", text: "Le design n'est terminé que lorsqu'il est en ligne, mesurable et modifiable par vos équipes : une arborescence validée avant le premier visuel, des maquettes Figma annotées, puis une intégration Webflow avec un CMS que vous pilotez, le tout en 4 à 12 semaines et suivi de trois mois de support." },
    ],
  },
  {
    slug: "agence-webflow-pme",
    date: "2026-08-03",
    category: { fr: "Performance du site web", en: "Website performance" },
    cover: "mandil-avocats",
    coverUrl: "mandil-avocats.com",
    title: {
      fr: "Agence Webflow : comment nous utilisons Webflow pour les projets de PME",
      en: "Webflow agency: how we use Webflow for small business projects",
    },
    excerpt: {
      fr: "Méthode en cinq étapes, CMS que le client gère en autonomie, et quand étendre Webflow avec Bubble, WeWeb, Xano ou Shopify.",
      en: "A five-step method, a CMS the client runs on their own, and when to extend Webflow with Bubble, WeWeb, Xano or Shopify.",
    },
    body: [
      { type: "p", text: "Une agence Webflow n'est pas seulement un prestataire qui produit des sites sur une plateforme populaire. Chez TechFlow Agency, Webflow est l'outil au cœur de notre développement web, mais il arrive à un moment précis de notre méthode, après le branding et les maquettes UX/UI. Cet article détaille comment nous utilisons Webflow au quotidien, et ce que cela change pour une PME qui nous confie son site." },
      { type: "h2", text: "Qu'est-ce qu'une agence Webflow, concrètement ?" },
      { type: "p", text: "Un studio qui conçoit et développe des sites directement sur Webflow, un outil de conception web qui permet de produire des sites sur mesure sans écrire le code à la main. Chez nous, la définition va plus loin : nous sommes une agence créative full-stack qui réunit branding, UX/UI et développement dans un même projet. Concrètement, nous prenons en charge :" },
      { type: "ul", items: [
        "la conception visuelle et l'architecture claire du site,",
        "l'intégration au pixel près dans Webflow,",
        "la mise en place d'un CMS pour gérer le contenu au quotidien,",
        "la mise en ligne, les tests, puis le suivi après le lancement.",
      ] },
      { type: "p", text: "La différence avec un développeur Webflow indépendant tient à cette chaîne complète. Un freelance intervient souvent sur une seule brique, l'intégration. Nous prenons le projet depuis le positionnement jusqu'aux tests, ce qui évite les ruptures entre ce qui a été pensé et ce qui est mis en ligne." },
      { type: "h2", text: "Comment nous utilisons Webflow, étape par étape" },
      { type: "p", text: "Nous n'ouvrons jamais Webflow en premier. Il intervient à la quatrième étape d'une méthode en cinq temps : cadrage, stratégie, branding, UX/UI, puis développement et tests. Ce séquencement garantit que le site traduit une réflexion, pas une improvisation." },
      { type: "h3", text: "De Figma à Webflow : de la maquette au site" },
      { type: "p", text: "Tout part de Figma. Une fois les maquettes validées, nous les intégrons dans Webflow au pixel près, en respectant la charte définie à l'étape branding. C'est le moment où la maquette devient un site réel, responsive et animé." },
      { type: "h3", text: "Le CMS Webflow : le client reste autonome" },
      { type: "p", text: "Nous structurons des collections (articles, projets, offres, pages dynamiques) pour que l'ajout d'un nouvel élément reprenne automatiquement le design en place. Un dirigeant peut publier un article ou une référence en quelques minutes, sans compétence technique et sans nous facturer une intervention." },
      { type: "h3", text: "Refonte : audit Screaming Frog et redirections 301" },
      { type: "p", text: "Une refonte ne consiste pas à effacer l'existant. Sur le projet Mandil Avocats, nous avons mené un audit technique complet via Screaming Frog, puis mis en place des redirections 301 pour préserver le référencement acquis." },
      { type: "h2", text: "Webflow est-il adapté à une agence comme la nôtre ?" },
      { type: "p", text: "C'est précisément pour cela que nous l'avons choisi comme outil principal. Dans notre pratique, la plateforme apporte trois choses concrètes :" },
      { type: "ul", items: [
        "Autonomie : nous livrons un site sans dépendre d'un développeur back-end pour chaque page, ce qui raccourcit les cycles de production.",
        "Contrôle du design : le rendu final correspond exactement à la maquette Figma, sans compromis d'intégration.",
        "Passation simple : le client gère son contenu seul via le CMS, ce qui allège la maintenance.",
      ] },
      { type: "p", text: "Sur le projet Concorde, ce trio nous a permis de livrer un site aligné sur une double expertise locale et internationale, du branding à la mise en ligne, dans un cadre de production maîtrisé." },
      { type: "h2", text: "Que faisons-nous quand Webflow ne suffit pas ?" },
      { type: "p", text: "Webflow excelle pour les sites vitrines, les landing pages et les sites de contenu, mais atteint ses limites dès qu'un projet demande une logique applicative lourde ou un e-commerce à catalogue profond. Plutôt que de tout forcer dedans, nous l'étendons :" },
      { type: "table", head: ["Besoin du projet", "Ce que couvre Webflow", "Ce que nous ajoutons"], rows: [
        ["Site vitrine, landing page, blog", "Design sur mesure et CMS", "Rien, Webflow suffit"],
        ["Application, espace membre riche", "Dynamique léger seulement", "Bubble ou WeWeb"],
        ["Base de données, logique serveur", "Non couvert nativement", "Xano"],
        ["E-commerce à catalogue profond", "Commerce simple", "Shopify"],
        ["Automatisations entre outils", "Non natif", "Zapier ou Make"],
      ] },
      { type: "p", text: "Ce choix se fait à l'étape de cadrage, pas en cours de développement. Il évite deux écueils : sur-dimensionner un site simple, ou enfermer un projet ambitieux dans un outil qui le bridera six mois plus tard." },
      { type: "h2", text: "Ce que travailler avec une agence Webflow change pour une PME" },
      { type: "ul", items: [
        "un projet livré en 4 à 12 semaines selon la complexité,",
        "3 mois de support après la mise en ligne,",
        "un site que vous gérez ensuite en autonomie via le CMS,",
        "une méthode en cinq étapes, du cadrage aux tests, plutôt qu'une production improvisée.",
      ] },
      { type: "p", text: "Pour un dirigeant, cela signifie un site professionnel, évolutif et maîtrisable, sans avoir à internaliser une équipe technique. Parcourez nos réalisations pour voir des projets concrets, puis prenez rendez-vous pour un premier échange de 30 minutes." },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const readingMinutes = (article: Article) => {
  const words = article.body
    .flatMap((b) => ("text" in b ? [b.text] : "items" in b ? b.items : b.rows.flat()))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
};

const fr = {
  meta: {
    title: "Insights sur le design, Webflow et l'IA | TechFlow",
    description: "Méthodes, livrables et retours d'expérience : ce que nous apprenons en concevant et en développant des sites et des produits web.",
  },
  badge: "Ressources",
  title: "Nos *insights.*",
  intro: "Design, Webflow, IA : ce que nous apprenons en livrant, avec les livrables, les outils et les délais réels.",
  latest: "Dernier article",
  all: "Tous les articles",
  frenchOnly: "",
  by: "Écrit par TechFlow Agency",
  minutes: "min de lecture",
  toc: "Sommaire",
  back: "Tous les articles",
  related: "À lire aussi",
  services: { eyebrow: "Services", heading: "Quel service pouvons-nous *vous apporter ?*" },
};

const en: typeof fr = {
  meta: {
    title: "Insights on Design, Webflow & AI | TechFlow",
    description: "Methods, deliverables and lessons learned: what we learn designing and building websites and web products.",
  },
  badge: "Insights",
  title: "Our *insights.*",
  intro: "Design, Webflow, AI: what we learn by shipping, with the real deliverables, tools and timelines.",
  latest: "Latest article",
  all: "All articles",
  frenchOnly: "Article in French",
  by: "Written by TechFlow Agency",
  minutes: "min read",
  toc: "Contents",
  back: "All articles",
  related: "Read next",
  services: { eyebrow: "Services", heading: "How can we *help you?*" },
};

export const insightsContent: Record<Locale, typeof fr> = { fr, en };
