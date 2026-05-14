import { useTranslation } from 'react-i18next'

export function HotelsPage() {
  const { t } = useTranslation('hotels')

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow)">
        <h1 className="text-2xl font-semibold text-(--ra-black)">{t('title')}</h1>
        <p className="mt-1 text-sm text-(--ra-muted)">{t('subtitle')}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow) md:col-span-3">
          <div className="text-sm font-semibold text-(--ra-black)">{t('featured.title')}</div>
          <p className="mt-1 text-sm text-(--ra-muted)">{t('featured.subtitle')}</p>
        </div>
        <div className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow) md:col-span-3">
          <div className="text-sm font-semibold text-(--ra-black)">{t('grid.title')}</div>
          <p className="mt-1 text-sm text-(--ra-muted)">{t('grid.subtitle')}</p>
        </div>
      </section>
    </div>
  )
}

