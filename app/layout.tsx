import type { Metadata } from 'next'
import { Racing_Sans_One, Bebas_Neue, Righteous } from 'next/font/google'
import './globals.css'

const racingSansOne = Racing_Sans_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-racing',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
  fallback: ['Impact', 'Arial Black', 'sans-serif'],
})

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-righteous',
  display: 'swap',
  fallback: ['Arial Black', 'Impact', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Triatlón Apronte Jetman - El más picante',
  description: 'Inscríbete al Triatlón Apronte Jetman. 750m natación - 20km ciclismo - 5km running',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${racingSansOne.variable} ${bebasNeue.variable} ${righteous.variable}`}>
      <body>{children}</body>
    </html>
  )
}
