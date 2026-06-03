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

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  await submitToWeb3Forms(
    buildInquiryEmailPayload(
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        page: '/contact',
      },
      buildSubject(payload.name),
    ),
  )
}
