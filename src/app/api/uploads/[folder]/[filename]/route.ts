import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db/mongoose'
import StoredUpload from '@/lib/models/StoredUpload'
import { UPLOAD_FOLDERS, type UploadFolder } from '@/lib/uploads/constants'
import { bufferFromStored } from '@/lib/uploads/bufferFromStored'

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
    const doc = await StoredUpload.findOne({ folder, filename }).select('mimeType size data')

    if (!doc) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const buffer = bufferFromStored(doc.data)
    if (!buffer?.length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': doc.mimeType,
        'Content-Length': String(doc.size || buffer.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Serve upload error:', error)
    return NextResponse.json({ error: 'Failed to load image' }, { status: 500 })
  }
}
