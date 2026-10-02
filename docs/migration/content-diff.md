# Content diff: Webflow (live) vs Next.js + Sanity (staging)

- Old: https://www.techflow-agency.com (FR at root, EN under `/en`)
- New: https://techflow-redesign-git-staging-techflows-agency-projects.vercel.app (branch `staging`)
- Date: 2026-10-02. Read-only comparison: both sites fetched with `curl -L` (server HTML, no JS executed). Nav, footer, scripts and styles stripped, then headings, text blocks, CTAs, forms, media and `<head>` SEO tags compared.
- Scope: the 15 static pages × FR/EN, plus a sample of CMS pages (3 case studies, 2 tools, 2 articles per language).

Caveat: the new site animates its counters, so stats render as `0` in server HTML until JS runs. Numbers below come from `src/i18n/*.ts` and the components, not from the raw HTML.

---

## Content lost in the migration (to review first)

1. **The contact form no longer submits anything.** The old Webflow form (first name, last name, email, message, T&C/privacy consent checkbox, Turnstile anti-spam) posted to Webflow Forms. The new "brief" form only opens the visitor's mail client through `mailto:` (`src/components/contact/contact-page.tsx`). Nothing is stored, there is no notification, and visitors without a mail client get nothing. The consent checkbox and the success/error messages are gone too. The `budget` state exists in the component but no budget field is rendered.
2. **Google Analytics is gone.** The old site loads GA4 `G-D60Y7LH1L8` on every page. The new site has no analytics tag at all (GA, GTM, Vercel Analytics: none found in the HTML or in `src/`).
3. **The "Et ensuite ? / What happens next" 5-step section was removed** from all four service pages (call → mini design sprint or AI/growth audit → co-built proposal → first payment → kick-off). The copy still exists (`t.common.nextSteps`) and the `NextSteps` component is still in `src/components/page/ui.tsx`, but no page renders it. The AI and sales-funnel pages also had their own step-2 wording ("Audit des opportunités IA", "Audit de croissance").
4. **Some service-page stats were dropped.**
   - Design: "8 sec. pour qu'un visiteur se fasse une opinion".
   - Development: "40+ clients satisfaits", "90 % score Google PageSpeed", "30 jours pour obtenir votre MVP".
   - AI agents: "Jour 1 premiers gains", "×3 capacité de traitement", "0 dépendance à un modèle".
   - Sales funnel: "+140 % volume de leads", "−60 % tâches manuelles", "40+ clients satisfaits".

   Other stats replace them (see the per-page tables).
5. **The Motion Design service block is gone from the Design page** (tags: Reels & TikTok, Vidéos de marque, Animations). Motion design is still listed as a deliverable on home and `/services`. On the old site this block carried the MVP/POC text by mistake.
6. **Two home sections were moved or dropped.**
   - "La boîte à outils TechFlow" (11 tool logos plus intro) is no longer on home. A longer 18-tool version now lives on `/services`.
   - The home FAQ intro ("Trouvez rapidement une réponse…") and the closing block "On commence quand ? Trente minutes avec l'équipe qui construira votre projet, pas avec un commercial…" are gone.
7. **The footer lost its 18 tool links** (`/outils/brevo` … `/outils/zapier`, FR and EN), which gave internal links to every tool page. The new footer links only to the `/outils` listing.
8. **Home JSON-LD lost its rich-result data**: 4 × `Service` and a `FAQPage`. New home JSON-LD only has `Organization`, `ProfessionalService` ×2 and `WebSite`. Service pages have `BreadcrumbList` only.
9. **Some named claims are gone.**
   - The sales-funnel case studies no longer name the offers ("Lead Engine", "Sales Engine", "AI OS").
   - The CTA line "Nos clients lancent 40 % plus vite et constatent une croissance mesurable dès le premier trimestre" no longer appears on any page. It is still in `fr.ts` under `common.cta.text`, unused.
   - The tools listing and the insights intro lost their TechFlow-voice taglines.
10. **The tools listing is no longer grouped by category.** The old listing had 7 headings (Design graphique, No Code, Web design, Productivité & Finance, CRM & Marketing, Automatisation, IA), each tool with a one-line "why we use it". The new listing is a flat "Tous les outils" grid with generic product descriptions. The "why we use it" lines are still on each tool's detail page.

### Legal and accuracy issues (copied over or introduced)

- **Cookie and privacy policies (FR and EN) are still placeholders.**
  - Their body is a copy of the legal notice.
  - The old site showed a **"BROUILLON / DRAFT — not yet in force"** banner on these pages. The new site **removed that banner**, so placeholder text now reads as a final policy.
  - These pages still contain the old typo "229 160 ROBINSON ROAD".
  - The EN versions still name the former entity "**Avia Creative Solutions**".
- **Every legal page still says the site is hosted by "Webflow, Inc." and "uses Webflow technology"**: mentions légales, CGU/ToS, cookie and privacy policies, FR and EN. After go-live the host is Vercel.
- **The EN legal notice and EN Terms changed legal entity** from "Avia Creative Solutions, 229 rue Saint-Honoré, Paris" to "Techflow Agency PTE LTD, Singapore". This is probably right, but it needs owner and legal sign-off.
- **New claims that appear nowhere on the old site:**
  - "3 mois de support inclus après chaque mise en ligne" (contact page)
  - "★★★★★ 22 avis vérifiés" (old: "35+ Témoignages"; 22 is the real count of 19 text + 3 video reviews)
  - "35 % moins cher" (old: dev, AI and funnel pages only; now also on design, team and every tool page)
  - Lighthouse "98 / 100 / 100 / 100"
  - "devis… calendrier de 4 à 12 semaines"
  - "Singapore" on the office map

---

## Site-wide (all static pages)

| | Old (Webflow) | New (Next.js) |
|---|---|---|
| hreflang | none | fr / en / x-default on every page |
| og:image | none | Sanity 1200×630 image on every page |
| Canonical | self | self (identical URLs) |
| JSON-LD | Home: Organization, ProfessionalService ×2, WebSite, Service ×4, FAQPage | Home: Organization, ProfessionalService ×2, WebSite. Other pages: BreadcrumbList |
| Analytics | GA4 `G-D60Y7LH1L8` | none |
| google-site-verification | present | present (same token) |
| Booking link | calendly.com/maximilien-grolier-1/30min | same |
| Email / phones / addresses | Paris and Phnom Penh phones and addresses on contact | same, plus `maximilien@techflow-agency.com` shown on contact and legal pages |
| Footer CTA | "Un projet en tête ? TechFlow transforme les idées en résultats. Nos clients lancent 40 % plus vite…" | "Un projet en tête ? Trente minutes pour cadrer votre projet : périmètre, stack, délais, budget indicatif…" plus "Demander un devis" and "Parler à un humain" |
| Footer links | Services, À propos (Projets, Ressources, Contact), 18 tool pages, legal (no privacy link) | Services plus "Voir tous les services", Agence (Projets, Outils, Équipe, Ressources, Contact), socials, legal **with** privacy link |
| Nav | Services (4 with descriptions), Projets, Équipe, Ressources, Contact | adds the `/services` hub; "Réserver un appel" button |
| Placeholder content | "Investissez dans votre flow" pricing (Lorem ipsum, "0 000,00 $"), fake testimonial "Jordan Mitchell, Velocity Labs", "Certifications" Lorem ipsum, French tags on EN pages | all removed (good) |
| Webflow utility pages | `/search`, `/401`, `/404` | not migrated (by design) |

---

## Home (`/`, `/en`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| "Par où commence votre croissance ?" (4 service cards with 1-line pitch) | "Quatre expertises, une seule équipe." (tagline, pitch and 4 deliverables per service) | H1 unchanged ("We design. We build. You grow."). It is now an `sr-only` copy plus an animated `aria-hidden` copy |
| "La boîte à outils TechFlow" (11 logos plus 2 lines of intro) | "Secteurs" with tags and client references per sector plus a "Votre secteur ?" card | Hero sub: "Nous développons des produits web…" → "Nous livrons en *cinq semaines* les produits web…" |
| "Un process simple pour un impact maximal" intro paragraph; long step texts | "Méthode": "De l'idée au lancement en cinq semaines" (Semaine 1–5 instead of Étape 1–5, shorter texts, "une démo chaque vendredi") | Step 3 title "Image de marque et identité visuelle" → "Image de marque" |
| Discipline marquee (Branding, Product…) | Trust counters: 12 ans / 45+ projets / 35+ clients / 5 sem. (render as 0 without JS) | Sectors heading: "Plusieurs secteurs, une même exigence" → "Des secteurs différents. Une même exigence." |
| "Ils l'ont fait avant vous. Les mots sont d'eux…" | Manifesto broken into 3 "Supprimé" items | Testimonials: "35+ Témoignages" → "★★★★★ 22 avis vérifiés"; same 19 quotes plus 3 Mux videos, author pairing verified identical |
| FAQ intro line; "On commence quand ?" closing block | Interactive "Construisez votre brief en 20 secondes" (needs, goal, timing → estimated delay, copy brief, book call) | Projects grid: 23 cards → 12 cards plus "Voir les 24 projets" (filter shows "Tous 23", inconsistent) |
| JSON-LD Service ×4 and FAQPage | Team strip (10 faces) | Convictions now have small illustrations; same 3 texts |
| "Découvrir notre équipe" button, "+3" | | "Démarrer un projet" → `#brief` (on-page) instead of `/contact` |
| | | FAQ: same 5 Q&A; only the first answer is in server HTML |
| | | Meta description rewritten (FR and EN) |

## Services hub (`/services`, `/en/services`)

New page (the old URL returns 404). Content:
- H1 "Un studio de design web et de développement."
- 4 service cards
- "Du Figma au site en ligne, sous le même toit" (5 steps)
- 18-tool toolbox "L'outil suit le besoin, jamais l'inverse"
- the 5-week method
- testimonials plus 3 videos
- the home FAQ

SEO title: "Services : design web, développement, IA et growth | TechFlow Agency".

## Design (`/design`, `/en/design`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| Stat "8 sec. pour qu'un visiteur se fasse une opinion" | Stat "4–8 sem. pour un projet de design complet" | Title → "Design web, UX/UI et identité de marque"; meta description rewritten |
| Service block "Motion Design" (Reels & TikTok, Vidéos de marque, Animations) | Illustrative Figma mock in hero, plus a "Voyez un design prendre forme" step demo (arborescence → wireframes → Figma → live) | Audience #3 text: the old text was copied from the dev page (ERP/CRM); the new one is "Nouvelle offre, nouveaux marchés…" |
| "Et ensuite ?" 5 steps | Comparison row "Design system réutilisable" plus the "35 % moins cher…" line | Section headings get a final period; "Qui a besoin de branding et d'identité ?" → "Les marques à un tournant." |
| Tag "Design system" under UI mockups | | Service texts shortened (all 5 kept); Rémi Cabrieres quote shortened |
| Final CTA "Un projet en tête ? … 40 % plus vite" | | Case studies: Concorde + Canetta → Concorde + Little Green Spark + Epargne Plurielle Avenir |
| | | FAQ: same 6 Q&A, reordered |
| | | EN H1: "The design that makes…" → "Design that makes…" |

## Development (`/developpement`, `/en/development`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| "40+ clients satisfaits" | Code + Lighthouse mock (98 / 100 / 100 / 100), "Déployé en production" | Title → "Développement web, Webflow et sur mesure"; meta description rewritten |
| Stats "90 % score Google PageSpeed", "30 jours pour obtenir votre MVP" | Before/after slider (Exelmans, Tandem Partners, AMA Campus) and Core Web Vitals targets (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1) | Stats: 55+ projets and "perte SEO" kept; added "3–6 sem. site vitrine", "2–4 mois plateforme/SaaS" |
| "Ce qui se passe ensuite" 5 steps | | 6 service and 6 agile texts shortened (all kept) |
| Placeholder pricing, fake testimonial, Lorem "Certifications" | | Case studies: Concorde + Canetta → OPCO EP + Mandil Avocats + Place des Aînés |
| | | FAQ: same 6, reordered |

## AI agents (`/agents-ia`, `/en/ai-agents`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| Stats "Jour 1 premiers gains", "×3 capacité de traitement", "0 dépendance à un modèle" | n8n-style workflow mock in hero; "Pendant que vous dormez, l'agent travaille" inbox → agent → CRM demo ("128 tâches traitées cette nuit") | Title → "Agents IA et automatisation sur mesure"; meta description rewritten |
| "Ce qui se passe ensuite" 5 steps (with "Audit des opportunités IA") | Stats "24 h compétence IA", "1–4 sem. agent", "5 j plan d'action" | "−32 h par semaine" kept |
| Dedicated closing CTA "L'audit est gratuit. Les gains commencent dès le premier jour." | Comparison row "Infrastructure souveraine" | Section texts shortened (6 services, 6 sectors, 4 steps kept) |
| Placeholder pricing, fake testimonial | | Case studies: Concorde + Canetta → G.A.T.O Tower + LeapMotor + AMA Campus |
| | | EN H1 "AI wired into…" → "AI plugged into…" |
| | | FAQ: same 6, reordered |

## Sales funnel (`/tunnel-de-vente`, `/en/sales-funnel`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| Stats "+140 % volume de leads", "−60 % tâches manuelles", "40+ clients satisfaits" | Ads dashboard mock (Impressions +32 %, CTR +0.9, Leads +48 %, RDV +291 %, Place des Aînés ad); "Chaque clic suivi jusqu'au rendez-vous" funnel (72 % / 64 % / 61 %, labelled illustrative) | Title → "Tunnels de vente et systèmes de croissance"; meta description rewritten |
| Offer names "Lead Engine", "Sales Engine", "AI OS" in the case-study texts | Top stats now reuse case-study numbers: +291 %, ×2 in 60 days, 30 h/week, 90 j | "De zéro à un système qui tourne. En 90 jours." kept with the same 4 phases |
| "Ce qui se passe ensuite" 5 steps (with "Audit de croissance") | | Case studies: Concorde + Canetta → G.A.T.O Tower + Place des Aînés + LeapMotor |
| Placeholder pricing, fake testimonial | | FAQ: same 6, reordered |

## Projects listing (`/projets`, `/en/projects`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| "12+ ans d'expérience" badge | Counters (45+ projets / clients / secteurs / 5 sem.) | H1 "Nos projets" → "Chaque vision devient un produit qui performe."; titles slightly reworded; meta description rewritten |
| 22 case-study cards marked up as H1 (bad SEO) | 2 extra projects: **G.A.T.O Tower** (Growth Marketing) and **GreenPatina** (no sector shown) | Cards are now H3 with the live domain shown |
| | "Et beaucoup d'autres" table (11 clients with sector and scope) | Service links ("Quel service…") now use the new taglines |
| | | Filter now has "Growth Marketing" and counts ("Tous 24") |

## Tools listing (`/outils`, `/en/tools`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| 7 category headings (as H1s) and a category menu | Hero CTAs; "Quel service…" block | H1 "Nous utilisons chaque jour les meilleurs outils…" → "Les bons outils, pour chaque projet."; title rewritten |
| Short TechFlow-voice tagline per tool ("Figma, c'est là où votre vision…") | Claude, Granola and OpenRouter listed (the old "IA" category rendered empty) | Card text = long product description (generic) instead of the tagline |
| Intro "Techflow ne livre pas qu'un site…" | | 23 tools in both |

## Team (`/notre-equipe`, `/en/our-team`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| Comparison intro "Où nous nous situons face aux deux alternatives…" | Live "Point hebdo Paris ⇄ Phnom Penh" mock; "10 membres de l'équipe" stat; clock/map (Paris, Phnom Penh, **Singapore**) | Title → "Notre équipe \| TechFlow Agency"; meta description rewritten |
| (EN) comparison rows "Post-launch support", "Accountability" | "Pourquoi le Cambodge est un avantage ?" now has 3 real points (two time zones, piloté en français, **35 % moins cher**). The old version only repeated the comparison text | Stats 12+ / 45+ / 40+ kept |
| | Tags under the "Comment nous travaillons" cards | Same 10 members. Raphaël Benichou and Sovanrath Soem have no role in the main grid on either site; the new top strip shows "Senior Project Manager" and "Webflow Developer" |
| | | Testimonials: "35+ Témoignages" → "22 avis vérifiés" |

## Insights listing (`/nos-insights`, `/en/our-insights`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| Intro "TechFlow transforme les idées en résultats…" | Featured "Dernier article" with date, read time and author | H1 adds a period; meta description rewritten |
| Empty categories in the filter (E-commerce, Analyse des données…) | Filter shows only categories in use, with counts | EN: 16 articles on both. The featured "latest" article is "Webflow agency…", not the newest by date (TikTok, Startups…). Check the sort |
| | | Some EN cards have no category label ("· 9 min read") |

## Contact (`/contact`, `/en/contact`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| **Webflow form**: Prénom, Nom, E-mail, Message, consent checkbox for CGU and privacy, Turnstile, success/error messages | **mailto brief**: Nom complet*, E-mail pro*, Entreprise, Site actuel, service chips (6), deadline chips (4), Projet*. The submit button opens the mail client ("L'envoi ouvre votre messagerie…") | Title "Contacter TechFlow Agency \| Démarrer un projet" → "Contact \| TechFlow Agency"; meta description no longer promises "sous un jour ouvré" |
| | Founder card with "Réserver 30 min" (Calendly) and the email address | H1 "Contact" → "Envie de construire quelque chose ? Parlons de votre projet." |
| | Promises: 30 min call, "un devis… calendrier de 4 à 12 semaines", "**3 mois de support inclus**" | Offices: same Paris and Phnom Penh addresses and phones, now with `tel:` links and a local-time clock |

## Legal notice (`/mentions-legales`, `/en/legal-notices`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| EN: "Avia Creative Solutions" as owner (several clauses) | Intro line; contact card | Address typo fixed ("229 160 Robinson" → "160 Robinson Road") |
| | | EN fully rewritten to name Techflow Agency PTE LTD |
| | | **Hosting still "Webflow, Inc." and "le site utilise la technologie Webflow"** |
| | | Title EN "Legal Notices" → "Legal Notice"; meta description rewritten |

## Terms (`/conditions-generales`, `/en/terms-of-service`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| "Article N -" numbering in headings | "Exclusions" and "Données collectées" sub-headings | EN: "Avia Creative Solutions / 229 rue Saint-Honoré" → "Techflow Agency PTE LTD / 160 Robinson Road Singapore" |
| | | EN Article 24 "Partial Invalidity" renamed "Severability" (same clause); EN wording polished throughout; FR text otherwise identical |
| | | Hosting article still says Webflow, Inc. |
| | | Meta description rewritten |

## Cookie policy (`/politique-de-cookies`, `/en/cookie-policy`) and privacy policy (`/politique-de-confidentialite`, `/en/privacy-policy`)

| Only on old site | Only on new site | Changed |
|---|---|---|
| **"BROUILLON / DRAFT: not yet in force, placeholder copied from the legal notices"** banner | Intro line ("Les cookies déposés… / Les données personnelles collectées…") that the body does not deliver | Body is still the legal-notice text (11 sections), now presented as final |
| EN privacy: "Contact hello@techflow-agency.com" | | Still contains "229 160 ROBINSON ROAD", Webflow hosting and (EN) "Avia Creative Solutions" |

---

## CMS sample check (content imported from Webflow)

| Page | Title / meta / H1 | Body text | Images | Notes |
|---|---|---|---|---|
| `/projets/mandil-avocats`, `/en/projects/mandil-avocats` | identical | identical | 27 → 29 | Lost the CTA "Envie des mêmes résultats pour votre site ?" |
| `/projets/canetta`, `/en/projects/canetta` | identical | identical | 24 → 26 | same |
| `/projets/kretz-club`, `/en/projects/kretz-club` | identical | identical (about 2,300 words) | 32 → 34 | same |
| `/outils/figma`, `/en/tools/figma` | identical | all reasons kept | n/a | New "related projects" and "rest of the stack" sections; the old 11-logo toolbox was replaced |
| `/outils/n8n`, `/en/tools/n8n` | identical | all 6 reasons kept, now H3 | n/a | New "Projets livrés avec n8n" (Kretz Club) |
| `/nos-insights/agence-webflow-pme` | identical | 100 % of paragraphs present; table kept | 0 → 0 body | New numbered table of contents |
| `/nos-insights/creation-site-internet-design-agence` | identical | 100 % present; table kept | 0 → 0 body | same |
| `/en/our-insights/tiktok-marketing-cambodia` | identical | 100 % present; table kept | 3 → 3 body | New "Written by Maximilien Grolier" byline |
| `/en/our-insights/webflow-agency-sme` | title gains "\| TechFlow" | 100 % present | 0 → 0 body | |

The CMS import is faithful. The only differences are in the page templates: CTAs, related sections and table of contents.
