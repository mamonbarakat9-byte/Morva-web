'use client'

import { useEffect, useState } from 'react'
import MorvaLogoImage from '@/components/ui/MorvaLogoImage'

const CHARS = 'MORVA'

export default function Intro() {
  const [visible,  setVisible]  = useState(true)
  const [phase,    setPhase]    = useState(0)
  const [letters,  setLetters]  = useState<string[]>(Array(5).fill(' '))
  const [tagline,  setTagline]  = useState(false)
  const [fadeOut,  setFadeOut]  = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    /* Phase 0 → lines appear */
    const t0 = setTimeout(() => setPhase(1), 200)

    /* Phase 1 → scramble letters into MORVA */
    const t1 = setTimeout(() => {
      let iter = 0
      const total = CHARS.length

      const scramble = () => {
        setLetters(
          CHARS.split('').map((char, i) => {
            if (i < iter) return char
            return String.fromCharCode(65 + Math.floor(Math.random() * 26))
          })
        )
        iter += 0.35
        if (iter < total + 1) {
          requestAnimationFrame(scramble)
        } else {
          setLetters(CHARS.split(''))
          setTimeout(() => setTagline(true), 200)
        }
      }
      scramble()
    }, 700)

    /* Phase 2 → fade out */
    const t2 = setTimeout(() => setFadeOut(true), 2600)
    const t3 = setTimeout(() => {
      document.body.style.overflow = ''
      setVisible(false)
    }, 3500)

    return () => {
      clearTimeout(t0); clearTimeout(t1)
      clearTimeout(t2); clearTimeout(t3)
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-morva-black flex flex-col items-center justify-center"
      style={{
        opacity:    fadeOut ? 0 : 1,
        transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gold origin-left"
        style={{
          transform:  phase >= 1 ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold origin-right"
        style={{
          transform:  phase >= 1 ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
        }}
      />

      {/* Left dot */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gold/60"
        style={{
          opacity:    phase >= 1 ? 1 : 0,
          transition: 'opacity 0.5s ease 0.5s',
        }}
      />
      {/* Right dot */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gold/60"
        style={{
          opacity:    phase >= 1 ? 1 : 0,
          transition: 'opacity 0.5s ease 0.5s',
        }}
      />

      {/* MORVA Logo — Large with backdrop glow */}
      <div
        style={{
          opacity:    phase >= 1 ? 1 : 0,
          transform:  phase >= 1 ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(40px)',
          transition: 'opacity 0.6s ease 0.35s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Backdrop glow circle */}
        <div
          className="absolute inset-0 -m-8"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 50%, transparent 80%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
            pointerEvents: 'none',
          }}
          aria-hidden
        />

        <MorvaLogoImage size="2xl" priority={true} />
      </div>

      {/* Tagline */}
      <p
        className="font-dm text-gold/55 text-xs md:text-sm tracking-[0.3em] uppercase mt-4"
        style={{
          opacity:    tagline ? 1 : 0,
          transform:  tagline ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        Building Digital Landmarks
      </p>

      {/* Progress bar */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 h-[1px] bg-gold/20 overflow-hidden"
        style={{ width: 120 }}
      >
        <div
          className="h-full bg-gold"
          style={{
            transform:  phase >= 1 ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 2.2s cubic-bezier(0.16,1,0.3,1) 0.3s',
          }}
        />
      </div>
    </div>
  )
}
