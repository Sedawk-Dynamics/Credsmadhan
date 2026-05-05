"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Solution", href: "/services" },
  { label: "Result", href: "/result" },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Hiring", href: "/hiring" },
  { label: "Contact", href: "/contact-us" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-white shadow-md py-1"
            : "bg-white/95 backdrop-blur-sm py-1"
          }`}
      >
        {/* Top Bar */}
        <div className="bg-[#1B3F8B] text-white text-xs py-0.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="text-white/80 truncate">
              Specialized Credit & Financial Problem Resolution Platform
            </span>

            <div className="flex items-center gap-4">
              <a
                href="tel:9053903719"
                className="flex items-center gap-1 text-[#F0A500] hover:text-[#F7C04A]"
              >
                <Phone size={12} />
                +91 9053903719
              </a>

              <a
                href="mailto:support@credsmadhan.com"
                className="hidden lg:block text-white/80 hover:text-white"
              >
                support@credsmadhan.com
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[80px] md:min-h-[90px]">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/credsmadhan-horizontal-logo.png"
              alt="Credsmadhan Logo"
              width={400}
              height={120}
              priority
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#1B3F8B] hover:text-[#F0A500] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Login */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition">
                Login
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <div className="bg-white rounded-lg shadow-lg border py-2 w-44">
                  <a
                    href="https://crm.credsmadhan.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    User Sign In
                  </a>
                  <a
                    href="https://crm.credsmadhan.com/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Admin Login
                  </a>
                </div>
              </div>
            </div>

            {/* CIBIL */}
            <Link
              href="/know-your-cibil-score"
              className="px-4 py-2 rounded-lg bg-[#F0A500] text-[#1B3F8B] text-sm font-bold hover:bg-[#F7C04A]"
            >
              Check CIBIL
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-[#1B3F8B] p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t px-4 py-4 flex flex-col gap-3 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-[#1B3F8B]"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://crm.credsmadhan.com"
              target="_blank"
              className="text-center px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm"
            >
              User Login
            </a>

            <Link
              href="/contact-us"
              className="text-center px-4 py-2 bg-[#F0A500] text-[#1B3F8B] rounded-lg text-sm font-bold"
            >
              Free Consultation
            </Link>
          </div>
        )}
      </header>

      {/* Spacer */}
      {!isHome && <div className="h-8 md:h-10 w-full" />}
    </>
  )
}