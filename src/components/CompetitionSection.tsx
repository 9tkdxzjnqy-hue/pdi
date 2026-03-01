import { Competition } from "@/data/competitions";

export default function CompetitionSection({
  competition,
}: {
  competition: Competition;
}) {
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
              {competition.showFinalists && (
                <th className="pb-3 font-semibold">Finalists</th>
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
                <td className="py-3 pr-6 text-pdi-green">{result.winner}</td>
                {competition.showFinalists && (
                  <td className="py-3 text-pdi-muted">
                    {result.finalists?.join(", ") ?? "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm italic text-pdi-muted">
        Previous winners can claim their rightful spot — get in touch.
      </p>
    </div>
  );
}
