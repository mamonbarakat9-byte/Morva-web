'use client'

const items = [
  'Premium Web Design',
  '✦',
  'SEO Optimized',
  '✦',
  'Mobile First',
  '✦',
  'AI Integration',
  '✦',
  'Jordan Based',
  '✦',
  'Fast Delivery',
  '✦',
  'Luxury Experience',
  '✦',
  'مواقع فاخرة',
  '✦',
  'تسليم سريع',
  '✦',
  'تحسين محركات البحث',
  '✦',
]

export default function MarqueeTicker() {
  const doubled = [...items, ...items]

  return (
    <div
      className="ticker-wrap border-y overflow-hidden py-3"
      style={{ borderColor: 'rgba(212,175,55,0.15)', background: '#080808' }}
    >
      <div className="ticker-inner animate-ticker">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`whitespace-nowrap px-6 text-xs tracking-[0.18em] uppercase ${
              item === '✦' ? 'text-gold' : 'text-morva-muted'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
