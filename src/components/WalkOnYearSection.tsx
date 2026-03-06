import type { GalleryItem } from "@/sanity/types";
import GalleryLightbox from "./GalleryLightbox";

interface WalkOnYearSectionProps {
  year: number;
  winner?: string;
  walkOnName?: string;
  items: GalleryItem[];
}

export default function WalkOnYearSection({
  year,
  winner,
  walkOnName,
  items,
}: WalkOnYearSectionProps) {
  const hasContent = winner || items.length > 0;

  return (
    <section
      id={`year-${year}`}
      className="scroll-mt-32 border-t border-white/5 py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl text-pdi-text md:text-4xl">
          {year}
        </h2>

        {winner && (
          <div className="mt-8 rounded-xl bg-pdi-navy p-8">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-pdi-muted">
              Walk-on of the Year
            </span>
            <p className="mt-4 text-2xl font-semibold text-pdi-green">
              {winner}
            </p>
            {walkOnName && (
              <p className="mt-2 text-pdi-muted italic">
                &ldquo;{walkOnName}&rdquo;
              </p>
            )}
          </div>
        )}

        {items.length > 0 ? (
          <div className="mt-10">
            <GalleryLightbox items={items} />
          </div>
        ) : !hasContent ? (
          <div className="mt-8 flex h-32 items-center justify-center rounded-xl border border-dashed border-white/10 bg-pdi-navy/50">
            <p className="text-sm text-pdi-muted italic">Photos coming soon</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
