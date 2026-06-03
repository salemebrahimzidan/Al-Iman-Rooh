import { isValidPhoneNumber, type Country } from 'react-phone-number-input'

export function isValidInternationalPhone(value: string, country?: Country): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  try {
    return isValidPhoneNumber(trimmed, country)
  } catch {
    return false
  }
}
