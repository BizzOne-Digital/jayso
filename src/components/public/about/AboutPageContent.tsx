'use client'

import Link from 'next/link'
import { AnimatedGrid, AnimatedSection } from '@/components/public/motion/FadeIn'
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react'

const servicesInclude = [
  'Development of Best Practices / Standard Operating Procedures',
  'Deep Cleaning (Weekly, Monthly, Quarterly, Annually)',
  'Cleaning & Disinfection',
  'Eco-Friendly Cleaning / Steam Cleaning Program',
  'Floor Maintenance (Floor Strip & Wax)',
  'Strategic Planning',
  'Identification and Evaluation of Requirements and Cost Saving Strategies',
  'Compliance Inspections and Completion Documentation',
  'Project Execution and Contract Management',
  'Supply Management',
]

const highlights = [
  {
    icon: Target,
    title: 'Tailored Programs',
    description: 'Solutions built around your facility, operations, and cleaning challenges.',
  },
  {
    icon: ShieldCheck,
    title: 'PIDAC & IPC Compliant',
    description: 'Programs aligned with infection prevention and provincial advisory standards.',
  },
  {
    icon: Users,
    title: 'Management-Level Focus',
    description: 'Strategic oversight that goes beyond day-to-day service delivery.',
  },
]

const sectors = [
  'Schools & Universities',
  'Medical Facilities',
  'Corporate Offices',
  'Retail & Commercial',
  'Government Facilities',
  'Hospitality & Industrial',
]

export default function AboutPageContent() {
  return (
    <>
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <AnimatedSection className="container-custom">
          <p className="eyebrow mb-3">Who We Are</p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8 space-y-5">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-graphite leading-tight">
                Committed to Achieving Excellence in Every Result
              </h2>
              <p className="text-base sm:text-lg text-graphite/80 leading-relaxed">
                At Profile, our commitment to delivering top-tier results is unwavering. We see ourselves
                as an integral part of your company, striving to understand your business inside and out
                through collaborative efforts. By comprehending the unique cleaning challenges you
                encounter, we craft a tailored program to tackle them head-on.
              </p>
              <p className="text-base sm:text-lg text-graphite/80 leading-relaxed">
                Our approach amalgamates people, processes, and cutting-edge technology to enhance
                productivity and performance, giving you a competitive edge — so you can concentrate on
                your core business activities.
              </p>
              <p className="text-base sm:text-lg text-graphite/80 leading-relaxed">
                Profile specializes in timely, meticulously researched solutions for in-house cleaning
                management professionals. What sets us apart is our management-level focus, which goes
                beyond mere service provision.
              </p>
              <p className="text-base sm:text-lg text-graphite/80 leading-relaxed">
                Our clients trust us to oversee facility cleaning in a way that optimizes costs and asset
                returns, mitigates liability, and ensures regulatory compliance — with strategic planning
                aligned to property objectives and PIDAC requirements.
              </p>
            </div>

            <div className="lg:col-span-4 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-soft-ice p-5 sm:p-6 hover:border-profile-blue/25 hover:shadow-sm transition-all"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-profile-blue/10 mb-4">
                    <item.icon className="h-5 w-5 text-profile-blue" />
                  </div>
                  <h3 className="font-display font-bold text-graphite mb-2">{item.title}</h3>
                  <p className="text-sm text-graphite/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="py-12 sm:py-16 bg-soft-ice">
        <AnimatedSection className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <p className="eyebrow mb-2">Industries</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-graphite">
                Sectors We Support
              </h2>
            </div>
            <p className="text-sm sm:text-base text-graphite/65 max-w-xl">
              Trusted by facility teams across diverse environments throughout the Greater Toronto Area.
            </p>
          </div>

          <AnimatedGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="flex flex-col items-center justify-center text-center rounded-xl border border-gray-200 bg-white px-3 py-5 sm:py-6 shadow-sm hover:border-profile-blue/30 hover:shadow-md transition-all"
              >
                <Building2 className="h-5 w-5 text-profile-blue mb-2" />
                <span className="text-xs sm:text-sm font-semibold text-graphite leading-snug">{sector}</span>
              </div>
            ))}
          </AnimatedGrid>
        </AnimatedSection>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <AnimatedSection className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="eyebrow mb-2">Capabilities</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-graphite mb-3">
              Our Services Include
            </h2>
            <p className="text-graphite/70">
              Comprehensive facility support from planning through execution and supply management.
            </p>
          </div>

          <AnimatedGrid className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" stagger={0.04}>
            {servicesInclude.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm hover:border-profile-blue/25 hover:shadow-md transition-all"
              >
                <CheckCircle className="w-5 h-5 text-profile-blue flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-graphite/80 leading-relaxed">{item}</span>
              </div>
            ))}
          </AnimatedGrid>
        </AnimatedSection>
      </section>

      <section className="py-12 sm:py-16 bg-gradient-to-br from-profile-blue to-[#1a4d8f] text-white">
        <AnimatedSection className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-8 sm:p-10 lg:p-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
                  Partner With Profile
                </p>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                Ready to elevate your facility standards?
              </h2>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed">
                Let&apos;s discuss a cleaning program designed for your building, your team, and your
                compliance requirements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-profile-blue font-semibold text-sm rounded-lg hover:bg-soft-ice transition-all shadow-md"
              >
                Request for Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/70 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all"
              >
                View Services
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
