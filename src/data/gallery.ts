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
  {
    src: "/images/hero-walkon-blue.jpeg",
    alt: "Walk-on under blue stage lights",
    era: "recent",
  },
  {
    src: "/images/walkon-doors-purple.jpeg",
    alt: "Walk-on through doors with blue, green, and purple lighting",
    era: "recent",
  },
  {
    src: "/images/walkon-smoke-red.jpeg",
    alt: "Walk-on through red smoke",
    era: "recent",
  },
  {
    src: "/images/sequin-jacket-green.jpeg",
    alt: "Player in sequin jacket under green lights",
    era: "recent",
  },
  {
    src: "/images/walkon-elvis-red.jpeg",
    alt: "Elvis-themed walk-on under red lights",
    era: "recent",
  },
  {
    src: "/images/bar-community.jpeg",
    alt: "Friends at the bar under purple and green ambient light",
    era: "recent",
  },
  {
    src: "/images/pints-mates.jpeg",
    alt: "Two lads with pints, crowd behind under purple light",
    era: "recent",
  },
  {
    src: "/images/crowd-energy.jpeg",
    alt: "Crowd cheering with purple lights and dartboard visible",
    era: "recent",
  },
  {
    src: "/images/walkon-green-smoke.jpeg",
    alt: "Walk-on through green smoke",
    era: "recent",
  },
  {
    src: "/images/walkon-blue-green.jpeg",
    alt: "Walk-on under blue and green lights",
    era: "recent",
  },
  {
    src: "/images/cup-toast.jpeg",
    alt: "Group raising cups in celebration",
    era: "recent",
  },
  {
    src: "/images/kids-batman.jpeg",
    alt: "Kids in costume by the doors — family-friendly community",
    era: "recent",
  },
  {
    src: "/images/WalkOnTrophy.jpeg",
    alt: "The Walk-On Trophy",
    era: "recent",
  },
  {
    src: "/images/PDITrophy.jpeg",
    alt: "The PDI Trophy",
    era: "recent",
  },
];
