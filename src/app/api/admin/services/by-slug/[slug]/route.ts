import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import Service from '@/lib/models/Service'
import { requireAdminApi } from '@/lib/auth/adminApi'
import { SERVICE_CATALOG } from '@/lib/data/services'
import { deleteUploadByUrl } from '@/lib/uploads/deleteUpload'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: { slug: string }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const catalog = SERVICE_CATALOG.find((s) => s.slug === params.slug)
  if (!catalog) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await connectDB()
  const dbService = await Service.findOne({ slug: params.slug }).lean()

  return NextResponse.json({
    service: {
      ...catalog,
      ...dbService,
      _id: dbService?._id,
      slug: params.slug,
      detailSections: dbService?.detailSections || [],
    },
    catalog,
  })
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const catalog = SERVICE_CATALOG.find((s) => s.slug === params.slug)
  if (!catalog) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json()
  await connectDB()
  const existing = await Service.findOne({ slug: params.slug }).lean()

  if (existing?.imageUrl && body.imageUrl !== existing.imageUrl) {
    await deleteUploadByUrl(existing.imageUrl)
  }
  if (existing?.heroImageUrl && body.heroImageUrl !== existing.heroImageUrl) {
    await deleteUploadByUrl(existing.heroImageUrl)
  }

  const service = await Service.findOneAndUpdate(
    { slug: params.slug },
    {
      ...body,
      slug: params.slug,
      status: body.status || 'published',
    },
    { upsert: true, new: true }
  )

  return NextResponse.json({ success: true, service })
}
