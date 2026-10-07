import { Outlet } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'
import { Footer } from '../ui/Footer'
import { ToastProvider } from '../ui/Toast'

export function RootLayout() {
  return (
    <ToastProvider>
      <div className="min-h-dvh bg-(--ra-bg) text-(--ra-black)">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  )
}
