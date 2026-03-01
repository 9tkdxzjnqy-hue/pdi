# PDI Website — Build Progress

## Current Status: Homepage v1 Live

The homepage is built and deployed. Visual language established. Ready for feedback and iteration.

---

## What's Built

### Tech Stack
- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 with custom PDI theme
- **Hosting:** Vercel (connected via GitHub)
- **Repo:** GitHub — auto-deploys on push to `main`
- **Node version:** 20 (required — use `nvm use 20`)

### Homepage Sections (top to bottom)
| Section | Component | Status |
|---|---|---|
| Navigation | `Navbar.tsx` | Done — fixed, dark, hamburger on mobile, Donate CTA |
| Hero | `Hero.tsx` | Done — abstract gradient (purple/green/amber atmospheric washes). No photo — current photos not hero-quality |
| The Story | `Story.tsx` | Done — two-column layout, cream background, sequin jacket photo |
| Charity | `Charity.tsx` | Done — placeholder total (€XX,XXX), CHF link, cup toast photo |
| Competitions | `CompetitionsPreview.tsx` | Done — four cards (PDI, WPDI, Walk-on of the Year, Shield) with photos |
| Gallery | `GalleryPreview.tsx` | Done — 6-photo grid, dark navy background |
| Footer | `Footer.tsx` | Done — minimal, charity acknowledgement, social placeholders |

### Design Decisions Made
- **Display font:** Helvetica Neue system font stack (inspired by The Tenth Man's clean sans-serif headings)
- **Body font:** Inter (via Google Fonts / next/font)
- **Hero approach:** Abstract dark gradient with atmospheric colour washes instead of photo — current photography isn't high enough quality for a full-bleed hero. Plan to revisit when better photos are available.
- **Colour palette:** Cream (#FAF7F2) homepage background transitioning to dark (#0A0A0F) and navy (#12121F) for deeper sections. Electric green (#39FF14), purple (#8B5CF6), and amber (#D4A017) accents.
- **Pat the Bat Memorial Trophy:** The Walk-on of the Year award is named in honour of Patrick Bergin (Pat the Bat) — a much-loved PDI member who is no longer with us. The Hall of Fame is a separate section, not named after Pat.
- **Media/Brief folders** are gitignored (large source assets, not part of the deployed site). Selected photos copied to `public/images/` with descriptive names.

---

## What's Not Built Yet

Referring to the brief's build order:

| Page | Status | Notes |
|---|---|---|
| Homepage | **Done (v1)** | Iterating on feedback |
| Competitions | Not started | Four individual sections needed |
| Hall of Fame | Not started | Requires care in design and copy |
| Gallery | Not started | Preview exists on homepage; full page needs asset pipeline |
| Booklet Archive | Not started | Blocked — waiting on Pa for digital copies |
| Donate | Not started | Blocked — Revolut Pocket constraints unresolved |
| Sponsors | Not started | Blocked — waiting on logos |

---

## Outstanding Content Needs

| Asset | Status |
|---|---|
| Donation running total (€ figure) | Placeholder on site — real number needed |
| Cheque handover photography | Not yet sourced — using cup toast photo as stand-in |
| Better event photography (esp. hero-quality) | Current 2019 photos used where possible; better shots needed for future |
| Booklet digital copies | Waiting on Pa |
| Sponsor logos | Not yet collected |
| Revolut Pocket / donation flow | Constraints unresolved |

---

## How to Develop

```bash
# Ensure Node 20
nvm use 20

# Install dependencies
npm install

# Run dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build
```

Pushing to `main` on GitHub triggers auto-deploy on Vercel.

---

## File Structure

```
src/
  app/
    layout.tsx        # Root layout, Inter font, metadata
    page.tsx          # Homepage — composes all sections
    globals.css       # Tailwind v4 theme, custom PDI colours
  components/
    Navbar.tsx        # Fixed nav, hamburger mobile menu
    Hero.tsx          # Abstract gradient hero
    Story.tsx         # Origin story, two-column
    Charity.tsx       # Fundraising total + CHF link
    CompetitionsPreview.tsx  # Four competition cards
    GalleryPreview.tsx      # Photo grid preview
    Footer.tsx        # Site footer
  lib/               # Utilities (empty, for future use)
public/
  images/            # 12 optimised event photos from 2019
```
