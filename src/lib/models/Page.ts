import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IPageSection {
  _id?: mongoose.Types.ObjectId
  name: string
  type: string
  enabled: boolean
  eyebrow?: string
  heading?: string
  content?: string
  ctaLabel?: string
  ctaUrl?: string
  imageUrl?: string
  imageAlt?: string
  layout?: string
  order: number
}

export interface IPage extends Document {
  title: string
  slug: string
  sections: IPageSection[]
  metaTitle?: string
  metaDescription?: string
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const PageSectionSchema = new Schema<IPageSection>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  eyebrow: { type: String },
  heading: { type: String },
  content: { type: String },
  ctaLabel: { type: String },
  ctaUrl: { type: String },
  imageUrl: { type: String },
  imageAlt: { type: String },
  layout: { type: String },
  order: { type: Number, default: 0 },
})

const PageSchema = new Schema<IPage>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    sections: [PageSectionSchema],
    metaTitle: { type: String },
    metaDescription: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  {
    timestamps: true,
  }
)

PageSchema.index({ slug: 1, status: 1 })

const Page: Model<IPage> =
  mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema)

export default Page
