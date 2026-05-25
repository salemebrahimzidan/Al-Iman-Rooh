import { Mail, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'
import { LtrText } from './LtrText'

export function TopBar() {
  const { t } = useTranslation('shared')

  return (
    <div className="relative shrink-0 border-b border-white/8 bg-(--ra-green) text-white shadow-[0_1px_0_rgba(198,160,74,0.12),0_4px_16px_rgba(0,0,0,0.1)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--ra-gold)/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 py-1.5 sm:px-6 lg:px-8">
        <LanguageSwitcher />

        <div className="flex min-w-0 flex-1 items-center justify-end gap-3 sm:gap-4">
          <a
            href={`tel:${t('company.phone').replace(/\s/g, '')}`}
            className="group inline-flex shrink-0 items-center gap-1.5 text-xs text-white/85 transition-colors duration-200 hover:text-white sm:gap-2"
          >
            <Phone
              className="h-3.5 w-3.5 shrink-0 text-(--ra-gold)/90 transition-colors group-hover:text-(--ra-gold)"
              aria-hidden="true"
            />
            <span className="hidden font-medium text-white/90 sm:inline">{t('topBar.phoneLabel')}</span>
            <LtrText className="tracking-tight whitespace-nowrap">{t('company.phone')}</LtrText>
          </a>

          <span className="hidden h-3 w-px shrink-0 bg-white/15 md:block" aria-hidden="true" />

          <a
            href={`mailto:${t('company.email')}`}
            className="group inline-flex min-w-0 max-w-full items-center gap-1.5 text-xs text-white/85 transition-colors duration-200 hover:text-white sm:max-w-none sm:gap-2"
          >
            <Mail
              className="h-3.5 w-3.5 shrink-0 text-(--ra-gold)/90 transition-colors group-hover:text-(--ra-gold)"
              aria-hidden="true"
            />
            <span className="hidden font-medium text-white/90 md:inline">{t('topBar.emailLabel')}</span>
            <LtrText className="max-w-38 truncate sm:max-w-none">{t('company.email')}</LtrText>
          </a>
        </div>
      </div>
    </div>
  )
}
