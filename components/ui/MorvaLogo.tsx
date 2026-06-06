import Image from 'next/image'

interface MorvaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  animated?: boolean
  className?: string
  glow?: 'subtle' | 'normal' | 'strong'
}

const sizeMap = {
  sm: { width: 40, height: 56 },
  md: { width: 60, height: 84 },
  lg: { width: 80, height: 112 },
  xl: { width: 120, height: 168 },
  '2xl': { width: 180, height: 252 },
}

export default function MorvaLogo({
  size = 'md',
  animated = false,
  className = '',
  glow = 'normal',
}: MorvaLogoProps) {
  const dims = sizeMap[size as keyof typeof sizeMap]

  const glowMap = {
    subtle:  'drop-shadow(0 0 8px rgba(212, 175, 55, 0.2))',
    normal:  'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4)) drop-shadow(0 0 40px rgba(212, 175, 55, 0.2))',
    strong:  'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 60px rgba(212, 175, 55, 0.3)) drop-shadow(0 0 90px rgba(212, 175, 55, 0.15))',
  }

  return (
    <div
      className={`inline-flex items-center justify-center ${animated ? 'animate-float' : ''} ${className}`}
      style={{
        filter: glowMap[glow],
      }}
    >
      <svg
        width={dims.width}
        height={dims.height}
        viewBox="0 0 200 280"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="goldGradientLogo"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: '#E8C874', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#B8960C', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glowLogo">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* M Icon */}
        <g id="m-icon" filter="url(#glowLogo)">
          {/* Left vertical */}
          <rect
            x="35"
            y="55"
            width="8"
            height="75"
            fill="url(#goldGradientLogo)"
            stroke="#E8C874"
            strokeWidth="1"
          />
          <rect x="39" y="60" width="2" height="65" fill="#FFD700" opacity="0.3" />

          {/* Left inner lines */}
          <rect
            x="45"
            y="65"
            width="3"
            height="50"
            fill="url(#goldGradientLogo)"
            stroke="#E8C874"
            strokeWidth="0.5"
          />
          <rect
            x="51"
            y="70"
            width="3"
            height="45"
            fill="url(#goldGradientLogo)"
            stroke="#E8C874"
            strokeWidth="0.5"
          />

          {/* Center V */}
          <polygon
            points="75,65 60,95 90,95"
            fill="url(#goldGradientLogo)"
            stroke="#E8C874"
            strokeWidth="1"
          />

          {/* Right inner lines */}
          <rect
            x="106"
            y="70"
            width="3"
            height="45"
            fill="url(#goldGradientLogo)"
            stroke="#E8C874"
            strokeWidth="0.5"
          />
          <rect
            x="112"
            y="65"
            width="3"
            height="50"
            fill="url(#goldGradientLogo)"
            stroke="#E8C874"
            strokeWidth="0.5"
          />

          {/* Right vertical */}
          <rect
            x="157"
            y="55"
            width="8"
            height="75"
            fill="url(#goldGradientLogo)"
            stroke="#E8C874"
            strokeWidth="1"
          />
          <rect x="159" y="60" width="2" height="65" fill="#FFD700" opacity="0.3" />
        </g>

        {/* Text */}
        <text
          x="100"
          y="180"
          fontFamily="Cormorant Garamond, serif"
          fontSize="52"
          fontWeight="300"
          textAnchor="middle"
          fill="url(#goldGradientLogo)"
          letterSpacing="8"
        >
          MORVA
        </text>

        {/* Decorative line + diamond */}
        <line
          x1="45"
          y1="200"
          x2="75"
          y2="200"
          stroke="url(#goldGradientLogo)"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <polygon points="100,205 95,200 100,195 105,200" fill="url(#goldGradientLogo)" />
        <line
          x1="125"
          y1="200"
          x2="155"
          y2="200"
          stroke="url(#goldGradientLogo)"
          strokeWidth="1.5"
          opacity="0.7"
        />
      </svg>
    </div>
  )
}
