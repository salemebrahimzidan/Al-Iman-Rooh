import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CompanyLogo } from './CompanyLogo'
import { MainNavLinks } from './MainNavLinks'

type Props = {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: Props) {
  const { t } = useTranslation('shared')

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-60 md:hidden" role="dialog" aria-modal="true" aria-label={t('ui.menuTitle')}>
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
        aria-label={t('ui.closeMenu')}
      />
      <div className="absolute inset-x-0 top-0 mx-auto w-full max-w-md rounded-b-3xl border border-(--ra-border) bg-white p-5 shadow-(--ra-shadow)">
        <div className="flex items-start justify-between gap-3">
          <CompanyLogo />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-(--ra-green) transition hover:bg-(--ra-bg)"
            aria-label={t('ui.closeMenu')}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-4 grid max-h-[min(70dvh,28rem)] gap-0.5 overflow-y-auto" aria-label="Main">
          <MainNavLinks onNavigate={onClose} />
        </nav>
      </div>
    </div>
  )
}
