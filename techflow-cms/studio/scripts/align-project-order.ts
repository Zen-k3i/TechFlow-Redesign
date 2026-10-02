import {getCliClient} from 'sanity/cli'
const client = getCliClient({apiVersion: '2025-01-01'})
const docs: {_id: string; language: string; s: string; order: number | null}[] = await client.fetch(
  `*[_type=="project"]{_id,language,"s":slug.current,order}`,
)
const fr = docs.filter((d) => d.language === 'fr' && !d._id.startsWith('drafts.') && d.order != null).sort((a, b) => a.order! - b.order!)
const slugs = fr.map((d) => d.s).filter((s) => s !== 'little-green-spark')
slugs.splice(6, 0, 'little-green-spark')
const rank = Object.fromEntries(slugs.map((s, i) => [s, i + 1]))
console.log(slugs.slice(0, 10).join(', '))
const tx = client.transaction()
let n = 0
for (const d of docs) if (rank[d.s] && d.order !== rank[d.s]) { tx.patch(d._id, {set: {order: rank[d.s]}}); n++ }
if (process.argv.includes('--apply')) { await tx.commit(); console.log('patched', n) } else console.log('would patch', n)
