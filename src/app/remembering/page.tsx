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
    photo: "/images/the-man-remembering.jpg",
    tribute:
      "Tribute coming soon. If you have a memory of The Man at the PDI, we'd love to hear it.",
  },
  {
    name: "The Bat",
    nickname: "The Bat",
    photo: "/images/the-bat-remembering.jpg",
    tribute: "",
    poem: {
      title: "The Bat",
      author: "The Gun",
      lines: [
        "When the day arrived,\nCigarettes in abundance\nNo smoker left without\nBottom door, cigarette store.",
        "Then came the bombs\nOf joy for every girl and boy\nDepth charges handled with fine aplomb\nTo the 12 noon start and the means to go on",
        "Costume insecurity, never;\nConfidence, onwards forever.\nBatman, the original walk-on star attraction\nFor every guest he was best",
        "Raffle tickets would find him magnetically\nHis desire itself majestic and deep\nTo the masses he would speak\nIn his company no one ever cheap",
        "The bat will live on\nFor now, forever, his memory never gone",
      ],
    },
  },
  {
    name: "Del",
    nickname: "Del",
    photo: "/images/del-remembering.jpg",
    tribute:
      "Tribute coming soon. If you have a memory of Del at the PDI, we'd love to hear it.",
  },
];

export default function RememberingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-pdi-dark">
        <RememberingHero />
        {members.map((member) => (
          <MemberTribute key={member.name} {...member} />
        ))}
      </main>
      <Footer />
    </>
  );
}
