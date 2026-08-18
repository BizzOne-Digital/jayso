import { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for OPROFILE Environmental Support Services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        title="Terms of Service"
        subtitle="Terms and conditions for using our website and services."
        align="center"
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl prose prose-lg text-graphite/80">
          <p>
            By accessing this website and using services from OPROFILE Environmental Support Services,
            you agree to the following terms and conditions.
          </p>
          <h2>Use of Website</h2>
          <p>
            Website content is provided for general information purposes. We reserve the right to update
            content, pricing, and service availability at any time without notice.
          </p>
          <h2>Service Agreements</h2>
          <p>
            Specific cleaning and facility support services are governed by separate service agreements,
            proposals, or contracts agreed upon between OPROFILE and the client.
          </p>
          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, OPROFILE Environmental Support Services shall not be
            liable for indirect, incidental, or consequential damages arising from use of this website.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms may be directed to{' '}
            <a href="mailto:info@environmentalservices.ca">info@environmentalservices.ca</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
