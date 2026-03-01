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
          />
        ))}
      </main>
      <Footer />
    </>
  );
}
