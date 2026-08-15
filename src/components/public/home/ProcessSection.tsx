'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Users, Sparkles, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Assessment',
    description: 'We evaluate your facility, understand your needs, and identify opportunities.',
  },
  {
    icon: Users,
    title: 'Custom Plan',
    description: 'Develop a tailored cleaning program designed for your specific requirements.',
  },
  {
    icon: Sparkles,
    title: 'Implementation',
    description: 'Deploy trained staff with proper protocols, equipment, and quality standards.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Improvement',
    description: 'Monitor, measure, and refine our service to ensure ongoing excellence.',
  },
]

export default function ProcessSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Our Process</p>
          <h2 className="heading-lg mb-6">How We Work</h2>
          <p className="text-lg text-graphite/80 max-w-2xl mx-auto">
            A consultative approach that delivers results you can see and measure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-profile-blue to-electric-cyan -z-10" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-profile-blue to-electric-cyan flex items-center justify-center">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-warm-amber flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="heading-sm mb-3">{step.title}</h3>
                <p className="text-graphite/70 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
