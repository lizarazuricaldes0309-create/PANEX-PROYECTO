const METHODS = [
  { id: 'efectivo', label: 'Efectivo contra entrega' },
  { id: 'qr', label: 'Pago con QR' },
  { id: 'transferencia', label: 'Transferencia bancaria' },
]

export default function PaymentMethods({ selected, onSelect }) {
  const showQr = selected === 'Pago con QR'

  return (
    <div>
      <p className="font-body text-sm font-semibold text-horno mb-2">Forma de pago</p>
      <div className="grid grid-cols-1 gap-2">
        {METHODS.map((method) => (
          <label
            key={method.id}
            className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer font-body text-sm transition-colors ${
              selected === method.label
                ? 'border-amaranto bg-amaranto/5 text-horno'
                : 'border-horno/10 text-horno2'
            }`}
          >
            <input
              type="radio"
              name="payment-method"
              checked={selected === method.label}
              onChange={() => onSelect(method.label)}
              className="accent-amaranto"
            />
            {method.label}
          </label>
        ))}
      </div>

      {showQr && (
        <div className="mt-3 bg-crema border border-horno/10 rounded-xl p-4 text-center">
          {/* Este QR se administra desde la tabla "payment_methods" en Supabase. */}
          <img
            src="https://source.unsplash.com/300x300/?qrcode"
            alt="Código QR de pago de PANEX"
            className="w-32 h-32 mx-auto rounded-lg object-cover"
          />
          <p className="font-body text-xs text-horno2/70 mt-2">
            Escanea el código para pagar y adjunta tu comprobante al mensaje de WhatsApp.
          </p>
        </div>
      )}
    </div>
  )
}
