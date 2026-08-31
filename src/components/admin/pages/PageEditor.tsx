'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import LocalImageField from '@/components/admin/LocalImageField'
import type { IPageSection } from '@/lib/models/Page'

interface PageEditorProps {
  slug: string
}

export default function PageEditor({ slug }: PageEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [sections, setSections] = useState<IPageSection[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`/api/admin/pages/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title)
        setSections(data.sections || [])
      })
      .finally(() => setLoading(false))
  }, [slug])

  const updateSection = (index: number, patch: Partial<IPageSection>) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, sections, status: 'published' }),
      })
      if (!res.ok) throw new Error('Save failed')
      setMessage('Page saved successfully.')
      router.refresh()
    } catch {
      setMessage('Failed to save page.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminShell title="Loading..." description="">
        <p className="text-graphite/60">Loading page content...</p>
      </AdminShell>
    )
  }

  return (
    <AdminShell
      title={title}
      description={`Edit sections for /${slug === 'home' ? '' : slug}`}
      actions={
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Page'}
        </button>
      }
    >
      {message && (
        <p className={`mb-4 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="block text-sm font-medium text-graphite mb-2">Page Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg"
          />
        </div>

        {sections.map((section, index) => (
          <div key={section.name} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-semibold text-graphite">{section.name}</h3>
              <span className="text-xs uppercase tracking-wide text-profile-blue bg-profile-blue/10 px-2 py-1 rounded">
                {section.type}
              </span>
            </div>

            {section.eyebrow !== undefined && (
              <div>
                <label className="block text-sm font-medium text-graphite mb-1">Eyebrow</label>
                <input
                  value={section.eyebrow || ''}
                  onChange={(e) => updateSection(index, { eyebrow: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            )}

            {(section.type === 'hero' || section.type === 'content' || section.type === 'sidebar') && (
              <div>
                <label className="block text-sm font-medium text-graphite mb-1">Heading</label>
                <input
                  value={section.heading || ''}
                  onChange={(e) => updateSection(index, { heading: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            )}

            {(section.type === 'hero' || section.type === 'content' || section.type === 'sidebar') && (
              <div>
                <label className="block text-sm font-medium text-graphite mb-1">Content</label>
                <textarea
                  value={section.content || ''}
                  onChange={(e) => updateSection(index, { content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            )}

            {section.ctaLabel !== undefined && (
              <div>
                <label className="block text-sm font-medium text-graphite mb-1">Emphasis / CTA Text</label>
                <input
                  value={section.ctaLabel || ''}
                  onChange={(e) => updateSection(index, { ctaLabel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            )}

            {(section.type === 'hero' || section.type === 'image' || section.type === 'content') && (
              <LocalImageField
                label="Section Image"
                folder="pages"
                value={section.imageUrl}
                onChange={(url) => updateSection(index, { imageUrl: url })}
              />
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  )
}
