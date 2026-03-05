import { getWriteClient } from "../src/sanity/client";
import { eras, galleryItems } from "../src/data/gallery";
import { createReadStream, existsSync } from "fs";
import path from "path";

// These are the 6 images currently shown on the homepage preview
const featuredSrcs = new Set([
  "/gallery/2018-cover.jpg",
  "/gallery/2015-the-hazards.jpg",
  "/gallery/2017-hof-induction.jpg",
  "/gallery/2019-walkon-elvis.jpg",
  "/gallery/early-event-03.jpg",
  "/gallery/2015-charity-cheque.jpg",
]);

async function seed() {
  const client = getWriteClient();

  // --- Seed Eras ---
  console.log(`Seeding ${eras.length} eras...`);
  for (let i = 0; i < eras.length; i++) {
    const era = eras[i];
    const doc = {
      _type: "era" as const,
      eraId: era.id,
      label: era.label,
      description: era.description,
      groupByYear: era.groupByYear ?? false,
      allYears: era.allYears,
      displayOrder: i + 1,
    };

    const result = await client.create(doc);
    console.log(`  Created era: ${era.label} (${result._id})`);
  }

  // --- Seed Gallery Items ---
  console.log(`\nSeeding ${galleryItems.length} gallery items...`);
  let uploaded = 0;
  let skipped = 0;

  for (const item of galleryItems) {
    const imagePath = path.join(process.cwd(), "public", item.src);

    if (!existsSync(imagePath)) {
      console.log(`  SKIP (not found): ${item.src}`);
      skipped++;
      continue;
    }

    // Upload image
    const imageAsset = await client.assets.upload("image", createReadStream(imagePath), {
      filename: path.basename(item.src),
    });

    const doc = {
      _type: "galleryItem" as const,
      image: {
        _type: "image" as const,
        asset: {
          _type: "reference" as const,
          _ref: imageAsset._id,
        },
      },
      alt: item.alt,
      era: item.era,
      year: item.year,
      featured: featuredSrcs.has(item.src),
    };

    const result = await client.create(doc);
    uploaded++;
    console.log(`  [${uploaded}/${galleryItems.length}] ${item.alt} (${result._id})`);
  }

  console.log(`\nDone! Uploaded: ${uploaded}, Skipped: ${skipped}`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
