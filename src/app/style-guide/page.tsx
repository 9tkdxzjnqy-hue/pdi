"use client";

import localFont from "next/font/local";

const cabinetGrotesk = localFont({
  src: "../../../public/fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-preview-display",
  display: "swap",
});

const satoshi = localFont({
  src: "../../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-preview-body",
  display: "swap",
});

// New design tokens (inline — doesn't affect globals.css)
const tokens = {
  cream: "#F8F5EB",
  dark: "#0A0F1C",
  navy: "#141428",
  green: "#00FF92",
  purple: "#7F3DFF",
  teal: "#00E6B8",
  text: "#F5F0E6",
  muted: "#9CA3AF",
};

function Swatch({ name, hex, dark }: { name: string; hex: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="h-16 w-16 rounded-lg border border-white/10"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p style={{ color: dark ? tokens.dark : tokens.text, fontFamily: "var(--font-preview-body)" }} className="text-sm font-semibold">
          {name}
        </p>
        <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="text-xs">
          {hex}
        </p>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <div className={`${cabinetGrotesk.variable} ${satoshi.variable}`}>
      {/* ── Dark section ── */}
      <section style={{ backgroundColor: tokens.dark }} className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h1
            style={{
              fontFamily: "var(--font-preview-display)",
              color: tokens.text,
              fontSize: "clamp(2.5rem, 5vw + 1rem, 5.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 700,
            }}
          >
            Style Guide Preview
          </h1>
          <p
            style={{
              fontFamily: "var(--font-preview-body)",
              color: tokens.muted,
              fontSize: "clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)",
              lineHeight: 1.5,
              marginTop: "1.5rem",
            }}
          >
            Warm Cinematic Neubrutalism — previewing the new design tokens, fonts, and components.
            This page is temporary and will be deleted after approval.
          </p>

          {/* ── Colour Palette ── */}
          <div style={{ marginTop: "4rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-preview-display)",
                color: tokens.text,
                fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                fontWeight: 600,
              }}
            >
              Colour Palette
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <Swatch name="pdi-cream" hex={tokens.cream} />
              <Swatch name="pdi-dark" hex={tokens.dark} />
              <Swatch name="pdi-navy" hex={tokens.navy} />
              <Swatch name="pdi-green" hex={tokens.green} />
              <Swatch name="pdi-purple" hex={tokens.purple} />
              <Swatch name="pdi-teal" hex={tokens.teal} />
              <Swatch name="pdi-text" hex={tokens.text} />
              <Swatch name="pdi-muted" hex={tokens.muted} />
            </div>
          </div>

          {/* ── Type Scale ── */}
          <div style={{ marginTop: "4rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-preview-display)",
                color: tokens.text,
                fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                fontWeight: 600,
              }}
            >
              Type Scale
            </h2>

            <div className="mt-8 space-y-8">
              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-2 text-xs uppercase tracking-widest">
                  Hero Headline (Cabinet Grotesk 700)
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-preview-display)",
                    color: tokens.text,
                    fontSize: "clamp(2.5rem, 5vw + 1rem, 5.5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    fontWeight: 700,
                  }}
                >
                  Twenty Years of Walk-ons
                </p>
              </div>

              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-2 text-xs uppercase tracking-widest">
                  Page Title / H1 (Cabinet Grotesk 700)
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-preview-display)",
                    color: tokens.text,
                    fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                    fontWeight: 700,
                  }}
                >
                  The Competitions
                </p>
              </div>

              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-2 text-xs uppercase tracking-widest">
                  Section Heading / H2 (Cabinet Grotesk 600)
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-preview-display)",
                    color: tokens.text,
                    fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    fontWeight: 600,
                  }}
                >
                  Where It All Started
                </p>
              </div>

              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-2 text-xs uppercase tracking-widest">
                  Card Title / H3 (Cabinet Grotesk 600)
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-preview-display)",
                    color: tokens.text,
                    fontSize: "1.5rem",
                    lineHeight: 1.25,
                    fontWeight: 600,
                  }}
                >
                  The Bat
                </p>
              </div>

              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-2 text-xs uppercase tracking-widest">
                  Lead Paragraph (Satoshi 400)
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-preview-body)",
                    color: tokens.muted,
                    fontSize: "clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)",
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  What began as a few mates throwing darts on St Patrick&apos;s Day has grown into one of Dublin&apos;s most beloved charity events.
                </p>
              </div>

              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-2 text-xs uppercase tracking-widest">
                  Body Text (Satoshi 400)
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-preview-body)",
                    color: tokens.text,
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    fontWeight: 400,
                  }}
                >
                  Over twenty years, the walk-ons have gotten bigger, the fancy dress more outrageous, and the cause more important. Every cent raised goes to Children&apos;s Health Foundation Crumlin. It&apos;s never been about the darts — it&apos;s about what the darts make possible.
                </p>
              </div>

              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-2 text-xs uppercase tracking-widest">
                  Caption (Satoshi 400, 0.875rem)
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-preview-body)",
                    color: tokens.muted,
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  Photo from PDI 2019 — the last pre-pandemic year
                </p>
              </div>

              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-2 text-xs uppercase tracking-widest">
                  Label (Satoshi 600, 0.75rem, uppercase)
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-preview-body)",
                    color: tokens.muted,
                    fontSize: "0.75rem",
                    lineHeight: 1.5,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Hall of Fame &middot; Class of 2019
                </p>
              </div>
            </div>
          </div>

          {/* ── Buttons ── */}
          <div style={{ marginTop: "4rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-preview-display)",
                color: tokens.text,
                fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                fontWeight: 600,
              }}
            >
              Buttons (on dark)
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {/* Primary */}
              <button
                style={{
                  backgroundColor: tokens.green,
                  color: tokens.dark,
                  fontFamily: "var(--font-preview-body)",
                }}
                className="rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                Donate
              </button>

              {/* Secondary */}
              <button
                style={{
                  borderColor: tokens.purple,
                  color: tokens.purple,
                  fontFamily: "var(--font-preview-body)",
                }}
                className="rounded-full border-2 px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-[#7F3DFF] hover:text-white"
              >
                Learn More
              </button>

              {/* Text link */}
              <a
                style={{
                  color: tokens.green,
                  fontFamily: "var(--font-preview-body)",
                }}
                className="text-sm font-semibold transition-colors"
                href="#"
              >
                View Gallery &rarr;
              </a>
            </div>
          </div>

          {/* ── Card ── */}
          <div style={{ marginTop: "4rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-preview-display)",
                color: tokens.text,
                fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                fontWeight: 600,
              }}
            >
              Card Component
            </h2>
            <div className="mt-8 max-w-md">
              <div
                style={{ backgroundColor: tokens.navy }}
                className="rounded-xl p-8 transition duration-300 hover:bg-white/5"
              >
                <h3
                  style={{
                    fontFamily: "var(--font-preview-display)",
                    color: tokens.text,
                    fontSize: "1.5rem",
                    fontWeight: 600,
                  }}
                >
                  The Bat
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-preview-body)",
                    color: tokens.muted,
                    marginTop: "0.75rem",
                    lineHeight: 1.7,
                  }}
                >
                  The one who started it all. First inductee to the PDI Hall of Fame.
                </p>
                <span
                  className="mt-6 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: tokens.muted,
                    fontFamily: "var(--font-preview-body)",
                  }}
                >
                  Class of 2011
                </span>
              </div>
            </div>
          </div>

          {/* ── Table ── */}
          <div style={{ marginTop: "4rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-preview-display)",
                color: tokens.text,
                fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                fontWeight: 600,
              }}
            >
              Competition Results Table
            </h2>
            <div className="mt-8 max-w-lg">
              <table className="w-full text-left text-sm" style={{ fontFamily: "var(--font-preview-body)" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.1)` }}>
                    <th style={{ color: tokens.muted, paddingBottom: "0.75rem", paddingRight: "1.5rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Year</th>
                    <th style={{ color: tokens.muted, paddingBottom: "0.75rem", paddingRight: "1.5rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Winner</th>
                    <th style={{ color: tokens.muted, paddingBottom: "0.75rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Runner-up</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: "2019", winner: "The Boy", runnerUp: "The Physio" },
                    { year: "2018", winner: "The Gun", runnerUp: "The Express" },
                    { year: "2017", winner: "The Trick", runnerUp: "The Cat" },
                  ].map((row) => (
                    <tr key={row.year} style={{ borderBottom: `1px solid rgba(255, 255, 255, 0.05)` }}>
                      <td style={{ color: tokens.text, padding: "0.75rem 1.5rem 0.75rem 0", fontWeight: 600 }}>{row.year}</td>
                      <td style={{ color: tokens.green, padding: "0.75rem 1.5rem 0.75rem 0" }}>{row.winner}</td>
                      <td style={{ color: tokens.muted, padding: "0.75rem 0" }}>{row.runnerUp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Motion Preview ── */}
          <div style={{ marginTop: "4rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-preview-display)",
                color: tokens.text,
                fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                fontWeight: 600,
              }}
            >
              Motion Preview
            </h2>

            <div className="mt-8 space-y-8">
              {/* Reveal animation */}
              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-4 text-xs uppercase tracking-widest">
                  Reveal Animation (plays on load)
                </p>
                <div
                  className="max-w-md rounded-xl p-8"
                  style={{
                    backgroundColor: tokens.navy,
                    animation: "reveal-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                >
                  <p style={{ color: tokens.text, fontFamily: "var(--font-preview-display)", fontWeight: 600, fontSize: "1.5rem" }}>
                    This card reveals upward
                  </p>
                </div>
              </div>

              {/* Hover glow */}
              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-4 text-xs uppercase tracking-widest">
                  Hover Glow (hover the button)
                </p>
                <button
                  style={{
                    backgroundColor: tokens.green,
                    color: tokens.dark,
                    fontFamily: "var(--font-preview-body)",
                  }}
                  className="rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 24px rgba(0, 255, 146, 0.25)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Hover for glow
                </button>
              </div>

              {/* Drift animation */}
              <div>
                <p style={{ color: tokens.muted, fontFamily: "var(--font-preview-body)" }} className="mb-4 text-xs uppercase tracking-widest">
                  Drift Animation (hero smoke effect)
                </p>
                <div className="relative h-48 overflow-hidden rounded-xl" style={{ backgroundColor: tokens.dark }}>
                  <div
                    className="absolute -top-10 -left-10 h-32 w-32 rounded-full"
                    style={{
                      backgroundColor: `${tokens.green}33`,
                      filter: "blur(60px)",
                      animation: "drift 8s ease-in-out infinite",
                    }}
                  />
                  <div
                    className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full"
                    style={{
                      backgroundColor: `${tokens.purple}33`,
                      filter: "blur(60px)",
                      animation: "drift 8s ease-in-out infinite 4s",
                    }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      backgroundColor: `${tokens.teal}14`,
                      filter: "blur(50px)",
                      animation: "drift 8s ease-in-out infinite 2s",
                    }}
                  />
                  <div className="relative z-10 flex h-full items-center justify-center">
                    <p style={{ color: tokens.text, fontFamily: "var(--font-preview-display)", fontWeight: 700, fontSize: "1.5rem" }}>
                      Atmospheric drift
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tonal Arc Demo: Cream → Dark ── */}
      <section style={{ backgroundColor: tokens.cream }} className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2
            style={{
              fontFamily: "var(--font-preview-display)",
              color: tokens.dark,
              fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              fontWeight: 600,
            }}
          >
            Tonal Arc: Cream Section
          </h2>
          <p
            style={{
              fontFamily: "var(--font-preview-body)",
              color: `${tokens.dark}cc`,
              fontSize: "1rem",
              lineHeight: 1.7,
              marginTop: "1rem",
            }}
          >
            This is the warm, welcoming part of the homepage — the &quot;arriving at the venue&quot; feel.
            Text is dark on cream. Links use purple.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            {/* Buttons on cream */}
            <button
              style={{
                backgroundColor: tokens.green,
                color: tokens.dark,
                fontFamily: "var(--font-preview-body)",
              }}
              className="rounded-full px-6 py-3 text-sm font-semibold"
            >
              Donate
            </button>
            <button
              style={{
                borderColor: tokens.purple,
                color: tokens.purple,
                fontFamily: "var(--font-preview-body)",
              }}
              className="rounded-full border-2 px-6 py-3 text-sm font-semibold"
            >
              Learn More
            </button>
            <a
              style={{
                color: tokens.purple,
                fontFamily: "var(--font-preview-body)",
              }}
              className="text-sm font-semibold"
              href="#"
            >
              Read More &rarr;
            </a>
          </div>

          {/* Colour swatches on light background */}
          <div className="mt-12">
            <h3
              style={{
                fontFamily: "var(--font-preview-display)",
                color: tokens.dark,
                fontSize: "1.5rem",
                fontWeight: 600,
              }}
            >
              Swatches on Cream
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <Swatch name="pdi-dark" hex={tokens.dark} dark />
              <Swatch name="pdi-green" hex={tokens.green} dark />
              <Swatch name="pdi-purple" hex={tokens.purple} dark />
              <Swatch name="pdi-teal" hex={tokens.teal} dark />
            </div>
          </div>
        </div>
      </section>

      {/* Back to dark — the venue */}
      <section style={{ backgroundColor: tokens.dark }} className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2
            style={{
              fontFamily: "var(--font-preview-display)",
              color: tokens.text,
              fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              fontWeight: 600,
            }}
          >
            Tonal Arc: Dark Section
          </h2>
          <p
            style={{
              fontFamily: "var(--font-preview-body)",
              color: tokens.muted,
              fontSize: "1rem",
              lineHeight: 1.7,
              marginTop: "1rem",
            }}
          >
            Now you&apos;re inside the venue. The lights are off. The walk-on is about to start.
          </p>

          {/* Hero teaser card (no image) */}
          <div className="mt-8 max-w-md">
            <div
              className="relative overflow-hidden rounded-xl p-8 text-center"
              style={{ backgroundColor: tokens.navy }}
            >
              <div
                className="absolute -top-20 -left-20 h-40 w-40 rounded-full"
                style={{ backgroundColor: `${tokens.green}33`, filter: "blur(80px)" }}
              />
              <div
                className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full"
                style={{ backgroundColor: `${tokens.purple}33`, filter: "blur(80px)" }}
              />
              <div className="relative z-10">
                <h3
                  style={{
                    fontFamily: "var(--font-preview-display)",
                    color: tokens.text,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  The Walk-on
                </h3>
                <p style={{ fontFamily: "var(--font-preview-body)", color: tokens.muted, marginTop: "0.75rem" }}>
                  Photos coming soon. Got any? Upload them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline keyframes for animations */}
      <style>{`
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(30px, -20px) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
