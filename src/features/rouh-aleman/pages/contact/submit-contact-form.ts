const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit'
const WEB3FORMS_SUBJECT = 'New inquiry from Al Iman Rouh website'
const WEB3FORMS_FROM_NAME = 'Al Iman Rouh Website'

type Web3FormsResponse = {
  success: boolean
  message?: string
}

export async function submitContactForm(formData: FormData): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
  if (!accessKey) {
    throw new Error('VITE_WEB3FORMS_ACCESS_KEY is not configured. Add it to .env (or Vercel) and rebuild.')
  }

  formData.append('access_key', accessKey)
  formData.append('subject', WEB3FORMS_SUBJECT)
  formData.append('from_name', WEB3FORMS_FROM_NAME)

  const response = await fetch(WEB3FORMS_SUBMIT_URL, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData,
  })

  const data = (await response.json()) as Web3FormsResponse
  if (!response.ok || !data.success) {
    throw new Error(data.message || `Web3Forms request failed (${response.status}).`)
  }
}
