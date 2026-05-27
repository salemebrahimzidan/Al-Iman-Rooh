import { useEffect, useId, useRef, useState } from 'react'
import { Check, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../hooks/useLanguage'
import type { AppLanguage } from '../../i18n/language-detector'

const OPTIONS: Array<{ id: AppLanguage; labelKey: string }> = [
  { id: 'ar', labelKey: 'lang.ar' },
  { id: 'en', labelKey: 'lang.en' },
]

function LanguageOption({
  active,
  label,
  onSelect,
}: {
  active: boolean
  label: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={onSelect}
      className={[
        'flex w-full items-center gap-2 px-3 py-2.5 text-start text-xs font-medium transition-colors duration-200',
        active ? 'bg-white/12 text-white' : 'text-white/85 hover:bg-white/8 hover:text-white',
      ].join(' ')}
    >
      {active ? <Check className="h-3.5 w-3.5 shrink-0 text-(--ra-gold)" aria-hidden="true" /> : <span className="w-3.5 shrink-0" />}
      {label}
    </button>
  )
}

function MobileLanguageDropdown() {
  const { t } = useTranslation('shared')
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const select = (id: AppLanguage) => {
    void setLanguage(id)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        className={[
          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/90 backdrop-blur-sm transition-colors',
          open ? 'bg-white/12 text-white' : 'hover:bg-white/10 hover:text-white',
        ].join(' ')}
        aria-label={t('lang.label')}
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={t('lang.label')}
          className="absolute inset-s-0 top-full z-60 mt-1.5 min-w-36 overflow-hidden rounded-xl border border-white/15 bg-(--ra-green-2) py-1 shadow-[0_12px_32px_rgba(0,0,0,0.22)]"
        >
          {OPTIONS.map((opt) => (
            <li key={opt.id} role="none">
              <LanguageOption
                active={opt.id === language}
                label={t(opt.labelKey)}
                onSelect={() => select(opt.id)}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function LanguageSwitcher() {
  const { t } = useTranslation('shared')
  const { language, setLanguage } = useLanguage()

  return (
    <>
      <MobileLanguageDropdown />

      {/* sm+ — full switcher */}
      <div className="hidden items-center gap-1.5 rounded-full border border-white/12 bg-white/6 p-0.5 backdrop-blur-sm sm:inline-flex">
        <span className="inline-flex items-center gap-1.5 ps-2.5 pe-1 text-white/80">
          <Languages className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-xs font-medium">{t('lang.label')}</span>
        </span>

        <div className="inline-flex overflow-hidden rounded-full">
          {OPTIONS.map((opt) => {
            const active = opt.id === language
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => void setLanguage(opt.id)}
                className={[
                  'inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium transition-all duration-200',
                  active
                    ? 'rounded-full bg-white text-(--ra-green) shadow-sm'
                    : 'text-white/85 hover:bg-white/10 hover:text-white',
                ].join(' ')}
                aria-pressed={active}
              >
                {active ? <Check className="h-3 w-3" aria-hidden="true" /> : null}
                {t(opt.labelKey)}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
