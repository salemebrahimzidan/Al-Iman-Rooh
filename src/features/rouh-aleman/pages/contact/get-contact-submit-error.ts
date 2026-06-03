import { Web3FormsError } from '../../../../services/web3forms'

type ContactErrorT = (key: string) => string

export function getContactSubmitErrorMessage(error: unknown, t: ContactErrorT): string {
  if (error instanceof Web3FormsError) {
    switch (error.code) {
      case 'NOT_CONFIGURED':
        return t('form.errors.notConfigured')
      case 'NETWORK':
        return t('form.errors.network')
      case 'DOMAIN':
        return t('form.errors.domain')
      case 'RATE_LIMIT':
        return t('form.errors.rateLimit')
      default:
        return error.message || t('form.errors.submitFailed')
    }
  }

  return t('form.errors.submitFailed')
}
