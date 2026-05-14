import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/hajj', key: 'nav.hajj' },
  { to: '/umrah', key: 'nav.umrah' },
  { to: '/offers', key: 'nav.offers' },
  { to: '/contact', key: 'nav.contact' },
]

export function Footer() {
  const { t } = useTranslation('shared')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-(--ra-border) bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-base font-semibold text-(--ra-black)">
              {t('brand.name')}
            </div>
            <p className="mt-2 text-sm text-(--ra-muted)">{t('footer.subheadline')}</p>
          </div>

          <div>
            <div className="text-sm font-semibold text-(--ra-black)">
              {t('footer.quickLinks')}
            </div>
            <div className="mt-3 grid gap-2">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="text-sm text-(--ra-muted) hover:text-(--ra-black)"
                >
                  {t(l.key)}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-(--ra-black)">
              {t('footer.contact')}
            </div>
            <div className="mt-3 grid gap-2 text-sm text-(--ra-muted)">
              <div className="tabular-nums">{t('company.phone')}</div>
              <div>{t('company.email')}</div>
              <div>{t('footer.headline')}</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-(--ra-border) pt-6 text-xs text-(--ra-muted)">
          <span>
            © {year} {t('brand.name')} — {t('footer.rights')}
          </span>
        </div>
      </div>
    </footer>
  )
}

