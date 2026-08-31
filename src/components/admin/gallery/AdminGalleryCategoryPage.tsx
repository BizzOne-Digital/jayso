'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'
import LocalImageField from '@/components/admin/LocalImageField'

interface GalleryImage {
  _id?: string
  title?: string
  alt?: string
  imageUrl: string
  order: number
}

export default function AdminGalleryCategoryPage({ categoryId }: { categoryId: string }) {
  const [categoryName, setCategoryName] = useState('')
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    fetch(`/api/admin/gallery/categories/${categoryId}`)
      .then((r) => r.json())
      .then((data) => {
        setCategoryName(data.category?.name || '')
        setImages(data.images || [])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [categoryId])

  const addImage = async () => {
    await fetch('/api/admin/gallery/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categoryId,
        imageUrl: '',
        title: 'New Image',
        order: images.length,
        status: 'published',
      }),
    })
    load()
  }

  const saveImage = async (image: GalleryImage) => {
    await fetch('/api/admin/gallery/images', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image),
    })
  }

  const deleteImage = async (id: string) => {
    await fetch(`/api/admin/gallery/images?id=${id}`, { method: 'DELETE' })
    load()
  }

  if (loading) {
    return (
      <AdminShell title="Loading..." description="">
        <p className="text-graphite/60">Loading gallery...</p>
      </AdminShell>
    )
  }

  return (
    <AdminShell title={categoryName} description="Edit images in this category.">
      <button onClick={addImage} className="btn-primary mb-6 px-4 py-2 text-sm inline-flex items-center gap-2">
        <Plus className="w-4 h-4" /> Add Image
      </button>

      <div className="space-y-6">
        {images.map((image, index) => (
          <div key={image._id || index} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Image {index + 1}</h3>
              {image._id && (
                <button onClick={() => deleteImage(image._id!)} className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <input
              value={image.title || ''}
              onChange={(e) => {
                const next = [...images]
                next[index] = { ...image, title: e.target.value }
                setImages(next)
              }}
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
            <LocalImageField
              label="Image"
              folder="gallery"
              value={image.imageUrl}
              onChange={(url) => {
                const next = [...images]
                next[index] = { ...image, imageUrl: url }
                setImages(next)
              }}
            />
            <button
              onClick={() => saveImage(images[index])}
              className="px-4 py-2 text-sm border border-profile-blue text-profile-blue rounded-lg hover:bg-profile-blue/5"
            >
              Save Image
            </button>
          </div>
        ))}
      </div>
    </AdminShell>
  )
}
