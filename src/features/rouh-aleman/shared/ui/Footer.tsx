import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/offers', key: 'nav.programs' },
  { to: '/umrah', key: 'nav.umrah' },
  { to: '/hajj', key: 'nav.hajj' },
  { to: '/tourism', key: 'nav.destinations' },
  { to: '/contact', key: 'nav.contact' },
]

export function Footer() {
  const { t } = useTranslation('shared')
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-(--ra-border) bg-(--ra-green) text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c6a04a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--ra-gold)/55 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-xl font-bold tracking-tight text-white">{t('brand.name')}</div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{t('footer.subheadline')}</p>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-(--ra-gold)">{t('footer.quickLinks')}</div>
            <div className="mt-4 grid gap-2.5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="text-sm text-white/80 transition hover:text-white"
                >
                  {t(l.key)}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-(--ra-gold)">{t('footer.contact')}</div>
            <div className="mt-4 grid gap-2 text-sm text-white/80">
              <div className="tabular-nums">{t('company.phone')}</div>
              <div>{t('company.email')}</div>
              <div className="text-white/60">{t('footer.headline')}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/55">
          <span>
            © {year} {t('brand.nameShort')} — {t('footer.rights')}
          </span>
        </div>
      </div>
    </footer>
  )
}
