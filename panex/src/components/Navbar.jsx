import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/#panes', label: 'Panes' },
  { to: '/#ubicacion', label: 'Ubicación' },
  { to: '/resenas', label: 'Reseñas' },
]

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart()
  const { isLoggedIn, profile } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-masa/95 backdrop-blur border-b border-horno/10">
      <div className="mx-auto max-w-6xl px-5 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-2xl font-semibold text-horno tracking-tight">
          PANEX
        </Link>

        {/* Menú visible en pantallas medianas y grandes */}
        <nav className="hidden md:flex items-center gap-7 font-body text-sm text-horno2">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className="hover:text-amaranto transition-colors">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={isLoggedIn ? '/perfil' : '/ingresar'}
            className="hidden sm:block font-body text-sm text-horno2 hover:text-amaranto transition-colors"
          >
            {isLoggedIn ? `Hola, ${profile?.full_name?.split(' ')[0] || 'cliente'}` : 'Iniciar sesión'}
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-horno text-crema hover:bg-amaranto transition-colors"
            aria-label="Abrir carrito de compras"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amaranto text-crema text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Botón de menú, solo visible en celular */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-horno/15 text-horno"
            aria-label="Abrir menú"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Menú desplegable de celular, con todas las opciones */}
      {menuOpen && (
        <nav className="md:hidden border-t border-horno/10 bg-masa px-5 py-4 flex flex-col gap-3 font-body text-sm text-horno2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="hover:text-amaranto transition-colors"
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to={isLoggedIn ? '/perfil' : '/ingresar'}
            onClick={() => setMenuOpen(false)}
            className="hover:text-amaranto transition-colors"
          >
            {isLoggedIn ? `Hola, ${profile?.full_name?.split(' ')[0] || 'cliente'}` : 'Iniciar sesión'}
          </Link>
          {!isLoggedIn && (
            <Link
              to="/registrarse"
              onClick={() => setMenuOpen(false)}
              className="hover:text-amaranto transition-colors"
            >
              Registrarse
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}
