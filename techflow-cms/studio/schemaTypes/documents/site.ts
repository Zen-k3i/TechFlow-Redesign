import {defineArrayMember, defineField, defineType, type StringRule} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'
import {SearchIcon} from '@sanity/icons/Search'
import {LinkIcon} from '@sanity/icons/Link'
import {counterInput} from '../../components/seo-inputs'
import {STATIC_PAGES} from '../../site-routes'
import {languageField} from './shared'

/** Fixed id of the one Site settings document (opened from the Studio sidebar). */
export const SITE_SETTINGS_ID = 'siteSettings'

const description = (lang: 'Fr' | 'En', label: string) =>
  defineField({
    name: `defaultDescription${lang}`,
    title: `Default meta description (${label})`,
    description: 'Used by pages that have no description of their own.',
    type: 'text',
    rows: 3,
    group: 'seo',
    components: {input: counterInput(120, 160)},
  })

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'seo', title: 'SEO defaults', default: true},
    {name: 'organization', title: 'Organization'},
    {name: 'tracking', title: 'Google & analytics'},
  ],
  fields: [
    defineField({name: 'siteName', title: 'Site name', type: 'string', group: 'seo', initialValue: 'TechFlow', validation: (r) => r.required()}),
    defineField({
      name: 'titleTemplate',
      title: 'Title template',
      description: '%s is replaced by the page title. Not added to titles that already contain the site name, or when the result would pass 60 characters.',
      type: 'string',
      group: 'seo',
      initialValue: '%s | TechFlow',
      validation: (r) => r.required().custom((t?: string) => !t || t.includes('%s') || 'Must contain %s.'),
    }),
    description('Fr', 'French'),
    description('En', 'English'),
    defineField({
      name: 'defaultOgImage',
      title: 'Default social share image',
      description: '1200 × 630 px. Used when a page has no share image or main image.',
      type: 'image',
      options: {hotspot: true},
      group: 'seo',
    }),

    defineField({
      name: 'organization',
      title: 'Organization',
      description: 'Shown to Google as structured data (company name, logo, offices, profiles).',
      type: 'object',
      group: 'organization',
      fields: [
        defineField({name: 'name', title: 'Name', type: 'string'}),
        defineField({name: 'legalName', title: 'Legal name', type: 'string'}),
        defineField({name: 'description', title: 'Short description', type: 'text', rows: 3}),
        defineField({name: 'logo', title: 'Logo', description: 'Square or wide PNG on a light background.', type: 'image'}),
        defineField({name: 'email', title: 'Email', type: 'string', validation: (r) => r.email()}),
        defineField({
          name: 'locations',
          title: 'Offices',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'office',
              title: 'Office',
              type: 'object',
              fields: [
                defineField({name: 'name', title: 'Name', description: 'e.g. TechFlow Agency — Phnom Penh', type: 'string'}),
                defineField({name: 'street', title: 'Street', type: 'string'}),
                defineField({name: 'postalCode', title: 'Postal code', type: 'string'}),
                defineField({name: 'city', title: 'City', type: 'string'}),
                defineField({name: 'country', title: 'Country code', description: 'Two letters, e.g. KH, FR.', type: 'string', validation: (r) => r.length(2)}),
                defineField({name: 'phone', title: 'Phone', description: 'International format, e.g. +855-12-537-289.', type: 'string'}),
              ],
              preview: {select: {title: 'name', subtitle: 'city'}},
            }),
          ],
        }),
        defineField({
          name: 'sameAs',
          title: 'Social profiles',
          description: 'Full URLs: LinkedIn, Instagram, Webflow partner page…',
          type: 'array',
          of: [defineArrayMember({type: 'url'})],
        }),
      ],
    }),

    defineField({
      name: 'googleVerification',
      title: 'Google Search Console verification code',
      description: 'Only the code from the HTML tag method (content="…"), not the whole tag. Not needed if the domain is verified by DNS.',
      type: 'string',
      group: 'tracking',
    }),
    defineField({
      name: 'ga4Id',
      title: 'GA4 Measurement ID',
      description: 'G-XXXXXXXXXX. Not loaded yet: analytics go live together with the cookie banner.',
      type: 'string',
      group: 'tracking',
      validation: (r) => r.regex(/^G-[A-Z0-9]+$/).error('Looks like G-XXXXXXXXXX.'),
    }),
    defineField({
      name: 'gtmId',
      title: 'GTM container ID',
      description: 'GTM-XXXXXXX. Leave empty unless Google Tag Manager is used (then GA4 is set up inside GTM).',
      type: 'string',
      group: 'tracking',
      validation: (r) => r.regex(/^GTM-[A-Z0-9]+$/).error('Looks like GTM-XXXXXXX.'),
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})

/** SEO of a coded page (home, services, listings, legal), one document per page and language. */
export const pageSeo = defineType({
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'document',
  icon: SearchIcon,
  fields: [
    languageField,
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {list: STATIC_PAGES.map(({id, title}) => ({value: id, title}))},
      readOnly: ({document}) => Boolean(document?._createdAt),
      validation: (rule) =>
        rule.required().custom(async (page, {document, getClient}) => {
          if (!page || !document) return true
          const id = document._id.replace(/^drafts\./, '')
          const taken = await getClient({apiVersion: '2026-09-29'}).fetch<boolean>(
            `defined(*[_type == "pageSeo" && page == $page && language == $language && !(_id in [$id, $draft])][0]._id)`,
            {page, language: document.language ?? null, id, draft: `drafts.${id}`},
          )
          return taken ? 'This page already has SEO settings in this language.' : true
        }),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {page: 'page', language: 'language', title: 'seo.title'},
    prepare: ({page, language, title}) => ({
      title: `${STATIC_PAGES.find((p) => p.id === page)?.title ?? 'Page'} · ${(language ?? '').toUpperCase()}`,
      subtitle: title,
    }),
  },
})

const PATH = /^\/[a-z0-9\-._~%/]*$/i

const pathRule = (rule: StringRule) =>
  rule.required().custom((value?: string) => {
    if (!value) return 'Required'
    if (/^https?:\/\//.test(value)) return 'Only the path, e.g. /projets/old-name (no https://www…).'
    if (!PATH.test(value)) return 'Must start with / and contain no spaces, accents or ?query.'
    if (value.length > 1 && value.endsWith('/')) return 'No trailing slash.'
    return true
  })

/** An old URL sent to a new one. Loaded by the website at deploy time. */
export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: LinkIcon,
  description: 'Takes effect on the next deployment (automatic after publishing, about 2 minutes).',
  fields: [
    defineField({
      name: 'source',
      title: 'From (old path)',
      description: 'e.g. /projets/old-name or /en/projects/old-name',
      type: 'string',
      validation: (rule) => [
        pathRule(rule),
        rule.custom(async (source: string | undefined, {document, getClient}) => {
          if (!source || !document) return true
          const id = document._id.replace(/^drafts\./, '')
          const taken = await getClient({apiVersion: '2026-09-29'}).fetch<boolean>(
            `defined(*[_type == "redirect" && source == $source && !(_id in [$id, $draft])][0]._id)`,
            {source, id, draft: `drafts.${id}`},
          )
          return taken ? 'Another redirect already starts from this path.' : true
        }),
      ],
    }),
    defineField({
      name: 'destination',
      title: 'To (new path)',
      description: 'e.g. /projets/new-name. A full https:// URL is allowed for another site.',
      type: 'string',
      validation: (rule) => [
        rule.required().custom((value: string | undefined, {document}) => {
          if (!value) return 'Required'
          if (/^https:\/\//.test(value)) return true
          if (!PATH.test(value)) return 'Must start with / (or https://).'
          if (value === document?.source) return 'Same as the old path.'
          return true
        }),
        // Chains (A → B → C) slow pages down and lose ranking: point A straight at C.
        rule
          .custom(async (destination: string | undefined, {document, getClient}) => {
            if (!destination || !document) return true
            const next = await getClient({apiVersion: '2026-09-29'}).fetch<string | null>(
              `*[_type == "redirect" && source == $destination && !(_id in path("drafts.**"))][0].destination`,
              {destination},
            )
            return next ? `${destination} itself redirects to ${next}: use ${next} here.` : true
          })
          .warning(),
      ],
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)',
      description: 'Leave on for moved pages. Off = temporary (302/307), for short campaigns.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'note', title: 'Note', description: 'Why it exists (internal).', type: 'string'}),
  ],
  preview: {
    select: {source: 'source', destination: 'destination', permanent: 'permanent'},
    prepare: ({source, destination, permanent}) => ({
      title: `${source ?? '?'} → ${destination ?? '?'}`,
      subtitle: permanent === false ? 'Temporary' : 'Permanent (301)',
    }),
  },
})
