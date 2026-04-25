"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    src: "/images/hero-financial.jpg",
    alt: "Financial advisor helping client with credit analysis",
    title: "Credit & CIBIL Expertise",
    subtitle: "Structured analysis, honest guidance",
  },
  {
    src: "/images/team-consult.jpg",
    alt: "Professional financial consultation session",
    title: "Expert Consultation",
    subtitle: "One-on-one guidance, no false promises",
  },
  {
    src: "/images/banking-support.jpg",
    alt: "Banking support professional on call",
    title: "Banking & Insurance Support",
    subtitle: "Escalation, grievances, dispute resolution",
  },
]

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  // Autoplay every 4 s
  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => emblaApi.scrollNext(), 4000)
    return () => clearInterval(timer)
  }, [emblaApi])

  return (
    <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl group">
      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.src} className="flex-none w-full relative h-[520px]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
                priority={slide.src === slides[0].src}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2454]/80 via-transparent to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-[#F0A500] text-xs font-bold uppercase tracking-widest mb-1">
                      {slide.subtitle}
                    </p>
                    <p className="text-white font-serif text-xl font-bold leading-snug">
                      {slide.title}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-6 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "w-5 h-2 bg-[#F0A500]"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
