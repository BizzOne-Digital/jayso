import { Metadata } from 'next'
import Link from 'next/link'
import { connectDB } from '@/lib/db/mongoose'
import Service from '@/lib/models/Service'
import { Shield, Leaf, Droplets, Sparkles, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services - Profile Environmental Support Services',
  description: 'Comprehensive environmental support services including infection prevention, sustainability, steam cleaning, and green cleaning solutions.',
}

const iconMap: Record<string, any> = {
  'infection-prevention-control': Shield,
  'sustainability': Leaf,
  'steam-cleaning': Droplets,
  'green-cleaning': Sparkles,
}

async function getServices() {
  await connectDB()
  const services = await Service.find({ status: 'published' }).sort({ order: 1 }).lean()
  return JSON.parse(JSON.stringify(services))
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-deep-navy text-white py-32">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80)',
              filter: 'brightness(0.3)',
            }}
          />
        </div>
        
        <div className="container-custom relative z-10">
          <p className="eyebrow text-electric-cyan mb-4">What We Do</p>
          <h1 className="heading-xl mb-6">Our Services</h1>
          <p className="text-xl text-clean-aqua/90 max-w-3xl">
            Specialized cleaning and environmental support solutions designed to protect your 
            people, enhance your facilities, and support your operational goals.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-soft-ice">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service: any) => {
              const Icon = iconMap[service.slug] || Shield

              return (
                <Link
                  key={service._id}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-8">
                    <div className="w-16 h-16 rounded-full bg-profile-blue/10 flex items-center justify-center mb-6 group-hover:bg-profile-blue group-hover:scale-110 transition-all">
                      <Icon className="w-8 h-8 text-profile-blue group-hover:text-white transition-colors" />
                    </div>
                    
                    <h2 className="heading-sm mb-4 group-hover:text-profile-blue transition-colors">
                      {service.title}
                    </h2>
                    
                    <p className="text-graphite/70 mb-6 leading-relaxed">
                      {service.excerpt}
                    </p>
                    
                    <span className="inline-flex items-center text-sm font-medium text-profile-blue group-hover:gap-2 transition-all">
                      Learn More
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-profile-blue text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-clean-aqua/90 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss which services are right for your facility.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-8 py-4 bg-electric-cyan text-[#0a1520] font-bold text-base rounded-lg hover:bg-[#5DD5FF] transition-all shadow-lg"
          >
            Request a Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
