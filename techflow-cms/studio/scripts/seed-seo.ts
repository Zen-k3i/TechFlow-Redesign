/**
 * One-off (2026-10-02): creates Site settings (SEO defaults, organization from the old site's structured data,
 * Search Console code and GA4 ID from the live Webflow head) and the redirects for URLs that changed with the
 * move off Webflow. Never overwrites: Site settings fields are only set when empty, redirects are skipped
 * when their source already exists.
 *
 *   npx sanity exec scripts/seed-seo.ts --with-user-token -- --dry-run
 *   npx sanity exec scripts/seed-seo.ts --with-user-token
 */
import {readFileSync} from 'node:fs'
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.argv.includes('--dry-run')
const client = getCliClient({apiVersion: '2026-09-29'})

const SETTINGS = {
  siteName: 'TechFlow',
  titleTemplate: '%s | TechFlow',
  defaultDescriptionFr:
    "Design, développement et IA : TechFlow est un start-up studio. Nous livrons en cinq semaines les produits web que d'autres mettent des mois à livrer.",
  defaultDescriptionEn:
    'Design, development and AI: TechFlow is a startup studio. We ship in five weeks the web products other agencies take months to deliver.',
  organization: {
    name: 'TechFlow Agency',
    legalName: 'Techflow Agency PTE LTD',
    description:
      'Studio de design, développement web et automatisation IA, au service des PME et entreprises mid-market en France et au Cambodge.',
    email: 'maximilien@techflow-agency.com',
    locations: [
      {_key: 'paris', _type: 'office', name: 'TechFlow Agency — Paris', street: '229 rue Saint-Honoré', postalCode: '75001', city: 'Paris', country: 'FR', phone: '+33-6-72-69-07-01'},
      {
        _key: 'phnom-penh',
        _type: 'office',
        name: 'TechFlow Agency — Phnom Penh',
        street: 'Confluences, Aquation Office Park, #540 Koh Pich Street, Diamond Island',
        postalCode: '120101',
        city: 'Phnom Penh',
        country: 'KH',
        phone: '+855-12-537-289',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/techflow-agence/',
      'https://www.instagram.com/we.are.techflow/',
      'https://webflow.com/@techflow-agencys-workspace',
    ],
  },
  // From <meta name="google-site-verification"> and the gtag snippet on techflow-agency.com.
  googleVerification: 'Rtb1vjMidvgD4WC8D3K5g8eJBUdWSHKsmaYUPRzlTHk',
  ga4Id: 'G-D60Y7LH1L8',
}

/** Old URL → new URL. Case-study slugs renamed when the projects moved to Sanity; Webflow's site search page. */
const REDIRECTS = [
  {source: '/projets/epargne-plurielle', destination: '/projets/epargne-plurielle-avenir', note: 'Slug renamed in the CMS move'},
  {source: '/en/projects/epargne-plurielle', destination: '/en/projects/epargne-plurielle-avenir', note: 'Slug renamed in the CMS move'},
  {source: '/projets/district-6', destination: '/projets/district-6-publishing', note: 'Slug renamed in the CMS move'},
  {source: '/en/projects/district-6', destination: '/en/projects/district-6-publishing', note: 'Slug renamed in the CMS move'},
  {source: '/search', destination: '/nos-insights', note: 'Webflow site search page (no search on the new site)'},
]

async function run() {
  const existing = await client.fetch<Record<string, unknown> | null>(`*[_id == "siteSettings"][0]`)
  const missing = Object.fromEntries(Object.entries(SETTINGS).filter(([key]) => existing?.[key] === undefined))
  console.log(`Site settings: ${existing ? 'exists' : 'new'}, setting ${Object.keys(missing).join(', ') || 'nothing'}`)

  const sources = new Set(await client.fetch<string[]>(`*[_type == "redirect"].source`))
  const newRedirects = REDIRECTS.filter((r) => !sources.has(r.source))
  for (const r of newRedirects) console.log(`Redirect ${r.source} → ${r.destination}`)
  if (DRY_RUN) return

  const tx = client.transaction().createIfNotExists({_id: 'siteSettings', _type: 'siteSettings'})
  if (Object.keys(missing).length) tx.patch('siteSettings', (p) => p.set(missing))
  if (existing?.defaultOgImage === undefined) {
    const asset = await client.assets.upload('image', readFileSync('../../public/images/og-default.jpg'), {filename: 'og-default.jpg'})
    tx.patch('siteSettings', (p) => p.set({defaultOgImage: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}}))
  }
  for (const r of newRedirects) tx.create({_type: 'redirect', permanent: true, ...r})
  await tx.commit()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
