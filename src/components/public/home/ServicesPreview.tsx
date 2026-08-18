'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ServiceCard from '@/components/public/ServiceCard'

interface Service {
  _id: string
  title: string
  slug: string
  excerpt: string
  imageUrl?: string
  imageAlt?: string
  ctaLabel?: string
}

interface ServicesPreviewProps {
  services: Service[]
}

export default function ServicesPreview({ services }: ServicesPreviewProps) {
  if (!services || services.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-soft-ice">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">What We Do</p>
          <h2 className="heading-lg text-graphite mb-5">Our Services</h2>
          <p className="text-lg text-graphite/70 max-w-3xl mx-auto text-balance">
            Professional cleaning and environmental support solutions for healthcare, corporate,
            education, and commercial facilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
            >
              <ServiceCard
                title={service.title}
                slug={service.slug}
                excerpt={service.excerpt}
                imageUrl={service.imageUrl}
                imageAlt={service.imageAlt}
                ctaLabel={service.ctaLabel || 'Click Here'}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services" className="btn-primary inline-flex items-center">
            View All Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
