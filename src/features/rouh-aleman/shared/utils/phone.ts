import { isValidPhoneNumber } from 'react-phone-number-input'

export function isValidInternationalPhone(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  return isValidPhoneNumber(trimmed)
}
