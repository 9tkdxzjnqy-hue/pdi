import Navbar from "@/components/Navbar";
import HallOfFameHero from "@/components/HallOfFameHero";
import InducteeCard from "@/components/InducteeCard";
import Footer from "@/components/Footer";
import { getInductees } from "@/sanity/fetch";

export const metadata = {
  title: "Hall of Fame | PDI",
};

export default async function HallOfFamePage() {
  const inductees = await getInductees();

  return (
    <>
      <Navbar />
      <HallOfFameHero />

      <section className="bg-pdi-dark px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {inductees.map((inductee) => (
            <InducteeCard key={inductee.nickname} {...inductee} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
