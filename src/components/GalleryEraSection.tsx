import type { GalleryItem } from "@/data/gallery";
import GalleryLightbox from "./GalleryLightbox";

interface GalleryEraSectionProps {
  label: string;
  description: string;
  items: GalleryItem[];
  groupByYear?: boolean;
}

export default function GalleryEraSection({
  label,
  description,
  items,
  groupByYear,
}: GalleryEraSectionProps) {
  return (
    <section className="border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl text-pdi-text md:text-4xl">
          {label}
        </h2>
        <p className="mt-2 text-pdi-muted">{description}</p>

        {items.length > 0 ? (
          groupByYear ? (
            <YearGroupedGallery items={items} />
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

function YearGroupedGallery({ items }: { items: GalleryItem[] }) {
  const byYear = new Map<number, GalleryItem[]>();
  for (const item of items) {
    const y = item.year ?? 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(item);
  }

  const years = [...byYear.keys()].sort((a, b) => b - a);

  return (
    <div className="mt-10 space-y-12">
      {years.map((year) => (
        <div key={year}>
          <h3 className="font-display text-xl text-pdi-green">
            {year || "Other"}
          </h3>
          <div className="mt-4">
            <GalleryLightbox items={byYear.get(year)!} />
          </div>
        </div>
      ))}
    </div>
  );
}
