# SEO

How SEO works on techflow-agency.com since the move off Webflow (2026-10-02), what was checked, and what is left to do by hand.

## How it works

**Where SEO is edited (Sanity Studio)**

| What | Where in the Studio |
|---|---|
| Case studies, growth case studies, tools, articles | the document's **SEO** tab |
| Home, services, listings, contact, legal pages | **Page SEO** → page → French / English document (create it from the folder; empty = the copy in code) |
| Site name, title template, default descriptions, default share image, organization (offices, profiles), Search Console code, GA4 ID | **Site settings** (top of the sidebar) |
| Old URL → new URL | **Redirects** |

The SEO tab: meta title (counter, warning above 60), meta description (counter, warning outside 120–160), "same as meta" switch for the social title/description, share image (1200 × 630, cropped around the hotspot), canonical override, **Hide from Google (noindex)** with a red warning, nofollow, and a Google result preview. Changing the slug of a published page shows a warning asking for a redirect.

**Fallbacks (`src/sanity/seo.ts`, `buildMetadata`)**: every value comes from the SEO tab, else the page content, else Site settings, so no page ships without a title, description or share image.

| | 1. SEO tab | 2. Page content | 3. Default |
|---|---|---|---|
| Title | meta title | case study: "<name> : étude de cas" / "<name> case study"; growth: "… étude de cas growth marketing"; tool: "Pourquoi nous utilisons <tool>" / "Why we use <tool>"; article: its title; coded pages: copy in code | — |
| Description | meta description | summary / excerpt / intro; coded pages: copy in code | Site settings default (FR / EN) |
| Share image | share image | case study card image; growth key visual, else first ad poster; article cover | Site settings default image, else `public/images/og-default.jpg` |

The title template (`%s | TechFlow`) is added unless the title already contains "TechFlow" or the result would pass 60 characters.

**Every page outputs**: `<title>`, description, absolute self-referencing canonical (https, www, no trailing slash, no query) or the override, hreflang FR / EN / x-default (CMS pages: only languages that exist), Open Graph (type, url, site name, locale, title, description, 1200 × 630 image) and Twitter `summary_large_image`, `robots` only when noindex / nofollow is set. `<html lang>` follows the locale.

**Structured data (`src/components/seo/json-ld.tsx`)**: home: Organization + one ProfessionalService per office + WebSite (from Site settings); every inner page: BreadcrumbList (`PageShell`); website case studies: CreativeWork; growth case studies: CreativeWork with a VideoObject per uploaded ad; articles: Article (author = team member, else the agency).

**Sitemap (`src/app/sitemap.ts`)**: every coded page and every published case study, tool and article, in both languages, with hreflang alternates and `lastModified` from Sanity. Leaves out noindex pages, pages with a canonical elsewhere and redirect sources. Regenerated at most once a minute (same 60 s cache as the pages), so publishing is enough.

**robots.txt (`src/app/robots.ts`)**: production (`VERCEL_ENV=production`, or `SITE_ENV=production` outside Vercel) allows everything except `/api/` and `/studio`, and points to the sitemap. Every other build (Vercel previews, branches, local) disallows everything and sends `X-Robots-Tag: noindex, nofollow` (`next.config.ts`). Both are decided at build time.

**Redirects**: Studio redirects are read by `next.config.ts` at build time (a failed fetch fails the build instead of shipping without them), so a new redirect goes live on the next deployment — wire the publish webhook below to make that automatic. Next answers permanent redirects with **308**, which Google treats as a 301. `/fr/...` → 308 to the root. A case study / tool / article URL in the wrong language → 308 to its translation, or a temporary redirect to the original when no translation exists. Apex → www and http → https are done by the domain setup (Cloudflare / Vercel), not the app.

**Analytics**: not loaded yet (decision 2026-10-02). The GA4 ID (`G-D60Y7LH1L8`, the live site's) is stored in Site settings; analytics go live together with a cookie banner (Consent Mode v2).

## Redirect map (old Webflow URL → new URL)

The new site keeps Webflow's URL scheme (French at the root, English under `/en/` with translated slugs), so 134 of the 137 URLs in the old sitemap are unchanged and answer 200.

| Old URL | New URL | Status |
|---|---|---|
| `/search` | `/nos-insights` | 308, in Sanity |
| `/projets/epargne-plurielle`, `/en/projects/epargne-plurielle` | `…/epargne-plurielle-avenir` | 308, in Sanity |
| `/projets/district-6`, `/en/projects/district-6` | `…/district-6-publishing` | 308, in Sanity |
| `/politique-de-confidentialite`, `/en/privacy-policy` | — | **404: the new site has no privacy policy yet** (port the page or add a redirect) |

All other old URLs (home, services, 23 + 23 case studies, 24 + 24 tools, 20 articles, team, contact, legal pages) exist at the same path. English Kretz Club and three English articles (`startup-cambodia`, `tiktok-marketing-cambodia`, `real-estate-website-cambodia`) were missing from Sanity and were imported on 2026-10-02.

## Verification (2026-10-02, production build with `SITE_ENV=production`)

- [x] Sitemap: 139 URLs, all 200, no redirects, both languages.
- [x] Every page has a title, description, canonical equal to its own sitemap URL, og:image and valid JSON-LD.
- [x] hreflang on every page matches the sitemap and every target is itself in the sitemap (reciprocal).
- [x] No `noindex` on any indexable page; 404 pages return a real 404 with `noindex`.
- [x] robots.txt: production allows + sitemap; non-production build disallows all and sends `X-Robots-Tag`.
- [x] Old Webflow URLs: 134 × 200, 1 × 308 (`/search`), 2 × 404 (privacy policy, see above). No chains.
- [ ] Titles over 60 characters (written titles, edit in the Studio): `/services` (68), `/en/services` (64), `/projets/gato-tower` (69), `/en/projects/gato-tower` (62), `/nos-insights/creation-site-internet-design-agence` (71), `/nos-insights/agence-webflow-pme` (71).
- [ ] Descriptions outside 120–160: `/en/projects/concorde` (205), `/nos-insights/agence-webflow-pme` (188), `/projets/greenpatina` (45).
- [ ] `/contact` and `/en/contact` share the title "Contact | TechFlow Agency" (different languages, acceptable).
- [ ] Rich Results Test, OG previews (LinkedIn Post Inspector, Facebook debugger), Lighthouse SEO and GA4 DebugView need the deployed site.

## Manual steps

1. **Deploy the Studio** (`pnpm deploy` in `techflow-cms/studio`) so editors get the SEO tabs, Page SEO, Site settings and Redirects.
2. **Redirects go live on publish**: in Vercel → Project → Settings → Git → Deploy Hooks, create a hook for `main`. In sanity.io/manage → project `ce31dig5` → API → Webhooks, add a webhook: URL = the deploy hook, dataset `production`, trigger on create / update / delete, filter `_type == "redirect"`, HTTP method POST, no projection.
3. **Domain**: keep `www.techflow-agency.com` as the primary domain and the apex `techflow-agency.com` redirecting to it (today Cloudflare does a 301). Check that `*.vercel.app` production URLs aren't linked anywhere (they are canonicalised to www anyway).
4. **Search Console**: the live Webflow site carries a Search Console HTML-tag code; it is stored in Site settings and the new site outputs the same tag, so if the property was verified that way it stays verified after the switch. Safer: also verify a **Domain** property by DNS (TXT record at Cloudflare), which doesn't depend on the site. After launch: Sitemaps → submit `https://www.techflow-agency.com/sitemap.xml`; URL Inspection → request indexing for the home, /projets and the service pages; watch Pages → "Not found (404)" and "Page with redirect" for a few weeks.
5. **GA4** (when the cookie banner is built): the existing property `G-D60Y7LH1L8` keeps its history; in GA4 → Admin → Data streams check the stream URL is `https://www.techflow-agency.com`, mark `generate_lead` / `contact_click` events as key events once they exist.
6. **After launch**: run the Rich Results Test on the home, a case study and an article; paste a case study URL into LinkedIn Post Inspector to check the share card.
