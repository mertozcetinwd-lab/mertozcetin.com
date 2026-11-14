import { Band, CtaBand, GhostLink, H2, Label, Lead, PAD, PrimaryLink, Row, SmartLink, TextLink } from "../components/blocks"
import { CaseCard } from "../components/cases"
import { Mark, Ticker } from "../components/motion"
import { COMPANY, delay, GeistMono, LINE, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"
import { CASES } from "../data/cases"

const TICKER = ["Mert Ozcetin", "University of Florida", "Computer Science", "Third year", "Builds with AI", "Founder", "Client Optimal", "Introductions", "Fixed fee", "Case studies"]

const FACTS = [
  { k: "School", v: "University of Florida" },
  { k: "Degree", v: "B.S. Computer Science" },
  { k: "Year", v: "Third year" },
  { k: "Company", v: "Client Optimal LLC" },
]

const DOES = [
  { tag: "Study", title: "Computer science at UF", text: "Third-year bachelor's student in Gainesville. Software, systems and how things are built properly." },
  { tag: "Build", title: "Tools that do the work", text: "I use AI to build the tools I need: research, automation and the systems behind my company, written myself." },
  { tag: "Run", title: "Client Optimal", text: "My company. We look for who may need a supplier next, confirm the need, and make the introduction for a fixed fee." },
  { tag: "Share", title: "Learn in public", text: "I make videos and write about building with AI, so what works can be copied by anyone." },
]

const MOVES = [
  { title: "Forecast", text: "Public signals, such as new filings and purchase listings, help spot who may need a supplier next." },
  { title: "Confirm", text: "We reach the buyer first and work to confirm the need, the timing and who decides." },
  { title: "Introduce", text: "Buyer and supplier meet on one email thread, with context. One fixed fee, agreed in writing." },
]

const HEADLINE = ["Hi,", "I’m", "Mert."]
const HEADLINE2 = ["I", "build", "with", "AI."]

function Portrait() {
  return (
    <figure className="w-full max-w-[430px]">
      <div className="border bg-[#111113] p-2" style={{ borderColor: LINE }}>
        <div className="aspect-[4/5] w-full overflow-hidden bg-[#E6E6E8]">
          <img src="/mert.jpg" alt="Mert Ozcetin, founder of Client Optimal" width={1251} height={2000} className="h-full w-full object-cover" style={{ objectPosition: "50% 38%" }} />
        </div>
        <figcaption className={cn(GeistMono.className, "px-1 pb-1 pt-3 text-[10px] uppercase tracking-[0.14em]")}>
          <span className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-white">
              <span className="size-1.5 bg-[#3B4BFF]" aria-hidden />
              Mert Ozcetin
            </span>
            <span className="text-[#8D8D95]">Founder, Client Optimal</span>
          </span>
          <span className="mt-2 flex items-center justify-between gap-3 border-t pt-2 text-[#8D8D95]" style={{ borderColor: LINE }}>
            <span>University of Florida</span>
            <span>B.S. Computer Science, year 3</span>
          </span>
        </figcaption>
      </div>
    </figure>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero: who I am */}
      <Band fade={false}>
        <Row split>
          <div className={cn(PAD, "flex flex-col justify-center lg:border-r lg:py-20")} style={{ borderColor: LINE }}>
            <p className={cn(GeistMono.className, "co-in flex h-4 items-center gap-2 text-[10px] uppercase leading-4 tracking-[0.16em] text-[#8D8D95]")} style={delay(40)}>
              <span className="co-blink size-1.5 bg-[#3B4BFF]" aria-hidden />
              Student / Builder / Founder
            </p>
            <h1 className="mt-6 text-[2.5rem] font-medium uppercase leading-[0.98] tracking-[-0.045em] sm:text-[3.4rem] lg:text-[clamp(2.8rem,4.8vw,5.2rem)]">
              <span className="block">
                {HEADLINE.map((w, i) => (
                  <span key={w + i}>
                    <span className="co-word" style={delay(120 + i * 70)}>
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </span>
              <span className="block">
                {HEADLINE2.map((w, i) => (
                  <span key={w + i}>
                    <span className="co-word" style={delay(420 + i * 70)}>
                      {i === 3 ? <Mark delayMs={1000}>{w}</Mark> : w}
                    </span>{" "}
                  </span>
                ))}
              </span>
            </h1>
            <p className="co-in mt-6 max-w-[48ch] text-[14.5px] leading-[1.65] text-[#9A9AA3] lg:text-[16px]" style={delay(760)}>
              I&rsquo;m a third-year computer science student at the University of Florida. I build tools and systems with AI, and I run Client Optimal, a company that introduces suppliers to the buyers who need them.
            </p>
            <div className="co-in mt-8 -m-[7px] flex flex-col gap-2.5 p-[7px] sm:flex-row sm:items-center sm:gap-3" style={delay(880)}>
              <PrimaryLink to="/client-optimal">Meet Client Optimal</PrimaryLink>
              <GhostLink to="/about">Read my story</GhostLink>
            </div>
            <p className={cn(GeistMono.className, "co-in mt-6 text-[10.5px] uppercase tracking-[0.12em] text-[#8D8D95]")} style={delay(1000)}>
              The company site:{" "}
              <SmartLink to={COMPANY} className="co-ul text-[#7C89FF] hover:text-white">
                clientoptimal.com
              </SmartLink>
            </p>
          </div>
          <div className="co-hatch relative flex items-center justify-center px-4 py-9 sm:px-6 lg:px-10 lg:py-14">
            <div className="co-in flex w-full justify-center" style={delay(300)}>
              <Portrait />
            </div>
          </div>
        </Row>
      </Band>

      <Band>
        <Row>
          <Ticker items={TICKER} className={cn(GeistMono.className, "py-4 text-[10px] uppercase tracking-[0.16em] text-[#8D8D95] sm:py-5 sm:text-[10.5px]")} />
        </Row>
      </Band>

      {/* 01 Who I am */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r lg:py-16")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="01">Who I am</Label>
              <H2 wide>
                A student who <Mark delayMs={350}>builds things</Mark> and starts companies.
              </H2>
              <Lead>I study computer science at the University of Florida, and I use what I learn to build real tools and a real business, not just coursework.</Lead>
              <div className="mt-7">
                <TextLink to="/about">More about me</TextLink>
              </div>
            </Reveal>
          </div>
          <dl className="grid grid-cols-2">
            {FACTS.map((f, i) => (
              <div key={f.k} className={cn("flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8 lg:py-10", i % 2 === 0 && "border-r", i < 2 && "border-b")} style={{ borderColor: LINE }}>
                <Reveal delayMs={i * 80}>
                  <dt className={cn(GeistMono.className, "text-[9.5px] uppercase tracking-[0.14em] text-[#7C89FF]")}>{f.k}</dt>
                  <dd className="mt-2 text-[1.05rem] font-medium uppercase leading-[1.15] tracking-[-0.02em]">{f.v}</dd>
                </Reveal>
              </div>
            ))}
          </dl>
        </Row>
      </Band>

      {/* 02 What I do */}
      <Band>
        <Row>
          <div className="px-4 pt-9 sm:px-6 lg:px-10 lg:pt-12">
            <Reveal>
              <Label n="02">What I do</Label>
              <H2 wide>Four things, one thread.</H2>
            </Reveal>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-px border-t bg-white/[0.14] sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: LINE }}>
            {DOES.map((d, i) => (
              <div key={d.tag} className="co-lift bg-[#0A0A0B] p-5 sm:p-6 lg:p-8">
                <Reveal delayMs={i * 80}>
                  <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.14em] text-[#7C89FF]")}>
                    {String(i + 1).padStart(2, "0")} / {d.tag}
                  </p>
                  <h3 className="mt-5 text-[1.1rem] font-medium uppercase leading-[1.15] tracking-[-0.02em]">{d.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#9A9AA3]">{d.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </Row>
      </Band>

      {/* 03 Client Optimal */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r lg:py-16")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="03">My company</Label>
              <H2 wide>
                Client Optimal makes <Mark delayMs={350}>introductions.</Mark>
              </H2>
              <Lead>
                Many companies have a supplier they have not met yet, and many suppliers have buyers who may soon need them. Client Optimal looks for both, confirms the need, and connects them.
              </Lead>
              <div className="mt-8 -m-[7px] flex flex-col gap-2.5 p-[7px] sm:flex-row sm:items-center sm:gap-3">
                <PrimaryLink to={COMPANY}>Visit clientoptimal.com</PrimaryLink>
                <GhostLink to="/client-optimal">How it works</GhostLink>
              </div>
            </Reveal>
          </div>
          <ul className="divide-y" style={{ borderColor: LINE }}>
            {MOVES.map((m, i) => (
              <li key={m.title} style={{ borderColor: LINE }}>
                <Reveal delayMs={i * 100} className="group grid grid-cols-[44px_1fr] gap-x-3 px-4 py-7 transition-colors hover:bg-[#111113] sm:grid-cols-[56px_1fr] sm:px-6 lg:px-9 lg:py-9">
                  <span className={cn(GeistMono.className, "pt-1 text-[11px] tracking-[0.1em] text-[#7C89FF]")}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="co-ul inline text-[1.1rem] font-medium uppercase tracking-[-0.02em] group-hover:[background-size:100%_1px] sm:text-[1.25rem]">{m.title}</h3>
                    <p className="mt-3 max-w-[50ch] text-[13.5px] leading-[1.65] text-[#9A9AA3]">{m.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Row>
      </Band>

      {/* 04 Case studies */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="04">Case studies</Label>
              <H2 wide>
                The method, <Mark delayMs={350}>on the record.</Mark>
              </H2>
              <Lead>Documented introductions and outcomes from the method behind Client Optimal. NDA-signed, licensed, with company names covered.</Lead>
            </Reveal>
          </div>
          <div className="flex items-end px-4 pb-9 sm:px-6 lg:px-10 lg:pb-14">
            <Reveal delayMs={120}>
              <TextLink to="/case-studies">All eight case studies</TextLink>
            </Reveal>
          </div>
        </Row>
        <Row>
          <div className="grid grid-cols-1 gap-px bg-white/[0.14] sm:grid-cols-2 lg:grid-cols-3">
            {CASES.slice(0, 3).map((c, i) => (
              <CaseCard key={c.slug} c={c} delayMs={i * 80} />
            ))}
          </div>
        </Row>
      </Band>

      <CtaBand />
    </>
  )
}
