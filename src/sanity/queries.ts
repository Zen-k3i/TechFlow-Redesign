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
  // Picked in the Studio from the Sectors list (one or more).
  "sectors": array::compact(sectors[]->title),
  "sector": sectors[0]->title,
  // "Template colour" in the Studio: the project's accent on its card and case study.
  accentColor,
  summary,
  services,
  websiteUrl,
  // Growth case studies without a card image use their key visual.
  "coverImage": coalesce(coverImage, select(_type == "growthCaseStudy" => heroImage)) ${image},
  // Card hover stack: website screens (also the /projets wall), or a growth case study's "Card hover" images.
  "previews": select(
    _type == "project" => [heroImage, heroSide1, heroSide2][defined(asset)]{ "_key": asset._ref, ...${image} },
    [hoverImage1, hoverImage2, hoverImage3][defined(asset)]{ "_key": asset._ref, ...${image} }
  ),
  // Growth case studies without hover images stack their first ads as phones instead.
  "phones": select(_type == "growthCaseStudy" => ads[0...3]{ _key, angle, hook, "poster": poster.asset->url }, [])
`;

/** Website projects and growth case studies together: same cards, same sector filters. */
export const PROJECTS_INDEX_QUERY = defineQuery(`
  *[_type in ["project", "growthCaseStudy"] && language == $lang && defined(slug.current)]
    | order(coalesce(order, 999) asc, title asc) { _type, ${projectCard} }
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
    "gallery": ${heroMosaic}[defined(asset)]{ "_key": asset._ref, ...${image} },
    testimonial { quote, name, role, photo ${image} },
    tools[]->{ _id, title, "slug": slug.current, logo ${image} },
    team[]->{ _id, name, role, photo ${image} },
    seo { title, description, image ${image} },
    ${translations},
    "related": *[_type in ["project", "growthCaseStudy"] && language == $lang && defined(slug.current) && slug.current != $slug]
      | order(coalesce(order, 999) asc)[0...3] { _type, ${projectCard} }
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

// ---------------------------------------------------------------- growth case studies

/** Growth marketing case study (video ads → qualified leads), its own template at /projets/<slug>. */
export const GROWTH_CASE_STUDY_QUERY = defineQuery(`
  *[_type == "growthCaseStudy" && language == $lang && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    accentColor,
    summary,
    // "Service tag": sectors picked in the Studio, shown joined in the hero pill.
    hero { "tags": array::compact(tags[]->title), headline, status, ctaLabel, stats[]{ _key, value, label } },
    // Same story as a website case study: chapters at each h2, image groups between paragraphs.
    body[]{
      ...,
      _type == "image" => ${image},
      _type == "imageGroup" => { images[]{ _key, ...${image} } }
    },
    "minutes": round(length(string::split(pt::text(body), " ")) / 220),
    results { metrics[]{ _key, value, label } },
    handle,
    adsSection { heading, intro },
    ads[]{
      _key, angle, hook, caption, cta, platform, note, duration,
      "video": video.asset->url,
      poster ${image},
      "captions": captions.asset->url
    },
    "sectors": array::compact(sectors[]->title),
    services,
    channels,
    websiteUrl,
    tools[]->{ _id, title, "slug": slug.current, logo ${image} },
    team[]->{ _id, name, role, photo ${image} },
    logo ${image},
    "logoFill": coalesce(logoFill, logo.asset->metadata.isOpaque, false),
    heroImage ${image},
    // The chosen next case study first, then the others in list order (deduplicated in the page).
    "related": [
      ...select(defined(next) => [next->{ _type, ${projectCard} }], []),
      ...*[_type in ["project", "growthCaseStudy"] && language == $lang && defined(slug.current) && slug.current != $slug]
        | order(coalesce(order, 999) asc)[0...4]{ _type, ${projectCard} }
    ],
    seo { title, description, image ${image} },
    ${translations}
  }
`);

export const GROWTH_SLUGS_QUERY = defineQuery(`
  *[_type == "growthCaseStudy" && language == $lang && defined(slug.current)].slug.current
`);

/** Growth case studies for the project listings (cards are coded locally, so only what links to them). */
export const GROWTH_INDEX_QUERY = defineQuery(`
  *[_type == "growthCaseStudy" && language == $lang && defined(slug.current)] | order(coalesce(order, 999) asc){
    "slug": slug.current, title, accentColor
  }
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
  // Picked in the Studio from the Article categories list (the field is named "topics").
  "categories": array::compact(topics[]->title),
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
  *[_type in ["project", "growthCaseStudy", "tool", "insight"] && defined(slug.current) && defined(language)]{
    _type,
    language,
    "slug": slug.current,
    _updatedAt
  }
`);
