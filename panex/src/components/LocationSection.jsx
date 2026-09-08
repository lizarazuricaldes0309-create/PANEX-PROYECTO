export default function LocationSection() {
  return (
    <section id="ubicacion" className="bg-horno text-masa">
      <div className="mx-auto max-w-6xl px-5 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block font-body text-sm font-semibold text-trigo mb-4">
            Encuéntranos
          </span>
          <h2 className="font-display text-4xl leading-tight mb-4">
            Ven a recoger tu pan directo del horno
          </h2>
          <p className="font-body text-masa/75 leading-relaxed max-w-md">
            Av. Panadería 123, Zona Central, La Paz, Bolivia. También entregamos
            a domicilio dentro de la ciudad — coordina el envío por WhatsApp
            al confirmar tu pedido.
          </p>
          <p className="font-body text-sm text-masa/60 mt-4">
            Lunes a sábado 7:00–20:00 · Domingo 8:00–13:00
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-panel h-72 md:h-80">
          <iframe
            title="Ubicación de PANEX"
            src="https://www.google.com/maps?q=La+Paz,+Bolivia&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
