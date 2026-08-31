'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'

interface ServiceItem {
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  hasRecord: boolean
}

export default function AdminServicesList() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/services')
      .then((r) => r.json())
      .then((data) => setServices(data.services || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AdminShell title="Services" description="Edit listing cards and service detail pages.">
      {loading ? (
        <p className="text-graphite/60">Loading services...</p>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/admin/services/${service.slug}`}
              className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-profile-blue/40 hover:shadow-md transition-all group"
            >
              <div>
                <h3 className="font-semibold text-graphite group-hover:text-profile-blue">
                  {service.title}
                </h3>
                <p className="text-sm text-graphite/60 mt-1 line-clamp-1">{service.excerpt}</p>
                {!service.hasRecord && (
                  <span className="text-xs text-warm-amber mt-1 inline-block">Using catalog defaults</span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-graphite/40" />
            </Link>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
