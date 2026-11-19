import { Link } from "react-router-dom"
import { Band, H2, Label, Lead, PAD, PrimaryLink, Row, SmartLink } from "../components/blocks"
import { CheckSquare, COMPANY, EMAIL, GeistMono, LINE, MAILTO, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"

/*
 * Home page, rebuilt 2026-11-15 (Mert). People land here after a cold email from Mert and want to know, fast, who
 * he is and what he does. Same order as clientoptimal.com: who he connects, three steps, who, proof, one CTA.
 * Copy rules: no em dashes, never "luck"/"chance", no outcome promises, and no claim about which side pays.
 * General on purpose (Mert, 2026-11-15): name no niche or industry anywhere on this page, proof included.
 */

const STEPS = [
  {
    title: "I identify a fit",
    text: "I read public signals, such as new filings, projects and job posts, to find a buyer and a supplier that look like a match.",
  },
  {
    title: "I confirm both sides want it",
    text: "I ask each side first. Nobody is introduced unless both have said they want the conversation.",
  },
  {
    title: "I make the introduction",
    text: "One email thread with the context both of you need. One fixed fee, agreed in writing before the introduction.",
  },
]

/** Who sits on each side, described by situation, never by industry. */
const SIDES = [
  {
    side: "Suppliers",
    title: "You have room for more work.",
    items: [
      "Companies that sell to other businesses",
      "Have room to take on more work",
      "Would rather meet a buyer with a need than run a campaign",
    ],
  },
  {
    side: "Buyers",
    title: "You have a need to fill.",
    items: [
      "Companies with a live need: a new site, a new contract or a gap in suppliers",
      "Want a suitable option without running a search",
      "Decide whether to talk before anyone is introduced",
    ],
  },
]

/** From the case studies on /case-studies (NDA-signed, licensed; the disclosure is on that page). */
const PROOF = [
  { value: "6", label: "introductions made around one buyer, over 120 days" },
  { value: "5", label: "new clients in 48 days for one supplier" },
  { value: "22", label: "placements in 55 days for one supplier" },
]

const UL = "nda-link text-white"

function Portrait() {
  return (
    <figure className="w-full max-w-[360px]">
      <div className="border bg-[#111113] p-2" style={{ borderColor: LINE }}>
        <div className="aspect-[4/5] w-full overflow-hidden bg-[#E6E6E8]">
          <img src="/mert.jpg" alt="Mert Ozcetin, founder of Client Optimal" width={1251} height={2000} className="h-full w-full object-cover" style={{ objectPosition: "50% 38%" }} />
        </div>
        <figcaption className={cn(GeistMono.className, "flex items-center justify-between gap-3 px-1 pb-1 pt-3 text-[10px] uppercase tracking-[0.14em]")}>
          <span className="text-white">Mert Ozcetin</span>
          <span className="text-[#8D8D95]">Founder, Client Optimal</span>
        </figcaption>
      </div>
    </figure>
  )
}

export default function Home() {
  return (
    <>
      {/* 1. Who I connect */}
      <Band fade={false}>
        <Row split>
          <div className={cn(PAD, "flex flex-col justify-center lg:border-r lg:py-20")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="MO">Mert Ozcetin</Label>
              <h1 className="mt-5 max-w-[18ch] text-[2.3rem] font-medium uppercase leading-[1] tracking-[-0.045em] sm:text-[3rem] lg:text-[clamp(2.6rem,4.2vw,4.4rem)]">
                I introduce companies to the buyer or supplier they need next.
              </h1>
              <p className="mt-6 max-w-[50ch] text-[15px] leading-[1.65] text-[#9A9AA3] sm:text-[16px]">
                I run{" "}
                <SmartLink to={COMPANY} className={UL}>Client Optimal</SmartLink>, an introduction company, and I study
                computer science at the University of Florida (<Link to="/about" className={UL}>my story</Link>). If
                you got an email from me, it was really me, and replying to it is the quickest way to reach me.
              </p>
              <div className="mt-8 -m-[7px] flex flex-wrap items-center gap-y-4 p-[7px]">
                {/* 2026-11-19 (Mert): the emails link here, not to clientoptimal.com (that domain is on a URL
                    blocklist, and a listed link in an email body sends it to spam). So the hero's main job is to
                    hand the reader to the business; replying stays one click away. */}
                <PrimaryLink to={COMPANY}>See how Client Optimal works</PrimaryLink>
                <a href={MAILTO} className={cn(UL, "text-[14px] sm:ml-6")}>Or reply by email</a>
              </div>
            </Reveal>
          </div>
          <div className="co-hatch relative flex items-center justify-center px-4 py-9 sm:px-6 lg:px-10 lg:py-14">
            <Portrait />
          </div>
        </Row>
      </Band>

      {/* 2. How it works */}
      <Band>
        <Row>
          <div className={PAD}>
            <Reveal>
              <Label n="01">How it works</Label>
              <H2 wide>Three steps. Nothing to log in to.</H2>
            </Reveal>
          </div>
          <ol className="grid grid-cols-1 border-t lg:grid-cols-3" style={{ borderColor: LINE }}>
            {STEPS.map((s, i) => (
              <li key={s.title} className={cn("px-4 py-8 sm:px-6 lg:px-10 lg:py-12", i < 2 && "border-b lg:border-b-0 lg:border-r")} style={{ borderColor: LINE }}>
                <Reveal delayMs={i * 100}>
                  <span className={cn(GeistMono.className, "text-[11px] tracking-[0.1em] text-[#7C89FF]")}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-[1.15rem] font-medium uppercase tracking-[-0.02em] sm:text-[1.3rem]">{s.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-[14px] leading-[1.6] text-[#9A9AA3]">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="border-t px-4 py-5 text-[13.5px] text-[#9A9AA3] sm:px-6 lg:px-10" style={{ borderColor: LINE }}>
            More on the method at{" "}
            <SmartLink to={COMPANY} className={UL}>clientoptimal.com</SmartLink>.
          </p>
        </Row>
      </Band>

      {/* 3. Who I connect: by situation, not industry */}
      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="02">Who I connect</Label>
              <H2>Two sides of the same need.</H2>
              <Lead>A supplier with capacity and a buyer with a need, across industries.</Lead>
            </Reveal>
          </div>
          {/* 2026-11-19 (Mert): this block read as a loose list with dead space under it. Now each side has a
              numbered label, a one-line heading and check marks, with a top rule when the columns stack. */}
          <div className="grid grid-cols-1 border-t sm:grid-cols-2 lg:border-t-0" style={{ borderColor: LINE }}>
            {SIDES.map((s, i) => (
              <div key={s.side} className={cn("flex flex-col px-4 py-8 sm:px-6 lg:px-9 lg:py-12", i === 0 && "border-b sm:border-b-0 sm:border-r")} style={{ borderColor: LINE }}>
                <Reveal delayMs={i * 90}>
                  <p className={cn(GeistMono.className, "text-[11px] uppercase tracking-[0.12em] text-[#7C89FF]")}>
                    {String(i + 1).padStart(2, "0")} / {s.side}
                  </p>
                  <h3 className="mt-4 max-w-[18ch] text-[1.15rem] font-medium uppercase leading-[1.1] tracking-[-0.02em] text-white">{s.title}</h3>
                  <ul className="mt-6 space-y-3.5">
                    {s.items.map((t) => (
                      <li key={t} className="flex gap-3 text-[14px] leading-[1.55] text-[#9A9AA3]">
                        <CheckSquare className="mt-[0.4em] size-3 shrink-0 text-[#7C89FF]" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </Row>
      </Band>

      {/* 4. Proof */}
      <Band>
        <Row>
          <div className={PAD}>
            <Reveal>
              <Label n="03">Proof</Label>
              <H2 wide>What an introduction has led to.</H2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 border-t sm:grid-cols-3" style={{ borderColor: LINE }}>
            {PROOF.map((p, i) => (
              <div key={p.value} className={cn("px-4 py-8 sm:px-6 lg:px-10 lg:py-12", i < 2 && "border-b sm:border-b-0 sm:border-r")} style={{ borderColor: LINE }}>
                <Reveal delayMs={i * 90}>
                  <p className={cn(GeistMono.className, "text-[2.6rem] leading-none tracking-[-0.05em] lg:text-[3.4rem]")}>{p.value}</p>
                  <p className="mt-4 max-w-[28ch] text-[13.5px] leading-[1.55] text-[#9A9AA3]">{p.label}</p>
                </Reveal>
              </div>
            ))}
          </div>
          <p className="border-t px-4 py-5 text-[13.5px] text-[#9A9AA3] sm:px-6 lg:px-10" style={{ borderColor: LINE }}>
            From NDA-signed, licensed case studies, so names are covered. Read them, and the disclosure, on{" "}
            <Link to="/case-studies" className={UL}>client case studies</Link>.
          </p>
        </Row>
      </Band>

      {/* 5. One clear CTA */}
      <Band>
        <Row>
          <div className="px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
            <Reveal>
              <Label n="Next">Get in touch</Label>
              <h2 className="mt-5 max-w-[22ch] text-[2rem] font-medium uppercase leading-[1.02] tracking-[-0.04em] sm:text-[2.8rem] lg:text-[clamp(2.4rem,4vw,4rem)]">
                Got an email from me? Reply to it.
              </h2>
              <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.6] text-[#9A9AA3]">
                Or write to <a href={MAILTO} className={UL}>{EMAIL}</a> and say what you sell or what you need. I answer
                every email myself.
              </p>
              <div className="mt-8 -m-[7px] p-[7px]">
                <PrimaryLink to={MAILTO}>Email Mert</PrimaryLink>
              </div>
            </Reveal>
          </div>
        </Row>
      </Band>
    </>
  )
}
