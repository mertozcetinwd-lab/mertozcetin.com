import { Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { SmartLink } from "./blocks"
import { COMPANY, COMPANY_CONTACT, EMAIL, GeistMono, LINE, LINKEDIN, MAILTO, Reveal } from "./primitives"
import { Logo } from "./SiteHeader"

type FooterLink = { label: string; to: string }
const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Client Optimal", to: COMPANY },
      { label: "Case studies", to: "/case-studies" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Client Optimal",
    links: [
      { label: "Visit the company", to: COMPANY },
      { label: "How it works", to: `${COMPANY}/how-it-works` },
      { label: "Case studies", to: `${COMPANY}/work` },
      { label: "Who we serve", to: `${COMPANY}/who-we-serve` },
      { label: "Request an introduction", to: COMPANY_CONTACT },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: EMAIL, to: MAILTO },
      { label: "LinkedIn", to: LINKEDIN },
    ],
  },
]

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[20px] shrink-0" aria-hidden>
      <path
        d="M4.5 9.2h3.3V20H4.5V9.2Zm1.65-5.2a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM10 9.2h3.15v1.5h.05c.45-.85 1.55-1.75 3.2-1.75 3.4 0 4.05 2.2 4.05 5.1V20h-3.3v-5.3c0-1.25-.02-2.9-1.8-2.9-1.8 0-2.1 1.4-2.1 2.8V20H10V9.2Z"
        fill="currentColor"
      />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[21px] shrink-0" fill="none" aria-hidden>
      <rect x="2.75" y="5.25" width="18.5" height="13.5" rx="2.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="m4 7.5 8 6 8-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const SOCIAL = [
  { label: "Mert on LinkedIn", to: LINKEDIN, icon: LinkedInIcon },
  { label: `Email ${EMAIL}`, to: MAILTO, icon: MailIcon },
]

export default function SiteFooter() {
  return (
    <footer className="mx-3 mt-0 border-x pb-3 sm:mx-6 sm:pb-6 lg:mx-10" style={{ borderColor: LINE }}>
      <div className="overflow-hidden border-x border-b bg-[#0D0D0F]" style={{ borderColor: LINE }}>
        <div className="grid gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-10 lg:py-16">
          <Reveal>
            <Logo />
            <p className="mt-5 max-w-[38ch] text-[14px] leading-[1.65] text-[#9A9AA3]">
              Client Optimal is an introduction brokerage. I run it, and I build the systems behind it. Build with AI. Grow with systems.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL.map(({ label, to, icon: Icon }) => (
                <SmartLink
                  key={label}
                  to={to}
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center border bg-[#141416] text-white transition-colors duration-200 hover:bg-[#0000FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B4BFF]"
                  style={{ borderColor: LINE }}
                >
                  <Icon />
                </SmartLink>
              ))}
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
            {COLUMNS.map((col, i) => (
              <Reveal key={col.title} delayMs={i * 80}>
                <p className={cn(GeistMono.className, "text-[11px] uppercase tracking-[0.16em] text-[#7C89FF]")}>{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.to.startsWith("/") ? (
                        <Link to={l.to} className="co-ul text-[15px] text-[#B4B4BC] hover:text-white">
                          {l.label}
                        </Link>
                      ) : (
                        <SmartLink to={l.to} className="co-ul break-all text-[15px] text-[#B4B4BC] hover:text-white">
                          {l.label}
                        </SmartLink>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden border-t px-2 pt-4" style={{ borderColor: LINE }}>
          <p
            aria-hidden
            className="co-wordmark select-none whitespace-nowrap text-center font-medium uppercase leading-[0.82] tracking-[-0.06em]"
            style={{ fontSize: "clamp(3.2rem, 13.6vw, 15rem)" }}
          >
            Mert Ozcetin
          </p>
        </div>

        <div className={cn(GeistMono.className, "flex flex-col gap-2 border-t px-4 py-4 text-[10px] uppercase tracking-[0.14em] text-[#6F6F78] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10")} style={{ borderColor: LINE }}>
          <span>© 2026 Mert Ozcetin. Computer Science, University of Florida.</span>
          <SmartLink to={COMPANY} className="co-ul hover:text-white">
            Client Optimal LLC: clientoptimal.com
          </SmartLink>
        </div>
      </div>
    </footer>
  )
}
