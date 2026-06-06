import { useEffect, useRef } from 'react'

/**
 * ── useParallax ───────────────────────────────────────
 * Creates 3D depth effect by moving elements based on mouse position.
 * Use with perspective: 1000px parent.
 */
export function useParallax(strength: number = 10) {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = ref.current
    const container = containerRef.current
    if (!el || !container) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      el.style.transform = `
        perspective(1200px)
        rotateX(${y * strength * 2}deg)
        rotateY(${x * strength * 2}deg)
        translateZ(${strength}px)
      `
    }

    const onMouseLeave = () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      el.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0)'
      setTimeout(() => { if (el) el.style.transition = '' }, 500)
    }

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseleave', onMouseLeave)

    return () => {
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [strength])

  return { ref, containerRef }
}
