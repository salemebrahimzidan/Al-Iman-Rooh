export type AppLanguage = 'ar' | 'en'

export const LANGUAGE_STORAGE_KEY = 'rouh-aleman:lang'

export function detectInitialLanguage(): AppLanguage {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (saved === 'ar' || saved === 'en') return saved
  return 'ar'
}

export function applyDocumentDirection(lang: AppLanguage) {
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
}

