"use client"

import { useState, useEffect } from "react"
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/95 backdrop-blur-sm py-3"
        }`}
    >
      {/* Top Bar */}
      <div className="bg-[#1B3F8B] text-white text-xs py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-white/80">
            Specialized Credit & Financial Problem Resolution Platform | Powered by Arthvera LLP
          </span>
          <div className="flex items-center gap-4">
            <a
              href="tel:9053903719"
              className="flex items-center gap-1.5 text-[#F0A500] hover:text-[#F7C04A] transition-colors font-medium"
            >
              <Phone size={12} />
              +91 9053903719
            </a>
            <span className="text-white/50">|</span>
            <a
              href="mailto:support@credsmadhan.com"
              className="text-white/80 hover:text-white transition-colors"
            >
              support@credsmadhan.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/credsmadhan-horizontal-logo.png"
            alt="Credsmadhan Logo"
            width={400}
            height={120}
            priority
            className="h-32 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#1B3F8B] hover:text-[#F0A500] transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Login Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md">
              Login
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 w-48 flex flex-col">
                <a
                  href="https://crm.credsmadhan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 font-medium"
                >
                  User Sign In
                </a>
                <a
                  href="https://crm.credsmadhan.com/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 font-medium"
                >
                  Admin Login
                </a>
              </div>
            </div>
          </div>

          {/* CIBIL Button */}
          <Link
            href="/know-your-cibil-score"
            className="px-5 py-2.5 rounded-lg bg-[#F0A500] text-[#1B3F8B] text-sm font-bold hover:bg-[#F7C04A] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Know Your CIBIL Score
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#1B3F8B] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-[#1B3F8B] hover:text-[#F0A500]"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-2">
            <a
              href="https://crm.credsmadhan.com"
              target="_blank"
              className="text-center px-5 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-bold"
            >
              User Sign In
            </a>

            <a
              href="https://crm.credsmadhan.com/admin"
              target="_blank"
              className="text-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-bold"
            >
              Admin Login
            </a>
          </div>

          <Link
            href="/contact-us"
            className="text-center px-5 py-2.5 rounded-lg bg-[#F0A500] text-[#1B3F8B] text-sm font-bold"
          >
            Free Consultation
          </Link>
        </div>
      )}
    </header>
  )
}