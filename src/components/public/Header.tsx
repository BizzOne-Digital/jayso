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
      <div className="bg-[#020B15] border-b border-white/5">
        <div className="container-custom">
          <div className="flex items-center justify-between h-10 text-xs sm:text-sm overflow-x-auto">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <a
                href={`tel:${settings.primaryPhone}`}
                className="flex items-center space-x-1 sm:space-x-2 text-white/80 hover:text-white transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden sm:inline">{settings.primaryPhone || '1-800-251-0034'}</span>
                <span className="sm:hidden">Call</span>
              </a>

              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 sm:space-x-2 text-white/80 hover:text-white transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

            <a
              href={integrations.jotformCalculatorUrl || '/calculator'}
              className="flex items-center space-x-1 sm:space-x-2 text-white/80 hover:text-white transition-colors whitespace-nowrap"
            >
              <Calculator className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">Cleaning Calculator</span>
              <span className="sm:hidden">Calculator</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-[#020B15]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Logo variant="brand" size="lg" />

            <nav
              className="hidden lg:flex items-center space-x-8"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-electric-cyan',
                    isActive(link.href) ? 'text-electric-cyan' : 'text-white/90'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Link
                href="/booking"
                className="inline-flex items-center px-6 py-2.5 bg-electric-cyan text-deep-navy font-semibold text-sm rounded-lg hover:bg-electric-cyan/90 transition-all"
              >
                REQUEST A CONSULTATION
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-deep-navy border-t border-white/10">
            <nav className="container-custom py-4 space-y-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'bg-electric-cyan/10 text-electric-cyan'
                      : 'text-white/90 hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/booking"
                  className="block w-full text-center px-6 py-3 bg-electric-cyan text-deep-navy font-semibold text-sm rounded-lg"
                >
                  REQUEST A CONSULTATION
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
