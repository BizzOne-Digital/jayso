import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import GalleryCategory from '@/lib/models/GalleryCategory'
import GalleryImage from '@/lib/models/GalleryImage'
import { requireAdminApi } from '@/lib/auth/adminApi'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const categories = await GalleryCategory.find().sort({ order: 1 }).lean()
  const images = await GalleryImage.find().sort({ order: 1 }).lean()

  const withCounts = categories.map((cat) => ({
    ...cat,
    imageCount: images.filter((img) => String(img.categoryId) === String(cat._id)).length,
  }))

  return NextResponse.json({ categories: withCounts })
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  await connectDB()
  const maxOrder = await GalleryCategory.findOne().sort({ order: -1 }).select('order').lean()

  const category = await GalleryCategory.create({
    name: body.name,
    slug: body.slug,
    description: body.description,
    order: body.order ?? (maxOrder?.order ?? 0) + 1,
    status: body.status || 'published',
  })

  return NextResponse.json({ success: true, category })
}
