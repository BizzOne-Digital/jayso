'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge, Users, BookOpen, FileText } from 'lucide-react'

interface Offer {
  _id: string
  title: string
  slug: string
  excerpt: string
  ctaLabel?: string
  ctaUrl?: string
}

interface OffersSectionProps {
  offers: Offer[]
}

const iconMap: Record<string, any> = {
  'one-month-trial': Badge,
  'housekeeping-setup-consulting': Users,
  'staff-training': BookOpen,
  'cleaning-manual-creation': FileText,
}

export default function OffersSection({ offers }: OffersSectionProps) {
  if (!offers.length) return null

  return (
    <section className="section-padding bg-gradient-to-br from-soft-ice to-clean-aqua/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Special Offers</p>
          <h2 className="heading-lg mb-6">More Than Just Cleaning</h2>
          <p className="text-lg text-graphite/80 max-w-3xl mx-auto">
            We offer consulting, training, and support services to help you optimize your facility operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => {
            const Icon = iconMap[offer.slug] || Badge

            return (
              <motion.div
                key={offer._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Badge for first offer */}
                {index === 0 && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-warm-amber text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Popular
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-profile-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-profile-blue" />
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-sm mb-2">{offer.title}</h3>
                  </div>
                </div>

                <p className="text-graphite/70 leading-relaxed mb-6">
                  {offer.excerpt}
                </p>

                <Link
                  href={offer.ctaUrl || '/booking'}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-electric-cyan text-[#0a1520] font-bold text-sm rounded-lg hover:bg-[#5DD5FF] transition-all shadow-md"
                >
                  {offer.ctaLabel || 'Learn More'}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
