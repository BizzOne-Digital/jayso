'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/shared/Logo'
import { Menu, X, Phone, MessageCircle, Calculator, ChevronDown } from 'lucide-react'
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

const mainNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Markets', href: '/markets' },
]

const contactDropdownLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Shop', href: '/shop' },
  { label: 'Resources', href: '/resources' },
]

const contactPaths = ['/contact', '/faq', '/shop', '/resources']

export default function Header({ settings, integrations }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href
  const isContactActive = contactPaths.some((path) => pathname === path)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setIsContactOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsContactOpen(false)
    setIsMobileMenuOpen(false)
    setIsMobileContactOpen(false)
  }, [pathname])

  const primaryPhone = settings.primaryPhone || '647-703-2900'

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="bg-soft-ice border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between h-9 text-xs sm:text-sm text-graphite/80">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center gap-1.5 hover:text-profile-blue transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{primaryPhone}</span>
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

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-[80px]">
            <Logo size="lg" />

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
              {mainNavLinks.map((link) => (
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

              <div className="relative" ref={contactRef}>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(!isContactOpen)}
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium transition-colors',
                    isContactActive
                      ? 'text-profile-blue'
                      : 'text-graphite/80 hover:text-profile-blue'
                  )}
                  aria-expanded={isContactOpen}
                  aria-haspopup="true"
                >
                  Contact
                  <ChevronDown
                    className={cn('w-4 h-4 transition-transform', isContactOpen && 'rotate-180')}
                  />
                </button>

                {isContactOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                    {contactDropdownLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'block px-4 py-2.5 text-sm transition-colors',
                          isActive(link.href)
                            ? 'text-profile-blue bg-profile-blue/5'
                            : 'text-graphite/80 hover:bg-gray-50 hover:text-profile-blue'
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
              {mainNavLinks.map((link) => (
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

              <button
                type="button"
                onClick={() => setIsMobileContactOpen(!isMobileContactOpen)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isContactActive
                    ? 'bg-profile-blue/10 text-profile-blue'
                    : 'text-graphite hover:bg-gray-50'
                )}
              >
                Contact
                <ChevronDown
                  className={cn('w-4 h-4 transition-transform', isMobileContactOpen && 'rotate-180')}
                />
              </button>

              {isMobileContactOpen && (
                <div className="pl-4 space-y-1">
                  {contactDropdownLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'block px-4 py-2.5 rounded-lg text-sm transition-colors',
                        isActive(link.href)
                          ? 'bg-profile-blue/10 text-profile-blue'
                          : 'text-graphite/80 hover:bg-gray-50'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

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
