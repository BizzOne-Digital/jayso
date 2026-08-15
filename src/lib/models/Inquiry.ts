import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IInquiry extends Document {
  name: string
  email: string
  phone?: string
  company?: string
  market?: string
  service?: string
  facilitySize?: string
  message: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  status: 'new' | 'read' | 'responded' | 'archived'
  internalNotes?: string
  createdAt: Date
  updatedAt: Date
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    market: { type: String },
    service: { type: String },
    facilitySize: { type: String },
    message: { type: String, required: true },
    source: { type: String },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    status: { type: String, enum: ['new', 'read', 'responded', 'archived'], default: 'new' },
    internalNotes: { type: String },
  },
  {
    timestamps: true,
  }
)

InquirySchema.index({ status: 1, createdAt: -1 })
InquirySchema.index({ email: 1 })

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema)

export default Inquiry
