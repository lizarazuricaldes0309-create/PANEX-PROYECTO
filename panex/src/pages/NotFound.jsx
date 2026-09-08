import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-32 text-center">
      <h1 className="font-display text-5xl text-horno mb-3">404</h1>
      <p className="font-body text-horno2/70 mb-6">Esta página se horneó de más y ya no existe.</p>
      <Link to="/" className="text-amaranto font-body font-semibold">
        Volver al inicio
      </Link>
    </div>
  )
}
