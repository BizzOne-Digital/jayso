import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import GalleryCategory from '@/lib/models/GalleryCategory'
import GalleryImage from '@/lib/models/GalleryImage'
import { requireAdminApi } from '@/lib/auth/adminApi'
import { deleteUploadByUrl } from '@/lib/uploads/deleteUpload'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: { id: string }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const category = await GalleryCategory.findById(params.id).lean()
  if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const images = await GalleryImage.find({ categoryId: params.id }).sort({ order: 1 }).lean()
  return NextResponse.json({ category, images })
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  await connectDB()
  const category = await GalleryCategory.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json({ success: true, category })
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const images = await GalleryImage.find({ categoryId: params.id }).lean()
  for (const img of images) {
    await deleteUploadByUrl(img.imageUrl)
  }
  await GalleryImage.deleteMany({ categoryId: params.id })
  await GalleryCategory.findByIdAndDelete(params.id)

  return NextResponse.json({ success: true })
}
