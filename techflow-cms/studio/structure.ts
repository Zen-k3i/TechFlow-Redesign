import type {SortOrderingItem} from 'sanity'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {CaseIcon} from '@sanity/icons/Case'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {UserIcon} from '@sanity/icons/User'
import {WrenchIcon} from '@sanity/icons/Wrench'
import {PinIcon} from '@sanity/icons/Pin'
import {TagIcon} from '@sanity/icons/Tag'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {LANGUAGES, LOCALIZED_TYPES, type LocalizedType} from './languages'
import {FAQ_PAGES} from './schemaTypes/documents/faq'

const LOCALIZED: Record<LocalizedType, {title: string; icon: typeof CaseIcon; ordering: SortOrderingItem[]}> = {
  project: {title: 'Projects', icon: CaseIcon, ordering: [{field: 'order', direction: 'asc'}]},
  tool: {title: 'Tools', icon: WrenchIcon, ordering: [{field: 'order', direction: 'asc'}]},
  insight: {title: 'Articles', icon: DocumentTextIcon, ordering: [{field: 'publishedAt', direction: 'desc'}]},
  sector: {title: 'Sectors', icon: PinIcon, ordering: [{field: 'title', direction: 'asc'}]},
  category: {title: 'Article categories', icon: TagIcon, ordering: [{field: 'title', direction: 'asc'}]},
}

/** A folder per localized type, holding one list per language; new documents start in that language. */
function localizedFolder(S: StructureBuilder, type: LocalizedType) {
  const {title, icon, ordering} = LOCALIZED[type]
  return S.listItem()
    .id(type)
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .id(type)
        .title(title)
        .items(
          LANGUAGES.map((lang) =>
            S.listItem()
              .id(`${type}-${lang.id}`)
              .title(`${lang.title} (${lang.id.toUpperCase()})`)
              .icon(icon)
              .child(
                S.documentTypeList(type)
                  .id(`${type}-${lang.id}`)
                  .title(`${title} · ${lang.id.toUpperCase()}`)
                  .filter('_type == $type && language == $lang')
                  .params({type, lang: lang.id})
                  .defaultOrdering(ordering)
                  .initialValueTemplates([S.initialValueTemplateItem(`${type}-${lang.id}`)]),
              ),
          ),
        ),
    )
}

/** FAQ folder with one sub-folder per page, each holding that page's French and English FAQ. */
function faqFolder(S: StructureBuilder) {
  return S.listItem()
    .id('faq')
    .title('FAQ')
    .icon(HelpCircleIcon)
    .child(
      S.list()
        .id('faq')
        .title('FAQ by page')
        .items(
          FAQ_PAGES.map((page) =>
            S.listItem()
              .id(`faq-${page.id}`)
              .title(page.title)
              .icon(HelpCircleIcon)
              .child(
                S.documentTypeList('faq')
                  .id(`faq-${page.id}`)
                  .title(`FAQ · ${page.title}`)
                  .filter('_type == "faq" && page == $page')
                  .params({page: page.id})
                  .initialValueTemplates(LANGUAGES.map((lang) => S.initialValueTemplateItem(`faq-${page.id}-${lang.id}`))),
              ),
          ),
        ),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...LOCALIZED_TYPES.map((type) => localizedFolder(S, type)),
      faqFolder(S),
      S.divider(),
      S.documentTypeListItem('teamMember').title('Team members').icon(UserIcon),
      S.documentTypeListItem('review').title('Client reviews').icon(BlockquoteIcon),
    ])
