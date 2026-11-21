import type { ReactNode } from "react"

export default function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  align?: "center" | "left"
}) {
  return (
    <div className={`mb-10 md:mb-12 ${align === "center" ? "text-center mx-auto" : ""} max-w-3xl`}>
      <span className="inline-block px-3 py-1 bg-[#FEF3D0] text-[#9A6B00] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
        {eyebrow}
      </span>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0E2454] text-balance leading-tight">{title}</h2>
      {children && <p className="mt-4 text-[#4A5568] leading-relaxed">{children}</p>}
    </div>
  )
}
