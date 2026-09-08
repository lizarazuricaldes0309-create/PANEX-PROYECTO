import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function Profile() {
  const { isLoggedIn, profile, signOut, loading } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!profile?.id) return
    supabase
      .from('orders')
      .select('*')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setOrders(data || []))
  }, [profile])

  if (loading) return null
  if (!isLoggedIn) return <Navigate to="/ingresar" replace />

  // Regla simple de fidelidad: cada 3 pedidos, 10% de descuento en el siguiente.
  const proximaOferta = 3 - (orders.length % 3)

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl text-horno mb-2">Hola, {profile?.full_name}</h1>
      <p className="font-body text-horno2/70 mb-8">{profile?.email || profile?.phone}</p>

      <div className="bg-trigo/15 border border-trigo/30 rounded-2xl p-5 mb-10">
        <p className="font-body text-sm text-horno">
          {orders.length === 0
            ? 'Haz tu primer pedido y empieza a acumular ofertas exclusivas.'
            : `Te faltan ${proximaOferta} pedido(s) más para tu próximo 10% de descuento.`}
        </p>
      </div>

      <h2 className="font-display text-2xl text-horno mb-4">Tus pedidos</h2>
      {orders.length === 0 ? (
        <p className="font-body text-horno2/70">Todavía no tienes pedidos registrados.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-crema border border-horno/10 rounded-xl p-4 flex justify-between">
              <div>
                <p className="font-body text-sm font-semibold text-horno">
                  Pedido del {new Date(order.created_at).toLocaleDateString('es-BO')}
                </p>
                <p className="font-body text-xs text-horno2/70">{order.status}</p>
              </div>
              <p className="font-body font-semibold text-amaranto">Bs {Number(order.total).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={signOut}
        className="mt-10 font-body text-sm text-horno2/70 hover:text-amaranto transition-colors"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
