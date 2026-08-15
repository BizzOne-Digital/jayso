'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Download, ArrowRight, ShoppingBag } from 'lucide-react'

interface Resource {
  _id: string
  title: string
  slug: string
  description: string
  category: string
}

interface Product {
  _id: string
  title: string
  slug: string
  excerpt: string
}

interface ResourcesPreviewProps {
  resources: Resource[]
  products: Product[]
}

export default function ResourcesPreview({ resources, products }: ResourcesPreviewProps) {
  return (
    <section className="section-padding bg-soft-ice">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Resources */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">Resources</p>
              <h2 className="heading-md mb-6">Cleaning Information & Guides</h2>
              <p className="text-graphite/80 mb-8">
                Download helpful guides, checklists, and resources to support your facility management.
              </p>
            </motion.div>

            <div className="space-y-4 mb-8">
              {resources.slice(0, 3).map((resource, index) => (
                <motion.div
                  key={resource._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/resources/${resource.slug}`}>
                    <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-profile-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-profile-blue transition-colors">
                          <FileText className="w-6 h-6 text-profile-blue group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-graphite mb-1 group-hover:text-profile-blue transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-graphite/70 mb-2 line-clamp-2">
                            {resource.description}
                          </p>
                          <span className="inline-flex items-center text-xs font-medium text-profile-blue">
                            <Download className="w-3 h-3 mr-1" />
                            Download PDF
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/resources"
                className="inline-flex items-center px-6 py-3 border-2 border-electric-cyan text-electric-cyan font-semibold text-sm rounded-lg hover:bg-electric-cyan hover:text-white transition-all"
              >
                View All Resources
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Products */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="eyebrow mb-4">Shop</p>
              <h2 className="heading-md mb-6">Professional Cleaning Products</h2>
              <p className="text-graphite/80 mb-8">
                Access the same professional-grade cleaning products we use in our services.
              </p>
            </motion.div>

            <div className="space-y-4 mb-8">
              {products.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/shop/${product.slug}`}>
                    <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-electric-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-electric-cyan transition-colors">
                          <ShoppingBag className="w-6 h-6 text-electric-cyan group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-graphite mb-1 group-hover:text-electric-cyan transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-sm text-graphite/70 mb-2 line-clamp-2">
                            {product.excerpt}
                          </p>
                          <span className="text-xs font-medium text-electric-cyan">
                            Contact for pricing
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 border-2 border-electric-cyan text-electric-cyan font-semibold text-sm rounded-lg hover:bg-electric-cyan hover:text-white transition-all"
              >
                Browse Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
