# PDI Website — Launch Plan

**Target date:** March 12th, 2026
**Goal:** Share thepdi.ie with the WhatsApp group

---

## What's Live Now

The homepage is deployed at pdi-tau.vercel.app with placeholder content and 2019 photos. It works, but it needs real content and better photos before sharing.

---

## Launch Checklist

### Must Have for March 12th

These are the things that would be embarrassing if missing.

- [ ] **Connect thepdi.ie domain to Vercel** — nobody's sharing a vercel.app URL
- [ ] **Real fundraising total** — replace €XX,XXX with the actual number
- [ ] **Better photos** — at minimum: hero shot, competition cards, gallery grid. Crowdsource from the group via the content committee (see below)
- [ ] **Review all copy** — make sure every word on the homepage feels right. No placeholder text
- [ ] **Remembering Our Own page** — Tom, Pat, and Kieran. Needs photos and tribute text. This matters too much to leave out
- [ ] **Donate button working** — even if it's just a Stripe Payment Link, the Donate CTA in the nav should go somewhere real
- [ ] **Mobile check** — open on your phone, make sure it looks right

### Should Have (if time allows)

These make it better but won't stop the launch.

- [ ] **Gallery page** — full page beyond the homepage preview, browsable by year/era
- [ ] **Competition pages** — individual pages for PDI, WPDI, Walk-on of the Year, Shield
- [ ] **Stories page** — landing page with initial threads (auction, videos, letters). Can launch with 1-2 threads

### After Launch

These can come later and the group won't miss them on day one.

- [ ] **Stripe /pay page** — on-the-day payments for auction/raffle
- [ ] **QR codes for event day** — printed QR codes linking to the payment page
- [ ] **Hall of Fame page**
- [ ] **Booklet Archive** — waiting on Pa for digital copies
- [ ] **Sponsors page** — waiting on logos
- [ ] **Stories: additional threads** — let the group surface these after launch

---

## Timeline

| Date | What |
|---|---|
| **Mar 1 (today)** | Create content committee WhatsApp group. Send opening message with asks |
| **Mar 1-3** | Connect thepdi.ie domain to Vercel. Set up Stripe account |
| **Mar 3-5** | Photos start arriving. Curate best ones, update the site |
| **Mar 5-7** | Build Remembering Our Own page. Write/collect tributes for Tom, Pat, Kieran |
| **Mar 7-9** | Wire up Donate button (Stripe Payment Link). Final copy review |
| **Mar 9-11** | Mobile testing. Final photo swaps. Polish |
| **Mar 12** | Share thepdi.ie with the group |

---

## Content Committee — WhatsApp Group

### Who to add
You need 3-5 people who between them can provide:
- The fundraising running total (whoever manages the PDI finances)
- Photos from over the years (whoever has the best archive)
- A line or two about Tom, Pat, and Kieran for the Remembering Our Own page
- Access to the old booklets (Pa)
- Knowledge of the PDI history and stories

### Opening message

> Lads — I'm putting together the PDI website for launch on the 12th. I need your help getting content together. Here's what I'm after:
>
> **Photos**
> The site needs high quality photos — walk-ons, crowd shots, trophies, fancy dress, cheque handovers, the lot. The more dramatic the better. Anything from the early days is gold.
> Please upload originals here (don't send through WhatsApp — it kills the quality):
> [Google Drive / Dropbox link]
>
> **Fundraising total**
> I need the running total of what the PDI has raised for Crumlin over the years. Does anyone have this figure?
>
> **Remembering Our Own**
> The site will have a page for Tom, Pat, and Kieran. I need:
> - A photo of each of them at the PDI if anyone has one
> - A line or two about what they meant to the event — nothing formal, just honest
>
> **Booklets**
> Pa — any chance of getting digital copies of the old booklets?
>
> **Stripe / Donations**
> I'm setting up online donations through the site. Who has access to the PDI bank account? I'll need them to create a Stripe account connected to it.
>
> **Stories**
> We're building a Stories section — the auction, the videos, the letters, all the nonsense. What are the threads that make this thing what it is? What am I forgetting?
>
> The site is at [pdi-tau.vercel.app] if you want a sneak peek. Work in progress — the photos on there now are placeholders.
>
> Anything you can get me in the next few days would be class. Cheers.

---

## Domain Setup (thepdi.ie → Vercel)

1. Log in to wherever thepdi.ie is registered (Blacknight, Register365, etc.)
2. Go to DNS settings
3. Add these records:
   - **A record:** `@` → `76.76.21.21`
   - **CNAME record:** `www` → `cname.vercel-dns.com`
4. In Vercel dashboard → Project Settings → Domains → add `thepdi.ie` and `www.thepdi.ie`
5. Vercel handles SSL automatically

If you need help with this, let me know which registrar you used and I'll walk you through it.

---

## Stripe Setup

1. Go to [stripe.com](https://stripe.com) → Create account
2. Connect PDI bank account (whoever has access to it)
3. Create a Payment Link in the Stripe dashboard:
   - "Let customer choose amount"
   - Add a description: "Donate to the PDI — all proceeds to Children's Health Foundation Crumlin"
4. Give me the Payment Link URL and I'll wire up the Donate button on the site
5. Later: build a proper /pay page for on-the-day use with QR codes
