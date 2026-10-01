@AGENTS.md

# Shared context — keep this current

This file, `docs/PROGRESS.md` and the GitHub issues (techflow-ag/TechFlow-Redesign; the `origin` remote still says Zen-k3i and redirects) are the team's shared memory. Anyone (human or Claude session) should be able to pick up from them alone.

At the end of every work session:
1. **CLAUDE.md** — add new decisions (and why) and gotchas below. Remove anything that is no longer true.
2. **docs/PROGRESS.md** — move finished items to Done (with date), update In progress / Next, note anything left half-done.
3. **GitHub issues** — close what shipped (reference the commit), open issues for new bugs/follow-ups found, comment on issues that moved. `gh issue list` to check.

Put project knowledge here, not in a personal Claude memory, so the whole team sees it.

# Decisions

## Sanity CMS
- Content (projects, tools, insights, team members, client reviews) comes from Sanity project `ce31dig5`, dataset `production`. Edit content in Sanity, not in `src/components/*/data.ts` — those files now only hold interface copy.
- The Studio is standalone in `techflow-cms/studio`, deliberately **not** embedded in the Next.js app. Studio labels are in English.
- FR/EN are separate documents linked by `@sanity/document-internationalization`; French is the base language. Desk structure (`techflow-cms/studio/structure.ts`) groups projects, tools and insights in folders with French/English sub-lists; creating from a sub-list uses the `<type>-<lang>` template. Languages live in `languages.ts`.
- Content was imported from the live Webflow site (techflow-agency.com) with `pnpm import:live` in the studio. Re-runnable, matches on `sourceUrl`; `-- --only=team` / `-- --only=review` for a single type.
- `insight.author` references a `teamMember`; empty means "TechFlow Agency". `teamMember` fields: name, role, photo, linkedin, order.
- Project header images mirror Webflow: `heroImage` + `heroSide1`–`heroSide8`. Queries rebuild the 3×3 mosaic as `gallery`; card hover stacks use `previews` = hero + sides 1–2.
- Detail pages pass `alternates` (from `translationLinks`) to `PageShell` so the language switch keeps the translated slug.
- Project sectors and article categories are `sector` / `category` documents (FR + EN, linked like projects; Studio folders "Sectors" and "Article categories"). Projects pick one or more (`sectors`), articles one or more (`topics`, shown as "Categories" in the Studio), like Tools, limited to the document's language. The old free-text fields (`sector`, `categories`) are hidden and unused, kept only while the Vercel deployment runs code that reads them. Queries return names (`sectors`, `sector` = first one, `categories`), so components get plain strings; listing filters (/projets, /nos-insights, home Work) take their buttons from the lists (`filterOptions` in `page/filters.ts`, entries in use only). One-off migration from the old free text: `scripts/migrate-taxonomies.ts` (already run with `--projects-keep-text`). After the next push: run it without flags to unset the old text, then delete the hidden `sector` / `categories` fields.
- FAQs are `faq` documents, one per page (`home`, `services`, `design`, `development`, `aiAgents`, `salesFunnel`) and language; Studio folder FAQ → one sub-folder per page. Pages fetch `FAQ_QUERY` and pass it to `Faq`, which renders nothing if the FAQ is missing or empty. Add a page: add it to `FAQ_PAGES` (`schemaTypes/documents/faq.ts`) and fetch it in the page.

## Projects page (/projets)
- Custom hero (`src/components/projects/projects-hero.tsx`), not the shared `PageHero`, but styled like it for consistency (badge pill, grid overlay, same padding; no scroll cue), with a tilted wall of each CMS case study's website screens (`previews`) auto-scrolling behind the pitch; every screen links to its case study, hovering a column pauses it. Stats live in the hero and count up. "Explore" scrolls to `#etudes-de-cas` (Lenis handles the anchor).
- Growth case studies (local, no screens) are not on the wall.

## Case study page (/projets/[slug])
- `cms-case-study-page.tsx` is a template: every block comes from the Sanity project and is left out when its fields are empty (brief needs more than the reading time, quote needs `testimonial.quote`, chapter nav needs ≥ 2 h2s).
- Flow: `Hero` → `Brief` ("L'essentiel en 10 secondes": metrics as accent cards, then sector / services / tools / reading time / team) → story on paper → `Quote` (accent-coloured card) → dark `Closing` (CTA + related). The page root sets `--accent` and `--glow` from the project's Sanity `accentColor` (hex, "Accent colour" in Details; `themeFromHex`), falling back to `projectTheme(slug)`. The case study ends on its own CTA, so it passes `footerCta={false}` to `PageShell` to drop the footer's "Open for new projects" block.
- Hero: pitch on the left (client logo, word-reveal title, summary, services, CTAs), `ScreenDeck` on the right: up to 5 screens (mosaic centre first, then sides) deal in, tilt with the cursor and rotate to the front every 3.8 s (paused on hover, static with reduced motion); the front card's chrome shows the website domain. Text is never laid over a screenshot (it was hard to read). Drifting accent `Aurora` behind.
- The story is the body split at each h2 (`chaptersOf`): text before the first h2 is a serif lead, each h2 becomes a numbered chapter with a sticky number + title. Project visuals are `imageGroup` blocks inside the body, placed exactly where the live Webflow page had its `.branding_image-wrapper` (odd count: first image full width, rest two by two). The old `showcase` field and its mechanical placement (two per chapter gap + a "Le projet en images" masonry) are gone. A floating bottom pill (`ChapterNav`) tracks and jumps between chapters while the story is on screen. Editors: structure the body as Context / Approach / Results with h2s.
- Client logo (`ClientLogo`): transparent logos on a white card sized to the logo, logos with their own background edge to edge. `logoFill` = the Studio toggle "Logo has its own background", else the asset's `isOpaque`.
- `projectTheme` also matches slug prefixes, because CMS slugs are longer than the theme keys (`district-6-publishing` → `district-6`).
- `CountUp` (`src/components/site/reveal.tsx`) animates figures like "45+", "+48%", "×3,4" and keeps the real value in an sr-only span for screen readers and crawlers.

## Insight article (/nos-insights/[slug])
- `article-page.tsx`: short dark header (categories, title, excerpt, author + date + reading time), cover on the seam between header and a full-width paper page, text in a ~44rem column with a numbered sticky contents list + progress rail (collapsible on mobile) and share buttons, then author card and CTA. The navbar already has a page progress bar, so the article has none of its own.
- `PortableBody` takes `scale="story" | "article"`; `article` is the larger long-read type scale.

## Images
- `sanityLoader` defaults to quality 90: imported images are already compressed WebP UI screenshots, and re-encoding them at 75 visibly softened their text. The import itself pulls Webflow's originals at full size; Webflow has no larger versions.

## Header / footer
- Desktop menu is 16px with narrower item padding below 1280px so French fits at 1024px; below 1024px the burger menu takes over. EN menu label is "Projects" (`nav.pages.projects`).
- CTA buttons are the hero's pair, shared from `page/project-cta.tsx`: `GlowButton` (pill with a turning blue edge light, glow and round blue arrow; white on dark, ink on light) and `HumanButton` (founder avatar with an online dot, opens the booking page), both 52px / 15px. The hero, the footer's "Un projet en tête ?" block (`ProjectCta`: heading, scope text, "Demander un devis" + "Parler à un humain", reassurance line; hidden on case studies via `footerCta={false}`) and the article sidebar card (same buttons, `block`, stacked) all use them, so they stay identical.
- Footer: Instagram and LinkedIn icons (inline SVG from the old site) + the Webflow Premium Partner badge under the tagline; external links use `rel="noopener noreferrer"`.

## Still local (not in Sanity)
- Gato Tower growth case study.
- The 3 Mux video testimonials (`src/components/site/content.ts`).
- Team `members` used by the contact page and services hero (`src/components/team/data.ts`).
- The team portrait strip (`team/portrait-strip.tsx`, on the home and team pages) shows the Sanity team members; its eyebrow/headline copy is in the component.

## Home page
- Méthode (`src/components/site/process.tsx`): heading spans the full width; only the app window is sticky (vertically centred), so it never overflows short viewports. Step screens have mixed ratios, so they're shown whole (`object-contain` over a blurred copy), not cropped.

## Service illustrations
- `public/images/service/{design,development,ai-agents,sales-funnel}.svg` are the service visuals, mapped by `serviceIllustration(i)` in `src/components/site/content.ts` (index = `serviceKeys` order). Used in the navbar Services menu and `ServiceCards` (/outils, /projets, insights), shown whole (`object-contain`) over a brand glow. Also the /services hub hover preview (`HoverPreview contain`) and the "next service" link on service pages. The services' `image` field (a project slug) still drives the home services section.

# Gotchas
- Webflow, n8n, HubSpot and Twenty logos in `public/images/tools` are white: always show tool logos on their brand colour (`tools` in `services/hub-data.ts`, `TOOLS` in `site/convictions.tsx`), never on a white tile.
- The import replaces whole project documents (`createOrReplace`). Fields only set in the Studio must be listed in `STUDIO_ONLY` in `import-live.ts` (today: `logoFill`, `accentColor`) or a re-import erases them.
- After any schema or query change, run `pnpm typegen` in `techflow-cms/studio`; it writes `sanity.types.ts` at the repo root.
- Video testimonials (`MuxCard`): the silent loop only gets its source near the viewport and pauses off screen (carousels render each video up to 10 times); a click swaps in Mux's player from 0 with sound. Verifying playback needs a visible browser: a hidden preview pane runs no IntersectionObserver or autoplay.
- `<Testimonials />` is an async server component, so client pages receive it as a `testimonials` slot prop — don't import it directly into a client component.
- 3D wall effects: in Chrome a `mask-image` on the same element as `perspective` is ignored, and `transform-style: preserve-3d` breaks hit-testing on the tilted content (clicks land on the column, not the link). Fade with gradient overlays (`z-10` above an `isolate` 3D layer) and keep the tilted layer flat.
- Case-study chapter ids come from the h2 text; ids equal to the page's own anchors (`histoire`, `en-bref`) get a `chapitre-` prefix (`RESERVED` in `cms-case-study-page.tsx`). Add new fixed anchors there.
- Tall images shown whole with `w-auto h-auto max-h-*` have no size until they load, so lazy loading never triggers: cap the width by aspect ratio instead (`VisualBreak`).
- Image lists from the CMS can repeat the same asset (a screen used as hero and side), so don't key React lists by `_key`/asset ref alone.
- The `AGENTS.md` block is regenerated by `next dev`; put project notes in this file, not there.
