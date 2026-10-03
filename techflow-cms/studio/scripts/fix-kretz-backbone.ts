import {getCliClient} from 'sanity/cli'
// One-off copy fix (2026-10-03): "Ma colonne vertébrale" → "La colonne vertébrale" in the Kretz Club case study.
const client = getCliClient({apiVersion: '2025-01-01'})
const FIXES: [RegExp, string][] = [[/\bMa colonne vertébrale\b/g, 'La colonne vertébrale'], [/\bMy operations backbone\b/g, 'The operations backbone']]
const docs = await client.fetch<{_id: string; body: {_key: string; children?: {_key: string; text?: string}[]}[]}[]>(
  `*[_type == "project" && slug.current == "kretz-club"]{_id, body}`,
)
for (const doc of docs) {
  const patch = client.patch(doc._id)
  let n = 0
  for (const block of doc.body ?? [])
    for (const span of block.children ?? []) {
      if (!span.text) continue
      let text = span.text
      for (const [re, to] of FIXES) text = text.replace(re, to)
      if (text !== span.text) {
        patch.set({[`body[_key=="${block._key}"].children[_key=="${span._key}"].text`]: text})
        console.log(doc._id, '→', text.slice(0, 80))
        n++
      }
    }
  if (n && !process.argv.includes('--dry-run')) await patch.commit()
}
