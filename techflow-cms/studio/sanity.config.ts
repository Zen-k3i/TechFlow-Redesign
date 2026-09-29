import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {table} from '@sanity/table'
import {schemaTypes} from './schemaTypes'

const LANGUAGES = [
  {id: 'fr', title: 'Français'},
  {id: 'en', title: 'English'},
]
const BASE_LANGUAGE = 'fr'
const LOCALIZED_TYPES = ['project', 'tool', 'insight']

export default defineConfig({
  name: 'default',
  title: 'TechFlow CMS',

  projectId: 'ce31dig5',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    table(),
    documentInternationalization({
      supportedLanguages: LANGUAGES,
      schemaTypes: LOCALIZED_TYPES,
    }),
  ],

  document: {
    // New localized documents start in French; translations are created from the document itself.
    newDocumentOptions: (prev) => [
      ...prev.filter((item) => !LOCALIZED_TYPES.includes(item.templateId)),
      ...LOCALIZED_TYPES.map((schemaType) => ({
        templateId: `${schemaType}-${BASE_LANGUAGE}`,
        parameters: {language: BASE_LANGUAGE},
      })),
    ],
  },

  schema: {
    types: schemaTypes,
    templates: (prev): Template[] => [
      ...prev,
      ...LOCALIZED_TYPES.map((schemaType) => ({
        id: `${schemaType}-${BASE_LANGUAGE}`,
        title: `${schemaType} (${BASE_LANGUAGE})`,
        schemaType,
        parameters: [{name: 'language', type: 'string'}],
        value: ({language}: {language: string}) => ({language}),
      })),
    ],
  },
})
