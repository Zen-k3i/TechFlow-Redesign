import type {SortOrderingItem} from 'sanity'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {BlockquoteIcon} from '@sanity/icons/Blockquote'
import {CaseIcon} from '@sanity/icons/Case'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {UserIcon} from '@sanity/icons/User'
import {WrenchIcon} from '@sanity/icons/Wrench'
import {LANGUAGES, LOCALIZED_TYPES, type LocalizedType} from './languages'

const LOCALIZED: Record<LocalizedType, {title: string; icon: typeof CaseIcon; ordering: SortOrderingItem[]}> = {
  project: {title: 'Projects', icon: CaseIcon, ordering: [{field: 'order', direction: 'asc'}]},
  tool: {title: 'Tools', icon: WrenchIcon, ordering: [{field: 'order', direction: 'asc'}]},
  insight: {title: 'Articles', icon: DocumentTextIcon, ordering: [{field: 'publishedAt', direction: 'desc'}]},
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

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...LOCALIZED_TYPES.map((type) => localizedFolder(S, type)),
      S.divider(),
      S.documentTypeListItem('teamMember').title('Team members').icon(UserIcon),
      S.documentTypeListItem('review').title('Client reviews').icon(BlockquoteIcon),
    ])
