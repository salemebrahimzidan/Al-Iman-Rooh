export const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit'

export const WEB3FORMS_CONTACT_SUBJECT = 'New inquiry from Al Iman Rouh website'
export const WEB3FORMS_FROM_NAME = 'Al Iman Rouh Website'
export const WEB3FORMS_DEFAULT_SERVICE = 'General inquiry'

export type Web3FormsContactFields = {
  name: string
  email: string
  phone: string
  service?: string
  message: string
}

export type Web3FormsResponse = {
  success: boolean
  message?: string
}

export type Web3FormsErrorCode =
  | 'NOT_CONFIGURED'
  | 'NETWORK'
  | 'DOMAIN'
  | 'RATE_LIMIT'
  | 'API'

export class Web3FormsError extends Error {
  readonly code: Web3FormsErrorCode

  constructor(message: string, code: Web3FormsErrorCode, options?: { cause?: unknown }) {
    super(message)
    this.name = 'Web3FormsError'
    this.code = code
    if (options?.cause !== undefined) {
      this.cause = options.cause
    }
  }
}

type Web3FormsApiJson = Web3FormsResponse & {
  body?: { message?: string }
}

function getAccessKey(): string {
  const key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  if (!key?.trim()) {
    throw new Web3FormsError(
      'VITE_WEB3FORMS_ACCESS_KEY is not configured. Add it to .env and rebuild.',
      'NOT_CONFIGURED',
    )
  }
  return key.trim()
}

function classifyApiError(message: string, status: number): Web3FormsErrorCode {
  const lower = message.toLowerCase()
  if (/domain|origin|not allowed|restrict|trusted|host|website|blocked/.test(lower)) {
    return 'DOMAIN'
  }
  if (status === 429 || /rate|too many|limit/.test(lower)) {
    return 'RATE_LIMIT'
  }
  return 'API'
}

function extractApiMessage(data: Web3FormsApiJson): string | undefined {
  if (typeof data.message === 'string' && data.message.trim()) {
    return data.message.trim()
  }
  const nested = data.body?.message
  if (typeof nested === 'string' && nested.trim()) {
    return nested.trim()
  }
  return undefined
}

async function parseApiJson(res: Response): Promise<Web3FormsApiJson | null> {
  const contentType = res.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return null
  }
  try {
    return (await res.json()) as Web3FormsApiJson
  } catch {
    return null
  }
}

/**
 * POST JSON to Web3Forms. Client-side only (browser fetch).
 * @see https://docs.web3forms.com/
 */
export async function submitToWeb3Forms(
  fields: Record<string, string>,
): Promise<Web3FormsResponse> {
  let res: Response
  try {
    res = await fetch(WEB3FORMS_SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: getAccessKey(),
        botcheck: '',
        ...fields,
      }),
    })
  } catch (cause) {
    throw new Web3FormsError(
      'Network error — please check your connection and try again.',
      'NETWORK',
      { cause },
    )
  }

  const data = await parseApiJson(res)

  if (!data) {
    const code: Web3FormsErrorCode =
      res.status === 403 || res.status === 0 ? 'DOMAIN' : res.status === 429 ? 'RATE_LIMIT' : 'API'
    throw new Web3FormsError(
      res.ok
        ? 'Invalid response from the form service.'
        : `Request failed (${res.status}).`,
      code,
    )
  }

  if (!res.ok || !data.success) {
    const apiMessage = extractApiMessage(data) ?? `Request failed (${res.status}).`
    throw new Web3FormsError(apiMessage, classifyApiError(apiMessage, res.status))
  }

  return { success: data.success, message: data.message }
}

/** Contact / inquiry form — fixed subject, from_name, and field mapping. */
export async function submitContactInquiry(
  fields: Web3FormsContactFields,
): Promise<Web3FormsResponse> {
  return submitToWeb3Forms({
    subject: WEB3FORMS_CONTACT_SUBJECT,
    from_name: WEB3FORMS_FROM_NAME,
    name: fields.name.trim(),
    email: fields.email.trim(),
    phone: fields.phone.trim(),
    service: (fields.service?.trim() || WEB3FORMS_DEFAULT_SERVICE),
    message: fields.message.trim(),
  })
}
