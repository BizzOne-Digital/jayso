import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact OPROFILE Environmental Support Services for quotes, consultations, and service inquiries.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Reach out for a consultation, quote, or any questions about our cleaning and facility support services."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <a href="tel:1-800-251-0034" className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-profile-blue/30 transition-all">
              <Phone className="w-8 h-8 text-profile-blue mx-auto mb-3" />
              <h3 className="font-semibold text-graphite mb-1">Phone</h3>
              <p className="text-sm text-profile-blue">1-800-251-0034</p>
            </a>
            <a href="mailto:info@environmentalservices.ca" className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-profile-blue/30 transition-all">
              <Mail className="w-8 h-8 text-profile-blue mx-auto mb-3" />
              <h3 className="font-semibold text-graphite mb-1">Email</h3>
              <p className="text-sm text-profile-blue break-all">info@environmentalservices.ca</p>
            </a>
            <a href="https://wa.me/18002510034" target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-profile-blue/30 transition-all">
              <MessageCircle className="w-8 h-8 text-profile-blue mx-auto mb-3" />
              <h3 className="font-semibold text-graphite mb-1">WhatsApp</h3>
              <p className="text-sm text-profile-blue">Message Us</p>
            </a>
            <div className="rounded-2xl border border-gray-200 p-6 text-center">
              <MapPin className="w-8 h-8 text-profile-blue mx-auto mb-3" />
              <h3 className="font-semibold text-graphite mb-1">Service Area</h3>
              <p className="text-sm text-graphite/70">Greater Toronto Area & surrounding regions</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center rounded-2xl bg-soft-ice border border-gray-100 p-8">
            <h2 className="font-display text-2xl font-bold text-graphite mb-4">Request a Consultation</h2>
            <p className="text-graphite/70 mb-6">
              For detailed service requests, facility assessments, or custom quotes, use our consultation form.
            </p>
            <Link href="/booking" className="btn-primary inline-flex items-center">
              Go to Consultation Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
