import { Inductee } from "@/data/hallOfFame";

export default function InducteeCard({ nickname, contribution, year }: Inductee) {
  const label = year ? `Inducted ${year}` : undefined;
  return (
    <div className="rounded-xl bg-pdi-navy p-8">
      <h3 className="font-display text-2xl text-pdi-text">{nickname}</h3>
      <p className="mt-3 text-pdi-muted">{contribution}</p>
      {label && (
        <span className="mt-6 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-pdi-muted">
          {label}
        </span>
      )}
    </div>
  );
}
