/** Shared pill-tab styles for desktop main navigation. */
export function mainNavTabLinkClass(isActive: boolean) {
  return [
    'relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-tight transition-colors duration-200 lg:px-4 lg:py-2.5 lg:text-sm',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ra-green)',
    isActive
      ? 'bg-(--ra-green) text-white shadow-[0_6px_18px_rgba(6,51,39,0.25)]'
      : 'text-(--ra-muted) hover:text-(--ra-green)',
  ].join(' ')
}

/** Desktop tab row — layout only; no strip background or border. */
export const mainNavTabListClass =
  'relative flex min-w-0 flex-wrap items-center justify-center gap-1.5 overflow-visible'

/** Mobile drawer link — matches desktop active pill, no row backgrounds. */
export function mainNavDrawerLinkClass(isActive: boolean) {
  return [
    'block rounded-full px-3 py-3 text-sm font-semibold transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ra-green)',
    isActive
      ? 'bg-(--ra-green) text-white shadow-[0_6px_18px_rgba(6,51,39,0.22)]'
      : 'text-(--ra-black)/90 hover:text-(--ra-green)',
  ].join(' ')
}
