import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function ReviewForm({ onSubmitted }) {
  const { session, profile, isLoggedIn } = useAuth()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  if (!isLoggedIn) {
    return (
      <p className="font-body text-sm text-horno2 bg-crema border border-horno/10 rounded-xl p-4">
        Inicia sesión para poder contarnos cómo te fue con tu compra.
      </p>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!comment.trim()) {
      setError('Cuéntanos un poco cómo te fue.')
      return
    }
    setSending(true)
    setError('')

    const { error: insertError } = await supabase.from('reviews').insert({
      user_id: session.user.id,
      customer_name: profile?.full_name || 'Cliente PANEX',
      rating,
      comment: comment.trim(),
    })

    setSending(false)
    if (insertError) {
      setError('No se pudo guardar tu reseña, intenta de nuevo.')
      return
    }
    setComment('')
    setRating(5)
    onSubmitted?.()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-crema border border-horno/10 rounded-2xl p-5 space-y-4">
      <div>
        <p className="font-body text-sm font-semibold text-horno mb-2">¿Cómo calificarías tu compra?</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              className={`text-2xl ${n <= rating ? 'text-trigo' : 'text-horno/15'}`}
              aria-label={`${n} estrellas`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Cuéntanos cómo estuvo el pan, la entrega, todo el proceso..."
        rows={3}
        className="w-full rounded-lg border border-horno/15 px-3 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-amaranto/40"
      />

      {error && <p className="font-body text-xs text-amaranto">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="bg-amaranto text-crema font-body font-semibold px-5 py-2.5 rounded-full hover:bg-amaranto2 transition-colors disabled:opacity-60"
      >
        {sending ? 'Enviando...' : 'Publicar reseña'}
      </button>
    </form>
  )
}
