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

export const galleryItems: GalleryItem[] = [];
