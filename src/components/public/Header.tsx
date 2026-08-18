'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/shared/Logo'
import { Menu, X, Phone, MessageCircle, Calculator } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface HeaderProps {
  settings: {
    primaryPhone: string
    whatsappNumber?: string
  }
  integrations: {
    jotformCalculatorUrl?: string
  }
}

export default function Header({ settings, integrations }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Markets', href: '/markets' },
    { label: 'Resources', href: '/resources' },
    { label: 'Shop', href: '/shop' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Utility Bar */}
      <div className="bg-soft-ice border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between h-9 text-xs sm:text-sm text-graphite/80">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href={`tel:${settings.primaryPhone}`}
                className="flex items-center gap-1.5 hover:text-profile-blue transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{settings.primaryPhone || '1-800-251-0034'}</span>
              </a>

              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 hover:text-profile-blue transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

            <a
              href={integrations.jotformCalculatorUrl || '/calculator'}
              className="flex items-center gap-1.5 hover:text-profile-blue transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cleaning Calculator</span>
              <span className="sm:hidden">Calculator</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-[80px]">
            <Logo size="lg" />

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'text-profile-blue'
                      : 'text-graphite/80 hover:text-profile-blue'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Link href="/booking" className="btn-primary text-sm px-5 py-2.5">
                Request a Consultation
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-graphite hover:bg-gray-100"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <nav className="container-custom py-4 space-y-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'bg-profile-blue/10 text-profile-blue'
                      : 'text-graphite hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 px-4">
                <Link
                  href="/booking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full text-center text-sm"
                >
                  Request a Consultation
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
