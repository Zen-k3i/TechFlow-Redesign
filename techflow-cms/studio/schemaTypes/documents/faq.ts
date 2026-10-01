import {defineArrayMember, defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {languageField} from './shared'

/** Pages that show an FAQ; each has one FAQ document per language. */
export const FAQ_PAGES = [
  {id: 'home', title: 'Home'},
  {id: 'services', title: 'Services'},
  {id: 'design', title: 'Design'},
  {id: 'development', title: 'Development'},
  {id: 'aiAgents', title: 'AI agents'},
  {id: 'salesFunnel', title: 'Sales funnel'},
] as const

/** The questions and answers shown in a page's FAQ section. */
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    languageField,
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {list: FAQ_PAGES.map(({id, title}) => ({value: id, title}))},
      readOnly: ({document}) => Boolean(document?._createdAt),
      validation: (rule) =>
        rule.required().custom(async (page, {document, getClient}) => {
          if (!page || !document) return true
          const id = document._id.replace(/^drafts\./, '')
          const taken = await getClient({apiVersion: '2026-09-29'}).fetch<boolean>(
            `defined(*[_type == "faq" && page == $page && language == $language && !(_id in [$id, $draft])][0]._id)`,
            {page, language: document.language ?? null, id, draft: `drafts.${id}`},
          )
          return taken ? 'This page already has an FAQ in this language.' : true
        }),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'Wrap words in *asterisks* to show them in the accent style.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      title: 'Questions',
      description: 'Drag to reorder. The first question is shown open.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'faqItem',
          title: 'Question',
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (r) => r.required()}),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    select: {page: 'page', language: 'language', items: 'items'},
    prepare: ({page, language, items}) => ({
      title: `${FAQ_PAGES.find((p) => p.id === page)?.title ?? 'FAQ'} · ${(language ?? '').toUpperCase()}`,
      subtitle: `${Object.keys(items ?? {}).length} questions`,
    }),
  },
})
