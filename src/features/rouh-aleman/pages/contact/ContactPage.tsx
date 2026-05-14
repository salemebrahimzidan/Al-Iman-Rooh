import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function ContactPage() {
  const { t } = useTranslation('contact')
  const { t: ts } = useTranslation('shared')
  const [sending, setSending] = useState(false)

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow)">
        <h1 className="text-2xl font-semibold text-(--ra-black)">{t('title')}</h1>
        <p className="mt-1 text-sm text-(--ra-muted)">{t('subtitle')}</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <form
          className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow) lg:col-span-2"
          onSubmit={(e) => {
            e.preventDefault()
            setSending(true)
            setTimeout(() => setSending(false), 700)
          }}
        >
          <div className="text-sm font-semibold text-(--ra-black)">{t('form.title')}</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-xs font-medium text-(--ra-muted)">
              {t('form.name')}
              <input className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)" />
            </label>
            <label className="grid gap-1 text-xs font-medium text-(--ra-muted)">
              {t('form.phone')}
              <input className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)" />
            </label>
            <label className="grid gap-1 text-xs font-medium text-(--ra-muted) sm:col-span-2">
              {t('form.email')}
              <input className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)" />
            </label>
            <label className="grid gap-1 text-xs font-medium text-(--ra-muted) sm:col-span-2">
              {t('form.message')}
              <textarea className="min-h-28 rounded-2xl border border-(--ra-border) px-3 py-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)" />
            </label>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-(--ra-green) px-5 py-3 text-sm font-semibold text-white shadow-(--ra-shadow) hover:bg-(--ra-green-2) disabled:opacity-70"
            >
              {sending ? ts('ui.sending') : t('form.action')}
            </button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow)">
            <div className="text-sm font-semibold text-(--ra-black)">{t('info.title')}</div>
            <div className="mt-3 grid gap-2 text-sm text-(--ra-muted)">
              <div>
                <span className="font-medium text-(--ra-black)">{t('info.phone')}:</span>{' '}
                <span className="tabular-nums">{ts('company.phone')}</span>
              </div>
              <div>
                <span className="font-medium text-(--ra-black)">{t('info.email')}:</span> {ts('company.email')}
              </div>
              <div>
                <span className="font-medium text-(--ra-black)">{t('info.address')}:</span> {ts('company.address')}
              </div>
              <div>
                <span className="font-medium text-(--ra-black)">{t('info.hours')}:</span> {ts('company.hours')}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow)">
            <div className="text-sm font-semibold text-(--ra-black)">{t('map.title')}</div>
            <div className="mt-3 grid h-44 place-items-center rounded-2xl border border-dashed border-(--ra-border) bg-gray-50 text-sm text-(--ra-muted)">
              {t('map.placeholder')}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

