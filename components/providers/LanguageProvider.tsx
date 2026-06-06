'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { translations, Lang } from '@/lib/i18n'

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => any
  isTransitioning: boolean
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: () => '',
  isTransitioning: false,
})

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState]           = useState<Lang>('en')
  const [isTransitioning, setTransit]  = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('morva-lang') as Lang | null
    if (saved === 'ar' || saved === 'en') {
      setLangState(saved)
      document.documentElement.dir  = saved === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = saved
    }
  }, [])

  const setLang = useCallback((newLang: Lang) => {
    if (newLang === lang) return

    /* 1 — fade out */
    setTransit(true)

    setTimeout(() => {
      /* 2 — swap language + direction */
      setLangState(newLang)
      localStorage.setItem('morva-lang', newLang)
      document.documentElement.dir  = newLang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = newLang

      /* 3 — fade back in after a tick (let React repaint first) */
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransit(false))
      )
    }, 280)
  }, [lang])

  const t = (key: string) => getNestedValue(translations[lang], key)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
