'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Logo from '@/components/shared/Logo'
import { cn } from '@/lib/utils/cn'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  DollarSign,
  Image,
  MessageSquare,
  HelpCircle,
  Settings,
  LogOut,
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FileText, label: 'Pages', href: '/admin/pages' },
  { icon: Briefcase, label: 'Services', href: '/admin/services' },
  { icon: DollarSign, label: 'Pricing', href: '/admin/pricing' },
  { icon: Image, label: 'Gallery', href: '/admin/gallery' },
  { icon: MessageSquare, label: 'Testimonials', href: '/admin/testimonials' },
  { icon: HelpCircle, label: 'FAQs', href: '/admin/faqs' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-deep-navy text-white overflow-y-auto z-40">
      <div className="p-6 border-b border-white/10">
        <Logo variant="light" size="sm" />
        <p className="text-xs text-clean-aqua/60 mt-2">Admin Portal</p>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-profile-blue text-white'
                  : 'text-clean-aqua/80 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-clean-aqua/80 hover:bg-white/5 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
