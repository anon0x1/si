// Single source of truth for all site content.
// Edit this file to update the website, then run: bun run build.ts

export const profile = {
  name: "Madhurendra Kumar",
  heroName: "I'm Madhurendra",
  handle: "M14R41",
  title: "Senior Security Consultant",
  roles: [
    "Senior Security Consultant",
    "Independent Security Researcher",
    "50x CVE Author",
    "Bug Bounty Hunter",
    "CTF Player",
  ],
  tagline: "50x CVE · eWPTXv3 · CEH Master · CAP",
  location: "Bengaluru, India",
  available: "Open to research & collaboration",
  summary:
    "Security consultant and researcher with 50+ assigned CVEs. I test web apps, APIs, mobile, thick clients, cloud and networks, then report findings teams can act on.",
  // Long-form bio shown in the About section.
  about: [
    "I'm Madhurendra, a security consultant based in Bengaluru. I've spent the last few years doing penetration testing and vulnerability research full-time, with 50+ CVEs assigned along the way. I hold the eWPTXv3, CAP and CEH Master certifications, plus an MCA degree.",
    "I work across web, API, Android, iOS, thick-client, network and cloud testing, along with secure source-code review. Most of my tooling is in Bash and Python, and I'm comfortable across the common stacks and operating systems.",
    "Outside of client work I hunt bugs, play CTFs on Hack The Box and TryHackMe, and write up what I find on Medium. Always happy to talk shop with people working in security.",
  ],
  stats: [
    { value: "50", suffix: "+", label: "CVEs Assigned", icon: "bug" },
    { value: "350", suffix: "+", label: "NCIIPC Acknowledgements", icon: "award" },
    { value: "7", suffix: "+", label: "Hall of Fame Listings", icon: "star" },
    { value: "5", suffix: "+", label: "Certifications", icon: "badge" },
  ],
  social: {
    github: "https://github.com/m14r41",
    linkedin: "https://www.linkedin.com/in/m14r41/",
    twitter: "https://twitter.com/M14_R41",
    email: "madhurendra011@gmail.com",
    website: "https://m14r41.in",
    blog: "https://blogs.m14r41.in",
    medium: "https://medium.com/@m14r41",
    tryhackme: "https://tryhackme.com/p/m14r41",
    hackthebox: "https://profile.hackthebox.com/profile/019e4595-6972-7044-ab6b-d65fdd15f3a0",
  },
};

// Top-nav dropdown menus.
export const navMenus = {
  "Top Projects": [
    { name: "PentestingEverything", url: "https://pentesting.m14r41.in/" },
    { name: "PentestingChecklist", url: "https://checklist.m14r41.in/" },
    { name: "wordlistForger", url: "https://github.com/m14r41/wordlistForger" },
    { name: "scan4secrets", url: "https://github.com/m14r41/scan4secrets" },
    { name: "Scripting4Hackers", url: "https://github.com/m14r41/Scripting4Hackers" },
    { name: "Clickjacking-Poc", url: "https://github.com/m14r41/Clickjacking-Poc" },
  ],
  "Live Resources": [
    { name: "clickjacking.m14r41.in", url: "https://clickjacking.m14r41.in" },
    { name: "cvss.m14r41.in", url: "https://cvss.m14r41.in" },
    { name: "sqlmap.m14r41.in", url: "https://sqlmap.m14r41.in" },
    { name: "reverse-shell.m14r41.in", url: "https://reverse-shell.m14r41.in" },
    { name: "csrf.m14r41.in", url: "https://csrf.m14r41.in" },
  ],
};

// Skills & Arsenal: the domains I work across. Rendered as a compact icon + label grid.
export const arsenal = [
  { group: "Vulnerability Assessment", icon: "shield" },
  { group: "Web Security", icon: "globe" },
  { group: "Mobile Application (Android / iOS)", icon: "smartphone" },
  { group: "API Security", icon: "server" },
  { group: "Thick Client", icon: "cpu" },
  { group: "SAST & SCA", icon: "code" },
  { group: "Threat Modeling", icon: "target" },
  { group: "Design / Idea Review", icon: "pen" },
  { group: "Cloud Security", icon: "cloud" },
  { group: "Network Security", icon: "network" },
  { group: "Automation & Scripting", icon: "terminal" },
  { group: "Security Research", icon: "search" },
];

export const experience = [
  {
    role: "Senior Consultant",
    org: "Confidential",
    loc: "Bengaluru, India",
    period: "Feb 2026 – Present",
    current: true,
    points: [
      "End-to-end VAPT across web, mobile, API and thick-client targets.",
      "SAST and DAST reviews, OWASP-aligned testing and CVSS-scored reporting.",
    ],
    skills: ["VAPT", "SAST", "DAST", "Web App Pentesting", "Mobile Pentesting", "Thick Client", "API Pentesting", "OWASP", "CVSS", "Report Writing"],
  },
  {
    role: "Product Security Engineer",
    org: "Traveloka",
    loc: "Bengaluru, India · On-site",
    period: "Jul 2025 – Feb 2026",
    points: [
      "Penetration testing across web, mobile and API, with SAST (manual and AI-assisted).",
      "Threat modeling and design reviews to catch risks early in the SDLC.",
    ],
    skills: ["Web App Pentesting", "Mobile Pentesting", "API Pentesting", "SAST", "AI-Assisted SAST (Copilot)", "Threat Modeling", "Architecture & Design Review", "SDLC Security", "Remediation Support", "Stakeholder Coordination", "Report Writing"],
  },
  {
    role: "Senior Information Security Consultant (L1)",
    org: "eSec Forte® Technologies",
    loc: "Noida, India · Hybrid (deployed at EXL Service SEZ)",
    period: "Apr 2024 – Jul 2025",
    points: [
      "DevSecOps team running penetration testing for web, mobile, API and thick-client apps, plus SCA.",
      "SAST with Fortify SSC and Prisma Cloud, integrated into Jenkins CI/CD pipelines.",
    ],
    skills: ["DevSecOps", "Web App Pentesting", "Mobile Pentesting", "API Pentesting", "Thick Client", "SCA", "SAST", "Fortify SSC", "Fortify Audit Workbench", "Prisma Cloud", "Jenkins CI/CD", "Report Writing"],
  },
  {
    role: "Information Security Analyst",
    org: "Global Technology & Information Security (GTIS)",
    loc: "Gurugram, India",
    period: "Apr 2022 – Apr 2024",
    points: [
      "VAPT across web, mobile, API and thick-client targets.",
      "Secure source-code review, cloud security assessments and vulnerability research.",
    ],
    skills: ["SAST", "DAST", "Web App Pentesting", "Mobile / iOS Pentesting", "Thick Client", "API Pentesting", "Secure Code Review", "Cloud Security", "Vulnerability Research", "Report Writing"],
  },
  {
    role: "Independent Security Researcher",
    org: "Bug Bounty & Responsible Disclosure",
    loc: "Remote",
    period: "Jul 2022 – Present",
    current: true,
    points: [
      "350+ NCIIPC acknowledgements, plus multiple Hall of Fame and appreciation letters.",
      "Ongoing responsible disclosure and vulnerability research.",
    ],
    skills: ["Bug Bounty", "Vulnerability Research", "Responsible Disclosure", "Hall of Fame", "Web App Pentesting", "API Pentesting"],
  },
  {
    role: "Cyber Security & Digital Forensics Intern",
    org: "Cyber Secured India",
    loc: "Remote",
    period: "Jan 2022 – Mar 2022",
    points: [
      "Web and mobile application penetration testing.",
      "IoT and hardware pentesting, with documentation and reporting.",
    ],
    skills: ["Web App Pentesting", "Mobile Pentesting", "IoT Security", "Hardware Security", "Automotive Security", "RF Security", "Digital Forensics", "Report Writing"],
  },
  {
    role: "Cyber Security Intern",
    org: "SISTMR, Australia",
    loc: "Remote",
    period: "Feb 2022 – Mar 2022",
    points: [
      "Web pentesting on Metasploitable2 and OWASP Broken Web Apps.",
      "CTF challenges and hands-on labs with virtualization.",
    ],
    skills: ["CTF", "Web App Pentesting", "Virtualization", "Metasploitable2", "OWASP BWA", "Networking (OSI / TCP-IP)"],
  },
];

export const education = [
  {
    degree: "Master of Computer Application (MCA)",
    org: "Mangalayatan University, Uttar Pradesh",
    period: "2022 – 2024",
  },
  {
    degree: "Bachelor of Computer Application (BCA)",
    org: "BRABU University, Muzaffarpur, Bihar",
    period: "2018 – 2021",
  },
  {
    degree: "Senior Secondary",
    org: "Bihar Board, Patna",
    period: "2015 – 2017",
  },
];

export const certifications = [
  {
    name: "eWPTXv3 — Web Application Penetration Tester eXtreme",
    org: "INE",
    year: "Aug 2025",
    id: "158329824",
    verify: "https://certs.ine.com/0595bdda-e06b-4056-8e0a-b45f3b3d99ec#acc.duDF49SR",
    major: true,
  },
  {
    name: "CRTP — Certified Red Team Professional",
    org: "Altered Security",
    year: "",
    id: "",
    verify: "https://www.credential.net/5aacb24a-06ef-4b80-93db-08ebaad1c3fb#acc.DwBxHGrS",
    major: true,
  },
  {
    name: "CEH v11 — Certified Ethical Hacker",
    org: "EC-Council",
    year: "",
    id: "ECC7538946210",
    verify: "https://aspen.eccouncil.org/VerifyBadge?&type=certification&a=+8lTtoJ8QWHZMV7T4cTXI1t9aWPbZtGqjtaPNT7AAP0=",
  },
  {
    name: "CEH Practical",
    org: "EC-Council",
    year: "",
    id: "",
    verify: "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=70IiRie319foX3BwgfRy6NutwkYkHZnF+XYv9hIlBVc=",
    major: true,
  },
  {
    name: "CEH Master",
    org: "EC-Council",
    year: "",
    id: "ECC2039745816",
    verify: "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=70IiRie319foX3BwgfRy6GJRlplsegASn+znlsRM5L4=",
    major: true,
  },
  {
    name: "MCRTA — Multi-Cloud Red Team Analyst",
    org: "CyberWarFare Labs",
    year: "",
    id: "",
    verify: "https://labs.cyberwarfare.live/credential/achievement/668463e25579bdc57c6913c2",
    major: true,
  },
  {
    name: "CAP — Certified AppSec Practitioner",
    org: "The SecOps Group",
    year: "Jan 2023",
    id: "6899817",
    verify: "",
    major: true,
  },
  {
    name: "Practical Ethical Hacking",
    org: "TCM Security",
    year: "Jan 2024",
    id: "cert_8q98pmdv",
    verify: "",
  },
  {
    name: "Introduction to Cybersecurity Learning Path",
    org: "TryHackMe",
    year: "Dec 2021",
    id: "THM-MC58TPH3AX",
    verify: "",
  },
];

// Featured projects. Stars/forks are live counts (refresh periodically).
export const projects = [
  {
    name: "PentestingEverything",
    desc: "Comprehensive repository of 15+ types of pentesting tools, resources and methodology. A one-stop reference for offensive security.",
    tags: ["Methodology", "Toolkit"],
    url: "https://github.com/m14r41/PentestingEverything",
    site: "https://pentesting.m14r41.in",
    stars: 1711,
    forks: 388,
  },
  {
    name: "PentestingChecklist",
    desc: "A practical, repeatable security testing checklist covering web, API, mobile and network engagements end to end.",
    tags: ["Checklist", "Methodology"],
    url: "https://github.com/m14r41/PentestingChecklist",
    site: "https://checklist.m14r41.in",
    stars: 51,
    forks: 10,
  },
  {
    name: "Clickjacking-Poc",
    desc: "Instant clickjacking proof-of-concept generator to demonstrate UI-redress vulnerabilities for reports.",
    tags: ["PoC", "Web"],
    url: "https://github.com/m14r41/Clickjacking-Poc",
    site: "https://clickjacking.m14r41.in",
    stars: 8,
    forks: 1,
  },
  {
    name: "scan4secrets",
    desc: "Lightweight source-code scanner with 400+ detection rules for secrets, tokens and sensitive information.",
    tags: ["SAST", "Secrets"],
    url: "https://github.com/m14r41/scan4secrets",
    site: "",
    stars: 113,
    forks: 32,
  },
  {
    name: "wordlistForger",
    desc: "Targeted wordlist generator that forges context-aware lists to sharpen fuzzing and brute-force coverage.",
    tags: ["Recon", "Wordlists"],
    url: "https://github.com/m14r41/wordlistForger",
    site: "",
    stars: 4,
    forks: 2,
  },
  {
    name: "Scripting4Hackers",
    desc: "A growing collection of Bash and Python scripts that automate everyday offensive-security tasks.",
    tags: ["Automation", "Scripts"],
    url: "https://github.com/m14r41/Scripting4Hackers",
    site: "",
    stars: 5,
    forks: 4,
  },
];

export const writeups = [
  {
    title: "GraphQL Pentesting: A Beginner's Guide to Advanced",
    tag: "API",
    url: "https://medium.com/@m14r41/graphql-pentesting-a-beginners-guide-to-advanced-08c29bf82979",
  },
  {
    title: "Thick Client Pentesting Guide",
    tag: "Thick Client",
    url: "https://medium.com/@m14r41/thick-client-pentesting-guide-95529a980ea4",
  },
  {
    title: "REST API Pentesting Resources",
    tag: "API",
    url: "https://medium.com/@m14r41/rest-api-pentesting-resources-3155985b8c4d",
  },
  {
    title: "Android Dynamic Penetration Testing",
    tag: "Mobile",
    url: "https://medium.com/@m14r41/android-dynamic-penetration-testing-2b54b0d8c89c",
  },
  {
    title: "Mobile Application Static Analysis",
    tag: "Mobile",
    url: "https://medium.com/@m14r41/hello-im-madhurendra-and-in-this-article-i-ll-delve-into-the-realm-of-mobile-application-35551733919c",
  },
  {
    title: "Comprehensive Guide to SAST",
    tag: "AppSec",
    url: "https://medium.com/@m14r41/comprehensive-guide-to-static-application-security-testing-sast-d87c53b6e587",
  },
];

export const hobbies = [
  { title: "Capture the Flag · HTB & THM", icon: "flag" },
  { title: "Writing & reading security writeups", icon: "pen" },
  { title: "Security research", icon: "search" },
  { title: "Open-source contributions", icon: "git" },
  { title: "Programming & automation", icon: "terminal" },
];

export const platforms = [
  { name: "GitHub", handle: "@m14r41", icon: "github", url: "https://github.com/m14r41" },
  { name: "LinkedIn", handle: "in/m14r41", icon: "linkedin", url: "https://www.linkedin.com/in/m14r41/" },
  { name: "Medium", handle: "@m14r41", icon: "medium", url: "https://medium.com/@m14r41" },
];

export const recognition = [
  { title: "Top 15 Researchers · NCIIPC India", note: "Newsletter" },
  { title: "NASA Acknowledgement", note: "" },
  { title: "Hall of Fame · BlackBerry", note: "" },
  { title: "Hall of Fame · Bosch", note: "" },
  { title: "Hall of Fame · Inflectra", note: "" },
  { title: "Hall of Fame · Utrecht University", note: "" },
  { title: "Hall of Fame · Drexel University", note: "" },
  { title: "Hall of Fame · University of Texas", note: "" },
  { title: "Appreciation · University of Cambridge", note: "2×" },
  { title: "Appreciation · Drexel University", note: "10×" },
  { title: "IBM Security Recognitions", note: "" },
  { title: "350+ NCIIPC India Acknowledgements", note: "" },
];

// Representative assigned CVE IDs (2024). Ranges expanded for the showcase grid.
function range(prefix: string, from: number, to: number, skip: number[] = []) {
  const out: string[] = [];
  for (let i = from; i <= to; i++) if (!skip.includes(i)) out.push(`${prefix}${i}`);
  return out;
}
export const cves: string[] = [
  ...range("CVE-2024-", 48278, 48283, [48281]),
  "CVE-2024-48810",
  "CVE-2024-48811",
  ...range("CVE-2024-", 50823, 50844),
  ...range("CVE-2024-", 54918, 54939),
];
