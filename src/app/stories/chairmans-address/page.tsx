import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getStoriesByThread } from "@/sanity/fetch";

export const metadata = {
  title: "The Chairman's Address — PDI",
  description:
    "Annual addresses from the PDI chairperson — history, tribute, and the year ahead.",
};

const fallbackAddresses = [
  {
    year: 2019,
    author: "The Pawn",
    title: "2019",
    body: `It is with great pleasure that I welcome you to the 2019 Paddy's Day Invitational. This is the 16th year of the PDI and I'm sure it will be the biggest and best yet with the proceeds once again going to Our Lady's Children's Hospital CMRF.

2018 belonged to The Physio as he claimed another PDI crown to add to his growing collection. Dako sent shockwaves through the Lakeside with an unforgettable performance to wrestle the coveted Walk-on of the Year away from Bar. In the WPDI, Niamh took home the gold in her debut outing. Among all this nonsense we raised €9,461 for CMRF. Amazing stuff.

It is an absolute honour to be Chairman of the PDI this year but what makes this day such a success is the work behind the scenes from the usual PDI stalwarts. There are a few people I would like to personally thank for all their hard work in organising this year's event. The Express, The Gun and Sexy Boy have once again played a blinder in making sure that everything from the bombs & pizzas to the raffle were boxed off. Once again, a huge thank you to The Rebel for his continued support with the booklet. Fantasy Lights have given us more smoke machines and lights than a Kiss concert, thanks Coly! Tom the Boy, as always, has the Lakeside looking like the Ally Pally, no better man!

We are delighted to once again welcome back our House Band and PDI Hall of Famers The Hazards. Huge thank you once again to the lads for their work in learning the walk-on tunes and playing a stormer on the day as always. We say it every year but the PDI would not be the PDI without you.

Finally thank you to everyone in attendance at the Lakeside Arena today. Pat the Bat will be over shortly to sell you a few raffle tickets.

LETS PLAY DARTS!`,
  },
  {
    year: 2018,
    author: "The Pawn",
    title: "2018",
    body: `It is with great pleasure that I welcome you to the 2018 Paddy's Day Invitational. This is the 15th year of the PDI and I'm sure it will be the biggest and best yet with the proceeds once again going to Our Lady's Children's Hospital CMRF.

2016 belonged to Bar as he not only defended the coveted Walk-on of the Year title but also completed a historic double by claiming his maiden PDI crown. Can the Champ Champ repeat the trick this year? In the WPDI, Sinead took home her second title and will be eager to complete the hat-trick today. Among all this nonsense we raised €10,780 for CMRF. Amazing stuff.

It is an honour to be Chairman of the PDI this year but what makes this day such a success is the work behind the scenes from the usual PDI stalwarts. There are a few people I would like to personally thank for all their hard work in organising this year's event. The Express, The Gun and Sexy Boy have once again played a blinder in making sure that everything from the bombs to the pizzas were boxed off. Once again, a huge thank you to The Rebel for his continued support with the booklet. Fantasy Lights have given us more smoke machines and lights than a Black Sabbath concert, thanks Coly and Byrner. Ed once again assumed the role of Liam Neeson in Taken and hunted down every last player for the Last Man Standing and raised over a grand in doing so. Great work Ed, thank you! Fiona and Roisin took the reins for this year's WPDI which goes from strength to strength. Thanks for all your help ladies. Tom the Boy, as always, has the Lakeside looking like the Ally Pally, no better man! Big shout out as always to Breda and Mick for their ongoing support.

We are delighted to once again welcome back our House Band and PDI Hall of Famers The Hazards. Huge thank you once again to the lads for their work in learning the walk-on tunes and playing a stormer on the day as always. We say it every year but the PDI would not be the PDI without you.

Finally thank you to everyone in attendance at the Lakeside Arena today. Pat the Bat will be over shortly to sell you a few raffle tickets.

LETS PLAY DARTS!`,
  },
  {
    year: 2017,
    author: "The Express",
    title: "2017",
    body: `I am delighted to welcome you all to the St Judes 'Lakeside Lounge' for the 2017 Paddy's Day Invitational.

The PDI has grown from a few friends launching arrows at a make-shift oche, to a 32-player PDI, and a 19-player WPDI today. Without the support and participation of all the players and friends of the tournament, the PDI would not be the event we have today. From those humble beginnings, the PDI has gone on to raise tens of thousands of euros for the amazing cause of Our Lady's Children's Hospital, and, therefore, before I go any further, I want to thank each and every one of you for helping make the PDI the very special event it is.

Each year, the PDI is organised to be bigger and better than the year before. This year marks the first year that there will be an official recognition for what we all already knew was the main event of the day … the Walk-Ons. 2017 is the first year that there will be silverware awarded to the winner of the prestigious 'Walk-On of the Year' accolade. This year promises to be the biggest and most elaborate year for the walk-ons yet and I for one can't bloody wait to watch the nonsense unfold!

I would like to thank the other two members of the committee for all their hard work. Sexy Boy and Vinny Fitz have put in a serious amount of work behind the scenes this year. Countless lunch hours and weekend evenings have been sacrificed to prepare for this year's event.

The Gun and The Rebel have yet again outdone themselves with this year's booklet! Every year, The Gun and The Rebel volunteer themselves (never once have they had to be asked) to take on the mammoth task of the booklet, putting together advertising pages, chasing people for profiles and preparing pieces to be included. The Gun is most certainly the 'brute force' behind getting the booklet together, while the finely polished article you see before you is all down to the skill and guile of The Rebel. As the work involved in putting the booklet together truly is monumental, I would like to ask everyone who reads and enjoys these booklets each year that at some stage during the day you thank The Gun and The Rebel for all their hard work.

Which then brings me to The Hazards. Quite literally, the PDI would not be 'The PDI' without The Hazards. Talented, hardworking and thumb-applying young men, these lads bring so much to the PDI that my (along with everyone else's) appreciation for them cannot be understated. A truly great bunch of lads who add so much to the day that they are an absolute cornerstone in the success of the PDI.

Finally I'd like to acknowledge all the other people who give up so much of their time to help the PDI. People like The Boy for setting up the brilliant oches, The Cat and The Undertaker for supplying and setting up the lights, The Pawn with his dodgy bookies, Bar for going with the carrot approach rather than the stick in the Last Man Standing, Mick and Breda who contribute so much every year to the PDI, Sinead for orchestrating the WPDI this year, and all the other countless volunteers who contribute to the day. Without these people, the PDI simply doesn't become the PDI that we know and love and I would like to thank them all very much.

Now, after all that, I'm delighted to finally say …

Let's play darts!`,
  },
  {
    year: 2015,
    author: "The Cat",
    title: "2015",
    body: `It is with great pleasure that I welcome you all to the Paddy's Day Invitational 2015. This is the 11th year of the PDI and it is amazing to see how the PDI has grown yet still hold the same spirit of friendship that initially formed the PDI.

This year will see 26 competitors in the PDI and 16 in the WPDI. New faces make their debut on the PDI stage this year and I'm sure will be captured by the spirit of the PDI.

The 2014 PDI tournament was a huge success where we saw The Physio lift the coveted title for the first time and The Vetinator retained the title in the WPDI. All competitors I'm sure will step into the St Jude's Lakeside Lounge this year with hopes of getting their hands on the coveted trophies of the PDI.

The PDI forged a bond with Our Lady's Children's Hospital Crumlin in 2011 whereby all proceeds and sponsorship is donated to support the work of the hospital. Since 2011 the PDI has raised €19,240.46 for this great cause. It is a great honour for the PDI to be supporting this charity which helps so many children and families throughout Ireland. We look forward to continuing this support in 2015.

The PDI has many great players and characters which makes it so special. This year is special as we welcome back The Express and Sexy Boy. We now just eagerly await the return of Stephen 'Really Should Wear A Helmet'. The PDI sends out a massive salute to Stephen.

I would like to say a very sincere thank you to The Express, The Gun, Vinny Fitz, The Educator, Monster, The Rebel, Anne, and The Physio this year for all the hard work. Thank you to St Jude's GAA Club for once again providing the PDI with a home. Thank you also to all of our sponsors and donators and fans of the PDI who have generously supported the PDI this year and in the past; without your help all of this would not be possible.

Now without further ado —
Let's play darts!`,
  },
];

export default async function ChairmansAddressPage() {
  const sanityStories = await getStoriesByThread("chairmans-address");
  const addresses = sanityStories.length > 0 ? sanityStories : fallbackAddresses;

  return (
    <>
      <Navbar />
      <main className="bg-pdi-dark">
        <section className="pt-32 pb-16 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="font-display text-5xl text-pdi-text">
              The Chairman&rsquo;s Address
            </h1>
            <p className="mt-4 text-lg text-pdi-muted">
              The annual state of the union &mdash; history, tribute, and the
              year ahead.
            </p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-3xl space-y-10">
            {addresses.map((address) => (
              <article
                key={address.year ?? address.title}
                className="rounded-xl bg-pdi-navy p-8"
              >
                <div className="mb-6 flex items-center gap-3">
                  {address.year && (
                    <span className="rounded-full bg-pdi-green/10 px-3 py-1 text-sm font-semibold text-pdi-green">
                      {address.year}
                    </span>
                  )}
                  {address.author && (
                    <span className="text-sm text-pdi-muted">
                      Chairman: {address.author}
                    </span>
                  )}
                </div>
                {address.body && (
                  <div className="space-y-4 text-pdi-text/90 leading-relaxed">
                    {address.body.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
