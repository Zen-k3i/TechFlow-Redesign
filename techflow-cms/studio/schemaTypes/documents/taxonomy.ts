import {defineField, defineType, type ReferenceFilterResolver} from 'sanity'
import {PinIcon} from '@sanity/icons/Pin'
import {TagIcon} from '@sanity/icons/Tag'
import {languageField} from './shared'

const titleField = defineField({name: 'title', title: 'Name', type: 'string', validation: (r) => r.required()})
const preview = {
  select: {title: 'title', language: 'language'},
  prepare: ({title, language}: {title?: string; language?: string}) => ({title, subtitle: language?.toUpperCase()}),
}

/** Business sector of a case study ("Finance & Juridique", "Musique"…), picked from a dropdown on projects. */
export const sector = defineType({
  name: 'sector',
  title: 'Sector',
  type: 'document',
  icon: PinIcon,
  fields: [languageField, titleField],
  preview,
})

/** Topic of an article ("Digital Marketing", "AI & Automation"…), picked from a dropdown on articles. */
export const category = defineType({
  name: 'category',
  title: 'Article category',
  type: 'document',
  icon: TagIcon,
  fields: [languageField, titleField],
  preview,
})

/** Reference dropdowns only offer entries in the document's own language. */
export const sameLanguage: ReferenceFilterResolver = ({document}) => ({
  filter: 'language == $language',
  params: {language: document.language ?? 'fr'},
})
