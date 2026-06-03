import { submitToWeb3Forms } from '../../../../services/web3forms'

export type ContactFormPayload = {
  name: string
  phone: string
  email: string
  message: string
}

const CONTACT_SUBJECT = 'New inquiry from Al Iman Rouh website'
const CONTACT_SERVICE = 'General inquiry'

export async function submitContactForm(payload: ContactFormPayload): Promise<void> {
  await submitToWeb3Forms({
    subject: CONTACT_SUBJECT,
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    service: CONTACT_SERVICE,
    message: payload.message.trim(),
  })
}
