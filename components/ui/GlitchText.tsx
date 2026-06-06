'use client'

interface GlitchTextProps {
  text: string
  className?: string
  intensity?: 'subtle' | 'balanced' | 'strong'
}

export default function GlitchText({ text, className = '', intensity = 'balanced' }: GlitchTextProps) {
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  if (prefersReduced) {
    return <span className={className}>{text}</span>
  }

  const glitchClass = intensity === 'strong' ? 'glitch-text' : 'glitch-text'

  return (
    <span
      className={`${glitchClass} ${className}`}
      data-text={text}
      style={{
        animationDuration: intensity === 'strong' ? '3s' : '4s',
      }}
    >
      {text}
    </span>
  )
}
