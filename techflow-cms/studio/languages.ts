export const LANGUAGES = [
  {id: 'fr', title: 'French'},
  {id: 'en', title: 'English'},
]
export const BASE_LANGUAGE = 'fr'

/** Document types with one document per language, linked by the document-internationalization plugin. */
export const LOCALIZED_TYPES = ['project', 'growthCaseStudy', 'tool', 'insight', 'sector', 'category'] as const
export type LocalizedType = (typeof LOCALIZED_TYPES)[number]
