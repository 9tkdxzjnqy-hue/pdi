export type Era =
  | "early-days"
  | "middle-years"
  | "recent"
  | "walk-ons"
  | "male-players"
  | "doing-our-bit"
  | "reviews"
  | "where-are-they-now"
  | "letters"
  | "ads";

export interface GalleryItem {
  src: string;
  alt: string;
  era: Era;
  year?: number;
}

export interface EraInfo {
  id: Era;
  label: string;
  description: string;
  groupByYear?: boolean;
}

export const eras: EraInfo[] = [
  {
    id: "early-days",
    label: "The Early Days",
    description: "The founding years of the PDI.",
  },
  {
    id: "middle-years",
    label: "The Middle Years",
    description: "Growth and expansion.",
  },
  {
    id: "recent",
    label: "Recent Years",
    description: "The modern PDI.",
  },
  {
    id: "walk-ons",
    label: "The Walk-Ons",
    description: "Through the double doors, into the smoke.",
  },
  {
    id: "male-players",
    label: "The Players",
    description: "The men who made the PDI what it is.",
  },
  {
    id: "doing-our-bit",
    label: "Doing Our Bit",
    description: "Every year, the PDI raises funds for Children's Health Foundation Crumlin.",
    groupByYear: true,
  },
  {
    id: "reviews",
    label: "Reviews",
    description: "Looking back on the year that was.",
  },
  {
    id: "where-are-they-now",
    label: "Where Are They Now?",
    description: "Catching up with familiar faces from PDIs past.",
  },
  {
    id: "letters",
    label: "Letters",
    description: "Fireside chats, dispatches from abroad, and heartfelt words.",
  },
  {
    id: "ads",
    label: "The Sponsors",
    description: "The businesses that backed the PDI over the years.",
  },
];

export const galleryItems: GalleryItem[] = [
  // === EARLY DAYS (pre-2015) ===

  // Yesteryear — historical event shots from the early PDI
  { src: "/gallery/early-event-01.jpg", alt: "Early PDI event shot", era: "early-days" },
  { src: "/gallery/early-event-02.jpg", alt: "Early PDI event shot", era: "early-days" },
  { src: "/gallery/early-event-03.jpg", alt: "Early PDI group photo", era: "early-days" },
  { src: "/gallery/early-event-04.jpg", alt: "Early PDI event shot", era: "early-days" },
  { src: "/gallery/early-event-05.jpg", alt: "Early PDI candid", era: "early-days" },
  { src: "/gallery/early-event-06.jpg", alt: "Early PDI action shot", era: "early-days" },
  { src: "/gallery/early-event-07.jpg", alt: "Early PDI crowd shot", era: "early-days" },
  { src: "/gallery/early-event-09.jpg", alt: "Early PDI event shot", era: "early-days" },

  // 2013 event shots
  { src: "/gallery/2013-event-02.jpg", alt: "PDI 2013 at the oche", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-03.jpg", alt: "PDI 2013 action", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-04.jpg", alt: "PDI 2013 event shot", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-05.jpg", alt: "PDI 2013 crowd", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-06.jpg", alt: "PDI 2013 action shot", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-07.jpg", alt: "PDI 2013 event", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-08.jpg", alt: "PDI 2013 throwing darts", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-09.jpg", alt: "PDI 2013 event shot", era: "early-days", year: 2013 },
  { src: "/gallery/2013-mick.jpg", alt: "Mick at PDI 2013", era: "early-days", year: 2013 },
  { src: "/gallery/2013-sexy-boy.jpg", alt: "Sexy Boy at PDI 2013", era: "early-days", year: 2013 },
  { src: "/gallery/2013-vinny-01.jpg", alt: "Vinny at PDI 2013", era: "early-days", year: 2013 },
  { src: "/gallery/2013-vinny-02.jpg", alt: "Vinny throwing at PDI 2013", era: "early-days", year: 2013 },
  { src: "/gallery/2013-the-educator-01.jpg", alt: "The Educator at PDI 2013", era: "early-days", year: 2013 },
  { src: "/gallery/2013-the-educator-02.jpg", alt: "The Educator throwing at PDI 2013", era: "early-days", year: 2013 },
  { src: "/gallery/2013-the-educator-03.jpg", alt: "The Educator at the oche", era: "early-days", year: 2013 },
  { src: "/gallery/2013-doyler-01.jpg", alt: "Doyler at PDI 2013", era: "early-days", year: 2013 },
  { src: "/gallery/2013-doyler-02.jpg", alt: "Doyler throwing at PDI 2013", era: "early-days", year: 2013 },

  // 2014 — Hall of Fame portrait
  { src: "/gallery/2014-the-boy-hof-portrait.jpg", alt: "The Boy — Hall of Fame portrait", era: "early-days", year: 2014 },

  // === MIDDLE YEARS (2015–2017) ===

  // 2015
  { src: "/gallery/2015-the-boy-hof.jpg", alt: "The Boy at Hall of Fame ceremony", era: "middle-years", year: 2015 },
  { src: "/gallery/2015-the-hazards.jpg", alt: "The Hazards — PDI house band", era: "middle-years", year: 2015 },
  { src: "/gallery/2015-charity-cheque.jpg", alt: "PDI charity cheque presentation", era: "middle-years", year: 2015 },
  { src: "/gallery/2015-charity-thankyou.jpg", alt: "Thank-you letter from Children's Hospital", era: "middle-years", year: 2015 },

  // 2016
  { src: "/gallery/2016-the-physio-hof.jpg", alt: "The Physio — Hall of Fame 2016", era: "middle-years", year: 2016 },

  // Profiles from middle years
  { src: "/gallery/profile-the-bat.jpg", alt: "The Bat", era: "middle-years" },
  { src: "/gallery/profile-the-boy.jpg", alt: "The Boy", era: "middle-years" },
  { src: "/gallery/profile-the-man.jpg", alt: "The Man", era: "middle-years" },
  { src: "/gallery/profile-bar.jpg", alt: "Bar", era: "middle-years" },
  { src: "/gallery/profile-russ.jpg", alt: "Russ", era: "middle-years" },

  // 2017
  { src: "/gallery/2017-chairperson.jpg", alt: "PDI 2017 chairperson", era: "middle-years", year: 2017 },
  { src: "/gallery/2017-event-01.jpg", alt: "PDI 2017 event shot", era: "middle-years", year: 2017 },
  { src: "/gallery/2017-event-02.jpg", alt: "PDI 2017 event shot", era: "middle-years", year: 2017 },
  { src: "/gallery/2017-event-03.jpg", alt: "PDI 2017 event shot", era: "middle-years", year: 2017 },
  { src: "/gallery/2017-hof-induction.jpg", alt: "Hall of Fame induction 2017", era: "middle-years", year: 2017 },

  // === RECENT YEARS (2018–2020) ===

  // 2018
  { src: "/gallery/2018-cover.jpg", alt: "PDI 2018 booklet cover", era: "recent", year: 2018 },
  { src: "/gallery/2018-event-02.jpg", alt: "PDI 2018 event shot", era: "recent", year: 2018 },
  { src: "/gallery/2018-event-03.jpg", alt: "PDI 2018 crowd at the Lakeside", era: "recent", year: 2018 },
  { src: "/gallery/2018-event-04.jpg", alt: "PDI 2018 event action", era: "recent", year: 2018 },
  { src: "/gallery/2018-event-05.jpg", alt: "PDI 2018 event shot", era: "recent", year: 2018 },
  { src: "/gallery/2018-event-06.jpg", alt: "PDI 2018 event shot", era: "recent", year: 2018 },
  { src: "/gallery/2018-event-07.jpg", alt: "PDI 2018 event shot", era: "recent", year: 2018 },
  // 2019
  { src: "/gallery/2019-event-01.jpg", alt: "PDI 2019 event shot", era: "recent", year: 2019 },

  // Profiles from recent years
  { src: "/gallery/profile-the-gun.jpg", alt: "The Gun", era: "recent" },
  { src: "/gallery/profile-the-cat.jpg", alt: "The Cat", era: "recent" },
  { src: "/gallery/profile-the-educator.jpg", alt: "The Educator", era: "recent" },
  { src: "/gallery/profile-the-physio.jpg", alt: "The Physio", era: "recent" },
  { src: "/gallery/profile-sexy-boy.jpg", alt: "Sexy Boy", era: "recent" },
  { src: "/gallery/profile-the-pawn.jpg", alt: "The Pawn", era: "recent" },
  { src: "/gallery/profile-the-rebel.jpg", alt: "The Rebel", era: "recent" },
  { src: "/gallery/profile-the-undertaker.jpg", alt: "The Undertaker", era: "recent" },
  { src: "/gallery/profile-hawaii-501.jpg", alt: "Hawaii 501", era: "recent" },
  { src: "/gallery/profile-bad-medicine.jpg", alt: "Bad Medicine", era: "recent" },
  { src: "/gallery/profile-the-a-lister.jpg", alt: "The A-Lister", era: "recent" },
  { src: "/gallery/profile-ally-pally.jpg", alt: "Ally Pally", era: "recent" },
  { src: "/gallery/profile-doyle.jpg", alt: "Doyle", era: "recent" },
  { src: "/gallery/profile-nugget.jpg", alt: "Nugget", era: "recent" },
  { src: "/gallery/profile-mick.jpg", alt: "Mick", era: "recent" },

  // 2020
  { src: "/gallery/2020-cmrf-charity.jpg", alt: "CMRF Crumlin charity photo", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-boy.jpg", alt: "The Boy — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-man.jpg", alt: "The Man — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-cat.jpg", alt: "The Cat — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-express.jpg", alt: "The Express — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-educator.jpg", alt: "The Educator — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-sexy-boy.jpg", alt: "Sexy Boy — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-a-lister.jpg", alt: "The A-Lister — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-vinny.jpg", alt: "Vinny — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-campbell.jpg", alt: "Campbell — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-geoff.jpg", alt: "Geoff — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-russ.jpg", alt: "Russ — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-mark-the-spark.jpg", alt: "Mark the Spark — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-nugget.jpg", alt: "Nugget — PDI 2020", era: "recent", year: 2020 },

  // === WALK-ONS ===
  { src: "/gallery/2018-walkon-01.jpg", alt: "Walk-on moment at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-02.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-03.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-04.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-05.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-06.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-07.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-08.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-09.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-10.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-11.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-12.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2018-walkon-14.jpg", alt: "Walk-on at PDI 2018", era: "walk-ons", year: 2018 },
  { src: "/gallery/2019-walkon-elvis.jpg", alt: "Elvis walk-on at PDI 2019", era: "walk-ons", year: 2019 },

  // === THE PLAYERS (MEN) ===
  { src: "/gallery/player-the-bat-the-cat-2013.jpg", alt: "The Bat and The Cat — PDI 2013", era: "male-players", year: 2013 },
  { src: "/gallery/player-the-business-card-2013.jpg", alt: "The Business Card — player profile 2013", era: "male-players", year: 2013 },
  { src: "/gallery/player-the-educator-2013.jpg", alt: "The Educator — player profile 2013", era: "male-players", year: 2013 },
  { src: "/gallery/player-the-terror-2013.jpg", alt: "The Terror — player profile 2013", era: "male-players", year: 2013 },


  // === DOING OUR BIT ===
  { src: "/gallery/doing-our-bit-2014-chairman.jpg", alt: "Chairman's address 2014", era: "doing-our-bit", year: 2014 },
  { src: "/gallery/doing-our-bit-2014-charity.jpg", alt: "Charity letter 2014", era: "doing-our-bit", year: 2014 },
  { src: "/gallery/doing-our-bit-2014-prez.jpg", alt: "President's message 2014", era: "doing-our-bit", year: 2014 },
  { src: "/gallery/doing-our-bit-2015-chairman.jpg", alt: "Chairman's address 2015", era: "doing-our-bit", year: 2015 },
  { src: "/gallery/doing-our-bit-2015-charity.jpg", alt: "Charity letter 2015", era: "doing-our-bit", year: 2015 },
  { src: "/gallery/doing-our-bit-2016-chairman.jpg", alt: "Chairman's address 2016", era: "doing-our-bit", year: 2016 },
  { src: "/gallery/doing-our-bit-2016-charity.jpg", alt: "Charity letter 2016", era: "doing-our-bit", year: 2016 },
  { src: "/gallery/doing-our-bit-2017-chairman-1.jpg", alt: "Chairman's address 2017", era: "doing-our-bit", year: 2017 },
  { src: "/gallery/doing-our-bit-2017-chairman-2.jpg", alt: "Chairman's address 2017 — continued", era: "doing-our-bit", year: 2017 },
  { src: "/gallery/doing-our-bit-2017-charity.jpg", alt: "Charity letter 2017", era: "doing-our-bit", year: 2017 },
  { src: "/gallery/doing-our-bit-2018-chairman.jpg", alt: "Chairman's address 2018", era: "doing-our-bit", year: 2018 },
  { src: "/gallery/doing-our-bit-2018-charity.jpg", alt: "Charity letter 2018", era: "doing-our-bit", year: 2018 },
  { src: "/gallery/doing-our-bit-2018-cheque.jpg", alt: "Donation cheque presentation 2018", era: "doing-our-bit", year: 2018 },
  { src: "/gallery/doing-our-bit-2019-chairman.jpg", alt: "Chairman's address 2019", era: "doing-our-bit", year: 2019 },
  { src: "/gallery/doing-our-bit-2019-charity.jpg", alt: "Charity letter 2019", era: "doing-our-bit", year: 2019 },
  { src: "/gallery/doing-our-bit-2020-chairman.jpg", alt: "Chairman's address 2020", era: "doing-our-bit", year: 2020 },
  { src: "/gallery/doing-our-bit-2020-charity.jpg", alt: "Charity letter 2020", era: "doing-our-bit", year: 2020 },
  { src: "/gallery/doing-our-bit-2020-cheque.jpg", alt: "Donation cheque presentation 2020", era: "doing-our-bit", year: 2020 },

  // === REVIEWS ===
  { src: "/gallery/review-2014-01.jpg", alt: "Review of the 2014 PDI — page 1", era: "reviews", year: 2014 },
  { src: "/gallery/review-2014-02.jpg", alt: "Review of the 2014 PDI — page 2", era: "reviews", year: 2014 },
  { src: "/gallery/review-2014-03.jpg", alt: "Review of the 2014 PDI — page 3", era: "reviews", year: 2014 },
  { src: "/gallery/review-2015-01.jpg", alt: "Review of the 2015 PDI", era: "reviews", year: 2015 },
  { src: "/gallery/review-2016-01.jpg", alt: "Review of the 2016 PDI — page 1", era: "reviews", year: 2016 },
  { src: "/gallery/review-2016-02.jpg", alt: "Review of the 2016 PDI — page 2", era: "reviews", year: 2016 },
  { src: "/gallery/review-2016-03.jpg", alt: "Review of the 2016 PDI — page 3", era: "reviews", year: 2016 },
  { src: "/gallery/review-2016-04.jpg", alt: "Review of the 2016 PDI — page 4", era: "reviews", year: 2016 },
  { src: "/gallery/review-2017-01.jpg", alt: "Review of the 2017 PDI", era: "reviews", year: 2017 },

  // === WHERE ARE THEY NOW? ===
  { src: "/gallery/watn-2015-01.jpg", alt: "Where are they now — 2015", era: "where-are-they-now", year: 2015 },
  { src: "/gallery/watn-2015-02.jpg", alt: "Where are they now — 2015", era: "where-are-they-now", year: 2015 },
  { src: "/gallery/watn-2015-03.jpg", alt: "Where are they now — 2015", era: "where-are-they-now", year: 2015 },
  { src: "/gallery/watn-2015-04.jpg", alt: "Where are they now — 2015", era: "where-are-they-now", year: 2015 },
  { src: "/gallery/watn-2016-01.jpg", alt: "Where are they now — 2016", era: "where-are-they-now", year: 2016 },
  { src: "/gallery/watn-2016-02.jpg", alt: "Where are they now — 2016", era: "where-are-they-now", year: 2016 },
  { src: "/gallery/watn-2016-03.jpg", alt: "Where are they now — 2016", era: "where-are-they-now", year: 2016 },

  // === LETTERS ===
  { src: "/gallery/letter-fireside-2015.jpg", alt: "Fireside chat — 2015", era: "letters", year: 2015 },
  { src: "/gallery/letter-fireside-2016.jpg", alt: "Fireside chat — 2016", era: "letters", year: 2016 },
  { src: "/gallery/letter-abroad-2015.jpg", alt: "A view from abroad — 2015", era: "letters", year: 2015 },
  { src: "/gallery/letter-selina-2019.jpg", alt: "A letter to the PDI — 2019", era: "letters", year: 2019 },
  { src: "/gallery/letter-the-boy-2019.jpg", alt: "The Boy's letter — 2019", era: "letters", year: 2019 },

  // === THE SPONSORS ===
  { src: "/gallery/ad-bridge-containers-2014.jpg", alt: "Bridge Containers — sponsor ad 2014", era: "ads", year: 2014 },
  { src: "/gallery/ad-hedzer-2014.jpg", alt: "Hedzer — sponsor ad 2014", era: "ads", year: 2014 },
  { src: "/gallery/ad-life-2014.jpg", alt: "Life — sponsor ad 2014", era: "ads", year: 2014 },
  { src: "/gallery/ad-sackville-2015.jpg", alt: "Sackville Lounge — sponsor ad 2015", era: "ads", year: 2015 },
  { src: "/gallery/ad-fantasy-lights-2017.jpg", alt: "Fantasy Lights — sponsor ad 2017", era: "ads", year: 2017 },
  { src: "/gallery/ad-oreilly-recruitment-2017.jpg", alt: "O'Reilly Recruitment — sponsor ad 2017", era: "ads", year: 2017 },
  { src: "/gallery/ad-think-bike-2017.jpg", alt: "Think Bike — sponsor ad 2017", era: "ads", year: 2017 },
  { src: "/gallery/ad-devitts-2018.jpg", alt: "Devitts — sponsor ad 2018", era: "ads", year: 2018 },
  { src: "/gallery/ad-iconic-2019.jpg", alt: "Iconic — sponsor ad 2019", era: "ads", year: 2019 },
];
