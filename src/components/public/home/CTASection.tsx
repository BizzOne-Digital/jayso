'use client'

import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import { AnimatedSection } from '@/components/public/motion/FadeIn'

export default function CTASection() {
  return (
    <AnimatedSection>
      <section className="section-padding bg-profile-blue text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-5 text-balance">
            Ready to Transform Your Facility?
          </h2>

          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto text-balance">
            Let&apos;s discuss how we can help you create healthier, cleaner, and more sustainable spaces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-profile-blue font-semibold text-sm rounded-lg hover:bg-soft-ice transition-all shadow-md group"
            >
              Request a Consultation
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/80 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all"
            >
              Explore Services
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/85 text-sm">
            <a href="tel:647-703-2900" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              <span>647-703-2900</span>
            </a>
            <span className="hidden sm:block text-white/40">•</span>
            <a
              href="mailto:info@environmentalservices.ca"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@environmentalservices.ca</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    </AnimatedSection>
  )
}
