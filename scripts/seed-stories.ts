import { getWriteClient } from "../src/sanity/client";
import { createReadStream, existsSync } from "fs";
import path from "path";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const threads = [
  {
    title: "The Chairman's Address",
    description: "The annual state of the union — history, tribute, and the year ahead.",
    slug: "chairmans-address",
    comingSoon: false,
    displayOrder: 1,
  },
  {
    title: "The Letters",
    description: "Letters, articles, and correspondence from the PDI community over the years.",
    slug: "letters",
    comingSoon: false,
    displayOrder: 2,
  },
  {
    title: "Reviews",
    description: "Looking back on the year that was.",
    slug: "reviews",
    comingSoon: false,
    displayOrder: 3,
  },
  {
    title: "Where Are They Now?",
    description: "Catching up with familiar faces from PDIs past.",
    slug: "where-are-they-now",
    comingSoon: false,
    displayOrder: 4,
  },
  {
    title: "The Auction",
    description: "'The Gun' sells a bag of potatoes for a fortune. And that's just the start.",
    slug: "auction",
    comingSoon: true,
    displayOrder: 5,
  },
  {
    title: "The Videos",
    description: "Intimidation videos, comedy entries, and productions that have no business being that good.",
    slug: "videos",
    comingSoon: true,
    displayOrder: 6,
  },
];

// Chairman's addresses
const chairmansAddresses = [
  {
    year: 2019,
    author: "The Pawn",
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

// Letters
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

// Letter images
const letterImagePaths = [
  { path: "/gallery/letter-fireside-2015.jpg", alt: "Fireside chat — 2015" },
  { path: "/gallery/letter-fireside-2016.jpg", alt: "Fireside chat — 2016" },
  { path: "/gallery/letter-abroad-2015.jpg", alt: "A view from abroad — 2015" },
  { path: "/gallery/letter-selina-2019.jpg", alt: "A letter to the PDI — 2019" },
  { path: "/gallery/letter-the-boy-2019.jpg", alt: "The Boy's letter — 2019" },
];

// Reviews (image-based stories)
const reviews = [
  {
    year: 2017,
    images: [
      { path: "/gallery/review-2017-01.jpg", alt: "Review of the 2017 PDI" },
    ],
  },
  {
    year: 2016,
    images: [
      { path: "/gallery/review-2016-01.jpg", alt: "Review of the 2016 PDI — page 1" },
      { path: "/gallery/review-2016-02.jpg", alt: "Review of the 2016 PDI — page 2" },
      { path: "/gallery/review-2016-03.jpg", alt: "Review of the 2016 PDI — page 3" },
      { path: "/gallery/review-2016-04.jpg", alt: "Review of the 2016 PDI — page 4" },
    ],
  },
  {
    year: 2015,
    images: [
      { path: "/gallery/review-2015-01.jpg", alt: "Review of the 2015 PDI" },
    ],
  },
  {
    year: 2014,
    images: [
      { path: "/gallery/review-2014-01.jpg", alt: "Review of the 2014 PDI — page 1" },
      { path: "/gallery/review-2014-02.jpg", alt: "Review of the 2014 PDI — page 2" },
      { path: "/gallery/review-2014-03.jpg", alt: "Review of the 2014 PDI — page 3" },
    ],
  },
];

// Where Are They Now (image-based stories)
const watn = [
  {
    year: 2016,
    images: [
      { path: "/gallery/watn-2016-01.jpg", alt: "Where are they now — 2016" },
      { path: "/gallery/watn-2016-02.jpg", alt: "Where are they now — 2016" },
      { path: "/gallery/watn-2016-03.jpg", alt: "Where are they now — 2016" },
    ],
  },
  {
    year: 2015,
    images: [
      { path: "/gallery/watn-2015-01.jpg", alt: "Where are they now — 2015" },
      { path: "/gallery/watn-2015-02.jpg", alt: "Where are they now — 2015" },
      { path: "/gallery/watn-2015-03.jpg", alt: "Where are they now — 2015" },
      { path: "/gallery/watn-2015-04.jpg", alt: "Where are they now — 2015" },
    ],
  },
];

async function uploadImage(client: ReturnType<typeof getWriteClient>, imagePath: string, alt: string) {
  const fullPath = path.join(process.cwd(), "public", imagePath);
  if (!existsSync(fullPath)) {
    console.log(`  SKIP (not found): ${imagePath}`);
    return null;
  }
  const asset = await client.assets.upload("image", createReadStream(fullPath), {
    filename: path.basename(imagePath),
  });
  return {
    _type: "image" as const,
    _key: path.basename(imagePath, path.extname(imagePath)),
    asset: { _type: "reference" as const, _ref: asset._id },
    alt,
  };
}

async function seed() {
  const client = getWriteClient();

  // --- Create threads ---
  console.log("Creating story threads...");
  const threadIds: Record<string, string> = {};

  for (const thread of threads) {
    const doc = {
      _type: "storyThread" as const,
      title: thread.title,
      description: thread.description,
      slug: { _type: "slug" as const, current: thread.slug },
      comingSoon: thread.comingSoon,
      displayOrder: thread.displayOrder,
    };

    const result = await client.create(doc);
    threadIds[thread.slug] = result._id;
    console.log(`  Thread: ${thread.title} (${result._id})`);
  }

  // --- Chairman's Address stories ---
  console.log("\nCreating chairman's address stories...");
  for (let i = 0; i < chairmansAddresses.length; i++) {
    const addr = chairmansAddresses[i];
    const doc = {
      _type: "story" as const,
      title: `${addr.year}`,
      thread: { _type: "reference" as const, _ref: threadIds["chairmans-address"] },
      year: addr.year,
      author: addr.author,
      body: addr.body,
      displayOrder: i + 1,
    };

    const result = await client.create(doc);
    console.log(`  ${addr.year} — ${addr.author} (${result._id})`);
  }

  // --- Letter stories ---
  console.log("\nCreating letter stories...");
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const doc = {
      _type: "story" as const,
      title: letter.title,
      thread: { _type: "reference" as const, _ref: threadIds["letters"] },
      year: letter.year,
      author: letter.author,
      body: letter.body,
      displayOrder: i + 1,
    };

    const result = await client.create(doc);
    console.log(`  ${letter.title} (${result._id})`);
  }

  // --- Letter images story ---
  console.log("\nUploading letter booklet images...");
  const letterImgs = [];
  for (const img of letterImagePaths) {
    const uploaded = await uploadImage(client, img.path, img.alt);
    if (uploaded) letterImgs.push(uploaded);
  }
  if (letterImgs.length > 0) {
    const doc = {
      _type: "story" as const,
      title: "From the Booklets",
      thread: { _type: "reference" as const, _ref: threadIds["letters"] },
      images: letterImgs,
      displayOrder: 100,
    };
    const result = await client.create(doc);
    console.log(`  From the Booklets — ${letterImgs.length} images (${result._id})`);
  }

  // --- Review stories ---
  console.log("\nCreating review stories...");
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    console.log(`  Uploading ${review.images.length} images for ${review.year}...`);
    const imgs = [];
    for (const img of review.images) {
      const uploaded = await uploadImage(client, img.path, img.alt);
      if (uploaded) imgs.push(uploaded);
    }
    const doc = {
      _type: "story" as const,
      title: `${review.year}`,
      thread: { _type: "reference" as const, _ref: threadIds["reviews"] },
      year: review.year,
      images: imgs,
      displayOrder: i + 1,
    };
    const result = await client.create(doc);
    console.log(`  ${review.year} — ${imgs.length} images (${result._id})`);
  }

  // --- WATN stories ---
  console.log("\nCreating 'Where Are They Now?' stories...");
  for (let i = 0; i < watn.length; i++) {
    const group = watn[i];
    console.log(`  Uploading ${group.images.length} images for ${group.year}...`);
    const imgs = [];
    for (const img of group.images) {
      const uploaded = await uploadImage(client, img.path, img.alt);
      if (uploaded) imgs.push(uploaded);
    }
    const doc = {
      _type: "story" as const,
      title: `${group.year}`,
      thread: { _type: "reference" as const, _ref: threadIds["where-are-they-now"] },
      year: group.year,
      images: imgs,
      displayOrder: i + 1,
    };
    const result = await client.create(doc);
    console.log(`  ${group.year} — ${imgs.length} images (${result._id})`);
  }

  console.log("\nDone!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
