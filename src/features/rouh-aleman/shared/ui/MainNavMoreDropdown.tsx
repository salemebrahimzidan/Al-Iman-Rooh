import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { isMainNavMoreActive, MAIN_NAV_MORE, resolveMainNavLabelKey } from '../nav-items'
import { mainNavTabLinkClass } from './main-nav-tab-styles'

type Props = {
  compactLabels?: boolean
}

type MenuPosition = {
  top: number
  left?: number
  right?: number
}

const MENU_MIN_WIDTH = 176
const VIEWPORT_PAD = 8
const MENU_GAP = 6

function computeMenuPosition(button: HTMLElement, menuWidth: number): MenuPosition {
  const rect = button.getBoundingClientRect()
  const top = rect.bottom + MENU_GAP
  const isRtl = document.documentElement.dir === 'rtl'

  if (isRtl) {
    // RTL: anchor to button's inline-start (physical right), menu opens toward the right
    let right: number | undefined = window.innerWidth - rect.right
    let left: number | undefined

    if (rect.left + menuWidth > window.innerWidth - VIEWPORT_PAD) {
      left = Math.max(VIEWPORT_PAD, rect.right - menuWidth)
      right = undefined
    }

    return { top, left, right }
  }

  // LTR: anchor to button's inline-end (physical right), menu opens toward the left
  let right: number | undefined = window.innerWidth - rect.right
  let left: number | undefined

  if (rect.right - menuWidth < VIEWPORT_PAD) {
    left = VIEWPORT_PAD
    right = undefined
  }

  return { top, left, right }
}

export function MainNavMoreDropdown({ compactLabels }: Props) {
  const { t } = useTranslation('shared')
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [menuPos, setMenuPos] = useState<MenuPosition | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const menuId = useId()
  const groupActive = isMainNavMoreActive(pathname)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const updateMenuPosition = () => {
    const button = buttonRef.current
    if (!button) return
    const menuWidth = menuRef.current?.offsetWidth ?? MENU_MIN_WIDTH
    setMenuPos(computeMenuPosition(button, menuWidth))
  }

  useLayoutEffect(() => {
    if (!open) {
      setMenuPos(null)
      return
    }

    updateMenuPosition()
    const raf = requestAnimationFrame(updateMenuPosition)
    window.addEventListener('resize', updateMenuPosition)
    window.addEventListener('scroll', updateMenuPosition, true)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', updateMenuPosition)
      window.removeEventListener('scroll', updateMenuPosition, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    let removeListeners: (() => void) | undefined

    const timer = window.setTimeout(() => {
      const onPointerDown = (event: PointerEvent) => {
        const target = event.target as Node
        if (buttonRef.current?.contains(target)) return
        if (menuRef.current?.contains(target)) return
        setOpen(false)
      }
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setOpen(false)
      }

      document.addEventListener('pointerdown', onPointerDown)
      document.addEventListener('keydown', onKeyDown)
      removeListeners = () => {
        document.removeEventListener('pointerdown', onPointerDown)
        document.removeEventListener('keydown', onKeyDown)
      }
    }, 0)

    return () => {
      window.clearTimeout(timer)
      removeListeners?.()
    }
  }, [open])

  const menu =
    open && menuPos
      ? createPortal(
          <ul
            ref={menuRef}
            id={menuId}
            role="menu"
            dir={document.documentElement.dir}
            style={{
              position: 'fixed',
              top: menuPos.top,
              left: menuPos.left,
              right: menuPos.right,
              zIndex: 100,
            }}
            className="min-w-44 overflow-hidden rounded-2xl border border-(--ra-border) bg-white py-1 text-start shadow-[0_16px_40px_rgba(11,15,20,0.12)]"
          >
            {MAIN_NAV_MORE.map((item) => (
              <li key={item.to} role="none">
                <NavLink
                  to={item.to}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      'block px-3.5 py-2.5 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-(--ra-gold)/12 text-(--ra-green)'
                        : 'text-(--ra-black)/90 hover:bg-(--ra-bg)',
                    ].join(' ')
                  }
                >
                  {t(resolveMainNavLabelKey(item, compactLabels))}
                </NavLink>
              </li>
            ))}
          </ul>,
          document.body,
        )
      : null

  return (
    <div className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={[
          mainNavTabLinkClass(groupActive),
          'inline-flex items-center gap-1',
        ].join(' ')}
      >
        {t('nav.more')}
        <ChevronDown
          className={['h-3.5 w-3.5 shrink-0 opacity-80 transition-transform', open ? 'rotate-180' : ''].join(
            ' ',
          )}
          aria-hidden="true"
        />
      </button>
      {menu}
    </div>
  )
}
