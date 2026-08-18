import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import ServiceCard from '@/components/public/ServiceCard'
import { getPublishedServices } from '@/lib/services/getPublishedServices'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Disinfecting, deep clean, outbreak clean, steam clean, floor care, carpet wash, and more from OPROFILE Environmental Support Services.',
}

export default async function ServicesPage() {
  const services = await getPublishedServices()

  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        eyebrow="What We Do"
        title="Our Services"
        subtitle="Professional cleaning and environmental support solutions designed to protect your people, enhance your facilities, and support your operational goals."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service: any) => (
              <ServiceCard
                key={service._id}
                title={service.title}
                slug={service.slug}
                excerpt={service.excerpt}
                imageUrl={service.imageUrl}
                imageAlt={service.imageAlt}
                ctaLabel={service.ctaLabel || 'Click Here'}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-soft-ice border-t border-gray-100">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-graphite">Ready to Get Started?</h2>
          <p className="text-lg text-graphite/70 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss which services are right for your facility.
          </p>
          <Link href="/booking" className="btn-primary inline-flex items-center">
            Request a Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
