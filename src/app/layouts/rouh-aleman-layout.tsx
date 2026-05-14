import { Outlet } from 'react-router-dom'
import { TopBar } from '../../features/rouh-aleman/shared/ui/TopBar'
import { Navbar } from '../../features/rouh-aleman/shared/ui/Navbar'
import { Footer } from '../../features/rouh-aleman/shared/ui/Footer'

export function RouhAlemanLayout() {
  return (
    <div className="relative min-h-dvh bg-[#f7f8fa] text-(--ra-black)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_15%_5%,rgba(42,169,224,0.14),transparent_60%),radial-gradient(60%_60%_at_85%_10%,rgba(10,122,59,0.12),transparent_55%)]"
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

