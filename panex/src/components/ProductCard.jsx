export default function ProductCard({ product, onSelect }) {
  return (
    <button
      onClick={() => onSelect(product)}
      className="text-left group bg-crema rounded-2xl overflow-hidden shadow-sm border border-horno/5 hover:shadow-panel transition-shadow"
    >
      <div className="aspect-[4/3] overflow-hidden bg-trigo/20">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-horno leading-snug">{product.name}</h3>
        <p className="font-body text-sm text-horno2/80 mt-1 line-clamp-2">{product.description}</p>
        <p className="font-body font-semibold text-amaranto mt-3">Bs {product.price.toFixed(2)}</p>
      </div>
    </button>
  )
}
