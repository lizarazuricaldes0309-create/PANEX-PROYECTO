import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { buildOrderWhatsappLink } from '../lib/whatsapp'
import { supabase } from '../lib/supabaseClient'
import PaymentMethods from './PaymentMethods'

export default function CartDrawer() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    total,
    isOpen,
    setIsOpen,
    clearCart,
    maxQuantity,
  } = useCart()
  const { profile, session } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState('Efectivo contra entrega')
  const [sending, setSending] = useState(false)

  if (!isOpen) return null

  async function handleCheckout() {
    setSending(true)
    const customerName = profile?.full_name || 'Cliente PANEX'

    try {
      // Guarda el pedido en Supabase antes de mandarlo a WhatsApp.
      await supabase.from('orders').insert({
        user_id: session?.user?.id || null,
        customer_name: customerName,
        customer_phone: profile?.phone || null,
        items: items.map((it) => ({
          product_id: it.id,
          name: it.name,
          quantity: it.quantity,
          unit_price: it.price,
        })),
        total,
        payment_method: paymentMethod,
      })
    } catch (err) {
      console.error('No se pudo guardar el pedido en Supabase:', err)
      // Igual continuamos: el pedido se manda por WhatsApp aunque falle el guardado.
    }

    const link = buildOrderWhatsappLink({ items, total, customerName, paymentMethod })
    window.open(link, '_blank')
    setSending(false)
    clearCart()
    setIsOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-horno/50" onClick={() => setIsOpen(false)} />

      <aside className="relative bg-masa w-full max-w-md h-full shadow-panel flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-horno/10">
          <h2 className="font-display text-2xl text-horno">Tu carrito</h2>
          <button onClick={() => setIsOpen(false)} className="text-horno2/60 hover:text-amaranto font-body">
            Cerrar ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 && (
            <p className="font-body text-horno2/70 text-center mt-10">
              Todavía no agregaste ningún pan. ¡Anda a ver el catálogo!
            </p>
          )}

          {items.map((item) => (
            <div key={item.id} className="flex gap-3 bg-crema rounded-xl p-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-body font-semibold text-horno text-sm">{item.name}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-horno2/50 hover:text-amaranto text-xs"
                  >
                    Quitar
                  </button>
                </div>
                <p className="font-body text-xs text-horno2/70">Bs {item.price.toFixed(2)} c/u</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-7 h-7 rounded-full bg-horno/10 text-horno hover:bg-amaranto hover:text-crema transition-colors"
                  >
                    −
                  </button>
                  <span className="font-body text-sm w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    disabled={item.quantity >= maxQuantity}
                    className="w-7 h-7 rounded-full bg-horno/10 text-horno hover:bg-amaranto hover:text-crema transition-colors disabled:opacity-30 disabled:hover:bg-horno/10 disabled:hover:text-horno"
                  >
                    +
                  </button>
                  <span className="ml-auto font-body font-semibold text-amaranto text-sm">
                    Bs {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                {item.quantity >= maxQuantity && (
                  <p className="font-body text-[11px] text-amaranto mt-1">
                    Máximo {maxQuantity} unidades de este pan por pedido.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t border-horno/10 px-6 py-5 space-y-4">
            <PaymentMethods selected={paymentMethod} onSelect={setPaymentMethod} />

            <div className="flex items-center justify-between font-body">
              <span className="text-horno2">Total</span>
              <span className="font-display text-2xl text-amaranto">Bs {total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={sending}
              className="w-full bg-andino text-crema font-body font-semibold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {sending ? 'Enviando...' : 'Enviar pedido por WhatsApp'}
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}