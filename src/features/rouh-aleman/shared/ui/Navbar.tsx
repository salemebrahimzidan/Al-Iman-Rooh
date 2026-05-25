import { useState } from 'react'
import { CalendarDays, Menu, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MobileMenu } from './MobileMenu'
import { CompanyLogo } from './CompanyLogo'
import { MainNavTabs } from './MainNavTabs'
import { mainNavTabListClass } from './main-nav-tab-styles'

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

function BrandLockup({ compactLogo }: { compactLogo?: boolean }) {
  const { t } = useTranslation('shared')

  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <CompanyLogo compact={compactLogo} />
      <div className="hidden min-w-0 leading-tight sm:block">
        <p className="truncate text-sm font-bold text-(--ra-green) lg:text-[15px]">
          {t('brand.nameShort')}
        </p>
        <p className="truncate text-[10px] font-semibold tracking-[0.2em] text-(--ra-gold) uppercase lg:text-[11px]">
          {t('brand.nameLatinUpper')}
        </p>
      </div>
    </div>
  )
}

function NavbarActions({ showPhoneNumber }: { showPhoneNumber?: boolean }) {
  const { t } = useTranslation('shared')
  const phone = t('company.phone')

  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
      <a
        href={telHref(phone)}
        className={[
          'inline-flex items-center justify-center gap-2 rounded-xl border border-(--ra-border) bg-white text-(--ra-green) shadow-sm transition',
          'hover:border-(--ra-green)/25 hover:bg-(--ra-gold-soft)/40 motion-safe:hover:-translate-y-0.5',
          showPhoneNumber ? 'h-10 px-3' : 'h-10 w-10',
        ].join(' ')}
        aria-label={t('topBar.phoneLabel')}
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        {showPhoneNumber ? (
          <span className="hidden text-sm font-semibold tabular-nums tracking-tight xl:inline">
            {phone}
          </span>
        ) : null}
      </a>
      <Link
        to="/contact"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-(--ra-green) to-(--ra-green-2) px-3.5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(6,51,39,0.28)] transition motion-safe:hover:-translate-y-0.5 hover:brightness-110 sm:px-4"
      >
        <CalendarDays className="h-4 w-4 shrink-0 opacity-95" aria-hidden="true" />
        <span className="truncate">{t('navbar.bookNow')}</span>
      </Link>
    </div>
  )
}

function DesktopNavStrip({ compactLabels }: { compactLabels?: boolean }) {
  return (
    <nav className={mainNavTabListClass} aria-label="Main">
      <MainNavTabs compactLabels={compactLabels} />
    </nav>
  )
}

export function Navbar() {
  const { t } = useTranslation('shared')
  const [open, setOpen] = useState(false)
  const phone = t('company.phone')

  return (
    <>
      <div className="shrink-0 border-b border-(--ra-border) bg-white/95 shadow-[0_6px_28px_rgba(11,15,20,0.05)] backdrop-blur-md supports-backdrop-filter:bg-white/90">
        {/* Mobile */}
        <div className="relative flex min-h-18 items-center justify-between gap-2 px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-(--ra-border) bg-white text-(--ra-green) transition hover:bg-(--ra-gold-soft)/30"
            aria-label={t('ui.openMenu')}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-17 sm:px-20">
            <div className="pointer-events-auto min-w-0">
              <CompanyLogo compact />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={telHref(phone)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--ra-border) bg-white text-(--ra-green) shadow-sm transition hover:bg-(--ra-gold-soft)/30"
              aria-label={t('topBar.phoneLabel')}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <Link
              to="/contact"
              className="inline-flex h-10 max-w-30 items-center justify-center gap-1.5 rounded-xl bg-linear-to-r from-(--ra-green) to-(--ra-green-2) px-2.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(11,61,46,0.22)]"
            >
              <CalendarDays className="h-4 w-4 shrink-0 opacity-95" aria-hidden="true" />
              <span className="truncate">{t('navbar.bookNow')}</span>
            </Link>
          </div>
        </div>

        {/* Desktop — stacked on md–xl, single row on xl+ */}
        <div className="mx-auto hidden w-full max-w-[1440px] px-4 md:block sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 overflow-visible py-3.5 xl:hidden">
            <div className="flex items-center justify-between gap-4">
              <BrandLockup compactLogo />
              <NavbarActions />
            </div>
            <DesktopNavStrip compactLabels />
          </div>

          <div className="hidden items-center gap-5 py-3.5 xl:flex">
            <BrandLockup />
            <div className="min-w-0 flex-1 overflow-visible px-2">
              <DesktopNavStrip />
            </div>
            <NavbarActions showPhoneNumber />
          </div>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
