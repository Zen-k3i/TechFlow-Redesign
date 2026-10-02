import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {table} from '@sanity/table'
import {schemaTypes} from './schemaTypes'
import {BASE_LANGUAGE, LANGUAGES, LOCALIZED_TYPES} from './languages'
import {structure} from './structure'
import {FAQ_PAGES} from './schemaTypes/documents/faq'
import {STATIC_PAGES} from './site-routes'

/** The plain type template and our per-language ones (`project-fr`, `project-en`, …). */
const isLocalizedTemplate = (id: string) => LOCALIZED_TYPES.some((type) => id === type || id.startsWith(`${type}-`))
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const TEMPLATE_NAMES: Record<string, string> = {insight: 'Article', category: 'Article category', growthCaseStudy: 'Growth case study'}

export default defineConfig({
  name: 'default',
  title: 'TechFlow CMS',

  projectId: 'ce31dig5',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    table(),
    documentInternationalization({
      supportedLanguages: LANGUAGES,
      schemaTypes: [...LOCALIZED_TYPES],
    }),
  ],

  document: {
    // Site settings is a single document: no delete or duplicate.
    actions: (prev, {schemaType}) =>
      schemaType === 'siteSettings' ? prev.filter(({action}) => action && !['delete', 'duplicate', 'unpublish'].includes(action)) : prev,
    // The global "create" menu starts localized documents in French; inside a language
    // folder, the folder's own template (French or English) is used instead.
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type !== 'global') return prev
      return [
        ...prev.filter(
          (item) =>
            !isLocalizedTemplate(item.templateId) &&
            !item.templateId.startsWith('faq') &&
            !item.templateId.startsWith('pageSeo') &&
            item.templateId !== 'siteSettings',
        ),
        ...LOCALIZED_TYPES.map((schemaType) => ({
          templateId: `${schemaType}-${BASE_LANGUAGE}`,
          parameters: {language: BASE_LANGUAGE},
        })),
      ]
    },
  },

  schema: {
    types: schemaTypes,
    templates: (prev): Template[] => [
      ...prev.filter((t) => t.id !== 'siteSettings'),
      ...LOCALIZED_TYPES.flatMap((schemaType) =>
        LANGUAGES.map((lang) => ({
          id: `${schemaType}-${lang.id}`,
          title: `${TEMPLATE_NAMES[schemaType] ?? capitalize(schemaType)} (${lang.title})`,
          schemaType,
          value: {language: lang.id},
        })),
      ),
      ...FAQ_PAGES.flatMap((page) =>
        LANGUAGES.map((lang) => ({
          id: `faq-${page.id}-${lang.id}`,
          title: `FAQ ${page.title} (${lang.title})`,
          schemaType: 'faq',
          value: {language: lang.id, page: page.id},
        })),
      ),
      ...STATIC_PAGES.flatMap((page) =>
        LANGUAGES.map((lang) => ({
          id: `pageSeo-${page.id}-${lang.id}`,
          title: `Page SEO ${page.title} (${lang.title})`,
          schemaType: 'pageSeo',
          value: {language: lang.id, page: page.id},
        })),
      ),
    ],
  },
})
