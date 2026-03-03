# PDI Design System

## 1. Core Aesthetic Statement

> **Warm Cinematic Neubrutalism.** Every design decision filters through the walk-on moment — a player emerging through wooden double doors into smoke, electric green and purple strobes, and the roar of a crowd. The homepage is warm and welcoming (you're arriving at the venue). Deeper pages progressively darken into cinematic, high-contrast drama (you're inside, the lights are down, the walk-on is about to start). Typography is bold and raw. Whitespace is generous. Nothing is corporate, nothing is clichéd, everything is confident.

---

## 2. Colour Palette

### Light canvas (homepage)

```css
--pdi-cream: #F8F5EB;    /* warm off-white, like aged paper under pub lighting */
```

### Dark canvas (inner pages)

```css
--pdi-dark:  #0A0F1C;    /* deep navy-black — the venue with the lights off */
--pdi-navy:  #141428;    /* elevated surface — cards, nav, panels */
```

### Accent — stage lighting

```css
--pdi-green:  #00FF92;   /* electric walk-on green — CTAs, highlights, winner names */
--pdi-purple: #7F3DFF;   /* purple-violet strobes — secondary accent, badges, borders */
--pdi-teal:   #00E6B8;   /* sequin reflection — hovers, cinematic glows, light effects */
```

### Text

```css
--pdi-text:   #F5F0E6;   /* warm off-white on dark backgrounds */
--pdi-muted:  #9CA3AF;   /* secondary text, descriptions, metadata */
```

### Semantic usage

| Context | Colour | Notes |
|---------|--------|-------|
| Body text on dark | `pdi-text` | Primary readable text |
| Body text on cream | `pdi-dark` | Dark text on light canvas |
| Muted/secondary | `pdi-muted` | Subtitles, descriptions, table data |
| Links & CTAs on dark | `pdi-green` | Electric, unmissable |
| Links on cream | `pdi-purple` | Deep violet, strong contrast |
| Winner names in tables | `pdi-green` | Celebration colour |
| Badges/labels | `bg-white/10 text-pdi-muted` | Subtle, non-competing |
| Fundraising total | `pdi-green` at display scale | The number should hit you |
| Donate button | `bg-pdi-green text-pdi-dark` | High contrast, inverted |
| Hover states / glows | `pdi-teal` | Cinematic sequin shimmer on interactive elements |
| Light effects / smoke | `pdi-teal` | Hero drifting orbs, atmospheric blur circles |

### Contrast ratios (WCAG AA minimum 4.5:1)

- `pdi-text` (#F5F0E6) on `pdi-dark` (#0A0F1C): **15.8:1** — passes AAA
- `pdi-green` (#00FF92) on `pdi-dark` (#0A0F1C): **12.0:1** — passes AAA
- `pdi-muted` (#9CA3AF) on `pdi-dark` (#0A0F1C): **6.8:1** — passes AA
- `pdi-dark` (#0A0F1C) on `pdi-cream` (#F8F5EB): **16.1:1** — passes AAA
- `pdi-purple` (#7F3DFF) on `pdi-cream` (#F8F5EB): **4.6:1** — passes AA

### Tailwind v4 `@theme` block

```css
@theme {
  --color-pdi-cream:  #F8F5EB;
  --color-pdi-dark:   #0A0F1C;
  --color-pdi-navy:   #141428;
  --color-pdi-green:  #00FF92;
  --color-pdi-purple: #7F3DFF;
  --color-pdi-teal:   #00E6B8;
  --color-pdi-text:   #F5F0E6;
  --color-pdi-muted:  #9CA3AF;
}
```

---

## 3. Typography System

### Display / Headings

**Cabinet Grotesk Variable** (Fontshare, free commercial)
- Weight 600 (Semibold) for sub-headings, 700 (Bold) for hero headlines
- Tight tracking: `letter-spacing: -0.02em` at large sizes
- The typeface is geometric, bold, and slightly quirky — confident without being aggressive

### Body

**Satoshi Variable** (Fontshare, free commercial)
- Weight 400 (Regular) for body, 500 (Medium) for emphasis
- Generous line-height: 1.7 for body, 1.5 for lead text
- Clean, modern, highly readable — more characterful than Inter

### Font loading

Self-hosted via `next/font/local` (`.woff2` in `public/fonts/`). Zero FOUT.

### Type scale (mobile-first with `clamp()`)

```css
/* Hero headline */
--text-hero: clamp(2.5rem, 5vw + 1rem, 5.5rem);
/* line-height: 1.05; letter-spacing: -0.02em; font-weight: 700 */

/* Page title (h1) */
--text-title: clamp(2rem, 4vw + 0.5rem, 4rem);
/* line-height: 1.1; letter-spacing: -0.015em; font-weight: 700 */

/* Section heading (h2) */
--text-section: clamp(1.75rem, 3vw + 0.5rem, 3rem);
/* line-height: 1.15; letter-spacing: -0.01em; font-weight: 600 */

/* Card title (h3) */
--text-card: 1.5rem;
/* line-height: 1.25; font-weight: 600 */

/* Lead paragraph */
--text-lead: clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem);
/* line-height: 1.5; font-weight: 400 */

/* Body */
--text-body: 1rem;
/* line-height: 1.7; font-weight: 400 */

/* Caption / metadata */
--text-caption: 0.875rem;
/* line-height: 1.5; font-weight: 400 */

/* Label (badges, table headers) */
--text-label: 0.75rem;
/* line-height: 1.5; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em */
```

### Dark vs light variants

- On dark backgrounds: `text-pdi-text` for headings, `text-pdi-muted` for body/secondary
- On cream backgrounds: `text-pdi-dark` for headings, `text-pdi-dark/80` for body

---

## 4. Spacing & Layout Grid

### 8-point scale

All spacing in multiples of 0.5rem / 8px:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 0.25rem (4px) | Inline gaps, icon padding |
| `space-2` | 0.5rem (8px) | Tight gaps, badge padding |
| `space-3` | 0.75rem (12px) | Small gaps between related items |
| `space-4` | 1rem (16px) | Default paragraph spacing |
| `space-6` | 1.5rem (24px) | Card internal spacing, heading margins |
| `space-8` | 2rem (32px) | Card padding, section sub-spacing |
| `space-12` | 3rem (48px) | Grid gaps, component spacing |
| `space-16` | 4rem (64px) | Section vertical padding (inner pages) |
| `space-24` | 6rem (96px) | Section vertical padding (homepage) |
| `space-32` | 8rem (128px) | Hero top padding (navbar clearance) |

### Container widths

- `max-w-7xl` (80rem): Full-width content areas, grids
- `max-w-3xl` (48rem): Centred text blocks (heroes, story pages)
- `max-w-5xl` (64rem): Hero content area
- Horizontal padding: `px-6` (1.5rem) on all containers

### Responsive grid

```
/* Cards grid */
grid-cols-1 → md:grid-cols-2 → lg:grid-cols-3

/* Competition preview cards */
grid-cols-1 → sm:grid-cols-2 → lg:grid-cols-4

/* Gallery images */
grid-cols-2 → md:grid-cols-3 → lg:grid-cols-4

/* Two-column content (Story, Charity, Tribute) */
grid-cols-1 → md:grid-cols-2 (with gap-12 lg:gap-20)
```

### Whitespace principles

- Whitespace is a feature, not wasted space. When in doubt, add more.
- Sections breathe: `py-24` on homepage, `py-16` on inner pages.
- Cards are generous: `p-8` internal padding. Never cram.
- Between a heading and its first paragraph: `mt-4` to `mt-6`. Let the heading land.
- Between sections: visible separation through colour change or `border-white/5`, never just margin alone.

---

## 5. UI Components

### Primary button (Donate CTA)

```html
<button class="rounded-full bg-pdi-green px-6 py-3 text-sm font-semibold
  text-pdi-dark transition-all duration-300
  hover:shadow-[0_0_20px_rgba(0,255,146,0.3)] hover:scale-[1.02]">
  Donate
</button>
```

### Secondary button (outlined)

```html
<button class="rounded-full border-2 border-pdi-purple px-6 py-3 text-sm
  font-semibold text-pdi-purple transition-colors duration-300
  hover:bg-pdi-purple hover:text-white">
  Learn More
</button>
```

### Text link (on dark)

```html
<a class="text-sm font-semibold text-pdi-green transition-colors
  hover:text-pdi-teal">
  View Gallery →
</a>
```

### Text link (on cream)

```html
<a class="text-sm font-semibold text-pdi-purple transition-colors
  hover:text-pdi-dark">
  Read More →
</a>
```

### Navigation

- Desktop: fixed top, fully transparent at page top, gains `bg-pdi-dark/80 backdrop-blur-md` on scroll
- Logo: `font-display font-bold text-2xl text-pdi-text`
- Nav links: `text-sm text-pdi-muted hover:text-pdi-text transition-colors`
- Donate CTA: primary button style, always visible
- Mobile: hamburger → full-screen overlay with stacked links

### Card (standard — inductees, story threads)

```html
<div class="rounded-xl bg-pdi-navy p-8 transition duration-300
  hover:bg-white/5">
  <h3 class="font-display text-2xl font-semibold text-pdi-text">Title</h3>
  <p class="mt-3 text-pdi-muted">Description text.</p>
  <span class="mt-6 inline-block rounded-full bg-white/10 px-3 py-1
    text-xs font-semibold text-pdi-muted">
    Badge
  </span>
</div>
```

### Competition results table

```html
<table class="w-full text-left text-sm">
  <thead>
    <tr class="border-b border-white/10 text-xs uppercase tracking-wider text-pdi-muted">
      <th class="pb-3 pr-6 font-semibold">Year</th>
      <th class="pb-3 pr-6 font-semibold">Winner</th>
      <th class="pb-3 font-semibold">Runner-up</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-white/5">
      <td class="py-3 pr-6 font-semibold text-pdi-text">2019</td>
      <td class="py-3 pr-6 text-pdi-green">The Boy</td>
      <td class="py-3 text-pdi-muted">The Physio</td>
    </tr>
  </tbody>
</table>
```

### Hero teaser card (no image available yet)

```html
<div class="relative overflow-hidden rounded-xl bg-pdi-navy p-8 text-center">
  <div class="absolute -top-20 -left-20 h-40 w-40 rounded-full
    bg-pdi-green/20 blur-[80px]"></div>
  <div class="absolute -bottom-20 -right-20 h-40 w-40 rounded-full
    bg-pdi-purple/20 blur-[80px]"></div>
  <div class="relative z-10">
    <h3 class="font-display text-2xl font-bold text-pdi-text">
      The Walk-on
    </h3>
    <p class="mt-3 text-pdi-muted">
      Photos coming soon. Got any? Upload them.
    </p>
  </div>
</div>
```

---

## 6. Motion & Interaction Guidelines

### Principle

Motion should feel like the venue — slow dramatic reveals, not bouncy UI. Everything eases out (deceleration), nothing springs.

### Reveal on scroll (CSS keyframe)

```css
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-reveal {
  animation: reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

### Stagger delays for card grids

```css
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
```

### Hover glow (CTAs and accent elements)

```css
.glow-green {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.glow-green:hover {
  box-shadow: 0 0 24px rgba(0, 255, 146, 0.25);
  transform: scale(1.02);
}
```

### Card hover

`transition duration-300 hover:bg-white/5` — subtle surface shift, not a lift.

### Image hover

`transition-transform duration-500 hover:scale-105` — slow cinematic zoom.

### Signature hero effect

On the homepage hero, gradient blur circles drift subtly using a slow CSS animation (8s+ duration, infinite). This creates the "smoke machine" feel without real video. The teal orb adds a sequin-reflection shimmer.

```css
@keyframes drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(30px, -20px) scale(1.1); }
}

.animate-drift {
  animation: drift 8s ease-in-out infinite;
}
```

### Reduced motion

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-reveal, .animate-drift { animation: none; }
  .glow-green:hover { transform: none; }
}
```

---

## 7. Imagery & Photography Treatment

**The walk-on photos are the soul of the site.** Every photo should feel like a film still from the walk-on moment.

### Full-bleed hero treatment (when image available)

```html
<div class="relative h-screen overflow-hidden">
  <Image src="..." fill class="object-cover" />
  <!-- Dark overlay: bottom-heavy gradient -->
  <div class="absolute inset-0 bg-gradient-to-t
    from-pdi-dark via-pdi-dark/60 to-transparent" />
  <!-- Noise texture -->
  <div class="noise absolute inset-0" />
  <!-- Content -->
  <div class="relative z-10 ...">...</div>
</div>
```

### Noise texture (reusable class)

```css
.noise::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256'
    xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence
    type='fractalNoise' baseFrequency='0.9' numOctaves='4'
    stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25'
    height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

### Photo grid treatment

- `aspect-square` with `object-cover` and `rounded-lg`
- On hover: slow scale (`duration-500 hover:scale-105`)
- Year badge: `absolute bottom-2 right-2 rounded bg-pdi-dark/80 px-2 py-0.5 text-xs font-semibold text-pdi-text backdrop-blur-sm`

### Competition preview cards (image with text overlay)

- `aspect-[3/4]` portrait ratio
- Gradient overlay: `bg-gradient-to-t from-pdi-dark via-pdi-dark/30 to-transparent`
- Text pinned to bottom: `absolute bottom-0 p-6`

---

## 8. Darts Icon Set (SVG, accent use only)

Five minimal icons, used sparingly as section dividers or card accents. Monoline stroke style, `currentColor` fill, sized at 24x24.

| Icon | Usage | Description |
|------|-------|-------------|
| Dartboard | Competitions section | Simple concentric circles with centre dot |
| Walk-on Doors | Hero / stories | Two vertical rectangles (double doors), slightly ajar |
| Shield | Shield competition | Classic shield silhouette |
| Trophy | Hall of Fame, winners | Minimal cup with handles |
| Arrow (dart) | CTAs, list items | Single dart in flight, angled |

These are decorative accents only — never primary UI.

---

## 9. Dark/Light Mode & Tonal Arc

**There is no toggle.** The tonal arc is baked into the page structure:

```
Homepage (warm welcome):
  ├── Hero         → bg-pdi-dark (dramatic entrance)
  ├── Story        → bg-pdi-cream (warm, light, inviting)
  ├── Charity      → bg-pdi-cream (continue warmth, the "why")
  ├── Competitions → bg-pdi-dark (energy rising)
  ├── Gallery      → bg-pdi-navy (settling into the venue)
  └── Footer       → bg-pdi-dark (close)

Sub-pages (you're inside the venue):
  ├── Hero/header  → bg-pdi-dark
  ├── Content      → bg-pdi-dark with bg-pdi-navy cards
  └── Footer       → bg-pdi-dark
```

The transition from light to dark on the homepage mirrors walking into the venue. You arrive in daylight (cream), pass through the doors (hero), and enter the dark room (competitions, gallery). Sub-pages are fully inside — the lights are off, the atmosphere is on.

### How this works in code

- `layout.tsx` body: `bg-pdi-cream` (default canvas)
- Light sections: inherit the cream background or use `bg-pdi-cream` explicitly
- Dark sections: override with `bg-pdi-dark` on the `<section>` or `<main>`
- Sub-pages: `<main class="bg-pdi-dark">` wraps everything
