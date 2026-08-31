import { connectDB } from '../src/lib/db/mongoose'
import AdminUser from '../src/lib/models/AdminUser'
import { hashPassword } from '../src/lib/auth/password'

async function resetAdminPassword() {
  await connectDB()

  const hashedPassword = await hashPassword('Admin@123')
  const user = await AdminUser.findOneAndUpdate(
    { email: 'admin@profilegroups.com' },
    {
      email: 'admin@profilegroups.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      isActive: true,
    },
    { upsert: true, new: true }
  )

  console.log(`Admin password reset for: ${user.email}`)
  process.exit(0)
}

resetAdminPassword().catch((error) => {
  console.error(error)
  process.exit(1)
})
