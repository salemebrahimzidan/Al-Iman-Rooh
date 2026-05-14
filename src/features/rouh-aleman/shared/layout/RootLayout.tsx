import { Outlet } from 'react-router-dom'
import { TopBar } from '../ui/TopBar'
import { Navbar } from '../ui/Navbar'
import { Footer } from '../ui/Footer'

export function RootLayout() {
  return (
    <div className="min-h-dvh bg-(--ra-bg) text-(--ra-black)">
      <TopBar />
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
