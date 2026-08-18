import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'light' | 'dark' | 'brand'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const heightMap = {
    sm: 40,
    md: 56,
    lg: 72,
  }

  const height = heightMap[size]

  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="OPROFILE Environmental Support Services"
        width={Math.round(height * 3.6)}
        height={height}
        className="h-auto w-auto max-w-none"
        style={{ height, width: 'auto' }}
        priority
      />
    </Link>
  )
}
