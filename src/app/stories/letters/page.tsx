import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LetterAccordion from "@/components/LetterAccordion";
import { getStoriesByThread } from "@/sanity/fetch";
import type { Story } from "@/sanity/types";

export const metadata = {
  title: "The Letters — PDI",
  description:
    "Letters, articles and correspondence from the PDI community over the years.",
};

const fallbackLetters: Story[] = [
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

export default async function LettersPage() {
  const sanityStories = await getStoriesByThread("letters");
  const sanityLetters = sanityStories.filter((l) => l.body);
  // Use Sanity letters only if all 7 have been seeded; otherwise use fallbacks
  const letters =
    sanityLetters.length >= fallbackLetters.length
      ? sanityLetters
      : fallbackLetters;

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
          <LetterAccordion letters={letters} />
        </section>
      </main>
      <Footer />
    </>
  );
}
