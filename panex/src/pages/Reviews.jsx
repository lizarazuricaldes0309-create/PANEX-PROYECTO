import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ReviewCard from '../components/ReviewCard'
import ReviewForm from '../components/ReviewForm'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadReviews() {
    setLoading(true)
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    setReviews(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadReviews()
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl text-horno mb-2">Lo que dicen nuestros clientes</h1>
      <p className="font-body text-horno2/70 mb-10">
        Comparte cómo fue tu compra: el pan, la entrega, todo el proceso.
      </p>

      <div className="mb-10">
        <ReviewForm onSubmitted={loadReviews} />
      </div>

      {loading && <p className="font-body text-horno2/70">Cargando reseñas...</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {!loading && reviews.length === 0 && (
        <p className="font-body text-horno2/70">Todavía no hay reseñas, ¡sé el primero!</p>
      )}
    </div>
  )
}
