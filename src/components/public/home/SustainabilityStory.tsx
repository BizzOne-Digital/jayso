'use client'

import { motion } from 'framer-motion'
import { Leaf, Droplet, Recycle, Wind } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'Green Certified',
    description: 'Eco-friendly products that protect both people and planet',
  },
  {
    icon: Droplet,
    title: 'Water Conservation',
    description: 'Efficient cleaning methods that minimize water usage',
  },
  {
    icon: Recycle,
    title: 'Waste Reduction',
    description: 'Reusable materials and waste minimization programs',
  },
  {
    icon: Wind,
    title: 'Indoor Air Quality',
    description: 'Low-VOC products for healthier indoor environments',
  },
]

export default function SustainabilityStory() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">Sustainability</p>
            <h2 className="heading-lg mb-6">
              Cleaning That&apos;s Good for Business
              <span className="text-electric-cyan"> and the Planet</span>
            </h2>
            <p className="text-lg text-graphite/80 mb-8 leading-relaxed">
              We believe environmental responsibility and exceptional cleaning go hand-in-hand. 
              Our sustainable practices reduce your facility&apos;s environmental impact while 
              maintaining the highest standards of cleanliness and safety.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-electric-cyan/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-electric-cyan" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-graphite mb-1">{feature.title}</h3>
                    <p className="text-sm text-graphite/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-electric-cyan/20 to-transparent" />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-electric-cyan flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-graphite">100%</div>
                  <div className="text-sm text-graphite/70">Green Certified</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
