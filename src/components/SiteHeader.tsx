import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { SmartLink } from "./blocks"
import { ArrowUpRight, COMPANY, CtaCornerPluses, delay, FOCUS, GeistMono, GridPlus, LINE } from "./primitives"

export const NAV = [
  { label: "ABOUT", to: "/about" },
  { label: "CLIENT OPTIMAL", to: COMPANY }, // 2026-11-19 (Mert): every "Client Optimal" click goes to the real site
  { label: "CASE STUDIES", to: "/case-studies" },
  { label: "CONTACT", to: "/contact" },
] as const

/** Personal mark: an outlined square overlapping a solid accent square, on near-black. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden className={cn("shrink-0 select-none", className)}>
      <rect x="1.5" y="1.5" width="9" height="9" stroke="#fff" strokeWidth="1.6" />
      <rect x="7.5" y="7.5" width="9" height="9" fill="#3B4BFF" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="size-6" />
      <span className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.06em] sm:text-[14px] sm:tracking-[0.08em]">Mert Ozcetin</span>
    </span>
  )
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  return (
    <header className="relative z-40 shrink-0 border-b bg-[#0A0A0B]" style={{ borderColor: LINE }}>
      <GridPlus edge="left" className="left-0 top-full" />
      <GridPlus edge="right" className="left-full top-full" />

      <div className="grid h-14 grid-cols-[1fr_auto] items-center gap-2 px-3 sm:gap-3 sm:px-4 sm:h-16 sm:px-5 md:h-[72px] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
        <Link to="/" className={cn("co-in w-fit min-w-0", FOCUS)} style={delay(60)} aria-label="Mert Ozcetin home">
          <Logo />
        </Link>

        <nav className="co-in hidden h-11 items-center gap-x-7 border px-6 lg:flex xl:gap-x-9 xl:px-8" style={{ borderColor: LINE, ...delay(130) }} aria-label="Primary">
          {NAV.map(({ label, to }) => to.startsWith("http") ? (
            <SmartLink
              key={to}
              to={to}
              className={cn(GeistMono.className, "co-ul whitespace-nowrap text-[11px] font-normal uppercase tracking-[0.18em] text-[#8D8D95] transition-colors hover:text-white", FOCUS)}
            >
              {label}
            </SmartLink>
          ) : (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  GeistMono.className,
                  "co-ul whitespace-nowrap text-[11px] font-normal uppercase tracking-[0.18em] transition-colors",
                  isActive ? "text-[#7C89FF]" : "text-[#8D8D95] hover:text-white",
                  FOCUS,
                )
              }
            >
              {label}
            </NavLink>
          ))}
          <SmartLink
            to={COMPANY}
            className={cn(GeistMono.className, "co-ul hidden items-center gap-1.5 whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-white hover:text-[#7C89FF] xl:inline-flex", FOCUS)}
          >
            clientoptimal.com
            <ArrowUpRight className="size-3" />
          </SmartLink>
        </nav>

        <div className="co-in flex items-center justify-end gap-2" style={delay(200)}>
          <SmartLink
            to={COMPANY}
            className={cn(
              "group relative inline-flex h-9 items-center justify-center gap-1.5 bg-white px-3 text-[11.5px] font-normal text-black transition-colors duration-150 hover:bg-[#0000FF] hover:text-white sm:h-10 sm:gap-2 sm:px-5 sm:text-[13px] md:h-11",
              FOCUS,
            )}
          >
            <CtaCornerPluses />
            <span className="hidden sm:inline">Visit Client Optimal</span>
            <span className="sm:hidden">Client Optimal</span>
            <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
          </SmartLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mz-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn("relative flex size-9 items-center justify-center border bg-[#0A0A0B] text-white transition-colors hover:bg-[#161619] sm:size-10 lg:hidden", FOCUS)}
            style={{ borderColor: LINE }}
          >
            <span className="relative block h-3 w-4" aria-hidden>
              <span className={cn("absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-200", open && "translate-y-[5.5px] rotate-45")} />
              <span className={cn("absolute left-0 top-[5.5px] h-px w-4 bg-current transition-opacity duration-150", open && "opacity-0")} />
              <span className={cn("absolute left-0 top-[11px] h-px w-4 bg-current transition-transform duration-200", open && "-translate-y-[5.5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: blueprint rows that drop under the header */}
      <div
        id="mz-mobile-nav"
        className={cn(
          "grid border-t transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] border-t-0 opacity-0",
        )}
        style={{ borderColor: LINE }}
        aria-hidden={!open}
      >
        <nav className="overflow-hidden" aria-label="Mobile">
          <ul className="divide-y" style={{ borderColor: LINE }}>
            {NAV.map(({ label, to }, i) => (
              <li key={to} style={{ borderColor: LINE }}>
                {to.startsWith("http") ? (
                  <SmartLink
                    to={to}
                    tabIndex={open ? 0 : -1}
                    className={cn(GeistMono.className, "group flex items-center justify-between px-4 py-3.5 text-[11px] uppercase tracking-[0.18em] text-[#8D8D95] transition-colors hover:bg-[#141416] hover:text-[#7C89FF] sm:px-5", FOCUS)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[#7C89FF]/70">{String(i + 1).padStart(2, "0")}</span>
                      {label}
                    </span>
                    <ArrowUpRight className="size-3.5 opacity-40 transition-opacity group-hover:opacity-100" />
                  </SmartLink>
                ) : (
                <NavLink
                  to={to}
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    cn(
                      GeistMono.className,
                      "group flex items-center justify-between px-4 py-3.5 text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[#141416] hover:text-[#7C89FF] sm:px-5",
                      isActive ? "text-[#7C89FF]" : "text-[#8D8D95]",
                      FOCUS,
                    )
                  }
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[#7C89FF]/70">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </span>
                  <ArrowUpRight className="size-3.5 opacity-40 transition-opacity group-hover:opacity-100" />
                </NavLink>
                )}
              </li>
            ))}
            <li style={{ borderColor: LINE }}>
              <SmartLink
                to={COMPANY}
                tabIndex={open ? 0 : -1}
                className={cn(GeistMono.className, "group flex items-center justify-between px-4 py-3.5 text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#141416] hover:text-[#7C89FF] sm:px-5", FOCUS)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-[#7C89FF]/70">04</span>
                  clientoptimal.com
                </span>
                <ArrowUpRight className="size-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
              </SmartLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
