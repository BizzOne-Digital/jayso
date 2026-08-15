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
    <section className="section-padding bg-deep-navy text-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow text-electric-cyan mb-4">Industries We Serve</p>
          <h2 className="heading-lg mb-6">Trusted Across Multiple Markets</h2>
          <p className="text-lg text-clean-aqua/80 max-w-3xl mx-auto">
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
                  <div className="group h-full glass-panel p-6 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-profile-blue/20 flex items-center justify-center group-hover:bg-profile-blue group-hover:scale-110 transition-all">
                          <Icon className="w-6 h-6 text-electric-cyan group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-electric-cyan transition-colors">
                          {market.title}
                        </h3>
                        <p className="text-sm text-clean-aqua/70 mb-3 line-clamp-2">
                          {market.excerpt}
                        </p>
                        <span className="inline-flex items-center text-xs font-medium text-electric-cyan group-hover:gap-1 transition-all">
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
