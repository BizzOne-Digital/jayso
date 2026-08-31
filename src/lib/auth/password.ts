export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  if (hash.startsWith('$argon2')) {
    try {
      const argon2 = await import('argon2')
      return argon2.verify(hash, password)
    } catch {
      return false
    }
  }

  const bcrypt = await import('bcryptjs')
  return bcrypt.compare(password, hash)
}

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcryptjs')
  return bcrypt.hash(password, 12)
}
