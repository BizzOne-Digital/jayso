import { connectDB } from '@/lib/db/mongoose'
import FAQ from '@/lib/models/FAQ'
import Offer from '@/lib/models/Offer'
import Resource from '@/lib/models/Resource'
import Product from '@/lib/models/Product'

const FALLBACK_FAQS = [
  {
    _id: 'faq-1',
    question: 'What areas does OPROFILE Environmental serve?',
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
      '<p>Try OPROFILE Environmental for one month with no long-term commitment. Experience our quality, professionalism, and customer service firsthand.</p>',
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

const FALLBACK_RESOURCES = [
  {
    _id: 'resource-1',
    title: 'Infection Prevention Best Practices Guide',
    slug: 'infection-prevention-guide',
    description: 'Comprehensive guide covering infection prevention protocols and best practices.',
    category: 'Guides',
    pdfUrl: '/uploads/infection-prevention-guide.pdf',
    isGated: false,
    order: 1,
  },
  {
    _id: 'resource-2',
    title: 'Green Cleaning Certification Standards',
    slug: 'green-cleaning-standards',
    description: 'Overview of major green cleaning certifications including Green Seal and LEED requirements.',
    category: 'Guides',
    pdfUrl: '/uploads/green-cleaning-standards.pdf',
    isGated: false,
    order: 2,
  },
  {
    _id: 'resource-3',
    title: 'Facility Cleaning Checklist Template',
    slug: 'cleaning-checklist-template',
    description: 'Downloadable cleaning checklist template for maintaining consistent cleaning standards.',
    category: 'Templates',
    pdfUrl: '/uploads/cleaning-checklist-template.pdf',
    isGated: true,
    order: 3,
  },
]

const FALLBACK_PRODUCTS = [
  {
    _id: 'product-1',
    title: 'Professional Grade Disinfectant Spray',
    slug: 'professional-disinfectant-spray',
    excerpt: 'Hospital-grade disinfectant effective against a broad spectrum of pathogens.',
    description: '<p>EPA-registered hospital-grade disinfectant suitable for hard, non-porous surfaces.</p>',
    category: 'Disinfectants',
    priceLabel: 'Contact for pricing',
    showPrice: false,
    inStock: true,
    featured: true,
    order: 1,
  },
  {
    _id: 'product-2',
    title: 'Green Seal Certified All-Purpose Cleaner',
    slug: 'green-all-purpose-cleaner',
    excerpt: 'Eco-friendly all-purpose cleaner safe for occupants and effective on multiple surfaces.',
    description: '<p>Green Seal certified cleaner for daily maintenance cleaning.</p>',
    category: 'Cleaners',
    priceLabel: 'Contact for pricing',
    showPrice: false,
    inStock: true,
    featured: true,
    order: 2,
  },
  {
    _id: 'product-3',
    title: 'Commercial Microfiber Cleaning System',
    slug: 'microfiber-cleaning-system',
    excerpt: 'Complete microfiber system for efficient, sustainable cleaning.',
    description: '<p>Professional microfiber mop and cloth system for superior cleaning results.</p>',
    category: 'Equipment',
    priceLabel: 'Contact for pricing',
    showPrice: false,
    inStock: true,
    featured: true,
    order: 3,
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
  try {
    await connectDB()
    const resources = await Resource.find({ status: 'published' }).sort({ order: 1 }).lean()
    if (resources.length) return JSON.parse(JSON.stringify(resources))
  } catch (error) {
    console.error('Error loading resources:', error)
  }
  return FALLBACK_RESOURCES
}

export async function getPublishedProducts() {
  try {
    await connectDB()
    const products = await Product.find({ status: 'published' }).sort({ order: 1 }).lean()
    if (products.length) return JSON.parse(JSON.stringify(products))
  } catch (error) {
    console.error('Error loading products:', error)
  }
  return FALLBACK_PRODUCTS
}
