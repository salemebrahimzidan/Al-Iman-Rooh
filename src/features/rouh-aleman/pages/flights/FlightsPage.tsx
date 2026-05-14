import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Flight = {
  id: string
  from: string
  to: string
  departTime: string
  arriveTime: string
  stops: number
  price: number
}

const MOCK_FLIGHTS: Flight[] = [
  { id: 'F1', from: 'JED', to: 'MED', departTime: '08:20', arriveTime: '10:05', stops: 0, price: 140 },
  { id: 'F2', from: 'DXB', to: 'JED', departTime: '13:10', arriveTime: '15:45', stops: 1, price: 320 },
  { id: 'F3', from: 'CAI', to: 'MED', departTime: '19:30', arriveTime: '22:10', stops: 0, price: 210 },
]

export function FlightsPage() {
  const { t } = useTranslation('flights')
  const { t: ts } = useTranslation('shared')

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const flights = useMemo(() => {
    const f = from.trim().toLowerCase()
    const tt = to.trim().toLowerCase()
    return MOCK_FLIGHTS.filter((x) => {
      const okFrom = f ? x.from.toLowerCase().includes(f) : true
      const okTo = tt ? x.to.toLowerCase().includes(tt) : true
      return okFrom && okTo
    })
  }, [from, to])

  const priceFormatter = useMemo(() => {
    const currency = t('currency.code')
    const locale = document.documentElement.lang || 'en'
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      })
    } catch {
      const symbol = t('currency.symbol')
      return { format: (n: number) => `${symbol}${n}` }
    }
  }, [t])

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow)">
        <h1 className="text-2xl font-semibold text-(--ra-black)">{t('title')}</h1>
        <p className="mt-1 text-sm text-(--ra-muted)">{t('subtitle')}</p>
      </header>

      <section className="rounded-3xl border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow)">
        <div className="text-sm font-semibold text-(--ra-black)">{t('search.title')}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-1 text-xs font-medium text-(--ra-muted)">
            {t('search.from')}
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)"
            />
          </label>
          <label className="grid gap-1 text-xs font-medium text-(--ra-muted)">
            {t('search.to')}
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)"
            />
          </label>
          <label className="grid gap-1 text-xs font-medium text-(--ra-muted)">
            {t('search.depart')}
            <input className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)" />
          </label>
          <label className="grid gap-1 text-xs font-medium text-(--ra-muted)">
            {t('search.return')}
            <input className="h-11 rounded-2xl border border-(--ra-border) px-3 text-sm outline-none focus:ring-4 focus:ring-(--ra-ring)" />
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="rounded-full bg-(--ra-black) px-5 py-3 text-sm font-semibold text-white hover:bg-black/90"
          >
            {t('search.action')}
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-sm font-semibold text-(--ra-black)">{t('results.title')}</div>
        {flights.length === 0 ? (
          <div className="rounded-3xl border border-(--ra-border) bg-white p-6 text-sm text-(--ra-muted) shadow-(--ra-shadow)">
            {t('results.empty')}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {flights.map((f) => (
              <article
                key={f.id}
                className="overflow-hidden rounded-3xl border border-(--ra-border) bg-white shadow-(--ra-shadow)"
              >
                <div className="flex items-center justify-between gap-4 border-b border-(--ra-border) bg-gray-50 px-6 py-4">
                  <div>
                    <div className="text-sm font-semibold text-(--ra-black)">
                      {f.from} → {f.to}
                    </div>
                    <div className="mt-1 text-xs text-(--ra-muted)">
                      {f.departTime} — {f.arriveTime}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-(--ra-muted)">
                      {t('card.price')}
                    </div>
                    <div className="text-sm font-semibold text-(--ra-green)">
                      {priceFormatter.format(f.price)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
                  <div className="text-xs text-(--ra-muted)">
                    {t('card.stops')}: {f.stops === 0 ? t('card.direct') : String(f.stops)}
                  </div>
                  <button
                    type="button"
                    className="rounded-full bg-(--ra-green) px-4 py-2 text-sm font-semibold text-white hover:bg-(--ra-green-2)"
                  >
                    {t('card.book')}
                  </button>
                </div>
                <div className="px-6 pb-5 text-[10px] text-(--ra-muted)">{ts('footer.headline')}</div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

