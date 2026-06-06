'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'

export default function Pricing() {
  const { lang } = useLanguage()
  const pricing  = translations[lang].pricing

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const load = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.set('.pricing-card', { opacity: 0, y: 70, scale: 0.93 })
      gsap.to('.pricing-card', {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.18, duration: 0.9, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '.pricing-section', start: 'top 72%' },
      })

      gsap.set('.addon-card', { opacity: 0, y: 40 })
      gsap.to('.addon-card', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.addon-card', start: 'top 85%' },
      })
    }
    load()
  }, [])

  return (
    <section id="pricing" className="py-28 px-6 bg-morva-black pricing-section overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label text-gold text-[11px] uppercase tracking-[0.2em] mb-4">{pricing.label}</p>
          <h2
            className="section-headline font-cormorant text-white font-light"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
          >
            {pricing.headline}
          </h2>
          <p className="text-morva-muted mt-4">{pricing.sub}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-start">
          {pricing.plans.map((plan, pi) => {
            const isBest = !!(plan as any).best
            return (
              <div
                key={pi}
                className={`pricing-card relative flex flex-col border p-8 transition-all duration-300 hover:-translate-y-3 ${isBest ? 'card-best' : ''}`}
                style={{
                  background: '#0f0f0f',
                  borderColor: isBest ? '#D4AF37' : 'rgba(212,175,55,0.2)',
                  transform:   isBest ? 'scale(1.05)' : 'scale(1)',
                  boxShadow:   isBest ? '0 0 40px rgba(212,175,55,0.1)' : 'none',
                }}
              >
                {/* Shimmer strip on best */}
                {isBest && (
                  <div
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, #D4AF37, #E8C874, #D4AF37, transparent)',
                      backgroundSize: '200% auto',
                      animation: 'shimmer 2s linear infinite',
                    }}
                  />
                )}

                {isBest && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-morva-black text-[10px] font-bold px-4 py-1.5 tracking-widest uppercase whitespace-nowrap">
                    {pricing.badge}
                  </div>
                )}

                <p className="text-morva-muted text-[10px] uppercase tracking-widest mb-4">
                  {pricing.delivery} {plan.delivery}
                </p>

                <h3 className="font-cormorant text-white text-3xl mb-6">{plan.name}</h3>

                <div className="mb-7">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-cormorant font-light ${isBest ? 'text-shimmer' : 'text-gold'}`}
                      style={{ fontSize: '54px' }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-morva-muted text-sm">JOD</span>
                  </div>
                  <p className="text-morva-muted text-xs mt-1">
                    {plan.maintenance} JOD / {pricing.maintenance}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm">
                      <svg
                        className="w-4 h-4 text-gold flex-shrink-0 mt-0.5"
                        viewBox="0 0 20 20" fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-morva-muted">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={scrollToContact}
                  className="w-full py-3.5 text-sm font-bold tracking-widest transition-all duration-200"
                  style={{
                    background:  isBest ? '#D4AF37' : 'transparent',
                    color:       isBest ? '#050505' : '#D4AF37',
                    border:      isBest ? 'none'    : '1px solid rgba(212,175,55,0.5)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = isBest ? '#E8C874' : 'rgba(212,175,55,0.1)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = isBest ? '#D4AF37' : 'transparent'
                  }}
                >
                  {pricing.getStarted}
                </button>
              </div>
            )
          })}
        </div>

        {/* Add-on */}
        <div
          className="addon-card border p-8 md:flex items-center justify-between gap-8 relative overflow-hidden"
          style={{ borderColor: 'rgba(212,175,55,0.2)', background: '#0f0f0f' }}
        >
          {/* Scan line */}
          <div className="scan-line" />

          <div className="mb-6 md:mb-0">
            <p className="text-gold text-[10px] uppercase tracking-[0.2em] mb-3">{pricing.addOnBadge}</p>
            <h3 className="font-cormorant text-white text-2xl mb-2">{pricing.addOnTitle}</h3>
            <p className="text-morva-muted text-sm leading-relaxed max-w-xl">{pricing.addOnDesc}</p>
          </div>
          <div className="flex-shrink-0 text-center md:text-right">
            <p className="text-gold font-bold text-lg mb-4">{pricing.addOnPrice}</p>
            <button
              onClick={scrollToContact}
              className="px-8 py-3 border border-gold text-gold text-sm font-bold tracking-widest hover:bg-gold/10 transition-colors duration-200 whitespace-nowrap"
            >
              {pricing.addOnCta}
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
