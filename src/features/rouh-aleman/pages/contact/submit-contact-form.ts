import { buildInquiryEmailPayload } from '../../../../services/web3forms/format-inquiry-email'
import { submitToWeb3Forms } from '../../../../services/web3forms'

export type ContactFormPayload = {
  name: string
  phone: string
  email: string
  message: string
}

function buildSubject(name: string): string {
  const trimmed = name.trim()
  return trimmed
    ? `Contact inquiry — ${trimmed} | Al Eman Rooh`
    : 'Contact inquiry | Al Eman Rooh'
}

function contactPageUrl(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/contact`
  }
  const site = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
  return site ? `${site}/contact` : 'https://alimanrouh.com/contact'
}

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  console.log('[ContactForm] submitContactForm called')
  await submitToWeb3Forms(
    buildInquiryEmailPayload(
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        page: contactPageUrl(),
      },
      buildSubject(payload.name),
    ),
  )
}
