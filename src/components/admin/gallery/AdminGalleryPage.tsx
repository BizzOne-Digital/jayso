'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2 } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import slugify from 'slugify'

interface Category {
  _id: string
  name: string
  slug: string
  imageCount: number
}

export default function AdminGalleryPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    fetch('/api/admin/gallery/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const addCategory = async () => {
    if (!name.trim()) return
    await fetch('/api/admin/gallery/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug: slugify(name, { lower: true, strict: true }) }),
    })
    setName('')
    load()
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category and all its images?')) return
    await fetch(`/api/admin/gallery/categories/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <AdminShell title="Gallery" description="Manage gallery categories and images.">
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold mb-3">Add Category</h3>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
          />
          <button onClick={addCategory} className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-graphite/60">Loading...</p>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5"
            >
              <div>
                <Link href={`/admin/gallery/${cat._id}`} className="font-semibold text-graphite hover:text-profile-blue">
                  {cat.name}
                </Link>
                <p className="text-sm text-graphite/60">{cat.imageCount} images</p>
              </div>
              <button onClick={() => deleteCategory(cat._id)} className="text-red-500 hover:text-red-700 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
