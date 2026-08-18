'use client'

import { useState } from 'react'
import { Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react'
import Button from '@/components/shared/Button'
import PageHero from '@/components/public/PageHero'

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    market: '',
    service: '',
    facilitySize: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit inquiry')
      }

      setIsSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        market: '',
        service: '',
        facilitySize: '',
        message: '',
      })
    } catch (err) {
      setError('Failed to submit. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-ice py-32">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-20 h-20 bg-electric-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-electric-cyan" />
            </div>
            <h1 className="heading-lg mb-4">Thank You!</h1>
            <p className="text-lg text-graphite/80 mb-8">
              We&apos;ve received your request and will be in touch within 24 hours.
            </p>
            <Button variant="primary" onClick={() => setIsSuccess(false)}>
              Submit Another Request
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        title="Request a Consultation"
        subtitle="Let's discuss how we can help transform your facility with our professional cleaning and environmental support services."
      />

      {/* Contact Methods */}
      <section className="section-padding bg-soft-ice">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <a
              href="tel:1-800-251-0034"
              className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-16 h-16 bg-profile-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-profile-blue transition-colors">
                <Phone className="w-8 h-8 text-profile-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-graphite mb-2">Call Us</h3>
              <p className="text-profile-blue font-medium">1-800-251-0034</p>
            </a>

            <a
              href="mailto:info@environmentalservices.ca"
              className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-16 h-16 bg-profile-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-profile-blue transition-colors">
                <Mail className="w-8 h-8 text-profile-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-graphite mb-2">Email Us</h3>
              <p className="text-profile-blue font-medium text-sm">info@environmentalservices.ca</p>
            </a>

            <a
              href="https://wa.me/18002510034"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow group"
            >
              <div className="w-16 h-16 bg-profile-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-profile-blue transition-colors">
                <MessageCircle className="w-8 h-8 text-profile-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-graphite mb-2">WhatsApp</h3>
              <p className="text-profile-blue font-medium">Message Us</p>
            </a>
          </div>

          {/* Form */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="heading-md mb-8">Send Us a Message</h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-graphite mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profile-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-graphite mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profile-blue focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-graphite mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profile-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-graphite mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profile-blue focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="market" className="block text-sm font-medium text-graphite mb-2">
                    Facility Type
                  </label>
                  <select
                    id="market"
                    name="market"
                    value={formData.market}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profile-blue focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="Office Buildings">Office Buildings</option>
                    <option value="Healthcare Facilities">Healthcare Facilities</option>
                    <option value="Retail & Commercial">Retail & Commercial</option>
                    <option value="Industrial & Warehousing">Industrial & Warehousing</option>
                    <option value="Property Management">Property Management</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Educational Facilities">Educational Facilities</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-graphite mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profile-blue focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="Infection Prevention Control">Infection Prevention Control</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Steam Cleaning">Steam Cleaning</option>
                    <option value="Green Cleaning">Green Cleaning</option>
                    <option value="General Cleaning">General Cleaning</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="facilitySize" className="block text-sm font-medium text-graphite mb-2">
                  Facility Size
                </label>
                <select
                  id="facilitySize"
                  name="facilitySize"
                  value={formData.facilitySize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profile-blue focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="Under 5,000 sq ft">Under 5,000 sq ft</option>
                  <option value="5,000 - 20,000 sq ft">5,000 - 20,000 sq ft</option>
                  <option value="20,000 - 50,000 sq ft">20,000 - 50,000 sq ft</option>
                  <option value="50,000 - 100,000 sq ft">50,000 - 100,000 sq ft</option>
                  <option value="Over 100,000 sq ft">Over 100,000 sq ft</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-graphite mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-profile-blue focus:border-transparent resize-none"
                  placeholder="Tell us about your cleaning needs..."
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </Button>

              <p className="text-sm text-graphite/60 text-center">
                By submitting this form, you agree to our privacy policy and consent to being contacted.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
