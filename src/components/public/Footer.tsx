import Link from 'next/link'
import Logo from '@/components/shared/Logo'
import { SERVICE_CATALOG } from '@/lib/data/services'
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone } from 'lucide-react'

interface FooterProps {
  settings: {
    brandName?: string
    footerDescription?: string
    primaryEmail?: string
    primaryPhone?: string
    facebookUrl?: string
    linkedinUrl?: string
    twitterUrl?: string
    instagramUrl?: string
  }
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const brandName = settings?.brandName || 'OPROFILE Environmental Support Services'
  const primaryEmail = settings?.primaryEmail || 'info@environmentalservices.ca'
  const primaryPhone = settings?.primaryPhone || '1-800-251-0034'

  const serviceLinks = SERVICE_CATALOG.slice(0, 8).map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
  }))

  const marketLinks = [
    { label: 'Healthcare Facilities', href: '/markets/healthcare-facilities' },
    { label: 'Office Buildings', href: '/markets/office-buildings' },
    { label: 'Retail & Commercial', href: '/markets/retail-commercial' },
    { label: 'Industrial & Warehousing', href: '/markets/industrial-warehousing' },
  ]

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Special Offers', href: '/offers' },
    { label: 'Cleaning Calculator', href: '/calculator' },
    { label: 'Resources', href: '/resources' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-white border-t border-gray-200 text-graphite">
      <div className="container-custom py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <Logo size="lg" className="mb-5" />
            <p className="text-sm text-graphite/70 leading-relaxed mb-6">
              {settings?.footerDescription ||
                'Professional commercial cleaning, infection prevention and sustainable facility solutions for healthcare, corporate and education environments.'}
            </p>

            <div className="space-y-2.5">
              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center gap-2.5 text-sm text-graphite/80 hover:text-profile-blue transition-colors"
              >
                <Phone className="w-4 h-4 text-profile-blue" />
                <span>{primaryPhone}</span>
              </a>
              <a
                href={`mailto:${primaryEmail}`}
                className="flex items-center gap-2.5 text-sm text-graphite/80 hover:text-profile-blue transition-colors"
              >
                <Mail className="w-4 h-4 text-profile-blue" />
                <span>{primaryEmail}</span>
              </a>
            </div>

            <div className="flex items-center gap-3 mt-6">
              {settings?.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-soft-ice hover:bg-profile-blue hover:text-white flex items-center justify-center transition-colors text-profile-blue"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-soft-ice hover:bg-profile-blue hover:text-white flex items-center justify-center transition-colors text-profile-blue"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings?.twitterUrl && (
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-soft-ice hover:bg-profile-blue hover:text-white flex items-center justify-center transition-colors text-profile-blue"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-soft-ice hover:bg-profile-blue hover:text-white flex items-center justify-center transition-colors text-profile-blue"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold mb-5 text-graphite">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-graphite/70 hover:text-profile-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold mb-5 text-graphite">Markets</h3>
            <ul className="space-y-2.5">
              {marketLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-graphite/70 hover:text-profile-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold mb-5 text-graphite">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-graphite/70 hover:text-profile-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-graphite/60">
            © {currentYear} {brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-graphite/60 hover:text-profile-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-graphite/60 hover:text-profile-blue transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
