import type { Competition } from "@/sanity/types";

export default function CompetitionSection({
  competition,
  sectionId,
}: {
  competition: Competition;
  sectionId?: string;
}) {
  const results = [...competition.results].sort((a, b) => b.year - a.year);
  const hasVenue = results.some((r) => r.venue);
  const hasRunnerUp = results.some((r) => r.runnerUp);
  const hasWalkOnName = results.some((r) => r.walkOnName);
  const winnerLabel = competition.name === "Hall of Fame" ? "Inductee" : "Winner";

  return (
    <div id={sectionId} className="scroll-mt-32 rounded-xl bg-pdi-navy p-8">
      <h2 className="font-display text-3xl text-pdi-text">
        {competition.name}
      </h2>
      <p className="mt-3 max-w-2xl text-pdi-muted">{competition.description}</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-pdi-muted">
              <th className="w-[80px] pb-3 pr-6 font-semibold">Year</th>
              {hasVenue && (
                <th className="w-[200px] pb-3 pr-6 font-semibold">Venue</th>
              )}
              <th className="w-[180px] pb-3 pr-6 font-semibold">{winnerLabel}</th>
              {hasWalkOnName && (
                <th className="w-[180px] pb-3 pr-6 font-semibold">Walk-on</th>
              )}
              {hasRunnerUp && (
                <th className="w-[180px] pb-3 font-semibold">Runner-up</th>
              )}
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr
                key={result.year}
                className="border-b border-white/5 last:border-0"
              >
                <td className="w-[80px] py-3 pr-6 font-semibold text-pdi-text">
                  {result.year}
                </td>
                {hasVenue && (
                  <td className="w-[200px] py-3 pr-6 text-pdi-muted">
                    {result.venue ?? "—"}
                  </td>
                )}
                <td className="w-[180px] py-3 pr-6 text-pdi-green">
                  {result.winner ?? "—"}
                </td>
                {hasWalkOnName && (
                  <td className="w-[180px] py-3 pr-6 text-pdi-muted italic">
                    {result.walkOnName ?? "—"}
                  </td>
                )}
                {hasRunnerUp && (
                  <td className="w-[180px] py-3 text-pdi-muted">
                    {result.runnerUp ?? "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
