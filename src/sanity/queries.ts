import { defineQuery } from "next-sanity";

const image = /* groq */ `{ alt, hotspot, crop, asset->{ _id, url, metadata { lqip, dimensions { width, height } } } }`;

/** Every localized document can point to its other-language versions for hreflang. */
const translations = /* groq */ `"translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{
  "language": language,
  "slug": value->slug.current
}`;

// ---------------------------------------------------------------- projects

/** Header mosaic in reading order: four sides, the hero image in the middle, four sides. */
const heroMosaic = /* groq */ `[heroSide1, heroSide2, heroSide3, heroSide4, heroImage, heroSide5, heroSide6, heroSide7, heroSide8]`;

const projectCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  // Picked from the Sector list; older documents held the name as text.
  "sector": coalesce(sector->title, string(sector)),
  summary,
  services,
  websiteUrl,
  coverImage ${image},
  "previews": [heroImage, heroSide1, heroSide2][defined(asset)]{ "_key": asset._ref, ...${image} }
`;

export const PROJECTS_INDEX_QUERY = defineQuery(`
  *[_type == "project" && language == $lang && defined(slug.current)]
    | order(coalesce(order, 999) asc, title asc) { ${projectCard} }
`);

export const PROJECT_DETAIL_QUERY = defineQuery(`
  *[_type == "project" && language == $lang && slug.current == $slug][0]{
    ${projectCard},
    body[]{
      ...,
      _type == "image" => ${image},
      _type == "imageGroup" => { images[]{ _key, ...${image} } }
    },
    "minutes": round(length(string::split(pt::text(body), " ")) / 220),
    metrics[]{ _key, value, label },
    logo ${image},
    "logoFill": coalesce(logoFill, logo.asset->metadata.isOpaque, false),
    accentColor,
    "gallery": ${heroMosaic}[defined(asset)]{ "_key": asset._ref, ...${image} },
    testimonial { quote, name, role, photo ${image} },
    tools[]->{ _id, title, "slug": slug.current, logo ${image} },
    team[]->{ _id, name, role, photo ${image} },
    seo { title, description, image ${image} },
    ${translations},
    "related": *[_type == "project" && language == $lang && defined(slug.current) && slug.current != $slug]
      | order(coalesce(order, 999) asc)[0...3] { ${projectCard} }
  }
`);

// ---------------------------------------------------------------- filter lists

/** Sector names editors manage in the Studio (Sectors folder), for the projects filter. */
export const SECTORS_QUERY = defineQuery(`
  *[_type == "sector" && language == $lang && defined(title)] | order(title asc).title
`);

/** Article category names editors manage in the Studio (Article categories folder), for the insights filter. */
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && language == $lang && defined(title)] | order(title asc).title
`);

// ---------------------------------------------------------------- FAQ

/** A page's FAQ (home, services, design, development, aiAgents, salesFunnel) in one language. */
export const FAQ_QUERY = defineQuery(`
  *[_type == "faq" && page == $page && language == $lang][0]{
    heading,
    intro,
    "items": items[defined(question) && defined(answer)]{ _key, "q": question, "a": answer }
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && language == $lang && defined(slug.current)].slug.current
`);

// ---------------------------------------------------------------- tools

const toolCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  intro,
  logo ${image}
`;

export const TOOLS_INDEX_QUERY = defineQuery(`
  *[_type == "tool" && language == $lang && defined(slug.current)]
    | order(coalesce(order, 999) asc, title asc) { ${toolCard} }
`);

export const TOOL_DETAIL_QUERY = defineQuery(`
  *[_type == "tool" && language == $lang && slug.current == $slug][0]{
    ${toolCard},
    benefitsTitle,
    benefitsIntro,
    benefits[]{ _key, title, text },
    seo { title, description },
    ${translations},
    "projects": *[_type == "project" && language == $lang && references(^._id)]
      | order(coalesce(order, 999) asc) { ${projectCard} },
    "others": *[_type == "tool" && language == $lang && defined(slug.current) && slug.current != $slug]
      | order(coalesce(order, 999) asc)[0...8] { ${toolCard} }
  }
`);

export const TOOL_SLUGS_QUERY = defineQuery(`
  *[_type == "tool" && language == $lang && defined(slug.current)].slug.current
`);

// ---------------------------------------------------------------- team

const member = /* groq */ `
  _id,
  name,
  role,
  linkedin,
  photo ${image}
`;

export const TEAM_QUERY = defineQuery(`
  *[_type == "teamMember" && defined(photo.asset)]
    | order(coalesce(order, 999) asc, name asc) { ${member} }
`);

// ---------------------------------------------------------------- reviews

export const REVIEWS_QUERY = defineQuery(`
  *[_type == "review" && defined(quote)] | order(coalesce(order, 999) asc, name asc) {
    _id,
    quote,
    name,
    role,
    photo ${image}
  }
`);

// ---------------------------------------------------------------- insights

const insightCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  // Picked from the Article categories list; older documents held the names as text.
  "categories": array::compact(select(defined(categories[0]._ref) => categories[]->title, string::split(array::join(categories, "|"), "|"))),
  publishedAt,
  author->{ ${member} },
  coverImage ${image},
  "minutes": round(length(string::split(pt::text(body), " ")) / 220)
`;

export const INSIGHTS_INDEX_QUERY = defineQuery(`
  *[_type == "insight" && language == $lang && defined(slug.current)]
    | order(publishedAt desc) { ${insightCard} }
`);

export const INSIGHT_DETAIL_QUERY = defineQuery(`
  *[_type == "insight" && language == $lang && slug.current == $slug][0]{
    ${insightCard},
    body[]{ ..., _type == "image" => ${image} },
    seo { title, description },
    ${translations},
    "related": *[_type == "insight" && language == $lang && defined(slug.current) && slug.current != $slug]
      | order(publishedAt desc)[0...2] { ${insightCard} }
  }
`);

export const INSIGHT_SLUGS_QUERY = defineQuery(`
  *[_type == "insight" && language == $lang && defined(slug.current)].slug.current
`);

// ---------------------------------------------------------------- redirects

/** A document with this slug in any language, for URLs that point at the wrong locale. */
export const SLUG_LOOKUP_QUERY = defineQuery(`
  *[_type == $type && slug.current == $slug][0]{
    language,
    ${translations}
  }
`);

// ---------------------------------------------------------------- sitemap

export const SITEMAP_QUERY = defineQuery(`
  *[_type in ["project", "tool", "insight"] && defined(slug.current) && defined(language)]{
    _type,
    language,
    "slug": slug.current,
    _updatedAt
  }
`);
