import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ServiceDetailHero from '@/components/public/ServiceDetailHero'
import { getPublishedServiceBySlug } from '@/lib/services/getPublishedServices'
import { SERVICE_CATALOG } from '@/lib/data/services'
import { getServiceHero } from '@/lib/data/pageHeroes'
import { AnimatedGrid, AnimatedSection } from '@/components/public/motion/FadeIn'
import { ArrowRight, Calculator, CheckCircle, Phone } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getPublishedServiceBySlug(params.slug)

  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: `${service.title} | Profile Environmental Support Services`,
    description: service.excerpt,
  }
}

export async function generateStaticParams() {
  return SERVICE_CATALOG.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getPublishedServiceBySlug(params.slug)

  if (!service) {
    notFound()
  }

  const staticBanner = getServiceHero(params.slug)
  const heroImage =
    service.heroImageUrl ||
    service.imageUrl ||
    staticBanner?.image ||
    '/hero-bg.png'
  const bannerHero = {
    ...(staticBanner || {}),
    title: service.title || staticBanner?.title || service.title,
    image: heroImage,
    contentBox: {
      ...staticBanner?.contentBox,
      body: service.excerpt || staticBanner?.contentBox?.body || '',
    },
  }
  const ctaLabel =
    service.ctaLabel && service.ctaLabel !== 'Click Here'
      ? service.ctaLabel
      : 'Request for Quote'

  return (
    <div className="min-h-screen bg-white">
      <ServiceDetailHero
        title={service.title}
        excerpt={service.excerpt}
        image={heroImage}
        imageAlt={service.imageAlt}
        banner={bannerHero}
      />

      <section className="pb-12 sm:pb-16 bg-soft-ice border-t border-gray-100">
        <div className="container-custom">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-graphite mb-5">
                  About This Service
                </h2>
                <div
                  className="prose prose-lg max-w-none text-graphite/80 prose-headings:text-graphite prose-a:text-profile-blue"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
                <h3 className="font-display text-lg font-bold text-graphite mb-4">
                  Get Started
                </h3>
                <p className="text-sm text-graphite/70 mb-5">
                  Request a quote or speak with our team about {service.title.toLowerCase()} for
                  your facility.
                </p>
                <div className="space-y-3">
                  <Link href="/booking" className="btn-primary w-full inline-flex items-center justify-center">
                    {ctaLabel}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link
                    href="/calculator"
                    className="w-full inline-flex items-center justify-center px-5 py-3 border-2 border-profile-blue text-profile-blue font-semibold text-sm rounded-lg hover:bg-profile-blue/5 transition-all"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Assessment Calculator
                  </Link>
                  <a
                    href="tel:647-703-2900"
                    className="w-full inline-flex items-center justify-center px-5 py-3 border border-gray-200 text-graphite font-semibold text-sm rounded-lg hover:bg-soft-ice transition-all"
                  >
                    <Phone className="w-4 h-4 mr-2 text-profile-blue" />
                    647-703-2900
                  </a>
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center mt-6 text-sm font-medium text-profile-blue hover:text-profile-blue/80"
                >
                  ← View all services
                </Link>
              </div>
            </aside>
          </div>
          </AnimatedSection>
        </div>
      </section>

      {(service.challenge || service.approach) && (
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-custom">
            <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {service.challenge && (
                <div className="rounded-2xl border border-gray-200 bg-soft-ice p-6 sm:p-8">
                  <h2 className="font-display text-xl font-bold mb-4 text-graphite">The Challenge</h2>
                  <p className="text-graphite/80 leading-relaxed">{service.challenge}</p>
                </div>
              )}
              {service.approach && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                  <h2 className="font-display text-xl font-bold mb-4 text-profile-blue">Our Approach</h2>
                  <p className="text-graphite/80 leading-relaxed">{service.approach}</p>
                </div>
              )}
            </AnimatedGrid>
          </div>
        </section>
      )}

      {((service.scope && service.scope.length > 0) ||
        (service.benefits && service.benefits.length > 0)) && (
        <section className="section-padding bg-soft-ice border-t border-gray-100">
          <div className="container-custom">
            <AnimatedGrid className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {service.scope && service.scope.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                  <h2 className="font-display text-xl font-bold mb-6 text-graphite">
                    What&apos;s Included
                  </h2>
                  <ul className="space-y-3">
                    {service.scope.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-profile-blue flex-shrink-0 mt-0.5" />
                        <span className="text-graphite/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.benefits && service.benefits.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                  <h2 className="font-display text-xl font-bold mb-6 text-graphite">Key Benefits</h2>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-profile-blue flex-shrink-0 mt-0.5" />
                        <span className="text-graphite/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </AnimatedGrid>
          </div>
        </section>
      )}

      {service.relatedMarkets && service.relatedMarkets.length > 0 && (
        <section className="section-padding bg-white border-t border-gray-100">
          <div className="container-custom">
            <AnimatedSection>
              <h2 className="font-display text-2xl font-bold mb-8 text-center text-graphite">
                Ideal for These Markets
              </h2>
            </AnimatedSection>
            <AnimatedGrid className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {service.relatedMarkets.map((market: { _id: string; slug: string; title: string }) => (
                <Link
                  key={market._id}
                  href={`/markets/${market.slug}`}
                  className="bg-soft-ice rounded-xl p-5 sm:p-6 text-center hover:shadow-md hover:border-profile-blue/30 transition-all border border-gray-200"
                >
                  <h3 className="font-semibold text-graphite text-sm">{market.title}</h3>
                </Link>
              ))}
            </AnimatedGrid>
          </div>
        </section>
      )}

      <section className="section-padding bg-profile-blue text-white">
        <AnimatedSection className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-5">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-8">
            Contact us to learn more about {service.title} for your facility.
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
