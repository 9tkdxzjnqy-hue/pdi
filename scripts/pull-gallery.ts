import { getWriteClient } from "../src/sanity/client";
import { walkOnEra } from "../src/data/gallery";
import { writeFileSync } from "fs";
import path from "path";

interface SanityEra {
  _id: string;
  eraId: string;
  label: string;
  description: string;
  groupByYear?: boolean;
  allYears?: number[];
  displayOrder: number;
}

interface SanityGalleryItem {
  _id: string;
  imageFilename?: string;
  alt: string;
  era: string;
  year?: number;
  youtubeId?: string;
  featured?: boolean;
}

// All valid era values for the type union
const ALL_ERAS = [
  "early-days",
  "middle-years",
  "recent",
  "walk-ons",
  "male-players",
  "the-hazards",
  "doing-our-bit",
  "ads",
] as const;

export async function pullGallery() {
  const client = getWriteClient();

  // Fetch eras
  const sanityEras = await client.fetch<SanityEra[]>(
    `*[_type == "era"] | order(displayOrder asc) {
      _id,
      eraId,
      label,
      description,
      groupByYear,
      allYears,
      displayOrder
    }`
  );
  console.log(`  Fetched ${sanityEras.length} eras from Sanity`);

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

  // EraInfo interface
  out += `export interface EraInfo {\n`;
  out += `  id: Era;\n`;
  out += `  label: string;\n`;
  out += `  description: string;\n`;
  out += `  groupByYear?: boolean;\n`;
  out += `  allYears?: number[];\n`;
  out += `}\n\n`;

  // walkOnEra — preserve from local (not managed in Sanity)
  out += `export const walkOnEra: EraInfo = {\n`;
  out += `  id: ${JSON.stringify(walkOnEra.id)},\n`;
  out += `  label: ${JSON.stringify(walkOnEra.label)},\n`;
  out += `  description: ${JSON.stringify(walkOnEra.description)},\n`;
  if (walkOnEra.groupByYear) {
    out += `  groupByYear: true,\n`;
  }
  if (walkOnEra.allYears) {
    out += `  allYears: [${walkOnEra.allYears.join(", ")}],\n`;
  }
  out += `};\n\n`;

  // eras array
  out += `export const eras: EraInfo[] = [\n`;
  for (const era of sanityEras) {
    out += genEra(era);
  }
  out += `];\n\n`;

  // galleryItems grouped by era
  out += `export const galleryItems: GalleryItem[] = [\n`;

  // Group items by era, maintaining Sanity order within each era
  const eraOrder = sanityEras.map((e) => e.eraId);
  // Add walk-ons era (present in gallery items but not in eras array)
  if (!eraOrder.includes("walk-ons")) {
    eraOrder.push("walk-ons");
  }

  const itemsByEra = new Map<string, SanityGalleryItem[]>();
  for (const item of sanityItems) {
    const era = item.era || "recent";
    if (!itemsByEra.has(era)) itemsByEra.set(era, []);
    itemsByEra.get(era)!.push(item);
  }

  // Sort items within each era by year desc (null years last), then by _id for stability
  for (const [, items] of itemsByEra) {
    items.sort((a, b) => {
      if (a.year != null && b.year != null) return a.year - b.year;
      if (a.year != null) return -1;
      if (b.year != null) return 1;
      return a._id.localeCompare(b._id);
    });
  }

  let firstEra = true;
  for (const eraId of eraOrder) {
    const items = itemsByEra.get(eraId);
    if (!items || items.length === 0) continue;

    if (!firstEra) out += "\n";
    firstEra = false;

    const eraLabel = sanityEras.find((e) => e.eraId === eraId)?.label ?? eraId.toUpperCase();
    out += `  // === ${eraLabel.toUpperCase()} ===\n`;

    for (const item of items) {
      out += genGalleryItem(item);
    }
  }

  // Any items in eras not in our order list
  for (const [eraId, items] of itemsByEra) {
    if (eraOrder.includes(eraId)) continue;
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

  return { eras: sanityEras.length, items: sanityItems.length };
}

function genEra(era: SanityEra) {
  let s = `  {\n`;
  s += `    id: ${JSON.stringify(era.eraId)},\n`;
  s += `    label: ${JSON.stringify(era.label)},\n`;
  s += `    description: ${JSON.stringify(era.description)},\n`;
  if (era.groupByYear) {
    s += `    groupByYear: true,\n`;
  }
  if (era.allYears && era.allYears.length > 0) {
    s += `    allYears: [${era.allYears.join(", ")}],\n`;
  }
  s += `  },\n`;
  return s;
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
    .then(({ eras, items }) => console.log(`Done! Pulled ${eras} eras, ${items} gallery items`))
    .catch((err) => {
      console.error("Pull failed:", err);
      process.exit(1);
    });
}
