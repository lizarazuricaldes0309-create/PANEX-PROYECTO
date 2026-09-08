export default function ReviewCard({ review }) {
  return (
    <div className="bg-crema rounded-2xl p-5 border border-horno/5">
      <div className="flex items-center gap-1 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < review.rating ? 'text-trigo' : 'text-horno/15'}>
            ★
          </span>
        ))}
      </div>
      <p className="font-body text-horno2 text-sm leading-relaxed">{review.comment}</p>
      <p className="font-body text-xs font-semibold text-horno mt-3">— {review.customer_name}</p>
    </div>
  )
}
