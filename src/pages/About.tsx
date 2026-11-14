import { Band, CtaBand, H2, Label, Lead, PAD, PrimaryLink, Row, SmartLink } from "../components/blocks"
import { Mark } from "../components/motion"
import { ArrowUpRight, CheckSquare, COMPANY, EMAIL, GeistMono, LINE, LINKEDIN, MAILTO, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"

const PRINCIPLES = [
  { name: "One person, on the thread", text: "You deal with the person who reads your email, finds the match and writes the introduction." },
  { name: "Confirm first", text: "We work to confirm a need is real, and who decides, before we mention anyone to anyone." },
  { name: "Fixed fee, in writing", text: "The fee per introduction is agreed in writing before any work starts. No retainers, no surprises." },
  { name: "Plain answers", text: "If we cannot help, we say so early. A short, honest no is better than a long maybe." },
]

const STANDARDS = [
  "We introduce only where a supplier's capacity and a buyer's need can be checked.",
  "Every introduction starts with one email, not a pitch deck.",
  "We do not promise a sale, a contract or any particular outcome.",
]

const FACTS = [
  { k: "School", v: "University of Florida" },
  { k: "Degree", v: "B.S. Computer Science" },
  { k: "Year", v: "Third year" },
  { k: "Company", v: "Client Optimal LLC" },
]

function Portrait() {
  return (
    <figure className="w-full max-w-[420px]">
      <div className="border bg-[#111113] p-2" style={{ borderColor: LINE }}>
        <div className="aspect-[4/5] w-full overflow-hidden bg-[#E6E6E8]">
          <img src="/mert.jpg" alt="Mert Ozcetin, founder of Client Optimal" width={1251} height={2000} className="h-full w-full object-cover" style={{ objectPosition: "50% 38%" }} />
        </div>
        <figcaption className={cn(GeistMono.className, "flex items-center justify-between gap-3 px-1 pb-1 pt-3 text-[10px] uppercase tracking-[0.14em]")}>
          <span className="flex items-center gap-2 text-white">
            <span className="size-1.5 bg-[#3B4BFF]" aria-hidden />
            Mert Ozcetin
          </span>
          <span className="text-[#8D8D95]">Founder</span>
        </figcaption>
      </div>
    </figure>
  )
}

export default function About() {
  return (
    <>
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r lg:py-16")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="01">About</Label>
              <h1 className="mt-5 max-w-[16ch] text-[2rem] font-medium uppercase leading-[1.03] tracking-[-0.04em] sm:text-[2.6rem] lg:text-[clamp(2.2rem,3.4vw,3.5rem)]">
                Hi, I&rsquo;m Mert. I <Mark delayMs={500}>build</Mark> things.
              </h1>
              <Lead>
                I&rsquo;m a third-year computer science student at the University of Florida. I build tools and systems with AI, I make videos and write about it, and I run Client Optimal, a company that introduces suppliers to the buyers who need them.
              </Lead>
              <div className="mt-7 -m-[7px] flex flex-col gap-2.5 p-[7px] sm:flex-row sm:items-center sm:gap-3">
                <PrimaryLink to={COMPANY}>Visit Client Optimal</PrimaryLink>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                <a href={MAILTO} className={cn(GeistMono.className, "co-ul inline-block text-[11px] uppercase tracking-[0.14em] text-[#7C89FF] hover:text-white")}>
                  {EMAIL}
                </a>
                <SmartLink to={LINKEDIN} className={cn(GeistMono.className, "co-ul inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#7C89FF] hover:text-white")}>
                  LinkedIn
                  <ArrowUpRight className="size-3" />
                </SmartLink>
              </div>
            </Reveal>
          </div>
          <div className="co-hatch relative flex items-center justify-center px-4 py-9 sm:px-6 lg:px-10 lg:py-14">
            <Reveal delayMs={120} className="flex w-full justify-center">
              <Portrait />
            </Reveal>
          </div>
        </Row>
      </Band>

      {/* At a glance */}
      <Band>
        <Row>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {FACTS.map((f, i) => (
              <div key={f.k} className={cn("px-4 py-6 sm:px-6 lg:px-8 lg:py-8", i % 2 === 0 && "border-r", i < 2 && "border-b lg:border-b-0", i === 1 && "lg:border-r", i === 2 && "lg:border-r")} style={{ borderColor: LINE }}>
                <Reveal delayMs={i * 70}>
                  <dt className={cn(GeistMono.className, "text-[9.5px] uppercase tracking-[0.14em] text-[#7C89FF]")}>{f.k}</dt>
                  <dd className="mt-2 text-[1.05rem] font-medium uppercase leading-[1.15] tracking-[-0.02em]">{f.v}</dd>
                </Reveal>
              </div>
            ))}
          </dl>
        </Row>
      </Band>

      {/* Why */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="02">My story</Label>
              <H2>I like building things that work.</H2>
            </Reveal>
          </div>
          <div className={PAD}>
            <Reveal delayMs={100}>
              <p className="max-w-[52ch] text-[14.5px] leading-[1.75] text-[#C4C4CB]">
                I study computer science at the University of Florida, and I use AI to build the tools I need: research, automation and the systems that run my company. I would rather ship something real than hand in another assignment nobody uses.
              </p>
              <p className="mt-4 max-w-[52ch] text-[14.5px] leading-[1.75] text-[#C4C4CB]">
                That led to Client Optimal. Suppliers often struggle to reach the companies that need them. Buyers often struggle to find a supplier they can trust. Both sides lose time and money to the gap.
              </p>
              <p className="mt-4 max-w-[52ch] text-[14.5px] leading-[1.75] text-[#C4C4CB]">
                Client Optimal exists to close it, one careful introduction at a time. We read public signals to see who may need a supplier next, we work to confirm the need, and we put the two sides in touch for a fixed fee.
              </p>
              <p className="mt-4 max-w-[52ch] text-[14.5px] leading-[1.75] text-[#C4C4CB]">
                I study computer science, so I build the tools that do the reading and the checking myself. That keeps the company small, fast and easy to deal with.
              </p>
            </Reveal>
          </div>
        </Row>
      </Band>

      {/* Principles */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="03">How Client Optimal works</Label>
              <H2>Small on purpose.</H2>
              <Lead>No account managers, no hand-offs. The person who scopes your request is the person who does the work.</Lead>
            </Reveal>
          </div>
          <div className="hidden co-hatch lg:block" aria-hidden />
        </Row>
        <Row>
          <div className="grid grid-cols-1 gap-px bg-white/[0.14] sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <div key={p.name} className="co-lift bg-[#0A0A0B] p-5 sm:p-6 lg:p-8">
                <Reveal delayMs={i * 80}>
                  <p className={cn(GeistMono.className, "text-[10px] tracking-[0.12em] text-[#7C89FF]")}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-[1.05rem] font-medium uppercase leading-[1.15] tracking-[-0.02em]">{p.name}</h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#9A9AA3]">{p.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </Row>
      </Band>

      {/* Standards */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="04">Client Optimal standards</Label>
              <H2>What you can expect.</H2>
            </Reveal>
          </div>
          <div className={PAD}>
            <ul className="space-y-4">
              {STANDARDS.map((s, i) => (
                <li key={s}>
                  <Reveal delayMs={i * 80} className="flex gap-3 text-[14px] leading-[1.65] text-[#C4C4CB]">
                    <CheckSquare className="mt-[0.4em] size-3 shrink-0 text-[#7C89FF]" />
                    <span className="co-li">{s}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
            <p className={cn(GeistMono.className, "mt-8 max-w-[52ch] text-[9.5px] uppercase leading-[1.7] tracking-[0.1em] text-[#6F6F78]")}>
              Client Optimal is an independent company. It is not affiliated with or endorsed by the University of Florida.
            </p>
          </div>
        </Row>
      </Band>

      <CtaBand title="Talk to the person who does the work." accent="Write to us." lead="One email is enough to start. We reply with what is possible and what it would cost." />
    </>
  )
}
