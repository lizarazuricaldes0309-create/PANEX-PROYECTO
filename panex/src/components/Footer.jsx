import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="bg-horno text-masa">
      <div className="mx-auto max-w-6xl px-5 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl mb-3">PANEX</p>
          <p className="font-body text-sm text-masa/70 max-w-xs">
            Panadería boliviana hecha con harina de trigo, quinua y maíz.
            Pedidos por WhatsApp, entrega en el día.
          </p>
        </div>

        <div>
          <p className="font-body text-sm font-semibold text-trigo mb-3">Síguenos</p>
          <SocialLinks variant="footer" />
        </div>

        <div>
          <p className="font-body text-sm font-semibold text-trigo mb-3">Horario de atención</p>
          <ul className="font-body text-sm text-masa/70 space-y-1">
            <li>Lunes a sábado: 7:00 – 20:00</li>
            <li>Domingo: 8:00 – 13:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-masa/10 py-5 text-center font-body text-xs text-masa/50">
        © {new Date().getFullYear()} PANEX. Proyecto de panadería boliviana.
      </div>
    </footer>
  )
}
