import { getWriteClient } from "../src/sanity/client";
import { eras, galleryItems } from "../src/data/gallery";
import { createReadStream, existsSync } from "fs";
import path from "path";

// These are the 6 images currently shown on the homepage preview
const featuredSrcs = new Set([
  "/gallery/2022-a-lister-the-next-morning.jpg",
  "/gallery/2020-profile-the-a-lister.jpg",
  "/gallery/2018-cover.jpg",
  "/gallery/2018-walkon-01.jpg",
  "/gallery/early-event-04.jpg",
  "/gallery/2018-event-04.jpg",
]);

function filenameToId(src: string): string {
  // "/gallery/2018-cover.jpg" → "gallery-2018-cover"
  const base = path.basename(src, path.extname(src));
  return `gallery-${base}`;
}

export async function seedGallery() {
  const client = getWriteClient();

  // --- Seed Eras ---
  console.log(`Syncing ${eras.length} eras...`);
  const eraIds: string[] = [];

  for (let i = 0; i < eras.length; i++) {
    const era = eras[i];
    const _id = `era-${era.id}`;
    eraIds.push(_id);

    await client.createOrReplace({
      _id,
      _type: "era" as const,
      eraId: era.id,
      label: era.label,
      description: era.description,
      groupByYear: era.groupByYear ?? false,
      allYears: era.allYears,
      displayOrder: i + 1,
    });
    console.log(`  Synced era: ${era.label} (${_id})`);
  }

  // Clean up stale eras
  const existingEras = await client.fetch<string[]>(`*[_type == "era"]._id`);
  const eraIdSet = new Set(eraIds);
  const staleEras = existingEras.filter((id) => !eraIdSet.has(id));
  if (staleEras.length > 0) {
    const tx = client.transaction();
    for (const id of staleEras) tx.delete(id);
    await tx.commit();
    console.log(`  Deleted ${staleEras.length} stale era(s)`);
  }

  // --- Seed Gallery Items ---
  console.log(`\nSyncing ${galleryItems.length} gallery items...`);

  // Fetch existing gallery docs to skip image re-uploads
  const existing = await client.fetch<{ _id: string; hasImage: boolean }[]>(
    `*[_type == "galleryItem"]{ _id, "hasImage": defined(image.asset._ref) }`
  );
  const existingMap = new Map(existing.map((e) => [e._id, e]));

  let uploaded = 0;
  let skipped = 0;
  let videoOnly = 0;
  const galleryIds: string[] = [];

  for (const item of galleryItems) {
    // Video-only items (no image to upload)
    if (!item.src) {
      if (item.youtubeId) {
        const _id = `gallery-video-${item.youtubeId}`;
        galleryIds.push(_id);
        await client.createOrReplace({
          _id,
          _type: "galleryItem" as const,
          alt: item.alt,
          era: item.era,
          year: item.year,
          youtubeId: item.youtubeId,
          featured: false,
        });
        videoOnly++;
        console.log(`  Synced video: ${item.alt} (${_id})`);
      } else {
        console.log(`  SKIP (no src or youtubeId): ${item.alt}`);
        skipped++;
      }
      continue;
    }

    const _id = filenameToId(item.src);
    galleryIds.push(_id);

    const imagePath = path.join(process.cwd(), "public", item.src);
    if (!existsSync(imagePath)) {
      console.log(`  SKIP (not found): ${item.src}`);
      skipped++;
      continue;
    }

    const existingDoc = existingMap.get(_id);
    if (existingDoc?.hasImage) {
      // Document exists with image — update metadata only, preserve image
      await client.patch(_id).set({
        alt: item.alt,
        era: item.era,
        year: item.year,
        youtubeId: item.youtubeId,
        featured: featuredSrcs.has(item.src),
      }).commit();
      console.log(`  Synced (skip upload): ${item.alt}`);
    } else {
      // New item or missing image — upload
      const imageAsset = await client.assets.upload("image", createReadStream(imagePath), {
        filename: path.basename(item.src),
      });

      await client.createOrReplace({
        _id,
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
        youtubeId: item.youtubeId,
        featured: featuredSrcs.has(item.src),
      });
      uploaded++;
      console.log(`  Uploaded: ${item.alt} (${_id})`);
    }
  }

  // Clean up stale gallery items
  const existingGallery = await client.fetch<string[]>(`*[_type == "galleryItem"]._id`);
  const galleryIdSet = new Set(galleryIds);
  const staleGallery = existingGallery.filter((id) => !galleryIdSet.has(id));
  if (staleGallery.length > 0) {
    const tx = client.transaction();
    for (const id of staleGallery) tx.delete(id);
    await tx.commit();
    console.log(`  Deleted ${staleGallery.length} stale gallery item(s)`);
  }

  return {
    eras: { synced: eraIds.length, deleted: staleEras.length },
    gallery: { synced: galleryIds.length, uploaded, skipped, videoOnly, deleted: staleGallery.length },
  };
}

// Allow running standalone
if (require.main === module) {
  seedGallery()
    .then((result) => {
      console.log(`\nDone!`);
      console.log(`  Eras: ${result.eras.synced} synced, ${result.eras.deleted} deleted`);
      console.log(`  Gallery: ${result.gallery.synced} synced (${result.gallery.uploaded} uploaded, ${result.gallery.videoOnly} videos), ${result.gallery.skipped} skipped, ${result.gallery.deleted} deleted`);
    })
    .catch((err) => {
      console.error("Seed failed:", err);
      process.exit(1);
    });
}
