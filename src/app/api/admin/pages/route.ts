import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import Page from '@/lib/models/Page'
import { requireAdminApi } from '@/lib/auth/adminApi'
import {
  DEFAULT_PAGE_META,
  DEFAULT_PAGE_SECTIONS,
  MANAGED_PAGE_SLUGS,
  PAGE_LABELS,
  type ManagedPageSlug,
} from '@/lib/data/pageDefaults'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const dbPages = await Page.find({ slug: { $in: MANAGED_PAGE_SLUGS } }).lean()
  const dbMap = new Map(dbPages.map((p) => [p.slug, p]))

  const pages = MANAGED_PAGE_SLUGS.map((slug) => ({
    slug,
    label: PAGE_LABELS[slug],
    title: dbMap.get(slug)?.title || DEFAULT_PAGE_META[slug].title,
    sectionCount: (dbMap.get(slug)?.sections?.length || DEFAULT_PAGE_SECTIONS[slug].length),
    status: dbMap.get(slug)?.status || 'published',
    updatedAt: dbMap.get(slug)?.updatedAt || null,
  }))

  return NextResponse.json({ pages })
}
