import { useMemo, useState } from "react"
import { Band, CtaBand, PageHeader, Row } from "../components/blocks"
import { CaseCard, TalkCard } from "../components/cases"
import { CountUp, Rule } from "../components/motion"
import { FOCUS, GeistMono, LINE, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"
import { NdaSample } from "../components/NdaSample"
import { CASES, OUTCOME_TYPES, type Case } from "../data/cases"

const FILTERS = ["All", ...OUTCOME_TYPES] as const
const norm = (c: Case) => (c.outcome === "Introductions" ? "Introduction" : c.outcome)

export default function CaseStudies() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")
  const shown = useMemo(() => CASES.filter((c) => filter === "All" || norm(c) === filter), [filter])

  return (
    <>
      <PageHeader
        n="03"
        label="Case studies"
        title="Documented introductions and"
        accent="outcomes."
        lead="Eight case studies from the introduction method behind Client Optimal, shown as the documents themselves. Company names are covered. Everything else is on the page."
      />

      <Band id="disclosure">
        <Row>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="border-b px-4 py-8 sm:px-6 lg:border-b-0 lg:border-r lg:px-10 lg:py-10" style={{ borderColor: LINE }}>
              <Reveal>
                <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em] text-[#7C89FF]")}>Read this first</p>
                <p className="mt-3 max-w-[56ch] text-[13.5px] leading-[1.65] text-[#9A9AA3]">
                  NDA-signed, licensed case studies. They show how the introduction process performs. They are not a record of my own client work as a student.
                </p>
              </Reveal>
            </div>
            <dl className="grid grid-cols-2 divide-x" style={{ borderColor: LINE }}>
              {[
                { v: "8", l: "Case studies" },
                { v: "5", l: "Outcome types" },
              ].map((s, i) => (
                <div key={s.l} className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8" style={{ borderColor: LINE }}>
                  <dd className={cn(GeistMono.className, "text-[2rem] leading-none tracking-[-0.05em] sm:text-[2.6rem] lg:text-[3rem]")}>
                    <CountUp value={s.v} delayMs={i * 140} />
                  </dd>
                  <Rule className="my-3 max-w-[48px]" delayMs={300 + i * 100} />
                  <dt className={cn(GeistMono.className, "text-[9.5px] uppercase tracking-[0.12em] text-[#8D8D95]")}>{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Row>
      </Band>

      {/* Why names are covered + sample NDA clause (2026-11-15) */}
      <NdaSample dark />

      <Band>
        <Row>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-4 py-4 sm:px-6 lg:px-10" role="group" aria-label="Filter by outcome type">
            <span className={cn(GeistMono.className, "mr-2 text-[9.5px] uppercase tracking-[0.14em] text-[#8D8D95]")}>Show</span>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={cn(GeistMono.className, "border px-3 py-1.5 text-[9.5px] uppercase tracking-[0.12em] transition-colors", filter === f ? "border-white bg-white text-black" : "border-white/15 text-[#B4B4BC] hover:border-white/40", FOCUS)}
              >
                {f}
              </button>
            ))}
          </div>
        </Row>
        <Row>
          <div className="grid grid-cols-1 gap-px bg-white/[0.14] sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((c, i) => (
              <CaseCard key={c.slug} c={c} delayMs={(i % 3) * 80} />
            ))}
            <TalkCard count={shown.length} />
          </div>
        </Row>
      </Band>

      <CtaBand title="Want an introduction in your industry?" accent="Write to us." lead="Tell Client Optimal what you sell or what you need. We reply by email with what is possible." />
    </>
  )
}
