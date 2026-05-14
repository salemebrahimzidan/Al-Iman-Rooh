import { useState } from 'react'
import { CalendarDays, Landmark, Menu, Phone } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MobileMenu } from './MobileMenu'
import { MAIN_NAV } from '../nav-items'

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

function LogoMark({ compact }: { compact?: boolean }) {
  const { t } = useTranslation('shared')
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <Link
      to="/"
      className="flex min-w-0 max-w-full items-center gap-2.5 rounded-xl outline-none ring-(--ra-ring) focus-visible:ring-2"
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-(--ra-gold)/50 bg-(--ra-green) shadow-sm sm:h-12 sm:w-12">
        {!imgFailed ? (
          <img
            src="/images/home/hero-kaaba.png"
            alt=""
            className="h-full w-full object-cover object-center"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <Landmark className="h-6 w-6 text-(--ra-gold)" aria-hidden="true" />
        )}
      </div>
      {compact ? (
        <div className="min-w-0 max-w-[46vw] sm:max-w-[220px]">
          <div className="truncate text-sm font-bold leading-tight text-(--ra-green)">{t('brand.nameShort')}</div>
          <div className="truncate text-[9px] font-semibold tracking-[0.12em] text-(--ra-muted)">
            {t('brand.nameLatinUpper')}
          </div>
        </div>
      ) : (
        <div className="hidden min-w-0 flex-col md:flex">
          <span className="truncate text-base font-bold leading-tight text-(--ra-green)">{t('brand.nameShort')}</span>
          <span className="text-[10px] font-semibold tracking-[0.14em] text-(--ra-muted)">{t('brand.nameLatinUpper')}</span>
        </div>
      )}
    </Link>
  )
}

export function Navbar() {
  const { t } = useTranslation('shared')
  const [open, setOpen] = useState(false)
  const phone = t('company.phone')

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-(--ra-border) bg-white/95 backdrop-blur">
        {/* Mobile */}
        <div className="relative flex items-center justify-between gap-2 px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border border-(--ra-border) bg-white text-(--ra-green) hover:bg-gray-50"
            aria-label={t('ui.openMenu')}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center px-14">
            <div className="pointer-events-auto min-w-0">
              <LogoMark compact />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={telHref(phone)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-(--ra-border) bg-white text-(--ra-green) shadow-sm hover:bg-gray-50"
              aria-label={t('topBar.phoneLabel')}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <Link
              to="/contact"
              className="inline-flex h-10 max-w-30 items-center justify-center gap-1.5 rounded-[12px] bg-(--ra-green) px-2.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(11,61,46,0.22)] hover:bg-(--ra-green-2)"
            >
              <CalendarDays className="h-4 w-4 shrink-0 opacity-95" aria-hidden="true" />
              <span className="truncate">{t('navbar.bookNow')}</span>
            </Link>
          </div>
        </div>

        {/* Desktop — logo | nav | actions (logical start / center / end) */}
        <div className="mx-auto hidden w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8 md:grid">
          <div className="flex justify-self-start">
            <LogoMark />
          </div>

          <nav className="flex max-w-208 flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:gap-x-5" aria-label="Main">
            {MAIN_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'border-b-2 px-0.5 pb-1 text-sm font-semibold transition-colors',
                    isActive
                      ? 'border-(--ra-gold) text-(--ra-green)'
                      : 'border-transparent text-(--ra-black) hover:text-(--ra-green)',
                  ].join(' ')
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex justify-self-end items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-(--ra-green) px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(11,61,46,0.22)] transition hover:-translate-y-0.5 hover:bg-(--ra-green-2)"
            >
              <CalendarDays className="h-4 w-4 opacity-95" aria-hidden="true" />
              {t('navbar.bookNow')}
            </Link>
            <a
              href={telHref(phone)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-(--ra-border) bg-white text-(--ra-green) shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50"
              aria-label={t('topBar.phoneLabel')}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
