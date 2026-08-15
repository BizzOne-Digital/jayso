import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IIntegration extends Document {
  jotformCalculatorUrl?: string
  jotformBookingUrl?: string
  jotformEmbedMode: 'iframe' | 'direct'
  whatsappNumber?: string
  whatsappMessageTemplate?: string
  googleAnalyticsId?: string
  facebookPixelId?: string
  enableCheckout: boolean
  stripePublishableKey?: string
  createdAt: Date
  updatedAt: Date
}

const IntegrationSchema = new Schema<IIntegration>(
  {
    jotformCalculatorUrl: { type: String, default: 'https://form.jotform.com/242406303717248' },
    jotformBookingUrl: { type: String, default: 'https://www.jotform.com/242300808333245' },
    jotformEmbedMode: { type: String, enum: ['iframe', 'direct'], default: 'iframe' },
    whatsappNumber: { type: String },
    whatsappMessageTemplate: { 
      type: String, 
      default: 'Hello! I would like to know more about your cleaning services.' 
    },
    googleAnalyticsId: { type: String },
    facebookPixelId: { type: String },
    enableCheckout: { type: Boolean, default: false },
    stripePublishableKey: { type: String },
  },
  {
    timestamps: true,
    collection: 'integrations',
  }
)

const Integration: Model<IIntegration> =
  mongoose.models.Integration || mongoose.model<IIntegration>('Integration', IntegrationSchema)

export default Integration
