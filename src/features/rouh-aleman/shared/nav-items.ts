/** Primary header navigation (order matches Arabic reading order in RTL). */
export const MAIN_NAV = [
  { to: '/', key: 'nav.home', end: true },
  { to: '/offers', key: 'nav.programs' },
  { to: '/hotels', key: 'nav.services' },
  { to: '/umrah', key: 'nav.umrah' },
  { to: '/hajj', key: 'nav.hajj' },
  { to: '/tourism', key: 'nav.destinations' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
] as const
