'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'

export default function Footer() {
  const { lang, setLang } = useLanguage()
  const t = translations[lang]
  const footer = t.footer

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-morva-black border-t pt-16 pb-8 px-6" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Col 1: Brand */}
        <div>
          <p className="font-cormorant text-gold text-3xl tracking-[0.25em] font-semibold mb-3">MORVA</p>
          <p className="text-morva-muted text-sm mb-2">{footer.tagline}</p>
          <p className="text-morva-muted text-xs">{footer.location}</p>
        </div>

        {/* Col 2: Contact */}
        <div>
          <p className="text-white text-xs uppercase tracking-[0.15em] mb-4 text-gold">Contact</p>
          <div className="space-y-3">
            <div>
              <a
                href="https://wa.me/962793600035"
                target="_blank"
                rel="noopener noreferrer"
                className="text-morva-muted text-sm hover:text-gold transition-colors"
              >
                +962 793 600 035
              </a>
            </div>
            <div>
              <a
                href="mailto:morvaweb@gmail.com"
                className="text-morva-muted text-sm hover:text-gold transition-colors"
              >
                morvaweb@gmail.com
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/morva.web"
                target="_blank"
                rel="noopener noreferrer"
                className="text-morva-muted text-sm hover:text-gold transition-colors"
              >
                @morva.web
              </a>
            </div>
          </div>
        </div>

        {/* Col 3: Quick nav */}
        <div>
          <p className="text-xs uppercase tracking-[0.15em] mb-4 text-gold">Quick Links</p>
          <div className="space-y-2">
            {[
              { label: t.nav.services, id: 'services' },
              { label: t.nav.pricing, id: 'pricing' },
              { label: t.nav.portfolio, id: 'portfolio' },
              { label: t.nav.about, id: 'about' },
              { label: t.nav.contact, id: 'contact' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block text-morva-muted text-sm hover:text-gold transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
        <p className="text-morva-muted text-xs">{footer.copyright}</p>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setLang('en')}
            className={lang === 'en' ? 'text-gold' : 'text-morva-muted hover:text-white'}
          >
            EN
          </button>
          <span className="text-morva-muted">|</span>
          <button
            onClick={() => setLang('ar')}
            className={lang === 'ar' ? 'text-gold' : 'text-morva-muted hover:text-white'}
          >
            AR
          </button>
        </div>
      </div>
    </footer>
  )
}
