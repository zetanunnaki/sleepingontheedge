# SleepingOnTheEdge

> Stack the science of better sleep.

An SEO-optimized, fully static affiliate marketing site in the sleep optimization niche. Built on a strict **No-DB** architecture: every article and product lives as a file in the repo.

## Stack

- **Framework:** Next.js 16 (App Router) — `output: 'export'` for fully static HTML
- **Styling:** Tailwind CSS v4 + `@tailwindcss/typography`
- **Content:** MDX via `next-mdx-remote/rsc` + `gray-matter` frontmatter
- **Icons:** lucide-react
- **Type:** TypeScript, strict
- **Deploy:** GitHub Pages (workflow in `.github/workflows/deploy.yml`)

## Architecture

```
src/
├── app/                   # Next.js App Router routes
├── components/
│   ├── article/           # ArticleLayout, Breadcrumbs, TOC, AuthorBio, RelatedArticles, …
│   ├── layout/            # Header, Footer
│   ├── mdx/               # AffiliateDisclaimer, DualBuyButton, ProductCard,
│   │                      # ComparisonTable, Callout, Stat, FAQ, ProductMention
│   ├── seo/               # JsonLd helpers, OG image template
│   └── tools/             # Sleep cycle + caffeine calculators (client components)
├── content/
│   ├── roundups/          # /best/[slug]
│   ├── reviews/           # /reviews/[slug]
│   └── guides/            # /guides/[slug]
├── data/
│   ├── products.json      # Single source of truth for affiliate links
│   └── glossary.json      # Sleep glossary terms
└── lib/
    ├── content.ts         # MDX loader, reading time, TOC extraction, tag index
    ├── products.ts        # Product + brand helpers
    ├── authors.ts         # Author registry
    └── site.ts            # Site config (URL, nav, categories)
```

## Adding content

### A new article

1. Create an MDX file in the matching folder:
   - Roundups → `src/content/roundups/your-slug.mdx`
   - Reviews → `src/content/reviews/your-slug.mdx`
   - Guides → `src/content/guides/your-slug.mdx`
2. Use this frontmatter:

```yaml
---
title: "The 7 Best Weighted Blankets for Deep Sleep"
seoTitle: "Best Weighted Blankets in 2026 | SleepingOnTheEdge"
description: "Short, punchy meta description (150 chars)."
author: "Sleep Team"
date: "2026-04-10"
featuredImage: "/images/covers/weighted-blankets.jpg"
productIds: ["product-id-1", "product-id-2"]
tags: ["Anxiety", "Deep Sleep"]
---
```

3. Use any MDX component inside the body:

```mdx
<AffiliateDisclaimer />
<ProductCard productId="hatch-restore-2" badge="Top Pick" />
<ComparisonTable productIds={["a", "b", "c"]} />
<DualBuyButton productId="hatch-restore-2" />
<Callout kind="science">A factual claim with a source.</Callout>
<Stat items={[{ value: "22%", label: "Reduction in sleep latency" }]} />
<FAQ items={[{ q: "Question?", a: "Answer." }]} />
<ProductMention productId="loftie-clock">the Loftie</ProductMention>
```

### A new product

Add an entry to `src/data/products.json`:

```json
"product-id": {
  "name": "Product Name",
  "brand": "Brand Name",
  "price": "$199.99",
  "image": "/images/products/product-id.jpg",
  "amazonLink": "https://amazon.com/dp/ID?tag=slpedge-20",
  "walmartLink": "https://walmart.com/ip/ID?irgwc=1",
  "pros": ["…"],
  "cons": ["…"]
}
```

Brand pages at `/brands/[slug]` are auto-generated from the `brand` field.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with `GITHUB_PAGES=true` (sets the `/sleepstackhq` basePath) and publishes `out/` to GitHub Pages.

## SEO

Auto-generated at build time:

- `sitemap.xml` — every static page, article, tag, author, brand
- `rss.xml` — most recent articles across all content types
- `robots.txt`
- Per-page Open Graph images via `opengraph-image.tsx`
- JSON-LD: `Organization`, `Article`, `Review`, `ItemList`, `BreadcrumbList`, `FAQPage`, `DefinedTermSet`

## License

All rights reserved.
