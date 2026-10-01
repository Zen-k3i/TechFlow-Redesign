# Progress

Update at the end of every work session (see CLAUDE.md). Newest first. Link GitHub issues as `#N`.

## In progress
- **To do in Sanity (#2):** tick "Logo has its own background" on Mandil Avocats (FR + EN). Safe now: the import keeps it (`STUDIO_ONLY`).
- **To do:** deploy the Studio (`pnpm deploy` in `techflow-cms/studio`) so editors on the hosted Studio get the image group block, the accent colour field and the slug fix.

## Next
- Fill the case-study content the new template relies on: key figures and team (#3). Every imported body already has h2 chapters.
- Decide whether to move the remaining local content (Gato Tower case study, Mux video testimonials, contact/services team members) into Sanity.

## Done
- 2026-10-01 — Project visuals as on techflow-agency.com (#1): `imageGroup` blocks in the case-study body at the live position, old `showcase` field removed, project data re-imported (wrong visuals and French quote prefixes gone, Kretz Club images added, `cleanQuote` removed). Images served at quality 90. Case study: hero labels, chapter dash, "Le projet en images" and the footer CTA removed; per-project accent colour field in Sanity. Insight article page redesigned for reading (full-width paper, numbered contents, author card). Slug check unique per language (FR/EN share slugs).
- 2026-09-30 — Showcase redesign of /projets and /projets/[slug] (`d253a05`).
- 2026-09-30 — Set up shared context: CLAUDE.md decisions/gotchas + this file.
- 2026-09-29 — Case study page redesign + bug fixes (`4f806c5`).
- 2026-09-29 — Sanity integration: /projets, /outils, /nos-insights, /notre-equipe and the reviews marquee read from Sanity; content imported from the live Webflow site (`9070bd2`).
