import type { PackageItem } from '../../../../services/packages'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://alimanrouh-api-production.up.railway.app'

export function getPackageImageUrl(path: string | null | undefined, fallback: string) {
  if (!path) return fallback
  if (path.startsWith('http')) return path
  return `${API_BASE_URL}${path}`
}

// Packages from the API carry no program type, so Hajj programs are recognised by title.
// Arabic uses whitespace boundaries because `\b` does not work for Arabic letters (and "الحجز" contains "حج").
export function isHajjPackage(pkg: PackageItem) {
  return /\bhajj\b/i.test(pkg.title) || /(^|\s)(ال)?حج(\s|$)/.test(pkg.title)
}
