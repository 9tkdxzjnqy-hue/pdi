import type { GalleryItem } from "@/data/gallery";
import GalleryLightbox from "./GalleryLightbox";

interface GalleryEraSectionProps {
  label: string;
  description: string;
  items: GalleryItem[];
}

export default function GalleryEraSection({
  label,
  description,
  items,
}: GalleryEraSectionProps) {
  return (
    <section className="border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl text-pdi-text md:text-4xl">
          {label}
        </h2>
        <p className="mt-2 text-pdi-muted">{description}</p>

        {items.length > 0 ? (
          <div className="mt-10">
            <GalleryLightbox items={items} />
          </div>
        ) : (
          <p className="mt-10 text-sm text-pdi-muted italic">
            Photos from this era coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
