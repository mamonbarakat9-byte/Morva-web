'use client'

import { useEffect, useState } from 'react'
import { useSoundEffects } from '@/hooks/useSoundEffects'

export default function SoundToggle() {
  const { toggleSound, isSoundEnabled } = useSoundEffects()
  const [isEnabled, setIsEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    const newState = toggleSound()
    setIsEnabled(newState)
  }

  if (!mounted) return null

  return (
    <button
      onClick={handleToggle}
      className="text-morva-muted hover:text-gold transition-colors"
      title={isEnabled ? 'Sound On' : 'Sound Off'}
      aria-label="Toggle sound effects"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {isEnabled ? (
          /* Speaker ON icon */
          <>
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </>
        ) : (
          /* Speaker OFF icon */
          <>
            <path d="M16.6915026,12.4744748 L21.5544751,7.61150231 C21.8481618,7.31781557 21.8481618,6.86131407 21.5544751,6.56762733 C21.2607884,6.27394059 20.8042869,6.27394059 20.5106002,6.56762733 L15.6476276,11.4305999 L10.7845545,6.56762733 C10.4908678,6.27394059 10.0343663,6.27394059 9.74067963,6.56762733 C9.44699289,6.86131407 9.44699289,7.31781557 9.74067963,7.61150231 L14.6036521,12.4744748 L9.74067963,17.3374473 C9.44699289,17.6311341 9.44699289,18.0876356 9.74067963,18.381503 C10.0343663,18.6751897 10.4908678,18.6751897 10.7845545,18.381503 L15.6476276,13.5185305 L20.5106002,18.381503 C20.8042869,18.6751897 21.2607884,18.6751897 21.5544751,18.381503 C21.8481618,18.0876356 21.8481618,17.6311341 21.5544751,17.3374473 L16.6915026,12.4744748 Z" />
          </>
        )}
      </svg>
    </button>
  )
}
