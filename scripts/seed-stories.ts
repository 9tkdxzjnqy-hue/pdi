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
    year: 2019,
    title: "A Love Letter to the PDI",
    author: "Selina",
    body: `Last year, I was fortunate enough to be invited by Niall and Tracey — to come to Dublin for the PDI over St Patrick's weekend. The last time I had played darts was as a child, so I was a little hesitant to reveal my shocking adult dart skills, however Tracey reassured me that it would be great fun.

"Fun" was an understatement. As soon as I walked through the door, everyone was so warm and welcoming in true 'céad míle fáilte' style; the PDI buzz was in the air, right from the start.

A few drinks down and with the darts competition in full flow, I finally got into my groove, even throwing a few fluky bullseyes! Free dart tips were also in full flow from a dart extraordinaire or two.

The walk-ons were absolutely brilliant and ever so entertaining — indeed a highlight of the night. Laughter tears rolled continually from my eyes. It was just wonderful to see every person in the room joining in on the merriment.

And how could I forget Niall — the auctioneer, truly in his element — charming the money out of our pockets, to raise money for such a worthy cause. I was sad when the night came to a close.

And just when we thought we would have to stagger back home in the knee-deep snow, we saw an angelic light coming towards us in the form of Mick and Breda, rescuing us and ensuring we got home safe and sound. I felt truly blessed.

The PDI — What a night!

I wouldn't miss the PDI this year for the world — I'm really looking forward to seeing everyone again and having a good laugh with such wonderful people for a great, great cause!`,
  },
  {
    year: 2019,
    title: "Darts or Walk-on? Ya Wha?",
    author: "The Boy",
    body: `When our esteemed editor gave me a carte blanche to write about whatever tickled my fancy I considered, very briefly, tackling some meaty subjects like climate change (it took me ages to get a taxi because it was snowing last year), Brexit (should we allow Nialler or the Laverys take part in 2020?) or the growing problem of Jaeger-hoarding among some competitors. Instead, the answer was provided among some disturbing rumblings I've been hearing for a while now in PDI circles.

Congrats to whoever came up with this year's profile questions. There are some thought provoking humdingers within. Leave aside some sacrilegious queries concerning the right honourable POTUS and insinuated skin-flintiness concerning some contestants.

As a committed dartist, I was taken aback by the 'Focus for the PDI — darts or walk-on?' bombshell.

Now don't get me wrong — I'm all for getting nicely sozzled, putting on a ridiculous outfit and shaking your thang out the double doors but frankly I ran out of hallowe'en costumes years ago. So, unless there's a moth-ridden wig jettisoned by some other punter in the back room I generally go au natural these days for the walk-on. After all when you've got a wardrobe like mine, or Ed's for that matter, who needs fancy dress?

After all, this is a Darts Tournament people! To paraphrase Taggart from Blazing Saddles — 'we brought you people here to play some darts, not dance around like a bunch of Kansas city faggots.' Now, before the PC brigade come after me don't misinterpret my intentions here — I'm firmly behind the whole gay movement thing (just don't put me in front. Varadkar rocks -not- etc.).

Like, from what I can gather — the tv schedules are full of this sort of muck — Dancing with the Stairs, Your Ma's Got Talent, X-Fokkers, etc. (I don't watch it myself — I'm way too hip for terrestrial tv.) Surely heads can get their fix with that guff or on any night of the week in Coppers instead of reducing our proud, athletic, sporting endeavour to some trashy burlesque night complete with hairy chests, milk white thighs and even hairier arses.

As stated, I am certainly not against the exhibitionism and debauchery above but how can this be deemed the focus for some over the ambition to hit a double one after the fiftieth attempt and even more importantly after fifteen pints, four rum and blacks (doubles) and at least a couple of Jaegers? Doesn't really compute to me.

But then, who really remembers who wins? Most have forgotten how to stand up by the time the final comes around — and that's just the referee. The most interested party is the punter who threw a nifty on some dark horse at odds exceeding ten to one who then made the final. The same cannot be said for the walk-on final. There are people generally swinging out of the rafters to get a better view. There's the annual geezer going around in a fur coat with no knickers (acquired at the auction), not to mention some wannabe Adonis' who have decided they're just too sexy for their shirts rubbing each others nipples in anticipation and general bedlam as Sexy Boy, Hedser, Barr, the Sparks, or the Undertaker come through the double doors. So, what do I know? Would life be the same if we didn't get our annual fix of Batmania? Can you beat going for a slash after a few jars and then realising Mr. T is standing there beside you? There's no doubt about it, says Quinlan.

When you consider it all it comes down to this — we always played darts on Paddy's Day, which was great, but we only realised the potential of the day fully when someone figured we should be more 'professional' and have our own walk-on signature tunes; add the Hazards and guys like the lads above to a core group of headers and the rest is history.

The fact the whole endeavour is in aid of Crumlin Children's Hospital makes the day even more special and trumps all other considerations. So whatever your focus on the big day it is really irrelevant and wholly secondary to just having the best laugh you're likely to have this side of the moon. And don't say I didn't warn you about the hairy arses.`,
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
  {
    year: 2016,
    title: "A Fireside Chat",
    author: "Stephen R.",
    body: `This year is our twelfth. Twelve. That's exactly the same age as you. What was it like in comparison to now? What, our first year? Thank you for asking, little twelve year-old girl/boy. I will call you Birlface.

You bet things have changed. Those of you too young (like Birlface) to remember, or too old, or too drunk, or just plain stupid and forgetful; things weren't always like this. It was a simpler time. A time before 'Sexy Boys', 'live bands' and Geoff. A time before the seventeen dartboards you see before you today. Before Kev was Dublin material, before Nugget was a baishte, even before Foley got with Seodhna (sounds unbelievable but that time did, in fact, exist).

There was a time when the St. Patrick's Day, Darts Invitational, Athletic Championship Jnr (to give the competition its full name) was held outdoors! In Ireland! In March! A competition where the ladies watched rather than played right along. We didn't know girls could like darts just like boys could. Can you blame us? Yes, definitely. But look at you, Birlface — you who came out of that very day when someone and somebody else got overly excited and didn't take the adequate precautions; even though they said they did; or no way it was theirs, they couldn't even remember their own name that night let alone get it u… — you who are both equal parts beautiful Boy and equal parts beautiful Girl.

That's how long we've been doing this. Eighteen years, I think. The first, way back in 2004, took place in New Garden of Casa Del D. Leprechaun hats, plastic hammers and shorts with plastic asses surrounded us, the dartboard was an old chalk drawing of a dartboard etched onto the door of the shed/walk-in freezer.

Speaking of Walk-ins? Nope sir, we did not have them. Seanie Mac couldn't even hold a guitar at that point. (That, of course, is a lie. Everyone knows quite well that the youngest of that family came into this world clutching strings of melody)

Where was the Dry Ice machine, you ask? Sorry, sons, there was only a little cold ice, in cube-form, behind the shed door.

Instead of Swainer on-the-mic, announcing the next player, we had Fiona, hanging out her bedroom window to tell us, "Pipe down, you *&%^-ing idiots! Why aren't you studying for your Leaving Certs? Is it 'cause you are idiots is that why?"

But would we study or pipe down? No way! In fact we would only pipe up — in the form of Slick Rick and his melodious Alan-pipes and fondness for marching (in March!).

Now, we're not Big City people with fancy jobs, but we have got big bosoms and true feelings, and Maughner will likely take any old bet, no matter how crazy. We have the PDI cup. And, you know, we look forward to the hangover; even Ed will tell you that (and he's very hard to please). In the garden on that fateful day? It was spectacular. New was: a deck, table, chairs, and a romantic swing-seat thing — we sat there enjoying each other's company. There were stones under our feet instead of tired, old grass. And on the patio, facing the shed door, next to the green plastic table (perfect to hold our humble offering and display to the Can Gods of Bavaria and Dutch Gold) we stood, as each player will stand today, ready to stick darts into the plush cushion and earn the right to be called immortal.`,
  },
  {
    year: 2015,
    title: "A Fireside Chat",
    author: "Stephen B.",
    body: `Where has your life taken you post your PDI career?
After taking a step back from the PDI, I felt like my life had become rudderless. Then I had a chance meeting with a friend who told me to stop feeling sorry for myself and to go and live. I haven't looked back since.

Would that friend's advice be the same advice you would pass on to others today?
If I see anyone feeling the same way I was then I go out of my way to share this bit of advice.

And could you ever see yourself returning to the PDI one day?
Never say never.

If I could take you back to 2009, you famously arrived to the Kill Arena laden with Jagermeister and birthed the much loved tradition of Jager bombs before the tournament gets underway. Did you think at the time that your actions would have such an impact?
I think we all knew that we had stumbled on something special at the time and I would have been quite confident that the tournament did have the potential to grow.

Without the PDI, how do you generally spend your St Patrick's Day weekends?
I have actually just recently taken up yoga.

Really? What other hobbies/interests do you have these days?
I read a book a week, all types of shit, science, nature, that type of stuff. For example, did you know that a spider is an arachnid not an insect?

No, I didn't. Moving on to another area I know you are exploring lately, and that is TV appearances. Since your Late Late Show cameo, do you see a future career on the tele for yourself?
Well, it isn't something I planned but it went well, I certainly wouldn't rule it out. Live TV is very exciting to be a part of.

Did you enjoy the experience then?
Yes, it was a great experience. My friend Conor bagged himself a date and buried her on Friday night. Which I love.

Any such luck for yourself in that regard?
No, unfortunately but hope springs eternal.

Where do you get your positive mental attitude from? Would you consider yourself a glass-half-full type of guy?
I always try and look for the positives in every situation, like when Ed told me once that he hates women.

Did he though?
I said to him, 'How could you hate women, your mum is one', to which he replied, 'Yes Breno, you are the king!'

He called you a King?! And if you could describe yourself using only one word, what would it be?
Unusual.

Great answer. And to finish off our interview, do you have any pearls of wisdom to this year's PDI competitors?
Winning can change your life but losing won't define you.

Stephen B., thank you for your time.`,
  },
  {
    year: 2015,
    title: "The View From Abroad",
    author: "Barry",
    body: `After a couple of years hearing the hype of the biggest darts tournament in the country, I finally had the pleasure of attending the day where it all happens in 2012. The hype in the build-up coupled with Colly's description of it as 'just the best day ever' it's fair to say I had high expectations of what was to come! The day did not disappoint from start to finish, the highlight being Colly getting down on one knee and proposing to Aileen which added to the existing mayhem and overall enjoyment of the day.

Although I didn't take part that year, my appetite was suitably whetted and I was keen to secure a spot for the following year, and so began the badgering of Colly to make sure my name was on the list! In fairness he came through and I was in for PDI 2013. While there were great intentions of plenty of practice, it didn't materialise and I didn't cause too many problems from a darting perspective. Again it was a super day and seems to be getting bigger year on year so not being able to be around for it this year is disappointing to say the least.

One mention I must make is to the walk on and while that is the high point for a lot of the boys, I must say it was probably the most nerve wracking part of the day for me. Ally Pally eat your heart out, St Jude's is where it's at for walk on time where the prize of best walk on is at least as coveted as the winner's trophy!

On top of the great craic the day is, it isn't forgotten that the main purpose of the day is to raise much needed funds for Crumlin Children's Hospital, which helps immensely in the community.

While there may be bigger darts tournaments I could safely say there is no tournament which receives the same love and attention as the Paddy's Day Invitational and I'm sure everyone there will have a great day and night … P.S. I'm not at all bitter about missing it!

Best of Luck to everyone taking part!`,
  },
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

async function uploadImage(
  client: ReturnType<typeof getWriteClient>,
  imagePath: string,
  alt: string,
) {
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

export async function seedStories() {
  const client = getWriteClient();

  // --- Seed threads (create only if missing — once created, Sanity is the source of truth) ---
  console.log("Seeding story threads...");
  const existingThreadIds = new Set(
    await client.fetch<string[]>(`*[_type == "storyThread"]._id`)
  );

  let threadCreated = 0;
  const threadTx = client.transaction();
  for (const thread of threads) {
    const _id = `thread-${thread.slug}`;
    if (existingThreadIds.has(_id)) continue;

    threadTx.create({
      _id,
      _type: "storyThread" as const,
      title: thread.title,
      description: thread.description,
      slug: { _type: "slug" as const, current: thread.slug },
      comingSoon: thread.comingSoon,
      displayOrder: thread.displayOrder,
    });
    threadCreated++;
  }
  if (threadCreated > 0) {
    await threadTx.commit();
    console.log(`  Created ${threadCreated} new threads`);
  } else {
    console.log(`  Skip: all ${threads.length} threads already exist`);
  }

  // --- Seed stories (create only if missing) ---
  const existingStoryIds = new Set(
    await client.fetch<string[]>(`*[_type == "story"]._id`)
  );

  // Text-only stories (chairman's addresses + letters)
  console.log("\nSeeding text stories...");
  let textCreated = 0;
  const textTx = client.transaction();

  for (let i = 0; i < chairmansAddresses.length; i++) {
    const addr = chairmansAddresses[i];
    const _id = `story-chairmans-address-${addr.year}-${i}`;
    if (existingStoryIds.has(_id)) continue;

    textTx.create({
      _id,
      _type: "story" as const,
      title: `${addr.year}`,
      thread: { _type: "reference" as const, _ref: "thread-chairmans-address" },
      year: addr.year,
      author: addr.author,
      body: addr.body,
      displayOrder: i + 1,
    });
    textCreated++;
  }

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const _id = `story-letters-${letter.year}-${i}`;
    if (existingStoryIds.has(_id)) continue;

    textTx.create({
      _id,
      _type: "story" as const,
      title: letter.title,
      thread: { _type: "reference" as const, _ref: "thread-letters" },
      year: letter.year,
      author: letter.author,
      body: letter.body,
      displayOrder: i + 1,
    });
    textCreated++;
  }

  if (textCreated > 0) {
    await textTx.commit();
    console.log(`  Created ${textCreated} new text stories`);
  } else {
    console.log(`  Skip: all text stories already exist`);
  }

  // Image-based stories (reviews + WATN) — only upload for missing stories
  console.log("\nSeeding image stories...");
  type ImageStoryGroup = {
    _id: string;
    year: number;
    threadRef: string;
    displayOrder: number;
    images: { path: string; alt: string }[];
  };

  const imageUploadGroups: ImageStoryGroup[] = [];

  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const _id = `story-reviews-${review.year}-${i}`;
    if (existingStoryIds.has(_id)) continue;

    imageUploadGroups.push({
      _id,
      year: review.year,
      threadRef: "thread-reviews",
      displayOrder: i + 1,
      images: review.images,
    });
  }

  for (let i = 0; i < watn.length; i++) {
    const group = watn[i];
    const _id = `story-where-are-they-now-${group.year}-${i}`;
    if (existingStoryIds.has(_id)) continue;

    imageUploadGroups.push({
      _id,
      year: group.year,
      threadRef: "thread-where-are-they-now",
      displayOrder: i + 1,
      images: group.images,
    });
  }

  if (imageUploadGroups.length > 0) {
    const uploadTx = client.transaction();
    for (const group of imageUploadGroups) {
      console.log(`  Uploading ${group.images.length} images for ${group.year}...`);
      const imgs = await Promise.all(
        group.images.map((img) => uploadImage(client, img.path, img.alt)),
      );
      const validImgs = imgs.filter(Boolean);
      uploadTx.create({
        _id: group._id,
        _type: "story" as const,
        title: `${group.year}`,
        thread: { _type: "reference" as const, _ref: group.threadRef },
        year: group.year,
        images: validImgs,
        displayOrder: group.displayOrder,
      });
    }
    await uploadTx.commit();
    console.log(`  Created ${imageUploadGroups.length} new image stories`);
  } else {
    console.log(`  Skip: all image stories already exist`);
  }

  // No stale cleanup — Sanity is the source of truth for stories.
  // Stories added or removed in Sanity Studio are preserved.

  return {
    threads: { synced: threads.length, deleted: 0 },
    stories: { synced: chairmansAddresses.length + letters.length + reviews.length + watn.length, deleted: 0 },
  };
}

// Allow running standalone
if (require.main === module) {
  seedStories()
    .then((result) => {
      console.log(`\nDone!`);
      console.log(`  Threads: ${result.threads.synced} synced, ${result.threads.deleted} deleted`);
      console.log(`  Stories: ${result.stories.synced} synced, ${result.stories.deleted} deleted`);
    })
    .catch((err) => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
