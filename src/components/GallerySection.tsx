import type { GalleryItem } from "@/sanity/types";
import GalleryLightbox from "./GalleryLightbox";

interface GallerySectionProps {
  id: string;
  label: string;
  items: GalleryItem[];
}

export default function GallerySection({ id, label, items }: GallerySectionProps) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-3xl text-pdi-text md:text-4xl">
          {label}
        </h2>
        {items.length > 0 ? (
          <div className="mt-10">
            <GalleryLightbox items={items} />
          </div>
        ) : (
          <p className="mt-10 text-sm text-pdi-muted italic">
            Photos coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
