/** Premium easing for nav micro-interactions. */
export const navEase = 'duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]'

/** Base link reset — no browser/anchor underline on nav items. */
const navLinkReset =
  'no-underline decoration-transparent outline-none hover:no-underline focus:no-underline active:no-underline'

/** Shared pill-tab styles for desktop main navigation. */
export function mainNavTabLinkClass(isActive: boolean) {
  return [
    navLinkReset,
    'relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-tight lg:px-4 lg:py-2 lg:text-sm',
    `transition-[color,background-color,box-shadow,ring-color,transform] ${navEase}`,
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ra-green)',
    isActive
      ? [
          'bg-linear-to-b from-(--ra-green) to-(--ra-green-2) text-white',
          'shadow-[0_3px_12px_rgba(6,51,39,0.18)]',
          'ring-1 ring-(--ra-gold)/22',
        ].join(' ')
      : [
          'text-(--ra-muted)',
          'hover:bg-(--ra-green)/[0.06] hover:text-(--ra-green)',
          'motion-safe:hover:scale-[1.01]',
        ].join(' '),
  ].join(' ')
}

/** Desktop tab row — layout only. */
export const mainNavTabListClass =
  'relative flex min-w-0 flex-wrap items-center justify-center gap-1 overflow-visible'

/** Premium CTA — Book now (desktop + mobile). */
export const bookNowButtonClass = [
  'inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-b from-(--ra-green) to-(--ra-green-2) font-semibold text-white',
  'no-underline decoration-transparent',
  'ring-1 ring-(--ra-gold)/22',
  'shadow-[0_6px_20px_rgba(6,51,39,0.26)]',
  `transition-[transform,box-shadow,filter,ring-color] ${navEase}`,
  'motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_8px_24px_rgba(6,51,39,0.3)] motion-safe:hover:ring-(--ra-gold)/35 motion-safe:hover:brightness-[1.03]',
  'active:translate-y-0 active:brightness-100 active:shadow-[0_4px_14px_rgba(6,51,39,0.22)]',
].join(' ')

/** Phone action beside Book now. */
export const navPhoneButtonClass = [
  'inline-flex items-center justify-center gap-2 rounded-xl border border-(--ra-border)/90 bg-white text-(--ra-green)',
  'no-underline decoration-transparent',
  'shadow-[0_2px_8px_rgba(11,15,20,0.04)]',
  `transition-[color,background-color,border-color,box-shadow,transform] ${navEase}`,
  'hover:border-(--ra-gold)/30 hover:bg-(--ra-gold-soft)/25 hover:shadow-[0_4px_12px_rgba(11,15,20,0.06)]',
  'motion-safe:hover:-translate-y-px',
  'active:translate-y-0',
].join(' ')

/** Mobile drawer link — matches desktop active treatment. */
export function mainNavDrawerLinkClass(isActive: boolean) {
  return [
    navLinkReset,
    'block rounded-xl px-3.5 py-2.5 text-sm font-medium',
    `transition-[color,background-color,box-shadow,ring-color] ${navEase}`,
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ra-green)',
    isActive
      ? [
          'bg-linear-to-b from-(--ra-green) to-(--ra-green-2) text-white',
          'shadow-[0_3px_12px_rgba(6,51,39,0.16)]',
          'ring-1 ring-(--ra-gold)/20',
        ].join(' ')
      : 'text-(--ra-black)/88 hover:bg-(--ra-green)/[0.06] hover:text-(--ra-green)',
  ].join(' ')
}

/** Dropdown menu item inside “More”. */
export function mainNavDropdownLinkClass(isActive: boolean) {
  return [
    navLinkReset,
    'mx-1.5 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium',
    `transition-[color,background-color,box-shadow,ring-color] ${navEase}`,
    isActive
      ? 'bg-(--ra-green)/8 text-(--ra-green) shadow-[0_2px_8px_rgba(6,51,39,0.07)] ring-1 ring-(--ra-gold)/20'
      : 'text-(--ra-black)/86 hover:bg-(--ra-gold-soft)/40 hover:text-(--ra-green)',
  ].join(' ')
}
