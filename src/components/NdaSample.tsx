import { Band, Row } from "./blocks"
import { GeistMono, LINE, Reveal } from "./primitives"
import { cn } from "../lib/utils"

/**
 * Why company names are covered, plus an ILLUSTRATIVE sample of a confidentiality clause.
 * Added 2026-11-15 at Mert's request. The sample is written for this page: it is not one of the signed agreements
 * (those stay private) and it names no real party, so it never implies who signed what with whom.
 * Legal references were checked on 2026-11-15: FTC Endorsement Guides (16 CFR Part 255, revised June 2023), the FTC
 * Consumer Reviews and Testimonials Rule (16 CFR Part 465, in force October 21, 2024), Fla. Stat. 542.335 and ch. 688.
 * The NDA link goes to Cornell's Legal Information Institute (checked 200 on 2026-11-15), a neutral explainer.
 * Keep the "not legal advice" line: this is general information for a visitor, not an opinion.
 */
const CLAUSES: [string, string][] = [
  ["1. Confidential information", "The company names, contacts, prices and deal terms either party shares in connection with an introduction."],
  ["2. Use", "Each party uses confidential information only to evaluate and carry out the introduction, and keeps it private."],
  ["3. Case study", "The results, figures and process may be published as a case study, provided every name and identifying detail is covered."],
  ["4. Term", "These duties continue for ██ years after the introduction."],
  ["5. Governing law", "The laws of the State of ████████."],
]

export function NdaSample({ dark = false }: { dark?: boolean }) {
  const muted = dark ? "text-[#8D8D95]" : "text-[#6E6E6E]"
  const body = dark ? "text-[#9A9AA3]" : "text-[#505050]"
  const accent = dark ? "text-[#7C89FF]" : "text-[#0000FF]"
  const paper = dark ? "bg-[#111114] border-white/15" : "bg-white border-black/15"
  const bar = dark ? "bg-white/85" : "bg-black"
  const Redact = ({ w }: { w: string }) => <span aria-label="redacted" className={cn("inline-block h-[0.9em] translate-y-[0.12em] align-baseline", bar)} style={{ width: w }} />
  return (
    <Band id="nda">
      <Row split>
        <div className="border-b px-4 py-8 sm:px-6 lg:border-b-0 lg:border-r lg:px-10 lg:py-10" style={{ borderColor: LINE }}>
          <Reveal>
            <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em]", muted)}>
              <span className={accent}>Why</span> / names are covered
            </p>
            <h2 className="mt-4 max-w-[20ch] text-[1.4rem] font-medium uppercase leading-[1.05] tracking-[-0.03em] sm:text-[1.7rem]">
              A confidentiality agreement is a normal contract.
            </h2>
            <div className={cn("mt-4 max-w-[60ch] space-y-3 text-[13.5px] leading-[1.65]", body)}>
              <p>
                A{" "}
                <a href="https://www.law.cornell.edu/wex/nondisclosure_agreement" target="_blank" rel="noopener noreferrer" className={cn("underline decoration-1 underline-offset-2", accent)}>
                  non-disclosure agreement (NDA)
                </a>{" "}
                is a contract in which the parties agree to keep certain information private.
                Companies often ask for one because who they work with, what they pay and their deal terms can be confidential
                business information. In Florida, for example, that kind of information can be protected by contract
                (Fla. Stat. § 542.335) and as a trade secret (Fla. Stat. ch. 688).
              </p>
              <p>
                Covering the names keeps that promise. It does not change the results: the figures and the process shown come
                from the documents themselves. US advertising rules (the FTC Endorsement Guides, 16 CFR Part 255, and the
                Consumer Reviews and Testimonials Rule, 16 CFR Part 465) ask that results shown are real and not misleading,
                not that every company is named.
              </p>
              <p>Results vary. These examples are not a promise of any particular outcome.</p>
              <p className={cn("text-[12px]", muted)}>General information, not legal advice.</p>
            </div>
          </Reveal>
        </div>
        <div className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <Reveal delayMs={100}>
            <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em]", muted)}>
              Sample clause / illustrative, not a signed agreement
            </p>
            <figure className={cn("mt-4 border p-5 sm:p-6", paper)}>
              <p className={cn(GeistMono.className, "text-[10.5px] uppercase tracking-[0.14em]")}>Mutual confidentiality agreement</p>
              <p className={cn("mt-3 text-[12.5px] leading-[1.6]", body)}>
                Between <Redact w="7.5em" /> (the “Company”) and <Redact w="6em" /> (the “Introducer”), dated <Redact w="4.5em" />.
              </p>
              <dl className="mt-4 space-y-3">
                {CLAUSES.map(([t, d]) => (
                  <div key={t}>
                    <dt className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.12em]")}>{t}</dt>
                    <dd className={cn("mt-1 text-[12.5px] leading-[1.6]", body)}>{d}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t pt-4" style={{ borderColor: LINE }}>
                {["Company", "Introducer"].map((p) => (
                  <div key={p}>
                    <Redact w="80%" />
                    <p className={cn(GeistMono.className, "mt-2 text-[9.5px] uppercase tracking-[0.12em]", muted)}>Signed, {p}</p>
                  </div>
                ))}
              </div>
            </figure>
            <p className={cn("mt-3 text-[12px] leading-[1.6]", muted)}>
              The signed agreements behind the case studies stay private. This sample shows the kind of terms they contain.
            </p>
          </Reveal>
        </div>
      </Row>
    </Band>
  )
}
