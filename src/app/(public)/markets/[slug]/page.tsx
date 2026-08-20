import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import MarketDetailHero from '@/components/public/MarketDetailHero'
import { getPublishedMarketBySlug } from '@/lib/services/getPublishedMarkets'
import { MARKET_CATALOG } from '@/lib/data/markets'
import { getMarketHero } from '@/lib/data/pageHeroes'
import { AnimatedGrid, AnimatedSection } from '@/components/public/motion/FadeIn'
import { ArrowRight, CheckCircle, Phone } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const market = await getPublishedMarketBySlug(params.slug)
  if (!market) return { title: 'Market Not Found' }
  return {
    title: `${market.title} | Profile Environmental Support Services`,
    description: market.excerpt,
  }
}

export async function generateStaticParams() {
  return MARKET_CATALOG.map((market) => ({ slug: market.slug }))
}

export default async function MarketDetailPage({ params }: Props) {
  const market = await getPublishedMarketBySlug(params.slug)
  if (!market) notFound()

  const bannerHero = getMarketHero(params.slug)

  return (
    <div className="min-h-screen bg-white">
      <MarketDetailHero
        title={market.title}
        excerpt={market.excerpt}
        image={market.heroImageUrl || '/hero-bg.png'}
        banner={bannerHero}
      />

      <section className="pb-12 sm:pb-16 bg-soft-ice border-t border-gray-100">
        <AnimatedSection className="container-custom max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <div
              className="prose prose-lg max-w-none text-graphite/80 prose-headings:text-graphite"
              dangerouslySetInnerHTML={{ __html: market.description }}
            />
          </div>
        </AnimatedSection>
      </section>

      {market.solutions && market.solutions.length > 0 && (
        <section className="section-padding bg-white border-t border-gray-100">
          <AnimatedSection className="container-custom max-w-4xl">
            <h2 className="font-display text-2xl font-bold mb-6 text-graphite">Solutions We Provide</h2>
            <AnimatedGrid className="space-y-3" stagger={0.05}>
              {market.solutions.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3 list-none">
                  <CheckCircle className="w-5 h-5 text-profile-blue flex-shrink-0 mt-0.5" />
                  <span className="text-graphite/80">{item}</span>
                </li>
              ))}
            </AnimatedGrid>
          </AnimatedSection>
        </section>
      )}

      <section className="section-padding bg-profile-blue text-white">
        <AnimatedSection className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-5">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-8">
            Let us build a cleaning program for your {market.title.toLowerCase()}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-profile-blue font-semibold text-sm rounded-lg hover:bg-soft-ice transition-all"
            >
              Request Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="tel:647-703-2900"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/80 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Us
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  )
}
