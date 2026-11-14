import { useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"
import { delay } from "./primitives"

/** True once the element has scrolled into view (stays true). */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
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
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, on] as const
}

/** Counts up to a figure like "13" or "$85K" when it scrolls into view. Only the first number moves. */
export function CountUp({ value, durationMs = 1500, delayMs = 0, className }: { value: string; durationMs?: number; delayMs?: number; className?: string }) {
  const [ref, on] = useInViewOnce<HTMLSpanElement>(0.3)
  const m = /^(\D*)([\d,]+)(.*)$/.exec(value)
  const target = m ? Number(m[2].replace(/,/g, "")) : 0
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!on || !m) {
      setN(target)
      return
    }
    let raf = 0
    const t0 = performance.now() + delayMs
    const tick = (now: number) => {
      const k = Math.min(1, Math.max(0, (now - t0) / durationMs))
      setN(Math.round(target * (1 - Math.pow(1 - k, 4))))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, target, durationMs, delayMs])

  if (!m) return <span className={className}>{value}</span>
  const withCommas = m[2].includes(",") ? n.toLocaleString("en-US") : String(n)
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {m[1]}
      {withCommas}
      {m[3]}
    </span>
  )
}

/** Text with an accent (or white) underline that draws itself once in view. */
export function Mark({ children, delayMs = 0, onDark = false, className }: { children: React.ReactNode; delayMs?: number; onDark?: boolean; className?: string }) {
  const [ref, on] = useInViewOnce<HTMLSpanElement>(0.6)
  return (
    <span
      ref={ref}
      className={cn("co-mk", onDark && "co-mk-w", on && "on", typeof children === "string" && children.length <= 22 && "whitespace-nowrap", className)}
      style={delay(delayMs)}
    >
      {children}
    </span>
  )
}

/** A hairline that draws left to right when in view. */
export function Rule({ className, delayMs = 0 }: { className?: string; delayMs?: number }) {
  const [ref, on] = useInViewOnce<HTMLDivElement>(0.5)
  return <div ref={ref} aria-hidden className={cn("co-rule h-px w-full bg-white/30", on && "on", className)} style={delay(delayMs)} />
}

/** Endless ticker of short labels separated by accent squares. */
export function Ticker({ items, className }: { items: readonly string[]; className?: string }) {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <li key={`${t}-${i}`} className="flex items-center">
          <span className="px-6 sm:px-8">{t}</span>
          <span className="size-1.5 bg-[#3B4BFF]" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={cn("co-marquee-wrap overflow-hidden", className)} role="marquee" aria-label={items.join(", ")}>
      <div className="co-marquee">
        {row}
        {row}
      </div>
    </div>
  )
}

/** Two squares joined by a dashed route, with one small square that travels from signal to introduction. */
export function RoutePulse({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 60" fill="none" aria-hidden className={className}>
      <path d="M36 30 H224" stroke="#3B4BFF" strokeOpacity="0.5" strokeDasharray="3 4" />
      <rect x="16.5" y="20.5" width="19" height="19" stroke="#fff" strokeOpacity="0.8" />
      <rect x="224.5" y="20.5" width="19" height="19" fill="#3B4BFF" className="co-arrive" />
      <rect x="22" y="26" width="8" height="8" fill="#3B4BFF" className="co-packet" />
    </svg>
  )
}
