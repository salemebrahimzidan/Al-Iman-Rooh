import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  User,
  Users,
} from 'lucide-react';

import { createBooking } from '../../../../services/bookings';
import { getPackages, type PackageItem } from '../../../../services/packages';

export function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
        setError('Failed to load packages');
      })
      .finally(() => {
        setLoadingPackages(false);
      });
  }, []);

  const selectedPackage = useMemo(
    () => packages.find((item) => item.id === form.packageId),
    [packages, form.packageId],
  );

  function validate() {
    if (form.fullName.trim().length < 2) return 'Full name is required';
    if (form.phone.trim().length < 6) return 'Phone number is required';
    if (!form.travelDate) return 'Travel date is required';
    if (!form.packageId) return 'Please select a package';
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
      setError('Failed to send booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="rounded-3xl border border-emerald-100 bg-white p-10 text-center shadow-[0_22px_70px_rgba(2,6,23,0.08)]">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={42} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Your booking has been received
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Thank you. Our team will contact you shortly to confirm your trip
            details.
          </p>

          <button
            onClick={() => setSuccess(false)}
            className="mt-8 rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Create another booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Al Iman Rouh
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          Book Your Trip
        </h1>

        <p className="mt-3 max-w-2xl text-slate-500">
          Fill in your details and our team will contact you shortly to complete
          the reservation.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(2,6,23,0.06)] sm:p-8"
        >
          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Full Name
              </span>

              <span className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                />
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Phone Number
              </span>

              <span className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  placeholder="05xxxxxxxx"
                  className="w-full rounded-xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Email
              </span>

              <span className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  placeholder="email@example.com"
                  type="email"
                  className="w-full rounded-xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Travel Date
              </span>

              <span className="relative">
                <CalendarDays
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  value={form.travelDate}
                  onChange={(e) =>
                    setForm({ ...form, travelDate: e.target.value })
                  }
                />
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Adults
              </span>

              <span className="relative">
                <Users
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="number"
                  min={1}
                  className="w-full rounded-xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  value={form.adults}
                  onChange={(e) =>
                    setForm({ ...form, adults: Number(e.target.value) })
                  }
                />
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-700">
                Children
              </span>

              <span className="relative">
                <Users
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="number"
                  min={0}
                  className="w-full rounded-xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  value={form.children}
                  onChange={(e) =>
                    setForm({ ...form, children: Number(e.target.value) })
                  }
                />
              </span>
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Package
              </span>

              <select
                disabled={loadingPackages}
                className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:bg-slate-50"
                value={form.packageId}
                onChange={(e) =>
                  setForm({ ...form, packageId: e.target.value })
                }
              >
                {loadingPackages && <option>Loading packages...</option>}

                {!loadingPackages && packages.length === 0 && (
                  <option value="">No packages available</option>
                )}

                {!loadingPackages &&
                  packages.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title} - {item.price} SAR
                    </option>
                  ))}
              </select>
            </label>

            <label className="grid gap-2 md:col-span-2">
              <span className="text-sm font-semibold text-slate-700">
                Additional Notes
              </span>

              <span className="relative">
                <MessageSquareText
                  className="absolute left-4 top-4 text-slate-400"
                  size={18}
                />

                <textarea
                  rows={5}
                  placeholder="Any special request?"
                  className="w-full resize-y rounded-xl border border-slate-200 py-4 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                />
              </span>
            </label>
          </div>

          <button
            disabled={loading || loadingPackages}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Send size={18} />
            {loading ? 'Sending...' : 'Book Now'}
          </button>
        </form>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(2,6,23,0.06)]">
          <p className="text-sm font-semibold text-slate-500">
            Selected Package
          </p>

          {selectedPackage ? (
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedPackage.title}
              </h2>

              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-slate-500">
                {selectedPackage.description || 'No description available.'}
              </p>

              <div className="mt-6 rounded-2xl bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-700">
                  Estimated Price
                </p>

                <p className="mt-1 text-3xl font-bold text-emerald-900">
                  {selectedPackage.price} SAR
                </p>

                <p className="mt-2 text-sm text-emerald-700">
                  {selectedPackage.duration
                    ? `${selectedPackage.duration} days`
                    : 'Duration not specified'}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              Select a package to see its details.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}