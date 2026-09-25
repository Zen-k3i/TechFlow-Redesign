import type { Dictionary } from "./fr";

const SITE = "https://www.techflow-agency.com/en";

export const en: Dictionary = {
  meta: {
    title: "TechFlow Agency | Design, Development & AI Agents",
    description:
      "Design, development and AI: TechFlow is a startup studio. We ship in five weeks the web products other agencies take months to deliver.",
  },

  nav: {
    links: [
      { id: "services", label: "Services" },
      { id: "projets", label: "Work" },
      { id: "methode", label: "Process" },
      { id: "avis", label: "Reviews" },
      { id: "faq", label: "FAQ" },
    ],
    book: "Book a call",
    bookMobile: "Book a free call →",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "TechFlow Agency, back to top",
    language: "Language",
  },

  hero: {
    badge: "12 years · 45+ projects shipped",
    subtitle:
      "Design, development and AI: TechFlow is a startup studio. We ship in *five weeks* the web products other agencies take *months* to deliver.",
    start: "Start a project",
    human: "Talk to a human",
    reassurance: "Free · No commitment · 30 minutes",
    clients: { value: "35+", label: "clients served" },
    speed: { title: "From idea to product", sub: "in 5 weeks" },
    compiled: { label: "Compiled in", value: "5 wks" },
    leads: "leads",
    caseCursor: "View case",
    caseAlt: "Case study",
    view: "View →",
  },

  trust: {
    eyebrow: "Trusted by",
    stats: [
      { value: 12, suffix: " yrs", label: "of combined experience" },
      { value: 45, suffix: "+", label: "projects shipped" },
      { value: 35, suffix: "+", label: "clients served" },
      { value: 5, suffix: " wks", label: "from idea to launch" },
    ],
  },

  industries: {
    eyebrow: "Industries",
    heading: "Different industries. *Same standard.*",
    intro:
      "Every industry has its own codes, constraints and decision-makers. Our standard stays exactly the same from one project to the next.",
    references: "References",
    seeCase: "View the case study",
    items: [
      {
        id: "conseil",
        title: "Consulting & Professional Firms",
        short: "Consulting & professional firms",
        text: "Websites that turn your credibility into qualified meetings.",
        tags: ["Corporate site", "Meeting booking", "SEO"],
        clients: ["Mandil Avocats", "Exelmans", "Tandem Partners"],
        project: "mandil-avocats",
      },
      {
        id: "plateformes",
        title: "Digital Platforms & ERPs",
        short: "Platforms & ERPs",
        text: "Websites, platforms and internal tools: we cover the whole chain.",
        tags: ["Web platforms", "Internal tools", "Integrations"],
        clients: ["AMA Campus", "Place des Aînés", "District 6"],
        project: "ama-campus",
      },
      {
        id: "institutions",
        title: "Public Institutions & Agencies",
        short: "Public institutions",
        text: "Platforms built to last: accessibility, data sovereignty, maintenance without the headaches.",
        tags: ["Accessibility", "Data sovereignty", "Maintenance"],
        clients: ["OPCO EP", "Little Green Spark"],
        project: "opco-ep",
      },
    ],
    cta: {
      short: "Your industry?",
      title: "Become our next client?",
      text: "Don't see your industry here? Our method adapts, our standard doesn't.",
      button: "Let's talk",
    },
  },

  manifesto: {
    eyebrow: "Manifesto",
    statement:
      "At TechFlow, we believe a high-quality digital experience shouldn't take *months* to build.",
    bridge: "It's not just about moving fast. It's about eliminating:",
    removed: ["Vague back-and-forth", "Constantly changing briefs", "Dragged-out approvals"],
    removedTag: "Removed",
    closing: "The process drives *the speed.*",
    body: "We cover the whole chain: research, design system, development, AI automation. The technology changes every quarter. Our standard for what goes into production doesn't move an inch.",
    chainLabel: "The whole chain, one team",
    chain: ["Research", "Design system", "Development", "AI automation"],
  },

  services: {
    eyebrow: "Services",
    heading: "Four disciplines, *one* team.",
    intro: "Pick one service or combine them: every piece plugs into the others, with nothing lost between two vendors.",
    discover: "Explore",
    items: [
      {
        id: "design",
        title: "Design",
        tagline: "A brand that earns trust before the first word.",
        pitch: "Branding, UX/UI, social ads, motion design: we build a brand that puts your expertise up front.",
        deliverables: ["Visual identity", "Figma design system", "High-fidelity UX/UI", "Motion design"],
        image: "little-green-spark",
        href: `${SITE}/design`,
      },
      {
        id: "developpement",
        title: "Development",
        tagline: "Fast at launch, still clean three years later.",
        pitch: "Platforms and websites still fast and clean three years after launch.",
        deliverables: ["Webflow", "Shopify & Bubble", "Custom builds", "SEO & performance"],
        image: "opco-ep",
        href: `${SITE}/development`,
      },
      {
        id: "agents-ia",
        title: "AI Agents",
        tagline: "Your repetitive tasks, done overnight.",
        pitch: "What your team redoes fifteen times a week, an agent does overnight.",
        deliverables: ["n8n automation", "HubSpot & Twenty CRM", "API integrations", "Sovereign AI"],
        image: "leapmotor",
        href: `${SITE}/ai-agents`,
      },
      {
        id: "tunnel-de-vente",
        title: "Sales Funnel",
        tagline: "From ad to booked meeting, measured at every step.",
        pitch: "From the ad to the booked meeting: we build it, we measure it, we tune it.",
        deliverables: ["Social ads", "Landing pages", "Meeting booking", "Tracking & optimization"],
        image: "place-des-aines",
        href: `${SITE}/sales-funnel`,
      },
    ],
  },

  work: {
    eyebrow: "Selected work",
    heading: "Let our work *do the talking.*",
    intro: "Every project had a number to hit. Open a case to see which one, and what became of it.",
    filterLabel: "Filter by industry",
    all: "All",
    seeAll: "See all 21 projects",
    growthCover: { videos: "5 videos", title: ["From ad", "to booked meeting."] },
    sectors: {
      "Finance & Juridique": "Finance & Legal",
      Service: "Services",
      Automobile: "Automotive",
      ONG: "NGO",
      "Education & Formation": "Education & Training",
      "Immobilier & Archi": "Real Estate & Architecture",
      Musique: "Music",
    },
    disciplines: {
      "Image de marque": "Branding",
      "Design UI/UX": "UI/UX Design",
      "Développement Web": "Web Development",
      "Publicités vidéo": "Video ads",
    },
  },

  convictions: {
    eyebrow: "Convictions",
    heading: "Three convictions that *change the outcome.*",
    items: [
      {
        title: "If you can think it, we can build it",
        text: "Staying at the edge of the technology is part of the job. We work with proven frameworks, proprietary and open-source tools, and sovereign AI models. No idea dies in a meeting.",
      },
      {
        title: "The tool follows the need, never the other way around",
        text: "We work with Webflow, Figma, n8n, Notion, HubSpot, Twenty, Granola, Finsweet and others. We don't pick one tool and then force your problem into it.",
      },
      {
        title: "Understand before you design",
        text: "Before a single line of code: research, strategy, design system. A project that starts with development ends in fixes. A project that starts with understanding ends in a launch.",
      },
    ],
    build: {
      prompt: "Your idea",
      ideas: ["A custom client portal", "An AI agent that qualifies your leads", "An online training platform"],
      stack: ["Proven frameworks", "Open-source", "Proprietary tools", "Sovereign AI"],
      status: "Buildable",
      quote: "No idea dies in a meeting.",
    },
    tools: {
      label: "Your need",
      needs: [
        { label: "Showcase site", tools: ["Webflow", "Figma", "Finsweet"] },
        { label: "Automation", tools: ["n8n", "Notion", "Granola"] },
        { label: "CRM & sales", tools: ["HubSpot", "Twenty", "n8n"] },
      ],
      note: "We pick the tool once we understand the need.",
    },
    understand: {
      bad: { label: "Start with code", steps: ["Code", "Bug", "Fix", "Bug"], end: "Fixes" },
      good: { label: "Start with understanding", steps: ["Research", "Strategy", "Design system", "Code"], end: "Launch" },
    },
    disciplines: ["Branding", "Product", "Development", "UX Design", "Growth", "Marketing"],
  },

  process: {
    eyebrow: "Process",
    heading: "From idea to launch in *five weeks.*",
    intro:
      "A timeline set on day one, a single point of contact, and a demo every Friday. You always know where your project stands.",
    week: "Week",
    steps: [
      {
        week: "Week 1",
        title: "Project framework",
        text: "Your market, your users, your goals, your stack. Before anything is designed or built, we align on scope, timeline and success criteria.",
      },
      {
        week: "Week 2",
        title: "Research & strategy",
        text: "Competitor analysis, user research, positioning, SEO architecture and AI visibility: what to build, and why it will work.",
      },
      {
        week: "Week 3",
        title: "Branding & visual identity",
        text: "Logo, visual system, design language, brand voice. An identity that earns trust before a word is read.",
      },
      {
        week: "Week 4",
        title: "UX/UI design",
        text: "Every screen is designed in Figma before a line of code is written: journeys, design system, interactions and edge cases.",
      },
      {
        week: "Week 5",
        title: "Development & testing",
        text: "Browsers, devices, speed, forms, CMS: nothing leaves our hands without a full round of QA.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Client reviews",
    heading: "What they say *after* launch.",
    verified: "verified reviews",
    pause: "Hover to pause",
  },

  brief: {
    eyebrow: "Your project",
    heading: "Build your brief *in 20 seconds.*",
    needs: { title: "What do you need?", hint: "Pick as many as you like" },
    goal: { title: "What's your main goal?", label: "Goal" },
    timing: { title: "When do you want to launch?", label: "Launch" },
    goals: ["Launch a new brand", "Redesign my website", "Generate more leads", "Automate my operations"],
    timings: ["As soon as possible", "In 1 to 3 months", "Just exploring"],
    estimates: {
      full: { value: "60 to 90 days", note: "Complete system: website, funnel and AI agents." },
      site: { value: "3 to 6 weeks", note: "Typical timeline for a showcase website." },
      custom: { value: "Custom", note: "We'll scope the timeline on the call." },
    },
    card: "TechFlow brief",
    live: "Updated live",
    estimate: "Estimated timeline",
    empty: "Select at least one service.",
    services: "Services",
    tbd: "To be defined",
    start: { label: "Kick-off", value: "Within 2 weeks" },
    book: "Book the call ↗",
    copy: "Copy brief",
    copied: "Brief copied ✓",
    note: "Paste your brief when booking: we'll show up to the call having already thought it through.",
    colon: ": ",
  },

  faq: {
    eyebrow: "FAQ",
    heading: "What people ask us *before signing.*",
    items: [
      {
        q: "How much does it cost?",
        a: "Every system is custom-scoped. The free audit lets us quantify your needs precisely, and you get a firm budget before any engagement.",
      },
      {
        q: "How long does it take?",
        a: "Most of our projects start within two weeks. A showcase site ships in 3 to 6 weeks, a complete system (site + funnel + AI agents) in 60 to 90 days.",
      },
      {
        q: "Can we start small?",
        a: "Yes. Our offers are modular: we start where the impact comes fastest, then widen the scope at the pace of your results.",
      },
      {
        q: "What happens after launch?",
        a: "We don't disappear: maintenance, continuous improvement and metrics tracking are part of our support subscriptions.",
      },
      {
        q: "How do we get started?",
        a: "With a 30-minute call, free and with no commitment. We look at what you need and you leave with a concrete action plan, whether we end up working together or not.",
      },
    ],
  },

  footer: {
    status: "Open for new projects",
    heading: "Let's talk about *your project.*",
    text: "Thirty minutes with the team that will build your project, not a salesperson. You leave with a scope, a timeline and a ballpark budget.",
    cursor: "Book",
    book: ["Book", "a call ↗"],
    tagline: "Startup studio: design, development and AI agents for companies that want to move fast.",
    columns: { services: "Services", agency: "Agency", follow: "Follow us" },
    agency: { projects: "Projects", team: "Our team", insights: "Insights", contact: "Contact" },
    legal: "Legal notices",
    terms: "Terms of service",
    top: "Back to top ↑",
  },
};
