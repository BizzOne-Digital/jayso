'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react'

const benefits = [
  'Evaluate your current cleaning service provider',
  'Identify gaps and improvement opportunities',
  'Get an objective assessment of service quality',
  'Determine if it\'s time for a change',
]

export default function CalculatorSpotlight() {
  return (
    <section className="section-padding bg-gradient-to-br from-profile-blue to-deep-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="calc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#calc-grid)" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-electric-cyan/20 mb-6">
              <Calculator className="w-10 h-10 text-electric-cyan" />
            </div>
            
            <h2 className="heading-lg mb-6">
              Is It Time for a Change?
            </h2>
            
            <p className="text-xl text-clean-aqua/90 mb-8 max-w-2xl mx-auto text-balance">
              Use our free Cleaning Evaluation Calculator to assess your current 
              cleaning service provider and find out if your needs are being met.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center px-8 py-4 bg-electric-cyan text-[#0a1520] font-bold text-base rounded-lg hover:bg-[#5DD5FF] transition-all shadow-lg shadow-electric-cyan/30"
              >
                Open Calculator
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-base rounded-lg hover:bg-white hover:text-profile-blue transition-all"
              >
                Request Consultation
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-electric-cyan flex-shrink-0" />
                <span className="text-clean-aqua/90">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
