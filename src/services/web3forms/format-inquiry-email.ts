import type { Web3FormsPayload } from './web3forms.service.ts'

export const WEB3FORMS_FROM_NAME = 'Al Eman Rooh Website'

export type InquiryEmailInput = {
  name: string
  email: string
  phone: string
  message: string
  service?: string
  page?: string
}

function formatSubmittedAt(): string {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Riyadh',
  }).format(new Date())
}

/** Single message block — avoids duplicate name/phone rows under Web3Forms’ fixed intro. */
export function formatInquiryMessage(input: InquiryEmailInput): string {
  const service = input.service?.trim() || 'General inquiry'
  const page = input.page?.trim() || '/contact'

  return [
    'Al Eman Rooh Travel & Tourism',
    '────────────────────────────',
    '',
    `Name:    ${input.name.trim()}`,
    `Email:   ${input.email.trim()}`,
    `Phone:   ${input.phone.trim()}`,
    `Service: ${service}`,
    `Page:    ${page}`,
    `Sent:    ${formatSubmittedAt()}`,
    '',
    'Message',
    '───────',
    input.message.trim(),
  ].join('\n')
}

export function buildInquiryEmailPayload(
  input: InquiryEmailInput,
  subject: string,
): Web3FormsPayload {
  const service = input.service?.trim() || 'General inquiry'

  return {
    subject,
    name: input.name.trim(),
    from_name: WEB3FORMS_FROM_NAME,
    email: input.email.trim(),
    replyto: input.email.trim(),
    phone: input.phone.trim(),
    service,
    botcheck: '',
    message: formatInquiryMessage(input),
  }
}
