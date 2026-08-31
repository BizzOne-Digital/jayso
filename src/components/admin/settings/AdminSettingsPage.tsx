'use client'

import { useEffect, useState } from 'react'
import AdminShell from '@/components/admin/AdminShell'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        const s = data.settings || {}
        setSettings({
          brandName: s.brandName || '',
          primaryEmail: s.primaryEmail || '',
          primaryPhone: s.primaryPhone || '',
          whatsappNumber: s.whatsappNumber || '',
          address: s.address || '',
          facebookUrl: s.facebookUrl || '',
          linkedinUrl: s.linkedinUrl || '',
          instagramUrl: s.instagramUrl || '',
          footerDescription: s.footerDescription || '',
        })
      })
      .finally(() => setLoading(false))
  }, [])

  const update = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })
      if (!res.ok) throw new Error('Failed')
      setMessage('Settings saved. Footer and contact page will update.')
    } catch {
      setMessage('Failed to save settings.')
    } finally {
      setSaving(false)
    }
  }

  const fields = [
    { key: 'brandName', label: 'Brand Name' },
    { key: 'primaryEmail', label: 'Primary Email' },
    { key: 'primaryPhone', label: 'Primary Phone' },
    { key: 'whatsappNumber', label: 'WhatsApp Number' },
    { key: 'address', label: 'Address / Service Area' },
    { key: 'facebookUrl', label: 'Facebook URL' },
    { key: 'linkedinUrl', label: 'LinkedIn URL' },
    { key: 'instagramUrl', label: 'Instagram URL' },
    { key: 'footerDescription', label: 'Footer Description', textarea: true },
  ]

  return (
    <AdminShell
      title="Settings"
      description="Contact info and social links update the footer and contact page."
      actions={
        <button onClick={handleSave} disabled={saving} className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      }
    >
      {message && (
        <p className={`mb-4 text-sm ${message.includes('saved') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}

      {loading ? (
        <p className="text-graphite/60">Loading...</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-graphite mb-1">{field.label}</label>
              {field.textarea ? (
                <textarea
                  value={settings[field.key] || ''}
                  onChange={(e) => update(field.key, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
                />
              ) : (
                <input
                  value={settings[field.key] || ''}
                  onChange={(e) => update(field.key, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
