import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/src/primitives/theme-provider'


const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta'
})

export const metadata: Metadata = {
  title: 'Flickle for Movies',
  description: 'A fun place for cinema lovers',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body className={`theme-transition scrollbar-hide ${jakartaSans.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          themes={['orange', 'light', 'dark', 'red', 'rose']}
          disableTransitionOnChange
        >

          {children}

        </ThemeProvider>
      </body>
    </html>
  )
}