import { getWriteClient } from "../src/sanity/client";
import { WALK_ON_YEARS } from "../src/data/gallery";
import { writeFileSync } from "fs";
import path from "path";

interface SanityGalleryItem {
  _id: string;
  imageFilename?: string;
  alt: string;
  era: string;
  year?: number;
  youtubeId?: string;
  featured?: boolean;
}

// All valid era values for the type union (matches galleryItem schema dropdown)
const ALL_ERAS = [
  "early-days",
  "middle-years",
  "recent",
  "walk-ons",
  "male-players",
  "the-hazards",
  "ads",
] as const;

// Era display order for grouping gallery items in the generated file
const ERA_ORDER = [
  "male-players",
  "the-hazards",
  "recent",
  "middle-years",
  "early-days",
  "ads",
  "walk-ons",
];

export async function pullGallery() {
  const client = getWriteClient();

  // Fetch gallery items
  const sanityItems = await client.fetch<SanityGalleryItem[]>(
    `*[_type == "galleryItem"] {
      _id,
      "imageFilename": image.asset->originalFilename,
      alt,
      era,
      year,
      youtubeId,
      featured
    }`
  );
  console.log(`  Fetched ${sanityItems.length} gallery items from Sanity`);

  // --- Generate TS file ---
  let out = "";

  // Type export
  out += `export type Era =\n`;
  out += ALL_ERAS.map((e) => `  | ${JSON.stringify(e)}`).join("\n");
  out += `;\n\n`;

  // GalleryItem interface
  out += `export interface GalleryItem {\n`;
  out += `  src?: string;\n`;
  out += `  alt: string;\n`;
  out += `  era: Era;\n`;
  out += `  year?: number;\n`;
  out += `  youtubeId?: string;\n`;
  out += `  featured?: boolean;\n`;
  out += `}\n\n`;

  // WALK_ON_YEARS — preserved from local
  out += `export const WALK_ON_YEARS = [${WALK_ON_YEARS.join(", ")}];\n\n`;

  // galleryItems grouped by era
  out += `export const galleryItems: GalleryItem[] = [\n`;

  const itemsByEra = new Map<string, SanityGalleryItem[]>();
  for (const item of sanityItems) {
    const era = item.era || "recent";
    if (!itemsByEra.has(era)) itemsByEra.set(era, []);
    itemsByEra.get(era)!.push(item);
  }

  // Sort items within each era by year asc (null years last), then by _id for stability
  for (const [, items] of itemsByEra) {
    items.sort((a, b) => {
      if (a.year != null && b.year != null) return a.year - b.year;
      if (a.year != null) return -1;
      if (b.year != null) return 1;
      return a._id.localeCompare(b._id);
    });
  }

  let firstEra = true;
  for (const eraId of ERA_ORDER) {
    const items = itemsByEra.get(eraId);
    if (!items || items.length === 0) continue;

    if (!firstEra) out += "\n";
    firstEra = false;

    out += `  // === ${eraId.toUpperCase()} ===\n`;

    for (const item of items) {
      out += genGalleryItem(item);
    }
  }

  // Any items in eras not in our order list
  for (const [eraId, items] of itemsByEra) {
    if (ERA_ORDER.includes(eraId)) continue;
    if (items.length === 0) continue;

    out += `\n  // === ${eraId.toUpperCase()} ===\n`;
    for (const item of items) {
      out += genGalleryItem(item);
    }
  }

  out += `];\n`;

  const filePath = path.join(process.cwd(), "src/data/gallery.ts");
  writeFileSync(filePath, out);
  console.log(`  Wrote ${filePath}`);

  return { items: sanityItems.length };
}

function deriveSrc(item: SanityGalleryItem): string | undefined {
  // Videos have no image
  if (item.youtubeId && !item.imageFilename) return undefined;

  // Prefer _id-based derivation for items created by sync (deterministic, matches local filenames)
  if (item._id.startsWith("gallery-") && !item._id.startsWith("gallery-video-")) {
    const base = item._id.replace(/^gallery-/, "");
    return `/gallery/${base}.jpg`;
  }

  // Fallback for items created in Sanity Studio: use originalFilename
  if (item.imageFilename) {
    return `/gallery/${item.imageFilename}`;
  }

  return undefined;
}

function genGalleryItem(item: SanityGalleryItem) {
  const src = deriveSrc(item);
  const parts: string[] = [];

  if (src) parts.push(`src: ${JSON.stringify(src)}`);
  if (item.youtubeId) parts.push(`youtubeId: ${JSON.stringify(item.youtubeId)}`);
  parts.push(`alt: ${JSON.stringify(item.alt)}`);
  parts.push(`era: ${JSON.stringify(item.era)}`);
  if (item.year != null) parts.push(`year: ${item.year}`);
  if (item.featured) parts.push(`featured: true`);

  return `  { ${parts.join(", ")} },\n`;
}

// Allow running standalone
if (require.main === module) {
  pullGallery()
    .then(({ items }) => console.log(`Done! Pulled ${items} gallery items`))
    .catch((err) => {
      console.error("Pull failed:", err);
      process.exit(1);
    });
}
