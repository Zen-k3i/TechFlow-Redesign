/**
 * Website URLs, for the Studio's Google preview and redirect hints.
 * A copy of `routes` in the website's `src/i18n/routes.ts`: change both together.
 */
export const SITE_URL = 'https://www.techflow-agency.com'

/** Coded pages whose SEO is edited in "Page SEO" documents (one per page and language). */
export const STATIC_PAGES = [
  {id: 'home', title: 'Home', fr: '/', en: '/'},
  {id: 'services', title: 'Services', fr: '/services', en: '/services'},
  {id: 'design', title: 'Design', fr: '/design', en: '/design'},
  {id: 'development', title: 'Development', fr: '/developpement', en: '/development'},
  {id: 'aiAgents', title: 'AI agents', fr: '/agents-ia', en: '/ai-agents'},
  {id: 'salesFunnel', title: 'Sales funnel', fr: '/tunnel-de-vente', en: '/sales-funnel'},
  {id: 'projects', title: 'Projects', fr: '/projets', en: '/projects'},
  {id: 'tools', title: 'Tools', fr: '/outils', en: '/tools'},
  {id: 'team', title: 'Team', fr: '/notre-equipe', en: '/our-team'},
  {id: 'insights', title: 'Insights', fr: '/nos-insights', en: '/our-insights'},
  {id: 'contact', title: 'Contact', fr: '/contact', en: '/contact'},
  {id: 'legal', title: 'Legal notices', fr: '/mentions-legales', en: '/legal-notices'},
  {id: 'terms', title: 'Terms of service', fr: '/conditions-generales', en: '/terms-of-service'},
  {id: 'cookies', title: 'Cookie policy', fr: '/politique-de-cookies', en: '/cookie-policy'},
] as const

/** Listing page of each routable document type. */
const TYPE_PAGE: Record<string, string> = {project: 'projects', growthCaseStudy: 'projects', tool: 'tools', insight: 'insights'}

const localized = (lang: string, path: string) => (lang === 'en' ? `/en${path === '/' ? '' : path}` : path)

/** Public path of a document: a CMS page (`type` + `slug`) or a coded page (`page`). */
export function pagePath(type: string | undefined, lang: string, slug?: string, page?: string): string {
  const id = type && TYPE_PAGE[type] ? TYPE_PAGE[type] : page
  const entry = STATIC_PAGES.find((p) => p.id === id)
  if (!entry) return '/'
  const base = lang === 'en' ? entry.en : entry.fr
  return localized(lang, type && TYPE_PAGE[type] ? `${base}/${slug ?? 'slug'}` : base)
}
