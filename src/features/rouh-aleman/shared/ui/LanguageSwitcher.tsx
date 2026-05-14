import { Check, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../hooks/useLanguage'
import type { AppLanguage } from '../../i18n/language-detector'

const OPTIONS: Array<{ id: AppLanguage; labelKey: string }> = [
  { id: 'ar', labelKey: 'lang.ar' },
  { id: 'en', labelKey: 'lang.en' },
]

export function LanguageSwitcher() {
  const { t } = useTranslation('shared')
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative inline-flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur">
        <Languages className="h-4 w-4 text-white/90" aria-hidden="true" />
        <span className="text-sm font-medium text-white">
          {t('lang.label')}
        </span>
      </div>

      <div className="inline-flex overflow-hidden rounded-full border border-white/20 bg-white/10">
        {OPTIONS.map((opt) => {
          const active = opt.id === language
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => void setLanguage(opt.id)}
              className={[
                'inline-flex items-center gap-2 px-3 py-2 text-sm transition',
                active
                  ? 'bg-white text-(--ra-green)'
                  : 'bg-transparent text-white/90 hover:bg-white/10',
              ].join(' ')}
              aria-pressed={active}
            >
              {active ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
              {t(opt.labelKey)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

