import type { IPageSection } from '@/lib/models/Page'

export const MANAGED_PAGE_SLUGS = [
  'home',
  'about',
  'services',
  'gallery',
  'testimonials',
  'faqs',
  'contact',
] as const

export type ManagedPageSlug = (typeof MANAGED_PAGE_SLUGS)[number]

export const PAGE_LABELS: Record<ManagedPageSlug, string> = {
  home: 'Home',
  about: 'About',
  services: 'Services',
  gallery: 'Gallery',
  testimonials: 'Testimonials',
  faqs: 'FAQs',
  contact: 'Contact',
}

function section(
  partial: Omit<IPageSection, 'order' | 'enabled'> & { order: number }
): IPageSection {
  return { enabled: true, ...partial }
}

export const DEFAULT_PAGE_SECTIONS: Record<ManagedPageSlug, IPageSection[]> = {
  home: [
    section({
      name: 'Hero',
      type: 'hero',
      order: 0,
      heading: 'Your Facility Impacts Your Customers Experience',
      imageUrl: '/profile/home-lobby.jpg',
    }),
    section({
      name: 'Facts Sidebar',
      type: 'sidebar',
      order: 1,
      heading: 'Facts:',
      content:
        'A recent study shows 71% of tenants think an office restroom says a lot about the building manager. In addition, 60% say an unhygienic restroom lowers their opinion of the facility and indicates that management doesn\u2019t care.',
      ctaLabel: 'What would tenants say about your restrooms?',
    }),
    section({
      name: 'Gallery Image 1',
      type: 'image',
      order: 2,
      imageUrl: '/profile/gallery-1.jpg',
    }),
    section({
      name: 'Gallery Image 2',
      type: 'image',
      order: 3,
      imageUrl: '/profile/gallery-2.jpg',
    }),
    section({
      name: 'Gallery Image 3',
      type: 'image',
      order: 4,
      imageUrl: '/profile/gallery-3.jpg',
    }),
    section({
      name: 'Gallery Image 4',
      type: 'image',
      order: 5,
      imageUrl: '/profile/gallery-4.jpg',
    }),
    section({
      name: 'Gallery Image 5',
      type: 'image',
      order: 6,
      imageUrl: '/profile/gallery-5.jpg',
    }),
    section({
      name: 'Absenteeism Block',
      type: 'content',
      order: 7,
      heading: 'The Hidden Costs of Absenteeism Due to an Unhygienic Environment',
      content:
        'Workplace absenteeism as a result of sickness is a major concern for employers. It costs Canadian employers billions of dollars a year.',
      ctaLabel: 'How much money is absenteeism costing your company?',
      imageUrl: '/profile/bottom-right.jpg',
    }),
    section({
      name: 'Assessment Block',
      type: 'content',
      order: 8,
      heading: 'Assessment Calculator',
      content:
        'Find out if it\u2019s time for a change! Use our assessment calculator to evaluate your current cleaning service provider.',
      ctaLabel: 'Are your needs being met?',
      imageUrl: '/profile/bottom-left.jpg',
    }),
    section({
      name: 'Assessment Center Image',
      type: 'image',
      order: 9,
      imageUrl: '/profile/bottom-center.jpg',
    }),
  ],
  about: [
    section({
      name: 'Hero',
      type: 'hero',
      order: 0,
      heading: 'A Well-Maintained Facility Produces Great Customer Experiences',
      imageUrl: '/heroes/about.jpg',
      content:
        'Effective housekeeping can eliminate workplace hazards and help get a job done safely and properly.',
      ctaLabel: 'How does your cleaning service provider ensure safety in your workplace?',
    }),
    section({
      name: 'Excellence Intro',
      type: 'content',
      order: 1,
      heading: 'Committed to Achieving Excellence in Every Result',
      content: 'At Profile, our commitment to delivering top-tier results is unwavering.',
    }),
  ],
  services: [
    section({
      name: 'Hero',
      type: 'hero',
      order: 0,
      heading: 'Your Top Choice for Comprehensive Disinfection Cleaning Solutions',
      imageUrl: '/profile/services-hero.jpg',
      content:
        'We redefine the standards of cleanliness with our specialized disinfection solutions.',
    }),
  ],
  gallery: [
    section({
      name: 'Hero',
      type: 'hero',
      order: 0,
      heading: 'Our Work Gallery',
      imageUrl: '/profile/home-lobby.jpg',
      content: 'Explore our facility cleaning projects and results.',
    }),
  ],
  testimonials: [
    section({
      name: 'Hero',
      type: 'hero',
      order: 0,
      heading: 'What Our Clients Say',
      imageUrl: '/heroes/our-team.jpg',
      content: 'Trusted by facility managers across the Greater Toronto Area.',
    }),
  ],
  faqs: [
    section({
      name: 'Hero',
      type: 'hero',
      order: 0,
      heading: 'Frequently Asked Questions',
      imageUrl: '/hero-bg.png',
      content: 'Answers to common questions about our services, scheduling, and quality standards.',
      eyebrow: 'Help Center',
    }),
  ],
  contact: [
    section({
      name: 'Hero',
      type: 'hero',
      order: 0,
      heading: 'Contact Us',
      imageUrl: '/hero-bg.png',
      content:
        'Reach out for a consultation, quote, or any questions about our cleaning and facility support services.',
      eyebrow: 'Get In Touch',
    }),
  ],
}

export const DEFAULT_PAGE_META: Record<
  ManagedPageSlug,
  { title: string; metaTitle?: string; metaDescription?: string }
> = {
  home: { title: 'Home' },
  about: { title: 'About Us' },
  services: { title: 'Our Services' },
  gallery: { title: 'Gallery' },
  testimonials: { title: 'Testimonials' },
  faqs: { title: 'FAQ' },
  contact: { title: 'Contact Us' },
}
