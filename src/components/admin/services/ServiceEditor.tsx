'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import LocalImageField from '@/components/admin/LocalImageField'
import type { IServiceDetailSection } from '@/lib/models/Service'

interface ServiceEditorProps {
  slug: string
}

type Tab = 'listing' | 'detail'

export default function ServiceEditor({ slug }: ServiceEditorProps) {
  const [tab, setTab] = useState<Tab>('listing')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [service, setService] = useState<Record<string, unknown>>({})

  useEffect(() => {
    fetch(`/api/admin/services/by-slug/${slug}`)
      .then((r) => r.json())
      .then((data) => setService(data.service || {}))
      .finally(() => setLoading(false))
  }, [slug])

  const update = (patch: Record<string, unknown>) => {
    setService((prev) => ({ ...prev, ...patch }))
  }

  const updateDetailSection = (index: number, patch: Partial<IServiceDetailSection>) => {
    const sections = [...((service.detailSections as IServiceDetailSection[]) || [])]
    sections[index] = { ...sections[index], ...patch }
    update({ detailSections: sections })
  }

  const addDetailSection = () => {
    const sections = [...((service.detailSections as IServiceDetailSection[]) || [])]
    sections.push({
      name: `Section ${sections.length + 1}`,
      heading: '',
      content: '',
      imageUrl: '',
      order: sections.length,
    })
    update({ detailSections: sections })
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch(`/api/admin/services/by-slug/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      })
      if (!res.ok) throw new Error('Save failed')
      setMessage('Service saved successfully.')
    } catch {
      setMessage('Failed to save service.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminShell title="Loading..." description="">
        <p className="text-graphite/60">Loading service...</p>
      </AdminShell>
    )
  }

  const detailSections = (service.detailSections as IServiceDetailSection[]) || []

  return (
    <AdminShell
      title={String(service.title || slug)}
      description="Edit listing card and detail page content."
      actions={
        <button onClick={handleSave} disabled={saving} className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Service'}
        </button>
      }
    >
      {message && (
        <p className={`mb-4 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <div className="flex gap-2 mb-6">
        {(['listing', 'detail'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
              tab === t ? 'bg-profile-blue text-white' : 'bg-white border border-gray-200 text-graphite'
            }`}
          >
            {t === 'listing' ? 'Listing / Description' : 'Detail Page'}
          </button>
        ))}
      </div>

      {tab === 'listing' ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={String(service.title || '')}
              onChange={(e) => update({ title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Excerpt (services listing page)</label>
            <textarea
              value={String(service.excerpt || '')}
              onChange={(e) => update({ excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Short Description (HTML)</label>
            <textarea
              value={String(service.description || '')}
              onChange={(e) => update({ description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono text-sm"
            />
          </div>
          <LocalImageField
            label="Listing Card Image"
            folder="pages"
            value={String(service.imageUrl || '')}
            onChange={(url) => update({ imageUrl: url })}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-graphite">Detail Page Hero</h3>
            <LocalImageField
              label="Hero Image"
              folder="pages"
              value={String(service.heroImageUrl || '')}
              onChange={(url) => update({ heroImageUrl: url })}
            />
            <div>
              <label className="block text-sm font-medium mb-1">Challenge</label>
              <textarea
                value={String(service.challenge || '')}
                onChange={(e) => update({ challenge: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Our Approach</label>
              <textarea
                value={String(service.approach || '')}
                onChange={(e) => update({ approach: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {detailSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-semibold">{section.name || `Section ${index + 1}`}</h3>
              <input
                value={section.name}
                onChange={(e) => updateDetailSection(index, { name: e.target.value })}
                placeholder="Section name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <input
                value={section.heading || ''}
                onChange={(e) => updateDetailSection(index, { heading: e.target.value })}
                placeholder="Heading"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <textarea
                value={section.content || ''}
                onChange={(e) => updateDetailSection(index, { content: e.target.value })}
                placeholder="Content"
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <LocalImageField
                label="Section Image"
                folder="pages"
                value={section.imageUrl}
                onChange={(url) => updateDetailSection(index, { imageUrl: url })}
              />
            </div>
          ))}

          <button
            onClick={addDetailSection}
            className="px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-graphite hover:border-profile-blue"
          >
            + Add Detail Section
          </button>
        </div>
      )}
    </AdminShell>
  )
}
