import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart()

  // Cierra el modal con la tecla Escape.
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-horno/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-crema rounded-3xl overflow-hidden max-w-3xl w-full grid md:grid-cols-2 shadow-panel animate-[fadeIn_.15s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-[4/3] md:aspect-auto md:h-full bg-trigo/20">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-7 flex flex-col">
          <button
            onClick={onClose}
            className="self-end text-horno2/60 hover:text-amaranto font-body text-sm mb-2"
            aria-label="Cerrar"
          >
            Cerrar ✕
          </button>
          <h2 className="font-display text-3xl text-horno">{product.name}</h2>
          <p className="font-body text-horno2 mt-3 leading-relaxed">{product.description}</p>
          <p className="font-display text-2xl text-amaranto mt-6">Bs {product.price.toFixed(2)}</p>

          <button
            onClick={() => {
              addItem(product)
              onClose()
            }}
            className="mt-auto pt-6 w-full bg-amaranto text-crema font-body font-semibold py-3 rounded-full hover:bg-amaranto2 transition-colors"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
