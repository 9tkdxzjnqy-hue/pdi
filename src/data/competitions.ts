export interface CompetitionResult {
  year: number;
  winner: string;
  finalists?: string[];
}

export interface Competition {
  name: string;
  description: string;
  image: string;
  alt: string;
  results: CompetitionResult[];
  showFinalists: boolean;
}

export const competitions: Competition[] = [
  {
    name: "The PDI",
    description:
      "The main event. Who can hold their nerve when it matters most? The PDI crown is the most coveted prize in the game.",
    image: "/images/PDITrophy.jpeg",
    alt: "The PDI trophy",
    showFinalists: true,
    results: [
      {
        year: 2024,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
      {
        year: 2023,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
      {
        year: 2022,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
      {
        year: 2021,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
      {
        year: 2020,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
    ],
  },
  {
    name: "Walk-on of the Year",
    description:
      "The most theatrical entrance takes the Pat the Bat Memorial Trophy. Creativity, showmanship, and sheer audacity — anything goes.",
    image: "/images/WalkOnTrophy.jpeg",
    alt: "The Pat the Bat Memorial Trophy for Walk-on of the Year",
    showFinalists: true,
    results: [
      {
        year: 2024,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
      {
        year: 2023,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
      {
        year: 2022,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
      {
        year: 2021,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
      {
        year: 2020,
        winner: "Claim your spot",
        finalists: ["Claim your spot", "Claim your spot"],
      },
    ],
  },
  {
    name: "WPDI",
    description:
      "The women's invitational. Fierce and fabulous — the WPDI has quickly become one of the highlights of the night.",
    image: "/images/bar-community.jpeg",
    alt: "Three women at the PDI under purple and green ambient light",
    showFinalists: false,
    results: [
      { year: 2024, winner: "Claim your spot" },
      { year: 2023, winner: "Claim your spot" },
      { year: 2022, winner: "Claim your spot" },
    ],
  },
  {
    name: "The Shield",
    description:
      "The Europa League of the PDI. A second chance at glory for those who fall short of the main event — but make no mistake, The Shield has a prestige all its own.",
    image: "/images/walkon-green-smoke.jpeg",
    alt: "Walk-on at doors with green smoke and lights",
    showFinalists: false,
    results: [
      { year: 2024, winner: "Claim your spot" },
      { year: 2023, winner: "Claim your spot" },
      { year: 2022, winner: "Claim your spot" },
      { year: 2021, winner: "Claim your spot" },
      { year: 2020, winner: "Claim your spot" },
    ],
  },
];
