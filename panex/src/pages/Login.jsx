import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isValidEmail } from '../lib/validation'

export default function Login() {
  const { signInWithEmail, signInWithGoogle, signInWithPhone, verifyPhoneOtp } = useAuth()
  const navigate = useNavigate()

  const [method, setMethod] = useState('email') // "email" | "phone"
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleEmailLogin(e) {
    e.preventDefault()
    setError('')
    if (!isValidEmail(email)) {
      setError('Ingresa un correo válido, con formato correo@dominio.com')
      return
    }
    setLoading(true)
    const { error: err } = await signInWithEmail({ email, password })
    setLoading(false)
    if (err) {
      setError('No pudimos iniciar sesión, revisa tus datos.')
      return
    }
    navigate('/')
  }

  async function handlePhoneRequest(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signInWithPhone({ phone })
    setLoading(false)
    if (err) {
      setError('No se pudo enviar el código, revisa tu número.')
      return
    }
    setOtpSent(true)
  }

  async function handlePhoneVerify(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await verifyPhoneOtp({ phone, token: otp })
    setLoading(false)
    if (err) {
      setError('El código no es correcto.')
      return
    }
    navigate('/')
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-masa px-5 py-16">
      <div className="w-full max-w-sm bg-crema rounded-2xl shadow-panel p-8">
        <h1 className="font-display text-3xl text-horno mb-1">Bienvenido de nuevo</h1>
        <p className="font-body text-sm text-horno2/70 mb-6">
          Inicia sesión para ver ofertas exclusivas de PANEX.
        </p>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-2 border border-horno/15 rounded-full py-2.5 font-body text-sm font-medium text-horno hover:border-amaranto transition-colors mb-6"
        >
          Continuar con Google
        </button>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMethod('email')}
            className={`flex-1 font-body text-sm py-2 rounded-full border ${
              method === 'email' ? 'bg-horno text-crema border-horno' : 'border-horno/15 text-horno2'
            }`}
          >
            Correo
          </button>
          <button
            onClick={() => setMethod('phone')}
            className={`flex-1 font-body text-sm py-2 rounded-full border ${
              method === 'phone' ? 'bg-horno text-crema border-horno' : 'border-horno/15 text-horno2'
            }`}
          >
            Teléfono
          </button>
        </div>

        {method === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-3">
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-horno/15 px-3 py-2 font-body text-sm"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-horno/15 px-3 py-2 font-body text-sm"
            />
            {error && <p className="font-body text-xs text-amaranto">{error}</p>}
            <button
              disabled={loading}
              className="w-full bg-amaranto text-crema font-body font-semibold py-2.5 rounded-full hover:bg-amaranto2 transition-colors disabled:opacity-60"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        )}

        {method === 'phone' && !otpSent && (
          <form onSubmit={handlePhoneRequest} className="space-y-3">
            <input
              type="tel"
              placeholder="+591 70000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-horno/15 px-3 py-2 font-body text-sm"
            />
            {error && <p className="font-body text-xs text-amaranto">{error}</p>}
            <button
              disabled={loading}
              className="w-full bg-amaranto text-crema font-body font-semibold py-2.5 rounded-full hover:bg-amaranto2 transition-colors disabled:opacity-60"
            >
              {loading ? 'Enviando código...' : 'Enviar código por SMS'}
            </button>
          </form>
        )}

        {method === 'phone' && otpSent && (
          <form onSubmit={handlePhoneVerify} className="space-y-3">
            <input
              type="text"
              placeholder="Código recibido por SMS"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-lg border border-horno/15 px-3 py-2 font-body text-sm"
            />
            {error && <p className="font-body text-xs text-amaranto">{error}</p>}
            <button
              disabled={loading}
              className="w-full bg-andino text-crema font-body font-semibold py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? 'Verificando...' : 'Verificar código'}
            </button>
          </form>
        )}

        <p className="font-body text-sm text-horno2/70 mt-6 text-center">
          ¿No tienes cuenta?{' '}
          <Link to="/registrarse" className="text-amaranto font-semibold">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
