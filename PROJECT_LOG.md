# SleepStackHQ — Project Log

> Comprehensive reference for everything built on this site, in the order it was built.
> Use this file to remember what exists, why it exists, and how to extend it.

**Live URL:** https://sleepstackhq.vercel.app
**Repo:** https://github.com/zetanunnaki/sleepstackhq
**Hosted on:** Vercel (auto-deploys from `main` branch)
**Stack:** Next.js 16 (App Router) · Tailwind v4 · MDX · TypeScript · static export

---

## Editorial voice rules (CRITICAL)

These rules apply to ALL content. They were set by the user to reduce legal/YMYL risk:

- **Never claim "we tested" / "we tried" / "we used for X nights"** — the site does not test products
- Frame product picks as **"based on aggregated buyer reviews"** or **"consistently top-rated in verified reviews"**
- Frame health claims around what published research **"suggests"** or what **"may"** be true — soften with "for many people"
- Always include `<MedicalDisclaimer />` on health/supplement/sleep-disorder content
- Never describe the team as "researchers" or say "we research" — use "gather," "curate," "present," "summarize"
- Never propose newsletters or comments — user explicitly said no to both
- Sleep Team = editorial/curation group (not testers, not researchers)
- Dr. Elena Vance = medical advisor (reviews health content, doesn't personally test)

---

## Architecture

### Framework
- **Next.js 16** with App Router and `output: 'export'` for fully static HTML
- **Static export** is non-negotiable — every route prerenders to `out/`
- Vercel handles the static deployment natively
- Dev script runs with `NODE_OPTIONS='--max-old-space-size=4096' next dev --turbopack` (the memory bump fixes Jest worker crashes on long MDX articles)

### Folder structure
```
src/
├── app/                       # Next.js App Router routes
│   ├── layout.tsx             # Root layout: fonts, theme orbs, GA4, OG meta, Header/Footer
│   ├── page.tsx               # Homepage: hero, glass cards, categories, tools, products, archive
│   ├── best/                  # /best, /best/[slug] roundups + per-article OG image
│   ├── reviews/               # /reviews, /reviews/[slug] reviews + per-article OG image
│   ├── guides/                # /guides, /guides/[slug] guides + per-article OG image
│   ├── tags/[slug]/           # Auto-generated tag pages
│   ├── brands/[slug]/         # Auto-generated brand pages with Product schema
│   ├── authors/[slug]/        # Author bio pages with Person schema
│   ├── tools/                 # Sleep cycle calc, caffeine calc, sleep stack quiz
│   ├── glossary/              # 28 terms with DefinedTermSet schema
│   ├── compare/               # Curated head-to-head product comparisons
│   ├── resources/             # All-resources hub
│   ├── search/                # HTML fallback search
│   ├── search-index.json/     # Static JSON index for live ⌘K search
│   ├── methodology/about/disclaimer/privacy-policy/  # Legal pages
│   ├── sitemap.ts             # Auto sitemap.xml from MDX + brands + tags + authors
│   ├── sitemap/page.tsx       # HTML sitemap for users
│   ├── rss.xml/route.ts       # Auto RSS feed
│   ├── robots.ts              # robots.txt
│   ├── opengraph-image.tsx    # Root OG image generator
│   └── not-found.tsx          # Custom 404
├── components/
│   ├── article/               # ArticleLayout, ArticleCard, FeaturedHero, ListingPage,
│   │                          # Breadcrumbs, TableOfContents, RelatedArticles, AuthorBio,
│   │                          # TagChips, CoverFallback, ReadingProgress, ScrollToTop,
│   │                          # ShareButtons
│   ├── mdx/                   # AffiliateDisclaimer, MedicalDisclaimer, DualBuyButton,
│   │                          # ProductCard, ProductMention, ComparisonTable,
│   │                          # Callout, Stat, FAQ, MDXRenderer (rehype-slug)
│   ├── seo/                   # JsonLd helpers (8 schema types), og-template
│   ├── tools/                 # SleepCycleCalculator, CaffeineCalculator, SleepQuiz
│   ├── search/                # SearchDialog (⌘K modal, lazy-loaded JSON index)
│   ├── layout/                # Header (with search + mobile menu), Footer (3-col + socials)
│   ├── analytics/             # GoogleAnalytics, TrackedAffiliateLink
│   └── ads/                   # AdSlot, AdContainer (NOT mounted — ready to re-add)
├── content/
│   ├── roundups/              # Stack roundups (.mdx)
│   ├── reviews/               # Lab reports (.mdx)
│   └── guides/                # Protocols (.mdx)
├── data/
│   ├── products.json          # Product registry — single source of truth for affiliate links
│   └── glossary.json          # Sleep glossary terms
└── lib/
    ├── content.ts             # MDX loader, reading time, TOC, tag/brand/author indexes
    ├── products.ts            # Product + brand helpers, auto-clears missing image refs
    ├── authors.ts             # Author registry
    ├── analytics.ts           # GA4 affiliate click tracking helper (safe gtag wrapper)
    └── site.ts                # Site config (URL, nav, categories, social URLs, canonical helper)
```

### Theme: "Aura" dark design
- `bg-[#020617]` slate dark with fixed background blur orbs (indigo + amber) in root layout
- `font-serif: Instrument Serif` for headlines (italic accent variant)
- `font-sans: Geist`
- Glass cards: `rounded-[28-40px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950`
- Indigo accent (`#4f46e5` / `indigo-400` / `indigo-600`)
- Amber accent for editor tags / "featured" labels
- `CoverFallback` component renders a deterministic gradient when an image is missing

---

## Build history (in order)

### Phase 1: Initial scaffold
- Next.js 16 + Tailwind v4 + TypeScript installed
- Static export config (`output: 'export'`, `unoptimized: true`, `trailingSlash: true`)
- No-DB folder structure (data/products.json, content/{roundups,reviews,guides})
- Base layout with Header/Footer and Aura theme

### Phase 2: Custom MDX components
- AffiliateDisclaimer, DualBuyButton, ProductCard, ComparisonTable
- All wired into mdx-components.tsx for use in any MDX file

### Phase 3: Content pipeline
- Content loader with reading time, TOC extraction, tag indexing
- Product loader with brand grouping, image existence checks
- Author registry
- Article shell (ArticleLayout) with breadcrumbs, hero, prose, related articles
- Dynamic routes for /best, /reviews, /guides

### Phase 4: SEO infrastructure
- JSON-LD helpers (Organization, Person, Article, Review, ItemList, BreadcrumbList, FAQPage, DefinedTermSet, **Product**)
- Auto sitemap.xml from MDX + brands + tags + authors + static pages
- Auto rss.xml route handler
- robots.ts
- Per-article opengraph-image.tsx generators (one per [slug] folder)
- Root opengraph-image.tsx
- **Canonical URLs on every page** via per-page `alternates.canonical`
- 0-issue SEO audit verified by `scripts/seo-audit.mjs`

### Phase 5: Listing pages + author/brand/tag system
- /best, /reviews, /guides index pages with FeaturedHero
- Auto-generated /tags/[slug] pages with TagChips
- Auto-generated /brands/[slug] pages with Product JSON-LD
- /authors/[slug] pages with Person JSON-LD

### Phase 6: Tools section
- SleepCycleCalculator (90-min cycles + 14-min sleep onset)
- CaffeineCalculator (5h half-life decay model)
- SleepQuiz (4-question personalized recommendation engine)
- /tools, /tools/sleep-cycle-calculator, /tools/caffeine-cutoff-calculator, /tools/sleep-stack-quiz
- WebApplication JSON-LD on tool pages

### Phase 7: UX polish
- Mobile slide-over menu (MobileMenu client component)
- Live search (⌘K) with lazy-loaded JSON index, basePath-aware
- ReadingProgress bar on articles (fixed top, indigo)
- ScrollToTop button (appears past 600px)
- ShareButtons (X, Reddit, LinkedIn, copy-link — no tracking)
- Skip-to-content link
- Print-friendly stylesheet
- Reading time on ArticleCard
- "Recently updated" emerald badge on articles with `updated` frontmatter
- Featured hero on listing pages
- Mobile menu slide animation (`fadeSlideIn` keyframe)

### Phase 8: Editorial voice pivot (CRITICAL)
- Removed all "we tested" claims site-wide
- Added MedicalDisclaimer MDX component
- Rewrote About, Methodology, Disclaimer pages around "we curate and gather"
- Updated Sleep Team bio: editorial/curation, not testers/researchers
- Affiliate disclaimer moved from article tops to footer (single global disclosure)
- Created /disclaimer legal page

### Phase 9: Content expansion
- All articles expanded to 1500-2000+ words
- Added FAQs, references, cross-links to every article
- Added MedicalDisclaimer to all health/supplement/sleep-disorder articles

### Phase 10: AI image generation (Kie.ai Flux)
- Generation script at `scripts/generate-images.mjs`
- Uses Kie.ai Flux Kontext Pro model (cheapest tier)
- API: `https://api.kie.ai/api/v1/flux/kontext/generate` + `/record-info` for polling
- API key stored inline in script: `a34ec7e113fd3f211e45fc9c44ecaabb`
- All product images at 1:1, all cover images at 16:9
- Output JPEG, downloaded to `public/images/products/` and `public/images/covers/`

### Phase 11: Social media + accessibility
- 6 social platform links in Footer (X, Instagram, Pinterest, YouTube, TikTok, Facebook — all placeholder handles)
- Twitter `@sleepstackhq` handle in OG meta
- Skip link, focus-visible rings, prefers-reduced-motion respected
- ARIA labels on MobileMenu, AuthorBio
- Semantic ul/li in Header nav

### Phase 12: AdSense integration (currently REMOVED)
- AdSlot + AdContainer components built in `src/components/ads/`
- Was wired into root layout (TopAd, BottomAd) — **removed by user request**
- Components remain in codebase for future re-enablement
- ads.txt file in public/ with placeholder publisher ID

### Phase 13: Vercel deployment
- Removed GitHub Pages basePath/assetPrefix conditionals
- Updated siteConfig.url to https://sleepstackhq.vercel.app
- Removed basePath detection from SearchDialog
- next.config.ts simplified

### Phase 14: GA4 affiliate click tracking
- `src/lib/analytics.ts` — safe gtag wrapper, no-ops if not loaded
- `src/components/analytics/GoogleAnalytics.tsx` — placeholder GA4 script (G-XXXXXXXXXX)
- `src/components/analytics/TrackedAffiliateLink.tsx` — client component link wrapper
- Fires TWO events on every affiliate click:
  - GA4 standard `select_item` event with full ecommerce schema (item_id, brand, price, affiliation, currency)
  - Custom `affiliate_click` event with extra fields for custom reports
- All affiliate buttons routed through TrackedAffiliateLink:
  - DualBuyButton (Amazon + Walmart) → `location: "dual_buy_button"`
  - ProductMention (inline) → `location: "inline_mention"`
  - ComparisonTable Amazon button → `location: "comparison_table"`
  - Homepage Featured Products grid → `location: "homepage_featured"`
- Once you replace `G-XXXXXXXXXX` in `GoogleAnalytics.tsx` with your real measurement ID, tracking activates instantly
- Replace your real GA4 measurement ID in src/components/analytics/GoogleAnalytics.tsx

### Phase 15: Enhanced SEO + social sharing
- **Product JSON-LD schema** with offers (price, currency, availability, seller) for rich Google snippets — applied to review pages and brand pages
- Per-article OG metadata: `type: "article"`, `publishedTime`, `modifiedTime`, `authors`, `tags`
- Per-article Twitter card overrides
- Root layout OG: locale, image dimensions (1200x630), image alt, image type
- Pinterest verification meta (`p:domain_verify` placeholder)
- Facebook page meta (`fb:pages` placeholder)
- All article routes return enriched openGraph metadata via generateMetadata

---

## Content inventory

### Articles (all 1500-2000+ words, all with research citations, FAQs, AI cover images)

**Guides (24+):**
- 12 Evidence-Based Sleep Tips
- Why You Wake Up at 3 AM
- Optimal Bedroom Temperature for Deep Sleep
- How to Reset Your Sleep Schedule in 7 Days
- Melatonin Dosage Guide
- The Science of Napping
- 8 Warning Signs of Sleep Apnea
- Caffeine and Sleep: The Complete Guide
- The Perfect Bedtime Routine for Adults
- Sleep Debt: What It Is and Whether You Can Pay It Back
- How Much Sleep Do You Need by Age
- Sleep and Weight Loss
- Best Sleeping Positions for Back Pain
- How to Stop Snoring
- Sleep and Exercise
- How Screen Time Affects Sleep
- Sleep During Pregnancy
- Why We Dream
- Sleep and Anxiety
- Sleep for Shift Workers
- How Alcohol Affects Sleep
- Sleep for College Students
- How to Beat Jet Lag Fast
- Sleep and Aging After 50
- Sleep and Mental Health (Depression, ADHD, PTSD)
- Sleep Routines for Kids (Ages 3-12)
- How to Share a Bed and Still Sleep Well

**Roundups (9+):**
- Best Smart Alarm Clocks
- Best Magnesium Supplements for Sleep
- Best Sleep Trackers
- Best Blue Light Blocking Glasses
- Best Weighted Blankets
- Best Pillows for Sleep
- Best Earplugs for Sleeping
- Best Mattress Toppers for Hot Sleepers
- Best Blackout Curtains

**Reviews (8+):**
- Hatch Restore 2
- Manta Sleep Mask
- Loftie Clock
- ChiliPad Cube
- Oura Ring Gen 3
- Yogasleep Dohm
- Bearaby Cotton Napper
- Swanwick Swannies

### Glossary
- 28 sleep science terms with full definitions
- Schema.org `DefinedTermSet` JSON-LD on /glossary

### Tools (3 interactive)
- Sleep Cycle Calculator
- Caffeine Cutoff Calculator
- Sleep Stack Quiz

### Comparisons
- 5 curated head-to-head matchups on /compare

### Products (38+ as of Phase 15)
All products have BOTH Amazon and Walmart link slots in the standard format. **Affiliate IDs are placeholders (`YOUR_ID1` through `YOUR_ID46` and `sleepstackhq-20`) that need to be replaced with real Amazon Associates and Walmart Creator IDs before going live.** Prices are realistic estimates and need to be verified against current listings.

Categories covered:
- Sleep tech (alarm clocks, sound machines)
- Supplements (magnesium, melatonin, L-theanine)
- Wearables (Oura, Whoop, Biostrap, Withings)
- Light hygiene (blue blockers, SAD lamps, sunrise lamps, smart bulbs)
- Cooling (mattress toppers, ChiliPad, cooling sheets)
- Pillows (adjustable, hotel-style, cervical, pregnancy)
- Mattresses (Saatva, Tuft & Needle, Purple)
- Bedding (sheets, mattress protectors, weighted blankets)
- Curtains (blackout)
- Earplugs (silicone reusable, foam disposable)
- Wedge pillows
- Tea (caffeine-free bedtime)
- Breathing devices (Moonbird)

---

## Open todos / things the user needs to do

1. **Make repo public** — required for free GitHub-related features
2. **Replace affiliate IDs in `src/data/products.json`** — every product has placeholder `YOUR_ID1` through `YOUR_ID46`. Replace with real Amazon Associates ASINs + tag, and real Walmart product IDs.
3. **Verify product prices** — all prices are training-data estimates. Check current Amazon/Walmart listings.
4. **Replace `G-XXXXXXXXXX` in `src/components/analytics/GoogleAnalytics.tsx`** — paste your real GA4 measurement ID. Once set, all affiliate clicks start reporting to GA4 immediately.
5. **Replace `PINTEREST_VERIFICATION_CODE` and `FACEBOOK_PAGE_ID`** in `src/app/layout.tsx` `metadata.other`
6. **Replace social handles in `src/lib/site.ts`** — currently all `@sleepstackhq` placeholders
7. **Submit sitemap to Google Search Console** — `https://sleepstackhq.vercel.app/sitemap.xml`
8. **Re-add AdSense when you have a publisher ID** — components still in `src/components/ads/`. Re-import TopAd/BottomAd in layout.tsx and replace `ca-pub-XXXXXXXXXXXXXXXX`.
9. **Set up Pinterest business account** — high-traffic platform for sleep niche

---

## Commands

### Local
```bash
npm run dev          # Dev server with 4GB Node memory at http://localhost:3000
npx next build       # Static export to ./out
node scripts/seo-audit.mjs       # Run SEO audit on the latest build
node scripts/generate-images.mjs # Regenerate or add product/cover images via Kie.ai
```

### Git
Git is unconfigured locally; commits use inline identity flags:
```bash
git -c user.email=claude@anthropic.com -c user.name=SleepStackHQ commit -m "..."
```
Commit messages end with: `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`

### Deploy
Pushing to `main` triggers Vercel auto-deploy. No workflow file needed — Vercel detects Next.js automatically.

---

## API references

### Kie.ai (image generation)
- **API key:** `a34ec7e113fd3f211e45fc9c44ecaabb` (in `scripts/generate-images.mjs`)
- **Generate endpoint:** `POST https://api.kie.ai/api/v1/flux/kontext/generate`
- **Status endpoint:** `GET https://api.kie.ai/api/v1/flux/kontext/record-info?taskId=...`
- **Model used:** `flux-kontext-pro` (cheapest credible Flux tier)
- **Output format:** JPEG
- **Aspect ratios used:** `1:1` for products, `16:9` for cover images
- Tasks return immediately with a taskId. Poll record-info every 5s until `successFlag === 1`. Result image URLs expire after 14 days, so download immediately.

### Vercel
- **Project:** sleepstackhq
- **URL:** https://sleepstackhq.vercel.app
- **Framework preset:** Next.js (auto-detected)
- **Build command:** `next build` (default)
- **Output directory:** `out` (auto-detected from `output: 'export'`)

---

## Schema.org JSON-LD types in use

| Type | Used on | Helper function |
|---|---|---|
| Organization | Every page (root layout) | `organizationSchema()` |
| Person | Author pages | `personSchema()` |
| Article | Guide + roundup pages | `articleSchema()` |
| Review | Review pages (with itemReviewed Product) | `reviewSchema()` |
| ItemList | Roundup pages | `itemListSchema()` |
| BreadcrumbList | Article pages | `Breadcrumbs` component |
| FAQPage | Articles using `<FAQ>` MDX component | `FAQ` component |
| DefinedTermSet | Glossary page | inline |
| Product | Review pages + brand pages | `productSchema()` |
| WebApplication | Tool pages | `softwareAppSchema()` |

---

## Test/verification scripts

- `scripts/seo-audit.mjs` — runs against `./out` after build, checks every page for title, description, H1, OG, canonical, image alt
- `scripts/generate-images.mjs` — batch image generation via Kie.ai

---

## Notes for future work

- The MDX renderer uses `rehype-slug` for heading IDs but NO `rehype-autolink-headings` (it caused Jest worker crashes on long articles in dev mode — added enough complexity to crash the worker process)
- Dev mode requires `NODE_OPTIONS='--max-old-space-size=4096'` because of the same MDX compilation memory issue
- The `CoverFallback` component is the safety net for missing images — it renders a deterministic gradient based on a seed string, so every product/article without an image still gets a unique-looking card
- The content loader auto-clears `featuredImage` references that don't exist on disk, so missing images never break the page
- Brands and tags are auto-generated from products.json and MDX frontmatter — adding a new product or article automatically creates the brand/tag pages
- All affiliate buttons go through `TrackedAffiliateLink` which fires GA4 events synchronously before navigation
