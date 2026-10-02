# Insights inventory: Webflow → Sanity

Generated 2026-10-02, read-only. Full data: `insights.json` in the session scratchpad
(`/private/tmp/claude-501/-Users-maximiliengrolier-Downloads/9be81e3f-30fc-44f1-856c-cca885fc4b92/scratchpad/webflow/insights.json`, 1.1 MB):
`inventory` (every item) and `missing_from_sanity` (every field of each missing item, incl. body HTML, cover URL + alt, SEO, JSON-LD, references resolved to names, plus `rawFieldData`). Copy it next to this file if it must outlive the session.

## Sources

- Webflow site `6a43440db30c6196833d905c` ("Techflow Agency", shortName `techflow-agency-staging`): this is the project that serves www.techflow-agency.com today (published 2026-10-01). The older "Techflow Agency" project `65c99f0ab7af1e666d507b10` (maximilien-grolier.webflow.io) is no longer on the domain.
- No Webflow Localization and no Weglot any more: FR and EN are **separate collections** (`FR - Insight blogs` → `/nos-insights/<slug>`, `EN - Insight blog` → `/en/our-insights/<slug>`). There is no translation link field between them.
- Sanity `ce31dig5/production`, public API (published documents only; the CLI account has no project access, so Sanity drafts could not be checked).

## Counts

| | FR | EN | Total |
|---|---|---|---|
| Webflow published | 2 | 16 | 18 |
| … in Sanity | 2 | 16 | 18 |
| Webflow drafts | 0 | 22 | 22 |
| … in Sanity | 0 | 0 | 0 |
| Archived | 0 | 0 | 0 |

Every published article is in Sanity (all matched by `sourceUrl`, same slug, same language). The 22 missing items are all **English drafts** (never published, 404 on the live site), written 28–29 Sept 2026 for the Cambodia SEO plan. Only one FR↔EN pair exists in Sanity's translation metadata: `agence-webflow-pme` ↔ `webflow-agency-sme`; `creation-site-internet-design-agence` has no EN version and the 15 other EN articles have no FR version.

## Published (in Sanity)

| Lang | Slug | Name | Webflow | Publish date | Last published | Author | Categories | Sanity `insight` |
|---|---|---|---|---|---|---|---|---|
| fr | `creation-site-internet-design-agence` | Création site internet design : ce que change un vrai travail de design | published | 2026-08-12 | 2026-09-29 | TechFlow Agency | Design & UX, Performance du Site Web, Optimisation SEO | `1QxqbJjMgZAX0gBlijJZee` (fr, by sourceUrl) |
| fr | `agence-webflow-pme` | Agence Webflow : comment nous utilisons Webflow pour les projets de PME | published | 2026-08-03 | 2026-09-29 | TechFlow Agency | Optimisation SEO, Marketing Numérique | `4MHmDNQGveuCiBWCdvee6z` (fr, by sourceUrl) |
| en | `tiktok-marketing-cambodia` | TikTok Marketing in Cambodia Needs a Funnel, Not Just Views | published | 2026-09-29 | 2026-09-29 | Maximilien Grolier | Digital Marketing, Content Strategy | `fRYqy7Dy1LWxaVLh0d0iI7` (en, by sourceUrl) |
| en | `startup-cambodia` | Cambodia's Startups Need Fewer Incubators, More First Customers | published | 2026-09-29 | 2026-09-29 | Maximilien Grolier | Data & Analytics | `fRYqy7Dy1LWxaVLh0d0Xx5` (en, by sourceUrl) |
| en | `real-estate-website-cambodia` | A Real Estate Website in Cambodia Should Win on Speed, Not Listings | published | 2026-09-29 | 2026-09-29 | Maximilien Grolier | Web Development | `MkzIlesDIMzd9qSpNGrqnR` (en, by sourceUrl) |
| en | `marketing-agency-phnom-penh` | The first 90 days with a marketing agency in Phnom Penh | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | Digital Marketing, Data & Analytics | `zovbuME2MGn3iTJLX8Wp5S` (en, by sourceUrl) |
| en | `marketing-agency-cambodia` | Most marketing agencies in Cambodia fix the wrong bottleneck | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | Digital Marketing, Design & UX | `Fss6dC8zzIQxAwKr7yhuen` (en, by sourceUrl) |
| en | `digital-marketing-cambodia` | Digital marketing in Cambodia in 2026 is won in the inbox, not the feed | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | Digital Marketing, Content Strategy | `y2BPbbsTMQFoyqGZY52PY1` (en, by sourceUrl) |
| en | `digital-marketing-agency-cambodia` | What a digital marketing agency in Cambodia really costs after tax | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | Digital Marketing | `Fss6dC8zzIQxAwKr7yhwov` (en, by sourceUrl) |
| en | `digital-agency-phnom-penh` | Why one Phnom Penh digital agency beats three specialists (usually) | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | Digital Marketing, Web Development, Design & UX | `1mcCfYOdWJ0xbaq3I0P1EI` (en, by sourceUrl) |
| en | `ai-development-phnom-penh` | What 4 weeks of AI development in Phnom Penh looks like, week by week | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | AI & Automation, Web Development | `Fss6dC8zzIQxAwKr7yhy9E` (en, by sourceUrl) |
| en | `ai-development-cambodia` | The Khmer token tax and what AI development in Cambodia really costs | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | AI & Automation, Data & Analytics | `v6tJJUsu3zMScIBSZEQPFu` (en, by sourceUrl) |
| en | `ai-consulting-cambodia` | Before you buy AI in Cambodia, run a 4-criteria consulting audit | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | AI & Automation, Data & Analytics | `Fss6dC8zzIQxAwKr7yi1IK` (en, by sourceUrl) |
| en | `ai-agents-for-small-business` | What AI agents do for a small business, and what they cost to run | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | AI & Automation | `Fss6dC8zzIQxAwKr7yi4XW` (en, by sourceUrl) |
| en | `ai-agency-phnom-penh` | Four things an AI agency in Phnom Penh should hand you | published | 2026-09-24 | 2026-09-29 | Maximilien Grolier | AI & Automation | `btFZuK3b2r8NqtWiJ2wTXe` (en, by sourceUrl) |
| en | `webflow-agency-sme` | Webflow agency: how we use Webflow on SME projects | published | 2026-08-26 | 2026-09-29 | TechFlow Agency | SEO, Digital Marketing | `1QxqbJjMgZAX0gBlijJhPQ` (en, by sourceUrl) |
| en | `web-development-cambodia` | Web development Cambodia: Webflow, no-code and custom builds compared | published | 2026-08-26 | 2026-09-29 | TechFlow Agency | Website Performance, Digital Marketing | `Xya3jTKHCP93Ds7aHdhsOc` (en, by sourceUrl) |
| en | `web-design-cambodia` | Web design Cambodia: what it costs, how to pick an agency, how long it takes | published | 2026-08-06 | 2026-09-29 | TechFlow Agency | Design & UX, Digital Marketing | `5sC3V5hMI9ClRsA2QOGxtr` (en, by sourceUrl) |

## Drafts (missing from Sanity)

| Lang | Slug | Name | Webflow | Publish date | Last published | Author | Categories | Sanity `insight` |
|---|---|---|---|---|---|---|---|---|
| en | `hotel-website-design-cambodia` | Hotel Website Design in Cambodia Still Skips the Booking Engine | draft | 2026-09-29 |  | Maximilien Grolier | Web Development, Design & UX | **missing** |
| en | `ai-for-hotels` | AI for Hotels in Cambodia Means Messaging First, Revenue Tools Second | draft | 2026-09-29 |  | Maximilien Grolier | AI & Automation | **missing** |
| en | `ngo-website-design-cambodia` | NGO Website Design in Cambodia Needs a Different Brief | draft | 2026-09-29 |  | Maximilien Grolier | Web Development | **missing** |
| en | `khqr-payment-website` | What a KHQR Payment Website Really Costs to Build | draft | 2026-09-29 |  | Maximilien Grolier | E-commerce, Web Development | **missing** |
| en | `bakong-cambodia` | Bakong Payments Now Move More Than Four Times Cambodia's GDP | draft | 2026-09-29 |  | Khemra Bonamy | E-commerce, Web Development | **missing** |
| en | `ecommerce-cambodia` | Most Sellers in Cambodia's Ecommerce Market Should Not Build a Website | draft | 2026-09-29 |  | Maximilien Grolier | E-commerce, Web Development | **missing** |
| en | `n8n-vs-zapier-vs-make` | n8n, Zapier or Make? What Actually Decides for a Cambodian SME | draft | 2026-09-29 |  | Khemra Bonamy | AI & Automation | **missing** |
| en | `ai-chatbot-telegram` | Telegram Beats Messenger for Cambodia's First AI Chatbot | draft | 2026-09-29 |  | Wichheca Hin | AI & Automation | **missing** |
| en | `khmer-text-to-speech` | Why Google Can't Turn Khmer Text Into Speech, and What Actually Can | draft | 2026-09-29 |  | Wichheca Hin | AI & Automation | **missing** |
| en | `website-redesign-cambodia` | Skip the Audit, Lose the Rankings on Your Cambodia Website Redesign | draft | 2026-09-28 |  | Maximilien Grolier | Web Development, SEO | **missing** |
| en | `no-code-development-cambodia` | No-Code Development Skips Cambodia's Developer Shortage | draft | 2026-09-28 |  | Maximilien Grolier | Web Development | **missing** |
| en | `webflow-vs-wordpress` | WordPress Costs More Than Webflow Once You Count What Breaks | draft | 2026-09-28 |  | Maximilien Grolier | Web Development | **missing** |
| en | `web-design-siem-reap` | Web Design in Siem Reap, Built for Hotels, Tours and Restaurants | draft | 2026-09-28 |  | Wichheca Hin | Web Development, Design & UX | **missing** |
| en | `webflow-agency-southeast-asia` | Southeast Asia Webflow Agencies Cost More Than a Team in Phnom Penh | draft | 2026-09-28 |  | Khemra Bonamy | Web Development | **missing** |
| en | `software-development-company-cambodia` | A Software Development Company in Cambodia Should Ship More Than Code | draft | 2026-09-28 |  | Maximilien Grolier | Web Development | **missing** |
| en | `web-development-company-phnom-penh` | What to Ask Before You Hire a Web Development Company in Phnom Penh | draft | 2026-09-28 |  | Maximilien Grolier | Web Development | **missing** |
| en | `khmer-fonts-for-website` | Most Cambodian Websites Still Get Khmer Fonts Wrong | draft | 2026-09-28 |  | Maximilien Grolier | Design & UX | **missing** |
| en | `logo-design-cost-cambodia` | What Logo Design Really Costs in Cambodia, Once You Test It in Khmer | draft | 2026-09-28 |  | Khemra Bonamy | Design & UX | **missing** |
| en | `creative-agency-phnom-penh` | Why Phnom Penh Founders Are Ditching Freelancers for a Creative Agency | draft | 2026-09-28 |  | Wichheca Hin | Design & UX | **missing** |
| en | `branding-agency-phnom-penh` | A Branding Agency in Phnom Penh Should Give You More Than a Logo File | draft | 2026-09-28 |  | Wichheca Hin | Design & UX | **missing** |
| en | `cambodia-tourism-ai-digital-push` | Cambodia's digital transformation push lands as tourism arrivals fall | draft | 2026-09-28 |  | Maximilien Grolier | AI & Automation | **missing** |
| en | `cambodia-digital-invoicing-public-services` | Cambodia just split digital invoicing into two systems, not one | draft | 2026-09-28 |  | Khemra Bonamy | Web Development | **missing** |

## Field mapping (Webflow → Sanity `insight`)

How `techflow-cms/studio/scripts/import-live.ts` builds an insight (`extractInsight`): it **scrapes the live HTML page**, not the Webflow CMS API, so it can never import drafts. To import the 22 drafts, either publish them on Webflow first and run `pnpm import:live -- --only=insight --lang=en`, or write a small importer from `insights.json` using the mapping below.

| Webflow field (EN slug / FR slug) | Sanity `insight` field | How import-live fills it today | Notes for a CMS-API import |
|---|---|---|---|
| `name` | `title` | `h1` of the header | same |
| `slug` | `slug.current` | last path segment | same |
| — | `language` | `fr` / `en` from the path | `en` for all 22 drafts |
| — | `sourceUrl` | `https://www.techflow-agency.com` + path | set `https://www.techflow-agency.com/en/our-insights/<slug>` so a later `import:live` matches (upsert key) |
| `description` | `excerpt` | header paragraph | also the meta description on Webflow |
| `published-date` | `publishedAt` (date) | parsed from the visible date | **all 16 EN docs in Sanity have `publishedAt` = null** (the EN date format was not parsed); the 2 FR docs are fine. Backfill from `insights.json` → `inventory[].publishedDate` |
| `written-by` (plain text) | `author` (reference → `teamMember`) | name looked up/created in `teamMember`; "TechFlow Agency" → empty | **"Khemra Bonamy" (5 drafts) has no `teamMember`**; Maximilien Grolier and Wichheca Hin exist |
| `blog-image` {url, alt} | `coverImage` (`imageWithAlt`: asset + `alt`) | uploads the `<img>` from the header | URL + alt in `fields.coverImage` |
| `blog-content` (RichText HTML) | `body` (`blockContent`) | `richText()` HTML → Portable Text, images re-uploaded | HTML in `fields.bodyHtml`; 66 inline images across the 22 drafts (`fields.inlineImages`), all on cdn.prod.website-files.com |
| `seo-title` | `seo.title` | `<title>` (dropped when equal to the title or bare brand) | in `fields.seo.title` |
| `description` | `seo.description` | `<meta name="description">` | Webflow has no separate meta description field for insights: the template uses `description` |
| `categories` (EN, → EN - Categories) / `tags` (→ Tags blogs, FR names) | `topics` (references → `category`, same language) | **not imported** (`topics` is Studio-only, kept on re-import) | pick by hand. EN drafts use Webflow categories *E-commerce*, *SEO*, *Web Development*, *AI & Automation*, *Design & UX*; Sanity EN categories are named *SEO Optimization*, *Data Analysis* (Webflow: *Data & Analytics*) and there is **no E-commerce category** in Sanity (FR or EN), but an EN category named **"testing"** |
| `reading-time` | — (computed on the page) | — | not stored |
| `json-ld` | — (generated by the site) | — | kept in JSON for reference |
| `primary-keyword`, `cluster`, `funnel-stage`, `home-priority` | — | — | SEO-plan metadata; no Sanity field |
| `link`, `linkedin-link` / `linkin-link`, `x-link`, `facebook-link` | — | — | all empty on the drafts |
| `recommended-blogs` (FR only) | — (`related` is computed) | — | — |

## Other findings

- EN items reference **both** `categories` (EN - Categories) and `tags` (Tags blogs, French names): the EN list in the table shows `categories`.
- `real-estate-website-cambodia`, `startup-cambodia`, `tiktok-marketing-cambodia` have no `topics` in Sanity.
- Webflow's `/en-categories/<slug>` and `/tool-categories/<slug>` template pages are enabled but return 404 on the live site, and FR has no category pages: nothing to redirect.
- No duplicate slugs and no items without a slug, in either language.
