'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { translations } from '@/lib/i18n'

type Field = 'name' | 'email' | 'project' | 'service' | 'description'
type FormData = Record<Field, string>
type Errors   = Partial<Record<Field, string>>

/* ── Floating-label input ────────────────────────────── */
function FloatInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  rows,
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  error?: string
  rows?: number
}) {
  const [focused, setFocused] = useState(false)
  const lifted = focused || value.length > 0

  const shared = {
    value,
    onChange:  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onFocus:   () => setFocused(true),
    onBlur:    () => setFocused(false),
    placeholder: ' ', /* keeps :not(:placeholder-shown) active */
    style: {
      background:  'transparent',
      color:       '#fff',
      fontSize:    '0.875rem',
      width:       '100%',
      outline:     'none',
      paddingTop:  '22px',
      paddingBottom:'8px',
      borderBottom: `1px solid ${focused ? '#D4AF37' : error ? '#ef4444' : 'rgba(212,175,55,0.35)'}`,
      transition:  'border-color 0.3s',
      resize:      'none' as const,
    },
  }

  return (
    <div className="relative">
      {rows ? (
        <textarea {...shared} rows={rows} />
      ) : (
        <input type={type} {...shared} />
      )}

      {/* Floating label */}
      <label
        style={{
          position:    'absolute',
          left:        0,
          top:         lifted ? '2px' : '22px',
          fontSize:    lifted ? '0.62rem' : '0.8rem',
          color:       lifted ? '#D4AF37' : '#A0A0A0',
          letterSpacing: lifted ? '0.12em' : '0',
          textTransform: lifted ? 'uppercase' : 'none',
          pointerEvents: 'none',
          transition:  'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {label}
      </label>

      {error && (
        <p className="text-red-500 text-[11px] mt-1">{error}</p>
      )}
    </div>
  )
}

/* ── Section ─────────────────────────────────────────── */
export default function Contact() {
  const { lang }  = useLanguage()
  const contact   = translations[lang].contact
  const fields    = contact.fields

  const [form, setForm]           = useState<FormData>({ name:'', email:'', project:'', service:'', description:'' })
  const [errors, setErrors]       = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const load = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.set('.contact-field', { opacity: 0, y: 30 })
      gsap.to('.contact-field', {
        opacity: 1, y: 0,
        stagger: 0.1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 80%' },
      })
    }
    load()
  }, [])

  const set = (key: Field) => (v: string) => setForm(p => ({ ...p, [key]: v }))

  const validate = (): boolean => {
    const errs: Errors = {}
    if (!form.name.trim())    errs.name    = 'Required'
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = 'Valid email required'
    if (!form.project.trim()) errs.project = 'Required'
    if (!form.service)        errs.service = 'Required'
    if (!form.description.trim()) errs.description = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const subject = `New Project Request — ${form.project}`
    const body    = `Name: ${form.name}\nEmail: ${form.email}\nProject: ${form.project}\nService: ${form.service}\nDescription: ${form.description}`
    window.location.href = `mailto:morvaweb@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-28 px-6 bg-morva-dark">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-16">
          <p className="section-label text-gold text-[11px] uppercase tracking-[0.2em] mb-4">{contact.label}</p>
          <h2
            className="section-headline font-cormorant text-white font-light"
            style={{ fontSize: 'clamp(34px, 5vw, 56px)' }}
          >
            {contact.headline}
          </h2>
          <p className="text-morva-muted mt-4">{contact.sub}</p>
        </div>

        {submitted ? (
          <div
            className="text-center py-20 px-8 border animate-blurIn"
            style={{ borderColor: 'rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.04)' }}
          >
            {/* Animated checkmark */}
            <svg className="mx-auto mb-6 text-gold" width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M18 28l8 8 12-14"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 40, strokeDashoffset: 0 }}
              />
            </svg>
            <p className="font-cormorant text-white text-2xl mb-2">{fields.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="contact-field">
                <FloatInput label={fields.name}  value={form.name}  onChange={set('name')}  error={errors.name} />
              </div>
              <div className="contact-field">
                <FloatInput label={fields.email} type="email" value={form.email} onChange={set('email')} error={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="contact-field">
                <FloatInput label={fields.project} value={form.project} onChange={set('project')} error={errors.project} />
              </div>
              <div className="contact-field relative">
                {/* Select with floating label */}
                <div style={{ position: 'relative' }}>
                  <select
                    value={form.service}
                    onChange={e => set('service')(e.target.value)}
                    style={{
                      background:   'transparent',
                      color:        form.service ? '#fff' : '#A0A0A0',
                      fontSize:     '0.875rem',
                      width:        '100%',
                      outline:      'none',
                      paddingTop:   '22px',
                      paddingBottom:'8px',
                      borderBottom: `1px solid ${errors.service ? '#ef4444' : 'rgba(212,175,55,0.35)'}`,
                      appearance:   'none',
                    }}
                  >
                    <option value="" disabled>{fields.service}</option>
                    {fields.serviceOptions.map(opt => (
                      <option key={opt} value={opt} style={{ background: '#0f0f0f' }}>{opt}</option>
                    ))}
                  </select>
                  <label
                    style={{
                      position:    'absolute',
                      left: 0, top: form.service ? '2px' : '22px',
                      fontSize:    form.service ? '0.62rem' : '0.8rem',
                      color:       form.service ? '#D4AF37' : '#A0A0A0',
                      letterSpacing: form.service ? '0.12em' : '0',
                      textTransform: form.service ? 'uppercase' : 'none',
                      pointerEvents: 'none',
                      transition:  'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    {fields.service}
                  </label>
                </div>
                {errors.service && <p className="text-red-500 text-[11px] mt-1">{errors.service}</p>}
              </div>
            </div>

            <div className="contact-field">
              <FloatInput
                label={fields.description}
                value={form.description}
                onChange={set('description')}
                error={errors.description}
                rows={4}
              />
            </div>

            <div className="contact-field text-center pt-4">
              <button
                type="submit"
                className="group relative px-12 py-4 bg-gold text-morva-black font-bold text-sm tracking-widest overflow-hidden transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_32px_rgba(212,175,55,0.3)]"
              >
                {/* Shimmer sweep */}
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                />
                <span className="relative">{fields.submit}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
