import {getCliClient} from 'sanity/cli'
// One-off SEO fixes found during the Webflow migration check (2026-10-02).
const client = getCliClient({apiVersion: '2025-01-01'})
const fixes: [string, Record<string, string>][] = [
  ['1mcCfYOdWJ0xbaq3I0OsIU', {'seo.description': 'Concorde case study: brand and website redesign for a major sustainable development player in Cambodia. Approach, design and results.'}],
  ['growth-gato-tower-fr', {'seo.title': 'G.A.T.O Tower : publicités vidéo et leads qualifiés | TechFlow'}],
]
const ids = fixes.flatMap(([id]) => [id, `drafts.${id}`])
const existing = new Set<string>(await client.fetch(`*[_id in $ids]._id`, {ids}))
const tx = client.transaction()
for (const [id, set] of fixes) for (const target of [id, `drafts.${id}`]) if (existing.has(target)) tx.patch(target, {set})
console.log(await tx.commit().then((r) => r.results.map((x) => x.id)))
