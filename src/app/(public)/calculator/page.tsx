import { connectDB } from '@/lib/db/mongoose'
import Integration from '@/lib/models/Integration'
import PageHero from '@/components/public/PageHero'
import { AnimatedGrid, AnimatedSection } from '@/components/public/motion/FadeIn'
import { Calculator, ExternalLink, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cleaning Calculator',
  description: 'Evaluate your current cleaning service provider with our free assessment calculator.',
}

async function getCalculatorUrl() {
  await connectDB()
  const integration = await Integration.findOne().lean()
  return integration?.jotformCalculatorUrl || 'https://form.jotform.com/242406303717248'
}

export default async function CalculatorPage() {
  const calculatorUrl = await getCalculatorUrl()

  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        align="center"
        eyebrow="Free Assessment Tool"
        title="Cleaning Evaluation Calculator"
        subtitle="Find out if it's time for a change. Use our assessment calculator to evaluate your current cleaning service provider."
      />

      {/* Info Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="heading-lg mb-6">Are Your Needs Being Met?</h2>
            <p className="text-lg text-graphite/80 mb-8">
              Our free evaluation tool helps you objectively assess your current cleaning 
              service provider across key performance areas including quality, reliability, 
              communication, and value.
            </p>
          </AnimatedSection>

          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-profile-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calculator className="w-6 h-6 text-profile-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-graphite mb-2">Objective Assessment</h3>
                <p className="text-sm text-graphite/70">
                  Evaluate your provider across multiple criteria with our structured framework
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-electric-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-electric-cyan" />
              </div>
              <div>
                <h3 className="font-semibold text-graphite mb-2">Identify Gaps</h3>
                <p className="text-sm text-graphite/70">
                  Discover areas where your current service may be falling short
                </p>
              </div>
            </div>
          </AnimatedGrid>

          <AnimatedSection>
            <div className="bg-soft-ice rounded-2xl p-8">
            <div className="aspect-[4/3] bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src={calculatorUrl}
                frameBorder="0"
                style={{ width: '100%', height: '100%', border: 'none' }}
                scrolling="yes"
                title="Cleaning Evaluation Calculator"
                allow="geolocation; microphone; camera"
              />
            </div>
            
            {/* Fallback Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-graphite/60 mb-3">
                Having trouble with the embedded form?
              </p>
              <a
                href={calculatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-electric-cyan text-electric-cyan font-semibold text-sm rounded-lg hover:bg-electric-cyan hover:text-white transition-all"
              >
                Open Calculator in New Tab
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-profile-blue text-white">
        <AnimatedSection className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-5">Ready to Make a Change?</h2>
          <p className="text-lg text-white/90 mb-8">
            If your evaluation reveals gaps in service, we&apos;re here to help. Experience the
            Profile Environmental difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-profile-blue font-semibold text-sm rounded-lg hover:bg-soft-ice transition-all">
              Request Consultation
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/80 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all">
              View Our Services
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
