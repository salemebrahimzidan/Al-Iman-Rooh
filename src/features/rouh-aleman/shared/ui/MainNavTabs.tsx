import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MAIN_NAV_PRIMARY, resolveMainNavLabelKey } from '../nav-items'
import { mainNavTabLinkClass } from './main-nav-tab-styles'
import { MainNavMoreDropdown } from './MainNavMoreDropdown'

type Props = {
  compactLabels?: boolean
}

/** Desktop header: primary tabs + “More” dropdown for secondary routes. */
export function MainNavTabs({ compactLabels }: Props) {
  const { t } = useTranslation('shared')

  return (
    <>
      {MAIN_NAV_PRIMARY.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) => mainNavTabLinkClass(isActive)}
        >
          {t(resolveMainNavLabelKey(item, compactLabels))}
        </NavLink>
      ))}
      <MainNavMoreDropdown compactLabels={compactLabels} />
    </>
  )
}
