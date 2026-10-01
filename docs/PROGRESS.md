# Progress

Update at the end of every work session (see CLAUDE.md). Newest first. Link GitHub issues as `#N`.

## In progress
- **Waiting on push (403 for `kinnizen` on techflow-ag/TechFlow-Redesign):** someone with write access pushes `main`. Then run `scripts/migrate-taxonomies.ts` (studio) without flags: it switches article categories to the list and removes the hidden old project `sector` text; then delete the hidden `sector` field from `project.ts`. Project `sectors` are already filled (2026-10-01, `--projects-keep-text`).
- **Waiting on a decision:** footer "Paramètres des cookies" / "Cookies Settings" link. The old site's `/politique-de-cookies` page is a draft (placeholder copied from the legal notices; the EN version names another company), so it has not been copied yet.
- **To do in Sanity (#2):** tick "Logo has its own background" on Mandil Avocats (FR + EN).
- **To do:** deploy the Studio (`pnpm deploy` in `techflow-cms/studio`) so the hosted Studio gets the new lists, FAQ folder, image groups, accent colour and slug fix.

## Next
- Fill the case-study content the new template relies on: key figures and team (#3). Every imported body already has h2 chapters.
- Decide whether to move the remaining local content (Gato Tower case study, Mux video testimonials, contact/services team members) into Sanity.

## Done
- 2026-10-01 — Website requests batch: EN menu "Projects" + 16px menu; Motion design row removed from Design; article back-to-list link + old site's book-a-call card; footer social icons + Webflow badge; video testimonials load/play only on screen; team portrait strip on the home page (new headline, no headcount); sectors and article categories as Sanity lists; FAQs in Sanity per page (seeded).
- 2026-10-01 — Project visuals as on techflow-agency.com (#1): `imageGroup` blocks in the case-study body at the live position, old `showcase` field removed, project data re-imported (wrong visuals and French quote prefixes gone, Kretz Club images added, `cleanQuote` removed). Images served at quality 90. Case study: hero labels, chapter dash, "Le projet en images" and the footer CTA removed; per-project accent colour field in Sanity. Insight article page redesigned for reading (full-width paper, numbered contents, author card). Slug check unique per language (FR/EN share slugs).
- 2026-09-30 — Showcase redesign of /projets and /projets/[slug] (`d253a05`).
- 2026-09-30 — Set up shared context: CLAUDE.md decisions/gotchas + this file.
- 2026-09-29 — Case study page redesign + bug fixes (`4f806c5`).
- 2026-09-29 — Sanity integration: /projets, /outils, /nos-insights, /notre-equipe and the reviews marquee read from Sanity; content imported from the live Webflow site (`9070bd2`).
