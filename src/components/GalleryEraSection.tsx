import Image from "next/image";
import type { GalleryItem } from "@/data/gallery";

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
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.src}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {item.year && (
                  <span className="absolute bottom-2 right-2 rounded bg-pdi-dark/80 px-2 py-0.5 text-xs font-semibold text-pdi-text backdrop-blur-sm">
                    {item.year}
                  </span>
                )}
              </div>
            ))}
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
