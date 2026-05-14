import { Route, Routes } from 'react-router-dom'
import { RouhAlemanLayout } from '../../../app/layouts/rouh-aleman-layout'

import { HomePage } from '../pages/home/HomePage'
import { FlightsPage } from '../pages/flights/FlightsPage'
import { HajjPage } from '../pages/hajj/HajjPage'
import { UmrahPage } from '../pages/umrah/UmrahPage'
import { TourismPage } from '../pages/tourism/TourismPage'
import { HotelsPage } from '../pages/hotels/HotelsPage'
import { OffersPage } from '../pages/offers/OffersPage'
import { ContactPage } from '../pages/contact/ContactPage'
import { AboutPage } from '../pages/about/AboutPage'

export function RouhAlemanRoutes() {
  return (
    <Routes>
      <Route element={<RouhAlemanLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="flights" element={<FlightsPage />} />
        <Route path="hajj" element={<HajjPage />} />
        <Route path="umrah" element={<UmrahPage />} />
        <Route path="tourism" element={<TourismPage />} />
        <Route path="hotels" element={<HotelsPage />} />
        <Route path="offers" element={<OffersPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

