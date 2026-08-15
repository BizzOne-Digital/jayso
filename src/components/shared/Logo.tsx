import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'light' | 'dark' | 'brand'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function Logo({ variant = 'light', size = 'md', className = '' }: LogoProps) {
  const sizeMap = {
    sm: { width: 120, height: 40 },
    md: { width: 160, height: 53 },
    lg: { width: 200, height: 67 },
    xl: { width: 320, height: 107 },
  }

  const dimensions = sizeMap[size]

  return (
    <Link href="/" className={`block ${className}`}>
      <div className="relative" style={{ width: dimensions.width, height: dimensions.height }}>
        <Image
          src="/logo.png"
          alt="Profile Environmental Support Services"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </Link>
  )
}
