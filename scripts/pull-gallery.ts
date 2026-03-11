import { getWriteClient } from "../src/sanity/client";
import { WALK_ON_YEARS } from "../src/data/gallery";
import { writeFileSync } from "fs";
import path from "path";

interface SanityGalleryItem {
  _id: string;
  imageFilename?: string;
  alt: string;
  isWalkOn?: boolean;
  year?: number;
  youtubeId?: string;
  featured?: boolean;
}

export async function pullGallery() {
  const client = getWriteClient();

  // Fetch gallery items
  const sanityItems = await client.fetch<SanityGalleryItem[]>(
    `*[_type == "galleryItem"] {
      _id,
      "imageFilename": image.asset->originalFilename,
      alt,
      isWalkOn,
      year,
      youtubeId,
      featured
    }`
  );
  console.log(`  Fetched ${sanityItems.length} gallery items from Sanity`);

  // --- Generate TS file ---
  let out = "";

  // GalleryItem interface
  out += `export interface GalleryItem {\n`;
  out += `  src?: string;\n`;
  out += `  alt: string;\n`;
  out += `  isWalkOn?: boolean;\n`;
  out += `  year?: number;\n`;
  out += `  youtubeId?: string;\n`;
  out += `  featured?: boolean;\n`;
  out += `}\n\n`;

  // WALK_ON_YEARS — preserved from local
  out += `export const WALK_ON_YEARS = [${WALK_ON_YEARS.join(", ")}];\n\n`;

  // Split items into gallery and walk-ons
  const galleryItems: SanityGalleryItem[] = [];
  const walkOnItems: SanityGalleryItem[] = [];

  for (const item of sanityItems) {
    if (item.isWalkOn) {
      walkOnItems.push(item);
    } else {
      galleryItems.push(item);
    }
  }

  // Sort items within each group by year asc (null years last), then by _id for stability
  const sortItems = (items: SanityGalleryItem[]) => {
    items.sort((a, b) => {
      if (a.year != null && b.year != null) return a.year - b.year;
      if (a.year != null) return -1;
      if (b.year != null) return 1;
      return a._id.localeCompare(b._id);
    });
  };

  sortItems(galleryItems);
  sortItems(walkOnItems);

  out += `export const galleryItems: GalleryItem[] = [\n`;

  // Gallery items
  if (galleryItems.length > 0) {
    out += `  // === GALLERY ===\n`;
    for (const item of galleryItems) {
      out += genGalleryItem(item);
    }
  }

  // Walk-on items
  if (walkOnItems.length > 0) {
    if (galleryItems.length > 0) out += "\n";
    out += `  // === WALK-ONS ===\n`;
    for (const item of walkOnItems) {
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
  if (item.isWalkOn) parts.push(`isWalkOn: true`);
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
