import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import { getPublishedMarketBySlug } from '@/lib/services/getPublishedMarkets'
import { MARKET_CATALOG } from '@/lib/data/markets'
import { ArrowRight, CheckCircle, Phone } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const market = await getPublishedMarketBySlug(params.slug)
  if (!market) return { title: 'Market Not Found' }
  return {
    title: `${market.title} | OPROFILE Environmental Support Services`,
    description: market.excerpt,
  }
}

export async function generateStaticParams() {
  return MARKET_CATALOG.map((market) => ({ slug: market.slug }))
}

export default async function MarketDetailPage({ params }: Props) {
  const market = await getPublishedMarketBySlug(params.slug)
  if (!market) notFound()

  return (
    <div className="min-h-screen">
      <PageHero
        image={market.heroImageUrl || '/hero-bg.png'}
        title={market.title}
        subtitle={market.excerpt}
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <Link href="/markets" className="inline-flex items-center text-profile-blue hover:text-profile-blue/80 mb-6 text-sm font-medium">
            ← Back to Markets
          </Link>
          <div
            className="prose prose-lg max-w-none text-graphite/80"
            dangerouslySetInnerHTML={{ __html: market.description }}
          />
        </div>
      </section>

      {market.solutions && market.solutions.length > 0 && (
        <section className="section-padding bg-soft-ice">
          <div className="container-custom max-w-4xl">
            <h2 className="font-display text-2xl font-bold mb-6 text-graphite">Solutions We Provide</h2>
            <ul className="space-y-3">
              {market.solutions.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-profile-blue flex-shrink-0 mt-0.5" />
                  <span className="text-graphite/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-padding bg-profile-blue text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-5">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-8">
            Let us build a cleaning program for your {market.title.toLowerCase()}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-profile-blue font-semibold text-sm rounded-lg hover:bg-soft-ice transition-all">
              Request Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="tel:1-800-251-0034" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/80 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all">
              <Phone className="mr-2 w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
