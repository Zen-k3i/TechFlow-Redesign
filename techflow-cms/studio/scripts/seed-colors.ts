/**
 * One-off (2026-10-01): fills each project's "Template colour" (accentColor) with the colour the website
 * used for it until now (the theme list coded in src/components/site/project-highlight.tsx, matched on
 * slug or slug prefix; brand blue otherwise), so the colour is visible and editable in the Studio.
 * Never overwrites a colour already set.
 *
 *   npx sanity exec scripts/seed-colors.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/seed-colors.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2026-09-29'})

const THEMES: Record<string, string> = {
  leapmotor: '#7ee8ff',
  'district-6': '#ff6b9d',
  'little-green-spark': '#8ee07a',
  concorde: '#5ee4e4',
  'mandil-avocats': '#e4c37a',
  exelmans: '#5ec9a0',
  'tandem-partners': '#ff6b6b',
  'epargne-plurielle': '#f0d27a',
  'place-des-aines': '#ffc08a',
  'ama-campus': '#6d8cff',
  'opco-ep': '#9b8cff',
}
const FALLBACK = '#4791ff'
const colourFor = (slug: string) =>
  THEMES[slug] ?? Object.entries(THEMES).find(([key]) => slug.startsWith(`${key}-`))?.[1] ?? FALLBACK

async function run() {
  const projects = await client.fetch<{_id: string; language: string; slug: string | null}[]>(
    `*[_type == "project" && !defined(accentColor) && !(_id in path("drafts.**"))]{_id, language, "slug": slug.current}`,
  )
  const tx = client.transaction()
  for (const p of projects) {
    const colour = colourFor(p.slug ?? '')
    console.log(`${p.language} ${p.slug}: ${colour}`)
    tx.patch(p._id, (patch) => patch.setIfMissing({accentColor: colour}))
  }
  console.log(`${projects.length} projects`)
  if (DRY_RUN || projects.length === 0) return
  await tx.commit()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
