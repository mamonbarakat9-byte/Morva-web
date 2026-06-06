'use client'

import { useEffect, useRef } from 'react'

export function useSoundEffects() {
  const synth = useRef<any>(null)
  const isEnabled = useRef(true)

  useEffect(() => {
    /* Dynamic import to avoid SSR issues */
    const initSynth = async () => {
      const Tone = await import('tone').then(m => m.default)
      synth.current = new Tone.Synth({
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0, release: 0.1 },
      }).toDestination()
    }
    initSynth()
  }, [])

  const playHoverSound = () => {
    if (!isEnabled.current || !synth.current) return
    try {
      synth.current.triggerAttackRelease('C5', '0.05')
    } catch (e) {
      /* silent */
    }
  }

  const playClickSound = () => {
    if (!isEnabled.current || !synth.current) return
    try {
      synth.current.triggerAttackRelease('G5', '0.1')
    } catch (e) {
      /* silent */
    }
  }

  const toggleSound = () => {
    isEnabled.current = !isEnabled.current
    return isEnabled.current
  }

  return {
    playHoverSound,
    playClickSound,
    toggleSound,
    isSoundEnabled: () => isEnabled.current,
  }
}
