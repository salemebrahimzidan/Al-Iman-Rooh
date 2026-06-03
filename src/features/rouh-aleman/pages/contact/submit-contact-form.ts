import { submitContactInquiry, type Web3FormsContactFields } from '../../../../services/web3forms'

export type ContactFormPayload = {
  name: string
  phone: string
  email: string
  message: string
}

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  const fields: Web3FormsContactFields = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    message: payload.message,
  }
  await submitContactInquiry(fields)
}
