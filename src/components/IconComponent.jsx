// ...existing code...
import { Icons } from './Icons.jsx' 

export default function IconComponent ({
  name,
  type = 'light',
  size = 2.4,
  className,
  onClick
}) {
  if (!name) return null

  const key = String(name).trim().toLowerCase()
  const typeKey = String(type).trim().toLowerCase()

  const iconSet = Icons[key]

  if (!iconSet) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  const src = iconSet[typeKey] || iconSet.light || Object.values(iconSet)[0]

  if (!src) {
    console.warn(`No source found for icon "${name}"`)
    return null
  }

  const computedSize = typeof size === 'number' ? `${size}rem` : size

  return (
    <img
      src={src}
      alt={`${typeKey} ${key}`}
      className={className}
      onClick={onClick}
      style={{
        width: computedSize,
        height: computedSize,
        objectFit: 'contain',
      }}
    />
  )
}
