import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISiteSettings extends Document {
  brandName: string
  logoUrl: string
  faviconUrl?: string
  primaryEmail: string
  primaryPhone: string
  alternateEmail?: string
  alternatePhone?: string
  confirmationNeeded: boolean
  whatsappNumber?: string
  whatsappMessage?: string
  address?: string
  businessHours?: string
  facebookUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  instagramUrl?: string
  globalCta: {
    label: string
    url: string
  }
  footerDescription?: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  showPricing: boolean
  enableCheckout: boolean
  createdAt: Date
  updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    brandName: { type: String, required: true, default: 'Profile Environmental Support Services' },
    logoUrl: { type: String, default: '/logo.png' },
    faviconUrl: { type: String },
    primaryEmail: { type: String, required: true, default: 'info@environmentalservices.ca' },
    primaryPhone: { type: String, required: true, default: '1-800-251-0034' },
    alternateEmail: { type: String },
    alternatePhone: { type: String },
    confirmationNeeded: { type: Boolean, default: true },
    whatsappNumber: { type: String },
    whatsappMessage: { type: String, default: 'Hello! I would like to know more about your cleaning services.' },
    address: { type: String },
    businessHours: { type: String },
    facebookUrl: { type: String, default: 'https://www.facebook.com/profile.php?id=100063455592689' },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },
    instagramUrl: { type: String },
    globalCta: {
      label: { type: String, default: 'Request Consultation' },
      url: { type: String, default: '/booking' },
    },
    footerDescription: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    showPricing: { type: Boolean, default: false },
    enableCheckout: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: 'site_settings',
  }
)

// Ensure singleton
SiteSettingsSchema.index({}, { unique: true })

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)

export default SiteSettings
