import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import GalleryImage from '@/lib/models/GalleryImage'
import { requireAdminApi } from '@/lib/auth/adminApi'
import { deleteUploadByUrl } from '@/lib/uploads/deleteUpload'
import { revalidateGallery } from '@/lib/services/revalidatePublic'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  await connectDB()

  const image = await GalleryImage.create(body)
  revalidateGallery()
  return NextResponse.json({ success: true, image })
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  const { id, ...updates } = body

  await connectDB()
  const existing = await GalleryImage.findById(id).lean()
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (updates.imageUrl && existing.imageUrl !== updates.imageUrl) {
    await deleteUploadByUrl(existing.imageUrl)
  }

  const image = await GalleryImage.findByIdAndUpdate(id, updates, { new: true })
  revalidateGallery()
  return NextResponse.json({ success: true, image })
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  await connectDB()
  const existing = await GalleryImage.findById(id).lean()
  if (existing) await deleteUploadByUrl(existing.imageUrl)
  await GalleryImage.findByIdAndDelete(id)

  revalidateGallery()

  return NextResponse.json({ success: true })
}
