import { Metadata } from 'next'
import Link from 'next/link'
import { connectDB } from '@/lib/db/mongoose'
import SiteSettings from '@/lib/models/SiteSettings'
import PageHero from '@/components/public/PageHero'
import { AnimatedGrid, AnimatedSection } from '@/components/public/motion/FadeIn'
import { getManagedPage, getSection } from '@/lib/services/getPageContent'
import { resolveImageUrl } from '@/lib/utils/resolveImageUrl'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Profile Environmental Support Services for quotes, consultations, and service inquiries.',
}

async function getSettings() {
  try {
    await connectDB()
    const settings = await SiteSettings.findOne().lean()
    return settings
  } catch {
    return null
  }
}

export default async function ContactPage() {
  const [settings, page] = await Promise.all([getSettings(), getManagedPage('contact')])
  const hero = getSection(page.sections, 'Hero')

  const phone = settings?.primaryPhone || '647-703-2900'
  const email = settings?.primaryEmail || 'info@environmentalservices.ca'
  const whatsapp = settings?.whatsappNumber || phone.replace(/\D/g, '')
  const address = settings?.address || 'Greater Toronto Area & surrounding regions'

  return (
    <div className="min-h-screen">
      <PageHero
        image={resolveImageUrl(hero?.imageUrl)}
        eyebrow={hero?.eyebrow || 'Get In Touch'}
        title={hero?.heading || 'Contact Us'}
        subtitle={hero?.content}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <a
              href={`tel:${phone}`}
              className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-profile-blue/30 transition-all"
            >
              <Phone className="w-8 h-8 text-profile-blue mx-auto mb-3" />
              <h3 className="font-semibold text-graphite mb-1">Phone</h3>
              <p className="text-sm text-profile-blue">{phone}</p>
            </a>
            <a
              href={`mailto:${email}`}
              className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-profile-blue/30 transition-all"
            >
              <Mail className="w-8 h-8 text-profile-blue mx-auto mb-3" />
              <h3 className="font-semibold text-graphite mb-1">Email</h3>
              <p className="text-sm text-profile-blue break-all">{email}</p>
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-profile-blue/30 transition-all"
            >
              <MessageCircle className="w-8 h-8 text-profile-blue mx-auto mb-3" />
              <h3 className="font-semibold text-graphite mb-1">WhatsApp</h3>
              <p className="text-sm text-profile-blue">Message Us</p>
            </a>
            <div className="rounded-2xl border border-gray-200 p-6 text-center">
              <MapPin className="w-8 h-8 text-profile-blue mx-auto mb-3" />
              <h3 className="font-semibold text-graphite mb-1">Service Area</h3>
              <p className="text-sm text-graphite/70">{address}</p>
            </div>
          </AnimatedGrid>

          <AnimatedSection className="max-w-2xl mx-auto text-center rounded-2xl bg-soft-ice border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-graphite mb-4">Request a Consultation</h2>
            <p className="text-graphite/70 mb-6">
              For detailed service requests, facility assessments, or custom quotes, use our consultation form.
            </p>
            <Link href="/booking" className="btn-primary inline-flex items-center">
              Go to Consultation Form
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
