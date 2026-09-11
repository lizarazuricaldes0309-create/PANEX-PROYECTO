// Coordenadas exactas de PANEX (reemplázalas si cambias de ubicación)
const LAT = -17.605229340395432
const LNG = -63.13507710707962

export default function LocationSection() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`

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
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-5 bg-trigo text-horno font-body font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Cómo llegar en Google Maps →
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-panel h-72 md:h-80">
          <iframe
            title="Ubicación de PANEX"
            src={`https://www.google.com/maps?q=${LAT},${LNG}&output=embed`}
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
