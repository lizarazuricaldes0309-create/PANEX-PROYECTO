import { useMemo, useState } from 'react'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import LocationSection from '../components/LocationSection'
import { breads, categories } from '../data/breads'

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeCategory, setActiveCategory] = useState('todos')

  const filtered = useMemo(() => {
    if (activeCategory === 'todos') return breads
    return breads.filter((b) => b.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <Hero />

      <section id="panes" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10">
          <span className="font-body text-sm font-semibold text-andino">Nuestro catálogo</span>
          <h2 className="font-display text-4xl text-horno mt-2">Elige tu pan de hoy</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${
              activeCategory === 'todos'
                ? 'bg-horno text-crema border-horno'
                : 'border-horno/15 text-horno2 hover:border-amaranto'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`font-body text-sm px-4 py-2 rounded-full border transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-horno text-crema border-horno'
                  : 'border-horno/15 text-horno2 hover:border-amaranto'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
          ))}
        </div>
      </section>

      <LocationSection />

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
