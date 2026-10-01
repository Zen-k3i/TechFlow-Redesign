import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {table} from '@sanity/table'
import {schemaTypes} from './schemaTypes'
import {BASE_LANGUAGE, LANGUAGES, LOCALIZED_TYPES} from './languages'
import {structure} from './structure'

/** The plain type template and our per-language ones (`project-fr`, `project-en`, …). */
const isLocalizedTemplate = (id: string) => LOCALIZED_TYPES.some((type) => id === type || id.startsWith(`${type}-`))
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)
const TEMPLATE_NAMES: Record<string, string> = {insight: 'Article', category: 'Article category'}

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
    // The global "create" menu starts localized documents in French; inside a language
    // folder, the folder's own template (French or English) is used instead.
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type !== 'global') return prev
      return [
        ...prev.filter((item) => !isLocalizedTemplate(item.templateId)),
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
      ...prev,
      ...LOCALIZED_TYPES.flatMap((schemaType) =>
        LANGUAGES.map((lang) => ({
          id: `${schemaType}-${lang.id}`,
          title: `${TEMPLATE_NAMES[schemaType] ?? capitalize(schemaType)} (${lang.title})`,
          schemaType,
          value: {language: lang.id},
        })),
      ),
    ],
  },
})
