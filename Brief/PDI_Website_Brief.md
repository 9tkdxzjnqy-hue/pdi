# PDI Website Brief
*Paddy's Day Invitational — thepdi.ie*

---

## 1. Project Overview

The Paddy's Day Invitational (PDI) is a charity darts tournament held annually on the closest Saturday to St Patrick's Day at St Jude's GAA Club, Templeogue, Dublin. It has run for 20+ years, growing from humble beginnings in a player's back garden into a full community event featuring four distinct competitions, live music, player walk-ons, auctions, and raffles. All proceeds go to Children's Health Foundation Crumlin (formerly CMRF Crumlin).

The website will serve as the permanent home of the PDI — telling its story, celebrating its community, and supporting its charitable mission.

---

## 2. Audience

**Primary:** Existing players, their friends and families, and the wider Templeogue community. The audience is within one or two degrees of separation from the core WhatsApp group (~100+ members).

**Secondary:** Potential sponsors and donors who may discover the site organically.

The site should feel like it belongs to this community — warm, confident, and genuine. Not corporate, not generic.

---

## 3. Site Goals

The site has five core jobs:

- **Inform** — Tell the PDI story, explain the competitions, and connect the event to its charity.
- **Engage** — Celebrate the community through the gallery, stories, and Hall of Fame.
- **Remember** — Honour PDI members who are no longer with us.
- **Transact** — Facilitate donations and on-the-day payments via Stripe.
- **Acknowledge** — Recognise corporate sponsors.

---

## 4. Site Structure

### Home
- The PDI story: origin, growth, community roots
- Charity connection: running total of funds raised for Children's Health Foundation Crumlin (displayed prominently in hero and charity sections)
- Cheque handover photography
- Link to childrenshealth.ie
- Competition preview cards
- Gallery preview grid

### Competitions
Individual pages for each of the four competitions (display order):
1. **PDI** — the main men's darts competition
2. **WPDI** — ladies' competition, shorter format
3. **Walk-on of the Year** — the Pat the Bat Memorial Trophy. Voted by the crowd; the theatrical walk-ons are central to the PDI's identity. Named in honour of Patrick Bergin (Pat "the Bat") — a much-loved PDI member who is no longer with us. Pat walked on as Batman and entertained everyone. Sorely missed.
4. **Shield** — the Europa League of the PDI

### Remembering Our Own
A dedicated page honouring PDI members who have passed away. Dark, quiet design — the photos and words do the work. Tone is proud and warm, not sombre. Like raising a glass, not a eulogy.

Current members to include:
- **Tom "The Man" Barry** — passed away during 2025/2026
- **Pat "The Bat" Bergin** — passed away ~2021. Walked on as Batman. The Walk-on of the Year trophy bears his name.
- **Kieran "Del" Delaney** — passed away ~2021

Each entry includes:
- A photo from the PDI (being crowdsourced)
- A short tribute paragraph
- A quote from a friend (if available)

### Gallery
Photos and videos browsable by year or era. Recent years are well documented; earlier content is patchy and can be grouped into eras ("The Early Days", "The Middle Years", etc.) rather than forcing exact years. Best content from the booklet archive can be surfaced here too.

### Stories
Themed threads of PDI culture — the nonsense, the traditions, the legendary moments. Each thread is its own mini-section that can grow independently as new threads are identified. The group holds this knowledge collectively — threads will be crowdsourced.

Known threads so far:
- **The Auction** — Niall "the Gun" Dunning selling mundane items like a bag of potatoes for extortionate sums
- **The Videos** — players making videos to intimidate opponents or make them laugh
- **The Letters** — correspondence with high-profile people in the early days
- More to be identified by the community

Each thread gets a card on the Stories landing page. Content types vary — video embeds, scanned letters, photos with captions, written anecdotes. Whatever fits the thread.

### Hall of Fame
Recognises individuals who have made exceptional contributions to the PDI. This section should be treated with care — moving and celebratory, not clinical.

### Booklet Archive
Full digital copies of past PDI booklets, viewable in their entirety. Content assets held by a member (Pa) — pending.

### Donate
Online donations via Stripe Payment Link (see Section 9 for details). Clear call to action in the navigation.

### Sponsors
Logo display for corporate supporters of the PDI.

---

## 5. Version 2 (Deferred)

- **Player registration** — for future years once the site is established
- **Media upload** — allowing attendees to submit photos/video from the day for curated addition to the gallery

---

## 6. Visual Direction

### The Core Aesthetic

The site should feel like it belongs in the same aesthetic universe as **Guinness, Jameson, and The Tenth Man** (thetenthman.com) — bold, Irish, community-rooted, confident, and warm. Nothing generic. Nothing corporate. Nothing clichéd.

### The Central Visual Metaphor: The Walk-On

The defining image of the PDI is a player emerging through the wooden double doors of St Jude's — smoke machine, strobes cutting through the room, electric green and purple lighting, the crowd going wild. This moment is the visual heart of the site.

**Hero approach (current):** The homepage hero uses an abstract dark gradient with atmospheric colour washes (purple, green, amber) rather than a photo. Current photography isn't high enough quality for a full-bleed hero. This will be revisited when better photos are crowdsourced.

### Photography

The site depends on high-quality, well-curated photography. This is the single biggest factor in making the site feel right.

**Current state:** 2019 event photography plus PDI trophy and Walk-on trophy photos. Quality is mixed — good enough for competition cards but not for a hero.

**Crowdsourcing plan:** Content is being collected from the community via a shared Google Drive/Dropbox folder. The WhatsApp group (~100+ members) is the primary channel for soliciting contributions.

### Tonal Arc: Light to Dark

The homepage should be warm and accessible — light background, welcoming to newcomers. As users navigate deeper (competitions, gallery, Hall of Fame), the aesthetic progressively darkens, becoming more atmospheric and dramatic. This mirrors the actual experience of the event day.

### Colour Palette

Implemented in Tailwind CSS v4 custom theme:

| Token | Hex | Usage |
|---|---|---|
| `pdi-cream` | #FAF7F2 | Homepage warm background |
| `pdi-dark` | #0A0A0F | Deep near-black for inner pages / dark sections |
| `pdi-navy` | #12121F | Dark navy alternative |
| `pdi-green` | #39FF14 | Electric green accent — walk-on lighting |
| `pdi-purple` | #8B5CF6 | Purple/blue-violet accent |
| `pdi-amber` | #D4A017 | Warm amber accent |
| `pdi-text` | #F5F0E8 | Off-white/warm cream for text on dark |
| `pdi-muted` | #9CA3AF | Muted text |

### Typography

- **Display font:** Helvetica Neue system font stack (Helvetica Neue → Helvetica → Arial → sans-serif). Inspired by The Tenth Man's clean sans-serif headings — confident, tight tracking, no serif fussiness.
- **Body font:** Inter via Google Fonts / next/font. Clean, modern, excellent readability.

### Design Principles

- Whitespace is a feature, not an absence
- Minimal UI — navigation nearly invisible until needed
- Confident and professional, never corporate
- Playful but not silly — slightly more serious than playful, with warmth
- Contemporary, not classic
- Irish cultural references subtle, earned, never clichéd
- Darts iconography as quiet accent only — real photography is the primary visual language

### Reference Sites

| Site | What to take from it |
|---|---|
| thetenthman.com | Primary reference. Bold, dark, typographically confident, image-led, Irish without cliché. Helvetica Neue headings. |
| Guinness brand | Black/gold palette, restrained heritage, confidence without loudness |
| pdc.tv | Energy and drama for inner/competition pages |
| theringer.com | Editorial confidence, strong typography, clean grid |

---

## 7. Tone of Voice

20+ years earns confidence. The PDI doesn't need to prove itself.

- Concise copy, headlines with personality
- Warm but not earnest
- Funny where appropriate, never forced
- The charity story told with pride — the running total and cheque photos speak for themselves
- Never corporate, never generic

---

## 8. Technical Approach

### Platform
Custom build using **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS v4**, built with **Claude Code**, hosted on **Vercel** (free tier). No platform subscription costs. Full control over the aesthetic — no templates pulling toward generic.

### Node Version
Node 20 required (use `nvm use 20`).

### CMS
A headless CMS for content management — allowing the owner and other admins to update the gallery, Hall of Fame, and other content without touching code. Minimising friction for non-technical editors is a priority. Multiple admins should be supported. Not yet implemented.

### Domain
**thepdi.ie** — purchased. DNS needs to be pointed at Vercel (A record → 76.76.21.21, CNAME www → cname.vercel-dns.com).

### Hosting
Vercel free tier. Currently deployed at pdi-tau.vercel.app. Auto-deploys on push to `main` via GitHub.

### Repository
GitHub — https://github.com/9tkdxzjnqy-hue/pdi

### Video
Embedded via YouTube or Vimeo — no direct video hosting.

### Mobile
Fully responsive, mobile-first with Tailwind breakpoints. Many users will visit on mobile.

### Budget
Free where possible. Domain (~€10-15/year) and Stripe transaction fees (~1.5% + €0.25 per European card transaction) are the only expected recurring costs.

---

## 9. Payments — Stripe Integration

### Overview
Stripe replaces the earlier Revolut Pocket approach. Funds go to the PDI bank account, then are donated to Children's Health Foundation Crumlin as a lump sum.

### Online Donations (website)
- "Donate" CTA button in the navigation
- Links to a Stripe Payment Link or embedded Stripe Checkout page
- Donor picks an amount (preset options like €10, €20, €50, or custom)
- Stripe handles card details, PCI compliance, and receipts

### On-the-Day Payments (event)
For auction lots, raffle tickets, and other event-day transactions where cash is in decline:
- **QR codes** printed on tables / around the venue → opens a payment page on the person's phone where they enter an amount and optional reference (e.g. "Raffle", "Auction Lot 3")
- **Tablet at a desk** → a simple `/pay` page where an organiser enters the amount and description, hands the device to the buyer to enter card details
- Both use the same Stripe-powered payment page, accessed differently (QR code vs bookmarked on a tablet)

### Setup
1. Create Stripe account connected to PDI bank account
2. Create a Payment Link for online donations (immediate)
3. Build `/pay` page for on-the-day use (before event day)
4. Generate QR codes pointing to the payment page (before event day)

---

## 10. Content Assets

| Asset | Status |
|---|---|
| 2019 event photography | Available — 12 images in use on homepage |
| PDI Trophy photo | Available |
| Walk-on Trophy photo | Available |
| Past PDI booklets (digital) | With Pa — pending |
| Fundraising running total | To be sourced via content committee |
| Cheque handover photography | To be sourced via content committee |
| Photos of Tom, Pat, Kieran | To be crowdsourced for Remembering Our Own page |
| Tribute text for Tom, Pat, Kieran | To be written / collected |
| Stories thread content | To be crowdsourced from the community |
| Sponsor logos | To be sourced |
| High-quality event photos | Being crowdsourced via shared folder from WhatsApp group |

**Photography note:** The site's quality depends on photo curation. The 2019 images were sufficient to begin building but are not hero-quality. Better photography is being crowdsourced from the community and should be a deliberate goal at the next PDI event.

---

## 11. Build Order

1. **Homepage** — done (v1). Iterating on photos and copy as content arrives.
2. **Remembering Our Own** — priority for launch. Needs photos and tribute text.
3. **Donate** — wire up Stripe Payment Link to the existing Donate CTA.
4. **Competitions** — four individual pages with past winners, format details.
5. **Gallery** — full page, browsable by year/era. Dependent on crowdsourced photos.
6. **Stories** — landing page with initial threads. Scales as community surfaces more.
7. **Hall of Fame** — requires care in design and copy.
8. **Booklet Archive** — dependent on Pa providing the files.
9. **Sponsors** — straightforward once logos are collected.
10. **On-the-day payments (/pay page + QR codes)** — before event day.

---

## 12. Pre-Build Checklist

- [x] Register domain — thepdi.ie purchased
- [x] Confirm charity name — Children's Health Foundation Crumlin, childrenshealth.ie
- [x] Curate initial photography — 12 images from 2019 event + 2 trophy photos
- [x] Build homepage v1 — deployed to Vercel
- [x] Set up GitHub repo
- [ ] Connect thepdi.ie domain to Vercel
- [ ] Create content committee WhatsApp group
- [ ] Set up shared folder (Google Drive / Dropbox) for photo crowdsourcing
- [ ] Source fundraising running total
- [ ] Crowdsource photos from the wider group
- [ ] Collect photos and tributes for Remembering Our Own (Tom, Pat, Kieran)
- [ ] Set up Stripe account connected to PDI bank account
- [ ] Create Stripe Payment Link for online donations
- [ ] Obtain booklet digital copies (waiting on Pa)
- [ ] Collect sponsor logos

---

## 13. Launch Target

**March 12th, 2026** — share thepdi.ie with the WhatsApp group.

See `LAUNCH_PLAN.md` for the detailed timeline and checklist.
