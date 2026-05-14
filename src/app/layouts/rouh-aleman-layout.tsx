import { Outlet } from 'react-router-dom'
import { TopBar } from '../../features/rouh-aleman/shared/ui/TopBar'
import { Navbar } from '../../features/rouh-aleman/shared/ui/Navbar'
import { Footer } from '../../features/rouh-aleman/shared/ui/Footer'

export function RouhAlemanLayout() {
  return (
    <div className="relative min-h-dvh bg-(--ra-bg) text-(--ra-black)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_15%_5%,rgba(212,175,55,0.08),transparent_55%),radial-gradient(55%_55%_at_90%_0%,rgba(11,61,46,0.06),transparent_50%)]"
      />
      <TopBar />
      <Navbar />
      <main className="relative w-full px-4 pb-16 pt-0 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

