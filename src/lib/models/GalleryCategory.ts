import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IGalleryCategory extends Document {
  name: string
  slug: string
  description?: string
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const GalleryCategorySchema = new Schema<IGalleryCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
)

GalleryCategorySchema.index({ order: 1, status: 1 })

const GalleryCategory: Model<IGalleryCategory> =
  mongoose.models.GalleryCategory ||
  mongoose.model<IGalleryCategory>('GalleryCategory', GalleryCategorySchema)

export default GalleryCategory
