// Lista de países para el selector de teléfono en el registro.
// minLength/maxLength = cantidad de dígitos esperados sin el código de país.

export const countries = [
  { code: 'BO', name: 'Bolivia', dial: '+591', minLength: 8, maxLength: 8 },
  { code: 'AR', name: 'Argentina', dial: '+54', minLength: 10, maxLength: 11 },
  { code: 'PE', name: 'Perú', dial: '+51', minLength: 9, maxLength: 9 },
  { code: 'CL', name: 'Chile', dial: '+56', minLength: 9, maxLength: 9 },
  { code: 'BR', name: 'Brasil', dial: '+55', minLength: 10, maxLength: 11 },
  { code: 'PY', name: 'Paraguay', dial: '+595', minLength: 9, maxLength: 9 },
  { code: 'CO', name: 'Colombia', dial: '+57', minLength: 10, maxLength: 10 },
  { code: 'MX', name: 'México', dial: '+52', minLength: 10, maxLength: 10 },
  { code: 'EC', name: 'Ecuador', dial: '+593', minLength: 9, maxLength: 9 },
  { code: 'US', name: 'Estados Unidos', dial: '+1', minLength: 10, maxLength: 10 },
  { code: 'ES', name: 'España', dial: '+34', minLength: 9, maxLength: 9 },
]

export const defaultCountry = countries[0] // Bolivia
