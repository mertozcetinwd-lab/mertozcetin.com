import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Band } from "./components/blocks"
import SiteFooter from "./components/SiteFooter"
import SiteHeader from "./components/SiteHeader"
import { COMPANY, GridPlus } from "./components/primitives"
import About from "./pages/About"
import CaseStudies from "./pages/CaseStudies"
import Contact from "./pages/Contact"
import Home from "./pages/Home"

const TITLES: Record<string, string> = {
  "/": "Mert Ozcetin | Founder of Client Optimal",
  "/client-optimal": "Client Optimal | Introduction brokerage by Mert Ozcetin",
  "/case-studies": "Case studies | Mert Ozcetin",
  "/about": "About | Mert Ozcetin",
  "/contact": "Contact | Mert Ozcetin",
}

/** New page starts at the top; a #hash scrolls to its section. */
function ScrollAndTitle() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES["/"]
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function GoToCompany() {
  useEffect(() => { window.location.replace(COMPANY) }, [])
  return null
}

export default function App() {
  return (
    <>
      <ScrollAndTitle />
      <main className="font-sans">
        <Band fade={false}>
          <GridPlus edge="left" className="left-0 top-0" />
          <GridPlus edge="right" className="left-full top-0" />
          <SiteHeader />
        </Band>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* 2026-11-19 (Mert): "Client Optimal" always means the real site; old links to this path are sent there. */}
          <Route path="/client-optimal" element={<GoToCompany />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}
