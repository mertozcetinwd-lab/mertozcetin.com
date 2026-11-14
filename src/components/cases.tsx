import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "../lib/utils"
import { CountUp } from "./motion"
import { ArrowUpRight, COMPANY, COMPANY_CONTACT, FOCUS, GeistMono, LINE, Reveal } from "./primitives"
import { Mark } from "./motion"
import { SmartLink } from "./blocks"
import type { Case } from "../data/cases"
import docs from "../data/case-docs.json"

type DocBlock = { t: "p" | "li" | "h" | "h3" | "meta"; x?: string; k?: string; v?: string }
type Doc = { title: string; blocks: DocBlock[] }
const DOCS = docs as Record<string, Doc>

/** Text with {{n}} tokens turned into solid boxes (n = width in characters): company names stay covered. */
export function Txt({ s }: { s: string }) {
  return (
    <>
      {s.split(/(\{\{\d+\}\})/).map((part, i) => {
        const m = /^\{\{(\d+)\}\}$/.exec(part)
        return m ? (
          <span key={i} role="img" aria-label="name withheld" className="inline-block h-[0.95em] translate-y-[0.14em] bg-[#3A3A42]" style={{ width: `${m[1]}ch` }} />
        ) : (
          part
        )
      })}
    </>
  )
}

/** "Client Background: text" shows the label in medium weight. */
function Lead({ s }: { s: string }) {
  const m = /^([A-Z0-9][^:.{}]{2,55}):\s+([\s\S]*)$/.exec(s)
  if (!m) return <Txt s={s} />
  return (
    <>
      <span className="font-medium text-white">{m[1]}:</span> <Txt s={m[2]} />
    </>
  )
}

function CaseDocument({ c }: { c: Case }) {
  const doc = DOCS[c.slug]
  if (!doc) return null
  return (
    <div>
      <div className="border-b px-5 py-8 sm:px-8 lg:px-12 lg:py-10" style={{ borderColor: LINE }}>
        <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em] text-[#8D8D95]")}>
          <span className="text-[#7C89FF]">Case study</span> / {c.tag}
        </p>
        <h2 className="mt-4 max-w-[30ch] text-[1.5rem] font-medium uppercase leading-[1.08] tracking-[-0.035em] sm:text-[2rem] lg:text-[2.4rem]">
          <Txt s={doc.title} />
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="border-b px-5 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10" style={{ borderColor: LINE }}>
          <p className={cn(GeistMono.className, "text-[2.6rem] font-normal leading-none tracking-[-0.05em]")}>{c.stat}</p>
          <p className={cn(GeistMono.className, "mt-2 text-[10px] uppercase leading-snug tracking-[0.12em] text-[#8D8D95]")}>{c.statLabel}</p>
          <dl className="mt-7 border-t" style={{ borderColor: LINE }}>
            {c.facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[92px_1fr] gap-3 border-b py-3 lg:grid-cols-1 lg:gap-1" style={{ borderColor: LINE }}>
                <dt className={cn(GeistMono.className, "pt-0.5 text-[9.5px] uppercase tracking-[0.12em] text-[#8D8D95]")}>{k}</dt>
                <dd className="text-[13px] leading-[1.5] text-[#C4C4CB]">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <article className="px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="max-w-[68ch]">
            {doc.blocks.map((b, n) => {
              switch (b.t) {
                case "meta":
                  return (
                    <p key={n} className="mb-1.5 text-[14px] leading-[1.6] text-[#C4C4CB]">
                      <span className="font-medium text-white">{b.k}:</span> <Txt s={b.v ?? ""} />
                    </p>
                  )
                case "h":
                  return (
                    <h3 key={n} className={cn(GeistMono.className, "mb-5 mt-10 border-t pt-5 text-[11px] font-normal uppercase tracking-[0.16em] text-[#7C89FF] first:mt-0 first:border-t-0 first:pt-0")} style={{ borderColor: LINE }}>
                      <Txt s={b.x ?? ""} />
                    </h3>
                  )
                case "h3":
                  return (
                    <h4 key={n} className="mb-2.5 mt-7 text-[15px] font-medium tracking-[-0.01em] text-white">
                      <Txt s={b.x ?? ""} />
                    </h4>
                  )
                case "li":
                  return (
                    <p key={n} className="relative mb-2.5 pl-5 text-[14px] leading-[1.7] text-[#C4C4CB]">
                      <span className="absolute left-0 top-[0.62em] size-1.5 bg-[#3B4BFF]" aria-hidden />
                      <Lead s={b.x ?? ""} />
                    </p>
                  )
                default:
                  return (
                    <p key={n} className={cn("mb-3.5 text-[14px] leading-[1.7] text-[#C4C4CB]", doc.blocks[n - 1]?.t === "li" && "mt-5")}>
                      <Lead s={b.x ?? ""} />
                    </p>
                  )
              }
            })}
            <p className={cn(GeistMono.className, "mt-12 border-t pt-5 text-[9.5px] uppercase leading-[1.8] tracking-[0.12em] text-[#8D8D95]")} style={{ borderColor: LINE }}>
              NDA-signed, licensed case study. Company names are covered. Results vary and are not a promise of any particular outcome.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

/** The full case study opens over the page and scrolls. */
function CaseModal({ c, onClose }: { c: Case; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`${c.tag} case study`} className="co-fade fixed inset-0 z-[100] overflow-y-auto bg-black/85" onClick={onClose}>
      <div className="co-in relative mx-auto my-3 w-[calc(100%-1.5rem)] max-w-[1100px] border bg-[#0A0A0B] text-white sm:my-8" style={{ borderColor: LINE }} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-[#0A0A0B] px-5 py-3 sm:px-8 lg:px-12" style={{ borderColor: LINE }}>
          <span className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.14em] text-[#8D8D95]")}>
            {c.tag} <span className="text-white/30">/</span> {c.outcome}
          </span>
          <button ref={closeRef} type="button" onClick={onClose} className={cn(GeistMono.className, "border border-white/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-black", FOCUS)}>
            Close
          </button>
        </div>
        <CaseDocument c={c} />
      </div>
    </div>,
    document.body,
  )
}

export function CaseCard({ c, delayMs = 0 }: { c: Case; delayMs?: number }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="co-lift group flex h-full flex-col bg-[#0A0A0B] p-5 sm:p-6 lg:p-8">
      <Reveal delayMs={delayMs} className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <p className={cn(GeistMono.className, "text-[9.5px] uppercase leading-snug tracking-[0.12em] text-[#8D8D95]")}>{c.tag}</p>
          <span className={cn(GeistMono.className, "inline-flex h-6 shrink-0 items-center gap-1.5 border bg-[#111113] px-2 text-[9px] uppercase leading-none tracking-[0.12em] text-[#B4B4BC]")} style={{ borderColor: LINE }}>
            <span className="size-1.5 shrink-0 bg-[#3B4BFF]" aria-hidden />
            <span className="translate-y-[0.5px]">{c.outcome}</span>
          </span>
        </div>
        <p className={cn(GeistMono.className, "mt-6 text-[2.4rem] font-normal leading-none tracking-[-0.05em] sm:text-[2.8rem]")}>
          <CountUp value={c.stat} />
        </p>
        <p className={cn(GeistMono.className, "mt-2 text-[9.5px] uppercase leading-snug tracking-[0.1em] text-[#8D8D95]")}>{c.statLabel}</p>
        <p className="mt-4 text-[13.5px] leading-[1.6] text-[#9A9AA3]">{c.summary}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open the full ${c.tag} case study`}
          className={cn(GeistMono.className, "co-ul mt-auto inline-flex w-fit items-center gap-1.5 pt-7 text-[10.5px] uppercase tracking-[0.14em] text-[#7C89FF] hover:text-white group-hover:[background-size:100%_1px]", FOCUS)}
        >
          Read the full case study
          <ArrowUpRight className="size-3" />
        </button>
      </Reveal>
      {open && <CaseModal c={c} onClose={() => setOpen(false)} />}
    </article>
  )
}

/** Fills the last cell(s) of the grid so no empty slot shows, and points at the company. */
export function TalkCard({ count }: { count: number }) {
  const lg = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"][count % 3]
  const sm = count % 2 === 0 ? "sm:col-span-2" : "sm:col-span-1"
  return (
    <article className={cn("co-lift flex min-h-[320px] flex-col justify-between gap-10 bg-[#0A0A0B] p-5 sm:p-6 lg:p-8", sm, lg)}>
      <Reveal className="flex h-full flex-col justify-between gap-10">
        <p className={cn(GeistMono.className, "text-[9.5px] uppercase tracking-[0.14em] text-[#8D8D95]")}>
          <span className="text-[#7C89FF]">No. {String(count + 1).padStart(2, "0")}</span> / Yours
        </p>
        <div>
          <h3 className="max-w-[16ch] text-[1.9rem] font-medium uppercase leading-[1.02] tracking-[-0.035em] sm:text-[2.2rem]">
            Talk to <Mark delayMs={300}>Client Optimal.</Mark>
          </h3>
          <p className="mt-4 max-w-[40ch] text-[13.5px] leading-[1.6] text-[#9A9AA3]">
            Tell the company what you sell or what you are looking for: customers, a supplier or a partner. We reply by email with whether we see a relevant opportunity.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <SmartLink to={COMPANY_CONTACT} className={cn("group relative inline-flex h-11 items-center justify-center gap-2 bg-white px-5 text-[13px] text-black transition-colors hover:bg-[#0000FF] hover:text-white", FOCUS)}>
            Request an introduction
            <ArrowUpRight className="size-3.5" />
          </SmartLink>
          <SmartLink to={COMPANY} className={cn(GeistMono.className, "co-ul inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.14em] text-[#7C89FF] hover:text-white", FOCUS)}>
            clientoptimal.com
            <ArrowUpRight className="size-3" />
          </SmartLink>
        </div>
      </Reveal>
    </article>
  )
}
