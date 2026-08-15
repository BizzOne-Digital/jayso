'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, Mail } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-deep-navy via-profile-blue to-electric-cyan text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric-cyan rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-xl mb-6 text-balance">
              Ready to Transform Your Facility?
            </h2>
            
            <p className="text-xl text-clean-aqua/90 mb-12 max-w-2xl mx-auto text-balance">
              Let&apos;s discuss how we can help you create healthier, cleaner, and more sustainable spaces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-4 bg-electric-cyan text-[#0a1520] font-bold text-base rounded-lg hover:bg-[#5DD5FF] transition-all shadow-lg shadow-electric-cyan/30 group"
              >
                Request a Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-base rounded-lg hover:bg-white hover:text-profile-blue transition-all"
              >
                Explore Services
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-clean-aqua/90">
              <a
                href="tel:1-800-251-0034"
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">1-800-251-0034</span>
              </a>
              
              <span className="hidden sm:block text-clean-aqua/40">•</span>
              
              <a
                href="mailto:info@environmentalservices.ca"
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">info@environmentalservices.ca</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
