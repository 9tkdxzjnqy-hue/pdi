import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thepdi.ie";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/walk-ons`, lastModified: new Date() },
    { url: `${baseUrl}/gallery`, lastModified: new Date() },
    { url: `${baseUrl}/competitions`, lastModified: new Date() },
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
