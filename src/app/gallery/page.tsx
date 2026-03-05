import Navbar from "@/components/Navbar";
import GalleryHero from "@/components/GalleryHero";
import GalleryEraSection from "@/components/GalleryEraSection";
import Footer from "@/components/Footer";
import { getEras, getGalleryByEra } from "@/sanity/fetch";

export const metadata = {
  title: "Gallery — PDI",
  description: "Scenes from twenty years of the PDI.",
};

export default async function GalleryPage() {
  const eras = await getEras();
  const eraItems = await Promise.all(
    eras.map((era) => getGalleryByEra(era.eraId))
  );

  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <GalleryHero />
        {eras.map((era, i) => (
          <GalleryEraSection
            key={era.eraId}
            label={era.label}
            description={era.description}
            items={eraItems[i]}
            groupByYear={era.groupByYear}
            allYears={era.allYears}
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
