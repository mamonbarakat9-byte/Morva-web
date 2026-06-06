'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'

/* ── 3-D tilt card ───────────────────────────────────── */
function TiltCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const card = ref.current
    if (!card) return
    const rect  = card.getBoundingClientRect()
    const x     = (e.clientX - rect.left) / rect.width  - 0.5
    const y     = (e.clientY - rect.top)  / rect.height - 0.5
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateZ(10px)`
    card.style.boxShadow = `${-x * 14}px ${y * 14}px 30px rgba(212,175,55,0.12)`
  }

  const handleLeave = () => {
    const card = ref.current
    if (!card) return
    card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease'
    card.style.transform  = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)'
    card.style.boxShadow  = 'none'
    setTimeout(() => { if (card) card.style.transition = '' }, 500)
  }

  return (
    <div
      ref={ref}
      className="card-item mesh-distort bg-morva-card border p-8 will-change-transform"
      style={{ borderColor: 'rgba(212,175,55,0.15)' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Scan line decoration */}
      <div className="relative overflow-hidden h-px mb-6">
        <div className="absolute inset-0 bg-gold/20" />
        <div
          className="absolute h-full w-1/3"
          style={{
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            animation: 'ticker 2s linear infinite',
          }}
        />
      </div>

      <p className="font-cormorant text-gold text-5xl font-light mb-5">{num}</p>
      <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
      <p className="text-morva-muted text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────── */
export default function WhyWebsite() {
  const { lang } = useLanguage()
  const why = translations[lang].why

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const load = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.set('.why-card-item', { opacity: 0, y: 60, scale: 0.95 })
      gsap.to('.why-card-item', {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.14, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-grid', start: 'top 78%' },
      })
    }
    load()
  }, [])

  return (
    <section id="why-website" className="py-28 px-6 bg-morva-dark">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="section-label text-gold text-[11px] uppercase tracking-[0.2em] mb-4">{why.label}</p>
          <h2
            className="section-headline font-cormorant text-white font-light"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
          >
            {why.headline}
          </h2>
        </div>

        {/* Cards */}
        <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {why.cards.map(card => (
            <div key={card.num} className="why-card-item">
              <TiltCard num={card.num} title={card.title} desc={card.desc} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
