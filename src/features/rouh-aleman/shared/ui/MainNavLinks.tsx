import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  MAIN_NAV_MORE,
  MAIN_NAV_PRIMARY,
  resolveMainNavLabelKey,
  type MainNavItem,
} from '../nav-items'
import { mainNavDrawerLinkClass } from './main-nav-tab-styles'

type Props = {
  onNavigate?: () => void
}

function NavDrawerLink({ item, onNavigate }: { item: MainNavItem; onNavigate?: () => void }) {
  const { t } = useTranslation('shared')

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onClick={onNavigate}
      className={({ isActive }) => mainNavDrawerLinkClass(isActive)}
    >
      {t(resolveMainNavLabelKey(item))}
    </NavLink>
  )
}

/** Mobile drawer: primary links first, then secondary (same tiers as desktop). */
export function MainNavLinks({ onNavigate }: Props) {
  const { t } = useTranslation('shared')

  return (
    <>
      {MAIN_NAV_PRIMARY.map((item) => (
        <NavDrawerLink key={item.to} item={item} onNavigate={onNavigate} />
      ))}
      <p className="px-3 pt-4 pb-0.5 text-[11px] font-bold tracking-wide text-(--ra-muted) uppercase">
        {t('nav.more')}
      </p>
      {MAIN_NAV_MORE.map((item) => (
        <NavDrawerLink key={item.to} item={item} onNavigate={onNavigate} />
      ))}
    </>
  )
}
