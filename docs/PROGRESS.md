# Progress

Update at the end of every work session (see CLAUDE.md). Newest first. Link GitHub issues as `#N`.

## In progress
- **Gato Tower growth case study (Sanity `growthCaseStudy`, 2026-10-02):** page built and seeded FR + EN; still needs the real assets and figures: upload the ad videos + posters (+ .vtt subtitles) in the Studio (Ads tab, FR and EN documents), the real results metrics (`[TBD]`, hidden on the site until replaced), a card image, the 3 "Card hover" images, key visual and client logo (Images tab), add image groups to the story (shoot, creatives, dashboards), and pick the tools and team. Check the social handle (`gatotowerofficial`, guessed from the Facebook URL), the ad notes/scripts and the comment replies with the team. Deploy the Studio so editors see the new type.
- **Waiting on push (403 for `kinnizen` on techflow-ag/TechFlow-Redesign):** someone with write access pushes `main`. Project `sectors` and article `topics` (Categories) are filled from the Sanity lists and the site reads only them (2026-10-01). After the push: run `scripts/migrate-taxonomies.ts` (studio) without flags to remove the hidden old text, then delete the hidden `sector` (project.ts) and `categories` (insight.ts) fields.
- **Cookie policy:** the footer link and pages are in (copied from the old site, 2026-10-01), but that text is a draft placeholder from the legal notices; the EN version names "Avia Creative Solutions". Needs the real cookie policy (and a consent banner if analytics are added).
- **To do in Sanity (#2):** tick "Logo has its own background" on Mandil Avocats (FR + EN).
- **To do:** deploy the Studio (`pnpm deploy` in `techflow-cms/studio`) so the hosted Studio gets the new lists, FAQ folder, image groups, accent colour and slug fix.

## Next
- **Kretz Club has no English document** in Sanity (it was imported from the French-only Webflow staging), so it's missing from the English site, while the live site has `/en/projects/kretz-club`. Import or translate it.
- **GreenPatina** is a published French project in Sanity with no sector, services or English version, and it isn't on the live site: finish it or unpublish it.
- Fill the case-study content the new template relies on: key figures and team (#3). Every imported body already has h2 chapters.
- Decide whether to move the remaining local content (Gato Tower case study, Mux video testimonials, contact/services team members) into Sanity.

## Done
- 2026-10-02 — Checked every project's sectors and card tags against techflow-agency.com/projets: all match, except Kretz Club, which was missing its second sector (Immobilier & Archi); added in Sanity (FR).
- 2026-10-02 — Growth case study hero moved to the site's split hero frame (pitch left, fan of 3 ad phones right, grid overlay) and the brief got the shared "L'essentiel en 10 secondes" heading, so it blends with the website case studies while keeping its own figures row, steps rail and ads section.
- 2026-10-02 — Growth case study simplified to read like a website case study (hero, brief, story in chapters with images, 3 ad phones, quote, related); funnel / A/B / kanban / community widgets removed. Agents IA hero redrawn as an n8n workflow with real logos; development hero capture; Prello quote photo.
- 2026-10-02 — Growth case study template in Sanity (`growthCaseStudy`, FR + EN) with the funnel, ads showcase (feed overlays, modal with sound), A/B budget chart, lead scoring kanban, community mockups, results and CTA; G.A.T.O Tower moved from local code to Sanity with English added. The template shares the website case study's frame (breadcrumb, logo, sector tags, 10-second brief, related cards) and Gato is listed and filterable on /projets from Sanity. /services SEO step logo; /design hero phone shows the Little Green Spark mobile capture.
- 2026-10-01 — Website requests batch: EN menu "Projects" + 16px menu; Motion design row removed from Design; article back-to-list link + old site's book-a-call card; footer social icons + Webflow badge; video testimonials load/play only on screen; team portrait strip on the home page (new headline, no headcount); sectors and article categories as Sanity lists; FAQs in Sanity per page (seeded).
- 2026-10-01 — Project visuals as on techflow-agency.com (#1): `imageGroup` blocks in the case-study body at the live position, old `showcase` field removed, project data re-imported (wrong visuals and French quote prefixes gone, Kretz Club images added, `cleanQuote` removed). Images served at quality 90. Case study: hero labels, chapter dash, "Le projet en images" and the footer CTA removed; per-project accent colour field in Sanity. Insight article page redesigned for reading (full-width paper, numbered contents, author card). Slug check unique per language (FR/EN share slugs).
- 2026-09-30 — Showcase redesign of /projets and /projets/[slug] (`d253a05`).
- 2026-09-30 — Set up shared context: CLAUDE.md decisions/gotchas + this file.
- 2026-09-29 — Case study page redesign + bug fixes (`4f806c5`).
- 2026-09-29 — Sanity integration: /projets, /outils, /nos-insights, /notre-equipe and the reviews marquee read from Sanity; content imported from the live Webflow site (`9070bd2`).
