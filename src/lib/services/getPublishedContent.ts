import { connectDB } from '@/lib/db/mongoose'
import FAQ from '@/lib/models/FAQ'
import Offer from '@/lib/models/Offer'
import Resource from '@/lib/models/Resource'
import Product from '@/lib/models/Product'
import { RESOURCE_CATALOG } from '@/lib/data/resources'
import { PRODUCT_CATALOG } from '@/lib/data/products'

const FALLBACK_FAQS = [
  {
    _id: 'faq-1',
    question: 'What areas does Profile Environmental serve?',
    answer:
      'We provide services across the Greater Toronto Area and surrounding regions. Contact us to confirm service availability for your specific location.',
    category: 'General',
    order: 1,
  },
  {
    _id: 'faq-2',
    question: 'Are your cleaning products safe and environmentally friendly?',
    answer:
      'Yes. We use certified, eco-friendly products that are safe for building occupants while being effective at cleaning and disinfection.',
    category: 'General',
    order: 2,
  },
  {
    _id: 'faq-3',
    question: 'How do you ensure consistent service quality?',
    answer:
      'We implement rigorous quality control including regular inspections, supervisor oversight, client feedback systems, and detailed cleaning checklists.',
    category: 'Service Quality',
    order: 3,
  },
  {
    _id: 'faq-4',
    question: 'What if I am not satisfied with the cleaning?',
    answer:
      'Client satisfaction is our priority. Contact us immediately and we will address concerns promptly at no additional charge.',
    category: 'Service Quality',
    order: 4,
  },
  {
    _id: 'faq-5',
    question: 'Do you provide services outside of regular business hours?',
    answer:
      'Yes. We offer flexible scheduling including evenings, nights, and weekends to accommodate your operational needs.',
    category: 'Scheduling',
    order: 5,
  },
  {
    _id: 'faq-6',
    question: 'Are your staff insured and background-checked?',
    answer:
      'Absolutely. All staff undergo thorough background checks, are fully trained, and we carry comprehensive liability insurance.',
    category: 'Trust & Safety',
    order: 6,
  },
]

const FALLBACK_OFFERS = [
  {
    _id: 'offer-1',
    title: 'One-Month Trial',
    slug: 'one-month-trial',
    excerpt: 'Experience our service quality risk-free with a one-month trial program.',
    description:
      '<p>Try Profile Environmental for one month with no long-term commitment. Experience our quality, professionalism, and customer service firsthand.</p>',
    ctaLabel: 'Request Trial Program',
    ctaUrl: '/booking',
    order: 1,
  },
  {
    _id: 'offer-2',
    title: 'Housekeeping Department Setup Consulting',
    slug: 'housekeeping-setup-consulting',
    excerpt: 'Expert consulting to establish or optimize your in-house housekeeping department.',
    description:
      '<p>We provide expert consulting to help you establish effective, efficient housekeeping operations.</p>',
    ctaLabel: 'Schedule Consultation',
    ctaUrl: '/booking',
    order: 2,
  },
  {
    _id: 'offer-3',
    title: 'Staff Training Programs',
    slug: 'staff-training',
    excerpt: 'Professional training programs to elevate your cleaning staff skills and effectiveness.',
    description:
      '<p>Customized training programs covering proper techniques, safety protocols, infection prevention, and green cleaning.</p>',
    ctaLabel: 'Inquire About Training',
    ctaUrl: '/booking',
    order: 3,
  },
  {
    _id: 'offer-4',
    title: 'Custom Cleaning Manual Creation',
    slug: 'cleaning-manual-creation',
    excerpt: 'Professional cleaning manuals tailored to your facility and operational requirements.',
    description:
      '<p>We create customized cleaning manuals specific to your facility, including protocols, procedures, and quality standards.</p>',
    ctaLabel: 'Request Information',
    ctaUrl: '/booking',
    order: 4,
  },
]

export async function getPublishedFAQs() {
  try {
    await connectDB()
    const faqs = await FAQ.find({ status: 'published' }).sort({ order: 1 }).lean()
    if (faqs.length) return JSON.parse(JSON.stringify(faqs))
  } catch (error) {
    console.error('Error loading FAQs:', error)
  }
  return FALLBACK_FAQS
}

export async function getPublishedOffers() {
  try {
    await connectDB()
    const offers = await Offer.find({ status: 'published' }).sort({ order: 1 }).lean()
    if (offers.length) return JSON.parse(JSON.stringify(offers))
  } catch (error) {
    console.error('Error loading offers:', error)
  }
  return FALLBACK_OFFERS
}

export async function getPublishedResources() {
  let dbMap = new Map<string, any>()

  try {
    await connectDB()
    const resources = await Resource.find({ status: 'published' }).sort({ order: 1 }).lean()
    dbMap = new Map(resources.map((resource: any) => [resource.slug, resource]))
  } catch (error) {
    console.error('Error loading resources:', error)
  }

  return RESOURCE_CATALOG.map((resource) => {
    const dbResource = dbMap.get(resource.slug)
    const pdfUrl = dbResource?.pdfUrl || resource.pdfUrl
    const isExternal = resource.isExternal || pdfUrl.startsWith('http')

    return {
      _id: dbResource?._id?.toString() || `catalog-${resource.slug}`,
      title: dbResource?.title || resource.title,
      slug: resource.slug,
      description: dbResource?.description || resource.description,
      category: dbResource?.category || resource.category,
      pdfUrl,
      isExternal,
      isGated: dbResource?.isGated ?? resource.isGated ?? false,
      order: resource.order,
    }
  })
}

export async function getPublishedProducts() {
  let dbMap = new Map<string, any>()

  try {
    await connectDB()
    const products = await Product.find({ status: 'published' }).sort({ order: 1 }).lean()
    dbMap = new Map(products.map((product: any) => [product.slug, product]))
  } catch (error) {
    console.error('Error loading products:', error)
  }

  return PRODUCT_CATALOG.map((product) => {
    const dbProduct = dbMap.get(product.slug)
    return {
      _id: dbProduct?._id?.toString() || `catalog-${product.slug}`,
      title: dbProduct?.title || product.title,
      slug: product.slug,
      excerpt: dbProduct?.excerpt || product.excerpt,
      description: dbProduct?.description || product.description,
      category: dbProduct?.category || product.category,
      priceLabel: dbProduct?.priceLabel || product.priceLabel || 'Contact for pricing',
      showPrice: dbProduct?.showPrice ?? false,
      inStock: dbProduct?.inStock ?? true,
      featured: dbProduct?.featured ?? false,
      order: product.order,
    }
  })
}
