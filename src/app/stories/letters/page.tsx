import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryLightbox from "@/components/GalleryLightbox";

const letterImages = [
  { src: "/gallery/letter-fireside-2015.jpg", alt: "Fireside chat — 2015", era: "early-days" as const },
  { src: "/gallery/letter-fireside-2016.jpg", alt: "Fireside chat — 2016", era: "early-days" as const },
  { src: "/gallery/letter-abroad-2015.jpg", alt: "A view from abroad — 2015", era: "early-days" as const },
  { src: "/gallery/letter-selina-2019.jpg", alt: "A letter to the PDI — 2019", era: "early-days" as const },
  { src: "/gallery/letter-the-boy-2019.jpg", alt: "The Boy's letter — 2019", era: "early-days" as const },
];

export const metadata = {
  title: "The Letters — PDI",
  description:
    "Letters, articles and correspondence from the PDI community over the years.",
};

const letters = [
  {
    year: 2019,
    title: "A Letter from America",
    author: "The MAGA Contingent",
    body: `It was March of 2009 and The Boy was on an extended holiday in the US. Turns out due to some scheduling conflicts he would not be making it back for the PDI that year. Back then, I believe it was still held in someone's back garden. There was potential for a Skype participation that year but alas, technology and time were not on our side and it was just not meant to be.

Over the last decade, we have followed the PDI and its growth every year from the introduction of the band, to the move to St Jude's, and forgettabout the walk-ons (whomever came up with that is a genius). The best Saturday of the year is the arrival of the walk-ons; no better entertainment for your morning biscuit & tea, you guys never disappoint.

Every year we try to plan a trip to make this event but it seems as though someone is always getting married. Halfway around the world two times in a single year — that is considered mental for Americans; most of us barely leave the country. But this year is different… Everyone is married and Ang is turning 40. Can we actually make this happen???

So, it was decided, 2019 was to be the year of the MAGA invasion of the PDI! Here we come… Elvis has entered the building!

Hoping the American contingent at this year's event does not disappoint. And if you see Elvis, be sure to wish him a happy Big "40"!`,
  },
  {
    year: 2018,
    title: "A Blow-In's Account of the PDI",
    author: "Selina",
    body: `Last year, I was fortunate enough to be invited to come to Dublin for the PDI over St. Patrick's weekend. The last time I had played darts was as a child, so I was a little hesitant to reveal my shocking adult dart skills, however I was reassured that it would be great fun. "Fun" was an understatement.

As soon as I walked through the door, everyone was so warm and welcoming in true 'céad míle fáilte' style; the PDI buzz was in the air, right from the start. A few drinks down and with the darts competition in full flow, I finally got into my groove, even throwing a few fluky bullseyes! Free dart tips were also in full flow from a dart extraordinaire or two.

The walk-ons were absolutely brilliant and ever so entertaining — indeed a highlight of the night. Laughter tears rolled continually from my eyes. It was just wonderful to see every person in the room joining in on the merriment. And how could I forget The Gun — the auctioneer, truly in his element — charming the money out of our pockets, to raise money for such a worthy cause.

I was sad when the night came to a close. And just when we thought we would have to stagger back home in the knee-deep snow, we saw an angelic light coming towards us in the form of Mick and Breda, rescuing us and ensuring we got home safe and sound. I felt truly blessed.

The PDI = What a night! :o)
I wouldn't miss the PDI this year for the world — I'm really looking forward to seeing everyone again and having a good laugh with such wonderful people for a great, great cause!`,
  },
];

export default function LettersPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <section className="pt-32 pb-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-5xl text-pdi-text">
              The Letters
            </h1>
            <p className="mt-4 text-lg text-pdi-muted">
              Letters, articles, and correspondence from the PDI community over
              the years.
            </p>
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-3xl space-y-10">
            {letters.map((letter) => (
              <article
                key={letter.title}
                className="rounded-xl bg-pdi-navy p-8"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-pdi-green/10 px-3 py-1 text-sm font-semibold text-pdi-green">
                      {letter.year}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl text-pdi-text">
                    {letter.title}
                  </h2>
                  <p className="mt-1 text-sm text-pdi-muted italic">
                    by {letter.author}
                  </p>
                </div>
                <div className="space-y-4 text-pdi-text/90 leading-relaxed">
                  {letter.body.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display text-3xl text-pdi-text">
              From the Booklets
            </h2>
            <p className="mt-2 text-pdi-muted">
              Fireside chats, dispatches from abroad, and heartfelt words.
            </p>
            <div className="mt-10">
              <GalleryLightbox items={letterImages} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
