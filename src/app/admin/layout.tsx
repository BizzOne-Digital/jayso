import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/admin/login')
  }

  return children
}
