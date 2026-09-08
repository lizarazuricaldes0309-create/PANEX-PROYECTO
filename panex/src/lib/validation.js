// Validaciones para el registro de clientes.
// La idea: que el nombre no lleve números, que el correo tenga forma real,
// y que el teléfono tenga la cantidad de dígitos esperada para el país elegido.

export function isValidName(name) {
  if (!name || name.trim().length < 2) return false
  // Solo letras (incluye tildes y ñ) y espacios; nada de números ni símbolos raros.
  const soloLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/
  return soloLetras.test(name.trim())
}

export function isValidEmail(email) {
  // Formato general de un correo real: usuario@dominio.extensión
  const patron = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
  return patron.test(email.trim())
}

export function isValidPhoneForCountry(phone, country) {
  if (!phone) return false
  const soloNumeros = phone.replace(/\D/g, '')
  if (!country) return soloNumeros.length >= 7
  return soloNumeros.length >= country.minLength && soloNumeros.length <= country.maxLength
}
