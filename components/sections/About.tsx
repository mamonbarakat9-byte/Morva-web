'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'

/* ── Animated counter ────────────────────────────────── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref       = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState('0')
  const animated  = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    /* Extract numeric part */
    const numMatch = value.match(/\d+/)
    const prefix   = value.replace(/[\d–]+.*/, '')
    const suffix   = value.replace(/^[^0-9]*/, '').replace(/\d+/, '')

    if (!numMatch) {
      setDisplay(value)
      return
    }

    const target = parseInt(numMatch[0], 10)

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1400
          const start    = performance.now()

          const tick = (now: number) => {
            const elapsed  = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased    = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
            const current  = Math.round(eased * target)
            setDisplay(`${prefix}${current}${suffix}`)
            if (progress < 1) requestAnimationFrame(tick)
            else setDisplay(value)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return (
    <div
      ref={ref}
      className="bg-morva-card border p-8 text-center group transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: 'rgba(212,175,55,0.18)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.5)'
        ;(e.currentTarget as HTMLElement).style.boxShadow  = '0 0 24px rgba(212,175,55,0.08)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.18)'
        ;(e.currentTarget as HTMLElement).style.boxShadow  = 'none'
      }}
    >
      <p
        className="font-cormorant text-gold font-light transition-all duration-300 group-hover:scale-110"
        style={{ fontSize: 'clamp(32px, 4vw, 52px)', display: 'inline-block' }}
      >
        {display}
      </p>
      <p className="text-morva-muted text-xs uppercase tracking-[0.18em] mt-2">{label}</p>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────── */
export default function About() {
  const { lang } = useLanguage()
  const about    = translations[lang].about
  const lineRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const load = async () => {
      const { gsap }        = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      /* Heading lines clip-path reveal */
      gsap.set('.about-line', { clipPath: 'inset(100% 0 0 0)', opacity: 0 })
      gsap.to('.about-line', {
        clipPath: 'inset(0% 0 0 0)', opacity: 1,
        stagger: 0.22, duration: 1, ease: 'power4.out',
        scrollTrigger: { trigger: '.about-text', start: 'top 78%' },
      })

      /* Body text */
      gsap.set('.about-body', { opacity: 0, y: 24 })
      gsap.to('.about-body', {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-body', start: 'top 82%' },
      })

      /* Expanding gold line */
      const line = lineRef.current
      if (line) {
        ScrollTrigger.create({
          trigger: line,
          start: 'top 88%',
          onEnter: () => { line.style.transform = 'scaleX(1)' },
        })
      }
    }
    load()
  }, [])

  return (
    <section id="about" className="py-28 px-6 bg-morva-black overflow-hidden relative">
      {/* Subtle gradient layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-3 gradient-flow" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* Text */}
        <div className="about-text">
          <p className="section-label text-gold text-[11px] uppercase tracking-[0.2em] mb-5">
            {about.label}
          </p>
          <div className="overflow-hidden mb-2">
            <h2
              className="about-line font-cormorant font-light text-white"
              style={{ fontSize: 'clamp(34px, 5vw, 62px)' }}
            >
              {about.headline1}
            </h2>
          </div>
          <div className="overflow-hidden mb-10">
            <h2
              className="about-line font-cormorant font-light text-gold"
              style={{ fontSize: 'clamp(34px, 5vw, 62px)' }}
            >
              {about.headline2}
            </h2>
          </div>

          <p className="about-body text-morva-muted leading-relaxed text-base">
            {about.body}
          </p>

          {/* Animated expanding line */}
          <div
            ref={lineRef}
            className="mt-10 h-px bg-gold/40 origin-left"
            style={{ transform: 'scaleX(0)', transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s' }}
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-5">
          {about.stats.map((stat, si) => (
            <AnimatedStat key={si} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
