import { defineQuery } from "next-sanity";

const image = /* groq */ `{ alt, hotspot, crop, asset->{ _id, url, metadata { lqip, dimensions { width, height } } } }`;

/** Every localized document can point to its other-language versions for hreflang. */
const translations = /* groq */ `"translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{
  "language": language,
  "slug": value->slug.current
}`;

// ---------------------------------------------------------------- projects

const projectCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  sector,
  summary,
  services,
  coverImage ${image}
`;

export const PROJECTS_INDEX_QUERY = defineQuery(`
  *[_type == "project" && language == $lang && defined(slug.current)]
    | order(coalesce(order, 999) asc, title asc) { ${projectCard} }
`);

export const PROJECT_DETAIL_QUERY = defineQuery(`
  *[_type == "project" && language == $lang && slug.current == $slug][0]{
    ${projectCard},
    body[]{ ..., _type == "image" => ${image} },
    metrics[]{ _key, value, label },
    websiteUrl,
    logo ${image},
    gallery[]{ _key, ...${image} },
    showcase[]{ _key, ...${image} },
    testimonial { quote, name, role, photo ${image} },
    tools[]->{ _id, title, "slug": slug.current, logo ${image} },
    team[]->{ _id, name, role, photo ${image} },
    seo { title, description, image ${image} },
    ${translations},
    "related": *[_type == "project" && language == $lang && defined(slug.current) && slug.current != $slug]
      | order(coalesce(order, 999) asc)[0...3] { ${projectCard} }
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

// ---------------------------------------------------------------- insights

const insightCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  categories,
  publishedAt,
  author,
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
