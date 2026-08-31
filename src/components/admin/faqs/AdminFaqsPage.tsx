'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'

interface FAQ {
  _id?: string
  question: string
  answer: string
  category: string
  order: number
  status: string
}

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    fetch('/api/admin/faqs')
      .then((r) => r.json())
      .then((data) => setFaqs(data.faqs || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const add = async () => {
    await fetch('/api/admin/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'New question?',
        answer: 'Answer here.',
        category: 'General',
        order: faqs.length,
        status: 'published',
      }),
    })
    load()
  }

  const save = async (faq: FAQ) => {
    if (!faq._id) return
    await fetch(`/api/admin/faqs/${faq._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faq),
    })
  }

  const remove = async (id: string) => {
    await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <AdminShell title="FAQs" description="Manage frequently asked questions.">
      <button onClick={add} className="btn-primary mb-6 px-4 py-2 text-sm inline-flex items-center gap-2">
        <Plus className="w-4 h-4" /> Add FAQ
      </button>

      {loading ? (
        <p className="text-graphite/60">Loading...</p>
      ) : (
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={faq._id || index} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-xs text-profile-blue font-semibold uppercase">{faq.category}</span>
                {faq._id && (
                  <button onClick={() => remove(faq._id!)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <input
                value={faq.category}
                onChange={(e) => {
                  const next = [...faqs]
                  next[index] = { ...faq, category: e.target.value }
                  setFaqs(next)
                }}
                placeholder="Category"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <input
                value={faq.question}
                onChange={(e) => {
                  const next = [...faqs]
                  next[index] = { ...faq, question: e.target.value }
                  setFaqs(next)
                }}
                placeholder="Question"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium"
              />
              <textarea
                value={faq.answer}
                onChange={(e) => {
                  const next = [...faqs]
                  next[index] = { ...faq, answer: e.target.value }
                  setFaqs(next)
                }}
                rows={4}
                placeholder="Answer"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <button
                onClick={() => save(faqs[index])}
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
