export interface Inductee {
  nickname: string;
  contribution: string;
  year?: number;
  photo?: string;
}

export interface CompetitionResult {
  year: number;
  winner?: string;
  runnerUp?: string;
  walkOnName?: string;
  venue?: string;
  photo?: string;
}

export interface SanityImageRef {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface Competition {
  name: string;
  description: string;
  image: SanityImageRef;
  slug?: string;
  featured?: boolean;
  displayOrder?: number;
  results: CompetitionResult[];
}

export interface GalleryItem {
  _id?: string;
  src?: string;
  alt: string;
  era: string;
  year?: number;
  featured?: boolean;
  youtubeId?: string;
}

export interface EraInfo {
  eraId: string;
  label: string;
  description: string;
  groupByYear?: boolean;
  allYears?: number[];
  displayOrder?: number;
}

export interface StoryThread {
  title: string;
  description: string;
  slug: string;
  comingSoon?: boolean;
  displayOrder?: number;
}

export interface StoryImage {
  src: string;
  alt: string;
}

export interface Story {
  title: string;
  year?: number;
  author?: string;
  body?: string;
  images?: StoryImage[];
  displayOrder?: number;
}

export interface SiteSettings {
  donationAmount?: string;
  donationLabel?: string;
  charityName?: string;
  charityUrl?: string;
  galleryUploadUrl?: string;
}

export interface HomePage {
  heroTitle?: string;
  heroSubtitle?: string;
  storyTitle?: string;
  storyBody?: string;
  storyImage?: SanityImageRef;
  storyImageAlt?: string;
  charityLabel?: string;
  charityHeading?: string;
  charityLinkText?: string;
  charityImage?: SanityImageRef;
  charityImageAlt?: string;
  competitionsTitle?: string;
  competitionsDescription?: string;
  competitionsLinkText?: string;
  galleryTitle?: string;
  galleryDescription?: string;
  galleryLinkText?: string;
  galleryUploadText?: string;
}
