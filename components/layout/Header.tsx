'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'
import MorvaLogoImage from '@/components/ui/MorvaLogoImage'
import SoundToggle from '@/components/ui/SoundToggle'
import { useSoundEffects } from '@/hooks/useSoundEffects'

const navIds = ['services', 'pricing', 'portfolio', 'about', 'contact'] as const

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const { playHoverSound, playClickSound } = useSoundEffects()
  const nav = translations[lang].nav

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navLinks: Array<{ key: keyof typeof nav; id: string }> = [
    { key: 'services', id: 'services' },
    { key: 'pricing', id: 'pricing' },
    { key: 'portfolio', id: 'portfolio' },
    { key: 'about', id: 'about' },
    { key: 'contact', id: 'contact' },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl bg-black/60 ${
        scrolled ? 'border-b border-gold/20' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:opacity-80 transition-opacity"
          title="Back to top"
        >
          <MorvaLogoImage size="sm" />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, id }) => (
            <button
              key={id}
              onClick={() => {
                playClickSound()
                scrollTo(id)
              }}
              onMouseEnter={playHoverSound}
              className="text-morva-muted hover:text-white text-sm tracking-wide transition-colors duration-200"
            >
              {nav[key]}
            </button>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Sound toggle */}
          <SoundToggle />

          {/* Language toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                playClickSound()
                setLang('en')
              }}
              onMouseEnter={playHoverSound}
              className={`text-xs px-2 py-1 transition-colors ${lang === 'en' ? 'text-gold border-b border-gold' : 'text-morva-muted hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-morva-muted text-xs">|</span>
            <button
              onClick={() => {
                playClickSound()
                setLang('ar')
              }}
              onMouseEnter={playHoverSound}
              className={`text-xs px-2 py-1 transition-colors ${lang === 'ar' ? 'text-gold border-b border-gold' : 'text-morva-muted hover:text-white'}`}
            >
              AR
            </button>
          </div>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/morva.web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-morva-muted hover:text-gold transition-colors"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-morva-muted hover:text-white"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                : <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gold/20 bg-morva-dark/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {navLinks.map(({ key, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block w-full text-left text-morva-muted hover:text-white py-2 text-sm tracking-wide"
            >
              {nav[key]}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
