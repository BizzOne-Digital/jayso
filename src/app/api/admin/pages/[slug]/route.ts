import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import Page from '@/lib/models/Page'
import { requireAdminApi } from '@/lib/auth/adminApi'
import {
  DEFAULT_PAGE_META,
  DEFAULT_PAGE_SECTIONS,
  MANAGED_PAGE_SLUGS,
  type ManagedPageSlug,
} from '@/lib/data/pageDefaults'
import { deleteUploadByUrl } from '@/lib/uploads/deleteUpload'
import { revalidateManagedPage } from '@/lib/services/revalidatePublic'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: { slug: string }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const slug = params.slug as ManagedPageSlug
  if (!MANAGED_PAGE_SLUGS.includes(slug)) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  await connectDB()
  const page = await Page.findOne({ slug }).lean()
  const defaults = DEFAULT_PAGE_SECTIONS[slug]
  const meta = DEFAULT_PAGE_META[slug]

  return NextResponse.json({
    slug,
    title: page?.title || meta.title,
    metaTitle: page?.metaTitle || '',
    metaDescription: page?.metaDescription || '',
    status: page?.status || 'published',
    sections: page?.sections?.length ? page.sections : defaults,
    defaultSections: defaults,
  })
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const slug = params.slug as ManagedPageSlug
  if (!MANAGED_PAGE_SLUGS.includes(slug)) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  const body = await request.json()
  const { title, metaTitle, metaDescription, sections, status } = body

  await connectDB()
  const existing = await Page.findOne({ slug }).lean()

  if (existing?.sections && sections) {
    for (const oldSection of existing.sections) {
      const newSection = sections.find((s: { name: string }) => s.name === oldSection.name)
      if (oldSection.imageUrl && oldSection.imageUrl !== newSection?.imageUrl) {
        await deleteUploadByUrl(oldSection.imageUrl)
      }
    }
  }

  const page = await Page.findOneAndUpdate(
    { slug },
    {
      title: title || DEFAULT_PAGE_META[slug].title,
      slug,
      metaTitle,
      metaDescription,
      sections,
      status: status || 'published',
    },
    { upsert: true, new: true }
  )

  revalidateManagedPage(slug)

  return NextResponse.json({ success: true, page })
}
