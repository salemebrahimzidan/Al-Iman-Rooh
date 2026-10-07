import { useEffect, useState } from 'react'

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

type ParsedValue = {
  prefix: string
  target: number
  suffix: string
  grouped: boolean
  arabicDigits: boolean
}

function parseValue(value: string): ParsedValue | null {
  const match = value.match(/^(\D*)([\d٠-٩][\d٠-٩,٬]*)(.*)$/)
  if (!match) return null
  const [, prefix = '', digits = '', suffix = ''] = match
  const latin = digits.replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d))).replace(/[,٬]/g, '')
  return {
    prefix,
    target: Number(latin),
    suffix,
    grouped: /[,٬]/.test(digits),
    arabicDigits: /[٠-٩]/.test(digits),
  }
}

function formatNumber(n: number, { grouped, arabicDigits }: ParsedValue) {
  const text = grouped ? n.toLocaleString('en-US') : String(n)
  return arabicDigits ? text.replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)] ?? d) : text
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t))

type CountUpProps = {
  /** Display value such as "+25,000", "98٪" or "+15"; only the number part animates. */
  value: string
  start: boolean
  durationMs?: number
  delayMs?: number
}

export function CountUp({ value, start, durationMs = 1800, delayMs = 0 }: CountUpProps) {
  const parsed = parseValue(value)
  const target = parsed?.target
  const [current, setCurrent] = useState(0)
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (!start || target === undefined || reducedMotion) return

    let frame = 0
    let startTime: number | null = null
    const tick = (now: number) => {
      startTime ??= now + delayMs
      const progress = Math.max(0, Math.min(1, (now - startTime) / durationMs))
      setCurrent(Math.round(target * easeOutExpo(progress)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target, durationMs, delayMs, reducedMotion])

  if (!parsed) return <>{value}</>
  const shown = reducedMotion ? parsed.target : current

  return (
    <span className="relative inline-grid">
      <span className="sr-only">{value}</span>
      {/* Invisible final value reserves the width so the layout doesn't shift while counting. */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {value}
      </span>
      <span className="col-start-1 row-start-1" aria-hidden="true">
        {parsed.prefix}
        {formatNumber(shown, parsed)}
        {parsed.suffix}
      </span>
    </span>
  )
}
