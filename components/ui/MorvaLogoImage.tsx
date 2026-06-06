'use client'

import Image from 'next/image'

interface MorvaLogoImageProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  priority?: boolean
  className?: string
}

const sizeMap = {
  sm:  { width: 40,  height: 56  },
  md:  { width: 60,  height: 84  },
  lg:  { width: 80,  height: 112 },
  xl:  { width: 120, height: 168 },
  '2xl': { width: 180, height: 252 },
}

export default function MorvaLogoImage({
  size = 'md',
  priority = false,
  className = '',
}: MorvaLogoImageProps) {
  const dims = sizeMap[size as keyof typeof sizeMap]

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        filter: size === '2xl'
          ? 'drop-shadow(0 0 30px rgba(212,175,55,0.6)) drop-shadow(0 0 60px rgba(212,175,55,0.3)) drop-shadow(0 0 90px rgba(212,175,55,0.15))'
          : size === 'xl'
          ? 'drop-shadow(0 0 20px rgba(212,175,55,0.4)) drop-shadow(0 0 40px rgba(212,175,55,0.2))'
          : 'drop-shadow(0 0 12px rgba(212,175,55,0.3))',
      }}
    >
      <Image
        src="/morva-logo.jpg"
        alt="MORVA Logo"
        width={dims.width}
        height={dims.height}
        priority={priority}
        quality={95}
        className="w-auto h-auto"
      />
    </div>
  )
}
