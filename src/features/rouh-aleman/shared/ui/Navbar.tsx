import { useMemo, useState } from 'react'
import { Menu, UserRound } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MobileMenu } from './MobileMenu'

const navItems = [
  { to: '/', key: 'nav.home' },
  { to: '/flights', key: 'nav.flights' },
  { to: '/hajj', key: 'nav.hajj' },
  { to: '/umrah', key: 'nav.umrah' },
  { to: '/tourism', key: 'nav.tourism' },
  { to: '/hotels', key: 'nav.hotels' },
  { to: '/offers', key: 'nav.offers' },
  { to: '/contact', key: 'nav.contact' },
] as const

export function Navbar() {
  const { t } = useTranslation('shared')
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const activePath = useMemo(() => location.pathname, [location.pathname])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-(--ra-border) bg-white/90 backdrop-blur">
        <div className="flex w-full items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-[14px] bg-(--ra-green) px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(2,6,23,0.12)] transition hover:-translate-y-0.5 hover:bg-(--ra-green-2)"
            >
              {t('navbar.bookNow')}
            </Link>
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-[14px] border border-(--ra-border) bg-white text-(--ra-black) shadow-[0_10px_24px_rgba(2,6,23,0.08)] transition hover:-translate-y-0.5 hover:bg-gray-50 md:inline-flex"
              aria-label={t('navbar.account')}
            >
              <UserRound className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'rounded-full px-3 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-(--ra-green) text-white'
                      : 'text-(--ra-black) hover:bg-gray-50',
                  ].join(' ')
                }
                aria-current={item.to === activePath ? 'page' : undefined}
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="hidden items-center gap-3 md:flex">
              <div className="flex items-center justify-center rounded-2xl border border-(--ra-border) bg-white px-2 py-1 shadow-[0_12px_30px_rgba(2,6,23,0.10)]">
                <img
                  src="/images/shared/logo.png"
                  alt=""
                  decoding="async"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-(--ra-border) bg-white hover:bg-gray-50 md:hidden"
              aria-label={t('ui.openMenu')}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

