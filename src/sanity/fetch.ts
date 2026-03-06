import { getClient } from "./client";
import {
  inducteesQuery,
  competitionsQuery,
  featuredCompetitionsQuery,
  erasQuery,
  galleryByEraQuery,
  featuredGalleryQuery,
  storyThreadsQuery,
  storiesByThreadQuery,
  siteSettingsQuery,
  homePageQuery,
} from "./queries";
import { inductees as fallbackInductees } from "@/data/hallOfFame";
import { competitions as fallbackCompetitions } from "@/data/competitions";
import { eras as fallbackEras, galleryItems as fallbackGalleryItems } from "@/data/gallery";
import type { Inductee, Competition, GalleryItem, EraInfo, StoryThread, Story, SiteSettings, HomePage } from "./types";

export async function getInductees(): Promise<Inductee[]> {
  const client = getClient();
  if (!client) return fallbackInductees;

  try {
    const result = await client.fetch<Inductee[]>(inducteesQuery, {}, {
      next: { tags: ["inductees"] },
    });

    if (!result || result.length === 0) {
      return fallbackInductees;
    }

    return result;
  } catch {
    console.error("Failed to fetch inductees from Sanity, using fallback data");
    return fallbackInductees;
  }
}

function toFallbackCompetitions() {
  return fallbackCompetitions.map((c) => ({
    ...c,
    image: { _type: "image" as const, asset: { _ref: "", _type: "reference" as const } },
    slug: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    _fallbackImage: c.image,
  }));
}

export async function getCompetitions(): Promise<Competition[]> {
  const client = getClient();
  if (!client) return toFallbackCompetitions();

  try {
    const result = await client.fetch<Competition[]>(competitionsQuery, {}, {
      next: { tags: ["competitions"] },
    });

    if (!result || result.length === 0) {
      return toFallbackCompetitions();
    }

    return result.filter((c) => c.name !== "Walk-on of the Year");
  } catch {
    console.error("Failed to fetch competitions from Sanity, using fallback data");
    return toFallbackCompetitions();
  }
}

export async function getFeaturedCompetitions(): Promise<Competition[]> {
  const client = getClient();
  if (!client) return toFallbackCompetitions().slice(0, 4);

  try {
    const result = await client.fetch<Competition[]>(featuredCompetitionsQuery, {}, {
      next: { tags: ["competitions"] },
    });

    if (!result || result.length === 0) {
      return toFallbackCompetitions().slice(0, 4);
    }

    return result;
  } catch {
    console.error("Failed to fetch featured competitions from Sanity, using fallback data");
    return toFallbackCompetitions().slice(0, 4);
  }
}

// --- Gallery ---

function toFallbackEras(): EraInfo[] {
  return fallbackEras.map((e, i) => ({
    eraId: e.id,
    label: e.label,
    description: e.description,
    groupByYear: e.groupByYear,
    allYears: e.allYears,
    displayOrder: i + 1,
  }));
}

export async function getEras(): Promise<EraInfo[]> {
  const client = getClient();
  if (!client) return toFallbackEras();

  try {
    const result = await client.fetch<EraInfo[]>(erasQuery, {}, {
      next: { tags: ["eras"] },
    });

    if (!result || result.length === 0) {
      return toFallbackEras();
    }

    return result.filter((e) => e.eraId !== "walk-ons");
  } catch {
    console.error("Failed to fetch eras from Sanity, using fallback data");
    return toFallbackEras();
  }
}

// Video-only items from fallback data (no src, only youtubeId) that need
// to be merged into results regardless of whether Sanity returns data.
function getFallbackVideos(eraId: string): GalleryItem[] {
  return fallbackGalleryItems.filter(
    (item) => item.era === eraId && !item.src && item.youtubeId
  );
}

export async function getGalleryByEra(eraId: string): Promise<GalleryItem[]> {
  const client = getClient();
  if (!client) return fallbackGalleryItems.filter((item) => item.era === eraId);

  try {
    const result = await client.fetch<GalleryItem[]>(galleryByEraQuery, { era: eraId }, {
      next: { tags: ["gallery"] },
    });

    if (!result || result.length === 0) {
      return fallbackGalleryItems.filter((item) => item.era === eraId);
    }

    // Merge in video-only items from fallback data
    const videos = getFallbackVideos(eraId);
    return videos.length > 0 ? [...result, ...videos] : result;
  } catch {
    console.error(`Failed to fetch gallery items for era ${eraId}, using fallback data`);
    return fallbackGalleryItems.filter((item) => item.era === eraId);
  }
}

export async function getFeaturedGalleryImages(): Promise<GalleryItem[]> {
  const client = getClient();
  const fallback = fallbackGalleryItems
    .filter((_, i) => [30, 27, 31, 56, 4, 28].includes(i))
    .slice(0, 6);
  if (!client) return fallback;

  try {
    const result = await client.fetch<GalleryItem[]>(featuredGalleryQuery, {}, {
      next: { tags: ["gallery"] },
    });

    if (!result || result.length === 0) {
      return fallback;
    }

    return result;
  } catch {
    console.error("Failed to fetch featured gallery images from Sanity, using fallback data");
    return fallback;
  }
}

// --- Stories ---

export async function getStoryThreads(): Promise<StoryThread[]> {
  const client = getClient();
  if (!client) return [];

  try {
    const result = await client.fetch<StoryThread[]>(storyThreadsQuery, {}, {
      next: { tags: ["storyThreads"] },
    });

    return result ?? [];
  } catch {
    console.error("Failed to fetch story threads from Sanity");
    return [];
  }
}

export async function getStoriesByThread(threadSlug: string): Promise<Story[]> {
  const client = getClient();
  if (!client) return [];

  try {
    const result = await client.fetch<Story[]>(storiesByThreadQuery, { threadSlug }, {
      next: { tags: ["stories"] },
    });

    return result ?? [];
  } catch {
    console.error(`Failed to fetch stories for thread ${threadSlug}`);
    return [];
  }
}

// --- Singletons ---

export async function getSiteSettings(): Promise<SiteSettings> {
  const client = getClient();
  if (!client) return {};

  try {
    const result = await client.fetch<SiteSettings | null>(siteSettingsQuery, {}, {
      next: { tags: ["siteSettings"] },
    });

    return result ?? {};
  } catch {
    console.error("Failed to fetch site settings from Sanity");
    return {};
  }
}

export async function getHomePage(): Promise<HomePage> {
  const client = getClient();
  if (!client) return {};

  try {
    const result = await client.fetch<HomePage | null>(homePageQuery, {}, {
      next: { tags: ["homePage"] },
    });

    return result ?? {};
  } catch {
    console.error("Failed to fetch homepage from Sanity");
    return {};
  }
}
