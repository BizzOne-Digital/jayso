import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IMarket extends Document {
  title: string
  slug: string
  excerpt: string
  description: string
  imageUrl?: string
  imageAlt?: string
  heroImageUrl?: string
  challenges?: string[]
  approach?: string
  solutions?: string[]
  relatedServices: mongoose.Types.ObjectId[]
  relatedOffers: mongoose.Types.ObjectId[]
  relatedResources: mongoose.Types.ObjectId[]
  ctaLabel?: string
  ctaUrl?: string
  metaTitle?: string
  metaDescription?: string
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const MarketSchema = new Schema<IMarket>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    imageAlt: { type: String },
    heroImageUrl: { type: String },
    challenges: [{ type: String }],
    approach: { type: String },
    solutions: [{ type: String }],
    relatedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    relatedOffers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
    relatedResources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
    ctaLabel: { type: String },
    ctaUrl: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  {
    timestamps: true,
  }
)

MarketSchema.index({ slug: 1, status: 1 })
MarketSchema.index({ order: 1 })

const Market: Model<IMarket> =
  mongoose.models.Market || mongoose.model<IMarket>('Market', MarketSchema)

export default Market
