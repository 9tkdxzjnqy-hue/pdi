import type { GalleryItem } from "@/sanity/types";
import GalleryLightbox from "./GalleryLightbox";

interface GalleryEraSectionProps {
  eraId: string;
  label: string;
  description: string;
  items: GalleryItem[];
  groupByYear?: boolean;
  allYears?: number[];
}

export default function GalleryEraSection({
  eraId,
  label,
  description,
  items,
  groupByYear,
  allYears,
}: GalleryEraSectionProps) {
  return (
    <section id={`era-${eraId}`} className="scroll-mt-32 border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl text-pdi-text md:text-4xl">
          {label}
        </h2>
        <p className="mt-2 text-pdi-muted">{description}</p>

        {items.length > 0 || allYears ? (
          groupByYear ? (
            <YearGroupedGallery items={items} allYears={allYears} />
          ) : (
            <div className="mt-10">
              <GalleryLightbox items={items} />
            </div>
          )
        ) : (
          <p className="mt-10 text-sm text-pdi-muted italic">
            Photos from this era coming soon.
          </p>
        )}
      </div>
    </section>
  );
}

function YearGroupedGallery({
  items,
  allYears,
}: {
  items: GalleryItem[];
  allYears?: number[];
}) {
  const byYear = new Map<number, GalleryItem[]>();
  for (const item of items) {
    const y = item.year ?? 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(item);
  }

  const years = allYears ?? [...byYear.keys()].sort((a, b) => b - a);

  return (
    <div className="mt-10 space-y-12">
      {years.map((year) => {
        const yearItems = byYear.get(year);
        return (
          <div key={year}>
            <h3 className="font-display text-xl text-pdi-green">
              {year || "Other"}
            </h3>
            {yearItems && yearItems.length > 0 ? (
              <div className="mt-4">
                <GalleryLightbox items={yearItems} />
              </div>
            ) : (
              <div className="mt-4 flex h-32 items-center justify-center rounded-xl border border-dashed border-white/10 bg-pdi-navy/50">
                <p className="text-sm text-pdi-muted italic">
                  Photos coming soon
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
