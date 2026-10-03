import {getCliClient} from 'sanity/cli'
/**
 * 2026-10-03: applies the SEO editor's remaining must-fix items (round 2) to two drafts, then publishes
 * the five best-reviewed English drafts. The three others passed the editor review as they are.
 */
const client = getCliClient({apiVersion: '2025-01-01'})
const SLUGS = ['branding-agency-phnom-penh', 'khmer-text-to-speech', 'logo-design-cost-cambodia', 'ngo-website-design-cambodia', 'ai-chatbot-telegram']
const FIXES: Record<string, [string, string][]> = {
  'ngo-website-design-cambodia': [
    ['a membership body of almost 200 domestic and foreign NGOs,', 'a membership body of almost 200 domestic and foreign NGOs according to its own membership page,'],
  ],
  'ai-chatbot-telegram': [
    ['Hun Sen himself put his Facebook following at 14 million at the time, in a statement reported by ABC News.', 'His Facebook page was listed as having 14 million followers at the time, according to ABC News.'],
  ],
}
type Span = {_key: string; text?: string}
type Doc = {_id: string; body?: {_key: string; children?: Span[]}[]} & Record<string, unknown>

for (const slug of SLUGS) {
  const draftId = `drafts.insight-en-${slug}`
  const draft = await client.getDocument<Doc>(draftId)
  if (!draft) {
    console.log(`  = ${slug}: no draft (already published?)`)
    continue
  }
  let fixed = 0
  for (const [from, to] of FIXES[slug] ?? [])
    for (const block of draft.body ?? [])
      for (const span of block.children ?? [])
        if (span.text?.includes(from)) {
          span.text = span.text.replace(from, to)
          fixed++
        }
  if ((FIXES[slug]?.length ?? 0) !== fixed) throw new Error(`${slug}: expected ${FIXES[slug]?.length ?? 0} fixes, applied ${fixed}`)
  const {_id, _rev, _createdAt, _updatedAt, ...rest} = draft as Doc & {_rev?: string; _createdAt?: string; _updatedAt?: string}
  void _id, void _rev, void _createdAt, void _updatedAt
  await client.transaction().createOrReplace({...rest, _id: draftId.replace(/^drafts\./, ''), _type: 'insight'}).delete(draftId).commit()
  console.log(`  + ${slug} published${fixed ? ` (${fixed} fix)` : ''}`)
}
