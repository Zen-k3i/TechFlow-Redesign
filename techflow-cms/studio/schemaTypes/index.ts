import {insight} from './documents/insight'
import {project} from './documents/project'
import {review} from './documents/review'
import {teamMember} from './documents/team-member'
import {tool} from './documents/tool'
import {blockContent} from './objects/block-content'
import {benefit, imageWithAlt, metric, seo, testimonial} from './objects/shared'

export const schemaTypes = [
  project,
  tool,
  insight,
  teamMember,
  review,
  blockContent,
  imageWithAlt,
  metric,
  testimonial,
  benefit,
  seo,
]
