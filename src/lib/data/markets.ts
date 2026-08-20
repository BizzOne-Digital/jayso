export interface MarketDefinition {
  title: string
  slug: string
  excerpt: string
  description: string
  heroImageUrl: string
  order: number
}

export const MARKET_CATALOG: MarketDefinition[] = [
  {
    title: 'Office Buildings & Corporate Offices',
    slug: 'office-buildings',
    excerpt: 'Professional cleaning solutions for corporate environments that enhance productivity and impress clients.',
    description:
      '<p>We understand that office environments directly impact employee productivity, client impressions, and overall business success. Our corporate cleaning services maintain professional spaces that support your business objectives.</p>',
    heroImageUrl: '/heroes/market-corporate.jpg',
    order: 1,
  },
  {
    title: 'Medical & Healthcare Facilities',
    slug: 'healthcare-facilities',
    excerpt: 'Specialized infection-control cleaning for medical environments where safety is paramount.',
    description:
      '<p>Healthcare facilities demand the highest cleaning standards. We provide specialized infection prevention protocols, trained staff, and rigorous quality control to protect patients, staff, and visitors.</p>',
    heroImageUrl: '/services/healthcare-ltc-medical-facility.jpg',
    order: 2,
  },
  {
    title: 'Retail & Commercial Stores',
    slug: 'retail-commercial',
    excerpt: 'Maintain welcoming, spotless retail environments that enhance the customer experience.',
    description:
      '<p>Retail success depends on customer experience. Clean, well-maintained stores encourage longer visits and return business.</p>',
    heroImageUrl: '/services/communal-areas.jpg',
    order: 3,
  },
  {
    title: 'Industrial & Warehousing',
    slug: 'industrial-warehousing',
    excerpt: 'Heavy-duty cleaning solutions for industrial facilities and distribution centers.',
    description:
      '<p>Industrial facilities face unique cleaning challenges. We provide specialized equipment, trained staff, and safety-focused protocols.</p>',
    heroImageUrl: '/services/building-services.jpg',
    order: 4,
  },
  {
    title: 'Property Management Companies',
    slug: 'property-management',
    excerpt: 'Comprehensive cleaning programs for multi-tenant buildings and managed properties.',
    description:
      '<p>Property managers need reliable cleaning partners who understand tenant satisfaction, building maintenance, and consistent service delivery.</p>',
    heroImageUrl: '/services/office-clean.jpg',
    order: 5,
  },
  {
    title: 'Hospitality',
    slug: 'hospitality',
    excerpt: 'Exceptional cleaning standards for hotels, event venues, and hospitality spaces.',
    description:
      '<p>Guest experience depends on immaculate cleanliness. We provide hospitality-focused cleaning that meets and exceeds guest expectations.</p>',
    heroImageUrl: '/services/communal-areas.jpg',
    order: 6,
  },
  {
    title: 'Educational Facilities',
    slug: 'educational-facilities',
    excerpt: 'Safe, healthy learning environments for schools, daycares, and educational institutions.',
    description:
      '<p>Educational facilities need cleaning that protects student and staff health while maintaining safe, welcoming learning environments.</p>',
    heroImageUrl: '/heroes/market-education.jpg',
    order: 7,
  },
  {
    title: 'Residential Buildings',
    slug: 'residential-buildings',
    excerpt: 'Professional cleaning programs for condominiums, apartments, and residential properties.',
    description:
      '<p>Residential buildings require consistent, high-standard cleaning that protects residents, preserves property value, and supports a healthy living environment. Our environmental services team delivers reliable programs tailored to multi-unit residential settings.</p>',
    heroImageUrl: '/heroes/market-residential.jpg',
    order: 8,
  },
]
