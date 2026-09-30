# Progress

Update at the end of every work session (see CLAUDE.md). Newest first. Link GitHub issues as `#N`.

## In progress
- 2026-09-30 — Showcase redesign (uncommitted), verified desktop FR/EN + mobile in the browser; not yet checked with reduced motion on a real device:
  - /projets: project-screen wall hero, eyebrow instead of the badge, count-up stats, staggered card reveal.
  - /projets/[slug]: split hero with cover reveal, key-result card, live-site pill, "Read the case study" jump; count-up results; fixed duplicate React keys in the gallery/showcase.
  - Feedback round (same day): case-study 3×3 zoom mosaic replaced by a tilting browser window + two scroll-sliding rows of screens; large client logo (new `logoFill` field in the Studio); /projets hero back to the shared hero look (badge pill, grid, no "scroll" cue); "Voir le cas" pill removed from card hover; outline buttons fill with brand blue on hover; Manifeste closing/body gap tightened; Méthode redesigned so only the app window is sticky (screens shown whole, never cut).
  - Second round (same day): case-study hero is now a fullscreen text-only hero followed by the site's main screen full bleed (no browser frame, no pin, no scroll cue); split hero, browser-window gallery and hero key-result card removed; story section on paper is now full width (no rounded card). Checked desktop + mobile in the browser.
  - Third round (same day): whole case-study page reworked into dark opening → paper story → quote → dark close (see CLAUDE.md); sidebar shows only the client logo, full width; Results became a big accent-coloured `Impact` band; testimonial pulled out of the article into its own big-quote band; CTA and related merged into one full-width dark close. Checked desktop + mobile.
  - Fourth round (same day): case-study page rebuilt as a template: animated hero with a rotating deck of the site's screens, "10 seconds" brief (results + facts), story split into numbered chapters with visuals between them and a floating chapter nav, testimonial on an accent card. Checked desktop FR/EN + mobile, and a near-empty project (GreenPatina).
  - **To do (#1):** re-run `pnpm import:live` (studio) to fix French testimonial quotes and the wrong showcase images (import script fixed, data not yet).
  - **To do in Sanity (#2):** tick "Logo has its own background" on Mandil Avocats (FR + EN) — its logo is a dark box with transparent rounded corners, so it isn't detected as opaque.
- Uncommitted on `main` (as of 2026-09-30): `sanity` / `@sanity/vision` bumped 6.16 → 6.17 in the studio; `cms-project-card.tsx` reformatted (its `loader={sanityLoader}` had been dropped by accident; restored, so card images are resized by the Sanity CDN again).

## Next
- Fill the case-study content the new template relies on: h2 chapters, key figures, team (#3).
- Decide whether to move the remaining local content (Gato Tower case study, Mux video testimonials, contact/services team members) into Sanity.

## Done
- 2026-09-30 — Set up shared context: CLAUDE.md decisions/gotchas + this file.
- 2026-09-29 — Case study page redesign + bug fixes (`4f806c5`).
- 2026-09-29 — Sanity integration: /projets, /outils, /nos-insights, /notre-equipe and the reviews marquee read from Sanity; content imported from the live Webflow site (`9070bd2`).
