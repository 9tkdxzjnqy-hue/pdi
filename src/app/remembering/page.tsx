import Navbar from "@/components/Navbar";
import RememberingHero from "@/components/RememberingHero";
import MemberTribute from "@/components/MemberTribute";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Remembering Our Own — PDI",
  description:
    "Honouring the PDI members who are no longer with us, but never forgotten.",
};

const members = [
  {
    name: "The Man",
    nickname: "The Man",
    tribute:
      "Tribute coming soon. If you have a memory of The Man at the PDI, we'd love to hear it.",
  },
  {
    name: "The Bat",
    nickname: "The Bat",
    tribute:
      "He walked on as Batman and brought the house down. His spirit lives on through the Pat the Bat Memorial Trophy, awarded each year to the best walk-on. Tribute coming soon — if you have a memory of The Bat at the PDI, we'd love to hear it.",
  },
  {
    name: "Del",
    nickname: "Del",
    tribute:
      "Tribute coming soon. If you have a memory of Del at the PDI, we'd love to hear it.",
  },
];

export default function RememberingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <RememberingHero />
        {members.map((member) => (
          <MemberTribute key={member.name} {...member} />
        ))}
      </main>
      <Footer />
    </>
  );
}
