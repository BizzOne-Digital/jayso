import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IFAQ extends Document {
  question: string
  answer: string
  category: string
  relatedServices: mongoose.Types.ObjectId[]
  relatedMarkets: mongoose.Types.ObjectId[]
  order: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { type: String, default: 'General' },
    relatedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    relatedMarkets: [{ type: Schema.Types.ObjectId, ref: 'Market' }],
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  {
    timestamps: true,
  }
)

FAQSchema.index({ category: 1, status: 1 })
FAQSchema.index({ order: 1 })

const FAQ: Model<IFAQ> =
  mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema)

export default FAQ
