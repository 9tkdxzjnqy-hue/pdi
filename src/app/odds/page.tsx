import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import OddsHero from "@/components/OddsHero";
import { odds, eachWayTerms } from "@/data/odds";

export const metadata: Metadata = {
  title: "PawnBet — PDI",
  description:
    "Ante-post odds for the 2026 Paddy's Day Invitational. Who's your pick?",
};

export default function OddsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-pdi-dark">
      <Navbar />
      <OddsHero />

      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* Odds Board */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {odds.map((entry) => {
            const message = encodeURIComponent(
              `Hi PawnBet, I want to back ${entry.name} at ${entry.odds}`
            );
            return (
              <a
                key={entry.name}
                href={`https://wa.me/353872547549?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-pdi-navy p-6 transition-colors active:bg-white/10 md:pointer-events-none"
              >
                <span className="font-display text-xl text-pdi-text">
                  {entry.name}
                </span>
                <span className="font-display text-2xl text-pdi-green">
                  {entry.odds}
                </span>
              </a>
            );
          })}
        </div>

        {/* Each-Way Terms */}
        <div className="mt-12 rounded-xl bg-pdi-navy p-6">
          <h2 className="font-display text-lg text-pdi-text">
            Each-Way Terms
          </h2>
          <p className="mt-3 text-sm text-pdi-muted">
            An each-way bet pays out if your player finishes{" "}
            <span className="text-pdi-green">1st</span> or{" "}
            <span className="text-pdi-green">2nd</span> in{" "}
            <span className="text-pdi-green">the PDI</span>, or wins{" "}
            <span className="text-pdi-green">the Shield</span> — all at{" "}
            {eachWayTerms.fraction}.
          </p>
        </div>
      </div>
    </main>
  );
}
