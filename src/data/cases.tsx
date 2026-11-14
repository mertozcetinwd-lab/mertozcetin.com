/**
 * The eight case studies. Index cards use the fields below. The full write-up of each one is in case-docs.json
 * (built from the documents by scratchpad/build_case_docs.py, with every company name already replaced by a box
 * token). Facts are taken only from what the documents state.
 */
export type Case = {
  slug: string
  tag: string
  outcome: "Introduction" | "Introductions" | "Revenue" | "Placements" | "Clients" | "Partnerships"
  stat: string
  statLabel: string
  summary: string
  facts: [string, string][]
}

const SOURCE: [string, string] = ["Source", "NDA-signed, licensed case study"]

export const CASES: Case[] = [
  {
    slug: "school-it-introduction",
    tag: "Education / IT infrastructure",
    outcome: "Introduction",
    stat: "1,510",
    statLabel: "Wi-Fi 7 access points a school district was buying",
    summary: "A technology contractor was introduced to a school district with an open purchase.",
    facts: [
      ["Industry", "Education and technology"],
      ["Outcome", "One qualified introduction to a school district"],
      ["Scope", "1,510 Wi-Fi 7 access points, network switches and related equipment"],
      ["Introduction fee", "$10,000"],
      SOURCE,
    ],
  },
  {
    slug: "plastic-conversion-introductions",
    tag: "Industrial / Plastic conversion",
    outcome: "Introductions",
    stat: "6",
    statLabel: "introductions in 120 days",
    summary: "A hard industrial route: six qualified introductions around a plastic-conversion facility.",
    facts: [
      ["Industry", "Industrial plastic conversion (demand side)"],
      ["Outcome", "6 routed commercial introductions"],
      ["Timeframe", "120 days"],
      ["Facility", "50 TPD phase-one capacity, with a path to 200 TPD"],
      SOURCE,
    ],
  },
  {
    slug: "industrial-automation-revenue",
    tag: "Industrial automation",
    outcome: "Revenue",
    stat: "$85K",
    statLabel: "added revenue in a quarter",
    summary: "Targeted outreach to decision makers in manufacturing and automation.",
    facts: [
      ["Industry", "Industrial automation"],
      ["Outcome", "$85K in additional revenue"],
      ["Timeframe", "One quarter"],
      SOURCE,
    ],
  },
  {
    slug: "recruitment-specialist-talent",
    tag: "Recruitment / Specialist talent",
    outcome: "Revenue",
    stat: "$105K",
    statLabel: "added revenue in a quarter",
    summary: "Outreach to companies that needed specialist hires.",
    facts: [
      ["Industry", "Recruitment"],
      ["Outcome", "$105K in additional revenue"],
      ["Timeframe", "One quarter"],
      SOURCE,
    ],
  },
  {
    slug: "recruitment-industrial-placements",
    tag: "Recruitment / Industrial and technical",
    outcome: "Placements",
    stat: "22",
    statLabel: "placements in 55 days",
    summary: "Outreach to HR and hiring managers in industrial, technical and commercial sectors.",
    facts: [
      ["Industry", "Recruitment"],
      ["Client", "A UK-based recruitment agency"],
      ["Outcome", "22 placements"],
      ["Timeframe", "55 days"],
      SOURCE,
    ],
  },
  {
    slug: "healthcare-new-clients",
    tag: "Healthcare",
    outcome: "Clients",
    stat: "3 to 4",
    statLabel: "healthcare clients added",
    summary: "Introductions to healthcare organizations that needed new tools.",
    facts: [
      ["Industry", "Healthcare technology"],
      ["Outcome", "3 to 4 new healthcare clients"],
      ["Method", "Introductions through an established healthcare network, with tailored outreach"],
      SOURCE,
    ],
  },
  {
    slug: "healthcare-technology-partnerships",
    tag: "Healthcare technology",
    outcome: "Partnerships",
    stat: "$35K",
    statLabel: "two partnerships in 60 days",
    summary: "A focused outbound system aimed at hospital decision makers.",
    facts: [
      ["Industry", "Healthcare technology"],
      ["Outcome", "2 new partnerships worth $35,000"],
      ["Timeframe", "60 days"],
      SOURCE,
    ],
  },
  {
    slug: "education-technology-clients",
    tag: "Education technology",
    outcome: "Clients",
    stat: "5",
    statLabel: "new clients in 48 days",
    summary: "Targeted outreach to schools, language centers and parents.",
    facts: [
      ["Industry", "Education technology"],
      ["Outcome", "5 new clients"],
      ["Timeframe", "48 days"],
      ["Initial investment", "$8,288"],
      SOURCE,
    ],
  },
]

export const OUTCOME_TYPES = ["Introduction", "Revenue", "Placements", "Clients", "Partnerships"] as const
