import { useState } from 'react'
import { Landmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LOGO_SRC = '/images/brand/logo.png'

type Props = {
  compact?: boolean
  className?: string
}

export function CompanyLogo({ compact, className }: Props) {
  const { t } = useTranslation('shared')
  const [imgFailed, setImgFailed] = useState(false)

  const size = compact ? 72 : 112
  const sizeClass = compact
    ? 'h-16 w-16 sm:h-18 sm:w-18'
    : 'h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28'

  return (
    <Link
      to="/"
      className={[
        'inline-flex shrink-0 items-center rounded-full outline-none ring-(--ra-ring) transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={t('brand.name')}
    >
      <div
        className={[
          'overflow-hidden rounded-full bg-white ring-1 ring-(--ra-border)',
          sizeClass,
        ].join(' ')}
      >
        {!imgFailed ? (
          <img
            src={LOGO_SRC}
            alt=""
            width={size}
            height={size}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[center_28%]"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-white">
            <Landmark className="h-8 w-8 text-(--ra-green) lg:h-10 lg:w-10" aria-hidden="true" />
          </span>
        )}
      </div>
    </Link>
  )
}
