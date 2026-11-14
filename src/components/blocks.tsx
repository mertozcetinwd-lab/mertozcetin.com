import { Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { Mark, RoutePulse, useInViewOnce } from "./motion"
import { ArrowUpRight, COMPANY, COMPANY_CONTACT, CtaCornerPluses, FOCUS, GeistMono, GridPlus, LINE, MAILTO, Reveal, SPLIT } from "./primitives"

const isExternal = (to: string) => /^(https?:|mailto:)/.test(to)

/** Router link for paths, plain anchor for external URLs (opens in a new tab). */
export function SmartLink({ to, className, children, ...rest }: { to: string; className?: string; children: React.ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (isExternal(to)) {
    const ext = to.startsWith("http")
    return (
      <a href={to} className={className} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className} {...rest}>
      {children}
    </Link>
  )
}

/** The framed page: left and right borders only, same inset as the company site. */
export function Band({ id, children, className, fade = true }: { id?: string; children: React.ReactNode; className?: string; fade?: boolean }) {
  const [ref, on] = useInViewOnce<HTMLElement>(0.04)
  return (
    <section ref={ref} id={id} className={cn("relative mx-3 border-x bg-[#0A0A0B] sm:mx-6 lg:mx-10", fade && (on ? "co-fade" : "opacity-0"), className)} style={{ borderColor: LINE }}>
      {children}
    </section>
  )
}

/** A bordered row with plus marks on its left and right edges (and on the centre divider on lg+). */
export function Row({ children, className, split = false, top = false }: { children: React.ReactNode; className?: string; split?: boolean; top?: boolean }) {
  return (
    <div className={cn("relative border-b", split && `grid grid-cols-1 ${SPLIT}`, className)} style={{ borderColor: LINE }}>
      <GridPlus edge="left" className="left-0 top-full" />
      <GridPlus edge="right" className="left-full top-full" />
      {top && (
        <>
          <GridPlus edge="left" className="left-0 top-0" />
          <GridPlus edge="right" className="left-full top-0" />
        </>
      )}
      {split && <GridPlus className="left-[46%] top-full hidden lg:block" />}
      {children}
    </div>
  )
}

export function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em] text-[#8D8D95]")}>
      <span className="text-[#7C89FF]">{n}</span> / {children}
    </p>
  )
}

export function H2({ children, wide = false, className }: { children: React.ReactNode; wide?: boolean; className?: string }) {
  return (
    <h2
      className={cn(
        "mt-4 text-[1.7rem] font-medium uppercase leading-[1.05] tracking-[-0.035em] sm:text-[2.1rem] lg:text-[clamp(1.9rem,2.7vw,2.9rem)] lg:leading-[1.03]",
        wide ? "max-w-[24ch]" : "max-w-[18ch]",
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function Lead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mt-4 max-w-[46ch] text-[13.5px] leading-[1.65] text-[#9A9AA3] sm:text-[14.5px] lg:text-[15px]", className)}>{children}</p>
}

export const PAD = "px-4 py-9 sm:px-6 sm:py-11 lg:px-10 lg:py-14"

/** Main button: white on dark, turns blue on hover. */
export function PrimaryLink({ to, children, className, tone = "white" }: { to: string; children: React.ReactNode; className?: string; tone?: "white" | "blue" }) {
  const cls = cn(
    "group relative inline-flex h-11 w-full items-center justify-center gap-2 px-5 text-[13px] font-normal transition-colors duration-150 sm:w-auto",
    tone === "white" ? "bg-white text-black hover:bg-[#0000FF] hover:text-white" : "bg-[#0000FF] text-white hover:bg-white hover:text-black",
    FOCUS,
    className,
  )
  return (
    <SmartLink to={to} className={cls}>
      <CtaCornerPluses tone={tone === "white" ? "accent" : "white"} />
      {children}
      <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
    </SmartLink>
  )
}

export function GhostLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <SmartLink
      to={to}
      className={cn(
        "group relative inline-flex h-11 w-full items-center justify-center bg-[#1B1B1F] px-5 text-[13px] font-normal text-white transition-colors duration-150 hover:bg-[#26262B] sm:w-auto",
        FOCUS,
        className,
      )}
    >
      <CtaCornerPluses />
      {children}
    </SmartLink>
  )
}

/** Inline mono link with the underline that draws in. */
export function TextLink({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <SmartLink
      to={to}
      className={cn(GeistMono.className, "co-ul inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.14em] text-[#7C89FF] hover:text-white", FOCUS, className)}
    >
      {children}
      <ArrowUpRight className="size-3" />
    </SmartLink>
  )
}

/** Page opener for inner pages: label, big headline, lead, and a quiet animated route. */
export function PageHeader({ n, label, title, accent, lead }: { n: string; label: string; title: string; accent: string; lead: string }) {
  return (
    <Band>
      <Row split>
        <div className={cn(PAD, "lg:border-r lg:py-16")} style={{ borderColor: LINE }}>
          <Reveal>
            <Label n={n}>{label}</Label>
            <h1 className="mt-5 max-w-[16ch] text-[2rem] font-medium uppercase leading-[1.03] tracking-[-0.04em] sm:text-[2.6rem] lg:text-[clamp(2.2rem,3.4vw,3.5rem)]">
              {title} <Mark delayMs={500}>{accent}</Mark>
            </h1>
            <Lead>{lead}</Lead>
          </Reveal>
        </div>
        <div className="co-hatch relative hidden min-h-[220px] items-center justify-center lg:flex" aria-hidden>
          <div className="border bg-[#0A0A0B] px-8 py-6" style={{ borderColor: LINE }}>
            <RoutePulse className="h-14 w-[260px]" />
            <p className={cn(GeistMono.className, "mt-1 flex justify-between text-[9px] uppercase tracking-[0.14em] text-[#8D8D95]")}>
              <span>Signal</span>
              <span className="text-[#7C89FF]">Introduction</span>
            </p>
          </div>
        </div>
      </Row>
    </Band>
  )
}

/** Closing band: the loudest block on the page, always pointing at the company. */
export function CtaBand({
  title = "Need an introduction?",
  accent = "Start with Client Optimal.",
  lead = "Client Optimal is my company. We look for who may need a supplier next, work to confirm the need, and make the introduction for a fixed fee, agreed in writing.",
}: {
  title?: string
  accent?: string
  lead?: string
}) {
  return (
    <Band>
      <div className="relative overflow-hidden border-b bg-[#0000FF] text-white" style={{ borderColor: LINE }}>
        <div className="co-hatch-dark pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] lg:block" aria-hidden />
        <div className="relative px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
          <Reveal>
            <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em] text-white/70")}>
              <span className="text-white">Next</span> / Start here
            </p>
            <h2 className="mt-5 max-w-[20ch] text-[2rem] font-medium uppercase leading-[1.02] tracking-[-0.04em] sm:text-[2.8rem] lg:text-[clamp(2.4rem,4vw,4.2rem)]">
              {title} <Mark onDark delayMs={400}>{accent}</Mark>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[13.5px] leading-[1.65] text-white/80 sm:text-[14.5px] lg:text-[15px]">{lead}</p>
            <div className="mt-8 -m-[7px] flex flex-col gap-2.5 p-[7px] sm:flex-row sm:items-center sm:gap-3">
              <PrimaryLink to={COMPANY_CONTACT}>Request an introduction</PrimaryLink>
              <SmartLink
                to={COMPANY}
                className={cn(GeistMono.className, "co-ul inline-flex h-11 items-center justify-center px-2 text-[10.5px] uppercase tracking-[0.14em] text-white/85 hover:text-white", FOCUS)}
              >
                Visit clientoptimal.com
              </SmartLink>
              <SmartLink
                to={MAILTO}
                className={cn(GeistMono.className, "co-ul inline-flex h-11 items-center justify-center px-2 text-[10.5px] uppercase tracking-[0.14em] text-white/85 hover:text-white", FOCUS)}
              >
                Or email me
              </SmartLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Band>
  )
}
