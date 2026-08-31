export function bufferFromStored(data: unknown): Buffer | null {
  if (!data) return null
  if (Buffer.isBuffer(data)) return data
  if (data instanceof Uint8Array) return Buffer.from(data)
  if (data instanceof ArrayBuffer) return Buffer.from(data)

  if (typeof data === 'object') {
    const record = data as Record<string, unknown>

    if (Array.isArray(record.data)) {
      return Buffer.from(record.data as number[])
    }

    const nested = record.buffer
    if (nested instanceof ArrayBuffer) return Buffer.from(nested)
    if (nested instanceof Uint8Array) return Buffer.from(nested)
    if (Buffer.isBuffer(nested)) return nested

    if (typeof (data as { read?: (length: number, offset: number) => Buffer }).read === 'function') {
      const binary = data as { length: number; read: (length: number, offset: number) => Buffer }
      return binary.read(binary.length, 0)
    }
  }

  return null
}
