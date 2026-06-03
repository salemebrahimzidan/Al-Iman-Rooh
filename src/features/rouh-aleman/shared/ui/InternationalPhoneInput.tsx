import arLabels from 'react-phone-number-input/locale/ar.json'
import PhoneInput, { type Country, type Value } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import './international-phone-input.css'

type InternationalPhoneInputProps = {
  id: string
  value: string
  onChange: (value: string) => void
  onCountryChange?: (country: Country) => void
  disabled?: boolean
  hasError?: boolean
  defaultCountry?: Country
  country?: Country
  labelsLocale?: 'en' | 'ar'
  placeholder?: string
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export function InternationalPhoneInput({
  id,
  value,
  onChange,
  onCountryChange,
  disabled = false,
  hasError = false,
  defaultCountry = 'SA',
  country,
  labelsLocale = 'en',
  placeholder,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: InternationalPhoneInputProps) {
  return (
    <PhoneInput
      id={id}
      placeholder={placeholder}
      international
      countryCallingCodeEditable={false}
      defaultCountry={defaultCountry}
      country={country}
      onCountryChange={onCountryChange}
      labels={labelsLocale === 'ar' ? arLabels : undefined}
      value={(value || undefined) as Value}
      onChange={(next) => onChange(next ?? '')}
      disabled={disabled}
      numberInputProps={{
        id,
        autoComplete: 'tel',
        'aria-invalid': ariaInvalid,
        'aria-describedby': ariaDescribedBy,
        className: 'PhoneInputInput',
      }}
      className={[
        'PhoneInputField',
        hasError ? 'PhoneInputField--error' : '',
        disabled ? 'PhoneInputField--disabled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
