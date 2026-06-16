const ADDRESS_PLACEHOLDER = '—'

function resolveMapsQuery(address: string, companyName: string): string {
  const trimmed = address.trim()
  if (trimmed && trimmed !== ADDRESS_PLACEHOLDER) return trimmed
  return `${companyName}, Saudi Arabia`
}

export function getMapsEmbedUrl(options: { address: string; companyName: string }): string {
  const fromEnv = import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL?.trim()
  if (fromEnv) return fromEnv

  const query = resolveMapsQuery(options.address, options.companyName)
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`
}

export function getMapsSearchUrl(options: { address: string; companyName: string }): string {
  const query = resolveMapsQuery(options.address, options.companyName)
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
