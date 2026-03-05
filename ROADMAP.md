# PDI Website — Roadmap

**Launch target:** March 12th, 2026
**Live at:** thepdi.ie

## What's Done

- Homepage (hero, story, charity, competitions preview, gallery preview, footer)
- Gallery page (101 images, 3 eras + walk-ons, lightbox)
- Competitions page (PDI 2004–2025, WPDI, Walk-on, Shield, Hall of Fame)
- Hall of Fame page (12 inductees)
- Stories (landing + Chairman's Address + Letters + Reviews + Where Are They Now)
- Remembering page (The Man, The Bat, Del — photos added)
- Favicon
- Domain (thepdi.ie) connected to Vercel

---

## Chunk 1: Doc Cleanup *(30 mins)*
- [x] Delete PROGRESS.md
- [x] Delete LAUNCH_PLAN.md
- [x] Write this ROADMAP.md

## Chunk 2: Professional Polish *(1–2 hours)*
Quick wins that make the site feel finished.
- [ ] Open Graph + Twitter Card metadata (social sharing previews)
- [ ] robots.txt + sitemap.xml
- [ ] Missing meta descriptions (competitions, hall-of-fame, auction, videos)
- [ ] Custom 404 page
- [ ] Error boundary
- [ ] Active nav link highlighting
- [ ] Fix Donate button on sub-pages (`#charity` → `/#charity`)
- [ ] Remove placeholder social links from footer
- [ ] Skip-to-content link + aria-expanded on hamburger

## Chunk 3: Sanity CMS Setup *(2–3 days)*
The biggest single piece. Enables board members to manage content directly.
- [ ] Create Sanity project + install dependencies
- [ ] Define schemas: gallery, hall-of-fame, remembering, competitions, site settings
- [ ] Migrate existing data (TS files → Sanity)
- [ ] Update Next.js components to fetch from Sanity
- [ ] Set up Sanity Studio (admin UI)
- [ ] Set up image pipeline (Sanity CDN)
- [ ] Invite board members as editors
- [ ] Document how to use the CMS for editors

## Chunk 4: Content — Before Launch *(depends on others)*
Content that needs input from the board/community.
- [ ] Real fundraising total (replace €XX,XXX)
- [ ] Remembering page tribute copy (photos done, text still placeholder)
- [ ] Donate button — payment flow TBD
  - Option A: Create dedicated Revolut account (enables Stripe or Revolut.me)
  - Option B: Revolut Pocket as-is (limited integrations)
  - Option C: Link directly to childrenshealth.ie
- [ ] Add "The Man" to Hall of Fame (posthumous — on or after the night)
- [ ] Final copy review — no placeholder text visible
- [ ] Mobile check

## Chunk 5: Post-Launch
- [ ] On-the-day payment page (auction/raffle) — depends on payment flow decision
- [ ] QR codes for venue
- [ ] Hall of Fame contribution descriptions (11 of 12 still placeholder)
- [ ] Stories: Auction + Videos (currently stubs)
- [ ] Booklet Archive (waiting on Pa)
- [ ] Sponsors page (waiting on logos)
- [ ] WPDI nicknames (currently first names only)

---

## Content Committee

Crowdsource content via WhatsApp group. Key asks:
- Photos (originals, not WhatsApp compressed) → Google Drive / Dropbox
- Fundraising running total
- Tribute copy for Remembering page
- Booklet files from Pa
- Stories and memories

## Reference: Domain Setup

Domain is live. DNS records:
- A record: `@` → `76.76.21.21`
- CNAME: `www` → `cname.vercel-dns.com`
