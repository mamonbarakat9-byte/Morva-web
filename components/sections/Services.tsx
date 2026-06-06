'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'

export default function Services() {
  const { lang }   = useLanguage()
  const services   = translations[lang].services

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const load = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.utils.toArray<HTMLElement>('.svc-card').forEach((card, i) => {
        gsap.set(card, { clipPath: 'inset(100% 0 0 0)', opacity: 0 })
        gsap.to(card, {
          clipPath: 'inset(0% 0 0 0)', opacity: 1,
          duration: 0.9, ease: 'power4.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 82%' },
        })
      })
    }
    load()
  }, [])

  return (
    <section id="services" className="py-28 px-6 bg-morva-dark">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label text-gold text-[11px] uppercase tracking-[0.2em] mb-4">{services.label}</p>
          <h2
            className="section-headline font-cormorant text-white font-light"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
          >
            {services.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.items.map(item => (
            <div
              key={item.num}
              className="svc-card group bg-morva-card border p-10 transition-all duration-300 hover:-translate-y-2"
              style={{ borderColor: 'rgba(212,175,55,0.15)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.5)'
                ;(e.currentTarget as HTMLElement).style.boxShadow  = '0 12px 40px rgba(212,175,55,0.08)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.15)'
                ;(e.currentTarget as HTMLElement).style.boxShadow  = 'none'
              }}
            >
              {/* Number + animated underline */}
              <div className="flex items-start justify-between mb-6">
                <p className="font-cormorant text-gold/35 text-5xl font-light leading-none">{item.num}</p>
                {/* Corner bracket */}
                <div
                  className="w-5 h-5 border-t border-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: 'rgba(212,175,55,0.5)' }}
                />
              </div>

              <h3 className="font-cormorant text-white text-2xl mb-4">{item.title}</h3>
              <p className="text-morva-muted text-sm leading-relaxed">{item.desc}</p>

              {/* Animated expanding line */}
              <div className="mt-8 h-px bg-gold/20 overflow-hidden">
                <div
                  className="h-full bg-gold origin-left transition-all duration-700 ease-out"
                  style={{ transform: 'scaleX(0)' }}
                  ref={el => {
                    if (!el) return
                    const parent = el.closest('.svc-card')
                    if (!parent) return
                    const enter = () => { el.style.transform = 'scaleX(1)' }
                    const leave = () => { el.style.transform = 'scaleX(0)' }
                    parent.addEventListener('mouseenter', enter)
                    parent.addEventListener('mouseleave', leave)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
