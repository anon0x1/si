// Zero-dependency static site generator. Run: bun run build.ts
// Renders src/data/profile.ts + src/icons.ts into dist/. No network needed.
import { mkdirSync, copyFileSync, writeFileSync } from "node:fs";
import {
  profile, navMenus, arsenal, experience, education, certifications,
  projects, writeups, hobbies, recognition, cves,
} from "./src/data/profile";
import { icons } from "./src/icons";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ic = (n: string) => icons[n] ?? "";
const rev = (i: number) => `class="reveal" style="transition-delay:${Math.min(i * 70, 420)}ms"`;
const fmt = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : "" + n);

const soc = profile.social;
const year = new Date().getFullYear();

const NAV = [
  { l: "Home", h: "top" },
  { l: "About", h: "about" },
  { l: "Skills", h: "arsenal" },
  { l: "Experience", h: "experience" },
  { l: "Projects", h: "projects" },
  { l: "CVEs", h: "cves" },
  { l: "Contact", h: "contact" },
];
const navLinks = NAV.map((n) => `<a href="#${n.h}">${n.l}</a>`).join("");

const dropdowns = Object.entries(navMenus).map(([label, items]) => `
  <div class="dropdown"><button class="dd-btn" aria-haspopup="true" aria-expanded="false">${esc(label)} ${ic("chevron")}</button>
  <div class="dd-menu">${items.map((it) =>
    `<a href="${it.url}" target="_blank" rel="noopener">${esc(it.name)} ${ic("arrow")}</a>`).join("")}</div></div>`).join("");

const mobileExtra = Object.entries(navMenus).map(([label, items]) => `
  <details class="m-group"><summary class="m-label">${esc(label)} ${ic("chevron")}</summary>
  ${items.map((it) => `<a href="${it.url}" target="_blank" rel="noopener">${esc(it.name)}</a>`).join("")}</details>`).join("");

const statsHtml = profile.stats.map((s, i) => `
  <div ${rev(i)}><div class="stat"><div class="ic">${ic(s.icon)}</div>
  <div class="v"><span class="count" data-to="${s.value}">0</span>${esc(s.suffix ?? "")}</div>
  <div class="l">${esc(s.label)}</div></div></div>`).join("");

const aboutHtml = profile.about.map((p) => `<p>${esc(p)}</p>`).join("");

const factHtml = [
  { ic: "pin", k: "Based in", v: profile.location },
  { ic: "briefcase", k: "Currently", v: "Senior Security Consultant" },
  { ic: "cap", k: "Education", v: "MCA · Master of Computer Application" },
  { ic: "bug", k: "Disclosures", v: "50+ CVEs · 350+ NCIIPC acks" },
].map((f) => `
  <div class="fact"><span class="ic">${ic(f.ic)}</span>
  <div><div class="k">${f.k}</div><div class="v">${esc(f.v)}</div></div></div>`).join("");

const arsenalHtml = arsenal.map((a, i) => `
  <div class="reveal flex-cell" style="transition-delay:${Math.min(i * 50, 420)}ms"><div class="ars-card"><div class="ic">${ic(a.icon)}</div><h3>${esc(a.group)}</h3></div></div>`).join("");

const expHtml = experience.map((e, i) => `
  <div ${rev(i)}><div class="tl-item"><div class="node">${ic("briefcase")}</div>
  <div class="tl-card"><div class="tl-head"><div><span class="role">${esc(e.role)}</span>
  ${(e as any).current ? '<span class="badge-now">Current</span>' : ""}
  <div class="org">${esc(e.org)}</div></div>
  <div class="tl-meta"><span class="tl-period">${esc(e.period)}</span>${(e as any).loc ? `<span class="tl-loc">${ic("pin")} ${esc((e as any).loc)}</span>` : ""}</div></div>
  <ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
  ${(e as any).skills?.length ? `<div class="tl-skills">${(e as any).skills.map((s: string) => `<span class="tag">${esc(s)}</span>`).join("")}</div>` : ""}</div></div></div>`).join("");

const projHtml = projects.map((p, i) => `
  <div class="reveal flex-cell" style="transition-delay:${Math.min(i * 70, 420)}ms"><div class="card proj"><div class="top"><span class="fic">${ic("folder")}</span>
  <a class="ext" href="${p.url}" target="_blank" rel="noopener" aria-label="Open ${esc(p.name)} on GitHub">${ic("arrow")}</a></div>
  <h3><a href="${p.url}" target="_blank" rel="noopener">${esc(p.name)}</a></h3>
  <p>${esc(p.desc)}</p>
  <div class="ctags">${(p.tags ?? []).map((t) => `<span class="ctag">${esc(t)}</span>`).join("")}</div>
  <div class="proj-foot">
    <span class="metric" title="Stars">${ic("star")} ${fmt(p.stars)}</span>
    <span class="metric" title="Forks">${ic("gitfork")} ${fmt(p.forks)}</span>
    <span class="proj-links">
      <a href="${p.url}" target="_blank" rel="noopener">${ic("github")} Code</a>
      ${p.site ? `<a href="${p.site}" target="_blank" rel="noopener">${ic("globe")} Live</a>` : ""}
    </span>
  </div></div></div>`).join("");

const writeHtml = writeups.map((w, i) => `
  <div class="reveal flex-cell" style="transition-delay:${Math.min(i * 70, 420)}ms"><div class="card art"><div class="top"><span class="fic">${ic("pen")}</span>
  <a class="ext" href="${w.url}" target="_blank" rel="noopener" aria-label="Read ${esc(w.title)}">${ic("arrow")}</a></div>
  <h3><a href="${w.url}" target="_blank" rel="noopener">${esc(w.title)}</a></h3>
  <div class="ctags"><span class="ctag">${esc(w.tag)}</span><span class="ctag ghost">${ic("medium")} Medium</span></div></div></div>`).join("");

const certHtml = certifications.filter((c) => (c as any).major).map((c) => `
  <div class="item"><span class="ic">${ic("check")}</span>
  <div class="item-body"><div class="t">${esc(c.name)}</div>
  <div class="org">${esc(c.org)}${c.year ? " · " + esc(c.year) : ""}</div>
  ${c.id ? `<div class="cid">ID · ${esc(c.id)}</div>` : ""}</div>
  ${c.verify ? `<a class="vfy" href="${c.verify}" target="_blank" rel="noopener">Verify ${ic("link")}</a>` : ""}</div>`).join("");

const recogHtml = recognition.map((r, i) => `
  <div class="reveal flex-cell" style="transition-delay:${Math.min(i * 50, 360)}ms"><div class="recog"><span class="ic">${ic("star")}</span><div>
  <div class="t">${esc(r.title)}</div>${r.note ? `<div class="s">${esc(r.note)}</div>` : ""}</div></div></div>`).join("");

const eduHtml = education.map((e, i) => `
  <div class="reveal flex-cell" style="transition-delay:${Math.min(i * 70, 420)}ms"><div class="edu"><div class="ic">${ic("cap")}</div>
  <div class="d">${esc(e.degree)}</div><div class="o">${esc(e.org)}</div><div class="p">${esc(e.period)}</div></div></div>`).join("");

const hobbyHtml = hobbies.map((h, i) => `
  <div class="reveal flex-cell" style="transition-delay:${Math.min(i * 70, 420)}ms"><div class="hobby"><div class="ic">${ic(h.icon)}</div><div class="t">${esc(h.title)}</div></div></div>`).join("");

const half = Math.ceil(cves.length / 2);
const rowA = cves.slice(0, half), rowB = cves.slice(half);
const chips = (arr: string[]) => [...arr, ...arr]
  .map((c) => `<a class="cve-chip" href="https://www.cve.org/CVERecord?id=${c}" target="_blank" rel="noopener">${esc(c)}</a>`).join("");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L16KL7RKER"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-L16KL7RKER');</script>
<meta name="description" content="${esc(profile.summary)}" />
<meta name="keywords" content="Madhurendra Kumar, M14R41, Senior Security Consultant, Bug Bounty, Penetration Testing, CVE, Security Research" />
<meta name="author" content="${esc(profile.name)}" />
<meta name="theme-color" content="#060910" />
<meta property="og:title" content="${esc(profile.name)} · ${esc(profile.title)}" />
<meta property="og:description" content="${esc(profile.summary)}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${soc.website}" />
<meta property="og:image" content="${soc.website}/avatar.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${soc.website}/avatar.png" />
<link rel="canonical" href="${soc.website}" />
<link rel="icon" type="image/png" href="./avatar.png" />
<link rel="apple-touch-icon" href="./avatar.png" />
<link rel="icon" type="image/svg+xml" href="./favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="./styles.css" />
<title>M14R41-PROFILE</title>
</head>
<body>
<div class="progress" id="progress"></div>
<div class="bg-mesh"></div><div class="bg-grid"></div>
<div class="bg-orb o1"></div><div class="bg-orb o2"></div>
<span id="top"></span>

<nav class="nav" id="nav"><div class="container inner">
  <a class="brand" href="#top"><img class="logo-img" src="./avatar.png" width="441" height="441" alt="M14R41" /><span class="word">M14R41</span></a>
  <div class="nav-links">${navLinks}${dropdowns}<span class="nav-status"><span class="ping"></span><span class="lbl">Online</span></span><a class="nav-cta" href="mailto:${soc.email}">Hire me</a></div>
  <button class="hamburger" id="burger" aria-label="Menu" aria-expanded="false">☰</button>
</div><div class="mobile-menu" id="mobileMenu">${navLinks}${mobileExtra}<a class="m-cta" href="mailto:${soc.email}">Hire me</a></div></nav>

<main>
<!-- HERO -->
<section class="hero"><div class="container"><div class="hero-grid">
  <div class="hero-copy">
    <div class="status-chip"><span class="ping"></span>${esc(profile.available)}</div>
    <h1>${esc(profile.heroName)}</h1>
    <div class="role-line">&gt; <span class="typed" id="typed"></span><span class="cursor">&nbsp;</span></div>
    <p class="summary">${esc(profile.summary)}</p>
    <div class="cta">
      <a class="btn btn-primary" href="mailto:${soc.email}">${ic("mail")} Get in touch</a>
      <a class="btn btn-ghost" href="${soc.github}" target="_blank" rel="noopener">${ic("github")} GitHub</a>
      <a class="btn btn-ghost" href="${soc.linkedin}" target="_blank" rel="noopener">${ic("linkedin")} LinkedIn</a>
    </div>
  </div>
  <div class="terminal reveal">
    <div class="term-bar"><span class="d d1"></span><span class="d d2"></span><span class="d d3"></span><span class="t">m14r41@sec · zsh</span></div>
    <div class="term-body">
      <div class="l"><span class="p">m14r41@sec</span>:<span class="k">~</span>$ id</div>
      <div class="l"><span class="c">uid</span>=<span class="s">1337</span>(<span class="s">consultant</span>) <span class="c">groups</span>=<span class="s">offsec,research</span></div>
      <div class="l"><span class="p">m14r41@sec</span>:<span class="k">~</span>$ specs</div>
      <div class="l"><span class="s">Ryzen 10</span> · <span class="s">8GB GPU</span> · <span class="s">64GB DDR6 RAM</span></div>
      <div class="l"><span class="p">m14r41@sec</span>:<span class="k">~</span>$ sudo find / -name <span class="s">'*.bug'</span></div>
      <div class="l"><span class="p">[+]</span> <span class="s">50+</span> found · all reported responsibly</div>
      <div class="l"><span class="p">m14r41@sec</span>:<span class="k">~</span>$ <span class="cursor">&nbsp;</span></div>
    </div>
  </div>
</div>
<div class="stats">${statsHtml}</div>
</div></section>

<!-- ABOUT -->
<section id="about"><div class="container">
  <span class="eyebrow">${ic("terminal")} whoami</span>
  <h2 class="section-head reveal">About <span class="hl">Me</span></h2>
  <div class="about-grid">
    <div class="about-body reveal">${aboutHtml}</div>
    <div class="about-side">${factHtml}</div>
  </div>
</div></section>

<!-- SKILLS & ARSENAL -->
<section id="arsenal"><div class="container">
  <span class="eyebrow">${ic("shield")} What I do</span>
  <h2 class="section-head reveal">Skills &amp; <span class="hl">Arsenal</span></h2>
  <p class="section-sub reveal">The domains I work across.</p>
  <div class="arsenal-grid eq-grid">${arsenalHtml}</div>
</div></section>

<!-- EXPERIENCE -->
<section id="experience"><div class="container">
  <span class="eyebrow">${ic("briefcase")} Career</span>
  <h2 class="section-head reveal">Experience</h2>
  <p class="section-sub reveal">Where I've worked.</p>
  <div class="timeline">${expHtml}</div>
</div></section>

<!-- PROJECTS -->
<section id="projects"><div class="container">
  <span class="eyebrow">${ic("folder")} Open source</span>
  <h2 class="section-head reveal">Featured <span class="hl">Projects</span></h2>
  <p class="section-sub reveal">Open-source tools I build and maintain.</p>
  <div class="cards eq-grid">${projHtml}</div>
</div></section>

<!-- CVE SHOWCASE -->
<section id="cves"><div class="container">
  <span class="eyebrow">${ic("bug")} Disclosures</span>
  <h2 class="section-head reveal">50+ <span class="hl">CVEs</span> Assigned</h2>
  <p class="section-sub reveal">A sample of CVE IDs credited to me, each verifiable on cve.org.</p>
  <div class="cve-wrap reveal">
    <div class="cve-top"><span class="cve-num">${cves.length}+</span>
      <div class="meta">Publicly assigned CVE identifiers across web, API and application targets.<br/>All independently disclosed and acknowledged.</div></div>
    <div class="marquee"><div class="marquee-track">${chips(rowA)}</div></div>
    <div class="marquee"><div class="marquee-track rev">${chips(rowB)}</div></div>
  </div>
</div></section>

<!-- WRITEUPS -->
<section id="writeups"><div class="container">
  <span class="eyebrow">${ic("pen")} Research</span>
  <h2 class="section-head reveal">Articles &amp; <span class="hl">Writing</span></h2>
  <p class="section-sub reveal">Long-form guides on offensive security, published on Medium and my blog.</p>
  <div class="cards eq-grid">${writeHtml}</div>
</div></section>

<!-- CERTIFICATIONS -->
<section id="certs"><div class="container">
  <span class="eyebrow">${ic("badge")} Credentials</span>
  <h2 class="section-head reveal">Certifications</h2>
  <p class="section-sub reveal">Credentials in offensive and application security.</p>
  <div class="grid-2">${certHtml}</div>
</div></section>

<!-- EDUCATION -->
<section id="education"><div class="container">
  <span class="eyebrow">${ic("cap")} Academics</span>
  <h2 class="section-head reveal">Education</h2>
  <div class="edu-grid eq-grid">${eduHtml}</div>
</div></section>

<!-- RECOGNITION (moved above hobbies) -->
<section id="recognition" class="recognition-section"><div class="container">
  <span class="eyebrow">${ic("award")} Acknowledgements</span>
  <h2 class="section-head reveal">Recognition &amp; <span class="hl">Hall of Fame</span></h2>
  <p class="section-sub reveal">Organisations and bodies that have credited my disclosures.</p>
  <div class="recog-grid eq-grid">${recogHtml}</div>
</div></section>

<!-- HOBBIES -->
<section id="hobbies"><div class="container">
  <span class="eyebrow">${ic("flag")} Off the clock</span>
  <h2 class="section-head reveal">Hobbies &amp; <span class="hl">Interests</span></h2>
  <div class="hobby-grid eq-grid">${hobbyHtml}</div>
</div></section>

<!-- CONTACT -->
<section id="contact" class="contact"><div class="container"><div class="contact-card reveal">
  <span class="eyebrow" style="justify-content:center">${ic("mail")} Get in touch</span>
  <h2 class="section-head">Let's build something <span class="hl">secure</span></h2>
  <p class="contact-lead">Open to consulting and research work. Reach me on any of these.</p>
  <div class="social-row">
    <a class="social-btn" href="mailto:${soc.email}">${ic("mail")} Email</a>
    <a class="social-btn" href="${soc.github}" target="_blank" rel="noopener">${ic("github")} GitHub</a>
    <a class="social-btn" href="${soc.linkedin}" target="_blank" rel="noopener">${ic("linkedin")} LinkedIn</a>
    <a class="social-btn" href="${soc.medium}" target="_blank" rel="noopener">${ic("medium")} Medium</a>
    <a class="social-btn" href="${soc.tryhackme}" target="_blank" rel="noopener">${ic("flag")} TryHackMe</a>
    <a class="social-btn" href="${soc.hackthebox}" target="_blank" rel="noopener">${ic("hackerone")} Hack The Box</a>
  </div>
</div></div></section>
</main>

<!-- FOOTER -->
<footer><div class="container">
  <div class="foot-grid">
    <div class="foot-brand">
      <a class="brand" href="#top"><img class="logo-img" src="./avatar.png" width="441" height="441" alt="M14R41" /><span class="word">M14R41</span></a>
      <p>${esc(profile.title)} and independent security researcher. 50+ CVEs and several Hall of Fame credits.</p>
      <div class="foot-social">
        <a href="${soc.github}" target="_blank" rel="noopener" aria-label="GitHub">${ic("github")}</a>
        <a href="${soc.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ic("linkedin")}</a>
        <a href="${soc.twitter}" target="_blank" rel="noopener" aria-label="Twitter">${ic("twitter")}</a>
        <a href="${soc.medium}" target="_blank" rel="noopener" aria-label="Medium">${ic("medium")}</a>
        <a href="${soc.tryhackme}" target="_blank" rel="noopener" aria-label="TryHackMe">${ic("flag")}</a>
        <a href="${soc.hackthebox}" target="_blank" rel="noopener" aria-label="Hack The Box">${ic("hackerone")}</a>
        <a href="${soc.website}" target="_blank" rel="noopener" aria-label="Website">${ic("globe")}</a>
      </div>
    </div>
    <div class="foot-col"><h4>Navigate</h4>
      <a href="#about">About</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#cves">CVEs</a></div>
    <div class="foot-col"><h4>More</h4>
      <a href="#writeups">Articles</a><a href="#certs">Certifications</a><a href="#education">Education</a><a href="#recognition">Recognition</a></div>
    <div class="foot-col"><h4>Connect</h4>
      <a href="mailto:${soc.email}">Email</a><a href="${soc.blog}" target="_blank" rel="noopener">Blog</a><a href="${soc.medium}" target="_blank" rel="noopener">Medium</a><a href="${soc.website}" target="_blank" rel="noopener">Website</a></div>
  </div>
  <div class="foot-bottom">
    <span>© <span id="year">${year}</span> ${esc(profile.name)} · ${esc(profile.handle)}</span>
    <span>${esc(profile.location)} · Built with care</span>
  </div>
</div></footer>

<a class="totop" id="totop" href="#top" aria-label="Back to top">${ic("arrow")}</a>

<script>
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }));

  // Dropdowns (click toggle for touch + hover via CSS)
  document.querySelectorAll('.dropdown .dd-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = btn.closest('.dropdown');
      const isOpen = dd.classList.contains('open');
      document.querySelectorAll('.dropdown.open').forEach(d => { d.classList.remove('open'); d.querySelector('.dd-btn').setAttribute('aria-expanded','false'); });
      if (!isOpen) { dd.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });
  document.addEventListener('click', () => document.querySelectorAll('.dropdown.open').forEach(d => { d.classList.remove('open'); d.querySelector('.dd-btn').setAttribute('aria-expanded','false'); }));

  // Typed roles
  const roles = ${JSON.stringify(profile.roles)};
  const el = document.getElementById('typed');
  let r = 0, c = 0, del = false;
  (function type(){
    const word = roles[r];
    el.textContent = word.slice(0, c);
    if (!del && c < word.length) { c++; setTimeout(type, 70); }
    else if (!del && c === word.length) { del = true; setTimeout(type, 1600); }
    else if (del && c > 0) { c--; setTimeout(type, 34); }
    else { del = false; r = (r + 1) % roles.length; setTimeout(type, 250); }
  })();

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(n => io.observe(n));

  // Animated stat counters
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const node = e.target, to = +node.dataset.to; let cur = 0;
      const step = Math.max(1, Math.round(to / 38));
      const tick = () => { cur += step; if (cur >= to) { node.textContent = to; } else { node.textContent = cur; requestAnimationFrame(tick); } };
      tick(); countIO.unobserve(node);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.count').forEach(n => countIO.observe(n));

  // Scroll progress + nav state
  const progress = document.getElementById('progress');
  const nav = document.getElementById('nav');
  const toTop = document.getElementById('totop');
  const sections = [...document.querySelectorAll('main section[id]')];
  const navAnchors = [...document.querySelectorAll('.nav-links > a:not(.nav-cta)')];
  function onScroll(){
    const h = document.documentElement;
    const sc = h.scrollTop, max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (sc / max) * 100 : 0) + '%';
    nav.classList.toggle('scrolled', sc > 20);
    toTop.classList.toggle('show', sc > 600);
    let cur = '';
    for (const s of sections) { if (s.getBoundingClientRect().top <= 120) cur = s.id; }
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Footer year, always current (no rebuild needed)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
</script>
</body>
</html>`;

mkdirSync("dist", { recursive: true });
writeFileSync("dist/index.html", html);
copyFileSync("src/styles/global.css", "dist/styles.css");
copyFileSync("public/favicon.svg", "dist/favicon.svg");
copyFileSync("public/avatar.png", "dist/avatar.png");
copyFileSync("public/CNAME", "dist/CNAME");
writeFileSync("dist/.nojekyll", "");
console.log(`Built dist/ · ${cves.length} CVEs, ${experience.length} roles, ${projects.length} projects, ${arsenal.length} domains, ${(html.length/1024).toFixed(1)}KB HTML`);
