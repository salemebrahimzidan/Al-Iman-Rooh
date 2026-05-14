import { useTranslation } from 'react-i18next'

export function AboutPage() {
  const { t } = useTranslation('about')

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-(--ra-green) sm:text-3xl">{t('title')}</h1>
      <p className="mt-4 text-pretty leading-relaxed text-(--ra-muted)">{t('body')}</p>
    </div>
  )
}
