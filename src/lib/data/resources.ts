export interface ResourceDefinition {
  title: string
  slug: string
  description: string
  category: string
  pdfUrl: string
  isExternal?: boolean
  isGated?: boolean
  order: number
}

export const RESOURCE_CATALOG: ResourceDefinition[] = [
  {
    title: 'Waste Management Guide',
    slug: 'waste-management-guide',
    description: 'Guidance on waste handling, disposal, and sustainable facility waste management practices.',
    category: 'Guides',
    pdfUrl: '/uploads/waste-management-guide.pdf',
    order: 1,
  },
  {
    title: 'Floor Care Guide',
    slug: 'floor-care-guide',
    description: 'Best practices for floor maintenance, strip and wax programs, and long-term floor care.',
    category: 'Guides',
    pdfUrl: '/uploads/floor-care-guide.pdf',
    order: 2,
  },
  {
    title: 'Covid 19',
    slug: 'covid-19',
    description: 'Resources and protocols for COVID-19 cleaning, disinfection, and facility preparedness.',
    category: 'Guides',
    pdfUrl: '/uploads/covid-19.pdf',
    order: 3,
  },
  {
    title: 'Posters for Download',
    slug: 'posters-for-download',
    description: 'Printable posters for hand hygiene, cleaning reminders, and workplace safety messaging.',
    category: 'Posters',
    pdfUrl: '/uploads/posters-for-download.pdf',
    order: 4,
  },
  {
    title: 'WHIMS',
    slug: 'whmis',
    description: 'Workplace Hazardous Materials Information System reference materials for cleaning staff.',
    category: 'Training',
    pdfUrl: '/uploads/whmis.pdf',
    order: 5,
  },
  {
    title: 'Office Cleaning Programs',
    slug: 'office-cleaning-programs',
    description: 'Program templates and guidance for establishing effective office cleaning schedules.',
    category: 'Programs',
    pdfUrl: '/uploads/office-cleaning-programs.pdf',
    order: 6,
  },
  {
    title: 'Cleaning & Inspection Guide for Various Settings',
    slug: 'cleaning-inspection-guide',
    description: 'Inspection checklists and cleaning standards for healthcare, corporate, retail, and other settings.',
    category: 'Guides',
    pdfUrl: '/uploads/cleaning-inspection-guide.pdf',
    order: 7,
  },
  {
    title: 'Online Courses & Training',
    slug: 'online-courses-training',
    description: 'Access professional cleaning and facility training courses through Diversey Learning.',
    category: 'Training',
    pdfUrl: 'https://learning.diversey.com/learn',
    isExternal: true,
    order: 8,
  },
]
