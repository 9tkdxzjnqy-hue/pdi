import Link from "next/link";

export default function GalleryPreview() {
  return (
    <section id="gallery" className="bg-pdi-navy py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-display text-4xl text-pdi-text md:text-5xl">
          Gallery
        </h2>
        <p className="mt-4 text-lg text-pdi-muted">
          Scenes from twenty years of the PDI.
        </p>

        <div className="mt-12 rounded-xl bg-white/5 p-8 text-center">
          <p className="text-lg text-pdi-muted">
            We&rsquo;re building the gallery and need your help. Got photos from
            any era of the PDI?
          </p>
          <a
            href="https://drive.google.com/drive/folders/1-kvii3GsJKUeMsDYhd8q2ZqTzYvJU_M7?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-pdi-green transition-colors hover:text-pdi-text"
          >
            Upload photos here &rarr;
          </a>
        </div>

        <div className="mt-10">
          <Link
            href="/gallery"
            className="text-sm font-semibold text-pdi-green transition-colors hover:text-pdi-text"
          >
            View Gallery &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
