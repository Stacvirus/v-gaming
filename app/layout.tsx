import type { Metadata, Viewport } from 'next'
import { Russo_One, Chakra_Petch } from 'next/font/google'
import './globals.css'

const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-russo',
  display: 'swap',
})

const chakraPetch = Chakra_Petch({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-chakra',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'V-GAMING — Yaoundé\'s Ultimate Gaming & Leisure Experience',
  description:
    'V-GAMING est l\'espace de divertissement, sport et détente numéro 1 à Yaoundé. Réalité virtuelle, simulateur auto, billard, baby-foot, ping-pong, piscine, restaurant, bar — tout en un. Situé à Bastos, en face de l\'ANOR.',
  keywords: [
    'V-GAMING',
    'gaming center Yaoundé',
    'gaming Bastos Cameroun',
    'VR Yaoundé',
    'simulateur voiture Yaoundé',
    'billard Yaoundé',
    'piscine Bastos',
    'entertainment Cameroon',
    'restaurant gaming Yaoundé',
    'baby-foot Yaoundé',
    'événements corporate Yaoundé',
    'anniversaire Yaoundé',
    'loisirs Yaoundé',
    'détente Cameroun',
  ],
  authors: [{ name: 'V-GAMING' }],
  openGraph: {
    title: 'V-GAMING — Gaming, Loisirs & Détente à Yaoundé',
    description:
      'Votre destination de divertissement ultime à Bastos, Yaoundé. VR, simulateurs, billard, piscine, restaurant.',
    url: 'https://v-gaming.buyam.cm',
    siteName: 'V-GAMING',
    locale: 'fr_CM',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V-GAMING Yaoundé',
    description: 'Gaming, Leisure, Food & Relaxation in Yaoundé, Cameroon.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${russoOne.variable} ${chakraPetch.variable}`}
    >
      <body className="font-body bg-gaming-dark text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
