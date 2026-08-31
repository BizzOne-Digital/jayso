import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import Testimonial from '@/lib/models/Testimonial'
import { requireAdminApi } from '@/lib/auth/adminApi'
import { deleteUploadByUrl } from '@/lib/uploads/deleteUpload'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: { id: string }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  const body = await request.json()
  await connectDB()
  const existing = await Testimonial.findById(params.id).lean()
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  if (body.imageUrl && existing.imageUrl !== body.imageUrl) {
    await deleteUploadByUrl(existing.imageUrl)
  }

  const testimonial = await Testimonial.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json({ success: true, testimonial })
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  await connectDB()
  const existing = await Testimonial.findById(params.id).lean()
  if (existing) await deleteUploadByUrl(existing.imageUrl)
  await Testimonial.findByIdAndDelete(params.id)

  return NextResponse.json({ success: true })
}
