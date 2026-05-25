import { useState } from 'react'
import { CalendarDays, Menu, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useScrolled } from '../hooks/useScrolled'
import { LtrText } from './LtrText'
import { MobileMenu } from './MobileMenu'
import { CompanyLogo } from './CompanyLogo'
import { MainNavTabs } from './MainNavTabs'
import {
  bookNowButtonClass,
  mainNavTabListClass,
  navPhoneButtonClass,
} from './main-nav-tab-styles'

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

function BrandLockup({ compactLogo }: { compactLogo?: boolean }) {
  const { t } = useTranslation('shared')

  return (
    <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
      <CompanyLogo compact={compactLogo} />
      <div className="hidden min-w-0 leading-tight sm:block">
        <p className="truncate text-sm font-semibold tracking-tight text-(--ra-green) lg:text-[15px]">
          {t('brand.nameShort')}
        </p>
        <p className="truncate text-[10px] font-medium tracking-[0.18em] text-(--ra-gold) uppercase lg:text-[11px]">
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
    <div className="flex shrink-0 items-center gap-2">
      <a
        href={telHref(phone)}
        className={[
          navPhoneButtonClass,
          showPhoneNumber ? 'h-9 px-3' : 'h-9 w-9',
        ].join(' ')}
        aria-label={t('topBar.phoneLabel')}
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        {showPhoneNumber ? (
          <LtrText className="hidden text-sm font-medium tracking-tight whitespace-nowrap xl:inline">
            {phone}
          </LtrText>
        ) : null}
      </a>
      <Link
        to="/contact"
        className={[bookNowButtonClass, 'group h-9 px-3.5 text-sm sm:px-4'].join(' ')}
      >
        <CalendarDays
          className="h-4 w-4 shrink-0 opacity-90 transition-transform duration-400 ease-[cubic-bezier(0.33,1,0.68,1)] motion-safe:group-hover:scale-[1.04]"
          aria-hidden="true"
        />
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

type NavbarProps = {
  /** When provided (e.g. from layout), avoids a second scroll listener. */
  scrolled?: boolean
}

export function Navbar({ scrolled: scrolledProp }: NavbarProps = {}) {
  const { t } = useTranslation('shared')
  const [open, setOpen] = useState(false)
  const scrolledDetected = useScrolled(10)
  const scrolled = scrolledProp ?? scrolledDetected
  const phone = t('company.phone')

  return (
    <>
      <div
        data-scrolled={scrolled ? '' : undefined}
        className={[
          'relative shrink-0 border-b backdrop-blur-md transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] supports-backdrop-filter:backdrop-blur-xl',
          scrolled
            ? 'border-(--ra-border)/90 bg-white/72 shadow-[0_6px_28px_rgba(11,15,20,0.06)] supports-backdrop-filter:bg-white/65'
            : 'border-(--ra-border)/70 bg-white/95 shadow-[0_4px_24px_rgba(11,15,20,0.04)] supports-backdrop-filter:bg-white/90',
        ].join(' ')}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--ra-gold)/35 to-transparent"
        />

        {/* Mobile */}
        <div className="relative flex min-h-16 items-center justify-between gap-2 px-4 py-2.5 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={[navPhoneButtonClass, 'h-10 w-10'].join(' ')}
            aria-label={t('ui.openMenu')}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-16 sm:px-18">
            <div className="pointer-events-auto min-w-0">
              <CompanyLogo compact />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={telHref(phone)}
              className={[navPhoneButtonClass, 'h-9 w-9'].join(' ')}
              aria-label={t('topBar.phoneLabel')}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              to="/contact"
              className={[bookNowButtonClass, 'h-9 max-w-30 gap-1.5 px-2.5 text-xs sm:max-w-none'].join(
                ' ',
              )}
            >
              <CalendarDays className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden="true" />
              <span className="truncate">{t('navbar.bookNow')}</span>
            </Link>
          </div>
        </div>

        {/* Desktop — stacked on md–xl, single row on xl+ */}
        <div className="mx-auto hidden w-full max-w-[1440px] px-4 md:block sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 overflow-visible py-2.5 xl:hidden">
            <div className="flex items-center justify-between gap-3">
              <BrandLockup compactLogo />
              <NavbarActions />
            </div>
            <DesktopNavStrip compactLabels />
          </div>

          <div className="hidden items-center gap-4 py-2.5 xl:flex">
            <BrandLockup />
            <div className="min-w-0 flex-1 overflow-visible px-1">
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
