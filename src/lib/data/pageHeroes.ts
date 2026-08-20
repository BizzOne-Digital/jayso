export interface BannerHeroLink {
  label: string
  href: string
}

export interface BannerHeroContent {
  image: string
  title: string
  titleHighlights?: string[]
  titleVariant?: 'light' | 'dark'
  contentBox?: {
    heading?: string
    body: string
    emphasis?: string
  }
  contentBoxVariant?: 'dark' | 'light' | 'blue'
  links?: BannerHeroLink[]
  footerNote?: string
}

export const PAGE_HEROES = {
  about: {
    image: '/profile/about-hero.jpg',
    title: 'A Well-Maintained Facility Produces Great Customer Experiences',
    contentBox: {
      body: 'Effective housekeeping can eliminate some workplace hazards and help get a job done safely and properly. Poor housekeeping can frequently contribute to accidents by hiding hazards that cause injuries.',
      emphasis: 'How does your cleaning service provider ensure safety in your workplace?',
    },
    contentBoxVariant: 'dark',
    links: [{ label: 'Request for Quote', href: '/booking' }],
  },
  ourTeam: {
    image: '/heroes/our-team.jpg',
    title: 'Restrooms Say More than You Think',
    contentBox: {
      body: 'A recent study shows 71% of tenants think an office restroom says a lot about the building manager. In addition, 60% say an unhygienic restroom lowers their opinion of the facility and indicates that management doesn\u2019t care.',
      emphasis: 'What would tenants say about your restrooms?',
    },
    contentBoxVariant: 'dark',
    links: [
      { label: 'Request for Quote', href: '/booking' },
      { label: 'Cleaning Evaluation Calculator', href: '/calculator' },
    ],
  },
  services: {
    image: '/profile/services-hero.jpg',
    title: 'Your Top Choice for Comprehensive Disinfection Cleaning Solutions',
    contentBox: {
      body: 'We redefine the standards of cleanliness with our specialized disinfection solutions. At Profile, we understand that cleaning is more than just tidying up\u2014it\u2019s about creating a safe and healthy environment through advanced technology and meticulous methods. Our expertise lies in steam cleaning and electrostatic disinfection, two cutting-edge techniques that ensure thorough sanitation by effectively eliminating harmful pathogens and contaminants.',
    },
    contentBoxVariant: 'light',
    links: [
      { label: 'Request for Quote', href: '/booking' },
      { label: 'Cleaning Evaluation Calculator', href: '/calculator' },
    ],
  },
  markets: {
    image: '/profile/markets-hero.jpg',
    title: "Enhance Customers' Experience Attract and Retain Customers and Tenants",
    contentBox: {
      heading: 'Reduce Absence, Increase Staff Morale',
      body: 'Workplace absenteeism as a result of sickness is a major concern for employers. It costs Canadian employers billions of dollars a year. And that doesn\u2019t take into account disability costs, lost productivity or the demoralizing impact on the workplace.',
      emphasis: 'How much money is absenteeism costing your company?',
    },
    contentBoxVariant: 'blue',
    links: [{ label: 'Cleaning Evaluation Calculator', href: '/calculator' }],
  },
} satisfies Record<string, BannerHeroContent>

export const MARKET_HEROES: Record<string, BannerHeroContent> = {
  'office-buildings': {
    image: '/heroes/market-corporate.jpg',
    title: 'A Well-Maintained Facility Produces Great Customer Experiences',
    contentBox: {
      body: 'Effective housekeeping can eliminate some workplace hazards and help get a job done safely and properly. Poor housekeeping can frequently contribute to accidents by hiding hazards that cause injuries.',
      emphasis: 'How does your cleaning service provider ensure safety in your workplace?',
    },
    contentBoxVariant: 'dark',
    links: [{ label: 'Request for Quote', href: '/booking' }],
  },
  'educational-facilities': {
    image: '/heroes/market-education.jpg',
    title: 'Reduce Absence In Classroom Through Best Practice Cleaning',
    contentBox: {
      body: 'A clean school environment is crucial for student health and success. Improved hygiene can reduce absences by up to 50%, boosting academic performance. Regular cleaning of classrooms and facilities is essential for a healthier, more effective learning environment.',
      emphasis: 'What cleaning precautions are you taking to protect your students and teachers?',
    },
    contentBoxVariant: 'light',
    links: [
      { label: 'Request for Quote', href: '/booking' },
      { label: 'Cleaning Evaluation Calculator', href: '/calculator' },
    ],
  },
  'residential-buildings': {
    image: '/heroes/market-residential.jpg',
    title: 'Achieving the Highest Standard of Cleaning with Environmental Services',
    titleHighlights: ['Highest Standard', 'Environmental'],
    titleVariant: 'dark',
    contentBox: {
      body: 'Strong infection prevention and control measures are vital for boosting patient safety and preventing the spread of infections.',
    },
    contentBoxVariant: 'blue',
    links: [{ label: 'Request for Quote', href: '/booking' }],
  },
}

export const SERVICE_HEROES: Record<string, BannerHeroContent> = {
  'infection-prevention-control': {
    image: '/heroes/infection-control.jpg',
    title: 'Your Top Choice for Comprehensive Disinfection Cleaning Solutions',
    contentBox: {
      body: 'First Impressions: 94% of people are likely to avoid a business in the future if they encounter a dirty restroom, highlighting the importance of maintaining clean facilities. Our small building cleaning services are tailored to meet the unique needs of compact spaces, offering thorough cleaning and maintenance that ensures every corner is spotless and well-maintained.',
    },
    contentBoxVariant: 'light',
    links: [{ label: 'Cleaning Evaluation Calculator', href: '/calculator' }],
  },
}

export function getMarketHero(slug: string): BannerHeroContent | undefined {
  return MARKET_HEROES[slug]
}

export function getServiceHero(slug: string): BannerHeroContent | undefined {
  return SERVICE_HEROES[slug]
}
