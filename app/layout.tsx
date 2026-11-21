import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import WhatsAppButton from '@/components/whatsapp-button'
import ChatbotButton from '@/components/chatbot-button'

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700", "800"]
});

const SITE_URL = 'https://www.credsmadhan.com'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Credsmadhan',
  url: `${SITE_URL}/`,
  description:
    "India's process-driven financial assistance platform — resolving your credit, CIBIL, loan, banking, and insurance issues with transparency and integrity.",
  telephone: '+91 9053903719',
  email: 'support@credsmadhan.com',
  sameAs: ['https://www.instagram.com/credsmadhan/'],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: './',
  },
  title: 'Credsmadhan – Cred Ki Baat, Smadhan Ke Saath',
  description: "India's trusted financial assistance platform for credit analysis, CIBIL rectification, loan stress guidance, banking issue support, and grievance escalation.",
  keywords: 'CIBIL analysis, credit repair, loan guidance, banking complaints, financial advisory, credit score',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'rgexX7jkY-d9XXHOvFypUgztGBSRKMJV-G2VnXoKIw4',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <WhatsAppButton />
        <ChatbotButton />
        <Analytics />
      </body>
    </html>
  )
}