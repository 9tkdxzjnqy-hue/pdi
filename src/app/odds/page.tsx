import type { Metadata } from "next";
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
      <OddsHero />

      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* Each-Way Terms */}
        <div className="mb-12 rounded-xl bg-pdi-navy p-6">
          <h2 className="font-display text-lg text-pdi-text">
            Each-Way Terms
          </h2>
          <ul className="mt-3 space-y-1 text-sm text-pdi-muted">
            <li>
              <span className="text-pdi-green">{eachWayTerms.places}</span> at{" "}
              {eachWayTerms.fraction} (PDI)
            </li>
            <li>
              <span className="text-pdi-green">3rd place:</span>{" "}
              {eachWayTerms.bonus}
            </li>
          </ul>
        </div>

        {/* Odds Board */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {odds.map((entry) => (
            <div
              key={entry.name}
              className="flex items-center justify-between rounded-xl bg-pdi-navy p-6"
            >
              <span className="font-display text-xl text-pdi-text">
                {entry.name}
              </span>
              <span className="font-display text-2xl text-pdi-green">
                {entry.odds}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
