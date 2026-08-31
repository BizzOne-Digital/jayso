import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import AuthProvider from '@/components/providers/AuthProvider'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Profile Environmental Support Services',
    template: '%s | Profile Environmental Support Services',
  },
  description:
    'Commercial cleaning, infection prevention, sustainability and facility support solutions designed around the way your organization works.',
  keywords:
    'commercial cleaning, infection prevention, sustainability, green cleaning, steam cleaning, environmental services, Profile Environmental',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
