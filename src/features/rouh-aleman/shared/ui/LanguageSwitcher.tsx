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
    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/6 p-0.5 backdrop-blur-sm">
      <span className="inline-flex items-center gap-1.5 ps-2.5 pe-1 text-white/80">
        <Languages className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden text-xs font-medium sm:inline">{t('lang.label')}</span>
      </span>

      <div className="inline-flex overflow-hidden rounded-full">
        {OPTIONS.map((opt) => {
          const active = opt.id === language
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => void setLanguage(opt.id)}
              className={[
                'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium transition-all duration-200',
                active
                  ? 'rounded-full bg-white text-(--ra-green) shadow-sm'
                  : 'text-white/85 hover:bg-white/10 hover:text-white',
              ].join(' ')}
              aria-pressed={active}
            >
              {active ? <Check className="h-3 w-3" aria-hidden="true" /> : null}
              {t(opt.labelKey)}
            </button>
          )
        })}
      </div>
    </div>
  )
}
