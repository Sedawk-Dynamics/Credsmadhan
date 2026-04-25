import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServiceBySlug } from '../data'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface Props {
  params: Promise<{ service: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params
  const serviceData = getServiceBySlug(service)

  if (!serviceData) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${serviceData.title} | Credsmadhan`,
    description: serviceData.fullDescription,
    keywords: [serviceData.title, 'financial assistance', 'India'],
  }
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  const serviceData = getServiceBySlug(service)

  if (!serviceData) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
