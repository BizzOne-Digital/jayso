import { connectDB } from '@/lib/db/mongoose'
import Service from '@/lib/models/Service'
import { SERVICE_CATALOG } from '@/lib/data/services'

export async function getPublishedServices() {
  let dbMap = new Map<string, any>()

  try {
    await connectDB()
    const dbServices = await Service.find({ status: 'published' }).sort({ order: 1 }).lean()
    dbMap = new Map(dbServices.map((service: any) => [service.slug, service]))
  } catch (error) {
    console.error('Error loading services from database:', error)
  }

  return SERVICE_CATALOG.map((service) => {
    const dbService = dbMap.get(service.slug)

    return {
      _id: dbService?._id?.toString() || `catalog-${service.slug}`,
      title: dbService?.title || service.title,
      slug: service.slug,
      excerpt: dbService?.excerpt || service.excerpt,
      description: dbService?.description || service.description,
      imageUrl: dbService?.imageUrl || service.imageUrl,
      heroImageUrl: dbService?.heroImageUrl || service.heroImageUrl,
      imageAlt: dbService?.imageAlt || service.imageAlt,
      ctaLabel: dbService?.ctaLabel || service.ctaLabel,
      ctaUrl: dbService?.ctaUrl || '/booking',
      order: service.order,
      status: 'published',
      challenge: dbService?.challenge,
      approach: dbService?.approach,
      scope: dbService?.scope,
      benefits: dbService?.benefits,
      process: dbService?.process,
      relatedMarkets: dbService?.relatedMarkets || [],
    }
  })
}

export async function getPublishedServiceBySlug(slug: string) {
  const services = await getPublishedServices()
  return services.find((service) => service.slug === slug) || null
}
