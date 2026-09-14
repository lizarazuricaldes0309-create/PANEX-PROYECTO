import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <span className="inline-block font-body text-sm font-semibold text-andino bg-andino/10 px-3 py-1 rounded-full mb-6">
            Horneado fresco cada mañana en La Paz
          </span>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-horno font-medium">
            Pan boliviano,
            <br />
            hecho como en casa.
          </h1>
          <p className="mt-6 font-body text-lg text-horno2 max-w-md">
            Marraquetas, cuñapés, salteñas y mucho más — elegidos de tu barrio,
            armados en tu carrito y confirmados directo por WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/panes"
              className="inline-flex items-center gap-2 bg-amaranto text-crema font-body font-semibold px-6 py-3 rounded-full hover:bg-amaranto2 transition-colors"
            >
              Ver el catálogo
            </Link>
            <Link
              to="/ubicacion"
              className="font-body text-horno2 font-medium hover:text-amaranto transition-colors"
            >
              ¿Dónde nos encontramos? →
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-panel">
            <img
              src="https://i.ibb.co/RTLxqNQ0/images-q-tbn-ANd9-Gc-T2gi-Qs-D4-GNEpo-Pv-RNXS8mikk-VAQZt1-Vcz3-Avyzrif-DPIJVxxuc-Ig-Y1-H91-O-s-10.jpg"
              alt="Panes recién horneados de PANEX"
              className="w-full h-full object-contain bg-trigo/15"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-crema rounded-2xl shadow-panel px-5 py-4 max-w-[220px]">
            <p className="font-display text-2xl text-amaranto">+25</p>
            <p className="font-body text-sm text-horno2">variedades de pan boliviano en el catálogo</p>
          </div>
        </div>
      </div>
    </section>
  )
}
