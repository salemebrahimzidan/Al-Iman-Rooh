import {
  ArrowUpRight,
  Clock,
  Headphones,
  Loader2,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { Country } from 'react-phone-number-input'
import { useLanguage } from '../../shared/hooks/useLanguage'
import { InternationalPhoneInput } from '../../shared/ui/InternationalPhoneInput'
import { useToast } from '../../shared/ui/Toast'
import { isValidInternationalPhone } from '../../shared/utils/phone'
import { submitContactForm } from './submit-contact-form'

type ContactFields = {
  name: string
  phone: string
  email: string
  message: string
}

type FieldKey = keyof ContactFields

const EMPTY_FIELDS: ContactFields = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

const shell =
  'rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05),0_20px_50px_-12px_rgba(15,23,42,0.12)]'

const inputBase =
  'w-full rounded-xl border bg-white px-4 text-[15px] leading-normal text-[#0F172A] outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[#94A3B8] disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:opacity-70'
const inputOk = `${inputBase} border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#2563EB]/20`
const inputErr = `${inputBase} border-red-400 focus:border-red-500 focus:ring-[3px] focus:ring-red-500/20`

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

type FormFieldProps = {
  id: string
  label: string
  error?: string
  children: ReactNode
  className?: string
}

function FormField({ id, label, error, children, className = '' }: FormFieldProps) {
  return (
    <div className={`grid gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium tracking-tight text-[#0F172A]">
        {label} <span className="font-normal text-[#2563EB]">*</span>
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm leading-snug text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type SectionHeaderProps = {
  title: string
  description: string
}

function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-1.5">
      <h3 className="text-base font-semibold tracking-tight text-[#0F172A]">{title}</h3>
      <p className="text-sm leading-relaxed text-[#64748B]">{description}</p>
    </div>
  )
}

type ContactChannelProps = {
  icon: ReactNode
  label: string
  children: ReactNode
}

function ContactChannel({ icon, label, children }: ContactChannelProps) {
  return (
    <li className="group rounded-2xl border border-[#E2E8F0] bg-white p-4 transition duration-200 hover:border-[#BFDBFE] hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)]">
      <div className="flex gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] transition duration-200 group-hover:bg-[#2563EB] group-hover:text-white">
          {icon}
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#64748B] uppercase">{label}</p>
          <div className="mt-1.5 text-sm font-medium leading-snug text-[#0F172A]">{children}</div>
        </div>
      </div>
    </li>
  )
}

export function ContactPage() {
  const { t } = useTranslation('contact')
  const { t: ts } = useTranslation('shared')
  const { showToast } = useToast()
  const { language } = useLanguage()
  const formId = useId()

  const [fields, setFields] = useState<ContactFields>(EMPTY_FIELDS)
  const [phoneCountry, setPhoneCountry] = useState<Country>('SA')
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [sending, setSending] = useState(false)

  const fieldIds: Record<FieldKey, string> = {
    name: `${formId}-name`,
    phone: `${formId}-phone`,
    email: `${formId}-email`,
    message: `${formId}-message`,
  }

  function validate(): Partial<Record<FieldKey, string>> {
    const next: Partial<Record<FieldKey, string>> = {}
    const name = fields.name.trim()
    const phone = fields.phone.trim()
    const email = fields.email.trim()
    const message = fields.message.trim()

    if (name.length < 2) next.name = t('form.errors.name')
    if (!isValidInternationalPhone(phone, phoneCountry)) next.phone = t('form.errors.phone')
    if (!isValidEmail(email)) next.email = t('form.errors.email')
    if (message.length < 10) next.message = t('form.errors.message')

    return next
  }

  function updateField(key: FieldKey, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  function scrollToFirstError(nextErrors: Partial<Record<FieldKey, string>>) {
    const firstKey = (['name', 'phone', 'email', 'message'] as const).find((key) => nextErrors[key])
    if (!firstKey) return
    document.getElementById(fieldIds[firstKey])?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('[ContactForm] Form submit triggered')
    console.log('[ContactForm] VITE_WEB3FORMS_ACCESS_KEY', import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)

    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      console.log('[ContactForm] Validation failed', nextErrors)
      setErrors(nextErrors)
      scrollToFirstError(nextErrors)
      return
    }

    console.log('[ContactForm] Validation passed')

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
    if (!accessKey) {
      console.error('[ContactForm] Missing VITE_WEB3FORMS_ACCESS_KEY — rebuild with env set on host')
      showToast('error', ts('ui.error'))
      return
    }

    setErrors({})
    setSending(true)

    try {
      await submitContactForm(fields)
      setFields(EMPTY_FIELDS)
      showToast('success', t('form.success'))
    } catch (err) {
      console.error('[ContactForm] Submit failed', err)
      showToast('error', ts('ui.error'))
    } finally {
      setSending(false)
    }
  }

  const disabled = sending
  const phoneHref = `tel:${ts('company.phone').replace(/\s/g, '')}`
  const mailHref = `mailto:${ts('company.email')}`

  return (
    <div
      className="relative -mx-4 min-h-full overflow-hidden bg-[#F8FAFC] px-4 py-8 sm:-mx-6 sm:px-6 sm:py-10 lg:-mx-8 lg:px-8 lg:py-12"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 inset-s-1/4 h-72 w-72 rounded-full bg-[#2563EB]/[0.07] blur-3xl" />
        <div className="absolute top-1/3 inset-e-0 h-96 w-96 rounded-full bg-[#93C5FD]/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:gap-10">
        {/* Hero */}
        <header className={`${shell} relative overflow-hidden p-8 sm:p-10 lg:p-12`}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#EFF6FF] via-white to-white"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-e-16 -top-16 h-56 w-56 rounded-full bg-[#2563EB]/10 blur-2xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_minmax(0,0.85fr)] lg:items-end lg:gap-12">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#2563EB]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" aria-hidden="true" />
                {ts('nav.contactShort')}
              </div>
              <div className="space-y-4">
                <h1 className="max-w-xl text-3xl font-semibold tracking-[-0.02em] text-[#0F172A] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                  {t('title')}
                </h1>
                <p className="max-w-lg text-base leading-relaxed text-[#64748B] sm:text-lg sm:leading-relaxed">
                  {t('subtitle')}
                </p>
              </div>
              <ul className="flex flex-wrap gap-3 pt-1">
                <li className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white/80 px-3.5 py-2 text-sm text-[#475569] backdrop-blur-sm">
                  <Headphones className="h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                  {t('hero.support')}
                </li>
                <li className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white/80 px-3.5 py-2 text-sm text-[#475569] backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                  {t('hero.secure')}
                </li>
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={phoneHref}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-start shadow-sm transition duration-200 hover:border-[#BFDBFE] hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] transition duration-200 group-hover:bg-[#2563EB] group-hover:text-white">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold tracking-wide text-[#64748B] uppercase">
                      {t('info.phone')}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold tabular-nums text-[#0F172A]">
                      {ts('company.phone')}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-[#94A3B8] transition duration-200 group-hover:text-[#2563EB]"
                  aria-hidden="true"
                />
              </a>
              <a
                href={mailHref}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-start shadow-sm transition duration-200 hover:border-[#BFDBFE] hover:shadow-md"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB] transition duration-200 group-hover:bg-[#2563EB] group-hover:text-white">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold tracking-wide text-[#64748B] uppercase">
                      {t('info.email')}
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-[#0F172A]">
                      {ts('company.email')}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-[#94A3B8] transition duration-200 group-hover:text-[#2563EB]"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </header>

        {/* Workspace: form + rail */}
        <section className={`${shell} overflow-hidden`}>
          <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,1fr)]">
            <form
              noValidate
              className="flex flex-col p-6 sm:p-8 lg:border-e lg:border-[#E2E8F0] lg:p-10 xl:p-12"
              onSubmit={handleSubmit}
              aria-busy={sending}
            >
              <div className="mb-8 space-y-2 border-b border-[#E2E8F0] pb-8">
                <h2 className="text-xl font-semibold tracking-tight text-[#0F172A] sm:text-2xl">
                  {t('form.title')}
                </h2>
                <p className="max-w-prose text-sm leading-relaxed text-[#64748B] sm:text-[15px]">
                  {t('form.hint')}
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-10">
                {/* Details */}
                <div className="space-y-6">
                  <SectionHeader
                    title={t('form.sections.details')}
                    description={t('form.sections.detailsHint')}
                  />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      id={fieldIds.name}
                      label={t('form.name')}
                      error={errors.name}
                      className="min-w-0"
                    >
                      <input
                        id={fieldIds.name}
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        minLength={2}
                        disabled={disabled}
                        value={fields.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder={t('form.placeholders.name')}
                        className={`h-12 ${errors.name ? inputErr : inputOk}`}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? `${fieldIds.name}-error` : undefined}
                      />
                    </FormField>

                    <FormField
                      id={fieldIds.phone}
                      label={t('form.phone')}
                      error={errors.phone}
                      className="min-w-0"
                    >
                      <InternationalPhoneInput
                        id={fieldIds.phone}
                        value={fields.phone}
                        onChange={(value) => updateField('phone', value)}
                        onCountryChange={setPhoneCountry}
                        country={phoneCountry}
                        disabled={disabled}
                        hasError={Boolean(errors.phone)}
                        defaultCountry="SA"
                        labelsLocale={language}
                        placeholder={t('form.placeholders.phone')}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? `${fieldIds.phone}-error` : undefined}
                      />
                    </FormField>

                    <FormField
                      id={fieldIds.email}
                      label={t('form.email')}
                      error={errors.email}
                      className="sm:col-span-2"
                    >
                      <input
                        id={fieldIds.email}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={disabled}
                        value={fields.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder={t('form.placeholders.email')}
                        className={`h-12 ${errors.email ? inputErr : inputOk}`}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? `${fieldIds.email}-error` : undefined}
                      />
                    </FormField>
                  </div>
                </div>

                {/* Message composer */}
                <div className="space-y-4">
                  <SectionHeader
                    title={t('form.sections.message')}
                    description={t('form.sections.messageHint')}
                  />
                  <FormField id={fieldIds.message} label={t('form.message')} error={errors.message}>
                    <div
                      className={[
                        'rounded-2xl border-2 border-dashed bg-[#F8FAFC]/80 p-4 transition duration-200',
                        errors.message
                          ? 'border-red-300 bg-red-50/30'
                          : 'border-[#CBD5E1] focus-within:border-[#2563EB] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]',
                      ].join(' ')}
                    >
                      <div className="mb-3 flex items-center gap-2 text-[#64748B]">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-[#E2E8F0]">
                          <MessageSquareText className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                        </span>
                        <span className="text-xs font-medium">{t('form.placeholders.message')}</span>
                      </div>
                      <textarea
                        id={fieldIds.message}
                        name="message"
                        required
                        minLength={10}
                        disabled={disabled}
                        value={fields.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder={t('form.placeholders.message')}
                        className={[
                          'min-h-40 w-full resize-y rounded-xl border-0 bg-white px-4 py-3.5 text-[15px] leading-relaxed text-[#0F172A] shadow-sm ring-1 outline-none transition duration-200 placeholder:text-[#94A3B8] disabled:opacity-70',
                          errors.message
                            ? 'ring-red-300 focus:ring-[3px] focus:ring-red-500/20'
                            : 'ring-[#E2E8F0] focus:ring-[3px] focus:ring-[#2563EB]/20',
                        ].join(' ')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? `${fieldIds.message}-error` : undefined}
                      />
                    </div>
                  </FormField>
                </div>
              </div>

              <div className="mt-10 flex justify-stretch border-t border-[#E2E8F0] pt-8 sm:justify-end">
                <button
                  type="submit"
                  disabled={disabled}
                  className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#2563EB] px-8 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(37,99,235,0.25),0_10px_28px_rgba(37,99,235,0.28)] transition duration-200 hover:bg-[#1D4ED8] hover:shadow-[0_1px_2px_rgba(29,78,216,0.3),0_14px_32px_rgba(37,99,235,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563EB]/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none sm:w-auto sm:min-w-[240px]"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {ts('ui.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {t('form.action')}
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Contact rail */}
            <aside className="flex flex-col bg-[#F1F5F9] p-6 sm:p-8 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold tracking-tight text-[#0F172A]">{t('info.title')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{ts('brand.name')}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <ContactChannel icon={<Phone className="h-4 w-4" />} label={t('info.phone')}>
                  <a
                    href={phoneHref}
                    className="tabular-nums transition-colors duration-200 hover:text-[#2563EB]"
                  >
                    {ts('company.phone')}
                  </a>
                </ContactChannel>
                <ContactChannel icon={<Mail className="h-4 w-4" />} label={t('info.email')}>
                  <a href={mailHref} className="break-all transition-colors duration-200 hover:text-[#2563EB]">
                    {ts('company.email')}
                  </a>
                </ContactChannel>
                <ContactChannel icon={<MapPin className="h-4 w-4" />} label={t('info.address')}>
                  <span>{ts('company.address')}</span>
                </ContactChannel>
                <ContactChannel icon={<Clock className="h-4 w-4" />} label={t('info.hours')}>
                  <span>{ts('company.hours')}</span>
                </ContactChannel>
              </ul>
            </aside>
          </div>
        </section>

        {/* Map */}
        <section className={`${shell} p-6 sm:p-8 lg:p-10`}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-[#0F172A]">{t('map.title')}</h3>
              <p className="mt-1.5 text-sm text-[#64748B]">{ts('company.address')}</p>
            </div>
          </div>
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(37,99,235,0.08),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(148,163,184,0.15),transparent_45%)]"
            />
            <div className="relative grid min-h-[220px] place-items-center px-6 py-14 sm:min-h-[260px]">
              <div className="flex max-w-sm flex-col items-center gap-4 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1] bg-white shadow-sm">
                  <MapPin className="h-6 w-6 text-[#2563EB]" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-[#64748B]">{t('map.placeholder')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
