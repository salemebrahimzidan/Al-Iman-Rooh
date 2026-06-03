export const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit'

export type Web3FormsPayload = {
  subject: string
  name?: string
  email?: string
  phone?: string
  service?: string
  message?: string
  from_name?: string
  replyto?: string
  botcheck?: string
  [key: string]: string | undefined
}

export type Web3FormsResponse = {
  success: boolean
  message?: string
}

export class Web3FormsError extends Error {
  readonly isNetwork: boolean

  constructor(message: string, options?: { cause?: unknown; isNetwork?: boolean }) {
    super(message)
    this.name = 'Web3FormsError'
    this.isNetwork = options?.isNetwork ?? false
    if (options?.cause !== undefined) {
      this.cause = options.cause
    }
  }
}

function getAccessKey(): string {
  const key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  if (!key?.trim()) {
    throw new Web3FormsError('VITE_WEB3FORMS_ACCESS_KEY is not configured')
  }
  return key.trim()
}

/**
 * Submit a form to Web3Forms. Reusable across contact, booking, and other forms.
 * @see https://docs.web3forms.com/
 */
export async function submitToWeb3Forms(payload: Web3FormsPayload): Promise<Web3FormsResponse> {
  const { subject, ...fields } = payload

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
        subject,
        botcheck: '',
        ...fields,
      }),
    })
  } catch (cause) {
    throw new Web3FormsError('Network error — please check your connection and try again.', {
      cause,
      isNetwork: true,
    })
  }

  let data: Web3FormsResponse
  try {
    data = (await res.json()) as Web3FormsResponse
  } catch {
    throw new Web3FormsError(
      res.ok ? 'Invalid response from the form service.' : `Request failed (${res.status}).`,
    )
  }

  if (!res.ok || !data.success) {
    throw new Web3FormsError(data.message ?? `Request failed (${res.status}).`)
  }

  return data
}
