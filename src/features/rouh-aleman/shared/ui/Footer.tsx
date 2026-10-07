import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { LtrText } from './LtrText'

const quickLinks = [
  { to: '/', key: 'nav.home' },
  { to: '/umrah', key: 'nav.umrah' },
  { to: '/hajj', key: 'nav.hajj' },
  { to: '/tourism', key: 'nav.tourism' },
  { to: '/flights', key: 'nav.flights' },
]

const moreLinks = [
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
]

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

function FooterHeading({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-bold text-(--ra-green)">
      <span className="h-4 w-1 rounded-full bg-(--ra-gold)" aria-hidden="true" />
      {children}
    </div>
  )
}

function FooterLinks({ links }: { links: Array<{ to: string; key: string }> }) {
  const { t } = useTranslation('shared')
  return (
    <ul className="mt-5 grid gap-3">
      {links.map((l) => (
        <li key={l.to}>
          <NavLink
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              [
                'group inline-flex items-center gap-1.5 text-sm transition-colors',
                isActive ? 'font-semibold text-(--ra-gold)' : 'text-(--ra-muted) hover:text-(--ra-green)',
              ].join(' ')
            }
          >
            <ChevronRight className="h-3.5 w-3.5 text-(--ra-gold)/70 transition-transform group-hover:translate-x-0.5 rtl:hidden" aria-hidden="true" />
            <ChevronLeft className="hidden h-3.5 w-3.5 text-(--ra-gold)/70 transition-transform group-hover:-translate-x-0.5 rtl:inline" aria-hidden="true" />
            {t(l.key)}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export function Footer() {
  const { t } = useTranslation('shared')
  const year = new Date().getFullYear()
  const phone = t('company.phone')
  const phone2 = t('company.phone2')
  const email = t('company.email')
  const waHref = `https://wa.me/${phone.replace(/\D/g, '')}`

  const socialClass =
    'grid h-10 w-10 place-items-center rounded-full bg-white text-(--ra-green) shadow-sm ring-1 ring-(--ra-border) transition hover:bg-(--ra-green) hover:text-white hover:ring-(--ra-green)'

  return (
    <footer className="relative overflow-hidden border-t border-(--ra-border) bg-white text-(--ra-black)">
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-16 pb-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="text-start lg:col-span-3">
            <FooterHeading>{t('footer.quickLinks')}</FooterHeading>
            <FooterLinks links={quickLinks} />
          </div>

          <div className="text-start lg:col-span-3">
            <FooterHeading>{t('footer.more')}</FooterHeading>
            <FooterLinks links={moreLinks} />
          </div>

          <div className="text-start sm:col-span-2 lg:col-span-6">
            <FooterHeading>{t('footer.contact')}</FooterHeading>
            <ul className="mt-5 grid gap-x-6 gap-y-3.5 text-sm text-(--ra-black)/80 sm:grid-cols-2">
              <li className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-(--ra-gold) shadow-sm ring-1 ring-(--ra-border)">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-0.5 pt-1">
                  <a href={telHref(phone)} className="transition hover:text-(--ra-green)">
                    <LtrText>{phone}</LtrText>
                  </a>
                  <a href={telHref(phone2)} className="transition hover:text-(--ra-green)">
                    <LtrText>{phone2}</LtrText>
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-(--ra-gold) shadow-sm ring-1 ring-(--ra-border)">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <a href={`mailto:${email}`} className="transition hover:text-(--ra-green)">
                  <LtrText>{email}</LtrText>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-(--ra-gold) shadow-sm ring-1 ring-(--ra-border)">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{t('company.address2')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-(--ra-gold) shadow-sm ring-1 ring-(--ra-border)">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{t('company.hours')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-(--ra-border) pt-6">
          <a href={telHref(phone)} className={socialClass} aria-label={`${t('topBar.phoneLabel')}: ${phone}`}>
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className={socialClass} aria-label="WhatsApp">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={`mailto:${email}`} className={socialClass} aria-label={`${t('topBar.emailLabel')}: ${email}`}>
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            to="/booking"
            className="ms-auto inline-flex h-10 items-center gap-2 rounded-full bg-(--ra-green) px-5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(6,51,39,0.7)] transition hover:bg-(--ra-green-2)"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {t('navbar.bookNow')}
          </Link>
        </div>
      </div>

      <div className="relative border-t border-(--ra-border) bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs sm:flex-row sm:px-6">
          <span className="text-(--ra-muted)">
            © {year} {t('brand.name')} — {t('footer.rights')}
          </span>
          <span className="inline-flex items-center gap-2 font-semibold text-(--ra-gold)">
            <span className="h-1 w-1 rounded-full bg-(--ra-gold)" aria-hidden="true" />
            {t('footer.headline')}
          </span>
        </div>
      </div>
    </footer>
  )
}
