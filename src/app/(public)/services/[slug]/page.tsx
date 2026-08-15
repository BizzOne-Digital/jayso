import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { connectDB } from '@/lib/db/mongoose'
import Service from '@/lib/models/Service'
import Market from '@/lib/models/Market'
import { ArrowRight, CheckCircle, Phone } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectDB()
  const service = await Service.findOne({ slug: params.slug, status: 'published' }).lean()
  
  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: `${service.title} - Profile Environmental Support Services`,
    description: service.excerpt || service.metaDescription,
  }
}

export async function generateStaticParams() {
  await connectDB()
  const services = await Service.find({ status: 'published' }).select('slug').lean()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

async function getServiceData(slug: string) {
  await connectDB()
  const service = await Service.findOne({ slug, status: 'published' })
    .populate('relatedMarkets')
    .lean()
  
  if (!service) return null

  return JSON.parse(JSON.stringify(service))
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceData(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-deep-navy text-white py-32">
        <div className="absolute inset-0 opacity-20">
          {service.heroImageUrl && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${service.heroImageUrl})` }}
            />
          )}
        </div>
        
        <div className="container-custom relative z-10">
          <Link href="/services" className="inline-flex items-center text-clean-aqua hover:text-white mb-6 transition-colors">
            ← Back to Services
          </Link>
          <h1 className="heading-xl mb-6">{service.title}</h1>
          <p className="text-xl text-clean-aqua/90 max-w-3xl">
            {service.excerpt}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
        </div>
      </section>

      {/* Challenge & Approach */}
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

      {/* Scope & Benefits */}
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
                      <CheckCircle className="w-5 h-5 text-electric-cyan flex-shrink-0 mt-1" />
                      <span className="text-graphite/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Markets */}
      {service.relatedMarkets && service.relatedMarkets.length > 0 && (
        <section className="section-padding bg-soft-ice">
          <div className="container-custom">
            <h2 className="heading-md mb-8 text-center">Ideal for These Markets</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {service.relatedMarkets.map((market: any) => (
                <Link
                  key={market._id}
                  href={`/markets/${market.slug}`}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-graphite text-sm">{market.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-profile-blue text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="heading-lg mb-6">Get Started Today</h2>
          <p className="text-xl text-clean-aqua/90 mb-8">
            Contact us to learn more about {service.title} for your facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-8 py-4 bg-electric-cyan text-[#0a1520] font-bold text-base rounded-lg hover:bg-[#5DD5FF] transition-all shadow-lg"
            >
              Request Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="tel:1-800-251-0034"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-base rounded-lg hover:bg-white hover:text-profile-blue transition-all"
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
