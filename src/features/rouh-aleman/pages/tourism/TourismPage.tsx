import { useTranslation } from 'react-i18next'

export function TourismPage() {
  const { t } = useTranslation('tourism')

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow)">
        <h1 className="text-2xl font-semibold text-(--ra-black)">{t('title')}</h1>
        <p className="mt-1 text-sm text-(--ra-muted)">{t('subtitle')}</p>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow) lg:col-span-1">
          <div className="text-sm font-semibold text-(--ra-black)">{t('filters.title')}</div>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-xs font-medium text-(--ra-muted)">
              {t('filters.search')}
              <input className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)" />
            </label>
            <label className="grid gap-1 text-xs font-medium text-(--ra-muted)">
              {t('filters.region')}
              <select className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)">
                <option value="" />
              </select>
            </label>
            <label className="grid gap-1 text-xs font-medium text-(--ra-muted)">
              {t('filters.budget')}
              <select className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)">
                <option value="" />
              </select>
            </label>
            <button
              type="button"
              className="mt-2 rounded-full bg-(--ra-black) px-5 py-3 text-sm font-semibold text-white hover:bg-black/90"
            >
              {t('filters.apply')}
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:col-span-2 md:grid-cols-2">
          <div className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow)">
            <div className="text-sm font-semibold text-(--ra-black)">{t('destinations.title')}</div>
            <p className="mt-1 text-sm text-(--ra-muted)">{t('destinations.subtitle')}</p>
          </div>
          <div className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow)">
            <div className="text-sm font-semibold text-(--ra-black)">{t('offers.title')}</div>
            <p className="mt-1 text-sm text-(--ra-muted)">{t('offers.subtitle')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

