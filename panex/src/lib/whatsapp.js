// Construye el enlace de WhatsApp con el detalle del pedido ya escrito,
// listo para que el cliente solo tenga que presionar "Enviar".

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '59171234567'

export function buildOrderWhatsappLink({ items, total, customerName, paymentMethod }) {
  const lineas = items.map(
    (item) => `• ${item.quantity} x ${item.name} — Bs ${(item.price * item.quantity).toFixed(2)}`
  )

  const mensaje = [
    '¡Hola PANEX! 🍞 Quiero hacer este pedido:',
    '',
    ...lineas,
    '',
    `Total: Bs ${total.toFixed(2)}`,
    paymentMethod ? `Forma de pago: ${paymentMethod}` : null,
    customerName ? `Mi nombre: ${customerName}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
  return url
}

export function buildSimpleWhatsappLink(texto) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`
}
