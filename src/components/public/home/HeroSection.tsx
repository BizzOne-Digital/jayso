'use client'

import Link from 'next/link'
import { ArrowRight, Calculator } from 'lucide-react'
import PageHero from '@/components/public/PageHero'

export default function HeroSection() {
  return (
    <PageHero
      size="large"
      image="/hero-bg.png"
      title="Your Facility Impacts Your Customers Experience"
      subtitle="Professional commercial cleaning and environmental support services that protect your people, your spaces, and your reputation."
    >
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Link href="/booking" className="btn-primary inline-flex items-center">
          Request a Consultation
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
        <Link
          href="/calculator"
          className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-profile-blue text-profile-blue font-semibold text-sm rounded-lg hover:bg-profile-blue/5 transition-all"
        >
          <Calculator className="w-4 h-4 mr-2" />
          Assessment Calculator
        </Link>
      </div>
    </PageHero>
  )
}
