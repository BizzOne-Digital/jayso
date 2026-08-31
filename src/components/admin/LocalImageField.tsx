'use client'

import { useRef, useState } from 'react'
import { Loader2, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { UploadFolder } from '@/lib/uploads/constants'
import { resolveImageUrl } from '@/lib/utils/resolveImageUrl'

interface LocalImageFieldProps {
  label: string
  value?: string
  folder: UploadFolder
  onChange: (url: string) => void
  onRemove?: () => void
  className?: string
  hint?: string
}

export default function LocalImageField({
  label,
  value,
  folder,
  onChange,
  onRemove,
  className,
  hint,
}: LocalImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const displayUrl = resolveImageUrl(value)

  const handleUpload = async (file: File) => {
    setUploading(true)
    setMessage(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      onChange(data.url)
      setMessage({ type: 'success', text: 'Image uploaded successfully.' })
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Upload failed',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange('')
    onRemove?.()
    setMessage(null)
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block text-sm font-medium text-graphite">{label}</label>
      {hint && <p className="text-xs text-graphite/60">{hint}</p>}

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="relative w-full sm:w-40 h-28 rounded-lg overflow-hidden border border-gray-200 bg-soft-ice shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-graphite/40">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleUpload(file)
              e.target.value = ''
            }}
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white hover:bg-soft-ice disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {value ? 'Replace Image' : 'Upload Image'}
          </button>

          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          )}
        </div>
      </div>

      {message && (
        <p
          className={cn(
            'text-xs',
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          )}
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
