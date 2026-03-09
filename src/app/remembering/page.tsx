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
    tribute: `The Great Recession of late 2008 claimed many corporate victims: Lehman Brothers, Northern Rock, Fannie Mae, Freddie Mac. However, one of the later casualties of this period was almost PawnBet.com. While the majority of this corporate carrion had their fates sealed due to the macro-economic climate and over-leveraged balance sheets. PawnBet was the victim of an old-fashioned Shark attack. That shark was a tall, endearingly dishevelled Donegal man. Problem was that we already had a Tom in our midst. The aforementioned Shark's son and heir. Given that our Tom was Tom 'the Boy'. Well, we just gained ourselves Tom 'the Man'.

Tom the Man wandered into Jude's on that March day with a certain studied indifference, verging on disinterest to what was unfolding around him. So much so, I am reliably informed that even until last year, he only actually knew the names of six of the lads that played!

He engaged with us on a superficial level of courteousness. After all, we were mostly young lads in our 20s and 30s. He was our mate's dad, he was in his 60s. But we were about to fall foul of a trap that every generation has fallen into since time immemorial - underestimating one's elders. Behind this almost aloof appearance was a man that was here for one thing only, to win the bloody darts!

One or two on the inside track had realised the shark was in the water and blood had been drawn. A couple of cheeky €20 each way shots at 40/1 were lodged…… "Ballast for the balance sheet" thought Maughaner. Little did he know that he had just underwritten his own subprime collapse. Cut eight hours forward and The Man had blazed a path to the final. Realising the bookie's predicament and the imminent lability in-store, haircuts were made, deals were done. The first (and to date only) PDI bailout was actioned.

Now, the record books will note that Tom was beaten in the final that day. But no one can remember by whom. We'd have to look it up. We only remember the story, the hero. Memories pass to story, stories pass to legend. Tom himself has now passed to memory, but that legend will endure.

The years hence he debuted provided plenty of moments too. From his D2, 2, D2 checkout on 10! To engaging in the longest Shield final in PDI history, to a tirade against group qualification criteria that if forced a formal redrawn and codification on rules and regulations in the following year's booklet! Tom was a man that whatever he did, he did on his own terms with a definite disregard to the sensibilities of others.

I know I speak for some of us when I say that what we saw in The Man when he lined out for each edition of the PDI was aspirational. The elder stateman in the young man's game. The perennial struggle we shall all face if we are lucky enough to remain. The "rage against the dying of the light" as Dylan Thomas put it. Another chance to prove to everyone that what we once had is still there. Those of us there since (or close to) the start of the PDI can appreciate this more now as we approach forty or even fifty. Was part of it that we want in the future to see in ourselves what Tom exhibited each and every PDI? Probably, yea. Maybe Tom saw some of himself in us too.

There is nothing original in the world anymore. We are both sides of the same coin at once. We are both the young men admiring an elder that is proving something to ourselves that we're maybe not even fully aware of. At the same time, we are also the youth that the elder has left behind. He, able to appreciate in ways we are not yet able to understand the power of what we have, or at least had! Maybe I'm reading a bit too much into it, but I like to think that on one very fundamental personal level we 'got' Tom, and he 'got' us. Even if he didn't ever dress up for a walk on once!

Over time that far left corner of the bar in the Lakeside Lounge became sacrosanct. It might as well have been a Papal Throne with a velvet rope around it. So much so that one of the main challenges to overcome if you were drawn on board four was to throw 10-12 inches away from Tom The Man's sphere of influence. He may have looked disinterested but let me tell you…. If you were a potential Quarter Final opponent, you could be damn sure he was keeping a close eye on you.

For me though, my lasting memory of Tom the Man isn't actually the darts. It's not Put em Under Pressure. Nor is it the bookie bailout. It's the sight of Tom the Man and Tom the Boy, in that far left corner of the bar, as the knock-out games are going on and the pace of the day is slowing up as it turns into evening. The few pints of black in front of them. A picture of calm in this utterly bizarre menagerie that we call the PDI. A father and his son, side by side, putting the world to rights. Maybe that is the aspiration we all identify with. It's moments like this that it sinks in just how special the PDI really is.

But isn't that the whole point….. Of the PDI, of life. Being there, sharing those moments together. Life is about people. The PDI is just a vehicle for that. Tom was a central part of that for over a decade, and we are the poorer for him not being there to share it with us any longer. But what a legacy he left.

Ar dheis Dé Tom, rest easy. You will be missed.`,
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
