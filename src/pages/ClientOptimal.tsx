import { Band, CtaBand, H2, Label, Lead, PAD, PageHeader, Row, TextLink } from "../components/blocks"
import { Mark, Rule } from "../components/motion"
import { CheckSquare, COMPANY, COMPANY_CONTACT, GeistMono, LINE, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"

const STEPS = [
  {
    title: "Read the signal",
    text: "Our systems read public signals, such as new company filings, purchase listings and project announcements, to flag companies that look like they need a supplier next.",
  },
  {
    title: "Confirm the need",
    text: "We contact the buyer first and work to confirm the scope, the timing and who decides before making an introduction.",
  },
  { title: "Match the supplier", text: "We check capacity, past work and fit before we propose anyone." },
  { title: "Agree the fee", text: "A fixed fee per introduction, written down before work starts." },
  { title: "Introduce", text: "Both sides on one email thread, with context. Then we step back." },
]

const SIDES = [
  {
    n: "02.1",
    label: "For suppliers",
    title: "You sell it. We look for who needs it.",
    lead: "You sell a service or a product and want qualified buyers, not a list of names.",
    points: [
      "We look for companies with a live need that matches what you do.",
      "We work to confirm the need and who decides before we mention you.",
      "You pay a fixed fee per introduction, agreed in writing before work starts.",
    ],
    need: ["What you sell, and who it suits.", "Where you work and your capacity.", "Past work we can reference."],
  },
  {
    n: "02.2",
    label: "For buyers",
    title: "You need it. We look for who can do it.",
    lead: "You need a supplier and would rather meet a suitable one than run a search.",
    points: [
      "Tell us what you are buying, where, and by when.",
      "We check a supplier's capacity, past work and fit before proposing anyone.",
      "The fee is fixed per introduction and agreed in writing before work starts.",
    ],
    need: ["What you are buying and the timeline.", "Where it is needed.", "Who decides."],
  },
]

const INDUSTRIES = [
  { name: "Industrial", text: "Plants, materials, automation and the buyers who feed them." },
  { name: "Logistics", text: "Freight, warehousing and the carriers and shippers who need each other." },
  { name: "Healthcare", text: "Health technology and digital tools meeting the people who buy them." },
  { name: "Construction", text: "Contractors, materials and the projects waiting on them." },
]

const GET = ["A need we have checked, not a guess.", "Both sides on one thread, with context.", "A fee you know before we start."]
const DONT = ["A promised sale or contract award.", "A guaranteed outcome.", "Software to learn or log in to."]

const FAQ = [
  { q: "How is the fee set?", a: "It is a fixed fee per introduction, agreed in writing before work starts." },
  { q: "Do you guarantee a deal?", a: "No. We do not promise a sale or a contract. An introduction is the start of a conversation between two companies." },
  {
    q: "How do you find buyers?",
    a: "Our systems read public signals such as new company filings, purchase listings and project announcements. We then work to confirm the need directly before introducing anyone.",
  },
  { q: "Why email first?", a: "It keeps the first contact short and easy to answer. A call only happens when a deal needs one." },
  { q: "Who runs it?", a: "I do. I'm Mert Ozcetin, a computer science student at the University of Florida. I read what comes in and make the introductions myself." },
]

export default function ClientOptimal() {
  return (
    <>
      <PageHeader
        n="01"
        label="Client Optimal"
        title="Introductions that connect"
        accent="supply to demand."
        lead="Client Optimal is a done-for-you introduction brokerage. We look for who may need a supplier next, confirm the need, and make the introduction."
      />

      {/* Steps */}
      <Band id="steps">
        <Row>
          <div className="flex flex-wrap items-end justify-between gap-4 px-4 pt-9 sm:px-6 lg:px-10 lg:pt-12">
            <Reveal>
              <Label n="01">How it works</Label>
              <H2 wide>
                From signal to introduction in <Mark delayMs={300}>five steps.</Mark>
              </H2>
            </Reveal>
            <Reveal delayMs={120}>
              <TextLink to={`${COMPANY}/how-it-works`}>The same page on clientoptimal.com</TextLink>
            </Reveal>
          </div>
          <ol className="mt-8 grid grid-cols-1 border-t lg:grid-cols-5" style={{ borderColor: LINE }}>
            {STEPS.map((s, i) => (
              <li key={s.title} className="group border-b last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0" style={{ borderColor: LINE }}>
                <Reveal delayMs={i * 90} className="h-full px-4 py-8 transition-colors group-hover:bg-[#111113] sm:px-6 lg:px-6 lg:py-12">
                  <div className="flex items-center gap-3">
                    <span className="size-1.5 bg-[#3B4BFF]" aria-hidden />
                    <span className={cn(GeistMono.className, "text-[11px] tracking-[0.12em] text-[#7C89FF]")}>{String(i + 1).padStart(2, "0")}</span>
                    <Rule className="flex-1" delayMs={300 + i * 120} />
                  </div>
                  <h3 className="mt-6 text-[1.05rem] font-medium uppercase leading-snug tracking-[-0.015em]">{s.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-[#9A9AA3]">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Row>
      </Band>

      {/* Two sides */}
      <Band>
        <Row split>
          {SIDES.map((s, i) => (
            <div key={s.n} className={cn(PAD, "lg:py-16", i === 0 && "border-b lg:border-b-0 lg:border-r")} style={{ borderColor: LINE }}>
              <Reveal delayMs={i * 100}>
                <Label n={s.n}>{s.label}</Label>
                <h2 className="mt-4 max-w-[16ch] text-[1.6rem] font-medium uppercase leading-[1.04] tracking-[-0.035em] sm:text-[2rem]">{s.title}</h2>
                <Lead>{s.lead}</Lead>
                <ul className="mt-7 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[13.5px] leading-[1.65] text-[#B4B4BC]">
                      <CheckSquare className="mt-[0.35em] size-3 shrink-0 text-[#7C89FF]" />
                      <span className="co-li">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border p-4" style={{ borderColor: LINE }}>
                  <p className={cn(GeistMono.className, "text-[9.5px] uppercase tracking-[0.14em] text-[#8D8D95]")}>What we need from you</p>
                  <ul className="mt-3 space-y-2">
                    {s.need.map((n) => (
                      <li key={n} className="flex gap-3 text-[13px] leading-[1.55] text-[#D0D0D6]">
                        <span className="mt-[0.65em] size-1 shrink-0 bg-[#3B4BFF]" aria-hidden />
                        <span className="co-li">{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          ))}
        </Row>
      </Band>

      {/* Fee */}
      <Band id="fee">
        <Row split>
          <div className={cn(PAD, "lg:border-r lg:py-16")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="03">The fee</Label>
              <H2>
                One fixed fee. <Mark delayMs={300}>Written down first.</Mark>
              </H2>
              <Lead>No percentage of your deal, no hourly meter. You know the price before we start.</Lead>
            </Reveal>
          </div>
          <ul className="divide-y" style={{ borderColor: LINE }}>
            {["Fixed per introduction, not a share of the deal.", "Agreed in writing before work starts.", "One fee, stated up front.", "An introduction is not a promised sale."].map((t, i) => (
              <li key={t} style={{ borderColor: LINE }}>
                <Reveal delayMs={i * 80} className="flex items-center gap-4 px-4 py-6 sm:px-6 lg:px-10 lg:py-7">
                  <CheckSquare className="size-3.5 shrink-0 text-[#7C89FF]" />
                  <span className="co-li text-[14px] leading-[1.5] text-[#D0D0D6]">{t}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Row>
      </Band>

      {/* Get / don't get */}
      <Band>
        <Row split>
          {[
            { n: "04.1", label: "What you get", items: GET, good: true },
            { n: "04.2", label: "What you do not get", items: DONT, good: false },
          ].map((col, i) => (
            <div key={col.n} className={cn(PAD, i === 0 && "border-b lg:border-b-0 lg:border-r")} style={{ borderColor: LINE }}>
              <Reveal delayMs={i * 100}>
                <Label n={col.n}>{col.label}</Label>
                <ul className="mt-6 space-y-4">
                  {col.items.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[14px] leading-[1.55] text-[#D0D0D6]">
                      {col.good ? <CheckSquare className="mt-[0.3em] size-3 shrink-0 text-[#7C89FF]" /> : <span className="mt-[0.7em] h-px w-3 shrink-0 bg-white/50" aria-hidden />}
                      <span className="co-li">{t}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </Row>
      </Band>

      {/* Industries */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="05">Industries</Label>
              <H2>Where we work.</H2>
              <Lead>We focus on industries where a supplier&rsquo;s capacity and a buyer&rsquo;s need can be checked before an introduction is made.</Lead>
            </Reveal>
          </div>
          <div className="hidden co-hatch lg:block" aria-hidden />
        </Row>
        <Row>
          <div className="grid grid-cols-1 gap-px bg-white/[0.14] sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.name} className="co-lift bg-[#0A0A0B] p-5 sm:p-6 lg:p-8">
                <Reveal delayMs={i * 80}>
                  <p className={cn(GeistMono.className, "text-[10px] tracking-[0.12em] text-[#7C89FF]")}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-[1.15rem] font-medium uppercase tracking-[-0.02em]">{ind.name}</h3>
                  <p className="mt-3 text-[13px] leading-[1.6] text-[#9A9AA3]">{ind.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </Row>
        <Row>
          <p className="px-4 py-5 text-[13px] text-[#9A9AA3] sm:px-6 lg:px-10">Not on the list? Write to us anyway. We will tell you plainly whether we can help.</p>
        </Row>
      </Band>

      {/* FAQ */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="06">Questions</Label>
              <H2>Straight answers.</H2>
              <div className="mt-7">
                <TextLink to={COMPANY_CONTACT}>Ask your own</TextLink>
              </div>
            </Reveal>
          </div>
          <div className="divide-y" style={{ borderColor: LINE }}>
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delayMs={i * 70}>
                <details className="group px-4 py-5 sm:px-6 lg:px-10" style={{ borderColor: LINE }}>
                  <summary className="flex cursor-pointer items-center justify-between gap-6 text-[14.5px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#3B4BFF]">
                    <span className="co-ul group-hover:[background-size:100%_1px]">{f.q}</span>
                    <span className="relative block size-3 shrink-0 text-[#7C89FF]" aria-hidden>
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                      <span className="co-plus-v absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-opacity" />
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[56ch] text-[13.5px] leading-[1.65] text-[#9A9AA3]">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Row>
      </Band>

      <CtaBand title="Ready for your first introduction?" accent="Write to Client Optimal." />
    </>
  )
}
