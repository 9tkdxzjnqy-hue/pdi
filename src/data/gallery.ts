export type Era = "early-days" | "middle-years" | "recent";

export interface GalleryItem {
  src: string;
  alt: string;
  era: Era;
  year?: number;
}

export const eras: { id: Era; label: string; description: string }[] = [
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
  { src: "/gallery/early-event-08.jpg", alt: "Early PDI event shot", era: "early-days" },
  { src: "/gallery/early-event-09.jpg", alt: "Early PDI event shot", era: "early-days" },

  // 2008 throwback
  { src: "/gallery/2008-the-boy-throwback.jpg", alt: "The Boy at the 2008 PDI", era: "early-days", year: 2008 },

  // 2013 event shots
  { src: "/gallery/2013-event-01.jpg", alt: "PDI 2013 event shot", era: "early-days", year: 2013 },
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
  { src: "/gallery/2013-digo.jpg", alt: "Digo at PDI 2013", era: "early-days", year: 2013 },

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
  { src: "/gallery/2018-stockdale.jpg", alt: "Stockdale at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-01.jpg", alt: "Walk-on moment at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-02.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-03.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-04.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-05.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-06.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-07.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-08.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-09.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-10.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-11.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-12.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-13.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },
  { src: "/gallery/2018-walkon-14.jpg", alt: "Walk-on at PDI 2018", era: "recent", year: 2018 },

  // 2019
  { src: "/gallery/2019-walkon-elvis.jpg", alt: "Elvis walk-on at PDI 2019", era: "recent", year: 2019 },
  { src: "/gallery/2019-event-01.jpg", alt: "PDI 2019 event shot", era: "recent", year: 2019 },

  // Profiles from recent years
  { src: "/gallery/profile-the-gun.jpg", alt: "The Gun", era: "recent" },
  { src: "/gallery/profile-the-cat.jpg", alt: "The Cat", era: "recent" },
  { src: "/gallery/profile-the-express.jpg", alt: "The Express", era: "recent" },
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
  { src: "/gallery/profile-simo.jpg", alt: "Simo", era: "recent" },
  { src: "/gallery/profile-mick.jpg", alt: "Mick", era: "recent" },

  // 2020
  { src: "/gallery/2020-cmrf-charity.jpg", alt: "CMRF Crumlin charity photo", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-boy.jpg", alt: "The Boy — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-man.jpg", alt: "The Man — PDI 2020", era: "recent", year: 2020 },
  { src: "/gallery/2020-profile-the-gun.jpg", alt: "The Gun — PDI 2020", era: "recent", year: 2020 },
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
];
