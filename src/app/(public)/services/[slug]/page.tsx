import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageHero from '@/components/public/PageHero'
import { getPublishedServiceBySlug } from '@/lib/services/getPublishedServices'
import { SERVICE_CATALOG } from '@/lib/data/services'
import { ArrowRight, CheckCircle, Phone } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getPublishedServiceBySlug(params.slug)

  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: `${service.title} | OPROFILE Environmental Support Services`,
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

  return (
    <div className="min-h-screen">
      <PageHero
        image={service.heroImageUrl || service.imageUrl || '/hero-bg.png'}
        title={service.title}
        subtitle={service.excerpt}
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <Link
            href="/services"
            className="inline-flex items-center text-profile-blue hover:text-profile-blue/80 mb-6 text-sm font-medium transition-colors"
          >
            ← Back to Services
          </Link>
          <div
            className="prose prose-lg max-w-none text-graphite/80"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
          <div className="mt-10">
            <Link href="/booking" className="btn-primary inline-flex items-center">
              {service.ctaLabel || 'Click Here'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {(service.challenge || service.approach) && (
        <section className="section-padding bg-soft-ice">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {service.challenge && (
                <div>
                  <h2 className="heading-md mb-4 text-graphite">The Challenge</h2>
                  <p className="text-graphite/80 leading-relaxed">{service.challenge}</p>
                </div>
              )}
              {service.approach && (
                <div>
                  <h2 className="heading-md mb-4 text-profile-blue">Our Approach</h2>
                  <p className="text-graphite/80 leading-relaxed">{service.approach}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {((service.scope && service.scope.length > 0) || (service.benefits && service.benefits.length > 0)) && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {service.scope && service.scope.length > 0 && (
                <div>
                  <h2 className="heading-md mb-6">What&apos;s Included</h2>
                  <ul className="space-y-3">
                    {service.scope.map((item: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-profile-blue flex-shrink-0 mt-1" />
                        <span className="text-graphite/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h2 className="heading-md mb-6">Key Benefits</h2>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-profile-blue flex-shrink-0 mt-1" />
                        <span className="text-graphite/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {service.relatedMarkets && service.relatedMarkets.length > 0 && (
        <section className="section-padding bg-soft-ice">
          <div className="container-custom">
            <h2 className="heading-md mb-8 text-center">Ideal for These Markets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {service.relatedMarkets.map((market: any) => (
                <Link
                  key={market._id}
                  href={`/markets/${market.slug}`}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-gray-100"
                >
                  <h3 className="font-semibold text-graphite text-sm">{market.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-profile-blue text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-5">Get Started Today</h2>
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
              href="tel:1-800-251-0034"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/80 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
