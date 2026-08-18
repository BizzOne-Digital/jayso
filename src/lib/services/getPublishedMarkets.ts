import { connectDB } from '@/lib/db/mongoose'
import Market from '@/lib/models/Market'
import { MARKET_CATALOG } from '@/lib/data/markets'

export async function getPublishedMarkets() {
  let dbMap = new Map<string, any>()

  try {
    await connectDB()
    const dbMarkets = await Market.find({ status: 'published' }).sort({ order: 1 }).lean()
    dbMap = new Map(dbMarkets.map((market: any) => [market.slug, market]))
  } catch (error) {
    console.error('Error loading markets:', error)
  }

  return MARKET_CATALOG.map((market) => {
    const dbMarket = dbMap.get(market.slug)
    return {
      _id: dbMarket?._id?.toString() || `catalog-${market.slug}`,
      title: dbMarket?.title || market.title,
      slug: market.slug,
      excerpt: dbMarket?.excerpt || market.excerpt,
      description: dbMarket?.description || market.description,
      heroImageUrl: dbMarket?.heroImageUrl || dbMarket?.imageUrl || market.heroImageUrl,
      challenges: dbMarket?.challenges || [],
      approach: dbMarket?.approach || '',
      solutions: dbMarket?.solutions || [],
      order: market.order,
      status: 'published',
    }
  })
}

export async function getPublishedMarketBySlug(slug: string) {
  const markets = await getPublishedMarkets()
  return markets.find((market) => market.slug === slug) || null
}
