import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import ContentCard from '@/components/public/ContentCard'
import { getPublishedMarkets } from '@/lib/services/getPublishedMarkets'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Markets We Serve',
  description: 'Commercial cleaning and environmental support for healthcare, corporate, retail, industrial, and more.',
}

export default async function MarketsPage() {
  const markets = await getPublishedMarkets()

  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        eyebrow="Industries We Serve"
        title="Markets We Serve"
        subtitle="Specialized cleaning and facility support tailored to the unique needs of your industry."
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {markets.map((market: any) => (
              <ContentCard
                key={market._id}
                title={market.title}
                href={`/markets/${market.slug}`}
                excerpt={market.excerpt}
                imageUrl={market.heroImageUrl}
                ctaLabel="Click Here"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-soft-ice border-t border-gray-100">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-graphite">Not Sure Where You Fit?</h2>
          <p className="text-lg text-graphite/70 mb-8 max-w-2xl mx-auto">
            Contact us and we will recommend the right service program for your facility.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center">
            Contact Us
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
