import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import StoredUpload from '@/lib/models/StoredUpload'
import { UPLOAD_FOLDERS, type UploadFolder } from '@/lib/uploads/constants'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface RouteParams {
  params: { folder: string; filename: string }
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { folder, filename } = params

  if (!UPLOAD_FOLDERS.includes(folder as UploadFolder)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  if (!filename || filename.includes('..') || filename.includes('/')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
  }

  try {
    await connectDB()
    const doc = await StoredUpload.findOne({ folder, filename }).lean()

    if (!doc || !doc.data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const raw = doc.data as Buffer | { data: number[] }
    const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw.data)

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': doc.mimeType,
        'Content-Length': String(doc.size),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Serve upload error:', error)
    return NextResponse.json({ error: 'Failed to load image' }, { status: 500 })
  }
}
