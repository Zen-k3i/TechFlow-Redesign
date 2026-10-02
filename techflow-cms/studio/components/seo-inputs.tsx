import {useEffect, useState} from 'react'
import {useClient, useFormValue, type BooleanInputProps, type ObjectInputProps, type StringInputProps} from 'sanity'
import {pagePath, SITE_URL} from '../site-routes'

const WARN = '#b26b00'
const DANGER = '#c62828'
const OK = '#2e7d32'

/** The page's full title as Google shows it: the template is added unless the title already names the site. */
export function withTemplate(title: string, template: string, siteName: string) {
  if (!title) return ''
  if (!template.includes('%s') || title.toLowerCase().includes(siteName.toLowerCase())) return title
  // Same rule as the website (src/sanity/seo.ts): no suffix when it would pass 60 characters.
  const full = template.replace('%s', title)
  return full.length > 60 ? title : full
}

/** Text or textarea input with a live character count, coloured outside the recommended range. */
export function counterInput(min: number, max: number) {
  return function CounterInput(props: StringInputProps) {
    const length = typeof props.value === 'string' ? props.value.length : 0
    const outside = length > 0 && (length < min || length > max)
    return (
      <div style={{display: 'grid', gap: 6}}>
        {props.renderDefault(props)}
        <div style={{fontSize: 12, textAlign: 'right', color: length === 0 ? 'inherit' : outside ? WARN : OK, opacity: length ? 1 : 0.6}}>
          {length} characters · aim for {min ? `${min}–` : 'up to '}
          {max}
        </div>
      </div>
    )
  }
}

/** Default boolean switch, plus a red banner while it is on. */
export function NoIndexInput(props: BooleanInputProps) {
  return (
    <div style={{display: 'grid', gap: 8}}>
      {props.renderDefault(props)}
      {props.value ? (
        <div
          role="alert"
          style={{padding: '10px 12px', borderRadius: 6, background: 'rgba(198,40,40,0.1)', border: `1px solid ${DANGER}`, color: DANGER, fontSize: 13, fontWeight: 600}}
        >
          This page will be hidden from Google. It is also left out of the sitemap.
        </div>
      ) : null}
    </div>
  )
}

type SeoValue = {title?: string; description?: string}
type Settings = {titleTemplate?: string; siteName?: string; defaultDescriptionFr?: string; defaultDescriptionEn?: string}

/** The SEO fields with a Google result preview above them, using the same fallbacks as the website. */
export function SeoInput(props: ObjectInputProps) {
  const value = (props.value ?? {}) as SeoValue
  const type = useFormValue(['_type']) as string | undefined
  const docTitle = useFormValue(['title']) as string | undefined
  const summary = useFormValue(['summary']) as string | undefined
  const excerpt = useFormValue(['excerpt']) as string | undefined
  const intro = useFormValue(['intro']) as string | undefined
  const slug = (useFormValue(['slug']) as {current?: string} | undefined)?.current
  const page = useFormValue(['page']) as string | undefined
  const language = (useFormValue(['language']) as string | undefined) ?? 'fr'

  const client = useClient({apiVersion: '2026-09-29'})
  const [settings, setSettings] = useState<Settings>({})
  useEffect(() => {
    const sub = client
      .observable.fetch<Settings | null>(`*[_id == "siteSettings"][0]{titleTemplate, siteName, defaultDescriptionFr, defaultDescriptionEn}`)
      .subscribe((s) => setSettings(s ?? {}))
    return () => sub.unsubscribe()
  }, [client])

  const siteName = settings.siteName || 'TechFlow'
  const title = withTemplate(value.title || docTitle || '', settings.titleTemplate || '%s | TechFlow', siteName)
  const description =
    value.description || summary || excerpt || intro || (language === 'en' ? settings.defaultDescriptionEn : settings.defaultDescriptionFr) || ''
  const path = pagePath(type, language, slug, page)
  const url = [SITE_URL.replace('https://', ''), ...path.split('/').filter(Boolean)].join(' › ')

  return (
    <div style={{display: 'grid', gap: 20}}>
      <div style={{border: '1px solid var(--card-border-color, rgba(0,0,0,0.15))', borderRadius: 8, padding: 16, background: '#fff'}}>
        <div style={{fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, color: '#70757a', marginBottom: 10}}>
          Google preview{value.title ? '' : ' (using the fallback title)'}
        </div>
        <div style={{fontFamily: 'arial, sans-serif', maxWidth: 600}}>
          <div style={{fontSize: 14, color: '#202124', lineHeight: '20px'}}>{url}</div>
          <div
            style={{fontSize: 20, color: '#1a0dab', lineHeight: '26px', margin: '4px 0 3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
          >
            {title || 'Page title'}
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#4d5156',
              lineHeight: '22px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description || 'No description yet: Google will pick text from the page.'}
          </div>
        </div>
      </div>
      {props.renderDefault(props)}
    </div>
  )
}
