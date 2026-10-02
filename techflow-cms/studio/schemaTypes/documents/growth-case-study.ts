import {defineArrayMember, defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons/Rocket'
import {languageField, orderField, seoField, slugField} from './shared'
import {ColorInput} from '../../components/color-input'
import {sameLanguage} from './taxonomy'

/**
 * Growth marketing / sales funnel case study (social video ads → qualified leads). A separate
 * template from `project`: every section is optional and left out of the page when it is empty.
 * Results and testimonial values containing "TBD" are never shown on the site.
 */

const PLATFORMS = [
  {title: 'Instagram Reels', value: 'instagram'},
  {title: 'Facebook Reels', value: 'facebook'},
  {title: 'TikTok', value: 'tiktok'},
]

/** Where a funnel stage's "see how" link scrolls to. */
const SECTIONS = [
  {title: 'Creative & scripts', value: 'creative'},
  {title: 'Behind the scenes', value: 'gallery'},
  {title: 'The ads', value: 'ads'},
  {title: 'A/B testing', value: 'abTest'},
  {title: 'Lead flow', value: 'leads'},
  {title: 'Community', value: 'community'},
  {title: 'Results', value: 'results'},
]

const ICONS = [
  {title: 'Strategy (target)', value: 'strategy'},
  {title: 'Production (camera)', value: 'production'},
  {title: 'Launch & test (split)', value: 'launch'},
  {title: 'Optimize budget (chart)', value: 'optimize'},
  {title: 'Lead scoring (gauge)', value: 'score'},
  {title: 'Sales team (handshake)', value: 'sales'},
  {title: 'Community (chat)', value: 'community'},
]

const heading = (description = 'Wrap words in *asterisks* to set them in the accent colour.') =>
  defineField({name: 'heading', title: 'Heading', type: 'string', description})
const intro = defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3})

const labelValue = defineArrayMember({
  name: 'labelValue',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'value', title: 'Value', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

const strings = (name: string, title: string, description?: string) =>
  defineField({name, title, description, type: 'array', of: [defineArrayMember({type: 'string'})]})

export const growthCaseStudy = defineType({
  name: 'growthCaseStudy',
  title: 'Growth case study',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Hero & challenge', default: true},
    {name: 'details', title: 'Card, tags & team'},
    {name: 'media', title: 'Images'},
    {name: 'funnel', title: 'Funnel'},
    {name: 'ads', title: 'Ads & creative'},
    {name: 'proof', title: 'A/B, leads, community'},
    {name: 'results', title: 'Results & CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    languageField,
    defineField({name: 'title', title: 'Client name', type: 'string', group: 'content', validation: (r) => r.required()}),
    {...slugField, group: 'content'},
    defineField({
      name: 'accentColor',
      title: 'Template colour',
      description: 'Accent for the whole page (figures, funnel, glows). Choose a light, bright tone: it is shown on dark backgrounds.',
      type: 'string',
      group: 'content',
      initialValue: '#c9a45c',
      components: {input: ColorInput},
      validation: (rule) => rule.regex(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, {name: 'hex colour'}).error('Use a hex code like #c9a45c.'),
    }),
    defineField({
      name: 'handle',
      title: 'Social handle',
      description: 'Shown on the Instagram and TikTok overlays, without the @.',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'One or two sentences for the project cards and under the hero headline.',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'content',
      options: {collapsible: true},
      fields: [
        defineField({name: 'tagline', title: 'Service tag', description: 'e.g. "Growth marketing · Luxury real estate · Phnom Penh"', type: 'string'}),
        defineField({name: 'headline', title: 'Headline', description: 'One bold, outcome-driven line.', type: 'string'}),
        defineField({name: 'intro', title: 'Intro', type: 'text', rows: 4}),
        defineField({name: 'status', title: 'Live status', description: 'Pulsing label, e.g. "Campaign live". Leave empty to hide.', type: 'string'}),
        defineField({name: 'ctaLabel', title: 'Primary button', description: 'Goes to the contact page.', type: 'string'}),
        defineField({
          name: 'stats',
          title: 'Key figures',
          description: 'Up to 4 figures for "The campaign in 10 seconds" (what was delivered, not results).',
          type: 'array',
          of: [defineArrayMember({type: 'metric'})],
          validation: (r) => r.max(4),
        }),
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'The challenge',
      type: 'object',
      group: 'content',
      options: {collapsible: true},
      fields: [
        heading('Short and punchy. *Asterisks* set words in the accent colour.'),
        defineField({name: 'text', title: 'Text', description: '2–3 sentences: the business problem.', type: 'text', rows: 4}),
        defineField({name: 'points', title: 'Key constraints', type: 'array', of: [defineArrayMember({type: 'benefit'})], validation: (r) => r.max(3)}),
      ],
    }),
    defineField({
      name: 'client',
      title: 'Client card',
      type: 'object',
      group: 'content',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'meta', title: 'Details', description: 'Client, project, market, channels…', type: 'array', of: [labelValue]}),
        defineField({name: 'facts', title: 'Facts', description: 'Public facts about the client or product (with a source below).', type: 'array', of: [defineArrayMember({type: 'metric'})], validation: (r) => r.max(4)}),
        defineField({name: 'sourceLabel', title: 'Source name', type: 'string'}),
        defineField({name: 'sourceUrl', title: 'Source link', type: 'url'}),
      ],
    }),


    // ----- Same "details" as a project, so growth case studies sit in the same lists and filters.
    defineField({
      name: 'sectors',
      title: 'Sectors',
      description: 'Pick one or more from the list; used for the filters on the Projects page.',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'reference', to: [{type: 'sector'}], options: {filter: sameLanguage, disableNew: true}})],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      description: 'Tags on the card and in the hero, e.g. "Video ads", "A/B testing", "Lead scoring".',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'channels',
      title: 'Channels',
      description: 'Where the ads run.',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      options: {list: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'LinkedIn', 'Google'], layout: 'grid'},
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tool'}], options: {filter: sameLanguage}})],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'team',
      title: 'TechFlow team',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'reference', to: [{type: 'teamMember'}]})],
      validation: (r) => r.unique(),
    }),
    defineField({name: 'websiteUrl', title: 'Client website', type: 'url', group: 'details'}),
    {...orderField, group: 'details'},

    // ----- Images
    defineField({
      name: 'coverImage',
      title: 'Card image',
      description: 'Portrait visual for the project cards. Without it, a designed "growth" cover is used.',
      type: 'imageWithAlt',
      group: 'media',
    }),
    defineField({
      name: 'heroImage',
      title: 'Key visual',
      description: 'Photo or render of what is being sold, shown behind the phones in the hero (darkened). Also the share image if SEO has none.',
      type: 'imageWithAlt',
      group: 'media',
    }),
    defineField({
      name: 'logo',
      title: 'Client logo',
      description: 'Shown in the hero, and as the account avatar on the ad mockups.',
      type: 'image',
      group: 'media',
    }),
    defineField({
      name: 'logoFill',
      title: 'Logo has its own background',
      description: 'Show the logo edge to edge instead of on a white card.',
      type: 'boolean',
      group: 'media',
      hidden: ({document}) => !document?.logo,
    }),
    defineField({
      name: 'gallery',
      title: 'Behind the scenes',
      description: 'Photos from the shoot, the set or the edit. Shown as a strip after the creative section; captions come from the alt text.',
      type: 'object',
      group: 'media',
      fields: [
        heading(),
        intro,
        defineField({name: 'images', title: 'Photos', type: 'array', of: [defineArrayMember({type: 'imageWithAlt'})], options: {layout: 'grid'}}),
      ],
    }),

    defineField({
      name: 'funnel',
      title: 'Our approach (funnel)',
      type: 'object',
      group: 'funnel',
      fields: [
        heading(),
        intro,
        defineField({
          name: 'stages',
          title: 'Stages',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'funnelStage',
              type: 'object',
              fields: [
                defineField({name: 'name', title: 'Short name', description: 'One or two words, shown on the funnel.', type: 'string', validation: (r) => r.required()}),
                defineField({name: 'icon', title: 'Icon', type: 'string', options: {list: ICONS}}),
                defineField({name: 'title', title: 'Title', type: 'string'}),
                defineField({name: 'text', title: 'One-line explanation', type: 'text', rows: 2}),
                strings('tasks', 'What we do'),
                defineField({name: 'kpi', title: 'Measured by', type: 'string'}),
                defineField({name: 'section', title: 'Links to section', type: 'string', options: {list: SECTIONS}}),
              ],
              preview: {select: {title: 'name', subtitle: 'title'}},
            }),
          ],
          validation: (r) => r.max(7),
        }),
      ],
    }),

    defineField({
      name: 'creative',
      title: 'Creative & copywriting',
      type: 'object',
      group: 'ads',
      description: 'The hooks and the storyboards come from the ads below.',
      fields: [heading(), intro],
    }),
    defineField({
      name: 'adsSection',
      title: 'Ads section',
      type: 'object',
      group: 'ads',
      fields: [heading(), intro],
    }),
    defineField({
      name: 'ads',
      title: 'Video ads',
      type: 'array',
      group: 'ads',
      of: [
        defineArrayMember({
          name: 'adVideo',
          type: 'object',
          fieldsets: [{name: 'media', title: 'Media', options: {columns: 2}}],
          fields: [
            defineField({name: 'angle', title: 'Angle', description: 'The reason to buy it plays on, e.g. "The view".', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'hook', title: 'Hook line', description: 'The first 3 seconds.', type: 'string'}),
            defineField({name: 'caption', title: 'Ad caption', type: 'text', rows: 2}),
            defineField({name: 'cta', title: 'Ad button', description: 'e.g. "Learn more", "Book a visit".', type: 'string'}),
            defineField({name: 'platform', title: 'Platform', type: 'string', options: {list: PLATFORMS, layout: 'radio', direction: 'horizontal'}, initialValue: 'instagram'}),
            defineField({name: 'variant', title: 'Variant label', description: 'e.g. "Variant A" or "Hook test".', type: 'string'}),
            defineField({name: 'note', title: 'What it tested', type: 'text', rows: 2}),
            defineField({name: 'duration', title: 'Duration', description: 'e.g. 0:58', type: 'string'}),
            defineField({
              name: 'video',
              title: 'Video file',
              description: 'Vertical 9:16 MP4 (H.264), ideally under 20 MB. Without it, a designed poster with the hook is shown.',
              type: 'file',
              fieldset: 'media',
              options: {accept: 'video/mp4,video/webm'},
            }),
            defineField({name: 'poster', title: 'Poster image', description: '9:16 still shown before the video plays.', type: 'image', fieldset: 'media'}),
            defineField({name: 'captions', title: 'Subtitles (.vtt)', type: 'file', options: {accept: '.vtt,text/vtt'}}),
            defineField({
              name: 'script',
              title: 'Script beats',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'scriptBeat',
                  type: 'object',
                  fields: [
                    defineField({name: 'time', title: 'Time', description: 'e.g. 0–3 s', type: 'string'}),
                    defineField({name: 'beat', title: 'Beat', description: 'Hook, Desire, Proof, Action…', type: 'string'}),
                    defineField({name: 'line', title: 'What happens', type: 'text', rows: 2}),
                  ],
                  preview: {select: {title: 'beat', subtitle: 'line'}},
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'angle', subtitle: 'hook', media: 'poster'},
          },
        }),
      ],
    }),

    defineField({
      name: 'abTest',
      title: 'A/B testing & budget',
      type: 'object',
      group: 'proof',
      fields: [
        heading(),
        intro,
        defineField({
          name: 'illustrative',
          title: 'Illustrative data',
          description: 'Shows an "Illustrative example" label on the chart. Untick only when the figures below are real campaign data.',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'variants',
          title: 'Variants',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'abVariant',
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Label', description: 'A, B, C…', type: 'string', validation: (r) => r.required()}),
                defineField({name: 'hook', title: 'Hook', type: 'string'}),
                defineField({name: 'angle', title: 'Angle', type: 'string'}),
              ],
              preview: {select: {title: 'label', subtitle: 'hook'}},
            }),
          ],
          validation: (r) => r.max(4),
        }),
        defineField({
          name: 'weeks',
          title: 'Weeks',
          description: 'One entry per week. Budget shares and cost per lead are listed in the same order as the variants.',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'abWeek',
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Label', description: 'e.g. W1', type: 'string'}),
                defineField({name: 'budget', title: 'Budget share (%) per variant', type: 'array', of: [defineArrayMember({type: 'number'})]}),
                defineField({name: 'cpl', title: 'Relative cost per lead per variant', description: '1 = baseline, 0 = paused.', type: 'array', of: [defineArrayMember({type: 'number'})]}),
                defineField({name: 'note', title: 'What happened', type: 'text', rows: 2}),
              ],
              preview: {select: {title: 'label', subtitle: 'note'}},
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'leads',
      title: 'Lead generation & scoring',
      type: 'object',
      group: 'proof',
      fields: [
        heading(),
        intro,
        defineField({
          name: 'flow',
          title: 'Flow steps',
          description: 'Ad click → form → score → sales team.',
          type: 'array',
          of: [defineArrayMember({type: 'benefit'})],
          validation: (r) => r.max(5),
        }),
        defineField({
          name: 'criteria',
          title: 'Scoring grid',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'scoreCriterion',
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Criterion', type: 'string', validation: (r) => r.required()}),
                defineField({name: 'points', title: 'Points', type: 'number', validation: (r) => r.min(0).max(100)}),
              ],
              preview: {select: {title: 'label', subtitle: 'points'}},
            }),
          ],
        }),
        defineField({
          name: 'sampleLeads',
          title: 'Example leads',
          description: 'Fictional leads sorted into hot (70+), warm (40–69) and cold.',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'sampleLead',
              type: 'object',
              fields: [
                defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
                defineField({name: 'source', title: 'Source ad', type: 'string'}),
                defineField({name: 'interest', title: 'Interest', type: 'string'}),
                defineField({name: 'score', title: 'Score (0–100)', type: 'number', validation: (r) => r.required().min(0).max(100)}),
              ],
              preview: {select: {title: 'name', subtitle: 'score'}},
            }),
          ],
        }),
        defineField({
          name: 'tiers',
          title: 'What happens to each tier',
          type: 'object',
          options: {columns: 3},
          fields: [
            defineField({name: 'hot', title: 'Hot', type: 'string'}),
            defineField({name: 'warm', title: 'Warm', type: 'string'}),
            defineField({name: 'cold', title: 'Cold', type: 'string'}),
          ],
        }),
        defineField({name: 'note', title: 'Small print', description: 'e.g. "Example grid. Criteria are set with your sales team."', type: 'string'}),
      ],
    }),

    defineField({
      name: 'community',
      title: 'Community management',
      type: 'object',
      group: 'proof',
      fields: [
        heading(),
        intro,
        defineField({name: 'perWeek', title: 'Posts per week', type: 'number'}),
        defineField({
          name: 'calendar',
          title: 'Typical week',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'calendarPost',
              type: 'object',
              fields: [
                defineField({name: 'day', title: 'Day', type: 'string', options: {list: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']}}),
                defineField({name: 'format', title: 'Format', description: 'Reel, Carousel…', type: 'string'}),
                defineField({name: 'title', title: 'Topic', type: 'string'}),
              ],
              preview: {select: {title: 'title', subtitle: 'day'}},
            }),
          ],
        }),
        defineField({
          name: 'posts',
          title: 'Profile grid images',
          description: 'Square post visuals for the profile mockup. Ad posters are used when empty.',
          type: 'array',
          of: [defineArrayMember({type: 'image'})],
          options: {layout: 'grid'},
          validation: (r) => r.max(9),
        }),
        defineField({
          name: 'thread',
          title: 'Example comments',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'commentReply',
              type: 'object',
              fields: [
                defineField({name: 'author', title: 'Commenter', type: 'string'}),
                defineField({name: 'text', title: 'Comment', type: 'string'}),
                defineField({name: 'reply', title: 'Our reply', type: 'string'}),
              ],
              preview: {select: {title: 'text', subtitle: 'reply'}},
            }),
          ],
          validation: (r) => r.max(4),
        }),
      ],
    }),

    defineField({
      name: 'results',
      title: 'Results',
      type: 'object',
      group: 'results',
      fields: [
        heading(),
        defineField({
          name: 'metrics',
          title: 'Metrics',
          description: 'Value with its prefix/suffix, e.g. "1 240", "$4.80", "38%". Figures containing "TBD" are hidden on the site.',
          type: 'array',
          of: [defineArrayMember({type: 'metric'})],
          validation: (r) => r.max(6),
        }),
        strings('tracked', 'Tracked KPIs', 'Shown instead of the figures while none are published.'),
        defineField({name: 'testimonial', title: 'Client testimonial', description: 'Hidden while the quote is empty or contains "TBD".', type: 'testimonial'}),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Deliverables & final CTA',
      type: 'object',
      group: 'results',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        heading(),
        defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
        strings('deliverables', 'Deliverables checklist'),
      ],
    }),
    defineField({
      name: 'next',
      title: 'Next case study',
      description: 'Defaults to the first project in the list.',
      type: 'reference',
      group: 'results',
      to: [{type: 'project'}, {type: 'growthCaseStudy'}],
      options: {filter: ({document}) => ({filter: 'language == $lang', params: {lang: document.language ?? 'fr'}})},
    }),

    {...seoField, group: 'seo'},
  ],
  preview: {
    select: {title: 'title', subtitle: 'hero.tagline', language: 'language', media: 'coverImage'},
    prepare: ({title, subtitle, language, media}) => ({
      title,
      subtitle: [language?.toUpperCase(), subtitle].filter(Boolean).join(' · '),
      media,
    }),
  },
})
