import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { connectDB } from '@/lib/db/mongoose'
import StoredUpload from '@/lib/models/StoredUpload'
import { requireAdminApi } from '@/lib/auth/adminApi'
import {
  ALLOWED_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  MIME_TO_EXT,
  UPLOAD_FOLDERS,
  type UploadFolder,
} from '@/lib/uploads/constants'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi()
  if ('error' in auth) return auth.error

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const folder = formData.get('folder') as string

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!UPLOAD_FOLDERS.includes(folder as UploadFolder)) {
      return NextResponse.json({ error: 'Invalid folder' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      return NextResponse.json({ error: 'Invalid file type. Use JPEG, PNG, WebP, or GIF.' }, { status: 400 })
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'File too large. Maximum size is 8MB.' }, { status: 400 })
    }

    const ext = MIME_TO_EXT[file.type as keyof typeof MIME_TO_EXT]
    const filename = `${Date.now()}-${randomBytes(8).toString('hex')}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    await connectDB()
    await StoredUpload.create({
      folder,
      filename,
      mimeType: file.type,
      size: file.size,
      data: buffer,
    })

    return NextResponse.json({
      success: true,
      url: `/api/uploads/${folder}/${filename}`,
      filename,
      size: file.size,
      folder,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
