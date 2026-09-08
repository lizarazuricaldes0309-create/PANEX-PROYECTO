import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PhoneInput from '../components/PhoneInput'
import { defaultCountry } from '../data/countries'
import { isValidName, isValidEmail, isValidPhoneForCountry } from '../lib/validation'

export default function Register() {
  const { signUpWithEmail, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState(defaultCountry)
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate() {
    const nextErrors = {}

    if (!isValidName(fullName)) {
      nextErrors.fullName = 'El nombre no puede llevar números ni símbolos.'
    }
    if (!isValidEmail(email)) {
      nextErrors.email = 'Ingresa un correo real, con formato correo@dominio.com'
    }
    if (password.length < 6) {
      nextErrors.password = 'La contraseña debe tener al menos 6 caracteres.'
    }
    if (!isValidPhoneForCountry(phone, country)) {
      nextErrors.phone = `Para ${country.name} el número debe tener ${country.minLength} a ${country.maxLength} dígitos.`
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    const { error } = await signUpWithEmail({
      email,
      password,
      fullName: fullName.trim(),
      phone: `${country.dial}${phone}`,
    })
    setLoading(false)

    if (error) {
      setErrors({ general: 'No se pudo completar el registro. Intenta de nuevo.' })
      return
    }
    setSuccess(true)
    setTimeout(() => navigate('/'), 1500)
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-masa px-5 py-16">
      <div className="w-full max-w-md bg-crema rounded-2xl shadow-panel p-8">
        <h1 className="font-display text-3xl text-horno mb-1">Crea tu cuenta</h1>
        <p className="font-body text-sm text-horno2/70 mb-6">
          Regístrate y desbloquea ofertas por tus próximas compras.
        </p>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 border border-horno/15 rounded-full py-2.5 font-body text-sm font-medium text-horno hover:border-amaranto transition-colors mb-6"
        >
          Registrarme con Google
        </button>

        {success ? (
          <p className="font-body text-sm text-andino bg-andino/10 rounded-lg p-3 text-center">
            ¡Cuenta creada! Revisa tu correo para confirmar.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-horno/15 px-3 py-2 font-body text-sm"
              />
              {errors.fullName && <p className="font-body text-xs text-amaranto mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-horno/15 px-3 py-2 font-body text-sm"
              />
              {errors.email && <p className="font-body text-xs text-amaranto mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-horno/15 px-3 py-2 font-body text-sm"
              />
              {errors.password && <p className="font-body text-xs text-amaranto mt-1">{errors.password}</p>}
            </div>

            <div>
              <PhoneInput
                country={country}
                onCountryChange={setCountry}
                phone={phone}
                onPhoneChange={setPhone}
              />
              {errors.phone && <p className="font-body text-xs text-amaranto mt-1">{errors.phone}</p>}
            </div>

            {errors.general && <p className="font-body text-xs text-amaranto">{errors.general}</p>}

            <button
              disabled={loading}
              className="w-full bg-amaranto text-crema font-body font-semibold py-2.5 rounded-full hover:bg-amaranto2 transition-colors disabled:opacity-60"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>
        )}

        <p className="font-body text-sm text-horno2/70 mt-6 text-center">
          ¿Ya tienes cuenta?{' '}
          <Link to="/ingresar" className="text-amaranto font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
