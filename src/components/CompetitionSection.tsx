import { Competition } from "@/data/competitions";

export default function CompetitionSection({
  competition,
}: {
  competition: Competition;
}) {
  const hasRunnerUp = competition.results.some((r) => r.runnerUp);
  const hasWalkOnName = competition.results.some((r) => r.walkOnName);

  return (
    <div className="rounded-xl bg-pdi-navy p-8">
      <h2 className="font-display text-3xl text-pdi-text">
        {competition.name}
      </h2>
      <p className="mt-3 max-w-2xl text-pdi-muted">{competition.description}</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-pdi-muted">
              <th className="pb-3 pr-6 font-semibold">Year</th>
              <th className="pb-3 pr-6 font-semibold">Winner</th>
              {hasWalkOnName && (
                <th className="pb-3 pr-6 font-semibold">Walk-on</th>
              )}
              {hasRunnerUp && (
                <th className="pb-3 font-semibold">Runner-up</th>
              )}
            </tr>
          </thead>
          <tbody>
            {competition.results.map((result) => (
              <tr
                key={result.year}
                className="border-b border-white/5 last:border-0"
              >
                <td className="py-3 pr-6 font-semibold text-pdi-text">
                  {result.year}
                </td>
                <td className="py-3 pr-6 text-pdi-green">
                  {result.winner ?? "—"}
                </td>
                {hasWalkOnName && (
                  <td className="py-3 pr-6 text-pdi-muted italic">
                    {result.walkOnName ?? "—"}
                  </td>
                )}
                {hasRunnerUp && (
                  <td className="py-3 text-pdi-muted">
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
