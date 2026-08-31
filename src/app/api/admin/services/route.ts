import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import Service from '@/lib/models/Service'
import { requireAdminApi } from '@/lib/auth/adminApi'
import { SERVICE_CATALOG } from '@/lib/data/services'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const dbServices = await Service.find().lean()
  const dbMap = new Map(dbServices.map((s) => [s.slug, s]))

  const services = SERVICE_CATALOG.map((cat) => {
    const db = dbMap.get(cat.slug)
    return {
      slug: cat.slug,
      title: db?.title || cat.title,
      excerpt: db?.excerpt || cat.excerpt,
      imageUrl: db?.imageUrl || cat.imageUrl,
      _id: db?._id?.toString() || null,
      hasRecord: !!db,
      status: db?.status || 'catalog',
    }
  })

  return NextResponse.json({ services })
}

export async function POST(request: Request) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  await connectDB()

  const maxOrder = await Service.findOne().sort({ order: -1 }).select('order').lean()
  const service = await Service.create({
    ...body,
    order: body.order ?? (maxOrder?.order ?? 0) + 1,
    status: body.status || 'draft',
  })

  return NextResponse.json({ success: true, service })
}
