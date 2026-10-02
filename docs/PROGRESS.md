# Progress

Update at the end of every work session (see CLAUDE.md). Newest first. Link GitHub issues as `#N`.

## In progress
- **Gato Tower growth case study (Sanity `growthCaseStudy`, 2026-10-02):** page built and seeded FR + EN; still needs the real assets and figures: upload the 5 ad videos + posters (+ .vtt subtitles) in the Studio, the social avatar, profile grid images, real results metrics and the client testimonial (all `[TBD]`, hidden on the site until replaced), and real A/B figures (then untick "Illustrative data"). Upload a card image, key visual, client logo and behind-the-scenes photos (Images tab), and pick the tools and team. Check the social handle (`gatotowerofficial`, guessed from the Facebook URL), the ad notes/scripts and the comment replies with the team. Deploy the Studio so editors see the new type.
- **Waiting on push (403 for `kinnizen` on techflow-ag/TechFlow-Redesign):** someone with write access pushes `main`. Project `sectors` and article `topics` (Categories) are filled from the Sanity lists and the site reads only them (2026-10-01). After the push: run `scripts/migrate-taxonomies.ts` (studio) without flags to remove the hidden old text, then delete the hidden `sector` (project.ts) and `categories` (insight.ts) fields.
- **Cookie policy:** the footer link and pages are in (copied from the old site, 2026-10-01), but that text is a draft placeholder from the legal notices; the EN version names "Avia Creative Solutions". Needs the real cookie policy (and a consent banner if analytics are added).
- **To do in Sanity (#2):** tick "Logo has its own background" on Mandil Avocats (FR + EN).
- **Hosting (2026-10-02):** site on Vercel (project `techflow-redesign`, https://techflow-redesign.vercel.app), staging on branch `staging` → staging.techflow-agency.com, Studio on the VPS → cms.techflow-agency.com (deployed by the "Deploy Studio" action). Waiting on: the `cms` and `staging` DNS records (not published at Hostinger yet; `staging` must be a CNAME to Vercel, see CLAUDE.md), the Sanity CORS origin for the Studio, health check PR techflow-ag/techflow-health-check#11 (merge once cms is up).
- **Go-live (www):** needs the Webflow → new URL 301 map (Kimheng), then add `techflow-agency.com` + `www` to the Vercel project and switch DNS. Production change: Max validates first. After: update the health check `http.techflow-blog-en` URL, cancel Webflow.

## Next
- Fill the case-study content the new template relies on: key figures and team (#3). Every imported body already has h2 chapters.
- Decide whether to move the remaining local content (Gato Tower case study, Mux video testimonials, contact/services team members) into Sanity.

## Done
- 2026-10-02 — Hosting set up: Vercel project linked to the repo (prod = `main`, staging = `staging`), staging/previews noindex, stale `package-lock.json` removed (pnpm only), Studio served from the VPS with an auto-deploy GitHub Action.
- 2026-10-02 — Growth case study template in Sanity (`growthCaseStudy`, FR + EN) with the funnel, ads showcase (feed overlays, modal with sound), A/B budget chart, lead scoring kanban, community mockups, results and CTA; G.A.T.O Tower moved from local code to Sanity with English added. The template shares the website case study's frame (breadcrumb, logo, sector tags, 10-second brief, related cards) and Gato is listed and filterable on /projets from Sanity. /services SEO step logo; /design hero phone shows the Little Green Spark mobile capture.
- 2026-10-01 — Website requests batch: EN menu "Projects" + 16px menu; Motion design row removed from Design; article back-to-list link + old site's book-a-call card; footer social icons + Webflow badge; video testimonials load/play only on screen; team portrait strip on the home page (new headline, no headcount); sectors and article categories as Sanity lists; FAQs in Sanity per page (seeded).
- 2026-10-01 — Project visuals as on techflow-agency.com (#1): `imageGroup` blocks in the case-study body at the live position, old `showcase` field removed, project data re-imported (wrong visuals and French quote prefixes gone, Kretz Club images added, `cleanQuote` removed). Images served at quality 90. Case study: hero labels, chapter dash, "Le projet en images" and the footer CTA removed; per-project accent colour field in Sanity. Insight article page redesigned for reading (full-width paper, numbered contents, author card). Slug check unique per language (FR/EN share slugs).
- 2026-09-30 — Showcase redesign of /projets and /projets/[slug] (`d253a05`).
- 2026-09-30 — Set up shared context: CLAUDE.md decisions/gotchas + this file.
- 2026-09-29 — Case study page redesign + bug fixes (`4f806c5`).
- 2026-09-29 — Sanity integration: /projets, /outils, /nos-insights, /notre-equipe and the reviews marquee read from Sanity; content imported from the live Webflow site (`9070bd2`).
