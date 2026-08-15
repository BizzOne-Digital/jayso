'use client'

import { Phone, MessageCircle, FileText } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface MobileActionBarProps {
  settings: {
    primaryPhone: string
    whatsappNumber?: string
  }
  integrations: {
    jotformCalculatorUrl?: string
  }
}

export default function MobileActionBar({ settings, integrations }: MobileActionBarProps) {
  const whatsappMessage = encodeURIComponent('Hello! I would like to know more about your cleaning services.')
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-xl w-full">
      <div className="grid grid-cols-3 divide-x divide-gray-200 w-full">
        {/* Call */}
        <a
          href={`tel:${settings.primaryPhone}`}
          className="flex flex-col items-center justify-center py-2.5 sm:py-3 hover:bg-gray-50 transition-colors active:bg-gray-100"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-profile-blue mb-1 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs font-medium text-graphite">Call</span>
        </a>

        {/* WhatsApp */}
        {settings.whatsappNumber && (
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2.5 sm:py-3 hover:bg-gray-50 transition-colors active:bg-gray-100"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-profile-blue mb-1 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs font-medium text-graphite">WhatsApp</span>
          </a>
        )}

        {/* Quote/Calculator */}
        <a
          href={integrations.jotformCalculatorUrl || '/booking'}
          className="flex flex-col items-center justify-center py-2.5 sm:py-3 hover:bg-gray-50 transition-colors active:bg-gray-100"
        >
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-profile-blue mb-1 flex-shrink-0" />
          <span className="text-[10px] sm:text-xs font-medium text-graphite">Quote</span>
        </a>
      </div>
    </div>
  )
}
