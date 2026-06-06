'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    /* Skip on mobile devices */
    if (window.matchMedia('(hover: none)').matches) return

    /* Prefer-reduced-motion check */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top  = `${mouseY}px`
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.1)
      ringY = lerp(ringY, mouseY, 0.1)
      ring.style.left = `${ringX}px`
      ring.style.top  = `${ringY}px`
      rafId = requestAnimationFrame(tick)
    }
    tick()

    /* Hoverable detection */
    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    /* Re-scan when DOM changes (SPA navigation) */
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    addListeners()

    window.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
