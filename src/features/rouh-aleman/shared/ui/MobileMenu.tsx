import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CompanyLogo } from './CompanyLogo'
import { MAIN_NAV } from '../nav-items'

type Props = {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: Props) {
  const { t } = useTranslation('shared')
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
        aria-label={t('ui.closeMenu')}
      />
      <div className="absolute inset-x-0 top-0 mx-auto w-full max-w-md rounded-b-3xl bg-white p-5 shadow-(--ra-shadow)">
        <div className="flex items-start justify-between gap-3">
          <CompanyLogo />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--ra-border) hover:bg-gray-50"
            aria-label={t('ui.closeMenu')}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-4 grid gap-1">
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'rounded-2xl border-b-2 px-3 py-3 text-sm font-semibold',
                  isActive
                    ? 'border-(--ra-gold) bg-(--ra-gold)/10 text-(--ra-green)'
                    : 'border-transparent text-(--ra-black) hover:bg-gray-50',
                ].join(' ')
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
