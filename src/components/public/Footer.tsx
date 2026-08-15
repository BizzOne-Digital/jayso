import Link from 'next/link'
import Logo from '@/components/shared/Logo'
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
  
  // Provide defaults if settings are missing
  const brandName = settings?.brandName || 'Profile Environmental Support Services'
  const primaryEmail = settings?.primaryEmail || 'info@environmentalservices.ca'
  const primaryPhone = settings?.primaryPhone || '1-800-251-0034'

  const serviceLinks = [
    { label: 'Infection Prevention Control', href: '/services/infection-prevention-control' },
    { label: 'Sustainability', href: '/services/sustainability' },
    { label: 'Steam Cleaning', href: '/services/steam-cleaning' },
    { label: 'Green Cleaning', href: '/services/green-cleaning' },
  ]

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
    <footer className="bg-deep-navy text-white">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo variant="light" size="lg" className="mb-6" />
            {settings?.footerDescription && (
              <p className="text-clean-aqua/80 text-sm leading-relaxed mb-6">
                {settings.footerDescription}
              </p>
            )}
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center space-x-3 text-sm text-clean-aqua hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{primaryPhone}</span>
              </a>
              <a
                href={`mailto:${primaryEmail}`}
                className="flex items-center space-x-3 text-sm text-clean-aqua hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{primaryEmail}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {settings?.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-profile-blue flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-profile-blue flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings.twitterUrl && (
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-profile-blue flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-profile-blue flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-clean-aqua/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Markets</h3>
            <ul className="space-y-3">
              {marketLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-clean-aqua/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-clean-aqua/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-clean-aqua/60">
            © {currentYear} {brandName}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-clean-aqua/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-clean-aqua/60 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
