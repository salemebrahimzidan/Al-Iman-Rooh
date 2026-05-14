import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { AppLanguage } from '../../i18n/language-detector'

export function useLanguage() {
  const { i18n } = useTranslation()
  const language = (i18n.language === 'ar' ? 'ar' : 'en') as AppLanguage

  const setLanguage = useCallback(
    async (lng: AppLanguage) => {
      await i18n.changeLanguage(lng)
    },
    [i18n],
  )

  return { language, setLanguage }
}

