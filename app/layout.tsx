import type { Metadata } from 'next'
import React from 'react'
import { Roboto } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
const roboto = Roboto({ 
  subsets: ['latin'],
  weight:['100','300','400','500','700','900'],
  variable: '--font-rboto'

})

export const metadata: Metadata = {
  title: 'Burger-App',
  description: 'Order burger from App',
  icons:{
    icon:''
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <ClerkProvider appearance={{
          elements:{
            footerActionLink:'text-primary hover:text-white-100',
            formButtonPrimary:'primary-gradient'
          }
        }} 
       >
        {children}


        </ClerkProvider>
      
        </body>
    </html>
  )
}
