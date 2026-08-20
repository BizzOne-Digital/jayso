export interface ProductDefinition {
  title: string
  slug: string
  excerpt: string
  description: string
  category: string
  priceLabel?: string
  order: number
}

export const PRODUCT_CATALOG: ProductDefinition[] = [
  {
    title: 'Professional Grade Disinfectant Spray',
    slug: 'professional-disinfectant-spray',
    excerpt: 'Hospital-grade disinfectant effective against a broad spectrum of pathogens.',
    description: '<p>EPA-registered hospital-grade disinfectant suitable for hard, non-porous surfaces.</p>',
    category: 'Disinfectants',
    order: 1,
  },
  {
    title: 'Green Seal Certified All-Purpose Cleaner',
    slug: 'green-all-purpose-cleaner',
    excerpt: 'Eco-friendly all-purpose cleaner safe for occupants and multiple surfaces.',
    description: '<p>Green Seal certified cleaner for daily maintenance cleaning.</p>',
    category: 'Cleaners',
    order: 2,
  },
  {
    title: 'Commercial Microfiber Cleaning System',
    slug: 'microfiber-cleaning-system',
    excerpt: 'Complete microfiber mop and cloth system for efficient, sustainable cleaning.',
    description: '<p>Professional microfiber system for superior cleaning results.</p>',
    category: 'Equipment',
    order: 3,
  },
  {
    title: 'Floor Stripper & Wax',
    slug: 'floor-stripper-wax',
    excerpt: 'Commercial floor stripper and finish for restorative floor maintenance programs.',
    description: '<p>Professional-grade products for strip and wax floor care.</p>',
    category: 'Floor Care',
    order: 4,
  },
  {
    title: 'Glass & Surface Cleaner',
    slug: 'glass-surface-cleaner',
    excerpt: 'Streak-free cleaner for glass, mirrors, and polished surfaces.',
    description: '<p>Fast-drying formula for offices, lobbies, and washrooms.</p>',
    category: 'Cleaners',
    order: 5,
  },
  {
    title: 'Heavy-Duty Degreaser',
    slug: 'heavy-duty-degreaser',
    excerpt: 'Industrial-strength degreaser for kitchens, workshops, and high-soil areas.',
    description: '<p>Removes grease and grime from hard surfaces safely and effectively.</p>',
    category: 'Cleaners',
    order: 6,
  },
  {
    title: 'Restroom Bowl Cleaner',
    slug: 'restroom-bowl-cleaner',
    excerpt: 'Acid-based bowl cleaner for restrooms and high-traffic washroom facilities.',
    description: '<p>Designed for daily restroom maintenance and deep cleaning.</p>',
    category: 'Restroom Care',
    order: 7,
  },
  {
    title: 'Carpet Extraction Solution',
    slug: 'carpet-extraction-solution',
    excerpt: 'Low-residue carpet cleaning solution for commercial extraction equipment.',
    description: '<p>Removes embedded soil and refreshes commercial carpeted areas.</p>',
    category: 'Carpet Care',
    order: 8,
  },
  {
    title: 'Electrostatic Disinfection Solution',
    slug: 'electrostatic-disinfection-solution',
    excerpt: 'Compatible solution for electrostatic sprayer disinfection programs.',
    description: '<p>Supports thorough coverage for infection prevention protocols.</p>',
    category: 'Disinfectants',
    order: 9,
  },
  {
    title: 'Hand Sanitizer Refill',
    slug: 'hand-sanitizer-refill',
    excerpt: 'Bulk hand sanitizer refill for dispensers in offices and public areas.',
    description: '<p>Supports occupant hygiene in high-traffic facility locations.</p>',
    category: 'Hygiene',
    order: 10,
  },
  {
    title: 'Commercial Trash Liners',
    slug: 'commercial-trash-liners',
    excerpt: 'Heavy-duty liners for office, restroom, and facility waste collection.',
    description: '<p>Available in multiple sizes for commercial waste management.</p>',
    category: 'Supplies',
    order: 11,
  },
  {
    title: 'Wet Floor Sign Kit',
    slug: 'wet-floor-sign-kit',
    excerpt: 'Bilingual caution signs and accessories for safe floor maintenance operations.',
    description: '<p>Essential safety signage for cleaning and housekeeping teams.</p>',
    category: 'Safety',
    order: 12,
  },
]
