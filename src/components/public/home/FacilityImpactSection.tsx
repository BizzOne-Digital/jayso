'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FacilityImpactSection() {
  return (
    <>
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-graphite mb-6">
            The Hidden Costs of Absenteeism Due to an Unhygienic Environment
          </h2>
          <p className="text-lg text-graphite/80 leading-relaxed mb-4">
            Workplace absenteeism as a result of sickness is a major concern for employers. It
            costs Canadian employers billions of dollars a year. And that doesn&apos;t take into
            account disability costs, lost productivity, or the demoralizing impact on the
            workplace.
          </p>
          <p className="text-lg font-medium text-profile-blue mb-8">
            How much money is absenteeism costing your company?
          </p>
          <Link href="/calculator" className="btn-primary inline-flex items-center">
            Use Our Assessment Calculator
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="section-padding bg-soft-ice">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-graphite mb-6">
            Facts
          </h2>
          <p className="text-lg text-graphite/80 leading-relaxed mb-4">
            A recent study shows 71% of tenants think an office restroom says a lot about the
            building manager. In addition, 60% say an unhygienic restroom lowers their opinion
            of the facility and indicates that management doesn&apos;t care.
          </p>
          <p className="text-lg font-medium text-profile-blue">
            What would tenants say about your restrooms?
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-graphite mb-4">
            Assessment Calculator
          </h2>
          <p className="text-lg text-graphite/80 leading-relaxed mb-4">
            Find out if it&apos;s time for a change! Use our assessment calculator to evaluate your
            current cleaning service provider.
          </p>
          <p className="text-lg font-medium text-profile-blue mb-8">
            Are your needs being met?
          </p>
          <Link href="/calculator" className="btn-primary inline-flex items-center">
            Open Assessment Calculator
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
