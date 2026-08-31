'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'

interface Product {
  _id: string
  title: string
  category: string
  priceLabel: string
}

export default function AdminPricingPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/pricing')
      .then((r) => r.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setLoading(false))
  }, [])

  const save = async (product: Product) => {
    await fetch('/api/admin/pricing', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: product._id, priceLabel: product.priceLabel }),
    })
  }

  return (
    <AdminShell title="Pricing" description="Update product pricing labels shown on the shop page.">
      {loading ? (
        <p className="text-graphite/60">Loading...</p>
      ) : (
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={product._id} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-graphite">{product.title}</h3>
                <p className="text-xs text-graphite/60">{product.category}</p>
              </div>
              <input
                value={product.priceLabel}
                onChange={(e) => {
                  const next = [...products]
                  next[index] = { ...product, priceLabel: e.target.value }
                  setProducts(next)
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-48"
                placeholder="Contact for pricing"
              />
              <button
                onClick={() => save(products[index])}
                className="px-4 py-2 text-sm border border-profile-blue text-profile-blue rounded-lg shrink-0"
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
