# VISHNU SREEKUMAR — PORTFOLIO SECTIONS IMPLEMENTATION GUIDE
> Complete prompt guide for all remaining sections.
> Implement in order: 03 → 04 → 05 → 06 → 07
> Color system: BG #0B0B0D · Accent #7BA7C4 · Light #B8D4E8 · Dark #1A1A2E

---

## IMPLEMENTATION ORDER

| # | Section | Priority | Complexity |
|---|---------|----------|------------|
| 03 | Experience Timeline | HIGH | Medium |
| 04 | Selected Work / Projects | HIGH | High |
| 05 | Education & Certifications | MEDIUM | Low |
| 06 | Contact | HIGH | Low |
| 07 | Footer | LOW | Low |

---

## SECTION 03 — EXPERIENCE TIMELINE

### What to build
A vertical timeline showing 3 work experiences.
Left side has the timeline line + dots.
Right side has animated cards that slide in on scroll.
Current job has a glowing active dot.

### Implementation prompt

```
Add the Experience section to index.html and style.css.
Place it AFTER the skills section. Do not touch other sections.

# EXPERIENCE SECTION

## Layout
- Background: #0B0B0D
- Section padding: 120px 80px desktop, 60px 24px mobile
- Section tag: pulsing dot + "Experience" (same style as about/skills)
- Title: "Where I've " + "shipped work" (shipped work in #7BA7C4)
  font-size: clamp(28px, 4vw, 48px), font-weight: 800
- Subtitle: "3 companies · 2+ years · Dubai & India"
  font-size: 13px, color: #444

## Timeline Structure
- Left vertical line:
  width: 1px
  background: linear-gradient(180deg, #7BA7C4, #1a2030 80%)
  positioned at left: 8px of .timeline container

- Timeline container: position relative, padding-left: 48px

- Each entry has:
  - Dot on the line (position absolute, left: -40px, top: 8px)
    width: 14px, height: 14px, border-radius: 50%
    border: 2px solid #7BA7C4, background: #0B0B0D
  - CURRENT job dot: background filled #7BA7C4
    + outer ring animation: box-shadow pulse in #7BA7C440
  - Card to the right of the dot

## Timeline Cards
Each card:
- background: #0d0f14
- border: 1px solid #1a2030
- border-radius: 14px, padding: 24px
- hover: border-color #7BA7C430, translateY(-2px)
- transition: all 0.3s

Card layout:
TOP ROW (flex, space-between):
  LEFT: Company name (13px, bold, white)
        Role (11px, color #7BA7C4, margin-top 2px)
  RIGHT: Period badge
         background: #111620, border: 1px solid #1a2030
         border-radius: 100px, padding: 4px 12px
         font-size: 9px, color: #444

BULLET POINTS (margin-top 12px):
  list-style: none
  Each li: font-size 10px, color #555, line-height 1.7
  padding-left: 14px, position relative
  ::before → "→" color #7BA7C430, position absolute, left 0

TECH TAGS (margin-top 14px):
  Small pills: font-size 8px, padding 3px 8px
  border-radius: 4px, border: 1px solid #1a2030, color #555

## Entry 1 — CURRENT (active dot with pulse)
Company: NARA Desert Escape — Dubai, UAE
Role: Digital System Developer (Frontend & Automation Lead)
Period: Dec 2024 – Present
Bullet points:
→ Built internal React.js apps replacing manual workflows across venues
→ Pixel-perfect UIs from Figma using React + Tailwind CSS
→ REST API integrations: Meta Graph API, GA4, Google Ads, Airtable, Notion
→ AI-powered dashboards using Claude API and GPT API
→ Multi-step automation workflows in n8n and Zapier
→ Full technical documentation for all frontend systems
Tech tags: React.js · Claude API · n8n · Tailwind CSS · MySQL · Node.js · Zapier

## Entry 2
Company: DKV International Real Estate & DKV General Trading — Dubai, UAE
Role: Full Stack Developer & IT Administrator
Period: Mar 2024 – Dec 2024
Bullet points:
→ Built dkvrealestate.com from scratch — WordPress + Houzez
→ Full WooCommerce e-commerce platform for DKV General Trading
→ SEO-optimised 300+ real estate + 500+ e-commerce listings
→ n8n automation for lead tracking and CRM data management
→ Claude API prompt pipeline for automated property descriptions
→ Microsoft 365, Hostinger, LiteSpeed, SSL, DNS administration
Tech tags: WordPress · WooCommerce · Claude API · n8n · PHP · MySQL · AWS

## Entry 3
Company: QuantumTech IT Solution — Bengaluru, India
Role: Web Development Intern
Period: May 2024 – Jul 2024
Bullet points:
→ Developed responsive websites and landing pages for clients
→ REST API backend integration, testing and debugging
→ UI bug fixes and frontend implementation support
Tech tags: HTML · CSS · JavaScript · REST API · PHP

## Scroll Animations (GSAP ScrollTrigger)
- Section header: y:30→0, opacity 0→1, start "top 80%"
- Timeline line: scaleY 0→1 from top, duration 1s
- Each card: x:-30→0, opacity 0→1, stagger 0.15s
- Dots: scale 0→1, stagger 0.15s, spring ease
- Tech tags: stagger 0.03s, y:10→0, opacity 0→1

## Mobile (<768px)
- Timeline left padding: 24px
- Dot left offset: -20px
- Card padding: 16px
- Tech tags: wrap freely
- Period badge: move below role on small screens

## Files
- index.html: add experience section after skills section
- style.css: add under /* === EXPERIENCE SECTION === */
- main.js: add under // === EXPERIENCE ANIMATIONS ===
```

---

## SECTION 04 — SELECTED WORK / PROJECTS

### What to build
12 project cards in a 3-column grid with category filter tabs.
Each card has a colored image area, category tag, name, description, stack badges.
Image area zooms on hover (image only, not container).
Filter tabs: All | Web & Apps | AI & Automation | WordPress

### Implementation prompt

```
Add the Selected Work section to index.html and style.css.
Place it AFTER the experience section. Do not touch other sections.

# SELECTED WORK SECTION

## Layout
- Background: #0B0B0D
- Section padding: 120px 80px desktop, 60px 24px mobile
- Section tag: pulsing dot + "Selected Work"
- Title: "Projects that " + "speak" (speak in #7BA7C4)
  font-size: clamp(28px, 4vw, 48px), font-weight: 800
- Subtitle: "12 projects · Web · AI & Automation · WordPress"

## Filter Tab Row
Buttons: All | Web & Apps | AI & Automation | WordPress
- Default: color #FFFFFF, border 1px solid #2a2a2a
- Hover: border-color #7BA7C4, bg #7BA7C410
- Active: bg #7BA7C4, color #0B0B0D, border #7BA7C4
- border-radius: 100px, padding: 6px 18px

On click: matching cards stay, others fade out (opacity 0, scale 0.95)
Smooth transition: all 0.3s ease

## Project Grid
grid-template-columns: repeat(3, 1fr) — desktop
gap: 20px

## Project Card Structure
Each card:
- background: #0d0f14
- border: 1px solid #1a2030
- border-radius: 14px
- overflow: hidden
- transition: all 0.3s
- cursor: pointer
- hover: border-color #7BA7C440, translateY(-6px)
  box-shadow: 0 20px 60px rgba(74,144,217,0.1)

IMAGE AREA (height: 160px):
- background: #111620
- overflow: hidden
- Inner div scales on card hover: transform scale(1.08), transition 0.5s
- Contains centered icon in #7BA7C415 rounded square
  (icon represents the project category)
- Gradient overlay at bottom:
  linear-gradient(transparent, #0d0f14)

CARD BODY (padding: 16px):
- Category tag: 8px, #7BA7C4, uppercase, letter-spacing 0.1em
- Project name: 12px, font-weight 700, color #fff, margin-top 4px
- Description: 10px, color #555, line-height 1.6, margin-top 4px
- Stack badges row (margin-top 10px):
  font-size 7px, padding 2px 7px, border-radius 4px
  border: 1px solid #1a2030, color #555, gap 4px

## All 12 Projects

### WEB & APPS (data-pf="web")

PROJECT 1
Name: TechAssist AI
Category: AI-Powered IT Helpdesk
Description: Intelligent helpdesk with AI ticket routing,
knowledge base, and analytics dashboard
Stack: FastAPI · React · Tailwind · Claude API · SQLite
Icon: brain/cpu SVG

PROJECT 2
Name: NARA Pulse Manning
Category: Staff Management System
Description: Internal staffing app replacing WhatsApp
and spreadsheet workflows across hospitality venues
Stack: React · Node.js · MySQL · REST API
Icon: users SVG

PROJECT 3
Name: NARA AssetTracker
Category: System Architecture
Description: Asset management tracking hardware, software,
and SIMs with automated monitoring dashboard
Stack: React · Node.js · MySQL · Docker
Icon: database SVG

PROJECT 4
Name: DKV Real Estate CRM
Category: Web Application
Description: Custom CRM with lead management, automated
comms, and secure row-level security policies
Stack: React · Node.js · Supabase · RLS
Icon: home SVG

### AI & AUTOMATION (data-pf="ai")

PROJECT 5
Name: Competitor Price Monitor
Category: Automation & n8n Workflows
Description: Dual-workflow n8n system scraping 14 products
across 3 competitors with HTML email alerts
Stack: n8n · Google Sheets · Gmail · JavaScript
Icon: chart/graph SVG

PROJECT 6
Name: Marketing Report Automation
Category: API Integration
Description: Fully automated monthly reporting pulling GA4,
Meta Ads, Google Ads data into Notion pages
Stack: Zapier · GA4 API · Meta API · Notion
Icon: bar-chart SVG

PROJECT 7
Name: SEO Content Automation
Category: AI & Content Pipeline
Description: Prompt-driven content generation for 300+
property listings via Claude API and Yoast
Stack: n8n · Claude API · WordPress · Yoast
Icon: cpu/ai SVG

### WORDPRESS (data-pf="wp")

PROJECT 8
Name: dkvrealestate.com
Category: Real Estate Platform
Description: Custom real estate site with dynamic listings,
advanced filters, maps, and 300+ SEO pages
Stack: WordPress · Houzez · PHP · MySQL · Yoast
Icon: globe SVG

PROJECT 9
Name: dkvgeneraltrading.com
Category: E-Commerce Platform
Description: Full WooCommerce store with payment gateway,
shipping calculators, 500+ product listings
Stack: WordPress · WooCommerce · OceanWP · PHP
Icon: shopping-bag SVG

PROJECT 10
Name: raidfendtechnologies.com
Category: WordPress Development
Description: Tech company site with custom PHP plugin,
popup contact form, MySQL storage, email automation
Stack: WordPress · Custom PHP Plugin · MySQL
Icon: shield SVG

PROJECT 11
Name: Yuvantar Platform
Category: Educational Web Development
Description: Educational organization site with brand
styling, admissions pages, custom header/footer
Stack: WordPress · Astra · Elementor · Hostinger
Icon: book SVG

PROJECT 12
Name: allianceedu.com & 800itcare.com
Category: Multi-Site WordPress
Description: Responsive multi-page sites for education
and IT services with lead capture and SEO structure
Stack: WordPress · Elementor · PHP · Yoast
Icon: layers SVG

## Scroll Animations (GSAP ScrollTrigger)
- Section header: y:30→0, opacity 0→1
- Filter row: fadeIn, delay 0.15s
- Project cards: stagger 0.06s, y:50→0, opacity 0→1
  scale 0.95→1, start "top 85%"

## Mobile (<768px)
- Grid: 1 column
- Filter: wrap, 2 per row
- Card image height: 120px

## Files
- index.html: add work section after experience
- style.css: add under /* === WORK SECTION === */
- main.js: add under // === WORK ANIMATIONS ===
```

---

## SECTION 05 — EDUCATION & CERTIFICATIONS

### What to build
Two rows: education cards on top, certification cards below.
Education: 2 cards side by side.
Certifications: 3 cards with a colored top border accent.

### Implementation prompt

```
Add the Education & Certifications section to index.html and style.css.
Place it AFTER the work section. Do not touch other sections.

# EDUCATION & CERTIFICATIONS SECTION

## Layout
- Background: #0B0B0D
- Section padding: 120px 80px desktop, 60px 24px mobile
- Section tag: pulsing dot + "Education & Certifications"
- Title: "Learning never " + "stops" (stops in #7BA7C4)
  font-size: clamp(28px, 4vw, 48px), font-weight: 800
- Subtitle: "2 degrees · 3 certifications"

## Education Cards Row
grid-template-columns: 1fr 1fr, gap 16px

Each education card:
- background: #0d0f14
- border: 1px solid #1a2030
- border-radius: 14px, padding: 24px
- hover: border-color #7BA7C430, translateY(-4px)

Card contents:
- Icon in 40x40 rounded square
  bg: #111620, border: 1px solid #7BA7C420
  icon: graduation cap SVG, stroke #7BA7C4
- Degree name: 13px, font-weight 700, color #fff, margin-top 14px
- University: 11px, color #7BA7C4, margin-top 4px
- Period: 9px, color #444, margin-top 4px
- Country tag pill: 8px, border 1px solid #1a2030,
  color #555, border-radius 100px, padding 3px 10px

EDUCATION 1:
Degree: Bachelor of Computer Applications (BCA)
University: Bangalore University
Period: Jan 2021 – Oct 2024
Country: India

EDUCATION 2:
Degree: +2 Computer Science
University: KRIST RAJ HSS
Period: Jun 2019 – Jun 2021
Country: India

## Certifications Row (below education, margin-top 20px)
grid-template-columns: repeat(3, 1fr), gap 14px

Each cert card:
- background: #0d0f14
- border: 1px solid #1a2030
- border-radius: 12px, padding: 18px
- position: relative, overflow: hidden
- hover: border-color #7BA7C430
- TOP ACCENT BAR:
  position absolute, top 0, left 0, right 0
  height: 2px, background: #7BA7C4

Card contents:
- Cert title: 11px, font-weight 700, color #fff
- Organization: 10px, color #7BA7C4, margin-top 4px
- Date: 9px, color #444, margin-top 3px
- Skills badge pill:
  display inline-block, margin-top 8px
  background: #7BA7C410, border: 1px solid #7BA7C430
  color: #7BA7C4, font-size: 8px
  padding: 3px 10px, border-radius: 100px

CERT 1:
Title: Cloud & DevOps Training Program
Organization: Intellipaat — Bengaluru
Date: Oct 2024 – Present
Badge: AWS · Docker · CI/CD

CERT 2:
Title: AWS Course Certification Training
Organization: Intellipaat
Date: 2024
Badge: Amazon Web Services

CERT 3:
Title: AWS Technical Essentials
Organization: Intellipaat
Date: 2024
Badge: EC2 · RDS · IAM · Route53

## Scroll Animations (GSAP ScrollTrigger)
- Section header: y:30→0, opacity 0→1
- Education cards: stagger 0.1s, y:40→0, opacity 0→1
- Cert cards: stagger 0.08s, y:30→0, opacity 0→1
  scale 0.95→1

## Mobile (<768px)
- Education grid: 1 column
- Cert grid: 1 column

## Files
- index.html: add after work section
- style.css: add under /* === EDUCATION SECTION === */
- main.js: add under // === EDUCATION ANIMATIONS ===
```

---

## SECTION 06 — CONTACT

### What to build
A large centered card with big heading, 4 contact link cards,
two CTA buttons, and a pulsing availability badge.

### Implementation prompt

```
Add the Contact section to index.html and style.css.
Place it AFTER the education section. Do not touch other sections.

# CONTACT SECTION

## Layout
- Background: #0B0B0D
- Section padding: 120px 80px desktop, 60px 24px mobile
- Section tag: pulsing dot + "Contact"

## Main Contact Card
- background: #0d0f14
- border: 1px solid #1a2030
- border-radius: 20px, padding: 48px
- position: relative, overflow: hidden

DECORATIVE ELEMENTS (pointer-events none):
- Top right circle:
  position absolute, top -80px, right -80px
  width: 280px, height: 280px, border-radius: 50%
  background: #7BA7C405
- Bottom left circle:
  position absolute, bottom -60px, left -60px
  width: 200px, height: 200px, border-radius: 50%
  background: #7BA7C403

HEADING:
"Let's build " + "something" (something in #7BA7C4)
font-size: clamp(28px, 4vw, 52px)
font-weight: 800, letter-spacing: -0.02em

SUBTEXT (margin-top 8px):
"Available for freelance projects · Dubai, UAE · Open to remote"
font-size: 13px, color: #555

## Contact Links Grid (margin-top 32px)
grid-template-columns: 1fr 1fr, gap 12px

Each link card:
- display: flex, align-items: center, gap: 12px
- background: #111620
- border: 1px solid #1a2030
- border-radius: 10px, padding: 14px 18px
- transition: border-color 0.3s, translateY(-2px)
- hover: border-color #7BA7C440

Icon box (32x32):
- background: #0B0B0D
- border: 1px solid #7BA7C430, border-radius: 8px
- SVG icon stroke: #7BA7C4, width 14px

Text block:
- Label: font-size 9px, color #444, display block
- Value: font-size 11px, color #fff, font-weight 600

LINK 1:
Icon: email/envelope SVG
Label: Email
Value: vishnuss860@gmail.com

LINK 2:
Icon: LinkedIn SVG
Label: LinkedIn
Value: linkedin.com/in/vishnu-s-44a436250

LINK 3:
Icon: GitHub SVG
Label: GitHub
Value: github.com/Vfxchu

LINK 4:
Icon: location pin SVG
Label: Location
Value: Dubai, UAE

## CTA Buttons (margin-top 28px)
Row: display flex, gap 12px

BUTTON 1 — Primary:
"Get in touch"
background: #7BA7C4, color: #0B0B0D
padding: 14px 32px, border-radius: 100px
font-size: 13px, font-weight: 700, border: none
hover: background #B8D4E8
transition: all 0.3s

BUTTON 2 — Outline:
"Download CV"
background: transparent, color: #7BA7C4
border: 1px solid #7BA7C4
padding: 14px 32px, border-radius: 100px
font-size: 13px, font-weight: 600
hover: background #7BA7C410
transition: all 0.3s

## Availability Badge (margin-top 20px)
display: inline-flex, align-items center, gap 8px
background: #0d1a0d, border: 1px solid #1a4020
border-radius: 100px, padding: 8px 18px

- Pulsing green dot: 7px, background #4a9a5a
  animation: pulse 1.5s infinite
- Text: "Available for freelance — responding within 24hrs"
  font-size: 11px, color: #4a9a5a

## Scroll Animations (GSAP ScrollTrigger)
- Section tag: y:20→0, opacity 0→1
- Main card: y:50→0, opacity 0→1, scale 0.97→1
- Contact links: stagger 0.08s, x:-20→0, opacity 0→1
- Buttons: y:20→0, opacity 0→1, stagger 0.1s
- Badge: fadeIn, delay 0.4s

## Mobile (<768px)
- Contact grid: 1 column
- Card padding: 24px
- Buttons: stack vertically, full width
- Heading size reduced via clamp

## Files
- index.html: add after education section
- style.css: add under /* === CONTACT SECTION === */
- main.js: add under // === CONTACT ANIMATIONS ===
```

---

## SECTION 07 — FOOTER

### What to build
Minimal dark footer. Logo left, links center, social right.
Copyright line at the very bottom.

### Implementation prompt

```
Add the Footer to index.html and style.css.
Place it as the very last element before closing body tag.

# FOOTER

## Layout
- Background: #070709 (slightly darker than main bg)
- border-top: 1px solid #111620
- padding: 40px 80px desktop, 24px mobile

## Top Row (flex, space-between, align-items center)

LEFT: Logo
"VS." — font-size 18px, font-weight 800, color #7BA7C4

CENTER: Nav links (flex, gap 32px)
About · Skills · Work · Experience · Contact
font-size: 11px, color: #444
hover: color #fff, transition 0.2s

RIGHT: Social links (flex, gap 16px)
Each: 32x32, border-radius 8px
border: 1px solid #1a2030, bg transparent
hover: border-color #7BA7C440, bg #7BA7C410
SVG icons: GitHub, LinkedIn — stroke #7BA7C4, 14px

## Bottom Row (margin-top 32px, border-top 1px solid #111620, padding-top 20px)
flex, space-between, align-items center

LEFT:
"© 2025 Vishnu Sreekumar · Dubai, UAE"
font-size: 10px, color: #333

RIGHT:
"Built with React · Three.js · GSAP"
font-size: 10px, color: #333

## Mobile (<768px)
- Stack all rows vertically, center aligned
- Nav links: wrap, justify center
- Social: justify center

## Files
- index.html: add footer before </body>
- style.css: add under /* === FOOTER === */
```

---

## GLOBAL RULES — APPLY TO ALL SECTIONS

```
CRITICAL: Apply these rules across ALL sections

1. BACKGROUND: Always #0B0B0D — no exceptions

2. SECTION TAGS: All sections use identical tag style
   pulsing dot (#7BA7C4, animation pulse 2s) + label text
   font-size 10px, letter-spacing 0.15em, uppercase, color #7BA7C4

3. SECTION TITLES: All use same pattern
   font-size: clamp(28px, 4vw, 48px), font-weight: 800
   letter-spacing: -0.02em
   First part: white (#fff)
   Key word: accent (#7BA7C4)

4. CARDS: All cards use identical base:
   background: #0d0f14
   border: 1px solid #1a2030
   hover border: #7BA7C430
   border-radius: 14px

5. SCROLL ANIMATIONS: All use GSAP ScrollTrigger
   start: "top 80%", once: true
   Standard: y:30→0, opacity 0→1

6. BUTTONS: Two types only
   Primary: bg #7BA7C4, color #0B0B0D, hover #B8D4E8
   Outline: border #7BA7C4, color #7BA7C4, hover bg #7BA7C410
   Both: border-radius 100px, padding 12px 28px

7. NO BREAKING: Each section is self-contained
   Never touch hero, canvas, scrubEngine, or shader files

8. MOBILE FIRST: Every section must work on 320px+
   Use clamp() for all font sizes
   Grid must collapse gracefully
```

---

## COMPLETE SECTION ORDER IN index.html

```html
<header> <!-- fixed nav -->
<main>
  <section id="hero">       <!-- 01 DONE -->
  <section id="about">      <!-- 02 DONE -->
  <section id="skills">     <!-- 03 DONE -->
  <section id="experience"> <!-- 04 — BUILD NEXT -->
  <section id="work">       <!-- 05 — THEN THIS -->
  <section id="education">  <!-- 06 — THEN THIS -->
  <section id="contact">    <!-- 07 — THEN THIS -->
</main>
<footer>                    <!-- 08 — LAST -->
```

---

*Generated for Vishnu Sreekumar — Portfolio Build 2025*
*Colors: #0B0B0D · #7BA7C4 · #B8D4E8 · #1A1A2E*
