import { Mail, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'

export function TopBar() {
  const { t } = useTranslation('shared')

  return (
    <div className="shrink-0 border-b border-black/10 bg-(--ra-green) text-white shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <LanguageSwitcher />
        </div>

        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-1.5 text-white/90 sm:gap-x-5">
          <span className="hidden font-medium text-white lg:inline">
            {t('topBar.tagline')}
          </span>
          <a
            href={`tel:${t('company.phone').replace(/\s/g, '')}`}
            className="inline-flex min-w-0 items-center gap-2 transition hover:text-white"
          >
            <Phone className="h-4 w-4 shrink-0 text-white/90" aria-hidden="true" />
            <span className="hidden font-medium text-white sm:inline">{t('topBar.phoneLabel')}</span>
            <span className="truncate tabular-nums">{t('company.phone')}</span>
          </a>
          <a
            href={`mailto:${t('company.email')}`}
            className="inline-flex min-w-0 items-center gap-2 transition hover:text-white"
          >
            <Mail className="h-4 w-4 shrink-0 text-white/90" aria-hidden="true" />
            <span className="hidden font-medium text-white md:inline">{t('topBar.emailLabel')}</span>
            <span className="truncate">{t('company.email')}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

