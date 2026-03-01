import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Charity from "@/components/Charity";
import CompetitionsPreview from "@/components/CompetitionsPreview";
import GalleryPreview from "@/components/GalleryPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Charity />
        <CompetitionsPreview />
        <GalleryPreview />
      </main>
      <Footer />
    </>
  );
}
