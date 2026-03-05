import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import type { GalleryItem } from "@/sanity/types";

interface GalleryPreviewProps {
  images?: GalleryItem[];
  title?: string;
  description?: string;
  linkText?: string;
  uploadText?: string;
  uploadUrl?: string;
}

const fallbackImages = [
  { src: "/gallery/2018-cover.jpg", alt: "PDI 2018 booklet cover", era: "recent" },
  { src: "/gallery/2015-the-hazards.jpg", alt: "The Hazards — PDI house band", era: "the-hazards" },
  { src: "/gallery/2017-hof-induction.jpg", alt: "Hall of Fame induction 2017", era: "middle-years" },
  { src: "/gallery/2019-walkon-elvis.jpg", alt: "Elvis walk-on at PDI 2019", era: "walk-ons" },
  { src: "/gallery/early-event-03.jpg", alt: "Early PDI group photo", era: "early-days" },
  { src: "/gallery/2015-charity-cheque.jpg", alt: "PDI charity cheque presentation", era: "middle-years" },
];

export default function GalleryPreview({ images, title, description, linkText, uploadText, uploadUrl }: GalleryPreviewProps) {
  const items = images ?? fallbackImages;

  return (
    <section id="gallery" className="bg-pdi-navy py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <h2 className="font-display text-4xl font-semibold text-pdi-text md:text-5xl">
            {title ?? "Gallery"}
          </h2>
          <p className="mt-4 text-lg text-pdi-muted">
            {description ?? "Scenes from twenty years of the PDI."}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="mt-12 columns-2 gap-3 md:columns-3">
            {items.map((img) => (
              <Link
                key={img.src}
                href="/gallery"
                className="mb-3 block overflow-hidden rounded-lg"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  quality={85}
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </Link>
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              href="/gallery"
              className="text-sm font-semibold text-pdi-green transition-colors hover:text-pdi-text"
            >
              {linkText ?? "View full gallery \u2192"}
            </Link>
            <a
              href={uploadUrl ?? "https://drive.google.com/drive/folders/1-kvii3GsJKUeMsDYhd8q2ZqTzYvJU_M7?usp=sharing"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-pdi-muted transition-colors hover:text-pdi-text"
            >
              {uploadText ?? "Got photos? Upload them here \u2192"}
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
