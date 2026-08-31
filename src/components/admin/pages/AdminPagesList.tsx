'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'

interface PageItem {
  slug: string
  label: string
  title: string
  sectionCount: number
  status: string
}

export default function AdminPagesList() {
  const [pages, setPages] = useState<PageItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/pages')
      .then((r) => r.json())
      .then((data) => setPages(data.pages || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AdminShell
      title="Pages"
      description="Edit content and images for each page section by section."
    >
      {loading ? (
        <p className="text-graphite/60">Loading pages...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/admin/pages/${page.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-profile-blue/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-graphite group-hover:text-profile-blue">
                    {page.label}
                  </h3>
                  <p className="text-sm text-graphite/60 mt-1">{page.sectionCount} sections</p>
                </div>
                <ChevronRight className="w-5 h-5 text-graphite/40 group-hover:text-profile-blue" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
