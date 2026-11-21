import type { MetadataRoute } from 'next'
import { services } from './services/data'
import { blogPosts } from '@/lib/blog-posts'

const SITE_URL = 'https://www.credsmadhan.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/know-your-cibil-score', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/about-us', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact-us', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/result', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/fraud-alert', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/hiring', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const published = new Date(post.date)
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: isNaN(published.getTime()) ? now : published,
      changeFrequency: 'monthly',
      priority: 0.6,
    }
  })

  return [...staticPages, ...servicePages, ...blogPages]
}
