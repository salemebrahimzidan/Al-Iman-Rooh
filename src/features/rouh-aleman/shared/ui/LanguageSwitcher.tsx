import { useEffect, useId, useRef, useState } from 'react'
import { Check, Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../hooks/useLanguage'
import type { AppLanguage } from '../../i18n/language-detector'

type Tone = 'dark' | 'light'

const OPTIONS: Array<{ id: AppLanguage; labelKey: string }> = [
  { id: 'ar', labelKey: 'lang.ar' },
  { id: 'en', labelKey: 'lang.en' },
]

const STYLES = {
  dark: {
    option: 'text-white/85 hover:bg-white/8 hover:text-white',
    optionActive: 'bg-white/12 text-white',
    trigger: 'border-white/12 bg-white/6 text-white/90 backdrop-blur-sm',
    triggerIdle: 'hover:bg-white/10 hover:text-white',
    triggerOpen: 'bg-white/12 text-white',
    menu: 'border-white/15 bg-(--ra-green-2) shadow-[0_12px_32px_rgba(0,0,0,0.22)]',
    pill: 'border-white/12 bg-white/6 backdrop-blur-sm',
    label: 'text-white/80',
    segment: 'text-white/85 hover:bg-white/10 hover:text-white',
    segmentActive: 'bg-white text-(--ra-green) shadow-sm',
  },
  light: {
    option: 'text-(--ra-black)/80 hover:bg-(--ra-bg) hover:text-(--ra-green)',
    optionActive: 'bg-(--ra-green)/6 text-(--ra-green)',
    trigger: 'border-(--ra-border) bg-white text-(--ra-green)',
    triggerIdle: 'hover:border-(--ra-gold)/40 hover:bg-(--ra-bg)',
    triggerOpen: 'border-(--ra-gold)/40 bg-(--ra-bg)',
    menu: 'border-(--ra-border) bg-white shadow-[0_12px_32px_rgba(2,6,23,0.12)]',
    pill: 'border-(--ra-border) bg-(--ra-bg)',
    label: 'text-(--ra-muted)',
    segment: 'text-(--ra-muted) hover:text-(--ra-green)',
    segmentActive: 'bg-(--ra-green) text-white shadow-sm',
  },
} as const

function LanguageOption({
  active,
  label,
  tone,
  onSelect,
}: {
  active: boolean
  label: string
  tone: Tone
  onSelect: () => void
}) {
  const s = STYLES[tone]
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={onSelect}
      className={[
        'flex w-full items-center gap-2 px-3 py-2.5 text-start text-xs font-medium transition-colors duration-200',
        active ? s.optionActive : s.option,
      ].join(' ')}
    >
      {active ? <Check className="h-3.5 w-3.5 shrink-0 text-(--ra-gold)" aria-hidden="true" /> : <span className="w-3.5 shrink-0" />}
      {label}
    </button>
  )
}

export function LanguageDropdown({ tone = 'dark', className = '' }: { tone?: Tone; className?: string }) {
  const { t } = useTranslation('shared')
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const s = STYLES[tone]

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
    <div ref={rootRef} className={['relative', className].join(' ')}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        className={[
          'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors',
          s.trigger,
          open ? s.triggerOpen : s.triggerIdle,
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
          className={['absolute inset-s-0 top-full z-60 mt-1.5 min-w-36 overflow-hidden rounded-xl border py-1', s.menu].join(' ')}
        >
          {OPTIONS.map((opt) => (
            <li key={opt.id} role="none">
              <LanguageOption
                active={opt.id === language}
                label={t(opt.labelKey)}
                tone={tone}
                onSelect={() => select(opt.id)}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function LanguageSwitcher({ tone = 'dark', showLabel = true }: { tone?: Tone; showLabel?: boolean }) {
  const { t } = useTranslation('shared')
  const { language, setLanguage } = useLanguage()
  const s = STYLES[tone]

  return (
    <>
      <LanguageDropdown tone={tone} className="sm:hidden" />

      {/* sm+ — full switcher */}
      <div className={['hidden items-center gap-1.5 rounded-full border p-0.5 sm:inline-flex', s.pill].join(' ')}>
        {showLabel ? (
          <span className={['inline-flex items-center gap-1.5 ps-2.5 pe-1', s.label].join(' ')}>
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-xs font-medium">{t('lang.label')}</span>
          </span>
        ) : (
          <Languages className={['ms-2 h-3.5 w-3.5', s.label].join(' ')} aria-label={t('lang.label')} />
        )}

        <div className="inline-flex overflow-hidden rounded-full">
          {OPTIONS.map((opt) => {
            const active = opt.id === language
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => void setLanguage(opt.id)}
                className={[
                  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200',
                  active ? s.segmentActive : s.segment,
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
