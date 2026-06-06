'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'

/* Icon SVG map (replace emoji with SVG) */
const ICONS: Record<string, React.ReactNode> = {
  '⚡': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-gold">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  '✦': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-gold">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  ),
  '🔍': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-gold">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  '📱': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-gold">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  '🤖': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-gold">
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <circle cx="9" cy="14" r="1.5" fill="currentColor" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" />
      <path d="M9 18h6" />
    </svg>
  ),
  '📍': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-gold">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
}

export default function WhyMorva() {
  const { lang }  = useLanguage()
  const wm        = translations[lang].whyMorva

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const load = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      /* Set initial state via GSAP (not CSS class) */
      gsap.set('.wm-card', { opacity: 0, y: 50, scale: 0.92 })

      gsap.to('.wm-card', {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.1, duration: 0.75, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '.wm-grid', start: 'top 78%' },
      })
    }
    load()
  }, [])

  return (
    <section id="why-morva" className="py-28 px-6 bg-morva-black">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label text-gold text-[11px] uppercase tracking-[0.2em] mb-4">{wm.label}</p>
          <h2
            className="section-headline font-cormorant text-white font-light"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
          >
            {wm.headline}
          </h2>
        </div>

        <div className="wm-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wm.features.map((feat, i) => (
            <div
              key={i}
              className="wm-card group flex gap-5 items-start p-8 bg-morva-card border transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: 'rgba(212,175,55,0.15)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.4)'
                ;(e.currentTarget as HTMLElement).style.boxShadow  = '0 8px 32px rgba(212,175,55,0.07)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.15)'
                ;(e.currentTarget as HTMLElement).style.boxShadow  = 'none'
              }}
            >
              {/* Animated icon wrapper */}
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-sm border transition-all duration-300 group-hover:scale-110"
                style={{
                  borderColor: 'rgba(212,175,55,0.2)',
                  background: 'rgba(212,175,55,0.05)',
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {ICONS[feat.icon] ?? <span className="text-gold text-xl">{feat.icon}</span>}
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1">{feat.title}</h3>
                <p className="text-morva-muted text-sm">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
