import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

import {SessionWrapper} from '#/Global/SessionWrapper'
import Header from '#/Global/Header/Header'
import AuthStatus from '#/Global/AuthStatus'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`bg-background text-foreground ${inter.className}`}>
        <SessionWrapper>
          <Header />

          <div className="bg-purple-200 z-50 relative">
            <AuthStatus />
          </div>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
