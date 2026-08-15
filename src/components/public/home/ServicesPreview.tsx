'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Droplets, Leaf, Sparkles, Shield, ArrowRight } from 'lucide-react'

interface Service {
  _id: string
  title: string
  slug: string
  excerpt: string
  imageUrl?: string
}

interface ServicesPreviewProps {
  services: Service[]
}

const iconMap: Record<string, any> = {
  'infection-prevention-control': Shield,
  'sustainability': Leaf,
  'steam-cleaning': Droplets,
  'green-cleaning': Sparkles,
}

export default function ServicesPreview({ services }: ServicesPreviewProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4 text-electric-cyan">What We Do</p>
          <h2 className="heading-lg text-graphite mb-6">
            Comprehensive Environmental Support
          </h2>
          <p className="text-lg text-graphite/70 max-w-3xl mx-auto text-balance">
            From infection prevention to sustainable practices, we deliver specialized 
            cleaning solutions that protect your people and enhance your facilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = iconMap[service.slug] || Shield

            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-soft-ice rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-electric-cyan/20">
                    <div className="w-16 h-16 rounded-xl bg-electric-cyan/10 flex items-center justify-center mb-6 group-hover:bg-electric-cyan group-hover:scale-110 transition-all">
                      <Icon className="w-8 h-8 text-electric-cyan group-hover:text-white transition-colors" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-graphite mb-4 group-hover:text-electric-cyan transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-graphite/70 mb-6 leading-relaxed">
                      {service.excerpt}
                    </p>
                    
                    <span className="inline-flex items-center text-sm font-semibold text-electric-cyan group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-electric-cyan text-white font-bold text-base rounded-lg hover:bg-electric-cyan/90 hover:shadow-lg hover:shadow-electric-cyan/20 transition-all"
          >
            View All Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
