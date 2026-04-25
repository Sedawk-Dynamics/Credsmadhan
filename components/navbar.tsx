"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Solution", href: "/services" },
  { label: "About Us", href: "/about-us" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Contact", href: "/contact-us" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-white/95 backdrop-blur-sm py-3"
        }`}
    >
      {/* Top bar */}
      <div className="bg-[#1B3F8B] text-white text-xs py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-white/80">Specialized Credit & Financial Problem Resolution Platform | Powered by Arthvera LLP</span>
          <div className="flex items-center gap-4">
            <a href="tel:9053903719" className="flex items-center gap-1.5 text-[#F0A500] hover:text-[#F7C04A] transition-colors font-medium">
              <Phone size={12} />
              +91 9053903719
            </a>
            <span className="text-white/50">|</span>
            <a href="mailto:support@credsmadhan.com" className="text-white/80 hover:text-white transition-colors">
              support@credsmadhan.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/credsmadhan-horizontal-logo.png"
            alt="Credsmadhan Logo"
            width={320}
            height={100}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#1B3F8B] hover:text-[#F0A500] transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/know-your-cibil-score"
            className="px-5 py-2.5 rounded-lg bg-[#F0A500] text-[#1B3F8B] text-sm font-bold hover:bg-[#F7C04A] transition-all duration-200 shadow-sm hover:shadow-md w-full text-center"
          >
            Know Your CIBIL Score
          </a>
        </div>

        {/* Mobile menu btn */}
        <button
          className="md:hidden text-[#1B3F8B] p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#1B3F8B] hover:text-[#F0A500] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-center px-5 py-2.5 rounded-lg bg-[#F0A500] text-[#1B3F8B] text-sm font-bold"
            onClick={() => setIsOpen(false)}
          >
            Free Consultation
          </a>
        </div>
      )}
    </header>
  )
}
