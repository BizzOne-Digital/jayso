import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IOffer extends Document {
  title: string
  slug: string
  excerpt: string
  description: string
  imageUrl?: string
  imageAlt?: string
  terms?: string
  eligibility?: string
  relatedMarkets: mongoose.Types.ObjectId[]
  relatedServices: mongoose.Types.ObjectId[]
  ctaLabel?: string
  ctaUrl?: string
  activeFrom?: Date
  activeTo?: Date
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const OfferSchema = new Schema<IOffer>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    imageAlt: { type: String },
    terms: { type: String },
    eligibility: { type: String },
    relatedMarkets: [{ type: Schema.Types.ObjectId, ref: 'Market' }],
    relatedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    ctaLabel: { type: String, default: 'Learn More' },
    ctaUrl: { type: String, default: '/booking' },
    activeFrom: { type: Date },
    activeTo: { type: Date },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  {
    timestamps: true,
  }
)

OfferSchema.index({ slug: 1, status: 1 })
OfferSchema.index({ order: 1 })

const Offer: Model<IOffer> =
  mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema)

export default Offer
