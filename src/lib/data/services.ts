export interface ServiceDefinition {
  title: string
  slug: string
  excerpt: string
  description: string
  imageUrl: string
  heroImageUrl: string
  imageAlt: string
  ctaLabel: string
  order: number
}

export const SERVICE_CATALOG: ServiceDefinition[] = [
  {
    title: 'Disinfecting',
    slug: 'disinfecting',
    excerpt: 'Hospital-grade disinfection protocols to reduce pathogen transmission and protect occupants.',
    description:
      '<p>Our Disinfecting service delivers clinical-grade surface and environmental disinfection using EPA-registered products and proven protocols. Ideal for healthcare, commercial, and high-traffic facilities.</p>',
    imageUrl: '/services/disinfecting.jpg',
    heroImageUrl: '/services/disinfecting.jpg',
    imageAlt: 'Professional disinfecting service in a medical facility',
    ctaLabel: 'Click Here',
    order: 1,
  },
  {
    title: 'Deep Clean',
    slug: 'deep-clean',
    excerpt: 'Intensive cleaning for heavily used spaces, buildup removal, and detailed restoration.',
    description:
      '<p>Deep Clean targets accumulated soil, high-touch areas, and hard-to-reach spaces with a structured, top-to-bottom approach for a noticeably refreshed facility.</p>',
    imageUrl: '/services/deep-clean.jpg',
    heroImageUrl: '/services/deep-clean.jpg',
    imageAlt: 'Deep cleaning crew mopping a commercial floor',
    ctaLabel: 'Click Here',
    order: 2,
  },
  {
    title: 'Outbreak Clean',
    slug: 'outbreak-clean',
    excerpt: 'Rapid-response cleaning and disinfection support during illness outbreaks.',
    description:
      '<p>Outbreak Clean provides enhanced disinfection, containment-focused protocols, and trained teams to help facilities respond quickly during elevated infection risk periods.</p>',
    imageUrl: '/services/outbreak-clean.jpg',
    heroImageUrl: '/services/outbreak-clean.jpg',
    imageAlt: 'Outbreak cleaning team in protective equipment',
    ctaLabel: 'Click Here',
    order: 3,
  },
  {
    title: 'Steam Clean',
    slug: 'steam-clean',
    excerpt: 'High-temperature steam sanitization for chemical-sensitive and detail-focused cleaning.',
    description:
      '<p>Steam Clean uses commercial steam systems to sanitize surfaces, grout, fixtures, and equipment without relying on harsh chemical residues.</p>',
    imageUrl: '/services/steam-clean.jpg',
    heroImageUrl: '/services/steam-clean.jpg',
    imageAlt: 'Steam cleaning equipment in use',
    ctaLabel: 'Click Here',
    order: 4,
  },
  {
    title: 'Floor Clean',
    slug: 'floor-clean',
    excerpt: 'Professional floor care including scrubbing, polishing, and maintenance programs.',
    description:
      '<p>Floor Clean keeps hard surfaces safe, presentable, and durable through routine and restorative floor maintenance using commercial-grade equipment.</p>',
    imageUrl: '/services/floor-clean.jpg',
    heroImageUrl: '/services/floor-clean.jpg',
    imageAlt: 'Commercial floor scrubbing machine',
    ctaLabel: 'Click Here',
    order: 5,
  },
  {
    title: 'Carpet Wash',
    slug: 'carpet-wash',
    excerpt: 'Deep carpet extraction and refresh for offices, common areas, and commercial interiors.',
    description:
      '<p>Carpet Wash removes embedded soil, stains, and odors to extend carpet life and improve appearance in busy commercial environments.</p>',
    imageUrl: '/services/carpet-wash.jpg',
    heroImageUrl: '/services/carpet-wash.jpg',
    imageAlt: 'Carpet steam cleaning service',
    ctaLabel: 'Click Here',
    order: 6,
  },
  {
    title: 'Communal Areas',
    slug: 'communal-areas',
    excerpt: 'Consistent cleaning for lobbies, washrooms, break rooms, and shared facility spaces.',
    description:
      '<p>Communal Areas service maintains the spaces your people use most—keeping them clean, safe, and welcoming throughout the day.</p>',
    imageUrl: '/services/communal-areas.jpg',
    heroImageUrl: '/services/communal-areas.jpg',
    imageAlt: 'Cleaning team maintaining a communal lobby area',
    ctaLabel: 'Click Here',
    order: 7,
  },
  {
    title: 'Building Services',
    slug: 'building-services',
    excerpt: 'Integrated cleaning and support services tailored to your building operations.',
    description:
      '<p>Building Services combines routine cleaning with operational support to help property teams maintain standards across the full facility.</p>',
    imageUrl: '/services/building-services.jpg',
    heroImageUrl: '/services/building-services.jpg',
    imageAlt: 'Building services cleaning in a modern facility',
    ctaLabel: 'Click Here',
    order: 8,
  },
  {
    title: 'Emergency Clean',
    slug: 'emergency-clean',
    excerpt: 'Fast-response cleaning for urgent situations, spills, and unexpected facility needs.',
    description:
      '<p>Emergency Clean provides rapid deployment for time-sensitive cleaning needs so your facility can return to safe operation quickly.</p>',
    imageUrl: '/services/emergency-clean.jpg',
    heroImageUrl: '/services/emergency-clean.jpg',
    imageAlt: 'Emergency disinfection service',
    ctaLabel: 'Click Here',
    order: 9,
  },
  {
    title: 'Green Clean',
    slug: 'green-clean',
    excerpt: 'Eco-conscious cleaning programs using safer products and sustainable practices.',
    description:
      '<p>Green Clean supports healthier indoor environments through environmentally responsible products and methods without sacrificing results.</p>',
    imageUrl: '/services/green-clean.jpg',
    heroImageUrl: '/services/green-clean.jpg',
    imageAlt: 'Green cleaning service with eco-friendly products',
    ctaLabel: 'Click Here',
    order: 10,
  },
  {
    title: 'Office Clean',
    slug: 'office-clean',
    excerpt: 'Reliable office cleaning programs that keep workspaces professional and healthy.',
    description:
      '<p>Office Clean maintains desks, meeting rooms, washrooms, and common areas with schedules designed around your business operations.</p>',
    imageUrl: '/services/office-clean.jpg',
    heroImageUrl: '/services/office-clean.jpg',
    imageAlt: 'Modern office lobby cleaning service',
    ctaLabel: 'Click Here',
    order: 11,
  },
  {
    title: 'Healthcare, LTC, Medical Facility',
    slug: 'healthcare-ltc-medical-facility',
    excerpt: 'Specialized cleaning for hospitals, long-term care, clinics, and medical environments.',
    description:
      '<p>Our healthcare-focused programs support infection prevention, compliance, and patient-safe environments across medical and long-term care settings.</p>',
    imageUrl: '/services/healthcare-ltc-medical-facility.jpg',
    heroImageUrl: '/services/healthcare-ltc-medical-facility.jpg',
    imageAlt: 'Healthcare facility disinfecting service in a hospital room',
    ctaLabel: 'Click Here',
    order: 12,
  },
]

export function getServiceImage(slug: string) {
  return SERVICE_CATALOG.find((service) => service.slug === slug)?.imageUrl || '/hero-bg.png'
}
