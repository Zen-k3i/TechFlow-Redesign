import {growthCaseStudy} from './documents/growth-case-study'
import {insight} from './documents/insight'
import {project} from './documents/project'
import {review} from './documents/review'
import {category, sector} from './documents/taxonomy'
import {faq} from './documents/faq'
import {teamMember} from './documents/team-member'
import {tool} from './documents/tool'
import {pageSeo, redirect, siteSettings} from './documents/site'
import {blockContent} from './objects/block-content'
import {benefit, imageWithAlt, metric, seo, testimonial} from './objects/shared'

export const schemaTypes = [
  project,
  growthCaseStudy,
  tool,
  insight,
  teamMember,
  review,
  sector,
  category,
  faq,
  siteSettings,
  pageSeo,
  redirect,
  blockContent,
  imageWithAlt,
  metric,
  testimonial,
  benefit,
  seo,
]
