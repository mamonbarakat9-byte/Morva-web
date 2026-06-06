'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'

const CARDS = [
  { gradient: 'linear-gradient(135deg,#1a1a0e,#2a2210)', accent: '#D4AF37' },
  { gradient: 'linear-gradient(135deg,#0e1a1a,#102220)', accent: '#8CB4B4' },
  { gradient: 'linear-gradient(135deg,#1a0e1a,#20102a)', accent: '#C4A4D4' },
  { gradient: 'linear-gradient(135deg,#1a1a0e,#302a10)', accent: '#D4AF37' },
  { gradient: 'linear-gradient(135deg,#0e0e1a,#101030)', accent: '#A4B4D4' },
  { gradient: 'linear-gradient(135deg,#1a0e0e,#2a1010)', accent: '#D4A4A4' },
]

export default function Portfolio() {
  const { lang }      = useLanguage()
  const portfolio     = translations[lang].portfolio
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const load = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.set('.port-card', { clipPath: 'inset(0 100% 0 0)', opacity: 0 })
      gsap.to('.port-card', {
        clipPath: 'inset(0 0% 0 0)', opacity: 1,
        stagger: 0.12, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.port-grid', start: 'top 76%' },
      })
    }
    load()
  }, [])

  return (
    <section id="portfolio" className="py-28 px-6 bg-morva-dark">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label text-gold text-[11px] uppercase tracking-[0.2em] mb-4">{portfolio.label}</p>
          <h2
            className="section-headline font-cormorant text-white font-light"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
          >
            {portfolio.headline}
          </h2>
        </div>

        <div className="port-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((card, i) => {
            const isHov = hovered === i
            return (
              <div
                key={i}
                className="port-card group relative aspect-video border cursor-pointer overflow-hidden"
                style={{
                  background: card.gradient,
                  borderColor: isHov ? card.accent : 'rgba(212,175,55,0.15)',
                  transform:   isHov ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s',
                  boxShadow:   isHov ? `0 20px 50px rgba(0,0,0,0.5), 0 0 20px ${card.accent}22` : 'none',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Overlay that slides in from bottom */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-500"
                  style={{
                    background: isHov
                      ? `linear-gradient(to top, ${card.accent}18, transparent)`
                      : 'transparent',
                  }}
                />

                {/* Corner brackets */}
                <div
                  className="absolute top-4 left-4 w-6 h-6 border-t border-l transition-all duration-300"
                  style={{
                    borderColor: card.accent,
                    opacity: isHov ? 1 : 0.35,
                    transform: isHov ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
                <div
                  className="absolute bottom-4 right-4 w-6 h-6 border-b border-r transition-all duration-300"
                  style={{
                    borderColor: card.accent,
                    opacity: isHov ? 1 : 0.35,
                    transform: isHov ? 'scale(1.2)' : 'scale(1)',
                  }}
                />

                {/* Center text — slides up on hover */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-400"
                  style={{ transform: isHov ? 'translateY(-6px)' : 'translateY(0)' }}
                >
                  <div
                    className="h-px mb-4 transition-all duration-400"
                    style={{
                      width: isHov ? 60 : 40,
                      background: card.accent,
                      opacity: 0.6,
                    }}
                  />
                  <p
                    className="font-cormorant text-lg transition-all duration-300"
                    style={{
                      color: isHov ? '#fff' : 'rgba(255,255,255,0.45)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {isHov ? portfolio.hover : portfolio.placeholder}
                  </p>
                  <div
                    className="h-px mt-4 transition-all duration-400"
                    style={{
                      width: isHov ? 60 : 40,
                      background: card.accent,
                      opacity: 0.6,
                    }}
                  />
                </div>

                {/* Index number */}
                <span
                  className="absolute top-4 right-5 font-cormorant text-xs transition-all duration-300"
                  style={{ color: card.accent, opacity: isHov ? 0.8 : 0.3 }}
                >
                  0{i + 1}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
