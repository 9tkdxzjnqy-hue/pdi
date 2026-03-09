import Image from "next/image";
import type { GalleryItem } from "@/sanity/types";
import GalleryLightbox from "./GalleryLightbox";

function SilhouetteSvg() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-pdi-muted/20"
      aria-hidden="true"
    >
      <circle cx="60" cy="42" r="20" fill="currentColor" />
      <ellipse cx="60" cy="95" rx="35" ry="25" fill="currentColor" />
    </svg>
  );
}

interface WalkOnYearSectionProps {
  year: number;
  winner?: string;
  walkOnName?: string;
  winnerPhoto?: string;
  items: GalleryItem[];
}

export default function WalkOnYearSection({
  year,
  winner,
  walkOnName,
  winnerPhoto,
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
          <div className="mt-8 flex flex-col overflow-hidden rounded-xl border-l-4 border-pdi-green bg-pdi-navy md:flex-row">
            {/* Thumbnail */}
            <div className="flex aspect-square w-full items-center justify-center bg-white/5 md:w-48 md:shrink-0">
              {winnerPhoto ? (
                <Image
                  src={winnerPhoto}
                  alt={winner}
                  width={400}
                  height={400}
                  quality={85}
                  className="h-full w-full object-cover"
                />
              ) : (
                <SilhouetteSvg />
              )}
            </div>

            {/* Text content */}
            <div className="p-6 md:p-8">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-pdi-muted">
                Walk-on of the Year
              </span>
              <p className="mt-4 font-display text-2xl text-pdi-green">
                {winner}
              </p>
              {walkOnName && (
                <p className="mt-2 text-pdi-muted italic">
                  &ldquo;{walkOnName}&rdquo;
                </p>
              )}
            </div>
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
