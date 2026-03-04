import Navbar from "@/components/Navbar";
import GalleryHero from "@/components/GalleryHero";
import GalleryEraSection from "@/components/GalleryEraSection";
import Footer from "@/components/Footer";
import { eras, galleryItems } from "@/data/gallery";

export const metadata = {
  title: "Gallery — PDI",
  description: "Scenes from twenty years of the PDI.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <GalleryHero />
        {eras.map((era) => (
          <GalleryEraSection
            key={era.id}
            label={era.label}
            description={era.description}
            items={galleryItems.filter((item) => item.era === era.id)}
            groupByYear={era.groupByYear}
          />
        ))}

        <section className="border-t border-white/5 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-3xl text-pdi-text">
              Got photos?
            </h2>
            <p className="mt-4 text-lg text-pdi-muted">
              We&rsquo;re crowdsourcing the gallery from every era of the PDI.
              Dig out your old photos and drop them in the shared drive &mdash;
              the more the better.
            </p>
            <a
              href="https://drive.google.com/drive/folders/1-kvii3GsJKUeMsDYhd8q2ZqTzYvJU_M7?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-semibold text-pdi-green transition-colors hover:text-pdi-text"
            >
              Upload photos here &rarr;
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
