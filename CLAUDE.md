# PDI — Paddy's Day Invitational

## What This Is

A Next.js 15 site for the PDI, a legendary charity darts tournament in Templeogue, Dublin.
All proceeds go to Children's Health Foundation Crumlin. The site celebrates 20+ years of
walk-ons, competitions, and community.

## Governing Aesthetic

**Warm Cinematic Neubrutalism.** Every design decision filters through the walk-on moment —
a player emerging through wooden double doors into smoke, electric green and purple strobes,
and the roar of a crowd. Bold type, generous whitespace, nothing corporate.

See `design-system.md` for the full visual reference (colours, typography, spacing, components, motion).

## Hard Rules

1. **No real names on the public site.** Use nicknames only (e.g. "The Bat", "Del", "The Man").
   This protects members' privacy. Always audit for real names before deploying.
2. **No new dependencies** without explicit approval. The site is intentionally lightweight.
3. **Self-hosted fonts only** (Cabinet Grotesk + Satoshi via `next/font/local`). No Google Fonts CDN.
4. **Accessibility first.** WCAG AA minimum on all text. `prefers-reduced-motion` respected.
5. **Dark theme is default** for sub-pages. Homepage uses the tonal arc (cream → dark).

## Build & Deploy

```bash
nvm use 20          # requires Node 20+
npm run dev         # local dev server (localhost:3000)
npm run build       # production build — must pass before pushing
npm run lint        # ESLint
npm run sync        # push local TS data → Sanity (also runs on deploy)
npm run pull        # pull Sanity data → local TS files
```

Deployed to **Vercel** via push to `main`. Never push directly to main without a passing build.

### Two-way data sync

Data lives in both TypeScript files (`src/data/`) and Sanity Studio. Either can be the source of truth:

```bash
# Someone edits in Sanity Studio:
npm run pull        # Sanity → local TS files
git diff            # review changes
npm run build       # verify it compiles
git commit          # commit pulled data

# Someone edits TS files:
npm run sync        # TS → Sanity (also runs automatically on deploy)
```

`pull` covers competitions, inductees, and gallery. Stories and homepage are excluded (hardcoded in seed scripts, rarely edited in Sanity).

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 @theme tokens, animations, utilities
│   ├── layout.tsx           # Root layout, font loading, OG metadata, skip-to-content
│   ├── page.tsx             # Homepage
│   ├── not-found.tsx        # Custom 404 page
│   ├── error.tsx            # Error boundary (client component)
│   ├── robots.ts            # robots.txt (Next.js Metadata API)
│   ├── sitemap.ts           # sitemap.xml (Next.js Metadata API)
│   ├── competitions/        # Full results tables
│   ├── hall-of-fame/        # Inductee cards
│   ├── gallery/             # Photo gallery
│   ├── stories/             # Story threads (chairman's address, letters, auction, videos)
│   └── remembering/         # Remembering page
├── components/
│   ├── Navbar.tsx            # Fixed nav with scroll behaviour, active link highlighting
│   ├── Hero.tsx              # Homepage hero (gradient/image variants)
│   ├── AnimateOnScroll.tsx   # Scroll-triggered reveal wrapper
│   ├── Story.tsx             # "Where It All Started" section
│   ├── Charity.tsx           # Fundraising section
│   ├── CompetitionsPreview.tsx
│   ├── GalleryPreview.tsx
│   ├── Footer.tsx
│   └── ...                   # Page-specific heroes, cards
└── data/
    ├── competitions.ts       # Competition results by year
    ├── gallery.ts            # Gallery items (src, alt, era, year, featured)
    └── hallOfFame.ts         # Hall of Fame inductees
public/
├── fonts/                    # Self-hosted .woff2 (Cabinet Grotesk, Satoshi)
├── gallery/                  # 101 curated gallery images (nicknames only in filenames)
└── images/                   # Site photography
```

## Design Tokens (Quick Reference)

| Token | Hex | Usage |
|-------|-----|-------|
| `pdi-cream` | `#F8F5EB` | Light canvas (homepage sections) |
| `pdi-dark` | `#0A0F1C` | Dark canvas (hero, sub-pages) |
| `pdi-navy` | `#141428` | Elevated surfaces (cards, panels) |
| `pdi-green` | `#00FF92` | Electric accent (CTAs, winners, highlights) |
| `pdi-purple` | `#7F3DFF` | Secondary accent (badges, links on cream) |
| `pdi-teal` | `#00E6B8` | Hovers, cinematic glows, sequin reflections |
| `pdi-text` | `#F5F0E6` | Primary text on dark |
| `pdi-muted` | `#9CA3AF` | Secondary text, metadata |

## Fonts

- **Headings:** Cabinet Grotesk Variable (weight 600–700), `font-display` class
- **Body:** Satoshi Variable (weight 400–500), `font-body` class

## Image Standards

- **Minimum dimensions:** 600px in both width and height. Exceptions for older images or images with nostalgic value.
- **File format:** Photos as `.jpg` (real JPEG, not renamed PNGs). Screenshots/graphics with transparency as `.png`. Always convert properly — never just rename the extension.
- **Quality:** `quality={85}` on all gallery `<Image>` components (Next.js default is 75)
- **Max width on disk:** 1200px — resize larger images with `sips --resampleWidth 1200`
- **Display:** Natural aspect ratios (no forced square crop). CSS columns masonry layout.
- **Naming:** `[year]-[description].jpg` or `profile-[nickname].jpg` — no real names ever
- **Alt text:** Descriptive, nickname-only, no real names
- **Lightbox:** All gallery images expand on click to show full resolution

## Key Conventions

- Heroes: `pt-32 pb-16`, centred text, `font-display` title
- Cards: `rounded-xl bg-pdi-navy p-8`
- Badges: `rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-pdi-muted`
- Section padding: `py-24` homepage, `py-16` inner pages
- Motion: CSS-only (`animate-reveal`, `animate-drift`), all respect `prefers-reduced-motion`
