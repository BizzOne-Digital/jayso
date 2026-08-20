import { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import { getPublishedOffers } from '@/lib/services/getPublishedContent'
import { AnimatedGrid } from '@/components/public/motion/FadeIn'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Special Offers',
  description: 'Current offers and programs from Profile Environmental Support Services.',
}

export default async function OffersPage() {
  const offers = await getPublishedOffers()

  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        eyebrow="Special Programs"
        title="Special Offers"
        subtitle="Explore trial programs, consulting services, training, and other value-added offerings."
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <AnimatedGrid className="space-y-6">
            {offers.map((offer: any) => (
              <div key={offer._id} className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:border-profile-blue/30 transition-colors">
                <h2 className="font-display text-2xl font-bold text-graphite mb-3">{offer.title}</h2>
                <p className="text-graphite/70 mb-4">{offer.excerpt}</p>
                {offer.description && (
                  <div
                    className="prose prose-sm max-w-none text-graphite/75 mb-6"
                    dangerouslySetInnerHTML={{ __html: offer.description }}
                  />
                )}
                <Link
                  href={offer.ctaUrl || '/booking'}
                  className="btn-primary inline-flex items-center text-sm"
                >
                  {offer.ctaLabel || 'Learn More'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </AnimatedGrid>
        </div>
      </section>
    </div>
  )
}
