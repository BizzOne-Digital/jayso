import { connectDB } from '@/lib/db/mongoose'
import Page, { type IPageSection } from '@/lib/models/Page'
import {
  DEFAULT_PAGE_META,
  DEFAULT_PAGE_SECTIONS,
  type ManagedPageSlug,
} from '@/lib/data/pageDefaults'

function mergeSections(
  defaults: IPageSection[],
  dbSections: IPageSection[] | undefined
): IPageSection[] {
  if (!dbSections?.length) return defaults

  const dbByName = new Map(dbSections.map((s) => [s.name, s]))

  return defaults.map((def) => {
    const db = dbByName.get(def.name)
    if (!db) return def
    return {
      ...def,
      ...db,
      _id: db._id,
    }
  })
}

export async function getManagedPage(slug: ManagedPageSlug) {
  const defaults = DEFAULT_PAGE_SECTIONS[slug]
  const meta = DEFAULT_PAGE_META[slug]

  try {
    await connectDB()
    const page = await Page.findOne({ slug, status: 'published' }).lean()

    return {
      slug,
      title: page?.title || meta.title,
      metaTitle: page?.metaTitle || meta.metaTitle,
      metaDescription: page?.metaDescription || meta.metaDescription,
      sections: mergeSections(defaults, page?.sections as IPageSection[] | undefined),
    }
  } catch {
    return {
      slug,
      title: meta.title,
      metaTitle: meta.metaTitle,
      metaDescription: meta.metaDescription,
      sections: defaults,
    }
  }
}

export function getSection(
  sections: IPageSection[],
  name: string
): IPageSection | undefined {
  return sections.find((s) => s.name === name && s.enabled !== false)
}

export function getGalleryImageSections(sections: IPageSection[]): IPageSection[] {
  return sections
    .filter((s) => s.enabled !== false && s.name.startsWith('Gallery Image'))
    .sort((a, b) => a.order - b.order)
}

export interface HomeTopContent {
  heroImage: string
  heroTitle: string
  factsHeading: string
  factsBody: string
  factsEmphasis?: string
  galleryImages: string[]
  absenteeismHeading: string
  absenteeismBody: string
  absenteeismEmphasis?: string
  absenteeismImage: string
  assessmentHeading: string
  assessmentBody: string
  assessmentEmphasis?: string
  assessmentLeftImage: string
  assessmentCenterImage: string
}

export function buildHomeTopContent(sections: IPageSection[]): HomeTopContent {
  const hero = getSection(sections, 'Hero')
  const facts = getSection(sections, 'Facts Sidebar')
  const absenteeism = getSection(sections, 'Absenteeism Block')
  const assessment = getSection(sections, 'Assessment Block')
  const assessmentCenter = getSection(sections, 'Assessment Center Image')
  const gallery = getGalleryImageSections(sections)

  return {
    heroImage: hero?.imageUrl || '/profile/home-lobby.jpg',
    heroTitle: hero?.heading || 'Your Facility Impacts Your Customers Experience',
    factsHeading: facts?.heading || 'Facts:',
    factsBody: facts?.content || '',
    factsEmphasis: facts?.ctaLabel,
    galleryImages: gallery.map((s) => s.imageUrl || '').filter(Boolean),
    absenteeismHeading: absenteeism?.heading || '',
    absenteeismBody: absenteeism?.content || '',
    absenteeismEmphasis: absenteeism?.ctaLabel,
    absenteeismImage: absenteeism?.imageUrl || '/profile/bottom-right.jpg',
    assessmentHeading: assessment?.heading || '',
    assessmentBody: assessment?.content || '',
    assessmentEmphasis: assessment?.ctaLabel,
    assessmentLeftImage: assessment?.imageUrl || '/profile/bottom-left.jpg',
    assessmentCenterImage: assessmentCenter?.imageUrl || '/profile/bottom-center.jpg',
  }
}
