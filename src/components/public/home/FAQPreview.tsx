'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface FAQ {
  _id: string
  question: string
  answer: string
}

interface FAQPreviewProps {
  faqs: FAQ[]
}

export default function FAQPreview({ faqs }: FAQPreviewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="heading-lg mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-graphite/80">
            Quick answers to common questions about our services.
          </p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {faqs.slice(0, 6).map((faq, index) => (
            <motion.div
              key={faq._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-soft-ice rounded-xl p-6 hover:bg-clean-aqua/30 transition-colors"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-graphite pr-8">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-profile-blue flex-shrink-0 transition-transform',
                      openIndex === index && 'rotate-180'
                    )}
                  />
                </div>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-graphite/70 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/faq"
            className="inline-flex items-center px-6 py-3 border-2 border-electric-cyan text-electric-cyan font-semibold text-sm rounded-lg hover:bg-electric-cyan hover:text-white transition-all"
          >
            View All FAQs
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
