import { Metadata } from 'next'
import { connectDB } from '@/lib/db/mongoose'
import Service from '@/lib/models/Service'
import Market from '@/lib/models/Market'
import Offer from '@/lib/models/Offer'
import FAQ from '@/lib/models/FAQ'
import Resource from '@/lib/models/Resource'
import Product from '@/lib/models/Product'
import HeroSection from '@/components/public/home/HeroSection'
import ServicesPreview from '@/components/public/home/ServicesPreview'
import MarketsShowcase from '@/components/public/home/MarketsShowcase'
import OffersSection from '@/components/public/home/OffersSection'
import ProcessSection from '@/components/public/home/ProcessSection'
import SustainabilityStory from '@/components/public/home/SustainabilityStory'
import CalculatorSpotlight from '@/components/public/home/CalculatorSpotlight'
import ResourcesPreview from '@/components/public/home/ResourcesPreview'
import FAQPreview from '@/components/public/home/FAQPreview'
import CTASection from '@/components/public/home/CTASection'

export const metadata: Metadata = {
  title: 'Profile Environmental Support Services - Commercial Cleaning & Infection Prevention',
  description: 'Cleaner Spaces. Stronger Systems. Better Outcomes. Commercial cleaning, infection-prevention, sustainability and staff-support solutions designed around your facility.',
}

async function getHomeData() {
  await connectDB()

  const [services, markets, offers, faqs, resources, products] = await Promise.all([
    Service.find({ status: 'published' }).sort({ order: 1 }).limit(4).lean(),
    Market.find({ status: 'published' }).sort({ order: 1 }).limit(7).lean(),
    Offer.find({ status: 'published' }).sort({ order: 1 }).lean(),
    FAQ.find({ status: 'published' }).sort({ order: 1 }).limit(6).lean(),
    Resource.find({ status: 'published' }).sort({ order: 1 }).limit(3).lean(),
    Product.find({ status: 'published', featured: true }).sort({ order: 1 }).limit(3).lean(),
  ])

  return {
    services: JSON.parse(JSON.stringify(services)),
    markets: JSON.parse(JSON.stringify(markets)),
    offers: JSON.parse(JSON.stringify(offers)),
    faqs: JSON.parse(JSON.stringify(faqs)),
    resources: JSON.parse(JSON.stringify(resources)),
    products: JSON.parse(JSON.stringify(products)),
  }
}

export default async function HomePage() {
  const data = await getHomeData()

  return (
    <>
      <HeroSection />
      <ServicesPreview services={data.services} />
      <ProcessSection />
      <MarketsShowcase markets={data.markets} />
      <OffersSection offers={data.offers} />
      <SustainabilityStory />
      <CalculatorSpotlight />
      <ResourcesPreview resources={data.resources} products={data.products} />
      <FAQPreview faqs={data.faqs} />
      <CTASection />
    </>
  )
}
