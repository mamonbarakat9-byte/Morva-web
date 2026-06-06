export type Step = {
  step: number
  type: 'open' | 'options' | 'text' | 'final'
  botMsg: string
  options?: string[]
}

export const keywordMap: Record<string, { en: string; ar: string }> = {
  price: {
    en: 'Our packages start from 149 JOD for a Landing Page, 329 JOD for a Full Website, and 419 JOD for Full Site + Maps. Monthly maintenance starts from 29 JOD.',
    ar: 'تبدأ باقاتنا من 149 دينار لصفحة الهبوط، 329 دينار للموقع الكامل، و419 دينار للموقع مع الخرائط. الصيانة الشهرية تبدأ من 29 دينار.',
  },
  delivery: {
    en: 'Delivery is fast! Landing pages: 1–2 days. Full websites: 3–5 days. Full site + Maps: 4–6 days.',
    ar: 'التسليم سريع! صفحة الهبوط: 1–2 أيام. الموقع الكامل: 3–5 أيام. موقع + خرائط: 4–6 أيام.',
  },
  seo: {
    en: 'Every MORVA project includes SEO optimization — keyword research, on-page SEO, and Google Search Console setup. We optimize for both Arabic and English.',
    ar: 'كل مشروع من مورفا يشمل تحسين SEO — بحث الكلمات المفتاحية، SEO داخلي، وإعداد Google Search Console. نحسّن للعربية والإنجليزية.',
  },
  maintenance: {
    en: 'Monthly maintenance plans start at 29 JOD/month and include updates, security, backups, and performance optimization.',
    ar: 'خطط الصيانة الشهرية تبدأ من 29 دينار/شهر وتشمل التحديثات، الأمان، النسخ الاحتياطية، وتحسين الأداء.',
  },
  arabic: {
    en: 'Yes! All our websites are fully bilingual — Arabic and English. We also optimize for Arabic search queries.',
    ar: 'نعم! جميع مواقعنا ثنائية اللغة بالكامل — عربي وإنجليزي. كما نحسّن لاستعلامات البحث العربية.',
  },
}

export const keywords = {
  price: ['price', 'سعر', 'كم', 'cost', 'pricing', 'تكلفة', 'كم سعر'],
  delivery: ['how long', 'كم يوم', 'delivery', 'تسليم', 'days', 'متى', 'وقت'],
  seo: ['seo', 'محركات بحث', 'google', 'جوجل', 'search'],
  maintenance: ['maintenance', 'صيانة', 'monthly', 'شهري'],
  arabic: ['arabic', 'عربي', 'بالعربي', 'اللغة العربية'],
}

export function detectKeyword(msg: string): string | null {
  const lower = msg.toLowerCase()
  for (const [key, terms] of Object.entries(keywords)) {
    if (terms.some(t => lower.includes(t))) return key
  }
  return null
}

export function isArabic(text: string): boolean {
  return /[؀-ۿ]/.test(text)
}
