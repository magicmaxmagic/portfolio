# Portfolio Architecture & Structure

---

## 1. ROUTING & URL STRATEGY

### Route Map

```
/                           → Home (hero, expertise, CTA)
/projects                   → Projects index (grid/list of all projects)
/projects/attribution-mmm   → Project detail: Attribution at Ubisoft
/projects/medical-ner       → Project detail: Medical NLP
/projects/text-clustering   → Project detail: Voice of Customer
/projects/prevent-saas      → Project detail: Prevent vulnerability detection
/about                      → About (philosophy, approach, background)
/tech-stack                 → Tech stack (categorized tools)
/contact                    → Contact (CTA, links, quick facts)
```

### URL Design Rationale

- **Slugified project names**: Easy to read, SEO-friendly, memorable
- **`/projects` prefix**: Hierarchical, clear content structure
- **No trailing slashes**: Canonical URLs (Next.js handles this)
- **No version numbers**: Keep URLs stable as content evolves
- **Short routes**: Maximum 3 segments (helps with load time perception)

### SEO Considerations

- Routes are crawlable and shareable
- Meta tags handled per-route (title, description, OG image)
- Sitemap generated dynamically from MDX projects
- Canonical tags on duplicate content (if any)

---

## 2. FILE & FOLDER STRUCTURE

### Full Directory Tree

```
portfolio/
├── .env.local                    # Environment variables (API keys, external services)
├── .gitignore
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind setup
├── postcss.config.js             # PostCSS setup
├── tsconfig.json                 # TypeScript config
├── package.json
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (head, fonts, providers)
│   ├── page.tsx                  # Home page
│   ├── not-found.tsx             # 404 page
│   ├── globals.css               # Global styles
│   │
│   ├── projects/
│   │   ├── page.tsx              # Projects index (/projects)
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic project detail (/projects/[slug])
│   │
│   ├── about/
│   │   └── page.tsx              # About page
│   │
│   ├── tech-stack/
│   │   └── page.tsx              # Tech stack page
│   │
│   └── contact/
│       └── page.tsx              # Contact page
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Navigation + logo (server)
│   │   ├── Footer.tsx            # Footer with links (server)
│   │   └── Container.tsx         # Responsive max-width wrapper (server)
│   │
│   ├── sections/
│   │   ├── HomeHero.tsx          # Home page hero section (server)
│   │   ├── ExpertisePillars.tsx  # 3-column expertise display (server)
│   │   ├── CredibilityBadges.tsx # Experience highlights (server)
│   │   ├── ProjectGrid.tsx       # Projects display (server)
│   │   └── CallToAction.tsx      # CTA button groups (server)
│   │
│   ├── project/
│   │   ├── ProjectCard.tsx       # Reusable project card (server)
│   │   ├── ProjectMeta.tsx       # Metadata strip (date, role, stack) (server)
│   │   ├── ProjectNav.tsx        # Next/prev project navigation (server)
│   │   └── TableOfContents.tsx   # Generated TOC for long projects (client)
│   │
│   ├── mdx/
│   │   ├── CodeBlock.tsx         # Syntax-highlighted code (server + client)
│   │   ├── Callout.tsx           # Info/warning callouts (server)
│   │   ├── Math.tsx              # KaTeX math rendering (client)
│   │   ├── Link.tsx              # Custom link handling (server)
│   │   ├── Image.tsx             # Optimized image with Next Image (server)
│   │   └── components.ts         # MDX component registry (server)
│   │
│   ├── util/
│   │   ├── Button.tsx            # Reusable button (server)
│   │   ├── Badge.tsx             # Tag/label badges (server)
│   │   ├── Divider.tsx           # Visual separator (server)
│   │   └── Tooltip.tsx           # Hover tooltip (client, minimal)
│   │
│   └── icons/
│       ├── GitHub.tsx            # Icon components (server)
│       ├── LinkedIn.tsx
│       ├── Mail.tsx
│       └── ExternalLink.tsx
│
├── content/
│   ├── projects/
│   │   ├── attribution-mmm.mdx   # Marketing Attribution project
│   │   ├── medical-ner.mdx       # Medical NLP project
│   │   ├── text-clustering.mdx   # Voice of Customer project
│   │   └── prevent-saas.mdx      # Prevent SaaS project
│   │
│   └── pages/
│       ├── about.mdx             # About page content (optional: can be in page.tsx)
│       ├── tech-stack.mdx        # Tech stack (optional)
│       └── contact.mdx           # Contact (optional)
│
├── lib/
│   ├── projects.ts               # Project indexing & loading logic
│   ├── metadata.ts               # Meta tag generation utilities
│   ├── date.ts                   # Date formatting utilities
│   ├── constants.ts              # Site-wide constants (author, site URL, etc.)
│   └── types.ts                  # TypeScript types (ProjectMeta, etc.)
│
├── styles/
│   ├── typography.css            # Font scales and weights
│   ├── spacing.css               # Spacing utilities (if custom)
│   └── utilities.css             # Custom utility classes
│
├── public/
│   ├── og/
│   │   ├── home.png              # OG image for home
│   │   ├── attribution-mmm.png   # OG images for projects
│   │   ├── medical-ner.png
│   │   ├── text-clustering.png
│   │   └── prevent-saas.png
│   │
│   ├── favicon.ico               # Favicon
│   └── robots.txt                # SEO robots file
│
└── .vercel/
    └── functions/
        └── [[...path]].func/    # Optional: Vercel functions for analytics
```

### Component Placement Rationale

- **layout/** → Persistent UI (header, footer)
- **sections/** → Full-width page sections, composable
- **project/** → Project-specific components
- **mdx/** → Markdown rendering components
- **util/** → Reusable primitives (buttons, badges)
- **icons/** → SVG icon components (cheap to render)

### Content Organization Rationale

- **content/projects/** → One `.mdx` file per project (easy to add new projects)
- **content/pages/** → Optional; if pages are mostly MDX, put here; otherwise, content is in `page.tsx` directly
- **Frontmatter in each `.mdx`** → Title, summary, tags, date, role, stack, estimated reading time

---

## 3. PROJECT CONTENT STRATEGY

### MDX Frontmatter Schema

Every project `.mdx` file starts with YAML frontmatter:

```yaml
---
title: "Marketing Attribution & MMM at Scale – Ubisoft"
summary: "Designed end-to-end attribution modeling pipeline combining Markov chains, removal effect, and Bayesian MMM."
slug: "attribution-mmm"
date: "2025-06-15"              # Project completion date
role: "Data Scientist"            # Your role
company: "Ubisoft"                # Company/context
status: "shipped"                 # shipped | in-progress | case-study
readingTime: "12 min"
featured: true                    # Show on home page
featuredOrder: 1                  # Featured project sort order
tags:
  - "Causal Inference"
  - "MLOps"
  - "Marketing Analytics"
  - "Python"
  - "Snowflake"
  - "Databricks"
  - "Metaflow"
stack:
  - Snowflake
  - Databricks
  - Metaflow
  - MLflow
  - PyMC3
  - Tableau
impact: "15% improvement in install efficiency across marketing channels"
---
```

### Project File Naming Convention

- **Slug format**: `kebab-case`, max 30 chars
- **File name matches slug**: `attribution-mmm.mdx` for `/projects/attribution-mmm`
- **Automated from slug**: No manual slug declaration needed in page.tsx

### Project Indexing Logic

**File: `lib/projects.ts`**

```typescript
export interface ProjectMeta {
  title: string;
  summary: string;
  slug: string;
  date: string;
  role: string;
  company: string;
  status: 'shipped' | 'in-progress' | 'case-study';
  readingTime: string;
  featured: boolean;
  featuredOrder: number;
  tags: string[];
  stack: string[];
  impact?: string;
}

// Load all projects from content/projects/*.mdx
export async function getAllProjects(): Promise<ProjectMeta[]> {}

// Load single project by slug
export async function getProjectBySlug(slug: string): Promise<{ meta: ProjectMeta; content: ReactNode }> {}

// Get featured projects (for home page)
export function getFeaturedProjects(projects: ProjectMeta[]): ProjectMeta[] {}

// Get related projects by tags
export function getRelatedProjects(slug: string, projects: ProjectMeta[]): ProjectMeta[] {}
```

### Adding a New Project

**Step 1:** Create `content/projects/new-project.mdx` with frontmatter
**Step 2:** Write MDX content using provided components
**Step 3:** Rebuild (Next.js auto-discovers)
**Step 4:** Project appears on `/projects` and can be linked from anywhere

**Total time:** < 5 minutes for structure, then content writing

---

## 4. PAGE TYPES & RESPONSIBILITIES

### Home (`/`)

**Purpose:** Immediate signal of seniority, credibility, and invitation to explore

**Must contain:**
- Hero headline + subheadline (< 20 seconds to read)
- 3 expertise pillars (visual summary of core strengths)
- Featured projects (2-3 top projects, clickable)
- Brief credibility section (previous companies, key results)
- Single clear CTA ("Explore Work" or "Get In Touch")

**Should NOT contain:**
- Full project case studies (link, don't embed)
- Detailed methodology explanations
- Every project (prioritize, feature top 3)
- Long-form prose (bullets and short sentences only)

**Component structure:**
```
Home
  ├─ Header (persistent)
  ├─ HomeHero
  ├─ ExpertisePillars
  ├─ ProjectGrid (featured=true, limit 3)
  ├─ CredibilityBadges
  ├─ CallToAction
  └─ Footer (persistent)
```

### Projects Index (`/projects`)

**Purpose:** Overview of all work; decision point for recruiter (which project to read?)

**Must contain:**
- Filter/sort options (by tag, by stack, by date)
- All projects displayed as cards
- Project cards show: title, summary, tags, reading time, company
- Clear visual distinction between featured and non-featured

**Should NOT contain:**
- Project content (link, don't embed)
- Duplicate hero section
- Long introductory text

**Component structure:**
```
ProjectsIndex
  ├─ Header
  ├─ ProjectFilters (client component for interactivity)
  ├─ ProjectGrid
  │  └─ ProjectCard (map over all projects)
  └─ Footer
```

### Project Detail (`/projects/[slug]`)

**Purpose:** Deep dive into one project; showcase thinking, decision-making, technical depth

**Must contain:**
- Project metadata (role, company, date, stack, impact)
- Full MDX content (headings, code, images, math)
- Table of contents (TOC) for navigation within long content
- Related projects (2-3 projects with similar tags)
- Navigation to next/previous project
- Clear path back to projects list

**Should NOT contain:**
- Other projects' content (link to them)
- Unrelated portfolio information
- Promotions or upsells (CTA only at bottom)

**Component structure:**
```
ProjectDetail
  ├─ Header
  ├─ ProjectMeta (title, company, date, tags)
  ├─ Container
  │  ├─ Divider
  │  ├─ Main content (MDX-rendered)
  │  ├─ ProjectNav (next/prev)
  │  └─ RelatedProjects
  ├─ CallToAction
  └─ Footer
```

### About (`/about`)

**Purpose:** Personal narrative; how you think about ML, what excites you, philosophy

**Must contain:**
- Professional narrative (2-3 paragraphs, accessible)
- Philosophy on applied ML (decision-orientation, systems thinking)
- What problems excite you
- Approach to decision-making
- Brief skills/tools summary

**Should NOT contain:**
- Traditional CV/resume information (that goes in projects)
- Academic credentials or publications (focus on applied work)
- Personal life details
- Detailed tool explanations (link to Tech Stack page instead)

**Component structure:**
```
About
  ├─ Header
  ├─ Container
  │  ├─ About content (JSX or MDX)
  │  └─ Divider + snippet linking to Tech Stack
  └─ Footer
```

### Tech Stack (`/tech-stack`)

**Purpose:** Detailed breakdown of tools, organized by layer and problem type

**Must contain:**
- Tools categorized (Data, ML, MLOps, etc.)
- Short explanation of why/how you use each tool
- Problem-type section (attribution, NLP, etc.) showing tool combinations
- What you DON'T use and why
- Learning & continuous improvement mindset

**Should NOT contain:**
- Complete feature lists of each tool (link to official docs)
- Comparative benchmarks (avoid bloat)
- Tools you don't actually use

**Component structure:**
```
TechStack
  ├─ Header
  ├─ Container
  │  ├─ TechStackCategory (repeated)
  │  │  ├─ Category title
  │  │  └─ ToolItem (tool + description, repeated)
  │  └─ ProblemTypeSection
  └─ Footer
```

### Contact (`/contact`)

**Purpose:** Clear call-to-action; remove friction from outreach

**Must contain:**
- Brief closing statement (1 paragraph, inviting)
- Email + links (GitHub, LinkedIn)
- What to include in an outreach message
- Quick facts (location, availability, languages)
- Strong CTA (make it obvious how to reach you)

**Should NOT contain:**
- Contact form (too many fields, low conversion)
- Social media links other than GitHub/LinkedIn
- Detailed job preferences (put in About or projects)

**Component structure:**
```
Contact
  ├─ Header
  ├─ Container
  │  ├─ Closing statement
  │  ├─ Contact methods (email, GitHub, LinkedIn)
  │  ├─ Divider
  │  ├─ What to include
  │  └─ Quick facts
  └─ Footer
```

---

## 5. COMPONENT ARCHITECTURE

### Server vs Client Decision Tree

**Server Components (default):**
- All layout components (Header, Footer, Container)
- All section components (HomeHero, ProjectGrid, etc.)
- All MDX rendering components (CodeBlock, Image, Link)
- Static metadata and projection

**Client Components (minimal):**
- ProjectFilters (needs interactivity: sorting, filtering)
- TableOfContents (needs scroll listener for highlight)
- Any component with hooks (useState, useEffect)
- Tooltips (if implemented)

**Rule:** Start with server components; switch to client only when interactivity is required.

### Reusable Components Inventory

#### Layout Components

**Header.tsx** (server)
- Logo + site name
- Navigation links: Home, Projects, About, Tech Stack, Contact
- Mobile menu toggle (CSS-based, no JS)
- No sticky header (scrolls naturally)

**Footer.tsx** (server)
- Copyright + year
- Links: GitHub, LinkedIn, Email
- "© 2026 Maxence Le Gendre"
- Minimal, single-row on desktop

**Container.tsx** (server)
- Responsive max-width wrapper
- Padding/margin for mobile/desktop
- Default max-width: 800px (reading width)
- Can accept `maxWidth` prop for wider sections

#### Section Components

**HomeHero.tsx** (server)
- Headline, subheadline, intro text
- Two CTA buttons (primary, secondary)
- No image, pure text

**ExpertisePillars.tsx** (server)
- 3 columns (stacked on mobile)
- Pillar title + description
- Icon optional
- Uses padding/spacing for separation

**CredibilityBadges.tsx** (server)
- Company + role + timeframe
- Key achievement/metric
- Array of badges, stacked layout

**ProjectGrid.tsx** (server)
- Maps over projects array
- Renders ProjectCard for each
- Grid: 2 columns desktop, 1 mobile
- Gutter spacing

**CallToAction.tsx** (server)
- Message + 1-2 buttons
- Can be inline or full-width
- Variants: primary (home), secondary (project bottom)

#### Project Components

**ProjectCard.tsx** (server)
- Title + summary
- Tags as badges
- Company, date, reading time
- Link to detail page
- Hover state (subtle shadow/color change)

**ProjectMeta.tsx** (server)
- Metadata strip at top of project page
- Role, Company, Date, Stack tags
- 2-column layout (desktop), stacked (mobile)
- Dividers between sections

**ProjectNav.tsx** (server)
- "← Previous Project" | "Next Project →"
- Both clickable links
- Can be null if no next/previous project
- Subtle styling, not prominent

**TableOfContents.tsx** (client)
- Generated from h2/h3 headings
- Fixed on right (desktop), sticky top (mobile)
- Highlights active section on scroll
- Uses IntersectionObserver for performance

#### MDX Components

**CodeBlock.tsx** (server + optional client for copy button)
- Syntax-highlighted code
- Language label (e.g., "python", "sql")
- Copy-to-clipboard button (optional, client)
- Line numbers (optional)
- Wrap long lines

**Callout.tsx** (server)
- Info, warning, tip variants
- Icon + title + children
- Subtle background color
- Left border for visual distinction

**Math.tsx** (client)
- Inline math with `$` delimiter
- Block math with `$$` delimiter
- Uses KaTeX for rendering
- Fallback to code if script fails

**Link.tsx** (server)
- Internal links use Next.js `<Link>`
- External links get `target="_blank"` + icon
- Consistent color + underline

**Image.tsx** (server)
- Uses Next.js Image for optimization
- Fallback to `<img>` if props don't match
- Responsive sizing
- Optional caption

#### Utility Components

**Button.tsx** (server)
- Variants: primary, secondary, ghost
- Sizes: small, base, large
- Full-width option
- Accessible (proper contrast, focus states)

**Badge.tsx** (server)
- Tag display (tech stack, categories)
- Variants: default, outline
- Clickable variant (for filters)
- Small padding, neutral color

**Divider.tsx** (server)
- Light gray line
- Optional margin
- Subtle visual separator

**Tooltip.tsx** (client, optional)
- Hover to reveal explanation
- Only use if absolutely necessary
- Keep portfolio simple; avoid over-engineering

#### Icon Components

All in `components/icons/` as SVG components:
- GitHub.tsx
- LinkedIn.tsx
- Mail.tsx
- ExternalLink.tsx
- ChevronRight.tsx
- ChevronLeft.tsx

All: `24x24` default size, accept `size` and `className` props, inline SVGs (no external files).

### MDX Component Registry

**File: `components/mdx/components.ts`**

```typescript
import { useMDXComponent } from 'next-mdx-remote/rsc';
import * as MDXComponents from './';

export const mdxComponents = {
  h1: (props) => <h1 className="text-4xl font-bold mt-12 mb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold mt-10 mb-3" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold mt-8 mb-2" {...props} />,
  h4: (props) => <h4 className="text-xl font-semibold mt-6 mb-2" {...props} />,
  p: (props) => <p className="text-base leading-7 mb-4" {...props} />,
  a: MDXComponents.Link,
  img: MDXComponents.Image,
  pre: (props) => <div className="mb-4" {...props} />,
  code: MDXComponents.CodeBlock,
  blockquote: MDXComponents.Callout,
  table: (props) => <table className="border-collapse w-full mb-4" {...props} />,
  th: (props) => <th className="border px-4 py-2 text-left bg-gray-50 font-semibold" {...props} />,
  td: (props) => <td className="border px-4 py-2" {...props} />,
  ul: (props) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props) => <li className="text-base leading-7" {...props} />,
  // Custom components
  Callout: MDXComponents.Callout,
  Math: MDXComponents.Math,
};
```

---

## 6. INFORMATION HIERARCHY & UX FLOW

### Typical Navigation Paths

**Path A: Cold Recruiter (5-min skim)**
```
Home
  ├─ Reads hero + expertise pillars (30 sec)
  ├─ Scans featured projects (1 min)
  ├─ Checks credibility (30 sec)
  ├─ Clicks "Explore Work" or "Contact"
  └─ Decision made within 2 min
```

**Path B: Interested Recruiter (15-min deep dive)**
```
Home
  ├─ Full hero + pillars + badges
  ├─ Click on featured project
  └─ Project detail
      ├─ Read meta + first section
      ├─ Scan TOC
      ├─ Jump to specific sections
      ├─ Read related projects
      └─ Click to contact or next project
```

**Path C: Engineer Evaluating Technical Depth**
```
Home
  ├─ Skim hero
  └─ Projects
      ├─ Filter by tech stack (e.g., "Causal Inference")
      └─ Click into top 2-3 matching projects
          ├─ Read full methodology
          ├─ Scan code examples
          └─ Assess depth + decision-making
```

**Path D: Full Portfolio Review**
```
Home
  ├─ Browse featured
  └─ /projects (all projects)
      ├─ Sort by date or filter by tag
      ├─ Read 3-4 projects in depth
      └─ /about + /tech-stack for context
```

### Visual Hierarchy & Scanning

**On Home Page:**
1. Hero (headline + subheadline) — 70% of visual weight
2. Expertise pillars — Clear, scannable
3. Featured projects — Subtle, inviting (not overwhelming)
4. Credibility badges — Small details, reinforces trust
5. Single CTA button — Clear next action

**On Project Detail:**
1. Project title + metadata — Immediate context
2. Content headings (h2/h3) — Navigation landmarks
3. Callouts/code blocks — Visual breaks
4. Related projects — Serendipity + more time on site

**On Projects Index:**
1. Filter options (if at all) — Optional, not default-active
2. Project cards in consistent grid — Scannable
3. Cards show: title, summary, tags, company, reading time
4. No ranking/ordering bias; reverse-chronological or by featured first

### Content Density

**Rule of thumb for portfolio:**
- **Home:** Max 2,000 words total (including all sections)
- **Project detail:** 5,000–12,000 words (deep case study)
- **About:** 1,500–2,000 words (conversational)
- **Tech Stack:** 2,000–3,000 words (reference material)

Keep reading time under 15 minutes per page (except projects, where depth is value).

---

## 7. DESIGN SYSTEM CONSTRAINTS

### Typography Scale

Define in `styles/typography.css` using CSS variables:

```css
/* Font stack */
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'Monaco', 'Inconsolata', monospace;

/* Sizes */
--text-xs: 12px / 16px line-height;
--text-sm: 14px / 20px line-height;
--text-base: 16px / 24px line-height;    /* body text */
--text-lg: 18px / 28px line-height;
--text-xl: 20px / 28px line-height;
--text-2xl: 24px / 32px line-height;
--text-3xl: 30px / 36px line-height;     /* h3 */
--text-4xl: 36px / 44px line-height;     /* h2 */
--text-5xl: 48px / 56px line-height;     /* h1 */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

**Usage:**
- H1: text-5xl + bold (hero headlines)
- H2: text-4xl + bold (section headers in projects)
- H3: text-3xl + semibold (subsections)
- H4: text-xl + semibold (small headers)
- Body: text-base + normal (reading)
- Captions: text-sm + normal (metadata)

### Color Philosophy

**Constraints:**
- **No more than 3 main colors** (text, background, accent)
- **High contrast required** (WCAG AA minimum, preferably AAA)
- **No gradients** (violates "sober" aesthetic)
- **Single neutral palette** (grays for hierarchy)

**Recommended approach:**
- **Foreground:** Near-black (dark gray #1a1a1a or #111)
- **Background:** Off-white (#fafafa or #f5f5f5)
- **Accent:** Single primary color (blue, gray, or warm tone like amber)
- **Borders:** Light gray (#e5e5e5 or #f0f0f0)
- **Text hierarchy:**
  - Primary (body): Near-black, full opacity
  - Secondary (meta): Gray (#666 or #777)
  - Tertiary (disabled): Light gray (#999 or #aaa)

**No:** Rainbow colors, pastels, neon, multiple accent colors

### Spacing Principles

Define in Tailwind/CSS using consistent scale:

```
4px (0.25rem)
8px (0.5rem)
12px (0.75rem)
16px (1rem)    ← Base unit
24px (1.5rem)
32px (2rem)    ← Large spacing (sections)
48px (3rem)    ← Extra large (major sections)
64px (4rem)    ← Page sections
```

**Usage:**
- **Padding inside components:** 8px–16px
- **Margin between paragraphs:** 16px–24px
- **Margin between sections:** 48px–64px
- **Gutter in grid:** 24px–32px (2 column projects grid)

**Rule:** Spacing should feel breathing room, not claustrophobic. Avoid cramming content.

### Content Width Rules

**Body text max-width:**
- Desktop: `800px` (optimal reading width)
- Tablet: `90vw` (responsive)
- Mobile: `100vw` (full width with padding)

**Full-width sections:**
- Header, Footer: always full width
- Hero: full width
- Projects grid: full width with padding + max-width container inside

**Code blocks:**
- Can overflow horizontally (with scroll) on mobile
- Should fit container on desktop

**Images:**
- Constrained to body width
- Responsive, no fixed height unless necessary

### Sober Design Rules

**What to avoid:**
- Animations (unless micro-interactions like button hover)
- Shadows (only on hover, subtly)
- Rounded corners (use 0–8px, not 20px+)
- Multiple font families (stick to 1–2)
- Heavy decorative elements
- Auto-playing video or audio
- Pop-ups, modals, or overlays
- Carousels or sliders

**What to embrace:**
- Clean, readable typography
- White space
- Subtle color differentiation
- Consistent alignment
- Clear visual hierarchy
- Purposeful spacing
- Single-minded purpose per page

**Hover states:**
- Subtle color shift (0.2s transition)
- Underline for links
- Slight shadow on clickables (cards, buttons)
- NO: Spinning, bouncing, fading in/out

### Accessibility Requirements

- **Color contrast:** WCAG AA minimum (4.5:1 for text)
- **Focus indicators:** Always visible (outline or highlight)
- **Semantic HTML:** Proper heading hierarchy, lists, etc.
- **Alt text:** All images have descriptive alt text
- **Link underlines:** Clear distinction from body text
- **Form labels:** Always present (if any forms)
- **Mobile touch targets:** Min 44×44px for tappables

### Responsive Design Breakpoints

Using Tailwind defaults:
- **Mobile:** 0–640px (default)
- **Tablet:** 640–1024px (md: prefix)
- **Desktop:** 1024px+ (lg: prefix)

**Strategy:**
- Mobile-first: Design for small screens, enhance for large
- Single-column layout on mobile
- 2-column layout on tablet+
- Full navigation on desktop (mobile nav is hamburger + CSS, no JS if possible)

---

## 8. ADDITIONAL CONSIDERATIONS

### Performance Targets

- **Lighthouse score:** 90+
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

**Tactics:**
- No third-party scripts except analytics
- Optimize images (WebP, srcset)
- Minimal JavaScript (server components)
- Static generation where possible (`generateStaticParams`)

### SEO Implementation

- **Meta tags:** Generated per-page (title, description, OG image)
- **Structured data:** JSON-LD for articles (project pages)
- **Sitemap:** `sitemap.xml` (auto-generated from routes)
- **Robots.txt:** Allow all, sitemap reference
- **Canonical tags:** Prevent duplicate content issues

### Analytics (Optional)

- Minimal tracking (avoid full Google Analytics)
- Consider: Plausible, Fathom, or Vercel Web Analytics
- Track: page views, project clicks, contact CTA clicks
- NO: Session recordings, heatmaps (too invasive)

### Deployment

- **Hosting:** Vercel (native Next.js support)
- **Domain:** Custom domain (maxencelegendre.com or similar)
- **SSL:** Auto-enabled
- **Deployment:** Git push to main → auto-deploy

### Future Extensibility

- **Blog posts:** Add `/blog/[slug]` route, reuse MDX infrastructure
- **Case study variations:** New frontmatter fields (e.g., `video`, `demo-url`)
- **Dark mode:** Consider if adding later (currently: light mode only)
- **Internationalization:** Structure allows i18n, but not initially required

---

## Summary: Implementation Checklist

- [ ] Set up Next.js 14 with App Router
- [ ] Configure Tailwind + PostCSS
- [ ] Create folder structure per spec
- [ ] Build layout components (Header, Footer, Container)
- [ ] Build section components (HomeHero, ExpertisePillars, etc.)
- [ ] Build project components (ProjectCard, ProjectMeta, ProjectNav)
- [ ] Build MDX component registry
- [ ] Create `lib/projects.ts` for project indexing
- [ ] Convert Markdown content → MDX files with frontmatter
- [ ] Create dynamic route `/projects/[slug]`
- [ ] Set up metadata generation (titles, OG images)
- [ ] Define typography & spacing CSS
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Verify Lighthouse scores (90+)
- [ ] Deploy to Vercel
- [ ] Test all routes, links, and CTAs
- [ ] Verify meta tags (OG, Twitter Card)
