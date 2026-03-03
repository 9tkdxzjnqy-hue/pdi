import Image from "next/image";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

const previewImages = [
  { src: "/gallery/2018-cover.jpg", alt: "PDI 2018 booklet cover" },
  { src: "/gallery/2015-the-hazards.jpg", alt: "The Hazards — PDI house band" },
  { src: "/gallery/2017-hof-induction.jpg", alt: "Hall of Fame induction 2017" },
  { src: "/gallery/2019-walkon-elvis.jpg", alt: "Elvis walk-on at PDI 2019" },
  { src: "/gallery/early-event-03.jpg", alt: "Early PDI group photo" },
  { src: "/gallery/2015-charity-cheque.jpg", alt: "PDI charity cheque presentation" },
];

export default function GalleryPreview() {
  return (
    <section id="gallery" className="bg-pdi-navy py-24">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <h2 className="font-display text-4xl font-semibold text-pdi-text md:text-5xl">
            Gallery
          </h2>
          <p className="mt-4 text-lg text-pdi-muted">
            Scenes from twenty years of the PDI.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
            {previewImages.map((img) => (
              <Link
                key={img.src}
                href="/gallery"
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
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
              View full gallery &rarr;
            </Link>
            <a
              href="https://drive.google.com/drive/folders/1-kvii3GsJKUeMsDYhd8q2ZqTzYvJU_M7?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-pdi-muted transition-colors hover:text-pdi-text"
            >
              Got photos? Upload them here &rarr;
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
