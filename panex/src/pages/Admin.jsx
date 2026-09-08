import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

const emptyForm = { name: '', description: '', price: '', image_url: '', category_id: '' }

export default function Admin() {
  const { profile, loading, isLoggedIn } = useAuth()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  async function loadData() {
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('sort_order'),
    ])
    setProducts(prods || [])
    setCategories(cats || [])
  }

  useEffect(() => {
    if (profile?.is_admin) loadData()
  }, [profile])

  if (loading) return null
  if (!isLoggedIn) return <Navigate to="/ingresar" replace />
  if (!profile?.is_admin) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl text-horno mb-2">Acceso solo para administradores</h1>
        <p className="font-body text-horno2/70">
          Marca tu usuario con "is_admin = true" en la tabla "profiles" de Supabase para entrar aquí.
        </p>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('Guardando...')

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      image_url: form.image_url,
      category_id: form.category_id || null,
    }

    const { error } = editingId
      ? await supabase.from('products').update(payload).eq('id', editingId)
      : await supabase.from('products').insert(payload)

    if (error) {
      setStatus('Ocurrió un error al guardar.')
      return
    }
    setStatus('Guardado ✔')
    setForm(emptyForm)
    setEditingId(null)
    loadData()
  }

  function handleEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      image_url: product.image_url || '',
      category_id: product.category_id || '',
    })
  }

  async function handleDelete(id) {
    await supabase.from('products').update({ is_active: false }).eq('id', id)
    loadData()
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="font-display text-4xl text-horno mb-8">Administrar productos</h1>

      <form onSubmit={handleSubmit} className="bg-crema border border-horno/10 rounded-2xl p-6 grid sm:grid-cols-2 gap-3 mb-10">
        <input
          placeholder="Nombre del pan"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-horno/15 px-3 py-2 font-body text-sm sm:col-span-2"
          required
        />
        <textarea
          placeholder="Descripción (de qué está hecho)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-lg border border-horno/15 px-3 py-2 font-body text-sm sm:col-span-2"
          rows={2}
        />
        <input
          type="number"
          step="0.1"
          placeholder="Precio en Bs"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="rounded-lg border border-horno/15 px-3 py-2 font-body text-sm"
          required
        />
        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="rounded-lg border border-horno/15 px-3 py-2 font-body text-sm"
        >
          <option value="">Sin categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          placeholder="URL de la imagen"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="rounded-lg border border-horno/15 px-3 py-2 font-body text-sm sm:col-span-2"
        />

        <div className="sm:col-span-2 flex items-center gap-3">
          <button className="bg-amaranto text-crema font-body font-semibold px-5 py-2.5 rounded-full hover:bg-amaranto2 transition-colors">
            {editingId ? 'Guardar cambios' : 'Agregar producto'}
          </button>
          {status && <span className="font-body text-sm text-horno2/70">{status}</span>}
        </div>
      </form>

      <div className="space-y-2">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between bg-crema border border-horno/10 rounded-xl p-3">
            <div>
              <p className="font-body font-semibold text-horno text-sm">{product.name}</p>
              <p className="font-body text-xs text-horno2/70">Bs {Number(product.price).toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="font-body text-xs text-andino hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="font-body text-xs text-amaranto hover:underline"
              >
                Desactivar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
