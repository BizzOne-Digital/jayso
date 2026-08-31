import { connectDB } from '@/lib/db/mongoose'
import AdminUser from '@/lib/models/AdminUser'
import { verifyPassword } from '@/lib/auth/password'

interface Credentials {
  email?: string
  password?: string
}

export async function authorizeAdmin(credentials: Credentials) {
  if (!credentials?.email || !credentials?.password) {
    return null
  }

  await connectDB()

  const user = await AdminUser.findOne({
    email: credentials.email.toLowerCase(),
    isActive: true,
  })

  if (!user) {
    return null
  }

  const isValidPassword = await verifyPassword(user.password, credentials.password)

  if (!isValidPassword) {
    return null
  }

  user.lastLogin = new Date()
  await user.save()

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  }
}
