import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

// Cantidad máxima que se puede pedir de un mismo pan.
const MAX_QUANTITY = 40

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{id, name, price, quantity, image}]
  const [isOpen, setIsOpen] = useState(false)

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id)
      if (existing) {
        // Ya está en el carrito: solo aumenta la cantidad (sin pasar del máximo).
        return prev.map((it) =>
          it.id === product.id
            ? { ...it, quantity: Math.min(it.quantity + 1, MAX_QUANTITY) }
            : it
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsOpen(true)
  }

  function increaseQuantity(id) {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.min(it.quantity + 1, MAX_QUANTITY) } : it
      )
    )
  }

  function decreaseQuantity(id) {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, quantity: it.quantity - 1 } : it))
        .filter((it) => it.quantity > 0)
    )
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  )

  const totalItems = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items])

  const value = {
    items,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    total,
    totalItems,
    isOpen,
    setIsOpen,
    maxQuantity: MAX_QUANTITY,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
