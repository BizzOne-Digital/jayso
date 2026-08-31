import { Metadata } from 'next'
import { connectDB } from '@/lib/db/mongoose'
import Market from '@/lib/models/Market'
import Offer from '@/lib/models/Offer'
import FAQ from '@/lib/models/FAQ'
import Resource from '@/lib/models/Resource'
import Product from '@/lib/models/Product'
import HomeTopSection from '@/components/public/home/HomeTopSection'
import MarketsShowcase from '@/components/public/home/MarketsShowcase'
import OffersSection from '@/components/public/home/OffersSection'
import ProcessSection from '@/components/public/home/ProcessSection'
import SustainabilityStory from '@/components/public/home/SustainabilityStory'
import ResourcesPreview from '@/components/public/home/ResourcesPreview'
import FAQPreview from '@/components/public/home/FAQPreview'
import CTASection from '@/components/public/home/CTASection'
import { buildHomeTopContent, getManagedPage } from '@/lib/services/getPageContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Your Facility Impacts Your Customers Experience. Commercial cleaning, infection prevention and sustainable facility solutions from Profile Environmental Support Services.',
}

async function getHomeData() {
  try {
    await connectDB()

    const [markets, offers, faqs, resources, products] = await Promise.all([
      Market.find({ status: 'published' }).sort({ order: 1 }).limit(7).lean(),
      Offer.find({ status: 'published' }).sort({ order: 1 }).lean(),
      FAQ.find({ status: 'published' }).sort({ order: 1 }).limit(6).lean(),
      Resource.find({ status: 'published' }).sort({ order: 1 }).limit(3).lean(),
      Product.find({ status: 'published', featured: true }).sort({ order: 1 }).limit(3).lean(),
    ])

    return {
      markets: JSON.parse(JSON.stringify(markets)),
      offers: JSON.parse(JSON.stringify(offers)),
      faqs: JSON.parse(JSON.stringify(faqs)),
      resources: JSON.parse(JSON.stringify(resources)),
      products: JSON.parse(JSON.stringify(products)),
    }
  } catch (error) {
    console.error('Error fetching home data:', error)
    return {
      markets: [],
      offers: [],
      faqs: [],
      resources: [],
      products: [],
    }
  }
}

export default async function HomePage() {
  const [data, page] = await Promise.all([getHomeData(), getManagedPage('home')])
  const homeContent = buildHomeTopContent(page.sections)

  return (
    <>
      <HomeTopSection content={homeContent} />
      <ProcessSection />
      <MarketsShowcase markets={data.markets} />
      <OffersSection offers={data.offers} />
      <SustainabilityStory />
      <ResourcesPreview resources={data.resources} products={data.products} />
      <FAQPreview faqs={data.faqs} />
      <CTASection />
    </>
  )
}

