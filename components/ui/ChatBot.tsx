'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { detectKeyword, isArabic, keywordMap } from '@/lib/chatbot-responses'
import { translations } from '@/lib/i18n'

type Message = {
  from: 'bot' | 'user'
  text: string
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()
  const cb = translations[lang].chatbot

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const openChat = () => {
    setOpen(true)
    if (!initialized) {
      setInitialized(true)
      setMessages([{ from: 'bot', text: cb.steps[0].bot }])
    }
  }

  const sendBotMessage = (text: string) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { from: 'bot', text }])
    }, 800)
  }

  const handleUserMessage = (userText: string) => {
    if (!userText.trim()) return
    setMessages(prev => [...prev, { from: 'user', text: userText }])
    setInput('')

    const keyword = detectKeyword(userText)
    const userLang = isArabic(userText) ? 'ar' : lang
    if (keyword && keywordMap[keyword]) {
      sendBotMessage(keywordMap[keyword][userLang])
      return
    }

    const nextStep = step + 1
    if (nextStep < cb.steps.length) {
      setStep(nextStep)
      sendBotMessage(cb.steps[nextStep].bot)
    }
  }

  const handleOption = (option: string) => {
    handleUserMessage(option)
  }

  const currentStepData = cb.steps[step]
  const isFinal = step === cb.steps.length - 1

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => (open ? setOpen(false) : openChat())}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-gold text-morva-black font-bold text-xs tracking-[0.15em] py-6 px-2 rounded-l-xl writing-mode-vertical hover:bg-gold-light transition-colors duration-200"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-label="Open AI Consultant"
      >
        MORVA AI
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed right-0 top-0 h-screen w-[380px] max-w-full z-40 flex flex-col"
          style={{ background: '#0a0a0a', borderLeft: '1px solid rgba(212,175,55,0.2)', animation: 'slideInRight 0.3s ease-out' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gold/20">
            <div>
              <p className="text-gold font-bold tracking-widest text-xs uppercase">{cb.title}</p>
              <p className="text-morva-muted text-xs mt-0.5">{cb.powered}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-morva-muted hover:text-white transition-colors text-xl leading-none">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-xl text-sm whitespace-pre-line ${
                    msg.from === 'user'
                      ? 'bg-gold text-morva-black font-medium'
                      : 'bg-morva-card border-l-2 border-gold text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-morva-card border-l-2 border-gold px-4 py-3 rounded-xl flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-gold animate-dot1 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-gold animate-dot2 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-gold animate-dot3 inline-block" />
                </div>
              </div>
            )}

            {/* Option buttons */}
            {!typing && currentStepData && 'options' in currentStepData && currentStepData.options && (
              <div className="flex flex-wrap gap-2 mt-2">
                {(currentStepData.options as unknown as string[]).map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => handleOption(opt)}
                    className="text-sm px-3 py-1.5 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-morva-black transition-colors duration-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Final WhatsApp button */}
            {isFinal && !typing && (
              <a
                href="https://wa.me/962793600035"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-gold text-morva-black font-bold py-3 px-4 rounded-xl mt-2 hover:bg-gold-light transition-colors duration-200"
              >
                {cb.whatsapp}
              </a>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {!isFinal && (
            <div className="px-4 py-3 border-t border-gold/20 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleUserMessage(input)}
                placeholder={cb.placeholder}
                className="flex-1 bg-morva-card text-white placeholder-morva-muted text-sm px-3 py-2 rounded-lg border border-gold/20 focus:outline-none focus:border-gold/60"
              />
              <button
                onClick={() => handleUserMessage(input)}
                className="bg-gold text-morva-black font-bold text-sm px-4 py-2 rounded-lg hover:bg-gold-light transition-colors duration-200"
              >
                {cb.send}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
