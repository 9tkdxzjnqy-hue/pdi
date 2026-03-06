import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thepdi.ie";

  const galleryEras = [
    "male-players",
    "the-hazards",
    "recent",
    "middle-years",
    "early-days",
    "doing-our-bit",
    "ads",
  ];

  const walkOnYears = [
    2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  ];

  const competitionSlugs = ["the-pdi", "wpdi", "the-shield", "hall-of-fame"];

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/walk-ons`, lastModified: new Date() },
    ...walkOnYears.map((year) => ({
      url: `${baseUrl}/walk-ons/${year}`,
      lastModified: new Date(),
    })),
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    ...galleryEras.map((era) => ({
      url: `${baseUrl}/gallery/${era}`,
      lastModified: new Date(),
    })),
    { url: `${baseUrl}/competitions`, lastModified: new Date() },
    ...competitionSlugs.map((slug) => ({
      url: `${baseUrl}/competitions/${slug}`,
      lastModified: new Date(),
    })),
    { url: `${baseUrl}/hall-of-fame`, lastModified: new Date() },
    { url: `${baseUrl}/stories`, lastModified: new Date() },
    { url: `${baseUrl}/stories/letters`, lastModified: new Date() },
    { url: `${baseUrl}/stories/reviews`, lastModified: new Date() },
    { url: `${baseUrl}/stories/where-are-they-now`, lastModified: new Date() },
    { url: `${baseUrl}/stories/auction`, lastModified: new Date() },
    { url: `${baseUrl}/stories/videos`, lastModified: new Date() },
    { url: `${baseUrl}/remembering`, lastModified: new Date() },
  ];
}
