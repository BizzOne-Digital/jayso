import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IServiceDetailSection {
  _id?: mongoose.Types.ObjectId
  name: string
  heading?: string
  content?: string
  imageUrl?: string
  imageAlt?: string
  order: number
}

export interface IService extends Document {
  title: string
  slug: string
  excerpt: string
  description: string
  icon?: string
  imageUrl?: string
  imageAlt?: string
  heroImageUrl?: string
  challenge?: string
  approach?: string
  scope?: string[]
  benefits?: string[]
  process?: string[]
  relatedMarkets: mongoose.Types.ObjectId[]
  relatedProducts: mongoose.Types.ObjectId[]
  relatedResources: mongoose.Types.ObjectId[]
  relatedFaqs: mongoose.Types.ObjectId[]
  detailSections?: IServiceDetailSection[]
  ctaLabel?: string
  ctaUrl?: string
  metaTitle?: string
  metaDescription?: string
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const ServiceDetailSectionSchema = new Schema<IServiceDetailSection>({
  name: { type: String, required: true },
  heading: { type: String },
  content: { type: String },
  imageUrl: { type: String },
  imageAlt: { type: String },
  order: { type: Number, default: 0 },
})

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String },
    imageUrl: { type: String },
    imageAlt: { type: String },
    heroImageUrl: { type: String },
    challenge: { type: String },
    approach: { type: String },
    scope: [{ type: String }],
    benefits: [{ type: String }],
    process: [{ type: String }],
    relatedMarkets: [{ type: Schema.Types.ObjectId, ref: 'Market' }],
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    relatedResources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }],
    relatedFaqs: [{ type: Schema.Types.ObjectId, ref: 'FAQ' }],
    detailSections: [ServiceDetailSectionSchema],
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

ServiceSchema.index({ slug: 1, status: 1 })
ServiceSchema.index({ order: 1 })

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)

export default Service
