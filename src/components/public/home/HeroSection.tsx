'use client'

import Link from 'next/link'
import { ArrowRight, Calculator, Shield, Leaf, Award, Building2 } from 'lucide-react'
import PageHero from '@/components/public/PageHero'

export default function HeroSection() {
  const trustBadges = [
    { icon: Shield, label: 'Infection Prevention', sub: 'Clinical-grade protocols' },
    { icon: Leaf, label: 'Sustainable Methods', sub: 'Eco-conscious cleaning' },
    { icon: Award, label: 'One-Month Trial', sub: 'Experience the difference' },
    { icon: Building2, label: 'Built for Your Facility', sub: 'Healthcare • Corporate • Education' },
  ]

  return (
    <>
      <PageHero
        size="large"
        image="/hero-bg.png"
        eyebrow="Environmental Support, Reimagined"
        title="Cleaner Spaces. Smarter Systems. Better Outcomes."
        subtitle="Commercial cleaning, infection prevention and sustainable facility solutions—designed around the way your organization works."
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-profile-blue text-white font-semibold text-sm rounded-lg hover:bg-profile-blue/90 transition-all shadow-md shadow-profile-blue/20"
          >
            Start a Conversation
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 backdrop-blur-sm border-2 border-white/80 text-white font-semibold text-sm rounded-lg hover:bg-white hover:text-profile-blue transition-all"
          >
            Explore Our Services
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <Link
          href="/calculator"
          className="inline-flex items-center mt-5 text-white/90 hover:text-white transition-colors text-sm font-medium"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Your Cleaning Needs
        </Link>
      </PageHero>

      {/* Trust badges — Niagara-style strip */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-profile-blue/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 text-profile-blue" />
                </div>
                <div>
                  <p className="font-semibold text-graphite text-sm">{badge.label}</p>
                  <p className="text-graphite/60 text-xs mt-0.5">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
