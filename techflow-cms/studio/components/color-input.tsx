import {set, unset, type StringInputProps} from 'sanity'

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
/** `<input type="color">` only takes #rrggbb. */
const full = (hex: string) => (hex.length === 4 ? `#${[...hex.slice(1)].map((c) => c + c).join('')}` : hex).toLowerCase()

/** Hex colour field with a clickable swatch (the browser's colour picker) next to the code. */
export function ColorInput(props: StringInputProps) {
  const {value, onChange, readOnly} = props
  const valid = typeof value === 'string' && HEX.test(value)
  return (
    <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
      <label
        title="Pick a colour"
        style={{
          position: 'relative',
          width: 36,
          height: 36,
          flexShrink: 0,
          borderRadius: 6,
          border: '1px solid var(--card-border-color, rgba(0,0,0,0.2))',
          background: valid ? value : 'repeating-conic-gradient(#ccc 0 25%, #fff 0 50%) 0 0 / 10px 10px',
          cursor: readOnly ? 'default' : 'pointer',
          overflow: 'hidden',
        }}
      >
        <input
          type="color"
          aria-label="Pick a colour"
          disabled={readOnly}
          value={valid ? full(value) : '#4791ff'}
          onChange={(e) => onChange(e.currentTarget.value ? set(e.currentTarget.value) : unset())}
          style={{position: 'absolute', inset: 0, opacity: 0, cursor: 'inherit'}}
        />
      </label>
      <div style={{flex: 1}}>{props.renderDefault(props)}</div>
    </div>
  )
}
