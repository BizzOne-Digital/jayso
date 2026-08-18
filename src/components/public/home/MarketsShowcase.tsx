'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Stethoscope, ShoppingBag, Warehouse, Building, Hotel, GraduationCap, ArrowRight } from 'lucide-react'

interface Market {
  _id: string
  title: string
  slug: string
  excerpt: string
}

interface MarketsShowcaseProps {
  markets: Market[]
}

const iconMap: Record<string, any> = {
  'office-buildings': Building2,
  'healthcare-facilities': Stethoscope,
  'retail-commercial': ShoppingBag,
  'industrial-warehousing': Warehouse,
  'property-management': Building,
  'hospitality': Hotel,
  'educational-facilities': GraduationCap,
}

export default function MarketsShowcase({ markets }: MarketsShowcaseProps) {
  return (
    <section className="section-padding bg-soft-ice">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Industries We Serve</p>
          <h2 className="heading-lg mb-6 text-graphite">Trusted Across Multiple Markets</h2>
          <p className="text-lg text-graphite/70 max-w-3xl mx-auto">
            We understand the unique challenges and requirements of diverse facility types.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market, index) => {
            const Icon = iconMap[market.slug] || Building2

            return (
              <motion.div
                key={market._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/markets/${market.slug}`}>
                  <div className="group h-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-profile-blue/20 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-profile-blue/10 flex items-center justify-center group-hover:bg-profile-blue group-hover:scale-105 transition-all">
                          <Icon className="w-6 h-6 text-profile-blue group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold mb-2 text-graphite group-hover:text-profile-blue transition-colors">
                          {market.title}
                        </h3>
                        <p className="text-sm text-graphite/65 mb-3 line-clamp-2">
                          {market.excerpt}
                        </p>
                        <span className="inline-flex items-center text-xs font-semibold text-profile-blue group-hover:gap-1 transition-all">
                          Learn More
                          <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
