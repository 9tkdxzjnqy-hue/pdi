export interface CompetitionResult {
  year: number;
  winner?: string;
  runnerUp?: string;
  walkOnName?: string;
}

export interface Competition {
  name: string;
  description: string;
  image: string;
  alt: string;
  results: CompetitionResult[];
}

export const competitions: Competition[] = [
  {
    name: "The PDI",
    description:
      "The main event. Who can hold their nerve when it matters most? The PDI crown is the most coveted prize in the game.",
    image: "/images/PDITrophy.jpeg",
    alt: "The PDI trophy",
    results: [
      { year: 2004, winner: "Monster", runnerUp: "The Business Card" },
      { year: 2005, winner: "The Express", runnerUp: "The Gun" },
      { year: 2006, winner: "The Cat", runnerUp: "The Express" },
      { year: 2007, winner: "The Express", runnerUp: "The Boy" },
      { year: 2008, winner: "The Gun", runnerUp: "The Boy" },
      { year: 2009, winner: "The Express", runnerUp: "The Educator" },
      { year: 2010, winner: "The Educator", runnerUp: "The Man" },
      { year: 2011, winner: "The Educator", runnerUp: "The Cat" },
      { year: 2012, winner: "The Boy", runnerUp: "The A Lister" },
      { year: 2013, winner: "The Boy", runnerUp: "The Educator" },
      { year: 2014, winner: "The Physio", runnerUp: "The Cat" },
      { year: 2015, winner: "The Express", runnerUp: "The Educator" },
      { year: 2016, winner: "The Boy", runnerUp: "The Educator" },
      { year: 2017, winner: "Gat", runnerUp: "Anto" },
      { year: 2018, winner: "The Physio", runnerUp: "O'Malley" },
      { year: 2019, winner: "The Boy", runnerUp: "The Physio" },
      { year: 2020 },
      { year: 2021 },
      { year: 2022, winner: "A Lister", runnerUp: "Gat" },
      { year: 2023, winner: "The Boy", runnerUp: "Vinny" },
      { year: 2024, winner: "The Gun", runnerUp: "Sexy Boy" },
      { year: 2025, winner: "The Boy", runnerUp: "The Express" },
    ],
  },
  {
    name: "WPDI",
    description:
      "The women's invitational. Fierce and fabulous — the WPDI has quickly become one of the highlights of the night.",
    image: "/images/bar-community.jpeg",
    alt: "Three women at the PDI under purple and green ambient light",
    results: [
      { year: 2013, winner: "Michelle" },
      { year: 2014, winner: "Michelle" },
      { year: 2015, winner: "Sinead" },
      { year: 2016, winner: "Giulia" },
      { year: 2017, winner: "Sinead" },
      { year: 2018, winner: "Niamh" },
      { year: 2019, winner: "Marianna" },
      { year: 2020 },
      { year: 2021 },
      { year: 2022 },
      { year: 2023 },
      { year: 2024 },
      { year: 2025 },
    ],
  },
  {
    name: "Walk-on of the Year",
    description:
      "The most theatrical entrance takes the Pat the Bat Memorial Trophy. Creativity, showmanship, and sheer audacity — anything goes.",
    image: "/images/WalkOnTrophy.jpeg",
    alt: "The Pat the Bat Memorial Trophy for Walk-on of the Year",
    results: [
      { year: 2013, winner: "The Cat", walkOnName: "The Proposal" },
      { year: 2014, winner: "Byrner", walkOnName: "The Undertaker" },
      { year: 2015, winner: "Sexy Boy", walkOnName: "Sexy Boy" },
      { year: 2016, winner: "Gat", walkOnName: "David Brent" },
      { year: 2017, winner: "Gat", walkOnName: "Riverdance" },
      { year: 2018, winner: "The Spark", walkOnName: "Time Warp" },
      { year: 2019, winner: "Sexy Boy", walkOnName: "Baywatch" },
      { year: 2020 },
      { year: 2021 },
      { year: 2022, winner: "Gat", walkOnName: "Inches" },
      { year: 2023, winner: "The Cat and the Kitten", walkOnName: "Mini Me" },
      { year: 2024, winner: "Monster", walkOnName: "Stone Cold" },
      { year: 2025, winner: "The Rebel", walkOnName: "A Song for Europe" },
    ],
  },
  {
    name: "The Shield",
    description:
      "The Europa League of the PDI. A second chance at glory for those who fall short of the main event — but make no mistake, The Shield has a prestige all its own.",
    image: "/images/walkon-green-smoke.jpeg",
    alt: "Walk-on at doors with green smoke and lights",
    results: [
      { year: 2011, winner: "Monster", runnerUp: "Nugget" },
      { year: 2012, winner: "The Pawn", runnerUp: "The Cat" },
      { year: 2013, winner: "The Pawn", runnerUp: "Monster" },
      { year: 2014, winner: "The Boy", runnerUp: "The Man" },
      { year: 2015, winner: "Bad Medicine", runnerUp: "Monster" },
      { year: 2016, winner: "The Thurles Terror", runnerUp: "Bad Medicine" },
      { year: 2017, winner: "The Thurles Terror", runnerUp: "Bad Medicine" },
      { year: 2018, winner: "The A Lister", runnerUp: "The Express" },
      { year: 2019, winner: "Hawaii 501", runnerUp: "The Asset" },
      { year: 2020 },
      { year: 2021 },
      { year: 2022 },
      { year: 2023 },
      { year: 2024 },
      { year: 2025, winner: "The Kitten", runnerUp: "A Lister" },
    ],
  },
  {
    name: "Hall of Fame",
    description:
      "Each year, one name is added to the Hall of Fame in recognition of their contribution to the PDI.",
    image: "/images/hero-walkon-blue.jpeg",
    alt: "PDI Hall of Fame",
    results: [
      { year: 2011, winner: "The Bat" },
      { year: 2012, winner: "The Educator" },
      { year: 2013, winner: "The Cat" },
      { year: 2014, winner: "The Boy" },
      { year: 2015, winner: "The Physio" },
      { year: 2016, winner: "The Express" },
      { year: 2017, winner: "The Trick & The Treat" },
      { year: 2018, winner: "The Gun" },
      { year: 2019, winner: "Sexy Boy" },
      { year: 2020 },
      { year: 2021 },
      { year: 2022, winner: "The Rebel" },
      { year: 2023, winner: "Vinny" },
      { year: 2024 },
      { year: 2025 },
    ],
  },
];
