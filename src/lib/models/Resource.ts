import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IResource extends Document {
  title: string
  slug: string
  description: string
  category: string
  thumbnailUrl?: string
  pdfUrl: string
  fileSize?: number
  isGated: boolean
  relatedServices: mongoose.Types.ObjectId[]
  relatedMarkets: mongoose.Types.ObjectId[]
  relatedProducts: mongoose.Types.ObjectId[]
  downloadCount: number
  metaTitle?: string
  metaDescription?: string
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailUrl: { type: String },
    pdfUrl: { type: String, required: true },
    fileSize: { type: Number },
    isGated: { type: Boolean, default: false },
    relatedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    relatedMarkets: [{ type: Schema.Types.ObjectId, ref: 'Market' }],
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    downloadCount: { type: Number, default: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  {
    timestamps: true,
  }
)

ResourceSchema.index({ slug: 1, status: 1 })
ResourceSchema.index({ category: 1, status: 1 })
ResourceSchema.index({ order: 1 })

const Resource: Model<IResource> =
  mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema)

export default Resource
