import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about OPROFILE Environmental Support Services — commercial cleaning, infection prevention, and sustainable facility solutions.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        eyebrow="About OPROFILE"
        title="Environmental Support, Reimagined"
        subtitle="We help organizations create cleaner, healthier, and more sustainable spaces through professional cleaning and facility support services."
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-graphite mb-6">Who We Are</h2>
          <p className="text-lg text-graphite/80 leading-relaxed mb-6">
            OPROFILE Environmental Support Services delivers commercial cleaning, disinfecting,
            outbreak response, and facility support programs designed around the way your
            organization works.
          </p>
          <p className="text-lg text-graphite/80 leading-relaxed mb-10">
            From healthcare and long-term care to corporate offices, retail, and industrial
            facilities, our teams combine trained professionals, proven protocols, and responsive
            service to protect your people and your spaces.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Cleaner Spaces', text: 'Consistent, professional results you can see and trust.' },
              { title: 'Smarter Systems', text: 'Structured programs, quality checks, and clear communication.' },
              { title: 'Better Outcomes', text: 'Healthier environments that support your operations.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-soft-ice p-6">
                <h3 className="font-semibold text-graphite mb-2">{item.title}</h3>
                <p className="text-sm text-graphite/70">{item.text}</p>
              </div>
            ))}
          </div>

          <Link href="/booking" className="btn-primary inline-flex items-center">
            Request a Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
