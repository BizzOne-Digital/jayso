import { Suspense } from 'react'
import { connectDB } from '@/lib/db/mongoose'
import SiteSettings from '@/lib/models/SiteSettings'
import Integration from '@/lib/models/Integration'
import Header from '@/components/public/Header'
import Footer from '@/components/public/Footer'
import MobileActionBar from '@/components/public/MobileActionBar'

async function getLayoutData() {
  try {
    await connectDB()
    
    let settings = await SiteSettings.findOne().lean()
    let integrations = await Integration.findOne().lean()

    // Create default settings if none exist
    if (!settings) {
      const newSettings = await SiteSettings.create({
        brandName: 'Profile Environmental Support Services',
        primaryEmail: 'info@environmentalservices.ca',
        primaryPhone: '647-703-2900',
        confirmationNeeded: true,
        whatsappNumber: '6477032900',
        facebookUrl: 'https://www.facebook.com/profile.php?id=100063455592689',
      })
      settings = newSettings.toObject() as any
    }

    // Create default integrations if none exist
    if (!integrations) {
      const newIntegrations = await Integration.create({
        jotformCalculatorUrl: 'https://form.jotform.com/242406303717248',
        jotformBookingUrl: 'https://www.jotform.com/242300808333245',
      })
      integrations = newIntegrations.toObject() as any
    }

    return {
      settings: JSON.parse(JSON.stringify(settings)),
      integrations: JSON.parse(JSON.stringify(integrations)),
    }
  } catch (error) {
    console.error('Error loading layout data:', error)
    // Return default values if database fails
    return {
      settings: {
        brandName: 'Profile Environmental Support Services',
        primaryEmail: 'info@environmentalservices.ca',
        primaryPhone: '647-703-2900',
        confirmationNeeded: true,
        whatsappNumber: '6477032900',
        facebookUrl: 'https://www.facebook.com/profile.php?id=100063455592689',
        footerDescription: '',
        logoUrl: '/logo.png',
      },
      integrations: {
        jotformCalculatorUrl: 'https://form.jotform.com/242406303717248',
        jotformBookingUrl: 'https://www.jotform.com/242300808333245',
      },
    }
  }
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { settings, integrations } = await getLayoutData()

  return (
    <>
      <Header settings={settings} integrations={integrations} />
      <main id="main-content" className="min-h-screen bg-white">
        {children}
      </main>
      <MobileActionBar settings={settings} integrations={integrations} />
      <Footer settings={settings} />
    </>
  )
}
