import Link from "next/link"
import { Handshake, Building2, UsersRound, ArrowRight } from "lucide-react"
import SectionHeading from "./section-heading"

const programs = [
  // TODO(client): replace with the approved programme descriptions before launch.
  { icon: Handshake, title: "Associate", text: "Work with Credsmadhan as an associate and help people reach the right financial assistance." },
  { icon: Building2, title: "BOP Partner", text: "Join our BOP partner programme. Our team will explain the role and eligibility." },
  { icon: UsersRound, title: "Special Team Leader", text: "Lead and support associates under our Special Team Leader programme." },
]

export default function PartnersSection() {
  return (
    <section id="partners" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Partner With Us" title="Grow with Credsmadhan">
          Interested in working with us? Send a partner enquiry and our team will share the details and the application process.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-3">
          {programs.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-[#E3EAF6] bg-[#F7F9FC] p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#FEF3D0] flex items-center justify-center mb-4">
                <Icon size={22} className="text-[#B57D00]" />
              </div>
              <h3 className="font-semibold text-lg text-[#0E2454]">{title}</h3>
              <p className="text-sm text-[#4A5568] mt-2 leading-relaxed flex-1">{text}</p>
              <Link href="/contact-us" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B3F8B] hover:text-[#F0A500]">
                Partner enquiry <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
