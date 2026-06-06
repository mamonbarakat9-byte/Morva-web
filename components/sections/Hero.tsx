'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'
import GoldParticles from '@/components/ui/GoldParticles'
import GlitchText from '@/components/ui/GlitchText'

/* ── Text-scramble hook ──────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦✧◆'

function useScramble(finalText: string, delay = 3600) {
  const [display, setDisplay] = useState('')
  const frame = useRef(0)
  const iter  = useRef(0)

  useEffect(() => {
    let started = false
    const timeout = setTimeout(() => {
      started = true
      const run = () => {
        setDisplay(
          finalText
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (i < iter.current) return finalText[i]
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        iter.current += 0.4
        if (iter.current < finalText.length + 2) {
          frame.current = requestAnimationFrame(run)
        } else {
          setDisplay(finalText)
        }
      }
      run()
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (started) cancelAnimationFrame(frame.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalText])

  return display
}

/* ── Magnetic button ─────────────────────────────────── */
function MagneticBtn({
  children,
  onClick,
  className,
  style,
}: {
  children: React.ReactNode
  onClick: () => void
  className: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width  / 2)
    const dy = e.clientY - (rect.top  + rect.height / 2)
    el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)'
    el.style.transform  = 'translate(0,0)'
    setTimeout(() => { if (el) el.style.transition = '' }, 400)
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={style}
    >
      {children}
    </button>
  )
}

/* ── Component ───────────────────────────────────────── */
export default function Hero() {
  const { lang } = useLanguage()
  const hero    = translations[lang].hero
  const label   = useScramble(hero.label, 3400)
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const load = async () => {
      const { gsap } = await import('gsap')

      /* Set initial states via GSAP (not CSS) */
      gsap.set('.hero-word', { filter: 'blur(18px)', opacity: 0, y: 30 })
      gsap.set('.hero-sub',  { opacity: 0, y: 20 })
      gsap.set('.hero-cta',  { opacity: 0, scale: 0.9 })

      /* Staggered blur-in for headline lines */
      gsap.to('.hero-word', {
        filter: 'blur(0px)', opacity: 1, y: 0,
        stagger: 0.18, duration: 1.1,
        ease: 'power3.out', delay: 3.5,
      })

      /* Subtitle fade */
      gsap.to('.hero-sub', {
        opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 4.3,
      })

      /* CTA buttons */
      gsap.to('.hero-cta', {
        opacity: 1, scale: 1, duration: 0.7, stagger: 0.15,
        ease: 'back.out(1.4)', delay: 4.8,
      })
    }
    load()
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-morva-black overflow-hidden"
    >
      {/* Subtle flowing gradient background layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-5 gradient-flow-slow"
        aria-hidden
      />

      <GoldParticles />

      {/* Animated radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)',
          animation: 'gradientShift 8s ease-in-out infinite',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Horizontal gold lines — decorative */}
      <div className="absolute inset-x-0 top-1/2 pointer-events-none z-0" aria-hidden>
        <div
          className="h-px mx-8 md:mx-20"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(212,175,55,0.12), transparent)',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Scramble label */}
        <p
          className="text-gold text-[11px] uppercase tracking-[0.25em] mb-10 min-h-[16px] font-dm"
          style={{ opacity: label ? 1 : 0, transition: 'opacity 0.3s' }}
        >
          {label || hero.label}
        </p>

        {/* Headline — each word is a blur-in target */}
        <h1
          className="font-cormorant font-light leading-[1.08] mb-10"
          style={{ fontSize: 'clamp(54px, 9vw, 100px)' }}
        >
          <span className="hero-word block text-white">{hero.headline1}</span>
          <span className="hero-word block">
            <GlitchText
              text={hero.headline2}
              className="text-shimmer font-cormorant font-light"
              intensity="balanced"
            />
          </span>
          <span className="hero-word block text-white">{hero.headline3}</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub text-morva-muted text-base md:text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
          {hero.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <MagneticBtn
            onClick={() => scrollTo('pricing')}
            className="hero-cta px-9 py-4 bg-gold text-morva-black font-bold text-sm tracking-widest transition-colors duration-200 hover:bg-gold-light"
          >
            {hero.cta1}
          </MagneticBtn>
          <MagneticBtn
            onClick={() => scrollTo('contact')}
            className="hero-cta px-9 py-4 border border-gold text-gold text-sm tracking-widest transition-all duration-200 hover:bg-gold/10"
          >
            {hero.cta2}
          </MagneticBtn>
        </div>
      </div>

      {/* Animated scroll caret */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-[1px] overflow-hidden"
          style={{ height: 60, background: 'rgba(212,175,55,0.15)' }}
        >
          <div
            className="w-full bg-gold"
            style={{
              height: '50%',
              animation: 'scanLine 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
