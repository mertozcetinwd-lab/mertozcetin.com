// DRAFT CONTENT — pulled from the AIOS repo so the layout has real material.
// Mert swaps in final copy/links after seeing it. External voice not yet calibrated.
//
// This site is Mert, not the business: clientoptimal.com is a separate site for
// Client Optimal. The LLC is a fact about him here, not the headline.

export const meta = {
  name: 'Mert Ozcetin',
  first: 'Mert',
  last: 'Ozcetin',
  role: 'AI Automation & Agentic Systems',
  brand: 'Client Optimal',
  // Remote is a hard constraint, not a preference — it belongs wherever the
  // location is stated rather than buried in one line on /about.
  location: 'Remote · USA',
  hours: 'US Eastern',
  // The chrome-bot clock ticks in THIS zone, not the visitor's — that's what
  // makes it information rather than a readout of their own taskbar.
  tz: 'America/New_York',
  tzLabel: 'Mert’s time',
  email: 'mertozcetinwd@gmail.com', // TODO confirm public contact (or hello@mertozcetin.com)
  // "Open to" asks permission; "Available for" states a fact. Used in exactly
  // two places (chrome bar + hero) — it previously repeated four times across
  // the page, and that repetition is what made it read as pleading.
  status: 'Available for AI roles',
  version: 'PORTFOLIO — 2026',
  // BUILT, not used. This said "Everything on this site runs real work,
  // unattended, every day" — a claim about Mert's daily habits that isn't true;
  // he builds these, he doesn't run them as rituals. It rendered in the hero AND
  // as the meta description on every page, so fixing /about alone would have
  // left the homepage contradicting the About page two clicks away.
  // The build claim is the stronger one anyway: a recruiter is hiring the
  // builder, not the user.
  tagline:
    'I build AI automations and agentic systems. Everything on this site is something I designed, built, and shipped end to end.',
  intro:
    'I design and ship agentic systems: tool-using agents, API integrations, and the file-based infrastructure they run on. Early, hands-on, and building in public.',
  // The hero tagline's one accent phrase. Kept here beside the string it indexes
  // into so the two can't drift — Decode throws at build if it stops matching.
  taglineMark: 'automations',
};

// No 'Home' entry — the brand in Chrome.astro is the home link, which is the
// universal convention and buys back the space the nav needs on a phone.
export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  // Was '/#contact' — an anchor to a section on whatever page you were already
  // on. There's a real page now, so this goes there.
  { label: 'Contact', href: '/contact' },
];

// The band under the hero. Descriptions say something true about each destination
// rather than issuing an instruction — the old 'Start a project' was written for a
// studio pitch, which is clientoptimal.com's job now, not this site's.
// NOTE: gateways[0].desc is derived from projects[] at the bottom of this file
// rather than written by hand — it said "Five builds" while eight existed.
export const gateways = [
  { idx: '01', label: 'Work', href: '/work', desc: '' },
  // "honestly" was defensive — it braces the reader for bad news. State it flat.
  { idx: '02', label: 'About', href: '/about', desc: "Where I'm at" },
  // Not a third repeat of the status line; say what the link does.
  { idx: '03', label: 'Contact', href: '/contact', desc: 'Reach me directly' },
];

// The capabilities grid — text only. These are categories, not evidence, so they
// carry no imagery: the proof section above them does that job with real captures.
export const capabilities = [
  {
    idx: '01', tag: 'Automate', title: 'Automations',
    desc: 'Inbox triage, data pipelines, and the repetitive work, run unattended.',
  },
  {
    idx: '02', tag: 'Orchestrate', title: 'Agents',
    desc: 'Tool-using agents that make the call, take the action, and know when to stop.',
  },
  {
    idx: '03', tag: 'Engineer', title: 'Systems',
    desc: 'Durable, file-based systems: the wiring and guardrails the rest runs on.',
  },
  {
    idx: '04', tag: 'Research', title: 'Research',
    desc: 'Multi-perspective research briefings that map where the experts actually disagree.',
  },
  {
    idx: '05', tag: 'Compose', title: 'Interfaces',
    desc: 'Decks and reports that build and critique themselves, presentation-ready on demand.',
  },
  {
    idx: '06', tag: 'Connect', title: 'Integrations',
    desc: 'Wiring the tools you already use, Gmail to ClickUp to Stripe, into one flow.',
  },
];

// The marquee band under the hero. Short, concrete nouns — this is a texture of
// what he does, not a list of claims, so nothing here should be a boast.
export const marquee = [
  'AI AUTOMATION', 'AGENTIC WORKFLOWS', 'CLAUDE CODE', 'FILE-BASED SYSTEMS',
  'TOOL-USING AGENTS', 'PROMPT ENGINEERING', 'SHIPPED, NOT DEMOED',
];

// LinkedIn FIRST — it's the channel Mert actually answers on, so it leads
// everywhere this array renders (footer, ContactCta, /contact) rather than being
// stated once and contradicted by an email address set in 40px type.
//
// href: '#' shipped here for weeks. socials renders in BOTH ContactCta and
// Footer on every page, so that placeholder was six dead links live on the site
// — a recruiter clicking LinkedIn got nothing. Mert claimed the clean vanity URL
// on 2026-07-16, so display and href are now the same true string.
export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mert-ozcetin/' },
  { label: 'GitHub', href: 'https://github.com/mertozcetinwd-lab' },
  { label: 'Email', href: 'mailto:mertozcetinwd@gmail.com' },
];

// The one canonical way to reach him, referenced rather than retyped — this
// string appears as the big primary on two pages plus the hero CTA, and three
// hand-copied URLs is three chances to ship a dead one.
export const primaryContact = {
  label: 'LinkedIn',
  show: 'linkedin.com/in/mert-ozcetin',
  href: 'https://www.linkedin.com/in/mert-ozcetin/',
};

// The header strip. `show` is what a visitor reads; `href` is where it goes.
// They must stay honest with each other — the LinkedIn vanity URL is Mert's own,
// so this is a shortening, not a different destination.
export const contactStrip = [
  { show: primaryContact.show, href: primaryContact.href },
  { show: 'mertozcetinwd@gmail.com', href: 'mailto:mertozcetinwd@gmail.com' },
  { show: 'github.com/mertozcetinwd-lab', href: 'https://github.com/mertozcetinwd-lab' },
];

// Projects. `featured: true` gets the big block up top (FeaturedWork + ProofStrip);
// the rest render in the list (SelectedWork). `art` is a REAL capture (/img/work/*)
// shown grey-at-rest → colour-on-hover via WorkArtifact — the only colour on the
// site. `outcome` = one honest line. `links` only where genuinely public.
// Copy is DRAFT — external voice not yet calibrated (see CLAUDE.md). Mert approves.
export const projects = [
  {
    featured: true,
    title: 'AIS-OS — a personal AI operating system',
    short: 'AIS-OS',
    kind: 'System',
    year: '2026',
    role: 'Design + build',
    tags: ['Claude Code', 'Skills', 'Agents', 'File-based'],
    summary:
      'A file-based operating system for running my work through AI: onboarding rituals, a decisions log, a connections registry, and a library of skills that wrap real automations so each is one command to run.',
    outcome: 'Every automation on this page is one command inside it.',
    status: 'live',
    art: { src: '/img/work/aisos.png', label: 'AIS-OS CONSOLE', ratio: '16 / 10', focus: 'center top' },
    // private — no public link
  },
  {
    // Source: Desktop/AI Stuff/Clay LeadGen/hvac_home_service_leads_50.csv —
    // 50 leads x 13 columns, and the columns ARE the pipeline:
    //   full_name title company_name domain email phone location industry size
    //   pain_point     <- the analysis
    //   notable_detail <- the recent-signal step
    //   subject/body   <- generated cold-email copy (avg 357 chars, max 785)
    // Run through Claude Code in the terminal under WSL/Ubuntu; sourcing via Clay.
    //
    // Distinct from the AI Lead Qualifier below: that one JUDGES inbound leads,
    // this one FINDS, enriches and writes to outbound ones.
    //
    // No repo — a folder with a CSV, not a git project. Status stays honest: a
    // pipeline that ran and produced output, not a deployed service.
    highlight: true,
    title: 'Clay → Claude cold-email pipeline',
    short: 'Clay LeadGen',
    kind: 'Pipeline',
    year: '2026',
    role: 'Design + build',
    tags: ['Clay', 'Claude Code', 'WSL / Ubuntu', 'Enrichment', 'CSV'],
    summary:
      'Sources leads through Clay, then walks each one down a chain: qualify it, read the business, find a recent signal worth mentioning, and write a cold email that earns its opening line. Fifty leads in, fifty subject lines and bodies out, each referencing something true about that specific company.',
    outcome: 'Fifty send-ready emails, none of them a template with the name swapped.',
    status: 'live',
    art: { src: '/img/work/clay.png', label: 'CLAY → CLAUDE', ratio: '5 / 4', focus: 'center top' },
  },
  {
    // Source: C:\Users\Mert\Projects\DEMO_LEAD_QUALIFIER (repo: ai-lead-qualifier).
    // Every claim below is read from that repo's CLAUDE.md + git log. The Clay
    // connection is `AI Stuff/Clay LeadGen/hvac_home_service_leads_50.csv` — Clay
    // sourced the leads, this system judges them.
    title: 'AI Lead Qualifier',
    short: 'Lead Qualifier',
    highlight: true,
    kind: 'Product',
    year: '2026',
    role: 'Design + build',
    tags: ['Next.js', 'Vercel', 'Trigger.dev', 'Claude API', 'Supabase', 'Stripe', 'zod'],
    summary:
      'A lead lands in a form; a background task scores and tiers it against a written ideal-customer profile and returns a validated verdict — score, tier, reasoning, the next action, and which of budget, authority, need and timing it actually clears. The browser never touches the job queue or the keys.',
    outcome: 'The scoring rubric is a markdown file, so changing what counts as a good lead is an edit, not a deploy.',
    status: 'live',
    art: { src: '/img/work/qualifier.png', label: 'LEAD QUALIFIER', ratio: '5 / 4', focus: 'center top' },
    links: [
      { label: 'Live', href: 'https://ai-lead-qualifier-zeta.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/mertozcetinwd-lab/ai-lead-qualifier' },
    ],
  },
  {
    title: 'Inbox → ClickUp triage engine',
    short: 'Inbox → ClickUp',
    kind: 'Automation',
    year: '2026',
    role: 'Design + build',
    tags: ['Gmail API', 'ClickUp API', 'Python'],
    summary:
      'Pulls unread Gmail, triages what actually needs action, and writes a ClickUp-ready task list for human review.',
    outcome: 'Collapses inbox triage into a single command.',
    status: 'live',
    links: [{ label: 'Case study', href: '/work/inbox-triage' }],
  },
  {
    // Source: C:\Users\Mert\Projects\N8N_TO_APP (repo: n8n-quote-generator).
    title: 'Estimate Desk — n8n quote generator',
    short: 'Estimate Desk',
    kind: 'Automation',
    year: '2026',
    role: 'Design + build',
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Vercel', 'n8n'],
    summary:
      'Type a project brief, the hours and the client type; an n8n workflow prices it and returns a structured, itemized quotation that the app renders ready to send. A serverless proxy holds the webhook URL server-side so the browser never sees it.',
    outcome: 'Falls back to a locally-computed quote with the webhook unset, so the app runs with no backend at all.',
    status: 'live',
    
    links: [{ label: 'GitHub', href: 'https://github.com/mertozcetinwd-lab/n8n-quote-generator' }],
  },
  {
    // Source: C:\Users\Mert\Projects\phase3-automations_2 (repo:
    // phase3-automations2). A different build from phase3-automations, despite
    // the name — that one crawls to a Sheet, this one writes a document.
    title: 'Strategy report automation',
    short: 'Report Automation',
    kind: 'Automation',
    year: '2026',
    role: 'Design + build',
    tags: ['Trigger.dev', 'Claude API', 'Google Drive', 'docx', 'n8n', 'GitHub Actions', 'zod'],
    summary:
      'A small JSON payload about a company kicks off a task that has Claude write a strategy report, renders it to a real Word document, and drops it in Google Drive. It logs every step, survives its own errors, and never stops to ask a question.',
    outcome: 'Push to main and GitHub Actions redeploys the task. Nobody touches a server.',
    status: 'live',
    
    // The ONLY public repo of the set (verified with `gh repo list`).
    links: [{ label: 'GitHub', href: 'https://github.com/mertozcetinwd-lab/phase3-automations2' }],
  },
  {
    title: 'STORM — multi-perspective research briefings',
    short: 'STORM',
    highlight: true,
    kind: 'Agent',
    year: '2026',
    role: 'Design + build',
    tags: ['LLM Orchestration', 'Synthesis', 'HTML'],
    summary:
      'Simulates six expert perspectives on a contested question, maps where they disagree, synthesizes a briefing, then peer-reviews its own work and renders it to a clean report.',
    outcome: 'Six expert lenses distilled into one brief you can decide from.',
    status: 'live',
    art: { src: '/img/work/storm.png', label: 'STORM BRIEFING', ratio: '5 / 4', focus: 'center top' },
  },
  {
    // Source: C:\Users\Mert\Projects\phase3-automations.
    title: 'Daily research agent',
    short: 'Daily Research',
    kind: 'Agent',
    year: '2026',
    role: 'Design + build',
    tags: ['Trigger.dev', 'Claude SDK', 'Firecrawl', 'Google Sheets', 'OAuth', 'TypeScript'],
    summary:
      'A scheduled task that crawls sources with Firecrawl, hands what it found to Claude to read and condense, and appends the result to a Google Sheet. Typed env access and retry logic underneath, because it runs on a cron with nobody watching.',
    outcome: 'Runs on a schedule and files itself — built for nobody to be watching.',
    status: 'live',
    
    links: [{ label: 'GitHub', href: 'https://github.com/mertozcetinwd-lab/phase3-automations' }],
  },
  {
    // Source: repo daily-digest (read via authenticated `gh` — there is no local
    // clone). Distinct from the Daily Research agent above: that one crawls named
    // sources into a spreadsheet, this one runs a live web search into Notion.
    title: 'AI news digest → Notion',
    short: 'News Digest',
    kind: 'Agent',
    year: '2026',
    role: 'Design + build',
    tags: ['Trigger.dev', 'Claude web search', 'Notion API', 'TypeScript'],
    summary:
      'A task that turns Claude loose on live AI and LLM news with web search, formats what comes back into a digest, and files it as a new page in a Notion database. Deployed to the cloud and versioned in git.',
    outcome: 'Ships on-command instead of on a cron — a deliberate call to stop it burning credits daily.',
    status: 'live',
    
    links: [{ label: 'GitHub', href: 'https://github.com/mertozcetinwd-lab/daily-digest' }],
  },
  {
    title: 'Slide Builder with a vision loop',
    short: 'Slide Builder',
    highlight: true,
    kind: 'Automation',
    year: '2026',
    role: 'Design + build',
    tags: ['Slides API', 'Vision Critique'],
    summary:
      'Builds Google Slides decks from scratch, then renders each slide to an image, looks at it, critiques it, and fixes it — a self-correcting loop instead of one blind pass.',
    outcome: 'The deck screenshots itself and fixes what looks wrong.',
    status: 'live',
    art: { src: '/img/work/slides.png', label: 'SLIDES · VISION LOOP', ratio: '5 / 4', focus: 'center' },
  },
  {
    title: 'Resume Screener',
    short: 'Resume Screener',
    kind: 'Tool',
    year: '2026',
    role: 'Design + build',
    tags: ['Python', 'pypdf', 'python-docx', 'Astro'],
    summary:
      'A local resume screening tool that treats the model as a witness, not a judge. Every verdict must cite verbatim evidence from the resume; fabricated quotes are discarded before they reach the report.',
    outcome: 'Verdicts tied to source text, with “unclear” kept visually distinct from “not met.”',
    status: 'building',
    links: [{ label: 'Case study', href: '/work/resume-screener' }],
  },
  {
    title: 'mertozcetin.com',
    short: 'mertozcetin.com',
    kind: 'Site',
    year: '2026',
    role: 'Design + build',
    tags: ['Astro', 'Zero-dependency', 'Duotone system'],
    // Was "one typeface, no accent colour" / "The only colour on the page is the
    // work itself" — both stopped being true at the tri-tone pass and nobody
    // updated the copy. A portfolio that misdescribes the page you're currently
    // looking at is the worst possible place to be wrong.
    summary:
      'This site. Built with Claude Code and stripped to almost nothing: two typefaces, three colours, no framework, and a duotone system that holds every screenshot at grey until you hover it.',
    outcome: 'You are looking at it. The work is the only thing that gets full colour.',
    status: 'building',
    // The repo link matters here specifically: /contact tells people "every repo
    // linked there is public — read the code before you write", and until this
    // was published the site itself was the one entry that couldn't back that up.
    links: [{ label: 'GitHub', href: 'https://github.com/mertozcetinwd-lab/mertozcetin.com' }],
  },
];

export const stack = [
  'Claude Code', 'Python', 'TypeScript', 'n8n', 'Trigger.dev', 'Next.js',
  'Vercel', 'Supabase', 'Claude API', 'Google Workspace API', 'ClickUp API',
  'Astro', 'Prompt Engineering', 'Agentic Design', 'Stripe',
];

// Derived, not hand-written. The gateway desc read "Five builds, all running"
// while eight existed — any count typed by hand goes stale the moment work is
// added, and a portfolio that miscounts its own projects is a bad look.
//
// "all running" is gone with it: that claimed continuous operation Mert doesn't
// actually have. "Shipped" is the claim that's true and the one that matters.
export const liveCount = projects.filter((p) => p.status === 'live').length;
gateways[0].desc = `${liveCount} builds, shipped`;

// idx is DERIVED from position, never typed. Hand-numbering meant every insert
// in the middle required renumbering everything below it by hand — which
// produced two projects both numbered 06 once, and needed a guard to catch it.
// Deriving deletes the whole class of mistake: the guard is now unnecessary
// because a duplicate is unrepresentable.
projects.forEach((p, i) => { p.idx = String(i + 1).padStart(2, '0'); });
