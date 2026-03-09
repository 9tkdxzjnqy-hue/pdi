import { getWriteClient } from "../src/sanity/client";
import { eras, galleryItems } from "../src/data/gallery";
import { createReadStream, existsSync } from "fs";
import path from "path";

// These are the 6 images currently shown on the homepage preview
const featuredSrcs = new Set([
  "/gallery/2018-cover.jpg",
  "/gallery/2018-walkon-01.jpg",
  "/gallery/early-event-04.jpg",
  "/gallery/2018-event-04.jpg",
  "/gallery/profile-the-man.jpg",
  "/gallery/2019-event-01.jpg",
]);

function filenameToId(src: string): string {
  // "/gallery/2018-cover.jpg" → "gallery-2018-cover"
  const base = path.basename(src, path.extname(src));
  return `gallery-${base}`;
}

const IMAGE_UPLOAD_CONCURRENCY = 5;

async function uploadInBatches(
  client: ReturnType<typeof getWriteClient>,
  items: { src: string; _id: string }[],
  batchSize: number,
) {
  const results = new Map<string, string>(); // _id → asset._id
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const uploaded = await Promise.all(
      batch.map(async ({ src, _id }) => {
        const imagePath = path.join(process.cwd(), "public", src);
        const asset = await client.assets.upload("image", createReadStream(imagePath), {
          filename: path.basename(src),
        });
        console.log(`  Uploaded: ${src}`);
        return { _id, assetId: asset._id };
      }),
    );
    for (const { _id, assetId } of uploaded) {
      results.set(_id, assetId);
    }
  }
  return results;
}

export async function seedGallery() {
  const client = getWriteClient();

  // --- Seed Eras (batch into one transaction) ---
  console.log(`Syncing ${eras.length} eras...`);
  const eraIds: string[] = [];

  const eraTx = client.transaction();
  for (let i = 0; i < eras.length; i++) {
    const era = eras[i];
    const _id = `era-${era.id}`;
    eraIds.push(_id);

    eraTx.createOrReplace({
      _id,
      _type: "era" as const,
      eraId: era.id,
      label: era.label,
      description: era.description,
      groupByYear: era.groupByYear ?? false,
      allYears: era.allYears,
      displayOrder: i + 1,
    });
  }
  await eraTx.commit();
  console.log(`  Synced ${eraIds.length} eras in one transaction`);

  // --- Fetch existing gallery items (single query for both image check and cleanup) ---
  const existing = await client.fetch<{ _id: string; hasImage: boolean }[]>(
    `*[_type == "galleryItem"]{ _id, "hasImage": defined(image.asset._ref) }`
  );
  const existingMap = new Map(existing.map((e) => [e._id, e]));
  const allExistingIds = new Set(existing.map((e) => e._id));

  // --- Seed Gallery Items ---
  console.log(`\nSyncing ${galleryItems.length} gallery items...`);

  let uploaded = 0;
  let skipped = 0;
  let videoOnly = 0;
  const galleryIds: string[] = [];

  // Separate items into categories
  const videoItems: typeof galleryItems = [];
  const patchItems: { item: typeof galleryItems[0]; _id: string }[] = [];
  const uploadItems: { item: typeof galleryItems[0]; _id: string; src: string }[] = [];

  for (const item of galleryItems) {
    if (!item.src) {
      if (item.youtubeId) {
        const _id = `gallery-video-${item.youtubeId}`;
        galleryIds.push(_id);
        videoItems.push(item);
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
      patchItems.push({ item, _id });
    } else {
      uploadItems.push({ item, _id, src: item.src });
    }
  }

  // Batch video-only items into one transaction
  if (videoItems.length > 0) {
    const videoTx = client.transaction();
    for (const item of videoItems) {
      const _id = `gallery-video-${item.youtubeId}`;
      videoTx.createOrReplace({
        _id,
        _type: "galleryItem" as const,
        alt: item.alt,
        era: item.era,
        year: item.year,
        youtubeId: item.youtubeId,
        featured: false,
      });
    }
    await videoTx.commit();
    videoOnly = videoItems.length;
    console.log(`  Synced ${videoOnly} video items in one transaction`);
  }

  // Batch all metadata patches into transactions (chunks of 50)
  if (patchItems.length > 0) {
    const CHUNK_SIZE = 50;
    for (let i = 0; i < patchItems.length; i += CHUNK_SIZE) {
      const chunk = patchItems.slice(i, i + CHUNK_SIZE);
      const patchTx = client.transaction();
      for (const { item, _id } of chunk) {
        patchTx.patch(_id, (p) => p.set({
          alt: item.alt,
          era: item.era,
          year: item.year,
          youtubeId: item.youtubeId,
          featured: featuredSrcs.has(item.src!),
        }));
      }
      await patchTx.commit();
      console.log(`  Patched ${chunk.length} gallery items (batch ${Math.floor(i / CHUNK_SIZE) + 1})`);
    }
  }

  // Upload new images in parallel batches, then batch createOrReplace
  if (uploadItems.length > 0) {
    console.log(`  Uploading ${uploadItems.length} new images...`);
    const assetMap = await uploadInBatches(
      client,
      uploadItems.map(({ src, _id }) => ({ src, _id })),
      IMAGE_UPLOAD_CONCURRENCY,
    );

    const CHUNK_SIZE = 50;
    for (let i = 0; i < uploadItems.length; i += CHUNK_SIZE) {
      const chunk = uploadItems.slice(i, i + CHUNK_SIZE);
      const uploadTx = client.transaction();
      for (const { item, _id } of chunk) {
        const assetId = assetMap.get(_id);
        if (!assetId) continue;
        uploadTx.createOrReplace({
          _id,
          _type: "galleryItem" as const,
          image: {
            _type: "image" as const,
            asset: { _type: "reference" as const, _ref: assetId },
          },
          alt: item.alt,
          era: item.era,
          year: item.year,
          youtubeId: item.youtubeId,
          featured: featuredSrcs.has(item.src!),
        });
      }
      await uploadTx.commit();
    }
    uploaded = uploadItems.length;
    console.log(`  Uploaded and synced ${uploaded} new gallery items`);
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

  // Clean up stale gallery items (reuse the initial fetch instead of a separate query)
  const galleryIdSet = new Set(galleryIds);
  const staleGallery = [...allExistingIds].filter((id) => !galleryIdSet.has(id));
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
