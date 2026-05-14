import { Mail, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function TopBar() {
  const { t } = useTranslation('shared')

  return (
    <div className="border-b border-black/10 bg-(--ra-green) text-white">
      <div className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-2.5 text-sm sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-white/90">
          <span className="font-medium text-white">
            {t('topBar.tagline')}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="h-4 w-4 text-white/90" aria-hidden="true" />
            <span className="font-medium text-white">
              {t('topBar.phoneLabel')}
            </span>
            <span className="tabular-nums text-white/90">{t('company.phone')}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4 text-white/90" aria-hidden="true" />
            <span className="font-medium text-white">
              {t('topBar.emailLabel')}
            </span>
            <span className="text-white/90">{t('company.email')}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

