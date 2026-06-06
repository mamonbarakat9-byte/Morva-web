'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import Intro from '@/components/sections/Intro'
import Hero from '@/components/sections/Hero'
import WhyWebsite from '@/components/sections/WhyWebsite'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import WhyMorva from '@/components/sections/WhyMorva'
import Portfolio from '@/components/sections/Portfolio'
import Pricing from '@/components/sections/Pricing'
import Contact from '@/components/sections/Contact'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatBot from '@/components/ui/ChatBot'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import CustomCursor from '@/components/ui/CustomCursor'
import MarqueeTicker from '@/components/ui/MarqueeTicker'

export default function Home() {
  const { isTransitioning } = useLanguage()

  /* Global GSAP: section label + headline reveals (sections handle their own card animations) */
  useEffect(() => {
    const load = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.utils.toArray<HTMLElement>('.section-label').forEach(el => {
        gsap.fromTo(
          el,
          { y: 16, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.65, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 87%' },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('.section-headline').forEach(el => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
            delay: 0.1,
          }
        )
      })

      return () => ScrollTrigger.getAll().forEach((t: any) => t.kill())
    }
    load()
  }, [])

  return (
    <main>
      <CustomCursor />
      <Intro />
      <Header />

      {/* ── Language-transition wrapper ───────────────────
          Fades out then in whenever the language changes.
          This hides the brief DOM-key recreation flash that
          would otherwise expose elements stuck at opacity-0. */}
      <div
        style={{
          opacity:    isTransitioning ? 0 : 1,
          transition: isTransitioning
            ? 'opacity 0.25s ease'          /* fade out — fast */
            : 'opacity 0.35s ease 0.05s',   /* fade in  — slight delay */
          willChange: 'opacity',
        }}
      >
        <Hero />
        <MarqueeTicker />
        <WhyWebsite />
        <About />
        <MarqueeTicker />
        <Services />
        <WhyMorva />
        <Portfolio />
        <Pricing />
        <Contact />
        <Footer />
      </div>

      <ChatBot />
      <WhatsAppButton />
    </main>
  )
}
