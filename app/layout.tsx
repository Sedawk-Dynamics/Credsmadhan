import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import WhatsAppButton from '@/components/whatsapp-button'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: 'Credsmadhan – Cred Ki Baat, Smadhan Ke Saath',
  description: "India's trusted financial assistance platform for credit analysis, CIBIL rectification, loan stress guidance, banking issue support, and grievance escalation.",
  keywords: 'CIBIL analysis, credit repair, loan guidance, banking complaints, financial advisory, credit score',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}