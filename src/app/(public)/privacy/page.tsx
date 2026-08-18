import { Metadata } from 'next'
import PageHero from '@/components/public/PageHero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for OPROFILE Environmental Support Services.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        image="/hero-bg.png"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
        align="center"
      />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl prose prose-lg text-graphite/80">
          <p>
            OPROFILE Environmental Support Services respects your privacy. This policy describes how we
            collect and use personal information when you visit our website or request our services.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect contact details such as your name, email address, phone number, company name,
            and facility information when you submit forms on our website or contact us directly.
          </p>
          <h2>How We Use Information</h2>
          <p>
            We use your information to respond to inquiries, provide quotes, deliver services, improve
            our website, and communicate with you about our offerings.
          </p>
          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with service providers who
            assist our operations, or when required by law.
          </p>
          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact us at{' '}
            <a href="mailto:info@environmentalservices.ca">info@environmentalservices.ca</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
