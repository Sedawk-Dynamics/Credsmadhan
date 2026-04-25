'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BreadcrumbNav, type BreadcrumbItem } from './breadcrumb-nav'

interface ServiceHeroProps {
  title: string
  subtitle: string
  description: string
  heroImage: string
  breadcrumbs: BreadcrumbItem[]
  onGetHelpClick?: () => void
}

export function ServiceHero({
  title,
  subtitle,
  description,
  heroImage,
  breadcrumbs,
  onGetHelpClick,
}: ServiceHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="relative w-full">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div>
            <BreadcrumbNav items={breadcrumbs} />

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 text-balance leading-tight"
            >
              {title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-[#FEF3D0] font-semibold mb-8"
            >
              {subtitle}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm border border-white/30 p-4 sm:p-6 rounded-2xl mb-8 sm:mb-10"
            >
              <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed">{description}</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={onGetHelpClick}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#F0A500] text-[#1B3F8B] font-bold rounded-xl text-sm sm:text-base hover:bg-[#F7C04A] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Get Help Now
              </button>
              <a
                href="/services"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 text-white font-semibold rounded-xl text-sm sm:text-base hover:bg-white/30 transition-all duration-200 border border-white/30 hover:border-white/50 text-center"
              >
                View All Services
              </a>
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden md:flex items-center justify-center"
          >
            <div className="relative w-full aspect-square">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F0A500]/30 to-transparent rounded-3xl blur-3xl" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/20 backdrop-blur-sm">
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
