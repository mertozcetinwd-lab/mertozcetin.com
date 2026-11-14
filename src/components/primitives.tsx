import { useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

export const ACCENT = "#3B4BFF"
export const LINE = "rgba(255, 255, 255, 0.14)"
export const MUTED = "#8D8D95"

export const EMAIL = "mert@mertozcetin.com"
export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Hello Mert")}`
export const COMPANY = "https://clientoptimal.com"
export const COMPANY_CONTACT = "https://clientoptimal.com/contact"
export const LINKEDIN = "https://www.linkedin.com/in/mert-ozcetin/"
export const GITHUB = "https://github.com/mertozcetinwd-lab"

export const GeistMono = {
  className: "font-mono",
  style: { fontFamily: '"Geist Mono Variable", ui-monospace, SFMono-Regular, monospace' },
}

/** Entrance delay for `.co-in` / `.co-fade` / `.co-word`. */
export const delay = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as React.CSSProperties

export const FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#3B4BFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]"

/** Shared column split: centre divider sits at about 46%. */
export const SPLIT = "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"

/** Fade-rise on first scroll into view (sections below the hero). */
export function Reveal({ children, delayMs = 0, className }: { children: React.ReactNode; delayMs?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      setOn(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={cn(on ? "co-in" : "opacity-0", className)} style={delay(delayMs)}>
      {children}
    </div>
  )
}

/** Thin plus mark on grid intersections. Omits wings that have no border to align with. */
type PlusEdge = "left" | "right" | "top" | "bottom"

export function GridPlus({ className, edge, markClassName = "bg-white/30" }: { className?: string; edge?: PlusEdge | PlusEdge[]; markClassName?: string }) {
  const omit = new Set(Array.isArray(edge) ? edge : edge ? [edge] : [])
  return (
    <span aria-hidden className={cn("pointer-events-none absolute z-30 size-[11px] -translate-x-1/2 -translate-y-1/2", className)}>
      {!omit.has("top") && <span className={cn("absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2 rounded-full", markClassName)} />}
      {!omit.has("bottom") && <span className={cn("absolute left-1/2 bottom-0 h-1/2 w-px -translate-x-1/2 rounded-full", markClassName)} />}
      {!omit.has("left") && <span className={cn("absolute top-1/2 left-0 h-px w-1/2 -translate-y-1/2 rounded-full", markClassName)} />}
      {!omit.has("right") && <span className={cn("absolute top-1/2 right-0 h-px w-1/2 -translate-y-1/2 rounded-full", markClassName)} />}
    </span>
  )
}

/** Corner dots on buttons: a small square centred on each corner, shown on hover. */
export function CtaCornerPluses({ tone = "accent" }: { tone?: "accent" | "white" }) {
  const dot = tone === "white" ? "bg-white" : "bg-[#3B4BFF]"
  const corners = ["left-0 top-0", "left-full top-0", "left-0 top-full", "left-full top-full"]
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 z-50">
      {corners.map((pos) => (
        <span
          key={pos}
          className={cn(
            "absolute size-[5px] -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100",
            dot,
            pos,
          )}
        />
      ))}
    </span>
  )
}

export function CheckSquare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className={className}>
      <rect x="0.5" y="0.5" width="11" height="11" stroke="currentColor" />
      <path d="M3.2 6.2 5.1 8l3.7-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  )
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
