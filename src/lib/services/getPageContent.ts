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
