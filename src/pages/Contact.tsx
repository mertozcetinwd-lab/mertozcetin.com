import { Band, CtaBand, PageHeader, Row, SmartLink } from "../components/blocks"
import { ArrowUpRight, COMPANY, COMPANY_CONTACT, EMAIL, GeistMono, LINE, LINKEDIN, MAILTO, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"

const PATHS = [
  {
    n: "01",
    tag: "Introductions",
    title: "I sell, or I am buying.",
    text: "Client Optimal makes introductions between suppliers and the buyers who may need them. Start with the company.",
    cta: "Request an introduction",
    to: COMPANY_CONTACT,
    primary: true,
  },
  {
    n: "02",
    tag: "Questions",
    title: "I have a question for Mert.",
    text: "About Client Optimal, how an introduction works, or whether we can help with your industry. Write to me directly.",
    cta: EMAIL,
    to: MAILTO,
  },
  {
    n: "03",
    tag: "Connect",
    title: "I would like to connect.",
    text: "Fellow students, founders and anyone curious are welcome. LinkedIn is the best place to say hello.",
    cta: "LinkedIn",
    to: LINKEDIN,
  },
]

export default function Contact() {
  return (
    <>
      <PageHeader n="04" label="Contact" title="One email is" accent="enough." lead="Pick the path that fits. I read what comes in and reply when I can help." />

      <Band>
        <Row>
          <div className="grid grid-cols-1 gap-px bg-white/[0.14] lg:grid-cols-3">
            {PATHS.map((p, i) => (
              <article key={p.n} className="co-lift flex h-full min-h-[320px] flex-col bg-[#0A0A0B] p-5 sm:p-6 lg:p-8">
                <Reveal delayMs={i * 90} className="flex h-full flex-col">
                  <p className={cn(GeistMono.className, "text-[9.5px] uppercase tracking-[0.14em] text-[#8D8D95]")}>
                    <span className="text-[#7C89FF]">{p.n}</span> / {p.tag}
                  </p>
                  <h2 className="mt-6 max-w-[16ch] text-[1.5rem] font-medium uppercase leading-[1.05] tracking-[-0.03em] sm:text-[1.8rem]">{p.title}</h2>
                  <p className="mt-4 max-w-[34ch] text-[13.5px] leading-[1.65] text-[#9A9AA3]">{p.text}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-8">
                    <SmartLink
                      to={p.to}
                      className={cn(
                        p.primary
                          ? "group relative inline-flex h-11 items-center justify-center gap-2 bg-white px-5 text-[13px] text-black transition-colors hover:bg-[#0000FF] hover:text-white"
                          : cn(GeistMono.className, "co-ul inline-flex items-center gap-1.5 break-all text-[11px] uppercase tracking-[0.12em] text-[#7C89FF] hover:text-white"),
                      )}
                    >
                      {p.cta}
                      <ArrowUpRight className="size-3.5 shrink-0" />
                    </SmartLink>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </Row>
        <Row>
          <div className="flex flex-col gap-2 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10" style={{ borderColor: LINE }}>
            <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.14em] text-[#8D8D95]")}>Company site</p>
            <SmartLink to={COMPANY} className={cn(GeistMono.className, "co-ul inline-flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-white hover:text-[#7C89FF]")}>
              clientoptimal.com
              <ArrowUpRight className="size-3.5" />
            </SmartLink>
          </div>
        </Row>
      </Band>

      <CtaBand />
    </>
  )
}
