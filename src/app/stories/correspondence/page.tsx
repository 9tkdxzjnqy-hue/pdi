import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = {
  title: "Correspondence — PDI",
  description:
    "Letters received from notable figures ahead of the 5th Annual PDI in 2010.",
};

const letters = [
  {
    src: "/gallery/correspondence-taoiseach-2010.jpg",
    from: "Brian Cowen, T.D.",
    role: "Taoiseach",
    alt: "Letter from Taoiseach Brian Cowen wishing the PDI the best of luck, March 2010",
  },
  {
    src: "/gallery/correspondence-president-2010.jpg",
    from: "Office of the President",
    role: "Áras an Uachtaráin",
    alt: "Letter from the Office of President McAleese, January 2010",
  },
  {
    src: "/gallery/correspondence-gilmore-2010.jpg",
    from: "Eamon Gilmore, T.D.",
    role: "Leader of the Labour Party",
    alt: "Letter from Eamon Gilmore congratulating the PDI, March 2010",
  },
  {
    src: "/gallery/correspondence-wenger-2010.jpg",
    from: "Arsène Wenger",
    role: "Manager, Arsenal Football Club",
    alt: "Letter from Arsène Wenger — Let's Play Darts, March 2010",
  },
  {
    src: "/gallery/correspondence-quinn-2010.jpg",
    from: "Niall Quinn",
    role: "Chairman, Sunderland A.F.C.",
    alt: "Letter from Niall Quinn wishing the PDI well, February 2010",
  },
  {
    src: "/gallery/correspondence-kidney-2010.jpg",
    from: "Declan Kidney",
    role: "Head Coach, Irish Rugby",
    alt: "Letter from Declan Kidney declining due to Six Nations, January 2010",
  },
  {
    src: "/gallery/correspondence-oleary-2010.jpg",
    from: "Michael O'Leary",
    role: "Chief Executive, Ryanair",
    alt: "Letter from Michael O'Leary politely declining, January 2010",
  },
];

export default function CorrespondencePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-pdi-dark">
        <section className="pt-32 pb-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-5xl text-pdi-text">
              Correspondence
            </h1>
            <p className="mt-4 text-lg text-pdi-muted">
              Ahead of the 5th Annual PDI in 2010, the organising committee
              wrote to a number of notable figures. Here are the replies.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl space-y-10">
            {letters.map((letter) => (
              <article
                key={letter.src}
                className="rounded-xl bg-pdi-navy p-8"
              >
                <div className="mb-6">
                  <h2 className="font-display text-2xl text-pdi-text">
                    {letter.from}
                  </h2>
                  <p className="mt-1 text-sm text-pdi-muted">{letter.role}</p>
                </div>
                <Image
                  src={letter.src}
                  alt={letter.alt}
                  width={1200}
                  height={1600}
                  className="w-full h-auto rounded-lg"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
