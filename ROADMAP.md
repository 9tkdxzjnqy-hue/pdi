# PDI Website — Roadmap

**Launch target:** March 12th, 2026
**Live at:** thepdi.ie

## What's Done

- Homepage (hero, story, charity, competitions preview, gallery preview, footer)
- Gallery page (104 images, 8 eras, sticky pill nav, lightbox)
- Competitions page (PDI 2004–2025, WPDI, Walk-on, Shield, Hall of Fame)
- Hall of Fame page (12 inductees, newest-first)
- Stories (landing + Letters + Reviews + Where Are They Now)
- Remembering page (The Man, The Bat, Del — photos added)
- Favicon
- Domain (thepdi.ie) connected to Vercel
- Sanity CMS — all content editable from Studio (thepdi.ie/studio)
- Webhook revalidation — Studio publishes update the live site automatically
- Homepage editable via CMS (siteSettings + homePage singletons)

---

## Chunk 1: Doc Cleanup *(30 mins)*
- [x] Delete PROGRESS.md
- [x] Delete LAUNCH_PLAN.md
- [x] Write this ROADMAP.md

## Chunk 2: Professional Polish *(done)*
- [x] Open Graph + Twitter Card metadata (social sharing previews)
- [x] robots.txt + sitemap.xml
- [x] Missing meta descriptions (competitions, hall-of-fame, auction, videos)
- [x] Custom 404 page
- [x] Error boundary
- [x] Active nav link highlighting
- [ ] Donate button → link to `/donate` page (see Chunk 4)
- [x] Remove placeholder social links from footer
- [x] Skip-to-content link + aria-expanded on hamburger

## Chunk 3: Sanity CMS Setup *(done)*
- [x] Create Sanity project + install dependencies
- [x] Define schemas: gallery, hall-of-fame, competitions, stories, site settings, homepage
- [x] Migrate existing data (TS files → Sanity)
- [x] Update Next.js components to fetch from Sanity
- [x] Set up Sanity Studio (admin UI) at thepdi.ie/studio
- [x] Set up image pipeline (Sanity CDN)
- [x] Webhook revalidation (publish in Studio → live site updates)
- [ ] Invite board members as editors
- [ ] Document how to use the CMS for editors

## Chunk 4: Content — Before Launch *(depends on others)*
Content that needs input from the board/community.
- [x] Real fundraising total — now editable via CMS (Site Settings → Donation Amount)
- [ ] Remembering page tribute copy (photos done, text still placeholder)
- [ ] Donate page (`/donate`)
  - Dedicated page with intro copy (donation amount, Crumlin message) + Enthuse embed
  - Waiting on Catherine to set up "PDI 2026" appeal in Enthuse and send iframe embed code
  - Enthuse also supports logging offline donations (SumUp totals on the day)
  - Nav Donate button links to `/donate`
  - Embed URL stored in CMS (siteSettings) so it can be updated without a deploy
- [ ] Add "The Man" to Hall of Fame (posthumous — on or after the night)
- [ ] Final copy review — no placeholder text visible
- [ ] Mobile check

## Chunk 5: Post-Launch
- [ ] On-the-day payment page (auction/raffle) — may be covered by Enthuse appeal
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
