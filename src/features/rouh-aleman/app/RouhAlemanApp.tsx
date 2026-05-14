import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootLayout } from '../shared/layout/RootLayout'
import { HomePage } from '../pages/home/HomePage'
import { FlightsPage } from '../pages/flights/FlightsPage'
import { HajjPage } from '../pages/hajj/HajjPage'
import { UmrahPage } from '../pages/umrah/UmrahPage'
import { TourismPage } from '../pages/tourism/TourismPage'
import { HotelsPage } from '../pages/hotels/HotelsPage'
import { OffersPage } from '../pages/offers/OffersPage'
import { ContactPage } from '../pages/contact/ContactPage'

export function RouhAlemanApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/hajj" element={<HajjPage />} />
          <Route path="/umrah" element={<UmrahPage />} />
          <Route path="/tourism" element={<TourismPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
