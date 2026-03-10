export type Era =
  | "early-days"
  | "middle-years"
  | "recent"
  | "walk-ons"
  | "male-players"
  | "the-hazards"
  | "ads";

export interface GalleryItem {
  src?: string;
  alt: string;
  era: Era;
  year?: number;
  youtubeId?: string;
  featured?: boolean;
}

export interface EraInfo {
  id: Era;
  label: string;
  description: string;
  groupByYear?: boolean;
  allYears?: number[];
}

export const walkOnEra: EraInfo = {
  id: "walk-ons",
  label: "The Walk-Ons",
  description: "Through the double doors, into the smoke.",
  groupByYear: true,
  allYears: [2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013],
};

export const eras: EraInfo[] = [
  {
    id: "male-players",
    label: "The Players",
    description: "The players who made the PDI what it is.",
  },
  {
    id: "the-hazards",
    label: "The Hazards",
    description: "The PDI house band. The night wouldn't be the night without them.",
  },
  {
    id: "recent",
    label: "Recent Years",
    description: "The modern PDI.",
  },
  {
    id: "middle-years",
    label: "The Middle Years",
    description: "Growth and expansion.",
  },
  {
    id: "early-days",
    label: "The Early Days",
    description: "The founding years of the PDI.",
  },
  {
    id: "ads",
    label: "The Sponsors",
    description: "The businesses that backed the PDI over the years.",
  },
];

export const galleryItems: GalleryItem[] = [
  // === THE PLAYERS ===
  { src: "/gallery/player-the-bat-the-cat-2013.jpg", alt: "The Bat and The Cat — PDI 2013", era: "male-players", year: 2013 },
  { src: "/gallery/player-the-business-card-2013.jpg", alt: "The Business Card — player profile 2013", era: "male-players", year: 2013 },
  { src: "/gallery/player-the-educator-2013.jpg", alt: "The Educator — player profile 2013", era: "male-players", year: 2013 },
  { src: "/gallery/player-the-terror-2013.jpg", alt: "The Terror — player profile 2013", era: "male-players", year: 2013 },
  { src: "/gallery/2022-a-lister-pdi-winner.jpg", alt: "A Lister — PDI winner 2022", era: "male-players", year: 2022 },
  { src: "/gallery/2025-the-kitten.jpg", alt: "The Kitten — Shield winner 2025", era: "male-players", year: 2025 },

  // === THE HAZARDS ===
  { src: "/gallery/2013-event-05.jpg", alt: "The Hazards performing at PDI 2013", era: "the-hazards", year: 2013 },
  { src: "/gallery/2015-the-hazards.jpg", alt: "The Hazards — PDI house band", era: "the-hazards", year: 2015, featured: true },

  // === RECENT YEARS ===
  { src: "/gallery/2018-cover.jpg", alt: "PDI 2018 booklet cover", era: "recent", year: 2018 },
  { src: "/gallery/2018-event-05.jpg", alt: "PDI 2018 event shot", era: "recent", year: 2018 },
  { src: "/gallery/2018-event-06.jpg", alt: "PDI 2018 event shot", era: "recent", year: 2018 },
  { src: "/gallery/2018-event-07.jpg", alt: "PDI 2018 event shot", era: "recent", year: 2018 },
  { src: "/gallery/2019-event-01.jpg", alt: "PDI 2019 event shot", era: "recent", year: 2019 },
  { src: "/gallery/2020-profile-campbell.jpg", alt: "Campbell — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-russ.jpg", alt: "Russ — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-a-lister.jpg", alt: "The A-Lister — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-boy.jpg", alt: "The Boy — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-cat.jpg", alt: "The Cat — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-man.jpg", alt: "The Man — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-vinny.jpg", alt: "Vinny — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2022-a-lister-the-next-morning.jpg", alt: "A Lister — the next morning with the PDI trophy 2022", era: "recent", year: 2022 },
  { src: "/gallery/profile-ally-pally.jpg", alt: "Ally Pally", era: "recent" },
  { src: "/gallery/profile-bad-medicine.jpg", alt: "Bad Medicine", era: "recent" },
  { src: "/gallery/profile-hawaii-501.jpg", alt: "Hawaii 501", era: "recent" },
  { src: "/gallery/profile-nugget.jpg", alt: "Nugget", era: "recent" },
  { src: "/gallery/profile-the-undertaker.jpg", alt: "The Undertaker", era: "recent" },

  // === THE MIDDLE YEARS ===
  { src: "/gallery/2015-charity-cheque.jpg", alt: "PDI charity cheque presentation", era: "middle-years", year: 2015 },
  { src: "/gallery/2015-charity-thankyou.jpg", alt: "Thank-you letter from Children's Hospital", era: "middle-years", year: 2015 },
  { src: "/gallery/2016-the-physio-hof.jpg", alt: "The Physio — Hall of Fame 2016", era: "middle-years", year: 2016 },
  { src: "/gallery/2017-chairperson.jpg", alt: "PDI 2017 chairperson", era: "middle-years", year: 2017 },
  { src: "/gallery/2017-event-01.jpg", alt: "PDI 2017 event shot", era: "middle-years", year: 2017 },
  { src: "/gallery/2017-event-02.jpg", alt: "PDI 2017 event shot", era: "middle-years", year: 2017 },
  { src: "/gallery/2017-event-03.jpg", alt: "PDI 2017 event shot", era: "middle-years", year: 2017 },
  { src: "/gallery/2017-hof-induction.jpg", alt: "Hall of Fame induction 2017", era: "middle-years", year: 2017 },
  { src: "/gallery/2020-profile-geoff.jpg", alt: "Geoff — PDI 2020", era: "middle-years", year: 2020 },
  { src: "/gallery/early-event-01.jpg", alt: "Early PDI event shot", era: "middle-years" },
  { src: "/gallery/early-event-04.jpg", alt: "Early PDI event shot", era: "middle-years", featured: true },
  { src: "/gallery/early-event-09.jpg", alt: "Early PDI event shot", era: "middle-years", featured: true },
  { src: "/gallery/profile-bar.jpg", alt: "Bar", era: "middle-years" },
  { src: "/gallery/profile-russ.jpg", alt: "Russ", era: "middle-years" },
  { src: "/gallery/profile-the-bat.jpg", alt: "The Bat", era: "middle-years" },
  { src: "/gallery/profile-the-boy.jpg", alt: "The Boy", era: "middle-years" },
  { src: "/gallery/profile-the-man.jpg", alt: "The Man", era: "middle-years" },

  // === THE EARLY DAYS ===
  { src: "/gallery/2013-doyler-02.jpg", alt: "Doyler throwing at PDI 2013", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-02.jpg", alt: "PDI 2013 at the oche", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-03.jpg", alt: "PDI 2013 action", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-06.jpg", alt: "PDI 2013 action shot", era: "early-days", year: 2013 },
  { src: "/gallery/2013-event-09.jpg", alt: "PDI 2013 event shot", era: "early-days", year: 2013 },
  { src: "/gallery/early-event-02.jpg", alt: "Early PDI event shot", era: "early-days" },
  { src: "/gallery/early-event-03.jpg", alt: "Early PDI group photo", era: "early-days" },
  { src: "/gallery/early-event-05.jpg", alt: "Early PDI candid", era: "early-days" },
  { src: "/gallery/early-event-06.jpg", alt: "Early PDI action shot", era: "early-days" },

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

  // === WALK-ONS ===
  { src: "/gallery/2013-event-08.jpg", alt: "PDI 2013 throwing darts", era: "walk-ons", year: 2013 },
  { src: "/gallery/2013-mick.jpg", alt: "Mick at PDI 2013", era: "walk-ons", year: 2013 },
  { src: "/gallery/2013-sexy-boy.jpg", alt: "Sexy Boy at PDI 2013", era: "walk-ons", year: 2013 },
  { src: "/gallery/2013-the-educator-01.jpg", alt: "The Educator at PDI 2013", era: "walk-ons", year: 2013 },
  { src: "/gallery/2013-the-educator-02.jpg", alt: "The Educator throwing at PDI 2013", era: "walk-ons", year: 2013 },
  { src: "/gallery/2013-vinny-01.jpg", alt: "Vinny at PDI 2013", era: "walk-ons", year: 2013 },
  { src: "/gallery/2013-vinny-02.jpg", alt: "Vinny throwing at PDI 2013", era: "walk-ons", year: 2013 },
  { youtubeId: "wopnHvGMzGY", alt: "The Bat — 2015 walk-on", era: "walk-ons", year: 2015 },
  { youtubeId: "zTcOhsZMr1U", alt: "Pog mo Thoin — 2015 walk-on", era: "walk-ons", year: 2015 },
  { src: "/gallery/2018-walkon-01.jpg", alt: "Gat's Riverdance walk-on at PDI 2016", era: "walk-ons", year: 2016 },
  { src: "/gallery/2018-walkon-02.jpg", alt: "Gat's Riverdance walk-on at PDI 2016", era: "walk-ons", year: 2016 },
  { src: "/gallery/2018-walkon-03.jpg", alt: "Gat's Riverdance walk-on at PDI 2016", era: "walk-ons", year: 2016 },
  { src: "/gallery/2018-walkon-11.jpg", alt: "Gat's Riverdance walk-on at PDI 2016", era: "walk-ons", year: 2016 },
  { src: "/gallery/2018-walkon-12.jpg", alt: "Gat's Riverdance walk-on at PDI 2016", era: "walk-ons", year: 2016 },
  { src: "/gallery/2018-walkon-14.jpg", alt: "Gat's Riverdance walk-on at PDI 2016", era: "walk-ons", year: 2016 },
  { src: "/gallery/2018-walkon-04.jpg", alt: "Gat's David Brent walk-on at PDI 2017", era: "walk-ons", year: 2017 },
  { src: "/gallery/2018-walkon-05.jpg", alt: "Gat's David Brent walk-on at PDI 2017", era: "walk-ons", year: 2017 },
  { src: "/gallery/2018-walkon-06.jpg", alt: "Gat's David Brent walk-on at PDI 2017", era: "walk-ons", year: 2017 },
  { src: "/gallery/2018-walkon-07.jpg", alt: "Gat's David Brent walk-on at PDI 2017", era: "walk-ons", year: 2017 },
  { src: "/gallery/2018-walkon-08.jpg", alt: "Gat's David Brent walk-on at PDI 2017", era: "walk-ons", year: 2017 },
  { src: "/gallery/2018-walkon-09.jpg", alt: "Gat's David Brent walk-on at PDI 2017", era: "walk-ons", year: 2017 },
  { src: "/gallery/2020-profile-the-express.jpg", alt: "The Express — PDI 2019", era: "walk-ons", year: 2019 },
  { src: "/gallery/2025-the-rebel-walk-on.jpg", alt: "The Rebel in the green sequin jacket — PDI 2025", era: "walk-ons", year: 2025 },
  { src: "/gallery/the-kitten-walkon-2025.jpg", alt: "The Kitten carried on shoulders during walk-on — PDI 2025", era: "walk-ons", year: 2025 },
  { src: "/gallery/kitten-walkon-2-2025.jpg", alt: "The Kitten arms raised during walk-on — PDI 2025", era: "walk-ons", year: 2025 },
  { src: "/gallery/backstage-walkons-2025.jpg", alt: "Backstage before the walk-ons — PDI 2025", era: "walk-ons", year: 2025 },
  { src: "/gallery/walkon-contenders-2025.jpg", alt: "Walk-on contenders arm in arm under the lights — PDI 2025", era: "walk-ons", year: 2025 },

  // === GALLERY (non walk-on) ===
  { src: "/gallery/the-kitten-bar-2025.jpg", alt: "The Kitten at the bar in his darts jersey — PDI 2025", era: "recent", year: 2025 },
];
