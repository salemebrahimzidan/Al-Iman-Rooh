import { useEffect, useId, useMemo, useState, type ReactNode } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  MessageSquareText,
  Minus,
  Package,
  Plus,
  Send,
  Sparkles,
  User,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Country } from 'react-phone-number-input';

import { createBooking } from '../../../../services/bookings';
import { getPackages, type PackageItem } from '../../../../services/packages';
import { useLanguage } from '../../shared/hooks/useLanguage';
import { InternationalPhoneInput } from '../../shared/ui/InternationalPhoneInput';
import { isValidInternationalPhone } from '../../shared/utils/phone';

const inputClass =
  'w-full rounded-xl border border-(--ra-border) bg-white py-3 text-sm font-medium text-(--ra-black) shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition duration-200 focus:border-(--ra-green)/35 focus:ring-2 focus:ring-(--ra-ring) disabled:cursor-not-allowed disabled:bg-(--ra-bg) disabled:opacity-70';

type SectionHeaderProps = {
  title: string;
  description: string;
};

function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-1">
      <h2 className="text-base font-semibold tracking-tight text-(--ra-green) sm:text-lg">
        {title}
      </h2>
      <p className="text-sm leading-relaxed text-(--ra-muted)">{description}</p>
    </div>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

function FormField({
  id,
  label,
  required = false,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <label htmlFor={id} className={`grid min-w-0 gap-1.5 ${className}`}>
      <span className="text-xs font-semibold text-(--ra-muted)">
        {label}
        {required ? (
          <span className="ms-1 font-normal text-(--ra-gold)">*</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}

type TravelerCounterProps = {
  label: string;
  value: number;
  min: number;
  decreaseLabel: string;
  increaseLabel: string;
  onChange: (value: number) => void;
};

function TravelerCounter({
  label,
  value,
  min,
  decreaseLabel,
  increaseLabel,
  onChange,
}: TravelerCounterProps) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-(--ra-border) bg-(--ra-bg)/60 px-3.5 py-2.5">
      <span className="text-sm font-semibold text-(--ra-black)">{label}</span>

      <div className="flex items-center gap-1 rounded-lg border border-(--ra-border) bg-white p-0.5">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-(--ra-green) transition hover:bg-(--ra-bg) disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={decreaseLabel}
        >
          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <span className="min-w-7 text-center text-sm font-bold tabular-nums text-(--ra-black)">
          {value}
        </span>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-(--ra-green) transition hover:bg-(--ra-bg)"
          aria-label={increaseLabel}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function formatPrice(price: number, locale: string) {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA').format(price);
}

export function BookingPage() {
  const { t } = useTranslation('booking');
  const { t: ts } = useTranslation('shared');
  const { language } = useLanguage();
  const formId = useId();
  const [loading, setLoading] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [phoneCountry, setPhoneCountry] = useState<Country>('SA');

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    adults: 1,
    children: 0,
    travelDate: '',
    packageId: '',
    notes: '',
  });

  useEffect(() => {
    getPackages()
      .then((data) => {
        const activePackages = data.filter((item) => item.isActive);
        setPackages(activePackages);

        if (activePackages.length > 0) {
          setForm((current) => ({
            ...current,
            packageId: current.packageId || activePackages[0].id,
          }));
        }
      })
      .catch(() => {
        setError(t('form.errors.loadPackages'));
      })
      .finally(() => {
        setLoadingPackages(false);
      });
    // Load packages once on mount; error copy uses language at fetch time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === form.packageId),
    [packages, form.packageId],
  );

  function validate() {
    if (form.fullName.trim().length < 2) return t('form.errors.fullName');
    if (!isValidInternationalPhone(form.phone, phoneCountry)) {
      return t('form.errors.phone');
    }
    if (!form.travelDate) return t('form.errors.travelDate');
    if (!form.packageId) return t('form.errors.package');
    return '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');

      await createBooking({
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        adults: form.adults,
        children: form.children,
        travelDate: form.travelDate,
        packageId: form.packageId,
        notes: form.notes.trim() || undefined,
      });

      setSuccess(true);

      setForm({
        fullName: '',
        phone: '',
        email: '',
        adults: 1,
        children: 0,
        travelDate: '',
        packageId: packages[0]?.id ?? '',
        notes: '',
      });
    } catch {
      setError(t('form.errors.submitFailed'));
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="-mx-4 sm:-mx-6">
        <div className="relative w-full overflow-hidden rounded-none border-y border-(--ra-border) bg-white p-8 text-center shadow-(--ra-shadow) ring-1 ring-black/2 sm:rounded-[22px] sm:border sm:p-10">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--ra-gold)/40 to-transparent"
            aria-hidden="true"
          />

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-(--ra-gold-soft) text-(--ra-green) ring-1 ring-(--ra-gold)/25">
            <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-(--ra-gold)">
            {ts('brand.nameShort')}
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-(--ra-green) sm:text-3xl">
            {t('success.title')}
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-(--ra-muted) sm:text-base">
            {t('success.message')}
          </p>

          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-(--ra-green) px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(6,51,39,0.28)] transition motion-safe:hover:-translate-y-0.5 hover:bg-(--ra-green-2)"
          >
            {t('success.action')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="-mx-4 sm:-mx-6">
      <div className="relative w-full overflow-hidden rounded-none border-y border-(--ra-border) bg-white shadow-(--ra-shadow) ring-1 ring-black/2 sm:rounded-[22px] sm:border">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--ra-gold)/45 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -inset-e-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(198,160,74,0.12),transparent_70%)]"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="relative border-b border-(--ra-border) px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-(--ra-gold)">
            <Sparkles className="h-3 w-3 opacity-90" aria-hidden="true" />
            {ts('brand.nameShort')}
          </p>

          <h1 className="mt-2 text-balance text-xl font-bold tracking-tight text-(--ra-green) sm:text-2xl">
            {t('header.title')}
          </h1>

          <p className="mt-1.5 text-sm leading-relaxed text-(--ra-muted)">
            {t('header.subtitle')}
          </p>

          <p className="mt-2 text-xs text-(--ra-muted)">{t('form.requiredHint')}</p>
        </div>

        {/* Body */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,32%)]">
          <form onSubmit={handleSubmit} className="min-w-0">
            <div className="space-y-6 px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:pe-6">
              {error ? (
                <div
                  className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-medium text-red-700"
                  role="alert"
                >
                  {error}
                </div>
              ) : null}

              <section className="space-y-4">
                <SectionHeader
                  title={t('form.sections.details.title')}
                  description={t('form.sections.details.description')}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    id={`${formId}-fullName`}
                    label={t('form.fields.fullName')}
                    required
                  >
                    <span className="relative block">
                      <User
                        className="pointer-events-none absolute inset-s-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-green)"
                        aria-hidden="true"
                      />
                      <input
                        id={`${formId}-fullName`}
                        placeholder={t('form.placeholders.fullName')}
                        autoComplete="name"
                        className={`${inputClass} ps-10 pe-4`}
                        value={form.fullName}
                        onChange={(e) =>
                          setForm({ ...form, fullName: e.target.value })
                        }
                      />
                    </span>
                  </FormField>

                  <FormField
                    id={`${formId}-phone`}
                    label={t('form.fields.phone')}
                    required
                  >
                    <InternationalPhoneInput
                      id={`${formId}-phone`}
                      value={form.phone}
                      onChange={(phone) => setForm({ ...form, phone })}
                      onCountryChange={setPhoneCountry}
                      country={phoneCountry}
                      defaultCountry="SA"
                      labelsLocale={language}
                      placeholder={t('form.placeholders.phone')}
                      disabled={loading}
                    />
                  </FormField>

                  <FormField id={`${formId}-email`} label={t('form.fields.email')}>
                    <span className="relative block">
                      <Mail
                        className="pointer-events-none absolute inset-s-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-green)"
                        aria-hidden="true"
                      />
                      <input
                        id={`${formId}-email`}
                        placeholder={t('form.placeholders.email')}
                        type="email"
                        autoComplete="email"
                        className={`${inputClass} ps-10 pe-4`}
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </span>
                  </FormField>
                </div>
              </section>

              <div className="h-px bg-(--ra-border)" aria-hidden="true" />

              <section className="space-y-4">
                <SectionHeader
                  title={t('form.sections.trip.title')}
                  description={t('form.sections.trip.description')}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    id={`${formId}-travelDate`}
                    label={t('form.fields.travelDate')}
                    required
                  >
                    <span className="relative block">
                      <CalendarDays
                        className="pointer-events-none absolute inset-s-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-green)"
                        aria-hidden="true"
                      />
                      <input
                        id={`${formId}-travelDate`}
                        type="date"
                        className={`${inputClass} ps-10 pe-4`}
                        value={form.travelDate}
                        onChange={(e) =>
                          setForm({ ...form, travelDate: e.target.value })
                        }
                      />
                    </span>
                  </FormField>

                  <FormField
                    id={`${formId}-package`}
                    label={t('form.fields.package')}
                    required
                  >
                    <span className="relative block">
                      <Package
                        className="pointer-events-none absolute inset-s-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-green)"
                        aria-hidden="true"
                      />
                      <select
                        id={`${formId}-package`}
                        disabled={loadingPackages}
                        className={`${inputClass} cursor-pointer appearance-none ps-10 pe-10`}
                        value={form.packageId}
                        onChange={(e) =>
                          setForm({ ...form, packageId: e.target.value })
                        }
                      >
                        {loadingPackages && (
                          <option>{t('form.package.loading')}</option>
                        )}

                        {!loadingPackages && packages.length === 0 && (
                          <option value="">{t('form.package.noPackagesOption')}</option>
                        )}

                        {!loadingPackages &&
                          packages.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.title} — {formatPrice(item.price, language)}{' '}
                              {t('currency.sar')}
                            </option>
                          ))}
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute inset-e-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--ra-muted)"
                        aria-hidden="true"
                      />
                    </span>
                  </FormField>

                  <TravelerCounter
                    label={t('form.fields.adults')}
                    value={form.adults}
                    min={1}
                    decreaseLabel={t('form.counter.decrease', {
                      label: t('form.fields.adults'),
                    })}
                    increaseLabel={t('form.counter.increase', {
                      label: t('form.fields.adults'),
                    })}
                    onChange={(adults) => setForm({ ...form, adults })}
                  />

                  <TravelerCounter
                    label={t('form.fields.children')}
                    value={form.children}
                    min={0}
                    decreaseLabel={t('form.counter.decrease', {
                      label: t('form.fields.children'),
                    })}
                    increaseLabel={t('form.counter.increase', {
                      label: t('form.fields.children'),
                    })}
                    onChange={(children) => setForm({ ...form, children })}
                  />
                </div>
              </section>

              <div className="h-px bg-(--ra-border)" aria-hidden="true" />

              <section className="space-y-4">
                <SectionHeader
                  title={t('form.sections.notes.title')}
                  description={t('form.sections.notes.description')}
                />

                <label htmlFor={`${formId}-notes`} className="grid gap-2">
                  <span className="sr-only">{t('form.fields.notes')}</span>
                  <span className="relative block">
                    <MessageSquareText
                      className="pointer-events-none absolute inset-s-3.5 top-3.5 h-4 w-4 text-(--ra-green)"
                      aria-hidden="true"
                    />
                    <textarea
                      id={`${formId}-notes`}
                      rows={4}
                      placeholder={t('form.placeholders.notes')}
                      className={`${inputClass} min-h-24 resize-y ps-10 pe-4 pt-3 leading-relaxed`}
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                    />
                  </span>
                </label>
              </section>
            </div>

            <div className="flex border-t border-(--ra-border) bg-(--ra-bg)/50 px-5 py-4 sm:px-6 lg:px-8">
              <button
                type="submit"
                disabled={loading || loadingPackages}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(--ra-green) px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(6,51,39,0.24)] transition hover:bg-(--ra-green-2) disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none sm:ms-auto sm:w-auto sm:min-w-[200px]"
              >
                {loading ? (
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

          {/* Package summary */}
          <aside className="border-t border-(--ra-border) bg-linear-to-b from-(--ra-bg)/80 to-(--ra-bg)/40 lg:border-t-0 lg:border-s">
            <div className="px-5 py-5 sm:px-6 sm:py-6 lg:sticky lg:top-24 lg:px-6 lg:py-6">
              <p className="text-[11px] font-semibold tracking-widest text-(--ra-muted) uppercase">
                {t('summary.title')}
              </p>

              {selectedPackage ? (
                <div className="mt-3">
                  <h2 className="text-lg font-bold leading-snug text-(--ra-green)">
                    {selectedPackage.title}
                  </h2>

                  <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-(--ra-muted)">
                    {selectedPackage.description || t('summary.noDescription')}
                  </p>

                  <div className="mt-4 overflow-hidden rounded-xl bg-(--ra-green) p-4 text-white">
                    <p className="text-[11px] font-semibold tracking-wide text-white/75 uppercase">
                      {t('summary.estimatedPrice')}
                    </p>

                    <p className="mt-1 text-2xl font-bold tabular-nums">
                      {formatPrice(selectedPackage.price, language)} {t('currency.sar')}
                    </p>

                    <p className="mt-1.5 text-xs text-white/80">
                      {selectedPackage.duration
                        ? t('summary.days', { count: selectedPackage.duration })
                        : t('summary.durationNotSpecified')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-3 flex min-h-[100px] items-center justify-center rounded-xl border border-dashed border-(--ra-border) bg-white/60 px-4 text-center">
                  <p className="text-sm text-(--ra-muted)">{t('summary.empty')}</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
