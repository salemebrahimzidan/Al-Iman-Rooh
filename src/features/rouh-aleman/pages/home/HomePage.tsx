import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bus,
  CalendarDays,
  Car,
  ChevronDown,
  FileText,
  Globe,
  Headphones,
  Landmark,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Plane,
  Play,
  Search,
  Smile,
  Sparkles,
  Tag,
  Users,
} from 'lucide-react'

const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1635789978029-edbf6bfc0992?auto=format&fit=crop&w=2400&q=85'

const PROGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1591601239659-1d8fd9a24aae?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1585043148262-8dca31bdcac4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1591608975111-ebb0e5ae0c9a?auto=format&fit=crop&w=900&q=80',
] as const

const WHY_VIDEO_THUMB =
  'https://images.unsplash.com/photo-1591601239659-1d8fd9a24aae?auto=format&fit=crop&w=1600&q=82'

const DESTINATION_IMAGES = [
  'https://images.unsplash.com/photo-1635789978029-edbf6bfc0992?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1591601239659-1d8fd9a24aae?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1578895101408-1f36a038cb64?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
] as const

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, '')
}

function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, '')}`
}

export function HomePage() {
  const { t } = useTranslation('home')
  const { t: ts } = useTranslation('shared')
  const [programType, setProgramType] = useState('umrah')
  const [fromCity, setFromCity] = useState('cairo')
  const [depart, setDepart] = useState('')
  const [guests, setGuests] = useState(2)
  const [heroFailed, setHeroFailed] = useState(false)

  const waHref = useMemo(() => {
    const d = digitsOnly(ts('company.phone'))
    return d ? `https://wa.me/${d}` : 'https://wa.me/'
  }, [ts])

  const phone = ts('company.phone')

  const featured = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => ({
        img: PROGRAM_IMAGES[i] ?? PROGRAM_IMAGES[0],
        badgeKey: `featuredPrograms.items.${i}.badge` as const,
        titleKey: `featuredPrograms.items.${i}.title` as const,
        hotelKey: `featuredPrograms.items.${i}.hotel` as const,
        flightKey: `featuredPrograms.items.${i}.flight` as const,
        priceKey: `featuredPrograms.items.${i}.price` as const,
        to: i % 2 === 0 ? '/umrah' : '/hajj',
      })),
    [],
  )

  const destinations = useMemo(
    () =>
      [0, 1, 2, 3].map((i) => ({
        img: DESTINATION_IMAGES[i] ?? DESTINATION_IMAGES[0],
        nameKey: `destinations.items.${i}.name` as const,
        descKey: `destinations.items.${i}.desc` as const,
      })),
    [],
  )

  const heroSrc = heroFailed ? HERO_FALLBACK : '/images/home/hero-kaaba.png'

  return (
    <div className="w-full space-y-16 pb-28 sm:space-y-20 sm:pb-32 lg:space-y-24">
      {/* Hero */}
      <section className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
        <div className="relative min-h-[min(100dvh,900px)] w-full">
          <img
            src={heroSrc}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%] motion-safe:transition-transform motion-safe:duration-[12s] motion-safe:ease-out hover:scale-[1.02]"
            onError={() => setHeroFailed(true)}
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_34%,rgba(255,255,255,0.22)_58%,rgba(6,51,39,0.55)_100%)] rtl:bg-[linear-gradient(-115deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_34%,rgba(255,255,255,0.22)_58%,rgba(6,51,39,0.55)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute -inset-40 bg-[radial-gradient(closest-side,rgba(198,160,74,0.12),transparent_70%)] opacity-90 inset-s-[55%] rtl:inset-s-auto rtl:inset-e-[45%]" aria-hidden="true" />

          <div className="relative flex min-h-[min(100dvh,900px)] items-center px-4 pb-40 pt-28 sm:px-6 sm:pb-44 sm:pt-32 lg:px-10 lg:pb-48">
            <div className="w-full max-w-2xl text-start">
              <div className="rounded-[22px] border border-white/50 bg-(--ra-glass) p-6 shadow-[0_24px_80px_rgba(2,6,23,0.12)] ring-1 ring-black/5 backdrop-blur-xl sm:p-8">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-(--ra-gold) sm:text-sm">
                  <Sparkles className="h-3.5 w-3.5 opacity-90" aria-hidden="true" />
                  {t('hero.eyebrow')}
                </p>
                <h1 className="mt-3 text-balance text-3xl font-bold leading-[1.12] tracking-tight text-(--ra-green) sm:text-4xl lg:text-[2.75rem]">
                  <span className="text-(--ra-green)">{t('hero.titleLead')}</span>{' '}
                  <span className="bg-linear-to-r from-(--ra-gold) to-[#a8842f] bg-clip-text text-transparent">
                    {t('hero.titleAccent')}
                  </span>
                </h1>
                <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-(--ra-muted) sm:text-base">
                  {t('hero.subtitle')}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-2xl bg-(--ra-green) px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(6,51,39,0.38)] transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_22px_50px_rgba(6,51,39,0.42)] hover:bg-(--ra-green-2)"
                  >
                    <CalendarDays className="h-4 w-4 opacity-95" aria-hidden="true" />
                    <span>{t('hero.primaryCta')}</span>
                    <ArrowRight className="h-4 w-4 rtl:hidden" aria-hidden="true" />
                    <ArrowLeft className="hidden h-4 w-4 rtl:inline" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-2xl border border-(--ra-green)/25 bg-white/70 px-7 py-3.5 text-sm font-semibold text-(--ra-green) shadow-sm backdrop-blur-md transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-(--ra-gold)/40 motion-safe:hover:bg-white"
                  >
                    <Headphones className="h-4 w-4" aria-hidden="true" />
                    {t('hero.secondaryCta')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search / booking */}
        <div className="relative z-10 -mt-32 px-4 sm:-mt-36 sm:px-6 lg:-mt-40 lg:px-10">
          <div className="mx-auto max-w-6xl rounded-[22px] border border-white/60 bg-white/75 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.14)] ring-1 ring-(--ra-border)/80 backdrop-blur-2xl sm:p-7 lg:p-8">
            <div className="flex flex-col gap-1 text-start sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <h2 className="text-lg font-bold text-(--ra-green) sm:text-xl">{t('searchCard.title')}</h2>
                <p className="mt-1 max-w-xl text-xs text-(--ra-muted) sm:text-sm">
                  {t('featuredPrograms.subtitle')}
                </p>
              </div>
              <span className="hidden h-10 w-px shrink-0 bg-(--ra-border) sm:block" aria-hidden="true" />
            </div>
            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
              <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className="grid gap-1.5 text-start">
                  <span className="text-xs font-semibold text-(--ra-muted)">{t('searchCard.programType')}</span>
                  <span className="relative">
                    <Landmark className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-green)" aria-hidden="true" />
                    <select
                      value={programType}
                      onChange={(e) => setProgramType(e.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-(--ra-border) bg-white/90 py-3 ps-10 pe-10 text-sm font-medium text-(--ra-black) shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none ring-(--ra-ring) transition focus:border-(--ra-green)/35 focus:ring-2"
                    >
                      <option value="umrah">{t('searchCard.options.umrah')}</option>
                      <option value="hajj">{t('searchCard.options.hajj')}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute inset-e-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-muted)" aria-hidden="true" />
                  </span>
                </label>
                <label className="grid gap-1.5 text-start">
                  <span className="text-xs font-semibold text-(--ra-muted)">{t('searchCard.departureFrom')}</span>
                  <span className="relative">
                    <Plane className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-green)" aria-hidden="true" />
                    <select
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-(--ra-border) bg-white/90 py-3 ps-10 pe-10 text-sm font-medium text-(--ra-black) shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none ring-(--ra-ring) transition focus:border-(--ra-green)/35 focus:ring-2"
                    >
                      <option value="cairo">{t('searchCard.options.cairo')}</option>
                      <option value="jeddah">{t('searchCard.options.jeddah')}</option>
                      <option value="riyadh">{t('searchCard.options.riyadh')}</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute inset-e-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-muted)" aria-hidden="true" />
                  </span>
                </label>
                <label className="grid gap-1.5 text-start">
                  <span className="text-xs font-semibold text-(--ra-muted)">{t('searchCard.departureDate')}</span>
                  <span className="relative">
                    <CalendarDays className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-green)" aria-hidden="true" />
                    <input
                      type="date"
                      value={depart}
                      onChange={(e) => setDepart(e.target.value)}
                      className="w-full rounded-xl border border-(--ra-border) bg-white/90 py-3 ps-10 pe-3 text-sm font-medium text-(--ra-black) shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none ring-(--ra-ring) transition focus:border-(--ra-green)/35 focus:ring-2"
                    />
                  </span>
                </label>
                <label className="grid gap-1.5 text-start">
                  <span className="text-xs font-semibold text-(--ra-muted)">{t('searchCard.guests')}</span>
                  <span className="relative">
                    <Users className="pointer-events-none absolute inset-s-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-green)" aria-hidden="true" />
                    <select
                      value={String(guests)}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-(--ra-border) bg-white/90 py-3 ps-10 pe-10 text-sm font-medium text-(--ra-black) shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none ring-(--ra-ring) transition focus:border-(--ra-green)/35 focus:ring-2"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {t('searchCard.peopleOption', { count: n })}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute inset-e-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-muted)" aria-hidden="true" />
                  </span>
                </label>
              </div>
              <button
                type="button"
                className="inline-flex h-[52px] shrink-0 items-center justify-center gap-2 self-stretch rounded-2xl bg-(--ra-green) px-8 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(6,51,39,0.32)] transition motion-safe:hover:-translate-y-0.5 hover:bg-(--ra-green-2) lg:h-auto lg:min-h-[52px] lg:self-auto"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
                {t('searchCard.searchNow')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {[
          { Icon: Tag, titleKey: 'valueProps.items.0.title', subtitleKey: 'valueProps.items.0.subtitle' },
          { Icon: Package, titleKey: 'valueProps.items.1.title', subtitleKey: 'valueProps.items.1.subtitle' },
          { Icon: Users, titleKey: 'valueProps.items.2.title', subtitleKey: 'valueProps.items.2.subtitle' },
          { Icon: Headphones, titleKey: 'valueProps.items.3.title', subtitleKey: 'valueProps.items.3.subtitle' },
        ].map(({ Icon, titleKey, subtitleKey }) => (
          <div
            key={titleKey}
            className="group relative overflow-hidden rounded-2xl border border-(--ra-border) bg-white p-5 shadow-[0_14px_40px_rgba(2,6,23,0.06)] transition motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_55px_rgba(2,6,23,0.1)]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, rgba(198,160,74,0.08), transparent 55%)',
              }}
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center gap-3 text-center sm:items-start sm:text-start">
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-(--ra-gold)/35 bg-linear-to-br from-white to-(--ra-bg) text-(--ra-green) shadow-sm ring-1 ring-(--ra-gold-soft) transition group-hover:border-(--ra-gold)/55">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-bold text-(--ra-green)">{t(titleKey)}</div>
                <div className="mt-1 text-xs leading-relaxed text-(--ra-muted)">{t(subtitleKey)}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Featured programs */}
      <section className="relative -mx-4 rounded-none bg-linear-to-b from-white via-(--ra-bg) to-(--ra-bg) px-4 py-14 sm:-mx-6 sm:rounded-[28px] sm:px-6 lg:mx-0 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="text-start">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-(--ra-gold)">{t('hero.eyebrow')}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-(--ra-green) sm:text-4xl">{t('featuredPrograms.title')}</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-(--ra-muted) sm:text-base">{t('featuredPrograms.subtitle')}</p>
            </div>
            <Link
              to="/offers"
              className="inline-flex items-center justify-center gap-2 self-start rounded-2xl border border-(--ra-border) bg-white px-6 py-3 text-sm font-semibold text-(--ra-black) shadow-sm transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-(--ra-gold)/45 motion-safe:hover:shadow-md sm:self-auto"
            >
              <span>{t('featuredPrograms.viewAll')}</span>
              <ArrowRight className="h-4 w-4 rtl:hidden" aria-hidden="true" />
              <ArrowLeft className="hidden h-4 w-4 rtl:inline" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((card) => (
              <article
                key={card.titleKey}
                className="group flex flex-col overflow-hidden rounded-[20px] border border-(--ra-border) bg-white shadow-[0_18px_50px_rgba(2,6,23,0.08)] transition motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_26px_70px_rgba(2,6,23,0.12)]"
              >
                <Link to={card.to} className="relative block aspect-4/3 overflow-hidden">
                  <img
                    src={card.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" aria-hidden="true" />
                  <div className="absolute top-3 inset-e-3 rounded-full bg-(--ra-gold) px-3 py-1 text-[11px] font-bold text-(--ra-green) shadow-md ring-1 ring-white/30">
                    {t(card.badgeKey)}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="text-start text-base font-bold text-(--ra-green)">{t(card.titleKey)}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-(--ra-muted)">
                    <span className="inline-flex items-center gap-1">
                      <span className="text-(--ra-gold)" aria-hidden="true">
                        ★
                      </span>
                      {t(card.hotelKey)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Plane className="h-3.5 w-3.5 text-(--ra-green)" aria-hidden="true" />
                      {t(card.flightKey)}
                    </span>
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-3 border-t border-(--ra-border)/80 pt-4">
                    <div className="text-lg font-bold tabular-nums text-(--ra-gold)">{t(card.priceKey)}</div>
                    <Link
                      to={card.to}
                      className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-(--ra-green)/25 bg-(--ra-green)/5 px-3 py-2 text-xs font-semibold text-(--ra-green) transition hover:border-(--ra-green) hover:bg-(--ra-green) hover:text-white"
                    >
                      {t('featuredPrograms.viewDetails')}
                      <ArrowRight className="h-3.5 w-3.5 rtl:hidden" aria-hidden="true" />
                      <ArrowLeft className="hidden h-3.5 w-3.5 rtl:inline" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mx-4 overflow-hidden bg-(--ra-green) px-4 py-14 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-10 lg:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c6a04a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--ra-gold)/50 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {[
            { Icon: Globe, valueKey: 'stats.countries.value', labelKey: 'stats.countries.label' },
            { Icon: Smile, valueKey: 'stats.satisfaction.value', labelKey: 'stats.satisfaction.label' },
            { Icon: Award, valueKey: 'stats.experience.value', labelKey: 'stats.experience.label' },
            { Icon: Users, valueKey: 'stats.pilgrims.value', labelKey: 'stats.pilgrims.label' },
          ].map(({ Icon, valueKey, labelKey }) => (
            <div key={labelKey} className="flex items-center gap-4 text-start">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/10 text-(--ra-gold) shadow-inner backdrop-blur-sm">
                <Icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums text-(--ra-gold) sm:text-3xl">{t(valueKey)}</div>
                <div className="mt-1 text-sm font-medium leading-snug text-white/85">{t(labelKey)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us + video */}
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div className="relative order-1 overflow-hidden rounded-[22px] shadow-[0_28px_80px_rgba(2,6,23,0.14)] ring-1 ring-black/5 lg:order-2 rtl:lg:order-1">
          <img src={WHY_VIDEO_THUMB} alt="" loading="lazy" decoding="async" className="aspect-16/11 w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" aria-hidden="true" />
          <button
            type="button"
            className="absolute inset-s-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/95 text-(--ra-green) shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md transition motion-safe:hover:scale-105"
            aria-label={t('whyUs.videoAria')}
          >
            <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" aria-hidden="true" />
          </button>
          <div className="absolute bottom-5 inset-s-5 inset-e-5 sm:inset-s-7 sm:inset-e-auto">
            <span className="inline-flex items-center gap-2 rounded-xl bg-(--ra-green)/95 px-4 py-2.5 text-xs font-semibold text-white shadow-lg ring-1 ring-white/10 backdrop-blur sm:text-sm">
              <Play className="h-3.5 w-3.5 opacity-90" aria-hidden="true" />
              {t('whyUs.videoCta')}
            </span>
          </div>
        </div>

        <div className="order-2 text-start lg:order-1 rtl:lg:order-2">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-(--ra-gold)">{t('whyUs.titleGold')}</p>
          <h2 className="mt-2 text-2xl font-bold leading-snug text-(--ra-green) sm:text-3xl">{t('whyUs.titleGreen')}</h2>
          <p className="mt-4 text-sm leading-relaxed text-(--ra-muted) sm:text-base">{t('whyUs.intro')}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { Icon: Globe, titleKey: 'whyUs.items.0.title', subtitleKey: 'whyUs.items.0.subtitle' },
              { Icon: Bus, titleKey: 'whyUs.items.1.title', subtitleKey: 'whyUs.items.1.subtitle' },
              { Icon: Car, titleKey: 'whyUs.items.2.title', subtitleKey: 'whyUs.items.2.subtitle' },
              { Icon: FileText, titleKey: 'whyUs.items.3.title', subtitleKey: 'whyUs.items.3.subtitle' },
            ].map(({ Icon, titleKey, subtitleKey }) => (
              <div
                key={titleKey}
                className="rounded-2xl border border-(--ra-border) bg-white/90 p-4 shadow-[0_12px_34px_rgba(2,6,23,0.05)] ring-1 ring-white/60 backdrop-blur-sm transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_18px_44px_rgba(2,6,23,0.08)]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-(--ra-green)/8 text-(--ra-green) ring-1 ring-(--ra-green)/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="mt-3 text-sm font-bold text-(--ra-green)">{t(titleKey)}</div>
                <p className="mt-1 text-xs leading-relaxed text-(--ra-muted)">{t(subtitleKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="mx-auto max-w-6xl space-y-8">
        <div className="text-start">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-(--ra-gold)">{t('destinations.eyebrow')}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-(--ra-green) sm:text-4xl">{t('destinations.title')}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-(--ra-muted) sm:text-base">{t('destinations.subtitle')}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d) => (
            <Link
              key={d.nameKey}
              to="/tourism"
              className="group relative overflow-hidden rounded-[20px] border border-(--ra-border) bg-white shadow-[0_16px_44px_rgba(2,6,23,0.07)] ring-1 ring-black/5 transition motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_24px_60px_rgba(2,6,23,0.11)]"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={d.img}
                  alt=""
                  className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-3 inset-s-3 inset-e-3">
                  <div className="min-w-0 text-start text-white">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/80">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-(--ra-gold)" aria-hidden="true" />
                      <span className="truncate">{t('destinations.eyebrow')}</span>
                    </div>
                    <div className="mt-1 truncate text-lg font-bold">{t(d.nameKey)}</div>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/85">{t(d.descKey)}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center sm:justify-end">
          <Link
            to="/tourism"
            className="inline-flex items-center gap-2 rounded-2xl bg-(--ra-green) px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(6,51,39,0.28)] transition motion-safe:hover:-translate-y-0.5 hover:bg-(--ra-green-2)"
          >
            {t('destinations.cta')}
            <ArrowRight className="h-4 w-4 rtl:hidden" aria-hidden="true" />
            <ArrowLeft className="hidden h-4 w-4 rtl:inline" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Promo / advisory CTA */}
      <section className="relative -mx-4 overflow-hidden bg-(--ra-green) px-4 py-12 text-white sm:-mx-6 sm:rounded-[24px] sm:px-8 lg:mx-0 lg:px-12 lg:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_0%_0%,rgba(198,160,74,0.18),transparent_55%),radial-gradient(70%_100%_at_100%_100%,rgba(255,255,255,0.08),transparent_50%)]" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl text-start">
            <h2 className="text-2xl font-bold leading-snug sm:text-3xl">{t('promo.title')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">{t('promo.subtitle')}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-(--ra-green) shadow-lg transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-xl"
            >
              {t('promo.primary')}
              <ArrowRight className="h-4 w-4 rtl:hidden" aria-hidden="true" />
              <ArrowLeft className="hidden h-4 w-4 rtl:inline" aria-hidden="true" />
            </Link>
            <a
              href={telHref(phone)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-white/15"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t('promo.secondary')}
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl rounded-[22px] border border-(--ra-border) bg-white p-7 shadow-[0_22px_70px_rgba(2,6,23,0.08)] ring-1 ring-black/2 sm:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-start">
            <div className="text-2xl font-bold text-(--ra-green)">{t('contactCta.title')}</div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-(--ra-muted) sm:text-base">{t('contactCta.subtitle')}</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex justify-center rounded-2xl bg-(--ra-green) px-8 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(6,51,39,0.28)] transition motion-safe:hover:-translate-y-0.5 hover:bg-(--ra-green-2) md:min-w-[200px] md:justify-center"
          >
            {t('contactCta.action')}
          </Link>
        </div>
      </section>

      <a
        href={waHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 inset-s-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,211,102,0.45)] ring-1 ring-black/5 backdrop-blur-sm transition motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        {t('whatsapp.label')}
      </a>
    </div>
  )
}
