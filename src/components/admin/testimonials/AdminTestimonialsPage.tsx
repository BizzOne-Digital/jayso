'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import LocalImageField from '@/components/admin/LocalImageField'

interface Testimonial {
  _id?: string
  name: string
  company?: string
  role?: string
  quote: string
  imageUrl?: string
  rating?: number
  order: number
  status: string
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    fetch('/api/admin/testimonials')
      .then((r) => r.json())
      .then((data) => setItems(data.testimonials || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const add = async () => {
    await fetch('/api/admin/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Client',
        quote: 'Great service!',
        order: items.length,
        status: 'published',
      }),
    })
    load()
  }

  const save = async (item: Testimonial) => {
    if (!item._id) return
    await fetch(`/api/admin/testimonials/${item._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
  }

  const remove = async (id: string) => {
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <AdminShell title="Testimonials" description="Manage client testimonials shown on the testimonials page.">
      <button onClick={add} className="btn-primary mb-6 px-4 py-2 text-sm inline-flex items-center gap-2">
        <Plus className="w-4 h-4" /> Add Testimonial
      </button>

      {loading ? (
        <p className="text-graphite/60">Loading...</p>
      ) : (
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={item._id || index} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">{item.name}</h3>
                {item._id && (
                  <button onClick={() => remove(item._id!)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <input
                value={item.name}
                onChange={(e) => {
                  const next = [...items]
                  next[index] = { ...item, name: e.target.value }
                  setItems(next)
                }}
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <input
                value={item.company || ''}
                onChange={(e) => {
                  const next = [...items]
                  next[index] = { ...item, company: e.target.value }
                  setItems(next)
                }}
                placeholder="Company"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <textarea
                value={item.quote}
                onChange={(e) => {
                  const next = [...items]
                  next[index] = { ...item, quote: e.target.value }
                  setItems(next)
                }}
                rows={4}
                placeholder="Quote"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <LocalImageField
                label="Photo (optional)"
                folder="misc"
                value={item.imageUrl}
                onChange={(url) => {
                  const next = [...items]
                  next[index] = { ...item, imageUrl: url }
                  setItems(next)
                }}
              />
              <button
                onClick={() => save(items[index])}
                className="px-4 py-2 text-sm border border-profile-blue text-profile-blue rounded-lg"
              >
                Save
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
