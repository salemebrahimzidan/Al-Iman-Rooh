import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Percent,
  RotateCw,
  Tag,
  Users,
} from 'lucide-react'
import { useMemo } from 'react'

export function HomePage() {
  const { t } = useTranslation('home')
  const { t: ts } = useTranslation('shared')

  const hajjPackages = useMemo(
    () => [
      { img: '/images/home/hajj-package-1.png', badgeKey: 'packagesStrip.hajj.items.0.badge', titleKey: 'packagesStrip.hajj.items.0.title', priceKey: 'packagesStrip.hajj.items.0.price' },
      { img: '/images/home/hajj-package-1.png', badgeKey: 'packagesStrip.hajj.items.1.badge', titleKey: 'packagesStrip.hajj.items.1.title', priceKey: 'packagesStrip.hajj.items.1.price' },
      { img: '/images/home/hajj-package-1.png', badgeKey: 'packagesStrip.hajj.items.2.badge', titleKey: 'packagesStrip.hajj.items.2.title', priceKey: 'packagesStrip.hajj.items.2.price' },
    ],
    [],
  )

  const umrahPackages = useMemo(
    () => [
      { img: '/images/home/umrah-package-1.png', badgeKey: 'packagesStrip.umrah.items.0.badge', titleKey: 'packagesStrip.umrah.items.0.title', priceKey: 'packagesStrip.umrah.items.0.price' },
      { img: '/images/home/umrah-package-1.png', badgeKey: 'packagesStrip.umrah.items.1.badge', titleKey: 'packagesStrip.umrah.items.1.title', priceKey: 'packagesStrip.umrah.items.1.price' },
      { img: '/images/home/umrah-package-1.png', badgeKey: 'packagesStrip.umrah.items.2.badge', titleKey: 'packagesStrip.umrah.items.2.title', priceKey: 'packagesStrip.umrah.items.2.price' },
    ],
    [],
  )

  return (
    <div className="w-full space-y-10 sm:space-y-12 lg:space-y-14">
      <section className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
        <div className="relative w-full h-[80vh]">
          {/* Back fill (full width), decorative only */}
          <img
            src="/images/home/hero-kaaba-wide.png"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-25"
          />
          {/* Main hero image: no cropping, preserves all details */}
          <img
            src="/images/home/hero-kaaba-wide.png"
            alt=""
            aria-hidden="true"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.58),rgba(255,255,255,0.32),rgba(255,255,255,0.12))]" />

          <div className="absolute inset-0 grid items-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl text-center ltr:text-left rtl:text-right">
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-(--ra-black) drop-shadow-[0_10px_24px_rgba(255,255,255,0.75)] sm:text-5xl">
                {t('hero.title')}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-(--ra-black)/75 drop-shadow-[0_10px_24px_rgba(255,255,255,0.75)] sm:text-base">
                {t('hero.subtitle')}
              </p>

              <div className="mx-auto mt-6 grid max-w-2xl grid-cols-3 gap-4 rounded-[22px] bg-white/70 px-4 py-4 shadow-[0_18px_55px_rgba(2,6,23,0.10)] backdrop-blur ltr:mx-0 rtl:ms-auto">
                {[
                  { key: 'hero.features.support', Icon: RotateCw },
                  { key: 'hero.features.trusted', Icon: Users },
                  { key: 'hero.features.premium', Icon: Tag },
                ].map(({ key, Icon }) => (
                  <div key={key} className="grid place-items-center gap-2">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-(--ra-green)/10 text-(--ra-green)">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="text-xs font-semibold text-(--ra-black) sm:text-sm">
                      {t(key)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <Link
          to="/offers"
          className="group relative overflow-hidden rounded-[26px] border border-(--ra-border) bg-white shadow-[0_18px_55px_rgba(2,6,23,0.10)] transition hover:-translate-y-0.5 lg:col-span-4"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.92),rgba(244,246,248,0.92))]" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_25%_25%,rgba(200,162,74,0.18),transparent_60%)]" />
          <div className="relative grid h-full gap-4 p-6">
            <div>
              <div className="text-base font-semibold text-(--ra-black)">{t('offersBanner.title')}</div>
              <div className="mt-1 text-sm text-(--ra-muted)">{t('offersBanner.subtitle')}</div>
              <div className="mt-2 text-3xl font-semibold tracking-tight text-(--ra-gold)">{t('offersBanner.discount')}</div>
            </div>
            <div className="mt-auto flex items-end justify-between gap-4">
              <div className="inline-flex rounded-full bg-(--ra-green) px-4 py-2 text-sm font-semibold text-white shadow-(--ra-shadow) group-hover:bg-(--ra-green-2)">
                {t('offersBanner.cta')}
              </div>
              <img
                src="/images/home/offer-bag.png"
                alt=""
                loading="lazy"
                decoding="async"
                className="h-28 w-28 object-contain"
              />
            </div>
          </div>
        </Link>

        <div className="grid gap-6 lg:col-span-8 lg:grid-cols-2">
          {[
            {
              to: '/hajj',
              titleKey: 'packagesStrip.hajj.title',
              items: hajjPackages,
              imgFallback: '/images/home/hajj-package-1.png',
            },
            {
              to: '/umrah',
              titleKey: 'packagesStrip.umrah.title',
              items: umrahPackages,
              imgFallback: '/images/home/umrah-package-1.png',
            },
          ].map((strip) => (
            <div
              key={strip.to}
              className="rounded-[26px] border border-(--ra-border) bg-white shadow-[0_18px_55px_rgba(2,6,23,0.10)]"
            >
              <div className="flex items-center justify-between gap-3 px-5 pt-5">
                <div className="text-sm font-semibold text-(--ra-green)">
                  {t(strip.titleKey)}
                </div>
                <Link
                  to={strip.to}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-(--ra-muted) transition hover:text-(--ra-black)"
                >
                  <span>{ts('ui.viewAll')}</span>
                  <span className="inline-flex">
                    <ChevronLeft className="h-4 w-4 rtl:hidden" aria-hidden="true" />
                    <ChevronRight className="h-4 w-4 ltr:hidden" aria-hidden="true" />
                  </span>
                </Link>
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto px-5 pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {strip.items.map((it) => (
                  <Link
                    key={it.titleKey}
                    to={strip.to}
                    className="group min-w-[182px] flex-1 rounded-[22px] border border-(--ra-border) bg-white shadow-[0_14px_34px_rgba(2,6,23,0.10)] transition hover:-translate-y-0.5"
                  >
                    <div className="relative h-[96px] overflow-hidden rounded-[18px]">
                      <img
                        src={it.img ?? strip.imgFallback}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),transparent_70%)]" />
                      <div className="absolute inset-s-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-(--ra-black) shadow">
                        {t(it.badgeKey)}
                      </div>
                    </div>
                    <div className="px-3 pb-3 pt-2">
                      <div className="text-xs font-semibold text-(--ra-black)">
                        {t(it.titleKey)}
                      </div>
                      <div className="mt-1 text-[11px] font-semibold text-(--ra-green)">
                        {t(it.priceKey)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[26px] border border-(--ra-border) bg-white shadow-(--ra-shadow)">
        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:grid-cols-4">
          {[
            { Icon: RotateCw, titleKey: 'valueProps.items.0.title', subtitleKey: 'valueProps.items.0.subtitle' },
            { Icon: ShieldCheck, titleKey: 'valueProps.items.1.title', subtitleKey: 'valueProps.items.1.subtitle' },
            { Icon: Percent, titleKey: 'valueProps.items.2.title', subtitleKey: 'valueProps.items.2.subtitle' },
            { Icon: CreditCard, titleKey: 'valueProps.items.3.title', subtitleKey: 'valueProps.items.3.subtitle' },
          ].map(({ Icon, titleKey, subtitleKey }) => (
            <div
              key={titleKey}
              className="flex items-center gap-3 rounded-[22px] border border-(--ra-border) bg-white px-4 py-4 shadow-[0_12px_30px_rgba(2,6,23,0.08)]"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-(--ra-green)/10 text-(--ra-green)">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-(--ra-black)">{t(titleKey)}</div>
                <div className="mt-0.5 truncate text-xs text-(--ra-muted)">{t(subtitleKey)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[26px] border border-(--ra-border) bg-white p-6 shadow-(--ra-shadow) sm:p-8">
        <div className="grid gap-2 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xl font-semibold text-(--ra-black)">{t('contactCta.title')}</div>
            <p className="mt-1 text-sm text-(--ra-muted)">{t('contactCta.subtitle')}</p>
          </div>
          <div className="flex md:justify-end">
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-(--ra-green) px-6 py-3 text-sm font-semibold text-white shadow-(--ra-shadow) transition hover:-translate-y-0.5 hover:bg-(--ra-green-2)"
            >
              {t('contactCta.action')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

