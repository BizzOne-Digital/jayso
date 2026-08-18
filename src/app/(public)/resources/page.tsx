import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import { getPublishedResources } from '@/lib/services/getPublishedContent'
import { Download, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Guides, templates, and resources from OPROFILE Environmental Support Services.',
}

export default async function ResourcesPage() {
  const resources = await getPublishedResources()

  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        eyebrow="Knowledge Center"
        title="Resources"
        subtitle="Download guides, checklists, and reference materials to support cleaner, safer facilities."
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="space-y-4">
            {resources.map((resource: any) => (
              <div
                key={resource._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-profile-blue/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-profile-blue/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-profile-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-profile-blue mb-1">
                      {resource.category}
                    </p>
                    <h2 className="font-display text-lg font-bold text-graphite mb-1">{resource.title}</h2>
                    <p className="text-sm text-graphite/70">{resource.description}</p>
                  </div>
                </div>
                <Link
                  href={resource.isGated ? '/contact' : resource.pdfUrl}
                  className="btn-primary inline-flex items-center justify-center text-sm whitespace-nowrap"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {resource.isGated ? 'Request Access' : 'Download'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
