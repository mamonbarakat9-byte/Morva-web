import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/components/providers/LanguageProvider'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'MORVA — Premium Web Design Agency | Jordan',
  description: 'Luxury websites, landing pages, and e-commerce stores built for ambitious brands in Jordan. Fast delivery, SEO-optimized, mobile-first.',
  keywords: 'web design Jordan, website design Amman, landing page Jordan, e-commerce Jordan, مواقع إلكترونية الأردن',
  openGraph: {
    title: 'MORVA — Premium Web Design Agency',
    description: 'Building Digital Landmarks in Jordan',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-dm bg-morva-black text-white antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
