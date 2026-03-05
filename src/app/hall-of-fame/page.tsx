import Navbar from "@/components/Navbar";
import HallOfFameHero from "@/components/HallOfFameHero";
import InducteeCard from "@/components/InducteeCard";
import Footer from "@/components/Footer";
import { getInductees } from "@/sanity/fetch";

export const metadata = {
  title: "Hall of Fame — PDI",
  description:
    "The PDI Hall of Fame — honouring the people who made the tournament what it is.",
};

export default async function HallOfFamePage() {
  const inductees = await getInductees();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <HallOfFameHero />

        <section className="bg-pdi-dark px-6 py-16">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {inductees.map((inductee) => (
              <InducteeCard key={inductee.nickname} {...inductee} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
