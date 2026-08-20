export interface ProfileCtaLink {
  label: string
  href: string
  external?: boolean
}

export const HOME_FACTS_LINKS: ProfileCtaLink[] = [
  { label: 'Our Services', href: '/services' },
  { label: 'Request for Quote', href: '/booking' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'E-Store', href: '/shop' },
  { label: 'Cleaning Evaluation Calculator', href: '/calculator' },
]

export const HOME_ASSESSMENT_LINKS: ProfileCtaLink[] = [
  { label: 'Cleaning Evaluation Calculator', href: '/calculator' },
  { label: 'info@environmentalservices.ca', href: 'mailto:info@environmentalservices.ca' },
]

export const PROFILE_IMAGES = {
  homeLobby: '/profile/home-lobby.jpg',
  gallery: [
    '/profile/gallery-1.jpg',
    '/profile/gallery-2.jpg',
    '/profile/gallery-3.jpg',
    '/profile/gallery-4.jpg',
    '/profile/gallery-5.jpg',
  ],
  bottomLeft: '/profile/bottom-left.jpg',
  bottomCenter: '/profile/bottom-center.jpg',
  bottomRight: '/profile/bottom-right.jpg',
  aboutHero: '/profile/about-hero.jpg',
  servicesHero: '/profile/services-hero.jpg',
  marketsHero: '/profile/markets-hero.jpg',
} as const

export const HOME_CONTENT = {
  heroTitle: 'Your Facility Impacts Your Customers Experience',
  factsHeading: 'Facts:',
  factsBody:
    'A recent study shows 71% of tenants think an office restroom says a lot about the building manager. In addition, 60% say an unhygienic restroom lowers their opinion of the facility and indicates that management doesn\u2019t care.',
  factsEmphasis: 'What would tenants say about your restrooms?',
  absenteeismHeading: 'The Hidden Costs of Absenteesm Due to an Unhygenic Environment',
  absenteeismBody:
    'Workplace absenteeism as a result of sickness is a major concern for employers. It costs Canadian employers billions of dollars a year. And that doesn\u2019t take into account disability costs, lost productivity or the demoralizing impact on the workplace.',
  absenteeismEmphasis: 'How much money is absenteeism costing your company?',
  assessmentHeading: 'Assessment Calculator',
  assessmentBody:
    'Find out if it\u2019s time for a change! Use our assessment calculator to evaluate your current cleaning service provider.',
  assessmentEmphasis: 'Are your needs being met?',
}
