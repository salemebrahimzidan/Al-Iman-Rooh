import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  FileText,
  MessageCircle,
  Phone,
  Plane,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'

const HERO_IMAGE = '/images/visas/visas-hero.jpg'

const SERVICES: Array<{ key: 'family' | 'tourist'; Icon: LucideIcon }> = [
  { key: 'family', Icon: Users },
  { key: 'tourist', Icon: Plane },
]
const POINT_COUNT = 4
const DOCUMENT_COUNT = 6
const STEP_COUNT = 4
const FAQ_COUNT = 5

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-start">
      <span className="inline-flex items-center gap-2 rounded-full border border-(--ra-gold)/30 bg-[#fbf3df] px-3.5 py-1 text-xs font-semibold text-(--ra-green)">
        <span className="h-1.5 w-1.5 rounded-full bg-(--ra-gold)" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-(--ra-green) sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-(--ra-muted) sm:text-base">{subtitle}</p> : null}
    </div>
  )
}

export function TourismPage() {
  const { t } = useTranslation('tourism')
  const { t: ts } = useTranslation('shared')

  const phone = ts('company.phone')
  const waHref = useMemo(() => `https://wa.me/${phone.replace(/\D/g, '')}`, [phone])
  const telHref = `tel:${phone.replace(/\s/g, '')}`

  return (
    <div className="w-full space-y-16 pb-20 sm:space-y-20 sm:pb-24">
      {/* Hero */}
      <section className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
        <div className="relative min-h-[520px] w-full sm:min-h-[580px]">
          {/* The photo contains no text, so mirroring in RTL keeps the family clear of the heading. */}
          <img
            src={HERO_IMAGE}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center rtl:-scale-x-100"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,51,39,0.92)_0%,rgba(6,51,39,0.7)_38%,rgba(6,51,39,0.05)_75%)] rtl:bg-[linear-gradient(-100deg,rgba(6,51,39,0.92)_0%,rgba(6,51,39,0.7)_38%,rgba(6,51,39,0.05)_75%)]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-(--ra-green)/45 lg:hidden" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-(--ra-bg) to-transparent" aria-hidden="true" />
          <div className="relative mx-auto flex min-h-[520px] max-w-6xl items-center px-4 py-20 sm:min-h-[580px] sm:px-6 lg:px-8">
            <div className="max-w-2xl text-start text-white">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-(--ra-gold) sm:text-sm">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {t('hero.eyebrow')}
              </p>
              <h1 className="mt-4 text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">
                {t('hero.title')}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-white/85 sm:text-base">{t('hero.subtitle')}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 rounded-2xl bg-(--ra-gold) px-7 py-3.5 text-sm font-semibold text-(--ra-green) shadow-[0_18px_44px_rgba(198,160,74,0.35)] transition motion-safe:hover:-translate-y-0.5"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {t('hero.primaryCta')}
                  <ArrowRight className="h-4 w-4 rtl:hidden" aria-hidden="true" />
                  <ArrowLeft className="hidden h-4 w-4 rtl:inline" aria-hidden="true" />
                </Link>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition motion-safe:hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t('hero.whatsappCta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl space-y-8">
        <SectionHeader eyebrow={t('services.eyebrow')} title={t('services.title')} subtitle={t('services.subtitle')} />
        <div className="grid gap-5 lg:grid-cols-2">
          {SERVICES.map(({ key, Icon }) => (
            <article
              key={key}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-(--ra-border) bg-white p-7 text-start shadow-[0_1px_2px_rgba(2,6,23,0.04),0_18px_44px_-18px_rgba(6,51,39,0.2)] transition duration-300 hover:border-(--ra-gold)/40 motion-safe:hover:-translate-y-1 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-(--ra-green) text-(--ra-gold) shadow-[0_10px_24px_-10px_rgba(6,51,39,0.7)]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-[#fbf3df] px-3 py-1 text-xs font-semibold text-(--ra-green) ring-1 ring-(--ra-gold)/30">
                  {t(`services.${key}.badge`)}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-(--ra-black) sm:text-2xl">{t(`services.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--ra-muted)">{t(`services.${key}.subtitle`)}</p>
              <ul className="mt-6 grid gap-3 border-t border-(--ra-border)/70 pt-6">
                {Array.from({ length: POINT_COUNT }, (_, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-(--ra-black)/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-(--ra-gold)" aria-hidden="true" />
                    {t(`services.${key}.points.${i}`)}
                  </li>
                ))}
              </ul>
              <Link
                to="/booking"
                className="mt-7 inline-flex items-center justify-center gap-2 self-start rounded-xl bg-(--ra-green) px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(6,51,39,0.7)] transition hover:bg-(--ra-green-2)"
              >
                {t('services.cta')}
                <ArrowRight className="h-4 w-4 rtl:hidden" aria-hidden="true" />
                <ArrowLeft className="hidden h-4 w-4 rtl:inline" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-12">
        <SectionHeader eyebrow={t('documents.eyebrow')} title={t('documents.title')} subtitle={t('documents.subtitle')} />
        <ul className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: DOCUMENT_COUNT }, (_, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-(--ra-border) bg-white p-4 text-start text-sm text-(--ra-black)/85 shadow-[0_8px_24px_-14px_rgba(6,51,39,0.18)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef3ef] text-(--ra-green) ring-1 ring-(--ra-green)/10">
                <FileText className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="pt-1.5 leading-relaxed">{t(`documents.items.${i}`)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-6xl space-y-8">
        <SectionHeader eyebrow={t('steps.eyebrow')} title={t('steps.title')} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <li
              key={i}
              className="relative rounded-2xl border border-(--ra-border) bg-white p-6 text-start shadow-[0_12px_34px_-16px_rgba(6,51,39,0.2)]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-(--ra-green) text-sm font-bold text-(--ra-gold) tabular-nums">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold text-(--ra-black)">{t(`steps.items.${i}.title`)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-(--ra-muted)">{t(`steps.items.${i}.subtitle`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-(--ra-gold)">{t('faq.eyebrow')}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-(--ra-green) sm:text-4xl">{t('faq.title')}</h2>
        </div>
        <div className="grid gap-3">
          {Array.from({ length: FAQ_COUNT }, (_, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-(--ra-border) bg-white px-5 py-4 shadow-[0_8px_24px_rgba(2,6,23,0.04)] open:shadow-[0_14px_40px_rgba(2,6,23,0.08)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-start text-sm font-semibold text-(--ra-green) sm:text-base [&::-webkit-details-marker]:hidden">
                {t(`faq.items.${i}.q`)}
                <ChevronDown className="h-5 w-5 shrink-0 text-(--ra-gold) transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-start text-sm leading-relaxed text-(--ra-muted)">{t(`faq.items.${i}.a`)}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative -mx-4 overflow-hidden bg-(--ra-green) px-4 py-12 text-white sm:-mx-6 sm:rounded-[24px] sm:px-8 lg:mx-0 lg:px-12 lg:py-14">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_0%_0%,rgba(198,160,74,0.18),transparent_55%),radial-gradient(70%_100%_at_100%_100%,rgba(255,255,255,0.08),transparent_50%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl text-start">
            <h2 className="text-2xl font-bold leading-snug sm:text-3xl">{t('cta.title')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">{t('cta.subtitle')}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-(--ra-green) shadow-lg transition motion-safe:hover:-translate-y-0.5"
            >
              {t('cta.primary')}
              <ArrowRight className="h-4 w-4 rtl:hidden" aria-hidden="true" />
              <ArrowLeft className="hidden h-4 w-4 rtl:inline" aria-hidden="true" />
            </Link>
            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition motion-safe:hover:-translate-y-0.5 hover:bg-white/15"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t('cta.call')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
