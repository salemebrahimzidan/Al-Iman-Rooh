import sharedEn from '../../shared/locales/en.json'
import sharedAr from '../../shared/locales/ar.json'

import homeEn from '../../pages/home/locales/en.json'
import homeAr from '../../pages/home/locales/ar.json'

import flightsEn from '../../pages/flights/locales/en.json'
import flightsAr from '../../pages/flights/locales/ar.json'

import hajjEn from '../../pages/hajj/locales/en.json'
import hajjAr from '../../pages/hajj/locales/ar.json'

import umrahEn from '../../pages/umrah/locales/en.json'
import umrahAr from '../../pages/umrah/locales/ar.json'

import tourismEn from '../../pages/tourism/locales/en.json'
import tourismAr from '../../pages/tourism/locales/ar.json'

import hotelsEn from '../../pages/hotels/locales/en.json'
import hotelsAr from '../../pages/hotels/locales/ar.json'

import offersEn from '../../pages/offers/locales/en.json'
import offersAr from '../../pages/offers/locales/ar.json'

import contactEn from '../../pages/contact/locales/en.json'
import contactAr from '../../pages/contact/locales/ar.json'

export const resources = {
  en: {
    shared: sharedEn,
    home: homeEn,
    flights: flightsEn,
    hajj: hajjEn,
    umrah: umrahEn,
    tourism: tourismEn,
    hotels: hotelsEn,
    offers: offersEn,
    contact: contactEn,
  },
  ar: {
    shared: sharedAr,
    home: homeAr,
    flights: flightsAr,
    hajj: hajjAr,
    umrah: umrahAr,
    tourism: tourismAr,
    hotels: hotelsAr,
    offers: offersAr,
    contact: contactAr,
  },
} as const

export type AppLanguage = keyof typeof resources
